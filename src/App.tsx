import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { UseCasesSection } from './components/UseCasesSection';
import { BenefitsSection } from './components/BenefitsSection';
import { Footer } from './components/Footer';
import { JoinForm } from './components/JoinForm';

function App() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    reason: '',
    updates: false
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: form.name,
          email: form.email,
          interests: form.reason,
          keepUpdated: form.updates
        })
      });
      if (!res.ok) throw new Error('Failed to submit');
      setSubmitted(true);
      setForm({ name: '', email: '', reason: '', updates: false });
    } catch (err) {
      setError('Submission failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-white">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <UseCasesSection />
        <BenefitsSection />
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6 md:px-12">
            <JoinForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;