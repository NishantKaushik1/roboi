import { clsx } from "clsx";

/**
 * StatsCard Component
 * Displays a metric with label, value, and optional trend
 * Matches design: "Nayara Admin Side"
 */
interface StatsCardProps {
  label: string;
  value: string | number;
  trend?: number;
  trendLabel?: string;
  icon?: React.ElementType;
  isActive?: boolean;
  className?: string;
}

export default function StatsCard({
  label,
  value,
  trend,
  trendLabel,
  icon: Icon,
  isActive = false,
  className,
}: StatsCardProps) {
  return (
    <div
      className={clsx(
        "relative flex flex-col justify-between rounded-none border bg-white p-4 shadow-sm transition-all dark:bg-gray-900",
        isActive
          ? "border-blue-500 shadow-md ring-1 ring-blue-500 z-10"
          : "border-gray-200 dark:border-gray-800",
        className
      )}
    >
      {/* Design shows Label at top */}
      <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
        {label}
      </p>

      {/* Value in middle/bottom */}
      <div className="mt-2 flex items-baseline gap-2">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          {value}
        </h3>

        {/* Trend inline or below */}
        {trend !== undefined && (
          <span
            className={clsx(
              "text-[10px] font-medium",
              trend > 0
                ? "text-green-600 dark:text-green-400"
                : trend < 0
                  ? "text-red-600 dark:text-red-400"
                  : "text-gray-500"
            )}
          >
            {trend > 0 ? "↗" : trend < 0 ? "↘" : ""} {Math.abs(trend)}%
          </span>
        )}
      </div>

      {/* Optional extra content or icon if needed (Design doesn't show icons in top cards mostly, but keeping support) */}
      {Icon && (
        <div className="absolute right-4 top-4 text-gray-400 opacity-20">
          <Icon className="h-8 w-8" />
        </div>
      )}
    </div>
  );
}
