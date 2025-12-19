'use client';

import { useState } from 'react';
import { HiFire, HiExclamationTriangle, HiWrenchScrewdriver, HiUserGroup, HiIdentification } from 'react-icons/hi2';

const TABS = ['All', 'Very Critical', 'Critical', 'Moderate'];

const ALERTS_DATA = [
    {
        id: 1,
        title: 'Safety & Compliance',
        description: 'Fire extinguisher availability, pressure & expiry compliance',
        time: 'Today 11:14 AM • Pump-2',
        severity: 'Very Critical',
        icon: HiFire,
        color: 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400',
        border: 'border-l-4 border-l-red-500'
    },
    {
        id: 2,
        title: 'Fuel Quality & Quantity',
        description: 'Tank dip variance beyond allowable limit',
        time: 'Today 11:14 AM • Pump-2',
        severity: 'Critical',
        icon: HiExclamationTriangle,
        color: 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400',
        border: 'border-l-4 border-l-red-500'
    },
    {
        id: 3,
        title: 'Forecourt & Operations',
        description: 'Staff uniform/grooming non-compliance',
        time: 'Today 11:14 AM • Pump-2',
        severity: 'Moderate',
        icon: HiUserGroup,
        color: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400',
        border: 'border-l-4 border-l-yellow-500'
    },
    {
        id: 4,
        title: 'Customer Service',
        description: 'Billing issues / wrong bill',
        time: 'Today 11:14 AM • Pump-2',
        severity: 'Moderate',
        icon: HiIdentification,
        color: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400',
        border: 'border-l-4 border-l-yellow-500'
    },
    {
        id: 5,
        title: 'Housekeeping & Maintenance',
        description: 'Forecourt cleanliness below standard',
        time: 'Today 11:14 AM • Pump-2',
        severity: 'Critical',
        icon: HiWrenchScrewdriver,
        color: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
        border: 'border-l-4 border-l-blue-500'
    },
];

export default function AlertsList() {
    const [activeTab, setActiveTab] = useState('All');

    const filteredAlerts = activeTab === 'All'
        ? ALERTS_DATA
        : ALERTS_DATA.filter(a => a.severity === activeTab);

    return (
        <div className="flex flex-col h-full">
            {/* Tabs */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                {TABS.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors
                            ${activeTab === tab
                                ? 'bg-[#1C2347] text-white dark:bg-blue-600'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                {filteredAlerts.length === 0 ? (
                    <div className="text-center text-xs text-gray-400 py-8">No alerts found</div>
                ) : (
                    filteredAlerts.map(alert => (
                        <div key={alert.id} className={`flex gap-3 p-3 rounded-r-md rounded-l-sm bg-gray-50 dark:bg-gray-800/50 ${alert.border}`}>
                            <div className={`h-8 w-8 rounded flex items-center justify-center shrink-0 ${alert.color}`}>
                                <alert.icon className="h-5 w-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-semibold text-[#1C2347] dark:text-white truncate">
                                    {alert.title}
                                </h4>
                                <p className="text-xs text-[#595959] dark:text-[#9F9F9F] line-clamp-1">
                                    {alert.description}
                                </p>
                                <p className="text-[10px] text-gray-400 mt-1">
                                    {alert.time}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
