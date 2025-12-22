'use client';

import { useParams, useRouter } from 'next/navigation';
import Card from '@/components/ui/Card/Card';
import CityMap from '@/components/charts/CityMap';
import LineChart from '@/components/charts/LineChart';
import BarChart from '@/components/charts/BarChart';
import DonutChart from '@/components/charts/DonutChart';
import DistributionList from '@/components/widgets/distribution/StateDistributionList';
import SummaryTable from '@/components/widgets/summary/StateSummaryTable';
import { HiArrowLeft } from 'react-icons/hi2';
import Link from 'next/link';

// Mock Data Generators for City View
const generateHourlyData = () => {
    const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
    const values = hours.map(() => Math.floor(Math.random() * 20) + 5);
    return { hours, values };
};

const MOCK_ROS = [
    { name: 'NE-MU-RO-1001', count: 12, riskLevel: 'High', color: 'bg-red-500' }, // count here implies incidents? Or just an ID list. DistributionList expects 'count'
    { name: 'NE-MU-RO-1002', count: 5, riskLevel: 'Low', color: 'bg-green-500' },
    { name: 'NE-MU-RO-1003', count: 8, riskLevel: 'Medium', color: 'bg-yellow-500' },
    { name: 'NE-MU-RO-1004', count: 15, riskLevel: 'High', color: 'bg-red-500' },
    { name: 'NE-MU-RO-1005', count: 3, riskLevel: 'Low', color: 'bg-green-500' },
    { name: 'NE-MU-RO-1006', count: 6, riskLevel: 'Medium', color: 'bg-yellow-500' },
    { name: 'NE-MU-RO-1007', count: 1, riskLevel: 'Low', color: 'bg-green-500' },
    { name: 'NE-MU-RO-1008', count: 20, riskLevel: 'High', color: 'bg-red-500' },
    { name: 'NE-MU-RO-1009', count: 4, riskLevel: 'Low', color: 'bg-green-500' },
    { name: 'NE-MU-RO-1010', count: 9, riskLevel: 'Medium', color: 'bg-yellow-500' },
];

const MOCK_SUMMARY = [
    { name: 'NE-MU-RO-1001', incidents: 12, uptime: 96.0 },
    { name: 'NE-MU-RO-1002', incidents: 5, uptime: 98.5 },
    { name: 'NE-MU-RO-1003', incidents: 8, uptime: 92.0 },
    { name: 'NE-MU-RO-1004', incidents: 15, uptime: 88.0 },
    { name: 'NE-MU-RO-1005', incidents: 3, uptime: 99.0 },
    { name: 'NE-MU-RO-1006', incidents: 6, uptime: 94.5 },
    { name: 'NE-MU-RO-1007', incidents: 1, uptime: 99.8 },
    { name: 'NE-MU-RO-1008', incidents: 20, uptime: 85.0 },
];

