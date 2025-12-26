'use client';

import { HiArrowPath } from 'react-icons/hi2';
import { useParams } from 'next/navigation';
import Card from '@/components/ui/Card/Card';
import AlertsList, { AlertItem } from '@/components/widgets/alerts/AlertsList';
import CategoryProgress from '@/components/widgets/progress/CategoryProgress';
import RecentDetectionLog, { Detection } from '@/components/widgets/tables/RecentDetectionLog';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import {
    useSiteSummary,
    useSiteEvents,
    useSiteAnalyticsDistribution,
    // useSiteTrafficFlow
} from '@/hooks/useSiteData';
import { useRealtimeAlerts } from '@/hooks/useRealtimeAlerts';
import { StreamGuardEvent } from '@/types/api';
import { HiFire, HiExclamationTriangle, HiWrenchScrewdriver, HiUserGroup, HiIdentification, HiEye, HiCheckCircle, HiXCircle } from 'react-icons/hi2';
import { useMemo, useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useSWRConfig } from 'swr';

const LineChart = dynamic(() => import('@/components/charts/LineChart'), {
    loading: () => <div className="h-full w-full animate-pulse bg-gray-100 dark:bg-gray-800 rounded-lg"></div>,
    ssr: false
});

const PeakOccupancyHeatmap = dynamic(() => import('@/components/widgets/charts/PeakOccupancyHeatmap'), {
    loading: () => <div className="h-full w-full animate-pulse bg-gray-100 dark:bg-gray-800 rounded-lg"></div>,
    ssr: false
});

const CCTVGrid = dynamic(() => import('@/components/widgets/cctv/CCTVGrid'), {
    loading: () => <div className="h-full w-full animate-pulse bg-gray-900 rounded-lg"></div>,
    ssr: false
});

// Helper to map API Event to AlertItem
const mapEventToAlert = (event: StreamGuardEvent): AlertItem => {
    let icon = HiExclamationTriangle;
    let color = 'bg-gray-50 text-gray-600 dark:bg-gray-900/20 dark:text-gray-400';
    let border = 'border-l-[6px] border-l-gray-500';

    if (event.type === 'SAFETY') icon = HiFire;
    if (event.type === 'OPERATIONS') icon = HiWrenchScrewdriver;
    if (event.type === 'SECURITY') icon = HiUserGroup;

    if (event.severity === 'CRITICAL') {
        color = 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400';
        border = 'border-l-[6px] border-l-red-500';
    } else if (event.severity === 'WARNING') {
        color = 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400';
        border = 'border-l-[6px] border-l-yellow-500';
    } else {
        color = 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400';
        border = 'border-l-[6px] border-l-blue-500';
    }

    return {
        id: event.id,
        title: event.subType || event.type,
        description: event.metadata.detectedObjects.join(', '),
        time: format(new Date(event.timestamp), 'PP p'),
        severity: event.severity,
        icon,
        color,
        border
    };
};

const mapEventToDetection = (event: StreamGuardEvent): Detection => {
    return {
        id: event.id,
        timestamp: format(new Date(event.timestamp), 'Pp'),
        camera: event.sourceName,
        type: 'EVENT', // Simplification, API has type SECURITY/SAFETY etc.
        status: event.severity === 'CRITICAL' ? 'CRITICAL' : 'SAFE',
        people: 0, // Not provided directly
        keyDetections: event.metadata.detectedObjects,
        confidence: event.metadata.confidence
    };
};

