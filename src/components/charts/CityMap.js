import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { useEffect, useState } from 'react';


export default function CityMap({ cityName, height = '400px', className = '' }) {
    const [isMapLoaded, setIsMapLoaded] = useState(false);
    const [mapName, setMapName] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!cityName) return;

        // Fetching India District GeoJSON
        fetch('https://raw.githubusercontent.com/geohacker/india/master/district/india_district.geojson')
            .then((response) => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then((geoJson) => {
                // Try to match city name to district name properties
                const feature = geoJson.features.find(f => {
                    const p = f.properties;
                    // Common property names for district in various GeoJSONs
                    const dName = p.district || p.NAME_2 || p.name || p.dtname;
                    return dName && dName.toLowerCase() === cityName.toLowerCase();
                });

                if (feature) {
                    const singleCityGeo = {
                        type: 'FeatureCollection',
                        features: [feature]
                    };
                    const name = `CITY_${cityName.toUpperCase().replace(/\s/g, '_')}`;
                    echarts.registerMap(name, singleCityGeo);
                    setMapName(name);
                    setIsMapLoaded(true);
                    setError(false);
                } else {
                    console.error(`City/District "${cityName}" not found in GeoJSON. Available properties example:`, geoJson.features[0].properties);
                    setError(true);
                }
            })
            .catch((err) => {
                console.error('Failed to load map data', err);
                setError(true);
            });
    }, [cityName]);

    if (error) {
        return (
            <div
                className={`flex items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/20 ${className}`}
                style={{ height }}
            >
                <div className="text-center p-4">
                    <p className="text-sm font-medium text-red-500">
                        Map data unavailable for &quot;{cityName}&quot;
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                        Try &quot;Mumbai Suburban&quot; or &quot;Pune&quot;
                    </p>
                </div>
            </div>
        );
    }

    if (!isMapLoaded || !mapName) {
        return (
            <div className={`flex items-center justify-center rounded-lg bg-gray-50 dark:bg-gray-800 ${className}`} style={{ height }}>
                <span className="text-sm text-[#595959] dark:text-[#9F9F9F]">Loading Map...</span>
            </div>
        );
    }

    const option = {
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} ROs',
        },
        visualMap: {
            show: false,
            min: 0,
            max: 500,
            inRange: {
                color: ['#3B82F6'], // Solid blue
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
                data: [],
            },
        ],
    };

    return (
        <ReactECharts
            option={option}
            style={{ height: '100%', width: '100%' }}
            className={className || "w-full"}
            opts={{ renderer: 'svg' }}
        />
    );
}
