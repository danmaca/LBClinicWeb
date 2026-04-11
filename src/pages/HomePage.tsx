import React, { useEffect } from "react";
import { HeroSection } from "../components/HeroSection";
import { TeamSection } from "../components/TeamSection";
import { PricingSection } from "../components/PricingSection";
import { FAQSection } from "../components/FAQSection";
import { ContactSection } from "../components/ContactSection";
import { TestContactForm } from "../components/TestContactForm";
import { PageLayout } from "../router/PageLayout";

export const HomePage: React.FC = () => {
  // When navigating back from another page (e.g. GalleryPage) via a section
  // anchor like #faq, the target element doesn't exist in the DOM at the moment
  // the hash changes — so the browser can't scroll to it automatically.
  // This effect runs after mount and performs the scroll if a section hash is present.
  useEffect(() => {
    const hash = window.location.hash;

    // Only handle in-page section anchors, not route hashes like #/gallery
    if (hash && !hash.startsWith("#/")) {
      // Use a short delay to ensure the DOM is fully laid out (images, etc.)
      // and the browser's own (failed) scroll attempt is complete.
      const frameId = requestAnimationFrame(() => {
        try {
          const el = document.querySelector(hash);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        } catch {
          // Invalid selector in hash — ignore
        }
      });

      return () => cancelAnimationFrame(frameId);
    }
  }, []);

  return (
    <PageLayout>
      <HeroSection />
      <TeamSection />
      <PricingSection />
      <FAQSection />
      <ContactSection />
      <TestContactForm />
    </PageLayout>
  );
};
