'use client';

import { useState } from 'react';
import { clsx } from 'clsx';
import { HiMagnifyingGlass } from 'react-icons/hi2';

const SearchIcon = HiMagnifyingGlass;

interface DistributionData {
    name: string;
    riskLevel: string;
    count: number;
    color?: string;
}

interface DistributionListProps {
    data: DistributionData[];
    className?: string;
    title?: string;
    onItemClick?: (item: DistributionData) => void;
    onOpenClick?: (item: DistributionData) => void;
}

export default function DistributionList({
    data,
    className,
    title = 'State wise Distribution',
    onItemClick,
    onOpenClick
}: DistributionListProps) {
    const [search, setSearch] = useState('');

    const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className={clsx('flex h-full flex-col bg-white dark:bg-gray-900', className)}>
            <div className="border-b border-gray-200 p-4 dark:border-gray-800">
                <h3 className="text-sm font-semibold text-white bg-blue-600 px-4 py-2 -mx-4 -mt-4 mb-4">
                    {title}
                </h3>
                {/* Search Bar */}
                <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <SearchIcon className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 pl-10 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:ring-gray-700 dark:text-white"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-2">
                <div className="space-y-2">
                    {filteredData.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => onItemClick && onItemClick(item)}
                            className={clsx(
                                "flex items-center justify-between rounded-lg border border-gray-100 p-3 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800",
                                onItemClick && "cursor-pointer"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <span className={`h-2 w-2 rounded-full ${item.color || 'bg-blue-600'}`} />
                                <span className="text-sm font-medium text-gray-900 dark:text-white">{item.name}</span>
                            </div>

                            <div className="flex items-center gap-4">
                                <span className="text-xs text-gray-400">{item.riskLevel}</span>
                                <div className="text-xs font-semibold">ROs: {item.count}</div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onOpenClick && onOpenClick(item);
                                    }}
                                    className="rounded-full border border-blue-200 px-3 py-1 text-[10px] font-medium text-blue-600 hover:bg-blue-50 dark:border-blue-900 dark:text-blue-400"
                                >
                                    Open
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
