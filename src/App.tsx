import { useState, useCallback } from "react";
import { useHashRouter } from "./router/useHashRouter";
import { matchRoute } from "./router/routes";
import { SplashScreen } from "./components/SplashScreen";

/** Splash only on first load — captured once before any render */
const initialShowSplash =
  matchRoute(
    window.location.hash.startsWith("#/") ? window.location.hash.slice(1).split("#")[0] : "/",
  ).showSplash ?? false;

function App() {
  const [splashDone, setSplashDone] = useState(false);
  const handleSplashFinished = useCallback(() => setSplashDone(true), []);

  const { path } = useHashRouter();
  const route = matchRoute(path);
  const PageComponent = route.component;

  return (
    <>
      {!splashDone && initialShowSplash && <SplashScreen onFinished={handleSplashFinished} />}
      <PageComponent />
    </>
  );
}

export default App;
