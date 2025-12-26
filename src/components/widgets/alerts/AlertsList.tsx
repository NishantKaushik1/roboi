'use client';

import { useState } from 'react';
import { HiFire, HiExclamationTriangle, HiWrenchScrewdriver, HiUserGroup, HiIdentification, HiEye, HiCheckCircle, HiXCircle } from 'react-icons/hi2';


export interface AlertItem {
    id: string;
    title: string;
    description: string;
    time: string;
    severity: string;
    icon?: any; // Icon component
    color?: string;
    border?: string;
}

const SEVERITY_TABS = ['All', 'CRITICAL', 'WARNING', 'INFO'];

interface AlertsListProps {
    alerts?: AlertItem[];
}


export default function AlertsList({ alerts = [] }: AlertsListProps) {
    const [activeTab, setActiveTab] = useState('All');

    const filteredAlerts = activeTab === 'All'
        ? alerts
        : alerts.filter(a => a.severity === activeTab);

    return (
        <div className="flex flex-col h-[400px] overflow-y-auto">
            {/* Tabs */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                {SEVERITY_TABS.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-3 py-1 rounded-full text-base font-medium whitespace-nowrap transition-colors
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
                    <div className="text-center text-sm text-gray-400 py-8">No alerts found</div>
                ) : (
                    filteredAlerts.map(alert => (
                        <div key={alert.id} className={`flex gap-3 p-2 rounded-md bg-gray-50 dark:bg-gray-800/50 ${alert.border} ${alert.color}`}>
                            <div className={`h-8 w-8 rounded flex items-center justify-center shrink-0 ${alert.color}`}>
                                {alert.icon && <alert.icon className="h-5 w-5" />}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="text-lg font-semibold text-[#1C2347] dark:text-white truncate">
                                    {alert.title}
                                </h4>
                                <p className="text-base font-medium text-[#595959] dark:text-[#9F9F9F] line-clamp-1">
                                    {alert.description}
                                </p>
                                <p className="text-sm text-[#1C2347] dark:text-[#9F9F9F] mt-1">
                                    {alert.time}
                                </p>
                            </div>

                            <div className="flex items-center justify-between gap-2 pl-2">
                                <button className="flex items-center rounded-md gap-1  text-xs font-medium text-[#9F9F9F] hover:text-blue-600   rounded dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50 transition-colors">
                                    <HiEye className="w-5 h-5" />
                                    {/* View */}
                                </button>
                                <div className="flex gap-1">
                                    <button
                                        className="p-1 text-[#9F9F9F] hover:text-green-600 rounded dark:text-green-400 dark:hover:bg-green-900/30 transition-colors"
                                        title="Mark Resolved"
                                    >
                                        <HiCheckCircle className="w-5 h-5" />
                                    </button>
                                    <button
                                        className="p-1 text-[#9F9F9F] hover:text-red-500 rounded dark:text-red-400 dark:hover:bg-red-900/30 transition-colors"
                                        title="Dismiss"
                                    >
                                        <HiXCircle className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )
                }
            </div >
        </div >
    );
}
