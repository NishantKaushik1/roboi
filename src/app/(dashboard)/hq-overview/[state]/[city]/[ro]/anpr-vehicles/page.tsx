'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { HiArrowLeft, HiSearch } from 'react-icons/hi'; // Using 'hi' instead of 'hi2' for standard search icon look

const MOCK_VEHICLES = [
    { id: 1, plate: '891DY77Y3Y8Y3', type: 'CAR', visits: 1, lastVisit: '2025-11-01 14:00', image: '/assets/car-yellow.png' },
    { id: 2, plate: '891DY77Y3Y8Y3', type: 'BIKE', visits: 1, lastVisit: '2025-11-01 14:00', image: '/assets/bike-green.png' },
    { id: 3, plate: '891DY77Y3Y8Y3', type: 'SUV', visits: 1, lastVisit: '2025-11-01 14:00', image: '/assets/suv-blue.png' },
    { id: 4, plate: '891DY77Y3Y8Y3', type: 'CAR', visits: 1, lastVisit: '2025-11-01 14:00', image: '/assets/car-yellow.png' },
    { id: 5, plate: '891DY77Y3Y8Y3', type: 'BIKE', visits: 1, lastVisit: '2025-11-01 14:00', image: '/assets/bike-green.png' },
    { id: 6, plate: '891DY77Y3Y8Y3', type: 'SUV', visits: 1, lastVisit: '2025-11-01 14:00', image: '/assets/suv-blue.png' },
    { id: 7, plate: '891DY77Y3Y8Y3', type: 'CAR', visits: 1, lastVisit: '2025-11-01 14:00', image: '/assets/car-yellow.png' },
    { id: 8, plate: '891DY77Y3Y8Y3', type: 'BIKE', visits: 1, lastVisit: '2025-11-01 14:00', image: '/assets/bike-green.png' },
];

export default function AnprPage() {
    const params = useParams();
    const stateName = decodeURIComponent((Array.isArray(params.state) ? params.state[0] : params.state) || 'Maharashtra');
    const cityName = decodeURIComponent((Array.isArray(params.city) ? params.city[0] : params.city) || 'Mumbai');
    const roId = decodeURIComponent((Array.isArray(params.ro) ? params.ro[0] : params.ro) || 'NE-MU-RO-1001');

    return (
        <div className="flex flex-col gap-6 p-6 h-full font-barlow">
            {/* Header & Breadcrumb */}
            <div className="flex flex-col gap-4">
                <Link href={`/hq-overview/${stateName.toLowerCase()}/${cityName.toLowerCase()}/${roId}`} className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 w-fit">
                    <span className="text-blue-600">{'<<Back'}</span> {roId} / ANPR — Captured Vehicles
                </Link>

                <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                        <h1 className="text-xl font-bold text-[#1C2347] dark:text-white uppercase">ANPR — Captured Vehicles</h1>
                        <span className="text-sm font-medium text-gray-400">| Car • Total Visits: 1</span>
                    </div>

                    {/* Search Bar */}
                    <div className="relative w-64">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <HiSearch className="h-4 w-4" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search vehicle no. , Type"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md leading-5 bg-white placeholder-gray-400 focus:outline-none focus:placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                        />
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col flex-1">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-100 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    <div className="col-span-3">Vehicle No</div>
                    <div className="col-span-2">Type</div>
                    <div className="col-span-2 text-center">Visits</div>
                    <div className="col-span-3">Last Visit</div>
                    <div className="col-span-2 text-right">Action</div>
                </div>

                {/* Table Body */}
                <div className="flex-1 overflow-y-auto">
                    {MOCK_VEHICLES.map((vehicle, index) => (
                        <div key={index} className="grid grid-cols-12 gap-4 px-6 py-4 items-center border-b border-gray-100 hover:bg-gray-50 transition-colors">
                            {/* Vehicle No & Image */}
                            <div className="col-span-3 flex items-center gap-4">
                                <div className="h-10 w-16 relative shrink-0">
                                    <Image
                                        src={vehicle.image}
                                        alt={vehicle.type}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <span className="text-sm font-bold text-[#1C2347]">{vehicle.plate}</span>
                            </div>

                            {/* Type */}
                            <div className="col-span-2">
                                <span className="text-xs font-medium text-gray-600">{vehicle.type}</span>
                            </div>

                            {/* Visits */}
                            <div className="col-span-2 text-center">
                                <span className="text-sm font-medium text-gray-600">{vehicle.visits}</span>
                            </div>

                            {/* Last Visit */}
                            <div className="col-span-3">
                                <span className="text-sm font-medium text-[#1C2347] font-semibold">{vehicle.lastVisit}</span>
                            </div>

                            {/* Action */}
                            <div className="col-span-2 flex justify-end">
                                <button className="bg-[#0f172a] hover:bg-[#1e293b] text-white text-[10px] font-medium px-4 py-1.5 rounded transition-colors">
                                    View Profile
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
