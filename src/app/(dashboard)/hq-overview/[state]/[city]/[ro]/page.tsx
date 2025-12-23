'use client';

import { HiArrowPath } from 'react-icons/hi2';
import { useParams } from 'next/navigation';
import Card from '@/components/ui/Card/Card';
import LineChart from '@/components/charts/LineChart';
import CCTVGrid from '@/components/widgets/cctv/CCTVGrid';
import AlertsList from '@/components/widgets/alerts/AlertsList';
import CategoryProgress from '@/components/widgets/progress/CategoryProgress';
import RecentDetectionLog from '@/components/widgets/tables/RecentDetectionLog';
import PeakOccupancyHeatmap from '@/components/widgets/charts/PeakOccupancyHeatmap';

import Link from 'next/link';

// Mock Data for charts
const generateFootfallData = () => {
    const hours = ['0:00', '2:00', '4:00', '6:00', '8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '24:00'];
    const people = [45, 30, 20, 40, 65, 85, 120, 110, 95, 130, 150, 90, 60];
    const vehicles = [20, 15, 10, 30, 50, 70, 100, 90, 80, 110, 130, 70, 40];
    return { hours, people, vehicles };
};

// Mock Data for Object Count Chart
const objectCountTime = Array.from({ length: 13 }, (_, i) => `${9 + i > 12 ? 9 + i - 12 : 9 + i}:00 ${9 + i >= 12 ? 'PM' : 'AM'}`);

const objectCountData = [
    { name: 'CAFETERIA', data: [3, 4, 3, 5, 7, 5, 4, 3, 4, 2, 2, 2, 1], color: '#3B82F6', areaColor: 'rgba(59, 130, 246, 0.1)' },
    { name: 'EMPLOYEE AREA', data: [6, 5, 4, 4, 4, 3, 4, 4, 8, 5, 6, 8, 10], color: '#10B981', areaColor: 'rgba(16, 185, 129, 0.1)' },
    { name: 'RECEPTION', data: [3, 3, 4, 4, 3, 5, 3, 2, 2, 3, 4, 4, 1], color: '#F59E0B', areaColor: 'rgba(245, 158, 11, 0.1)' },
    { name: 'BOSS CABIN', data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2], color: '#EF4444', areaColor: 'rgba(239, 68, 68, 0.1)' },
];



// Mock Data for Detections
const recentDetections: any[] = [
    { id: '1', timestamp: '12/16/2025, 7:46:16 PM', camera: 'BOSS_CABIN', type: 'EVENT', status: 'CRITICAL', people: 1, keyDetections: ['person', 'chair', 'book'], confidence: 85 },
    { id: '2', timestamp: '12/16/2025, 7:46:13 PM', camera: 'EMPLOYEE_AREA', type: 'METRIC', status: 'SAFE', people: 10, keyDetections: ['person', 'person', 'person', '+24'], confidence: 92 },
    { id: '3', timestamp: '12/16/2025, 7:46:11 PM', camera: 'BOSS_CABIN', type: 'EVENT', status: 'CRITICAL', people: 1, keyDetections: ['person', 'chair', 'book'], confidence: 88 },
    { id: '4', timestamp: '12/16/2025, 7:46:06 PM', camera: 'BOSS_CABIN', type: 'EVENT', status: 'CRITICAL', people: 1, keyDetections: ['person', 'chair', 'chair', '+1'], confidence: 90 },
    { id: '5', timestamp: '12/16/2025, 7:46:01 PM', camera: 'BOSS_CABIN', type: 'EVENT', status: 'CRITICAL', people: 1, keyDetections: ['person', 'chair', 'chair', '+2'], confidence: 87 },
    { id: '6', timestamp: '12/16/2025, 7:45:55 PM', camera: 'BOSS_CABIN', type: 'EVENT', status: 'CRITICAL', people: 2, keyDetections: ['person', 'person', 'chair', '+2'], confidence: 85 },
    { id: '7', timestamp: '12/16/2025, 7:45:55 PM', camera: 'BOSS_CABIN', type: 'METRIC', status: 'SAFE', people: 2, keyDetections: ['person', 'person', 'chair', '+1'], confidence: 95 },
    { id: '8', timestamp: '12/16/2025, 7:45:50 PM', camera: 'BOSS_CABIN', type: 'EVENT', status: 'CRITICAL', people: 2, keyDetections: ['person', 'person', 'chair', '+3'], confidence: 82 },
];

