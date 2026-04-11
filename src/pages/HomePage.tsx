import React from "react";
import { HeroSection } from "../components/HeroSection";
import { TeamSection } from "../components/TeamSection";
import { PricingSection } from "../components/PricingSection";
import { FAQSection } from "../components/FAQSection";
import { ContactSection } from "../components/ContactSection";
import { TestContactForm } from "../components/TestContactForm";
import { PageLayout } from "../router/PageLayout";

export const HomePage: React.FC = () => (
  <PageLayout>
    <HeroSection />
    <TeamSection />
    <PricingSection />
    <FAQSection />
    <ContactSection />
    <TestContactForm />
  </PageLayout>
);