export default function RoDashboard() {
    const params = useParams();
    // const roId = decodeURIComponent((Array.isArray(params.ro) ? params.ro[0] : params.ro) || 'NE-MU-RO-1001');
    const roId = 'HEAD_OFFICE'; // Testing purpose
    const { mutate } = useSWRConfig();
    const [lastRefreshed, setLastRefreshed] = useState<string | null>(null);

    useEffect(() => {
        setLastRefreshed(format(new Date(), 'HH:mm'));
    }, []);

    const { summary, isLoading: loadingSummary } = useSiteSummary(roId);
    const { events: eventList, isLoading: loadingEvents } = useSiteEvents(roId);
    const { distribution, isLoading: loadingDist } = useSiteAnalyticsDistribution(roId);
    // const { trafficData, isLoading: loadingTraffic } = useSiteTrafficFlow(roId); // Unused

    // Real-time alerts integration
    useRealtimeAlerts(roId, (newEvent) => {
        // Mutate the SWR cache for events
        mutate(`/api/v1/sites/${roId}/events?limit=50`, (data: { events: StreamGuardEvent[] } | undefined) => {
            if (!data) return { events: [newEvent] };
            return { events: [newEvent, ...data.events] };
        }, false);

        // Also refresh summary if needed, but might be expensive
        mutate(`/api/v1/sites/${roId}/summary`);
    });

    // Process Data
    const alerts = useMemo(() => {
        return (eventList || []).map(mapEventToAlert);
    }, [eventList]);

    const detections = useMemo(() => {
        return (eventList || []).map(mapEventToDetection);
    }, [eventList]);

    // Calculate derived stats
    const criticalAlertsCount = (eventList || []).filter(e => e.severity === 'CRITICAL').length;
    const sopViolationsCount = (eventList || []).filter(e => e.severity === 'CRITICAL' || e.severity === 'WARNING').length;

    const stats = [
        { label: 'Active Cameras', value: summary?.metrics?.activeSensors ?? '-' },
        { label: 'Active Events', value: summary?.metrics?.openAlerts ?? '-' },
        { label: 'Critical Alerts', value: criticalAlertsCount },
        { label: 'Total People', value: summary?.metrics?.trafficCount ?? '-' },
        { label: 'Peak Occupancy', value: summary?.metrics?.peakDensity ?? '-' },
        { label: 'SOP Violations (24h)', value: sopViolationsCount },
    ];

    const categoryData = useMemo(() => {
        if (!Array.isArray(distribution)) return [];
        return distribution.map(item => ({
            label: item.label,
            value: item.value,
            percentage: item.percentage,
            color: 'bg-blue-500' // Assign colors dynamically if desired
        }));
    }, [distribution]);

    // Object Count Chart Data (derived from Events)
    const objectCountData = useMemo(() => {
        if (!eventList || eventList.length === 0) return { hours: [], datasets: [] };

        // 1. Group events by time (HH:mm) and aggregate object counts
        const timeMap = new Map<string, Record<string, number>>();
        const allObjects = new Set<string>();

        // Sort events by timestamp ascending first
        const sortedEvents = [...eventList].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

        sortedEvents.forEach(event => {
            const timeKey = format(new Date(event.timestamp), 'HH:mm');

            if (!timeMap.has(timeKey)) {
                timeMap.set(timeKey, {});
            }

            const counts = timeMap.get(timeKey)!;

            // Check detectedObjects in metadata
            if (event.metadata && event.metadata.detectedObjects) {
                event.metadata.detectedObjects.forEach(obj => {
                    const normalizedObj = obj.toLowerCase(); // normalize case if needed
                    allObjects.add(normalizedObj);
                    counts[normalizedObj] = (counts[normalizedObj] || 0) + 1;
                });
            }
        });

        // 2. Prepare X-axis (hours/minutes)
        const hours = Array.from(timeMap.keys());

        // 3. Prepare Datasets
        const palette = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#6366F1'];

        const datasets = Array.from(allObjects).map((obj, index) => {
            const data = hours.map(time => {
                const counts = timeMap.get(time);
                return counts ? (counts[obj] || 0) : 0;
            });

            const color = palette[index % palette.length];

            return {
                name: obj.charAt(0).toUpperCase() + obj.slice(1), // Capitalize
                data,
                color,
                areaColor: color + '66' // Add transparency for area (hex + 66 = ~40% opacity)
            };
        });

        return {
            hours,
            datasets
        };
    }, [eventList]);

    return (
        <div className="flex h-full flex-col gap-6 p-6">
            {/* Header & Breadcrumb */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-baseline gap-2">
                            <h1 className="text-xl font-bold text-[#1C2347] dark:text-white uppercase">{roId}</h1>
                            <div className="flex items-center gap-1">
                                <span className="text-sm font-medium text-[#595959] dark:text-[#9F9F9F]">
                                    {summary?.status === 'ONLINE' ? '🟢 Online' : '🔴 Offline'} • Last Refreshed {lastRefreshed}
                                </span>
                                <button onClick={() => window.location.reload()} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors" title="Refresh Data">
                                    <HiArrowPath className="h-4 w-4 text-[#0E5FD9]" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Top Stats Cards */}
                <div className="grid grid-cols-6 gap-4 max-xl:grid-cols-3 max-md:grid-cols-2">
                    {stats.map((stat, i) => (
                        <div key={i} className="rounded border border-gray-200 bg-white p-3 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <div className="text-base font-medium text-[#595959] dark:text-[#9F9F9F]">{stat.label}</div>
                            <div className={`mt-1 text-lg font-bold ${stat.label === 'Active Events' || stat.label === 'Critical Alerts' ? 'text-red-500' : 'text-[#1C2347] dark:text-white'}`}>{stat.value}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 h-[600px] max-xl:h-auto">
                <Card title="Objects Detected (Distribution)" className="xl:col-span-6 h-full flex flex-col">
                    <div className="flex-1 min-h-0 p-2 h-[400px] overflow-y-auto">
                        <CategoryProgress data={categoryData} />
                    </div>
                </Card>

                {/* Right: Recent Alerts (Span 5) */}
                <Card title="Recent Alerts" className="xl:col-span-6 h-full flex flex-col">
                    <div className="flex-1 min-h-0">
                        <AlertsList alerts={alerts} />
                    </div>
                </Card>
            </div>

            {/* Middle Row Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-auto max-lg:h-auto">
                {/* Object Count Chart */}
                <Card title="Object Count Over Time" className="h-auto flex flex-col">
                    <div className="flex-1 min-h-0">
                        <LineChart
                            xAxisData={objectCountData.hours}
                            datasets={objectCountData.datasets}
                            height="200%"
                        />
                    </div>
                </Card>

                {/* Peak Occupancy - Keeping Mock/Placeholder if no API */}
                <Card title="Peak Occupancy" className="flex flex-col">
                    <PeakOccupancyHeatmap />
                </Card>
            </div>

            {/* Bottom Row - Detection Log */}
            <div className="grid grid-cols-1 gap-6">
                <RecentDetectionLog data={detections} />
            </div>
        </div>
    );
}
