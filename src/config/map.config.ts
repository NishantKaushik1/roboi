/**
 * Map Configuration
 * Mapbox and map-related configurations
 */

export const MAP_CONFIG = {
  // Mapbox Access Token
  accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '',

  // Default Map Settings
  defaultCenter: {
    lat: parseFloat(process.env.NEXT_PUBLIC_MAP_DEFAULT_CENTER_LAT) || 20.5937, // India center
    lng: parseFloat(process.env.NEXT_PUBLIC_MAP_DEFAULT_CENTER_LNG) || 78.9629,
  },

  defaultZoom: parseInt(process.env.NEXT_PUBLIC_MAP_DEFAULT_ZOOM) || 5,

  // Map Styles
  styles: {
    light: 'mapbox://styles/mapbox/light-v11',
    dark: 'mapbox://styles/mapbox/dark-v11',
    streets: 'mapbox://styles/mapbox/streets-v12',
    satellite: 'mapbox://styles/mapbox/satellite-streets-v12',
    outdoors: 'mapbox://styles/mapbox/outdoors-v12',
  },

  // Default Style
  defaultStyle: 'mapbox://styles/mapbox/streets-v12',

  // Zoom Limits
  minZoom: 2,
  maxZoom: 18,

  // Marker Configuration
  marker: {
    color: '#0ea5e9',
    size: 'medium',
    draggable: false,
  },

  // Cluster Configuration
  cluster: {
    enabled: true,
    radius: 50,
    maxZoom: 14,
    colors: {
      small: '#51bbd6',
      medium: '#f1f075',
      large: '#f28cb1',
    },
    thresholds: {
      small: 10,
      medium: 50,
      large: 100,
    },
  },

  // Heat Map Configuration
  heatmap: {
    intensity: 1,
    radius: 20,
    opacity: 0.6,
    gradient: [
      'interpolate',
      ['linear'],
      ['heatmap-density'],
      0, 'rgba(33,102,172,0)',
      0.2, 'rgb(103,169,207)',
      0.4, 'rgb(209,229,240)',
      0.6, 'rgb(253,219,199)',
      0.8, 'rgb(239,138,98)',
      1, 'rgb(178,24,43)',
    ],
  },

  // Animation Settings
  animation: {
    duration: 1000,
    easing: 'ease-in-out',
  },

  // Controls
  controls: {
    navigation: true,
    fullscreen: true,
    geolocate: true,
    scale: true,
  },

  // Popup Configuration
  popup: {
    closeButton: true,
    closeOnClick: false,
    maxWidth: '300px',
    offset: 10,
  },

  // India State Boundaries (for reference)
  indiaStates: [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  ],
};

export default MAP_CONFIG;
