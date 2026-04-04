import { HeaderSection } from './components/HeaderSection';
import { HeroSection } from './components/HeroSection';
import { TeamSection } from './components/TeamSection';
import { PricingSection } from './components/PricingSection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { FooterSection } from './components/FooterSection';

function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <HeaderSection />
      <main className="flex-grow">
        <HeroSection />
        <TeamSection />
        <PricingSection />
        <FAQSection />
        <ContactSection />
      </main>
      <FooterSection />
    </div>
  );
}

export default App;
