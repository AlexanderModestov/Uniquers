import React from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { UseCasesSection } from './components/UseCasesSection';
import { BenefitsSection } from './components/BenefitsSection';
import { JoinListForm } from './components/JoinListForm';
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
        <section id="join-form" className="py-20 bg-background relative overflow-hidden">
          <div className="container mx-auto px-6 md:px-12">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Join <span className="text-primary-400">Uniquers</span> Today
              </h2>
              <p className="text-neutral-400 max-w-2xl mx-auto">
                Be among the first to access our platform and start monetizing your expertise without selling your time.
              </p>
            </div>
            <JoinListForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;