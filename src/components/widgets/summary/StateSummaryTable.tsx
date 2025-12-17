'use client';

interface SummaryData {
    state?: string;
    name?: string;
    incidents: number;
    uptime: number;
}

interface SummaryTableProps {
    data: SummaryData[];
    entityLabel?: string;
    className?: string;
}

export default function SummaryTable({
    data,
    entityLabel = 'State',
    className = ''
}: SummaryTableProps) {
    return (
        <div className={`w-full overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-gray-800 ${className}`}>
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700 flex justify-between">
                <div className="w-1/4">{entityLabel}</div>
                <div className="w-1/4 text-center">Incidents</div>
                <div className="w-1/2 text-right">Camera Uptime</div>
            </div>

            <div className="divide-y divide-gray-200 dark:divide-gray-800 font-barlow">
                {data.map((row, index) => (
                    <div key={index} className="flex items-center px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <div className="w-1/4 text-sm font-medium text-gray-900 dark:text-white">{row.state || row.name}</div>
                        <div className="w-1/4 text-center text-sm text-gray-500">{row.incidents}</div>
                        <div className="w-1/2 flex items-center justify-end gap-3">
                            <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
                                <div className="h-full bg-green-600 rounded-full" style={{ width: `${row.uptime}%` }} />
                            </div>
                            <span className="text-sm font-medium w-12 text-right">{row.uptime}%</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
