'use client';

import BaseChart from './BaseChart';

export default function DonutChart({ data, height = '300px' }) {
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
                    borderColor: '#fff',
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
