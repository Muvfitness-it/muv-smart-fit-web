
/// <reference types="vite/client" />

// Extend Window interface for Google Analytics gtag
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: {
        page_title?: string;
        page_location?: string;
        campaign_name?: string;
        send_to?: string;
        [key: string]: any;
      }
    ) => void;
    dataLayer: any[];
  }
}

// Performance API extensions
interface PerformanceEventTiming extends PerformanceEntry {
  processingStart: number;
  processingEnd: number;
}

interface LayoutShiftEntry extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

export {};
