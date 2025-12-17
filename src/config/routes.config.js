/**
 * Routes Configuration
 * Centralized route definitions for the application
 */

export const ROUTES = {
  // Public Routes
  public: {
    login: '/login',
    forgotPassword: '/forgot-password',
  },

  // Dashboard Routes
  dashboard: {
    root: '/hq-overview',
    hqOverview: '/hq-overview',
    stateWise: '/state-wise',
    cityWise: '/city-wise',
    anprVehicles: '/anpr-vehicles',
    vehicleProfile: (vehicleId) => `/vehicle-profile/${vehicleId}`,
  },

  // API Routes
  api: {
    analytics: {
      hqOverview: '/api/analytics/hq-overview',
      stateWise: '/api/analytics/state-wise',
      cityWise: '/api/analytics/city-wise',
      realtime: '/api/analytics/realtime',
    },
    vehicles: {
      list: '/api/vehicles',
      search: '/api/vehicles/search',
      profile: (vehicleId) => `/api/vehicles/${vehicleId}`,
      timeline: (vehicleId) => `/api/vehicles/${vehicleId}/timeline`,
    },
    reports: {
      generate: '/api/reports/generate',
      download: (reportId) => `/api/reports/${reportId}/download`,
      list: '/api/reports',
    },
    auth: {
      login: '/api/auth/login',
      logout: '/api/auth/logout',
      refresh: '/api/auth/refresh',
      me: '/api/auth/me',
    },
  },
};

// Navigation Menu Items
export const NAVIGATION = [
  {
    name: 'HQ Overview',
    href: ROUTES.dashboard.hqOverview,
    icon: 'HiHome',
    description: 'High-level overview of all pumps',
  },
  {
    name: 'State-wise',
    href: ROUTES.dashboard.stateWise,
    icon: 'HiMap',
    description: 'State-level analytics',
  },
  {
    name: 'City-wise',
    href: ROUTES.dashboard.cityWise,
    icon: 'HiLocationMarker',
    description: 'City-level analytics',
  },
  {
    name: 'ANPR Vehicles',
    href: ROUTES.dashboard.anprVehicles,
    icon: 'HiTruck',
    description: 'Captured vehicles',
  },
];

// Breadcrumb Configuration
export const BREADCRUMBS = {
  '/hq-overview': [
    { name: 'Dashboard', href: ROUTES.dashboard.root },
    { name: 'HQ Overview' },
  ],
  '/state-wise': [
    { name: 'Dashboard', href: ROUTES.dashboard.root },
    { name: 'State-wise Analytics' },
  ],
  '/city-wise': [
    { name: 'Dashboard', href: ROUTES.dashboard.root },
    { name: 'City-wise Analytics' },
  ],
  '/anpr-vehicles': [
    { name: 'Dashboard', href: ROUTES.dashboard.root },
    { name: 'ANPR Vehicles' },
  ],
  '/vehicle-profile': [
    { name: 'Dashboard', href: ROUTES.dashboard.root },
    { name: 'ANPR Vehicles', href: ROUTES.dashboard.anprVehicles },
    { name: 'Vehicle Profile' },
  ],
};

export default ROUTES;
