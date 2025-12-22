/**
 * Constants
 * Application-wide constants
 */

// Pump Status
export const PUMP_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  MAINTENANCE: 'maintenance',
  OFFLINE: 'offline',
  ERROR: 'error',
};

export const PUMP_STATUS_LABELS = {
  [PUMP_STATUS.ACTIVE]: 'Active',
  [PUMP_STATUS.INACTIVE]: 'Inactive',
  [PUMP_STATUS.MAINTENANCE]: 'Maintenance',
  [PUMP_STATUS.OFFLINE]: 'Offline',
  [PUMP_STATUS.ERROR]: 'Error',
};

export const PUMP_STATUS_COLORS = {
  [PUMP_STATUS.ACTIVE]: 'success',
  [PUMP_STATUS.INACTIVE]: 'neutral',
  [PUMP_STATUS.MAINTENANCE]: 'warning',
  [PUMP_STATUS.OFFLINE]: 'danger',
  [PUMP_STATUS.ERROR]: 'danger',
};

// Vehicle Types
export const VEHICLE_TYPES = {
  CAR: 'car',
  TRUCK: 'truck',
  BUS: 'bus',
  MOTORCYCLE: 'motorcycle',
  AUTO: 'auto',
  OTHER: 'other',
};

export const VEHICLE_TYPE_LABELS = {
  [VEHICLE_TYPES.CAR]: 'Car',
  [VEHICLE_TYPES.TRUCK]: 'Truck',
  [VEHICLE_TYPES.BUS]: 'Bus',
  [VEHICLE_TYPES.MOTORCYCLE]: 'Motorcycle',
  [VEHICLE_TYPES.AUTO]: 'Auto Rickshaw',
  [VEHICLE_TYPES.OTHER]: 'Other',
};

// Alert Types
export const ALERT_TYPES = {
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
  CRITICAL: 'critical',
};

export const ALERT_TYPE_LABELS = {
  [ALERT_TYPES.INFO]: 'Info',
  [ALERT_TYPES.WARNING]: 'Warning',
  [ALERT_TYPES.ERROR]: 'Error',
  [ALERT_TYPES.CRITICAL]: 'Critical',
};

export const ALERT_TYPE_COLORS = {
  [ALERT_TYPES.INFO]: 'primary',
  [ALERT_TYPES.WARNING]: 'warning',
  [ALERT_TYPES.ERROR]: 'danger',
  [ALERT_TYPES.CRITICAL]: 'danger',
};

// Report Types
export const REPORT_TYPES = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  CUSTOM: 'custom',
};

export const REPORT_TYPE_LABELS = {
  [REPORT_TYPES.DAILY]: 'Daily Report',
  [REPORT_TYPES.WEEKLY]: 'Weekly Report',
  [REPORT_TYPES.MONTHLY]: 'Monthly Report',
  [REPORT_TYPES.CUSTOM]: 'Custom Report',
};

// Export Formats
export const EXPORT_FORMATS = {
  PDF: 'pdf',
  EXCEL: 'excel',
  CSV: 'csv',
  PNG: 'png',
};

export const EXPORT_FORMAT_LABELS = {
  [EXPORT_FORMATS.PDF]: 'PDF',
  [EXPORT_FORMATS.EXCEL]: 'Excel',
  [EXPORT_FORMATS.CSV]: 'CSV',
  [EXPORT_FORMATS.PNG]: 'PNG',
};

// Date Range Presets
export const DATE_RANGE_PRESETS = {
  TODAY: 'today',
  YESTERDAY: 'yesterday',
  LAST_7_DAYS: 'last_7_days',
  LAST_30_DAYS: 'last_30_days',
  THIS_MONTH: 'this_month',
  LAST_MONTH: 'last_month',
  CUSTOM: 'custom',
};

export const DATE_RANGE_PRESET_LABELS = {
  [DATE_RANGE_PRESETS.TODAY]: 'Today',
  [DATE_RANGE_PRESETS.YESTERDAY]: 'Yesterday',
  [DATE_RANGE_PRESETS.LAST_7_DAYS]: 'Last 7 Days',
  [DATE_RANGE_PRESETS.LAST_30_DAYS]: 'Last 30 Days',
  [DATE_RANGE_PRESETS.THIS_MONTH]: 'This Month',
  [DATE_RANGE_PRESETS.LAST_MONTH]: 'Last Month',
  [DATE_RANGE_PRESETS.CUSTOM]: 'Custom Range',
};

// Sort Orders
export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

// View Modes
export const VIEW_MODES = {
  GRID: 'grid',
  LIST: 'list',
  MAP: 'map',
};

// Time Intervals (for real-time updates)
export const TIME_INTERVALS = {
  REALTIME: 1000, // 1 second
  FAST: 5000, // 5 seconds
  NORMAL: 30000, // 30 seconds
  SLOW: 60000, // 1 minute
};

// Chart Types
export const CHART_TYPES = {
  LINE: 'line',
  BAR: 'bar',
  PIE: 'pie',
  GAUGE: 'gauge',
  HEATMAP: 'heatmap',
  TREEMAP: 'treemap',
  SANKEY: 'sankey',
};

// Map Layers
export const MAP_LAYERS = {
  MARKERS: 'markers',
  HEATMAP: 'heatmap',
  CLUSTERS: 'clusters',
  ROUTES: 'routes',
};

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  VIEWER: 'viewer',
};

// Permissions
export const PERMISSIONS = {
  VIEW_DASHBOARD: 'view_dashboard',
  VIEW_ANALYTICS: 'view_analytics',
  VIEW_VEHICLES: 'view_vehicles',
  EXPORT_DATA: 'export_data',
  MANAGE_USERS: 'manage_users',
  MANAGE_SETTINGS: 'manage_settings',
};

// API Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'nayara_auth_token',
  USER_PREFERENCES: 'nayara_user_preferences',
  THEME: 'nayara_theme',
  FILTERS: 'nayara_filters',
};

// Validation Rules
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 128,
  MIN_USERNAME_LENGTH: 3,
  MAX_USERNAME_LENGTH: 50,
  NUMBER_PLATE_REGEX: /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,2}[0-9]{4}$/,
};

const constants = {
  PUMP_STATUS,
  PUMP_STATUS_LABELS,
  PUMP_STATUS_COLORS,
  VEHICLE_TYPES,
  VEHICLE_TYPE_LABELS,
  ALERT_TYPES,
  ALERT_TYPE_LABELS,
  ALERT_TYPE_COLORS,
  REPORT_TYPES,
  REPORT_TYPE_LABELS,
  EXPORT_FORMATS,
  EXPORT_FORMAT_LABELS,
  DATE_RANGE_PRESETS,
  DATE_RANGE_PRESET_LABELS,
  SORT_ORDER,
  VIEW_MODES,
  TIME_INTERVALS,
  CHART_TYPES,
  MAP_LAYERS,
  USER_ROLES,
  PERMISSIONS,
  HTTP_STATUS,
  STORAGE_KEYS,
  VALIDATION,
};

export default constants;
