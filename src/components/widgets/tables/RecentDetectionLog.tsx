'use client';

import { HiMagnifyingGlass } from 'react-icons/hi2';

export interface Detection {
    id: string;
    timestamp: string;
    camera: string;
    type: 'EVENT' | 'METRIC';
    status: 'CRITICAL' | 'SAFE';
    people: number;
    keyDetections: string[];
    confidence: number;
}

interface RecentDetectionLogProps {
    data: Detection[];
    className?: string;
}

export default function RecentDetectionLog({ data, className = '' }: RecentDetectionLogProps) {
    return (
        <div className={`w-full mb-4 overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-gray-800 ${className}`}>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-800">
                <div className="flex items-center gap-2">
                    {/* <span className="text-orange-500">📄</span> */}
                    <h3 className="text-lg font-semibold text-[#1C2347] dark:text-white">Recent Detection Log</h3>
                </div>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search detections..."
                        className="w-64 rounded border border-gray-200 bg-gray-50 px-3 py-1.5 pl-8 text-xs text-[#1C2347] outline-none focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    />
                    <HiMagnifyingGlass className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
                </div>
            </div>

            {/* Table Header */}
            <div className="bg-[#F9FAFB] px-6 py-3 border-b border-gray-200 dark:bg-gray-800/50 dark:border-gray-700 flex text-xs font-bold uppercase tracking-wider text-[#9F9F9F]">
                <div className="w-[15%]">Timestamp</div>
                <div className="w-[15%]">Camera</div>
                <div className="w-[10%] text-center">Type</div>
                <div className="w-[10%] text-center">Status</div>
                <div className="w-[10%] text-center">People</div>
                <div className="w-[25%]">Key Detections</div>
                <div className="w-[15%] text-right">Confidence</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200 dark:divide-gray-800 font-barlow tracking-tight">
                {data.map((row) => (
                    <div
                        key={row.id}
                        className={`flex items-center px-6 py-3 text-sm hover:opacity-90 transition-opacity
                            ${row.status === 'CRITICAL' ? 'bg-red-50/50 dark:bg-red-900/10' : 'bg-green-50/20 dark:bg-green-900/5'}
                        `}
                    >
                        {/* Timestamp */}
                        <div className="w-[15%] text-[#1C2347] font-medium dark:text-white">{row.timestamp}</div>

                        {/* Camera */}
                        <div className="w-[15%] text-[#595959] dark:text-[#9F9F9F] uppercase font-semibold text-xs tracking-wide">{row.camera}</div>

                        {/* Type */}
                        <div className="w-[10%] flex justify-center">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase
                                ${row.type === 'EVENT'
                                    ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                                    : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'}
                            `}>
                                {row.type}
                            </span>
                        </div>

                        {/* Status */}
                        <div className="w-[10%] flex justify-center">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase
                                ${row.status === 'CRITICAL'
                                    ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                                    : 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'}
                            `}>
                                {row.status}
                            </span>
                        </div>

                        {/* People */}
                        <div className="w-[10%] text-center font-semibold text-[#1C2347] dark:text-white">{row.people}</div>

                        {/* Key Detections */}
                        <div className="w-[25%] flex flex-wrap gap-1">
                            {row.keyDetections.map((det, i) => (
                                <span key={i} className="px-1.5 py-0.5 rounded bg-gray-100 text-[10px] text-gray-600 border border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700">
                                    {det}
                                </span>
                            ))}
                        </div>

                        {/* Confidence */}
                        <div className="w-[15%] flex justify-end items-center">
                            <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden dark:bg-gray-800">
                                <div
                                    className="h-full rounded-full bg-[#22C55E]"
                                    style={{ width: `${row.confidence}%` }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
