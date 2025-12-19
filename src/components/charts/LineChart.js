'use client';

import BaseChart from './BaseChart';
import * as echarts from 'echarts';
import { useTheme } from '@/hooks/useTheme';
export default function LineChart({
    data,
    xAxisData,
    title,
    height = '300px',
    color = '#2563EB', // blue-600
    areaColor,
}) {
    const { isDark } = useTheme();
    const textColor = isDark ? '#9F9F9F' : '#6B7280';
    const splitLineColor = isDark ? '#374151' : '#E5E7EB'; // darker gray for dark mode

    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'line',
            },
            formatter: '{b}: {c}',
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: xAxisData,
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                color: textColor,
                fontSize: 10,
            },
        },
        yAxis: {
            type: 'value',
            axisLine: {
                show: false,
            },
            splitLine: {
                lineStyle: {
                    color: splitLineColor,
                    type: 'dashed',
                },
            },
            axisLabel: {
                color: textColor,
                fontSize: 10,
            },
        },
        series: [
            {
                name: title,
                type: 'line',
                smooth: true,
                showSymbol: false,
                lineStyle: {
                    width: 3,
                    color: color,
                },
                itemStyle: {
                    color: color,
                },
                areaStyle: areaColor ? {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: areaColor, // Start color
                        },
                        {
                            offset: 1,
                            color: 'rgba(255, 255, 255, 0)', // End color (transparent)
                        },
                    ]),
                } : undefined,
                data: data,
                markPoint: {
                    // Example of how we might add that "Incident: 16" annotation from the design
                    // For now, we'll keep it simple or allow passing it in data
                }
            },
        ],
    };

    return <BaseChart option={option} height={height} />;
}
