import type { FC } from "react";
import { HomePage } from "../pages/HomePage";
import { GalleryPage } from "../pages/GalleryPage";
import { TreatmentPage } from "../pages/TreatmentPage";
import { ReferencePage } from "../pages/ReferencePage";

export interface RouteDefinition {
  /** Hash-based path, e.g. "/" or "/gallery" */
  path: string;
  /** React component to render for this route */
  component: FC;
  /** Whether to show the splash screen on this route (only home) */
  showSplash?: boolean;
}

/**
 * All application routes.
 *
 * To add a new page:
 * 1. Create a component in `src/pages/`
 * 2. Add a new entry here
 * 3. Add a nav link in HeaderSection if needed
 */
export const routes: RouteDefinition[] = [
  {
    path: "/",
    component: HomePage,
    showSplash: true,
  },
  {
    path: "/galerie",
    component: GalleryPage,
  },
  {
    path: "/osetreni",
    component: TreatmentPage,
  },
  {
    path: "/reference",
    component: ReferencePage,
  },
];

/**
 * Finds the route definition for a given path.
 * Falls back to the home route ("/") if no match is found.
 */
export function matchRoute(path: string): RouteDefinition {
  return routes.find((r) => r.path === path) ?? routes[0];
}
