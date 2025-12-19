'use client';

import { useParams } from 'next/navigation';
import Card from '@/components/ui/Card/Card';
import LineChart from '@/components/charts/LineChart';
import CCTVGrid from '@/components/widgets/cctv/CCTVGrid';
import AlertsList from '@/components/widgets/alerts/AlertsList';
import CategoryProgress from '@/components/widgets/progress/CategoryProgress';
import { HiArrowLeft } from 'react-icons/hi2';
import Link from 'next/link';

// Mock Data for charts
const generateFootfallData = () => {
    const hours = ['0:00', '2:00', '4:00', '6:00', '8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '24:00'];
    const people = [45, 30, 20, 40, 65, 85, 120, 110, 95, 130, 150, 90, 60];
    const vehicles = [20, 15, 10, 30, 50, 70, 100, 90, 80, 110, 130, 70, 40];
    return { hours, people, vehicles };
};

const trendsData = [2, 5, 2, 4, 2, 6, 2, 4, 2, 5, 2, 4, 2];
const trendsTime = Array.from({ length: 13 }, (_, i) => `${i * 2}:00`);


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
                            <span className="text-xs text-[#595959] dark:text-[#9F9F9F]">Pump-27 — Viman Nagar | Today • Local time 09:41</span>
                        </div>
                    </div>
                    <button className="bg-[#095396] text-white px-4 py-1.5 rounded text-xs font-medium hover:bg-blue-800 transition-colors">
                        ANPR Vehicles
                    </button>
                </div>

                {/* Top Stats Cards */}
                <div className="grid grid-cols-6 gap-4 max-xl:grid-cols-3 max-md:grid-cols-2">
                    {[
                        { label: 'Active Cameras', value: '16' },
                        { label: 'Staff On-Site', value: '7' },
                        { label: 'Cars in Queue', value: '3' },
                        { label: 'Fire Alerts (24h)', value: '1' },
                        { label: 'SOP Violations (24h)', value: '4' },
                        // { label: 'Active Alerts', value: '2' }
                    ].concat([{ label: 'Active Alerts', value: '2' }]).map((stat, i) => (
                        <div key={i} className="rounded border border-gray-200 bg-white p-3 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <div className="text-[10px] font-medium text-[#595959] dark:text-[#9F9F9F]">{stat.label}</div>
                            <div className="mt-1 text-lg font-bold text-[#1C2347] dark:text-white">{stat.value}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 h-[800px] max-xl:h-auto">
                {/* Left: Live CCTV (Span 7) */}
                <Card title="Live CCTV" className="xl:col-span-7 h-full flex flex-col">
                    <div className="flex-1 min-h-0 bg-black rounded overflow-hidden">
                        <CCTVGrid />
                    </div>
                </Card>

                {/* Right: Recent Alerts (Span 5) */}
                <Card title="Recent Alerts" className="xl:col-span-5 h-full flex flex-col">
                    <div className="flex-1 min-h-0">
                        <AlertsList />
                    </div>
                </Card>
            </div>

            {/* Middle Row Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[300px] max-lg:h-auto">
                <Card title="Incidents by Category (last 30 days)" className="flex flex-col">
                    <div className="flex-1 min-h-0 p-2">
                        <CategoryProgress />
                    </div>
                </Card>
                <Card title="Incidents by Category trend (last 30 days)" className="flex flex-col">
                    <div className="flex-1 min-h-0">
                        <LineChart
                            data={trendsData}
                            xAxisData={trendsTime}
                            title="Incidents"
                            height="100%"
                            color="#595959" // gray for the line
                        />
                    </div>
                </Card>
            </div>

            {/* Bottom Row Chart */}
            <Card title="Hourly Footfall (People vs Vehicles)" className="h-[300px] flex flex-col">
                <div className="flex-1 min-h-0">
                    <LineChart
                        xAxisData={hours}
                        datasets={[
                            { name: 'People', data: people, color: '#3B82F6', areaColor: 'rgba(59, 130, 246, 0.2)' },
                            { name: 'Vehicles', data: vehicles, color: '#EF4444', areaColor: 'rgba(239, 68, 68, 0.2)' }
                        ]}
                        height="100%"
                    />
                </div>
            </Card>
        </div>
    );
}
