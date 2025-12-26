
import useSWR from 'swr';
import {
    SiteSummary,
    StreamGuardEvent,
    AnalyticsDistributionItem,
    AnalyticsTrafficResponse
} from '@/types/api';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const HEADERS = {
    "Content-Type": "application/json",
    "X-API-Key": API_KEY || '',
};

const fetcher = async (url: string) => {
    const res = await fetch(url, { headers: HEADERS });
    if (!res.ok) {
        throw new Error('An error occurred while fetching the data.');
    }
    return res.json();
};

export function useSiteSummary(siteId: string) {
    const { data, error, isLoading } = useSWR<SiteSummary>(`/api/v1/sites/${siteId}/summary`, fetcher);
    return {
        summary: data,
        isLoading,
        isError: error
    };
}

export function useSiteEvents(siteId: string, limit: number = 50) {
    const { data, error, isLoading } = useSWR<{ events: StreamGuardEvent[] }>(`/api/v1/sites/${siteId}/events?limit=${limit}`, fetcher);
    return {
        events: data?.events,
        isLoading,
        isError: error
    }
}

export function useSiteAnalyticsDistribution(siteId: string, range: string = '30d') {
    const { data, error, isLoading } = useSWR<AnalyticsDistributionItem[]>(`/api/v1/sites/${siteId}/analytics/distribution?range=${range}`, fetcher);
    return {
        distribution: data,
        isLoading,
        isError: error
    };
}

export function useSiteTrafficFlow(siteId: string, range: string = '24h') {
    const { data, error, isLoading } = useSWR<AnalyticsTrafficResponse>(`/api/v1/sites/${siteId}/analytics/traffic-flow?range=${range}`, fetcher);
    return {
        trafficData: data,
        isLoading,
        isError: error
    };
}
