import { useState, useCallback, useEffect } from "react";

/**
 * Extracts the path portion from the current hash.
 * "#/gallery" → "/gallery"
 * "#/gallery#section" → "/gallery"
 * "" or "#" or "#team" (anchor) → "/"
 */
function getPathFromHash(): string {
  const hash = window.location.hash;

  // Hash-based route paths start with "#/"
  if (hash.startsWith("#/")) {
    // Strip the leading "#" and remove any trailing anchor
    const path = hash.slice(1).split("#")[0];
    return path || "/";
  }

  return "/";
}

export interface HashRouter {
  /** Current route path, e.g. "/" or "/gallery" */
  path: string;
  /** Navigate to a route path. Scrolls to top by default. */
  navigate: (to: string, options?: { scrollToTop?: boolean }) => void;
}

/**
 * Minimal hash-based router hook.
 *
 * Routes use the `#/path` convention so they don't conflict
 * with in-page anchors like `#team` or `#pricing`.
 *
 * Usage:
 * ```ts
 * const { path, navigate } = useHashRouter();
 *
 * if (path === "/gallery") return <GalleryPage />;
 * return <HomePage />;
 * ```
 */
export function useHashRouter(): HashRouter {
  const [path, setPath] = useState<string>(getPathFromHash);

  useEffect(() => {
    const handleHashChange = () => {
      setPath(getPathFromHash());
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigate = useCallback(
    (to: string, options: { scrollToTop?: boolean } = {}) => {
      const { scrollToTop = true } = options;

      if (to === "/") {
        // Go home — clear the hash entirely for a clean URL
        history.pushState(null, "", window.location.pathname + window.location.search);
        // Manually trigger state update since pushState doesn't fire hashchange
        setPath("/");
      } else {
        window.location.hash = `#${to}`;
      }

      if (scrollToTop) {
        window.scrollTo(0, 0);
      }
    },
    [],
  );

  return { path, navigate };
}
