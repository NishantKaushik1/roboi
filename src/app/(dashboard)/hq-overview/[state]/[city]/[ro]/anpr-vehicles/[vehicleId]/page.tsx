
'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { MOCK_VEHICLES } from '@/utils/mockData';
import Card from '@/components/ui/Card/Card';
import { HiSparkles } from 'react-icons/hi';

export default function VehicleProfilePage() {
    const params = useParams();
    const stateName = decodeURIComponent((Array.isArray(params.state) ? params.state[0] : params.state) || 'Maharashtra');
    const cityName = decodeURIComponent((Array.isArray(params.city) ? params.city[0] : params.city) || 'Mumbai');
    const roId = decodeURIComponent((Array.isArray(params.ro) ? params.ro[0] : params.ro) || 'NE-MU-RO-1001');
    const vehicleId = Number(Array.isArray(params.vehicleId) ? params.vehicleId[0] : params.vehicleId);

    const vehicle = MOCK_VEHICLES.find(v => v.id === vehicleId) || MOCK_VEHICLES[0];

    return (
        <div className="flex flex-col gap-6 p-6 h-full font-barlow relative">
            {/* Header & Breadcrumb */}
            <div className="flex flex-col gap-4">
                <Link href={`/hq-overview/${stateName.toLowerCase()}/${cityName.toLowerCase()}/${roId}/anpr-vehicles`} className="flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 w-fit">
                    <span className="text-blue-600 dark:text-blue-400">{'<<Back'}</span> {roId} / ANPR — Captured Vehicles / Vehicle Profile
                </Link>

                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-bold text-[#1C2347] dark:text-white">Vehicle Profile — {vehicle.plate}</h1>

                    <button className="flex items-center gap-2 bg-white dark:bg-gray-900 border border-purple-200 dark:border-purple-800 text-[#1C2347] dark:text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <HiSparkles className="text-purple-500" />
                        Vehicle Profiling Report
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="h-28">
                    <div className="flex flex-col justify-center h-full">
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Avg. Ticket (₹)</span>
                        <span className="text-2xl font-bold text-[#1C2347] dark:text-white mt-1">{vehicle.avgTicket}</span>
                    </div>
                </Card>
                <Card className="h-28">
                    <div className="flex flex-col justify-center h-full">
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Captures</span>
                        <span className="text-2xl font-bold text-[#1C2347] dark:text-white mt-1">{vehicle.captures}</span>
                    </div>
                </Card>
                <Card className="h-28">
                    <div className="flex flex-col justify-center h-full">
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Flags</span>
                        <span className="text-2xl font-bold text-[#1C2347] dark:text-white mt-1">{vehicle.flags}</span>
                    </div>
                </Card>
            </div>

            {/* Incidents by Category */}
            <Card title="Incidents by Category (24h)" className="min-h-[200px]">
                {vehicle.incidents && vehicle.incidents.length > 0 ? (
                    <ul className="list-disc pl-5 space-y-3">
                        {vehicle.incidents.map((incident, index) => (
                            <li key={index} className="text-sm font-medium text-gray-600 dark:text-gray-300 pl-2">
                                {incident}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400 italic">No incidents recorded in the last 24 hours.</p>
                )}
            </Card>

            {/* Visit History */}
            <Card title="Visit History" className="min-h-[150px]">
                {vehicle.history && vehicle.history.length > 0 ? (
                    <ul className="list-disc pl-5 space-y-3">
                        {vehicle.history.map((record, index) => (
                            <li key={index} className="text-sm font-medium text-gray-600 dark:text-gray-300 pl-2">
                                {record.date} — ₹{record.amount}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400 italic">No visit history available.</p>
                )}
            </Card>
        </div>
    );
}
