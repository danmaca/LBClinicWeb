import { SITE_CONFIG } from "./config";

/**
 * Minimal Google Analytics 4 helper for SPA page-view tracking.
 *
 * The GA4 gtag.js snippet in index.html is initialised with
 * `send_page_view: false` so that the automatic page view on load
 * is suppressed. Instead we fire `page_view` events manually via
 * `gtag("event", "page_view", { ... })` whenever the hash-based
 * route changes.
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
 * Uses `gtag("event", "page_view", ...)` which is the recommended
 * approach for SPAs — as opposed to calling `gtag("config", ...)`
 * repeatedly, which is only meant for initial setup.
 *
 * @param path      The logical route path, e.g. "/" or "/gallery"
 * @param language  The active UI language code, e.g. "cs", "en"
 * @param title     Human-readable page title for GA4 reporting
 */
export function trackPageView(path: string, language?: string, title?: string): void {
  if (typeof window.gtag !== "function") return;

  window.gtag("event", "page_view", {
    page_title: title ?? document.title,
    page_path: path,
    page_location: window.location.href,
    send_to: SITE_CONFIG.gaMeasurementId,
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
