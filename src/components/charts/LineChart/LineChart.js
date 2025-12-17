'use client';

/**
 * LineChart Component
 * Simple line chart visualization
 * Note: Install 'echarts-for-react' for production use
 */
export default function LineChart({ data, title }) {
  return (
    <div className="h-64 w-full rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900">
      <h4 className="mb-4 text-sm font-medium text-gray-700 dark:text-gray-300">{title}</h4>
      <div className="flex h-48 items-end justify-around gap-2">
        {data?.map((value, index) => (
          <div key={index} className="flex flex-1 flex-col items-center gap-2">
            <div
              className="w-full rounded-t-md bg-gradient-to-t from-blue-500 to-blue-400 transition-all hover:from-blue-600 hover:to-blue-500"
              style={{ height: `${(value / Math.max(...data)) * 100}%` }}
            />
            <span className="text-xs text-gray-500 dark:text-gray-400">{value}</span>
          </div>
        ))}
      </div>
      <div className="mt-2 text-center text-xs text-gray-400">
        Install echarts-for-react for production charts
      </div>
    </div>
  );
}
