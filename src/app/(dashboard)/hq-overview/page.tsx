'use client';

import Card from '@/components/ui/Card/Card';
import StatsCard from '@/components/widgets/StatsCard/StatsCard';
import StateDistributionList from '@/components/widgets/distribution/StateDistributionList';
import StateSummaryTable from '@/components/widgets/summary/StateSummaryTable';
import MapChart from '@/components/charts/MapChart';
import BarChart from '@/components/charts/BarChart';
import DonutChart from '@/components/charts/DonutChart';

export default function HQOverviewPage() {
  // 1. Stats Data
  const stats = [
    { label: 'Total Petrol Pumps', value: '29,697', trend: 0.8 },
    { label: 'States Covered', value: '20', trend: 0.8 },
    { label: 'Highest Presence', value: 'Uttar Pradesh', isActive: true }, // Highlighted
    { label: 'Lowest Presence', value: 'Sikkim' },
    { label: 'Incidents (24h)', value: '243', trend: 0.6, trendLabel: 'vs yesterday' },
    { label: 'Vehicles (24h)', value: '4,891', trend: 0.6 },
    { label: 'Avg. Camera Uptime', value: '93.2%', trend: -0.42, trendLabel: 'vs last week' },
  ];

  // 2. Map Data
  const mapData = [
    { name: 'Maharashtra', value: 2087 },
    { name: 'Uttar Pradesh', value: 2750 },
    { name: 'Punjab', value: 1200 },
    { name: 'Gujarat', value: 1500 },
    { name: 'Rajasthan', value: 1800 },
    { name: 'Karnataka', value: 1300 },
    { name: 'Tamil Nadu', value: 1100 },
  ];

  // 3. Distribution List Data
  const distributionData = [
    { name: 'Maharashtra', riskLevel: 'Very High', count: 2750 },
    { name: 'Punjab', riskLevel: 'Very High', count: 280 },
    { name: 'Gujarat', riskLevel: 'High', count: 480 },
    { name: 'Assam', riskLevel: 'Medium', count: 270 },
    { name: 'Tamil Nadu', riskLevel: 'Medium', count: 500 },
    { name: 'Chhattisgarh', riskLevel: 'Medium', count: 280 },
    { name: 'Sikkim', riskLevel: 'Low', count: 60 },
    { name: 'Telangana', riskLevel: 'Low', count: 60 },
  ];

  // 4. State Summary Data
  const summaryData = [
    { state: 'GJ', incidents: 128, uptime: 96.0 },
    { state: 'MH', incidents: 171, uptime: 92.0 },
    { state: 'DL', incidents: 74, uptime: 98.0 },
    { state: 'RJ', incidents: 88, uptime: 90.0 },
    { state: 'UP', incidents: 142, uptime: 89.0 },
    { state: 'TN', incidents: 93, uptime: 94.0 },
  ];

  // 5. Chart: Alerts by Severity (Hourly)
  const alertsData = [
    { name: 'High', values: [10, 15, 8, 12, 10, 15, 20, 18, 12, 10, 15, 12], color: '#EF4444' },
    { name: 'Med', values: [20, 25, 22, 28, 25, 22, 28, 30, 25, 22, 18, 20], color: '#F97316' },
    { name: 'Low', values: [30, 35, 32, 38, 35, 32, 38, 40, 35, 32, 28, 30], color: '#22C55E' },
  ];
  const hours = ['1:00', '3:00', '5:00', '7:00', '9:00', '11:00', '13:00', '15:00', '17:00', '19:00', '21:00', '23:00'];

  // 6. Chart: Incidents by Category
  const categoryData = [
    { name: 'Fire', value: 15, itemStyle: { color: '#F97316' } },
    { name: 'Tank', value: 25, itemStyle: { color: '#EF4444' } },
    { name: 'Misc', value: 20, itemStyle: { color: '#3B82F6' } },
    { name: 'Theft', value: 30, itemStyle: { color: '#6366F1' } },
    { name: 'Uniform/PPE', value: 10, itemStyle: { color: '#EAB308' } },
  ];

  // 7. Chart: Top 10 Sites
  const topSitesData = [
    { name: 'Incidents', values: [120, 110, 100, 90, 80, 70, 60, 50, 40, 30], color: '#F97316' },
  ];
  const sites = ['Pump-1', 'Pump-2', 'Pump-3', 'Pump-4', 'Pump-5', 'Pump-6', 'Pump-7', 'Pump-8', 'Pump-9', 'Pump-10'];


  return (
    <div className="min-h-screen bg-gray-50 p-6 dark:bg-gray-950 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">HQ Overview</h1>
        {/* Search Placeholder */}
        <div className="w-64">
          {/* Can add global search here */}
        </div>
      </div>

      {/* 1. Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {stats.map((stat, i) => (
          <StatsCard key={i} {...stat} className="h-full" />
        ))}
      </div>

      {/* 2. Map & Distribution Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Map Section */}
        <Card title="Nayara Petrol Pumps (Map View)" className="lg:col-span-2 h-full flex flex-col">
          <div className="h-full w-full">
            <MapChart
              data={mapData}
              height="100%"
              center={[78.9629, 22.5937]}
              zoom={1.3}
            />
          </div>
        </Card>

        {/* Distribution List */}
        <div className="h-full">
          <StateDistributionList data={distributionData} className="h-full rounded-lg border border-gray-200 shadow-sm" />
        </div>
      </div>

      {/* 3. Summary Table */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Statewise Summary</h3>
        <StateSummaryTable data={summaryData} />
      </div>

      {/* 4. Bottom Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Alerts by Severity (Hourly)">
          <BarChart data={alertsData} categories={hours} stacked={true} />
        </Card>

        <Card title="Incidents by Category (24h)">
          <DonutChart data={categoryData} />
        </Card>

        <Card title="Top 10 Sites by Incidents">
          <BarChart
            data={topSitesData}
            categories={sites}
            horizontal={true}
            colors={['#F97316']}
          />
        </Card>
      </div>
    </div>
  );
}
