import React from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { UseCasesSection } from './components/UseCasesSection';
import { BenefitsSection } from './components/BenefitsSection';
import { Footer } from './components/Footer';
import { JoinForm } from './components/ui/JoinForm';

function App() {
  return (
    <div className="min-h-screen bg-background text-white">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <UseCasesSection />
        <BenefitsSection />
        <section id="join-form" className="py-20 bg-neutral-900 relative overflow-hidden">
          <div className="container mx-auto px-6 md:px-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-12">
              Join Uniquers Today
            </h2>
            <JoinForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;