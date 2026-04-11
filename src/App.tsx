import { useState, useCallback, useEffect } from "react";
import { HeaderSection } from "./components/HeaderSection";
import { HeroSection } from "./components/HeroSection";
import { TeamSection } from "./components/TeamSection";
import { PricingSection } from "./components/PricingSection";
import { FAQSection } from "./components/FAQSection";
import { ContactSection } from "./components/ContactSection";
import { FooterSection } from "./components/FooterSection";
//import { ScrollRibbon } from "./components/ScrollRibbon";
import { TestContactForm } from "./components/TestContactForm";
import { SplashScreen } from "./components/SplashScreen";
import { GalleryPage } from "./components/GalleryPage";

type Page = "home" | "gallery";

function getPageFromHash(): Page {
  const hash = window.location.hash;
  if (hash === "#/gallery") return "gallery";
  return "home";
}

function App() {
  const [splashDone, setSplashDone] = useState(false);
  const handleSplashFinished = useCallback(() => setSplashDone(true), []);

  const [page, setPage] = useState<Page>(getPageFromHash);

  useEffect(() => {
    const handleHashChange = () => {
      setPage(getPageFromHash());
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigateTo = useCallback((target: Page) => {
    if (target === "gallery") {
      window.location.hash = "#/gallery";
    } else {
      window.location.hash = "";
    }
    window.scrollTo(0, 0);
  }, []);

  if (page === "gallery") {
    return <GalleryPage onBack={() => navigateTo("home")} />;
  }

  return (
    <>
      {!splashDone && <SplashScreen onFinished={handleSplashFinished} />}
      <div style={{ position: "relative", zIndex: 0 }}>
        {/*  <div>
          <ScrollRibbon direction="ltr" />
          <ScrollRibbon direction="rtl" />
        </div> */}
        <div className="min-h-screen flex flex-col font-sans relative" style={{ zIndex: 10 }}>
          <HeaderSection />
          <main className="flex-grow">
            <HeroSection />
            <TeamSection />
            <PricingSection />
            <FAQSection />
            <ContactSection />
            <TestContactForm />
          </main>
          <FooterSection />
        </div>
      </div>
    </>
  );
}

export default App;