export default function CityPage() {
    const params = useParams();
    const stateParam = params.state;
    const cityParam = params.city;

    // Safely decode params
    const stateName = decodeURIComponent(
        (Array.isArray(stateParam) ? stateParam[0] : stateParam) || 'Maharashtra'
    );
    const cityName = decodeURIComponent(
        (Array.isArray(cityParam) ? cityParam[0] : cityParam) || 'Mumbai'
    );

    const { hours, values } = generateHourlyData();
    const router = useRouter();

    const handleOpenClick = (item: any) => {
        router.push(`/hq-overview/${stateName.toLowerCase()}/${cityName.toLowerCase()}/${item.name.toLowerCase()}`);
    };

    return (
        <div className="flex h-full flex-col gap-6 p-6">
            {/* Breadcrumb & Header */}
            <div className="flex flex-col gap-1">
                <Link href={`/hq-overview/${stateName.toLowerCase()}`} className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700">
                    <HiArrowLeft className="h-3 w-3" />
                    Back HQ Overview/ {stateName}
                </Link>
                <h1 className="text-xl font-bold text-[#1C2347] dark:text-white capitalize">{cityName} - ROs</h1>
            </div>

            {/* Top Section: Map Card + Right Stats Block */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 h-[500px] max-xl:h-auto">
                {/* Left: Map & Distribution (Span 5) */}
                <Card className="xl:col-span-5 h-full flex max-md:flex-col overflow-hidden !p-0">
                    <div className="flex h-full max-md:flex-col">
                        {/* Map Part */}
                        <div className="w-1/2 max-md:w-full flex flex-col p-4 border-r border-gray-100 dark:border-gray-800">
                            <div className="mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                                    <span className="font-bold text-[#1C2347] dark:text-white capitalize">{cityName}</span>
                                </div>
                                <div className="text-2xl font-bold text-[#1C2347] dark:text-white mt-1">1087 <span className="text-xs font-normal text-[#595959]">ROs</span></div>
                            </div>
                            <div className="flex-1 w-full relative">
                                <CityMap cityName={cityName} height="100%" />
                            </div>
                        </div>
                        {/* List Part */}
                        <div className="w-1/2 h-full max-md:w-full">
                            <DistributionList
                                data={MOCK_ROS}
                                title={`${cityName} ROs`}
                                className="bg-transparent"
                                onOpenClick={handleOpenClick}
                            />
                        </div>
                    </div>
                </Card>

                {/* Right: Stats & Trends (Span 7) */}
                <div className="xl:col-span-7 flex flex-col gap-6 h-full">
                    {/* Top Cards Row */}
                    <div className="grid grid-cols-4 max-md:grid-cols-2 gap-4 h-[100px] max-md:h-auto">
                        {[
                            { label: 'Incidents (24h)', value: '243', trend: '+0.6%', color: 'text-green-500' },
                            { label: 'Vehicles (24h)', value: '4,891', trend: '+8.6%', color: 'text-green-500' },
                            { label: 'Avg. Camera Uptime', value: '93.2%', trend: '-0.42%', color: 'text-red-500' },
                            { label: 'SLA: Mean Time to Close', value: '18m', trend: '-0.42%', color: 'text-red-500' },
                        ].map((stat, i) => (
                            <div key={i} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900 flex flex-col justify-center">
                                <div className="text-base font-medium text-[#595959] dark:text-[#9F9F9F]">{stat.label}</div>
                                <div className="flex items-end gap-2 mt-1">
                                    <span className="text-xl font-bold text-[#1C2347] dark:text-white">{stat.value}</span>
                                    <span className={`text-xs font-medium ${stat.color} mb-1`}>{stat.trend}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Line Chart */}
                    <Card title="Hourly Incident Trend (All Sites)" className="flex-1 min-h-0 flex flex-col">
                        <div className="flex-1 min-h-0 w-full">
                            <LineChart
                                data={values}
                                xAxisData={hours}
                                title="Incidents"
                                height="200%"
                                areaColor="rgba(59, 130, 246, 0.5)"
                            />
                        </div>
                    </Card>
                </div>
            </div>

            {/* Middle Row: Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[300px] max-lg:h-auto">
                <Card title="Alerts by Severity (Hourly)" className="flex flex-col">
                    <div className="flex-1 min-h-0">
                        <BarChart
                            categories={['1:00', '3:00', '5:00', '7:00', '9:00', '11:00']}
                            data={[
                                { name: 'High', values: [5, 10, 8, 12, 5, 7], color: '#EF4444' },
                                { name: 'Low', values: [10, 15, 12, 8, 10, 5], color: '#22C55E' },
                                { name: 'Med', values: [8, 5, 10, 6, 8, 12], color: '#F59E0B' },
                            ]}
                            stacked={true}
                            height="200%"
                        />
                    </div>
                </Card>
                <Card title="Incidents by Category (24h)" className="flex flex-col">
                    <div className="flex-1 min-h-0">
                        <DonutChart data={[
                            { value: 30, name: 'Fire', color: '#F97316' },
                            { value: 25, name: 'Tank', color: '#EF4444' },
                            { value: 20, name: 'Misc', color: '#84CC16' },
                            { value: 15, name: 'Theft', color: '#3B82F6' },
                            { value: 10, name: 'Uniform/PPE', color: '#F59E0B' },
                        ]} height="200%" />
                    </div>
                </Card>
                <Card title="Top 10 Sites by Incidents" className="flex flex-col">
                    <div className="flex-1 min-h-0">
                        <BarChart
                            horizontal
                            categories={['Pump-1', 'Pump-2', 'Pump-3', 'Pump-4', 'Pump-5', 'Pump-6']}
                            data={[
                                { name: 'Incidents', values: [45, 40, 35, 30, 25, 20], color: '#F97316' }
                            ]}
                            height="200%"
                        />
                    </div>
                </Card>
            </div>

            {/* Bottom: Summary Table */}
            <Card subtitle="City wise Summary" className="flex flex-col">
                <SummaryTable data={MOCK_SUMMARY} entityLabel="RO Name" />
            </Card>
        </div>
    );
}
