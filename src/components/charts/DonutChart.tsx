'use client';

import BaseChart from './BaseChart';
import { useTheme } from '@/hooks/useTheme';

export default function DonutChart({ data, height = '300px' }) {
    const { isDark } = useTheme();
    const textColor = isDark ? '#9F9F9F' : '#6B7280';

    const option = {
        tooltip: {
            trigger: 'item',
        },
        legend: {
            orient: 'vertical',
            right: '0%',
            top: 'center',
            icon: 'circle',
            itemWidth: 8,
            itemHeight: 8,
            textStyle: { color: textColor }
        },
        series: [
            {
                name: 'Distribution',
                type: 'pie',
                radius: ['50%', '70%'],
                center: ['35%', '50%'], // Move left to make room for legend
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 0,
                    borderColor: isDark ? '#111827' : '#fff', // match background
                    borderWidth: 2,
                },
                label: {
                    show: false,
                    position: 'center',
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: isDark ? '#fff' : '#333'
                    },
                },
                labelLine: {
                    show: false,
                },
                data: data,
            },
        ],
    };

    return <BaseChart option={option} height={height} />;
}
