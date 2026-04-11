import { useState, useCallback } from "react";
import { useHashRouter } from "./router/useHashRouter";
import { matchRoute } from "./router/routes";
import { SplashScreen } from "./components/SplashScreen";

function App() {
  const [splashDone, setSplashDone] = useState(false);
  const handleSplashFinished = useCallback(() => setSplashDone(true), []);

  const { path } = useHashRouter();
  const route = matchRoute(path);
  const PageComponent = route.component;

  return (
    <>
      {!splashDone && route.showSplash && <SplashScreen onFinished={handleSplashFinished} />}
      <PageComponent />
    </>
  );
}

export default App;
