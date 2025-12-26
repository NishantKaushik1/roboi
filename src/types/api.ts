
export type SiteStatus = "ONLINE" | "OFFLINE";
export type EventSeverity = "CRITICAL" | "WARNING" | "INFO";

export interface SiteMetric {
    activeSensors: number;
    openAlerts: number;
    trafficCount: number;
    peakDensity: number;
    complianceScore: number;
}

export interface SiteSummary {
    siteId: string;
    status: SiteStatus;
    metrics: SiteMetric;
}

export interface AnalyticsDistributionItem {
    label: string;
    value: number;
    percentage: number;
}

export interface AnalyticsTrafficSeries {
    key: string;
    data: number[];
}

export interface AnalyticsTrafficResponse {
    timestamps: string[];
    series: AnalyticsTrafficSeries[];
}

export interface EventMetadata {
    detectedObjects: string[];
    confidence: number;
    snapshotUrl?: string;
}

export interface StreamGuardEvent {
    id: string;
    timestamp: string; // ISO Date
    sourceId: string;
    sourceName: string;
    type: "SECURITY" | "SAFETY" | "OPERATIONS";
    subType: string;
    severity: EventSeverity;
    metadata: EventMetadata;
}
