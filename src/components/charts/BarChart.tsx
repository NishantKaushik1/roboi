'use client';

import BaseChart from './BaseChart';

export default function BarChart({
    data,
    categories,
    horizontal = false,
    stacked = false,
    colors = ['#EF4444', '#F59E0B', '#10B981', '#3B82F6'], // Default to red, yellow, green, blue
    height = '300px'
}) {
    const isHorizontal = horizontal;

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
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            top: '10%',
            containLabel: true,
        },
        xAxis: isHorizontal
            ? { type: 'value', splitLine: { show: true, lineStyle: { type: 'dashed' } } }
            : { type: 'category', data: categories, axisTick: { show: false } },
        yAxis: isHorizontal
            ? { type: 'category', data: categories, axisTick: { show: false } }
            : { type: 'value', splitLine: { show: true, lineStyle: { type: 'dashed' } } },
        series: series,
    };

    return <BaseChart option={option} height={height} />;
}
