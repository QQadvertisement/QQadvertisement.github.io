// src/lib/analytics.ts

import ReactGA from 'react-ga4';

const GA_TRACKING_ID = 'G-N0CVY6TYW3';

export const initGoogleAnalytics = () => {
    if (typeof window === 'undefined' || import.meta.env.DEV) return;
  
    ReactGA.initialize(GA_TRACKING_ID);
  };

// Track page views
export const trackPageView = (path: string) => {
  ReactGA.send({ hitType: "pageview", page: path });
};

// Track user interactions
export const trackEvent = (category: string, action: string, label?: string, value?: number) => {
  ReactGA.event({
    category,
    action,
    label,
    value,
  });
};

// Track user engagement time
export const trackEngagementTime = (timeInSeconds: number, section: string) => {
  ReactGA.event({
    category: 'Engagement',
    action: 'Time Spent',
    label: section,
    value: Math.round(timeInSeconds),
  });
};

// Track scroll depth
export const trackScrollDepth = (depth: number, section: string) => {
  ReactGA.event({
    category: 'Scroll',
    action: 'Depth',
    label: section,
    value: depth,
  });
};

// Track form interactions
export const trackFormInteraction = (formName: string, action: 'start' | 'complete' | 'error', details?: string) => {
  ReactGA.event({
    category: 'Form',
    action: `${formName} - ${action}`,
    label: details,
  });
};

// Track CTA clicks
export const trackCTAClick = (ctaText: string, location: string) => {
  ReactGA.event({
    category: 'CTA',
    action: 'Click',
    label: `${ctaText} - ${location}`,
  });
};

// Track game interactions
export const trackGameInteraction = (action: string, details?: string) => {
  ReactGA.event({
    category: 'Game',
    action: action,
    label: details,
  });
};