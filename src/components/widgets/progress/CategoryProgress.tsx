'use client';

// Simple progress bars matching the design
const CATEGORIES = [
    { label: 'Uniform', value: 65, color: 'bg-green-600' },
    { label: 'Fire', value: 60, color: 'bg-green-600' },
    { label: 'Queue', value: 70, color: 'bg-green-600' },
    { label: 'Tank', value: 55, color: 'bg-green-600' },
    { label: 'Theft', value: 55, color: 'bg-green-600' },
    { label: 'People', value: 55, color: 'bg-green-600' },
    { label: 'Baloons', value: 55, color: 'bg-green-600' },
    { label: 'Residue', value: 55, color: 'bg-green-600' },
];

export default function CategoryProgress() {
    return (
        <div className="flex flex-col gap-4 h-full overflow-y-auto">
            {CATEGORIES.map((cat, idx) => (
                <div key={idx} className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 rounded-[8px] border border-gray-100 bg-white p-2  dark:border-gray-800 dark:bg-gray-800 shadow-sm">
                        <div className="w-24 shrink-0 text-center text-sm font-medium text-[#1C2347] dark:text-gray-300 border-r border-gray-100 px-2 dark:border-gray-700">
                            {cat.label}
                        </div>
                        <div className="flex-1 h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden mx-2">
                            <div
                                className={`h-full rounded-full ${cat.color}`}
                                style={{ width: `${cat.value}%` }}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
