
import { clsx } from 'clsx';
import React from 'react'; // Assuming React is used for React.ReactNode

interface CardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  bodyClassName?: string;
}

/**
 * Card Component
 * Reusable card container with optional header and footer
 */
export default function Card({
  title,
  subtitle,
  children,
  footer,
  className,
  bodyClassName,
}: CardProps) {
  return (
    <div
      className={clsx(
        'rounded-lg border border-gray-200 bg-white shadow-sm',
        'dark:border-gray-800 dark:bg-gray-900',
        className
      )}
    >
      {(title || subtitle) && (
        <div className="px-6 py-4 dark:border-gray-800">
          {title && <h3 className="text-lg font-semibold text-[#1C2347] dark:text-white">{title}</h3>}
          {subtitle && <p className="mt-1 text-sm text-[#595959] dark:text-[#8C8C8C]">{subtitle}</p>}
        </div>
      )}
      <div className="flex-1 min-h-0 p-6">{children}</div>
      {footer && (
        <div className="border-t border-gray-200 px-6 py-4 dark:border-gray-800">{footer}</div>
      )}
    </div>
  );
}
