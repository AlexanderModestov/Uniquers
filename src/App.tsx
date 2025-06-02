import React from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { UseCasesSection } from './components/UseCasesSection';
import { BenefitsSection } from './components/BenefitsSection';
import { JoinList } from './components/JoinList';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-background text-white">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <UseCasesSection />
        <BenefitsSection />
        <section className="py-20 bg-background">
          <JoinList />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;