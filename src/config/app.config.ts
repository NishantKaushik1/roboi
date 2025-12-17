/**
 * Application Configuration
 * Central configuration file for the Nayara Admin application
 */

export const APP_CONFIG = {
  // Application Info
  name: 'Nayara Admin',
  version: '1.0.0',
  description: 'Video Analytics Dashboard for 7,000+ Pumps with Real-time AI',

  // API Configuration
  api: {
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api',
    timeout: 30000,
    retries: 3,
    retryDelay: 1000,
  },

  // WebSocket Configuration
  websocket: {
    url: process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:4000',
    reconnectInterval: parseInt(process.env.NEXT_PUBLIC_WS_RECONNECT_INTERVAL) || 5000,
    maxRetries: parseInt(process.env.NEXT_PUBLIC_WS_MAX_RETRIES) || 5,
  },

  // Pagination
  pagination: {
    defaultPageSize: parseInt(process.env.NEXT_PUBLIC_DEFAULT_PAGE_SIZE) || 20,
    maxPageSize: parseInt(process.env.NEXT_PUBLIC_MAX_PAGE_SIZE) || 100,
    pageSizeOptions: [10, 20, 50, 100],
  },

  // Cache Configuration
  cache: {
    cacheTime: parseInt(process.env.NEXT_PUBLIC_CACHE_TIME) || 300000, // 5 minutes
    staleTime: parseInt(process.env.NEXT_PUBLIC_STALE_TIME) || 60000, // 1 minute
  },

  // Feature Flags
  features: {
    realtime: process.env.NEXT_PUBLIC_ENABLE_REALTIME === 'true',
    export: process.env.NEXT_PUBLIC_ENABLE_EXPORT === 'true',
    darkMode: process.env.NEXT_PUBLIC_ENABLE_DARK_MODE === 'true',
  },

  // Export Configuration
  export: {
    maxRecords: parseInt(process.env.NEXT_PUBLIC_MAX_EXPORT_RECORDS) || 10000,
    formats: ['pdf', 'excel', 'csv', 'png'],
  },

  // Date Format
  dateFormat: {
    display: 'dd MMM yyyy',
    displayWithTime: 'dd MMM yyyy, HH:mm',
    api: 'yyyy-MM-dd',
    apiWithTime: "yyyy-MM-dd'T'HH:mm:ss",
  },

  // Toast Configuration
  toast: {
    position: 'top-right',
    duration: 4000,
    success: {
      duration: 3000,
      icon: '✅',
    },
    error: {
      duration: 5000,
      icon: '❌',
    },
    warning: {
      duration: 4000,
      icon: '⚠️',
    },
  },

  // Table Configuration
  table: {
    defaultSortOrder: 'desc',
    stickyHeader: true,
    showPagination: true,
  },
};

export default APP_CONFIG;
