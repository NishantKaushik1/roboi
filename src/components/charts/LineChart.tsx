'use client';

import BaseChart from './BaseChart';
import * as echarts from 'echarts';
import { useTheme } from '@/hooks/useTheme';

interface Dataset {
    name: string;
    data: number[];
    color: string;
    areaColor?: string;
}

interface LineChartProps {
    data?: number[];
    xAxisData: string[];
    title?: string;
    height?: string;
    color?: string;
    areaColor?: string;
    datasets?: Dataset[];
}

export default function LineChart({
    data,
    xAxisData,
    title,
    height = '300px',
    color = '#2563EB', // blue-600
    areaColor,
    datasets,
}: LineChartProps) {
    const { isDark } = useTheme();
    const textColor = isDark ? '#9F9F9F' : '#6B7280';
    const splitLineColor = isDark ? '#374151' : '#E5E7EB';

    const series = datasets
        ? datasets.map((d) => ({
            name: d.name,
            type: 'line',
            smooth: true,
            showSymbol: false,
            lineStyle: {
                width: 3,
                color: d.color,
            },
            itemStyle: {
                color: d.color,
            },
            areaStyle: d.areaColor
                ? {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: d.areaColor },
                        { offset: 1, color: 'rgba(255, 255, 255, 0)' },
                    ]),
                }
                : undefined,
            data: d.data,
        }))
        : [
            {
                name: title,
                type: 'line',
                smooth: true,
                showSymbol: false,
                lineStyle: {
                    width: 3,
                    color,
                },
                itemStyle: {
                    color,
                },
                areaStyle: areaColor
                    ? {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: areaColor },
                            { offset: 1, color: 'rgba(255, 255, 255, 0)' },
                        ]),
                    }
                    : undefined,
                data,
            },
        ];

    const option = {
        tooltip: {
            trigger: 'axis',
        },
        legend: datasets
            ? {
                bottom: 0,
                icon: 'circle',
                itemWidth: 8,
                itemHeight: 8,
                textStyle: { color: textColor },
            }
            : undefined,
        grid: {
            left: '3%',
            right: '4%',
            bottom: datasets ? '10%' : '3%',
            top: '10%',
            containLabel: true,
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: xAxisData,
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: {
                color: textColor,
                fontSize: 12,
            },
        },
        yAxis: {
            type: 'value',
            axisLine: { show: false },
            splitLine: {
                lineStyle: {
                    color: splitLineColor,
                    type: 'dashed',
                },
            },
            axisLabel: {
                color: textColor,
                fontSize: 12,
            },
        },
        series,
    };

    return <BaseChart option={option} height={height} />;
}