export default function RoDashboard() {
    const params = useParams();
    const stateName = decodeURIComponent((Array.isArray(params.state) ? params.state[0] : params.state) || 'Maharashtra');
    const cityName = decodeURIComponent((Array.isArray(params.city) ? params.city[0] : params.city) || 'Mumbai');
    const roId = decodeURIComponent((Array.isArray(params.ro) ? params.ro[0] : params.ro) || 'NE-MU-RO-1001');

    const { hours, people, vehicles } = generateFootfallData();

    return (
        <div className="flex h-full flex-col gap-6 p-6">
            {/* Header & Breadcrumb */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <Link href={`/hq-overview/${stateName.toLowerCase()}/${cityName.toLowerCase()}`} className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700">
                            <span className="text-blue-600">{'<<Back'}</span> {cityName} / ANPR — Captured Vehicles
                        </Link>
                        <div className="flex items-baseline gap-2">
                            <h1 className="text-xl font-bold text-[#1C2347] dark:text-white uppercase">{roId}</h1>
                            <div className="flex items-center gap-1">
                                <span className="text-sm font-medium text-[#595959] dark:text-[#9F9F9F]">Pump-27 — Viman Nagar | Today • Last Refreshed 09:41 (IST)</span>
                                <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors" title="Refresh Data">
                                    <HiArrowPath className="h-4 w-4 text-[#0E5FD9]" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <Link href={`/hq-overview/${stateName.toLowerCase()}/${cityName.toLowerCase()}/${roId}/anpr-vehicles`}>
                        <button className="bg-[#095396] text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-blue-800 transition-colors">
                            ANPR Vehicles
                        </button>
                    </Link>
                </div>

                {/* Top Stats Cards */}
                <div className="grid grid-cols-6 gap-4 max-xl:grid-cols-3 max-md:grid-cols-2">
                    {[
                        { label: 'Active Cameras', value: '16' },
                        { label: 'Active Events', value: '7' },
                        { label: 'Critical Alerts', value: '3' },
                        { label: 'Total People', value: '150' },
                        { label: 'Peak Occupancy', value: '15' },
                        { label: 'SOP Violations (24h)', value: '4' },
                        // { label: 'Active Alerts', value: '2' }
                    ]
                        // .concat([{ label: 'Active Alerts', value: '2' }])
                        .map((stat, i) => (
                            <div key={i} className="rounded border border-gray-200 bg-white p-3 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                                <div className="text-base font-medium text-[#595959] dark:text-[#9F9F9F]">{stat.label}</div>
                                <div className={`mt-1 text-lg font-bold ${stat.label === 'Critical Alerts' ? 'text-red-500' : 'text-[#1C2347] dark:text-white'}`}>{stat.value}</div>
                            </div>
                        ))}
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 h-[600px] max-xl:h-auto">
                {/* Left: Live CCTV (Span 7) */}
                {/* <Card title="Live CCTV" className="xl:col-span-7 h-full flex flex-col">
                    <div className="flex-1 min-h-0 bg-black rounded overflow-hidden">
                        <CCTVGrid />
                    </div>
                </Card> */}
                <Card title="Objects Detected (last 24 hrs)" className="xl:col-span-6 h-full flex flex-col">
                    <div className="flex-1 min-h-0 p-2 h-[400px] overflow-y-auto">
                        <CategoryProgress />
                    </div>

                </Card>

                {/* Right: Recent Alerts (Span 5) */}
                <Card title="Recent Alerts" className="xl:col-span-6 h-full flex flex-col">
                    <div className="flex-1 min-h-0">
                        <AlertsList />
                    </div>
                </Card>
            </div>

            {/* Middle Row Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-auto max-lg:h-auto">
                <Card title="Object Count Over Time" className="flex flex-col">
                    <div className="flex-1 min-h-0">
                        <LineChart
                            datasets={objectCountData}
                            xAxisData={objectCountTime}
                            height="300%"
                        />
                    </div>
                </Card>
                <Card title="Peak Occupancy" className="flex flex-col">
                    <PeakOccupancyHeatmap />
                </Card>

            </div>

            {/* Bottom Row Chart */}
            <div className="grid grid-cols-1 gap-6">
                <Card title="Hourly Footfall (People vs Vehicles)" className="h-auto flex flex-col">
                    <div className="flex-1 min-h-0">
                        <LineChart
                            xAxisData={hours}
                            datasets={[
                                { name: 'People', data: people, color: '#3B82F6', areaColor: 'rgba(59, 130, 246, 0.2)' },
                                { name: 'Vehicles', data: vehicles, color: '#EF4444', areaColor: 'rgba(239, 68, 68, 0.2)' }
                            ]}
                            height="200%"
                        />
                    </div>
                </Card>

                {/* Recent Detection Log Table */}
                <RecentDetectionLog data={recentDetections} />
            </div>
        </div>
    );
}
