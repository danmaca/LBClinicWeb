import React from "react";
import { HeaderSection } from "../components/HeaderSection";
import { FooterSection } from "../components/FooterSection";

interface PageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => (
  <div className="min-h-screen flex flex-col font-sans">
    <HeaderSection />
    <main className="flex-grow">{children}</main>
    <FooterSection />
  </div>
);
