
import { useEffect } from 'react';

export function useRealtimeAlerts(siteId: string, onAlert: (event: any) => void) {
    useEffect(() => {
        if (!siteId) return;

        // Use environment variable or fallback to empty string (which might result in invalid URL if not set)
        // Assuming the user has this setup or will set it up.
        const baseUrl = process.env.NEXT_PUBLIC_WS_URL || '';

        // Construct URL. Note: User snippet led with process.env.NEXT_PUBLIC_WS_URL
        // If baseUrl is empty, this might be malformed if it's relative.
        // Ideally it should be a full WS URL. 

        // If baseUrl is missing, we might want to warn or handle it, but for now implementing as requested.
        const url = `${baseUrl}/api/v1/ws/alerts?site_id=${siteId}`;

        let ws: WebSocket;
        try {
            ws = new WebSocket(url);
        } catch (e) {
            console.error("Failed to create WebSocket connection", e);
            return;
        }

        ws.onopen = () => {
            console.log('Connected to Alert Stream');
        };

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                onAlert(data);
            } catch (e) {
                console.error("Error parsing websocket message", e);
            }
        };

        ws.onerror = (e) => {
            console.error("WebSocket error", e);
        };

        return () => {
            ws.close();
        };
    }, [siteId, onAlert]);
}
