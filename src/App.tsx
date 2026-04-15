import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useHashRouter } from "./router/useHashRouter";
import { matchRoute } from "./router/routes";
import { trackPageView } from "./analytics";

/** Intro animation only on first load when landing on the home page */
const initialShowIntro =
  matchRoute(
    window.location.hash.startsWith("#/") ? window.location.hash.slice(1).split("#")[0] : "/",
  ).showSplash ?? false;

function App() {
  const [introPhase, setIntroPhase] = useState<"hold" | "reveal" | "done">(
    initialShowIntro ? "hold" : "done",
  );

  useEffect(() => {
    if (!initialShowIntro) return;

    // After 1.2 s hold (only logo visible), start revealing the rest
    const holdTimer = setTimeout(() => setIntroPhase("reveal"), 1200);

    // After reveal transition completes (~3 s), clean up the data attribute
    const doneTimer = setTimeout(() => setIntroPhase("done"), 4500);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  const { path } = useHashRouter();
  const route = matchRoute(path);
  const PageComponent = route.component;
  const { i18n } = useTranslation();

  // Track page views in Google Analytics on every route change and language switch
  useEffect(() => {
    trackPageView(path, i18n.language);
  }, [path, i18n.language]);

  return (
    <div data-intro={introPhase !== "done" ? introPhase : undefined}>
      <PageComponent />
    </div>
  );
}

export default App;
