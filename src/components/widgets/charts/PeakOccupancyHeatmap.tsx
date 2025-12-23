'use client';

import React from 'react';
import BaseChart from '@/components/charts/BaseChart';
import { useTheme } from '@/hooks/useTheme';

const HOURS = [
    '9a', '10a', '11a', '12p', '1p', '2p', '3p', '4p', '5p', '6p'
];

const LOCATIONS = [
    'BOSS CABIN',
    'RECEPTION',
    'EMPLOYEE AREA',
    'CAFETERIA'
];

interface HeatmapData {
    value: [number, number, number]; // [xIndex, yIndex, count]
}

// Generate some quasi-realistic mock data
// x: Hour index, y: Location index, value: Count
const generateData = (): HeatmapData[] => {
    const data: HeatmapData[] = [];
    for (let x = 0; x < HOURS.length; x++) {
        for (let y = 0; y < LOCATIONS.length; y++) {
            // Random counts with some logic based on location
            let count = 0;
            const hour = 9 + x; // 24h format approx

            if (LOCATIONS[y] === 'CAFETERIA') {
                // Peek at lunch 12-2
                if (hour >= 12 && hour <= 14) count = Math.floor(Math.random() * 8) + 5;
                else count = Math.floor(Math.random() * 4);
            } else if (LOCATIONS[y] === 'EMPLOYEE AREA') {
                // Generally busy
                count = Math.floor(Math.random() * 10) + 2;
            } else if (LOCATIONS[y] === 'RECEPTION') {
                // Moderate
                count = Math.floor(Math.random() * 5) + 1;
            } else {
                // Boss Cabin - low occupancy
                count = Math.floor(Math.random() * 3);
            }

            data.push({
                value: [x, y, count]
            });
        }
    }
    return data;
};

const heatmapData = generateData();

export default function PeakOccupancyHeatmap() {
    // We can use the theme hook to adjust chart colors if needed
    // But since BaseChart handles some defaults, we'll focus on the option configuration
    const { isDark } = useTheme();
    const textColor = isDark ? '#9F9F9F' : '#6B7280';

    // Max value for visual map to auto-scale colors
    const maxVal = Math.max(...heatmapData.map(d => d.value[2]));

    const option = {
        tooltip: {
            position: 'top',
            formatter: function (params: any) {
                // params.value = [xIndex, yIndex, count]
                const xIndex = params.value[0];
                const yIndex = params.value[1];
                const count = params.value[2];
                return `${LOCATIONS[yIndex]}<br/>${HOURS[xIndex]}: <b>${count} people</b>`;
            }
        },
        grid: {
            height: '70%',
            top: '10%',
            bottom: '15%',
            left: '15%', // Make room for location names
            right: '5%'
        },
        xAxis: {
            type: 'category',
            data: HOURS,
            splitArea: {
                show: true,
                areaStyle: {
                    color: isDark ? ['rgba(255,255,255,0.02)', 'rgba(255,255,255,0.05)'] : ['rgba(0,0,0,0.01)', 'rgba(0,0,0,0.02)']
                }
            },
            axisLabel: {
                color: textColor,
                fontSize: 11
            },
            axisLine: { show: false },
            axisTick: { show: false }
        },
        yAxis: {
            type: 'category',
            data: LOCATIONS,
            splitArea: {
                show: true
            },
            axisLabel: {
                color: textColor,
                fontSize: 10,
                fontWeight: 600
            },
            axisLine: { show: false },
            axisTick: { show: false }
        },
        visualMap: {
            min: 0,
            max: 12, // Fixed max for consistency or use maxVal
            calculable: false,
            orient: 'horizontal',
            left: 'center',
            bottom: '0%',
            itemWidth: 15,
            itemHeight: 15,
            text: ['High', 'Low'],
            textStyle: {
                color: textColor,
                fontSize: 10
            },
            inRange: {
                // Gradient from Emerald (Low) -> Amber -> Red (High)
                // Using approx hex codes for tailwind colors
                // Emerald-400 (#34d399), Amber-400 (#fbbf24), Rose-500 (#f43f5e)
                color: ['#34d399', '#fbbf24', '#f43f5e']
            },
            controller: {
                inRange: {
                    color: ['#34d399', '#fbbf24', '#f43f5e']
                }
            }
        },
        series: [{
            name: 'Occupancy',
            type: 'heatmap',
            data: heatmapData,
            label: {
                show: true,
                color: '#fff',
                fontSize: 11,
                fontWeight: 'bold'
                // formatter: '{@score}' // shows value
            },
            itemStyle: {
                borderRadius: 4,
                borderColor: isDark ? '#111827' : '#fff', // Match bg to create 'gap'
                borderWidth: 2
            },
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    };

    return (
        <div className="w-full h-full min-h-[300px] flex flex-col">
            <BaseChart option={option} height="100%" />
        </div>
    );
}
