'use client';

// Simple progress bars matching the design

interface CategoryItem {
    label: string;
    value: number;
    percentage: number;
    color?: string;
}

interface CategoryProgressProps {
    data?: CategoryItem[];
}

export default function CategoryProgress({ data = [] }: CategoryProgressProps) {
    return (
        <div className="flex flex-col gap-4 h-full overflow-y-auto">
            {data.map((cat, idx) => (
                <div key={idx} className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 rounded-[8px] border border-gray-100 bg-white p-2  dark:border-gray-800 dark:bg-gray-800 shadow-sm">
                        <div className="w-24 shrink-0 text-center text-sm font-medium text-[#1C2347] dark:text-gray-300 border-r border-gray-100 px-2 dark:border-gray-700">
                            {cat.label}
                        </div>
                        <div className="flex-1 h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden mx-2">
                            <div
                                className={`h-full rounded-full ${cat.color || 'bg-blue-500'}`}
                                style={{ width: `${cat.percentage}%` }}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
