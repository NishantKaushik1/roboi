'use client';

import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { useEffect, useState } from 'react';

export default function SingleStateMap({ stateName, data = [], height = '400px', className = '' }) {
    const [isMapLoaded, setIsMapLoaded] = useState(false);
    const [mapName, setMapName] = useState(null);

    useEffect(() => {
        if (!stateName) return;

        fetch('https://raw.githubusercontent.com/Subhash9325/GeoJson-Data-of-Indian-States/master/Indian_States')
            .then((response) => response.json())
            .then((geoJson) => {
                // Filter for specific state
                // Note: properties.NAME_1 is usually the state name in this specific GeoJSON, need to be sure.
                // Or properties.st_nm. Let's assume standard names.
                // We'll try to find a feature that roughly matches.

                const feature = geoJson.features.find(f =>
                    f.properties.NAME_1?.toLowerCase() === stateName.toLowerCase() ||
                    f.properties.st_nm?.toLowerCase() === stateName.toLowerCase()
                );

                if (feature) {
                    const singleStateGeo = {
                        type: 'FeatureCollection',
                        features: [feature]
                    };
                    const name = `STATE_${stateName.toUpperCase().replace(/\s/g, '_')}`;
                    echarts.registerMap(name, singleStateGeo);
                    setMapName(name);
                    setIsMapLoaded(true);
                } else {
                    console.error(`State "${stateName}" not found in GeoJSON.`);
                    // Fallback to full India map or show error? For now, nothing.
                }
            })
            .catch((err) => console.error('Failed to load map data', err));
    }, [stateName]);

    if (!isMapLoaded || !mapName) {
        return (
            <div className="flex items-center justify-center bg-gray-50 rounded-lg text-gray-500" style={{ height }}>
                Loading {stateName}...
            </div>
        );
    }

    const option = {
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} ROs',
        },
        visualMap: {
            show: false, // Hide visual map for single state usually, unless we have regions inside? 
            // Design shows visual gradient. We can keep it if we have regional data inside the state?
            // Actually the design shows "City wise Distribution" separate. The map is just one blue blob or regions?
            // The map in design is one color (blue).
            min: 0,
            max: 500,
            inRange: {
                color: ['#3B82F6'], // Solid blue for the state
            },
        },
        series: [
            {
                name: 'ROs',
                type: 'map',
                map: mapName,
                roam: true,
                label: {
                    show: false,
                },
                itemStyle: {
                    areaColor: '#3B82F6',
                    borderColor: '#ffffff',
                },
                emphasis: {
                    itemStyle: {
                        areaColor: '#2563EB',
                    },
                    label: {
                        show: false,
                    }
                },
                select: {
                    disabled: true
                },
                data: [], // If we had per-district data we could pass it here
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
