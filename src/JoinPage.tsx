import React from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { JoinListForm } from './components/JoinListForm';

const JoinPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-white">
      <Header />
      <main>
        <div className="pt-20 pb-10">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-300 via-secondary-300 to-accent-300">
              Join Uniquers
            </h1>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
              Be among the first to access our platform and start monetizing your expertise without selling your time.
            </p>
          </div>
        </div>
        <JoinListForm />
      </main>
      <Footer />
    </div>
  );
};

export default JoinPage;
