
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from './Button';

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    interests: '',
    newsletter: true
  });

  const [status, setStatus] = useState({
    message: '',
    isError: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ message: 'Sending...', isError: false });
    
    try {
      const response = await fetch('http://localhost:5000/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setStatus({ message: 'Thank you! Your message has been sent successfully.', isError: false });
        setFormData({ name: '', email: '', company: '', interests: '', newsletter: true });
      } else {
        setStatus({ message: 'Failed to send message. Please try again.', isError: true });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus({ message: 'Failed to send message. Please try again.', isError: true });
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-left mb-2">Full Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="w-full px-4 py-3 bg-white rounded-lg text-neutral-900 placeholder-neutral-500"
          />
        </div>
        <div>
          <label className="block text-left mb-2">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="w-full px-4 py-3 bg-white rounded-lg text-neutral-900 placeholder-neutral-500"
          />
        </div>
        <div>
          <label className="block text-left mb-2">Company (Optional)</label>
          <input
            type="text"
            placeholder="Your company name"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="w-full px-4 py-3 bg-white rounded-lg text-neutral-900 placeholder-neutral-500"
          />
        </div>
        <div>
          <label className="block text-left mb-2">What interests you about Uniquers? (Optional)</label>
          <textarea
            placeholder="Tell us what kind of expertise you'd like to monetize or any questions you have"
            value={formData.interests}
            onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 bg-white rounded-lg text-neutral-900 placeholder-neutral-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.newsletter}
            onChange={(e) => setFormData({ ...formData, newsletter: e.target.checked })}
            className="w-4 h-4 rounded"
          />
          <label>Keep me updated about Uniquers</label>
        </div>
        
        {status.message && (
          <div className={`p-3 rounded-lg ${status.isError ? 'bg-red-500/20 text-red-200' : 'bg-green-500/20 text-green-200'}`}>
            {status.message}
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full bg-gradient-to-r from-[#7C5CFC] to-[#31B7F0]"
          icon={<ArrowRight className="h-5 w-5" />}
          iconPosition="right"
        >
          Get Early Access
        </Button>
      </div>
    </motion.form>
  );
};
