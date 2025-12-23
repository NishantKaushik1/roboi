'use client';

import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { useEffect, useState } from 'react';

import { useTheme } from '@/hooks/useTheme';

interface MapChartProps {
    data: any[];
    height?: string;
    center?: number[];
    zoom?: number;
    className?: string;
}

export default function MapChart({ data, height = '500px', center, zoom, className }: MapChartProps) {
    const { isDark } = useTheme();
    const [isMapLoaded, setIsMapLoaded] = useState(false);
    const textColor = isDark ? '#9F9F9F' : '#333';

    useEffect(() => {
        // Fetch India GeoJSON client-side
        // Using a reliable source for India map with states (hosted locally)
        fetch('/assets/jsondata/indianstates.geojson')
            .then((response) => response.json())
            .then((geoJson) => {
                echarts.registerMap('INDIA', geoJson);
                setIsMapLoaded(true);
            })
            .catch((err) => console.error('Failed to load map data', err));
    }, []);

    if (!isMapLoaded) {
        return (
            <div className="flex items-center justify-center bg-gray-50 rounded-lg text-[#595959] dark:text-[#9F9F9F]" style={{ height }}>
                Loading Map...
            </div>
        );
    }

    const option = {
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} Pumps',
        },
        visualMap: {
            min: 0,
            max: 3000,
            left: 'right',
            bottom: '10%',
            text: ['High', 'Low'],
            textStyle: { color: textColor },
            calculable: true,
            inRange: {
                color: ['#E0F2FE', '#0284C7'], // Light blue to Brand Blue
            },
        },
        series: [
            {
                name: 'Petrol Pumps',
                type: 'map',
                map: 'INDIA',
                roam: true,
                center, // Use passed prop or undefined (auto)
                zoom,     // Use passed prop or undefined (auto)
                label: {
                    show: false,
                },
                emphasis: {
                    label: {
                        show: true,
                    },
                    itemStyle: {
                        areaColor: '#FBBF24', // Amber highlight
                    },
                },
                data,
            },
        ],
    };

    return (
        <ReactECharts
            option={option}
            style={{ height: '100%', width: '100%' }}
            className={className || "w-full"}
        />
    );
}
