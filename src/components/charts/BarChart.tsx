'use client';

import BaseChart from './BaseChart';
import { useTheme } from '@/hooks/useTheme';
export default function BarChart({
    data,
    categories,
    horizontal = false,
    stacked = false,
    colors = ['#EF4444', '#F59E0B', '#10B981', '#3B82F6'], // Default to red, yellow, green, blue
    height = '300px'
}) {
    const { isDark } = useTheme();
    const isHorizontal = horizontal;
    const textColor = isDark ? '#9F9F9F' : '#6B7280';
    const splitLineColor = isDark ? '#374151' : '#E5E7EB';

    // Transform data for ECharts series
    const series = data.map((item, index) => ({
        name: item.name,
        type: 'bar',
        stack: stacked ? 'total' : undefined,
        data: item.values,
        itemStyle: {
            color: item.color || colors[index % colors.length],
            borderRadius: stacked ? 0 : [4, 4, 0, 0], // Rounded top for non-stacked
        },
        emphasis: { focus: 'series' },
        barWidth: stacked ? '60%' : 'auto',
    }));

    if (horizontal) {
        // Swap rounded corners for horizontal
        series.forEach(s => {
            s.itemStyle.borderRadius = stacked ? 0 : [0, 4, 4, 0];
        });
    }

    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' },
        },
        legend: {
            bottom: 0,
            icon: 'circle',
            itemWidth: 8,
            itemHeight: 8,
            textStyle: { color: textColor }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            top: '10%',
            containLabel: true,
        },
        xAxis: isHorizontal
            ? {
                type: 'value',
                splitLine: { show: true, lineStyle: { type: 'dashed', color: splitLineColor } },
                axisLabel: { color: textColor }
            }
            : {
                type: 'category',
                data: categories,
                axisTick: { show: false },
                axisLabel: { color: textColor }
            },
        yAxis: isHorizontal
            ? {
                type: 'category',
                data: categories,
                axisTick: { show: false },
                axisLabel: { color: textColor }
            }
            : {
                type: 'value',
                splitLine: { show: true, lineStyle: { type: 'dashed', color: splitLineColor } },
                axisLabel: { color: textColor }
            },
        series,
    };

    return <BaseChart option={option} height={height} />;
}
