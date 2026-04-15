import { SITE_CONFIG } from "./config";

/**
 * Minimal Google Analytics 4 helper for SPA page-view tracking.
 *
 * The GA4 gtag.js snippet in index.html is initialised with
 * `send_page_view: false` so that we can fire page views manually
 * whenever the hash-based route changes.
 */

// Extend Window to include gtag / dataLayer
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Send a `page_view` event to Google Analytics 4.
 *
 * @param path      The logical route path, e.g. "/" or "/gallery"
 * @param language  The active UI language code, e.g. "cs", "en"
 * @param title     Human-readable page title for GA4 reporting
 */
export function trackPageView(path: string, language?: string, title?: string): void {
  if (typeof window.gtag !== "function") return;

  window.gtag("config", SITE_CONFIG.gaMeasurementId, {
    page_path: path,
    page_title: title ?? document.title,
    page_location: window.location.href,
    ...(language ? { language } : {}),
  });
}

/**
 * Send a custom event to Google Analytics 4.
 *
 * @param eventName  GA4 event name (e.g. "contact_form_submit")
 * @param params     Optional event parameters
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>,
): void {
  if (typeof window.gtag !== "function") return;

  window.gtag("event", eventName, params);
}
