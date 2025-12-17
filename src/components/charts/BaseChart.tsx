'use client';

import ReactECharts from 'echarts-for-react';
import { useEffect, useState } from 'react';

/**
 * BaseChart Component
 * A wrapper around ReactECharts to handle responsiveness and theming.
 */
interface BaseChartProps {
    option: any;
    height?: string;
    className?: string;
    onEvents?: Record<string, Function>;
}

export default function BaseChart({ option, height = '300px', className, onEvents }: BaseChartProps) {
    const [mounted, setMounted] = useState(false);
    // Simple check for dark mode if needed, or just default to light for now to fix build
    const theme: string = 'light';

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div style={{ height }} className="animate-pulse bg-gray-100 dark:bg-gray-800 rounded-lg" />;

    const defaultOption = {
        backgroundColor: 'transparent',
        textStyle: {
            fontFamily: 'Inter, sans-serif',
        },
        ...option,
    };

    return (
        <ReactECharts
            option={defaultOption}
            style={{ height, width: '100%' }}
            className={className}
            theme={theme === 'dark' ? 'dark' : undefined}
            opts={{ renderer: 'svg' }}
            onEvents={onEvents}
        />
    );
}
