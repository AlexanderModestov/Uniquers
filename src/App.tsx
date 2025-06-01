import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { UseCasesSection } from './components/UseCasesSection';
import { BenefitsSection } from './components/BenefitsSection';
import { Footer } from './components/Footer';

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
        <section className="py-20">
          <div className="max-w-xl mx-auto bg-neutral-900/50 p-8 rounded-xl border border-neutral-800">
            <h2 className="text-3xl font-display font-bold text-center mb-8">Join Us</h2>
            {submitted ? (
              <div className="text-center text-success-400">Thank you for joining! We'll be in touch.</div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-neutral-800 rounded-lg border border-neutral-700 focus:border-primary-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-neutral-800 rounded-lg border border-neutral-700 focus:border-primary-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block mb-2">Why are you interested in Uniquers?</label>
                  <textarea
                    name="reason"
                    value={form.reason}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-neutral-800 rounded-lg border border-neutral-700 focus:border-primary-500 focus:outline-none min-h-[100px]"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="updates"
                    checked={form.updates}
                    onChange={handleChange}
                    className="w-4 h-4 rounded border-neutral-700 bg-neutral-800"
                  />
                  <label>Do you want to get updates from Uniquers?</label>
                </div>
                {error && <div className="text-error-400">{error}</div>}
                <button
                  type="submit"
                  className="w-full py-2 rounded bg-primary-500 hover:bg-primary-400 text-white font-bold disabled:opacity-50"
                  disabled={submitting}
                >
                  {submitting ? 'Submitting...' : 'Join Now'}
                </button>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
