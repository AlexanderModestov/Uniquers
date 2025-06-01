import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { Check } from 'lucide-react';

interface FormData {
  fullName: string;
  email: string;
  company: string;
  interests: string;
  keepUpdated: boolean;
}

export const JoinListForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    company: '',
    interests: '',
    keepUpdated: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      keepUpdated: e.target.checked
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    // Validate form
    if (!formData.fullName.trim()) {
      setError('Full name is required');
      setIsSubmitting(false);
      return;
    }
    
    if (!formData.email.trim()) {
      setError('Email is required');
      setIsSubmitting(false);
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }
    
    try {
      // Make actual API call to the server
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit form');
      }
      
      // Success
      setIsSubmitted(true);
      setIsSubmitting(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-16 md:py-24">
      <div className="max-w-md mx-auto">
        {!isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="overflow-hidden">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-display font-bold mb-2">Get Early Access</h2>
                <p className="text-neutral-400">Join the waitlist for Uniquers and be the first to know when we launch.</p>
              </div>
              
              {error && (
                <div className="bg-error-500/10 border border-error-500/50 text-error-400 px-4 py-3 rounded-md mb-6">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="fullName" className="block text-sm font-medium mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="company" className="block text-sm font-medium mb-2">
                    Company (Optional)
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your company name"
                    className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="interests" className="block text-sm font-medium mb-2">
                    What interests you about Uniquers? (Optional)
                  </label>
                  <textarea
                    id="interests"
                    name="interests"
                    value={formData.interests}
                    onChange={handleChange}
                    placeholder="Tell us what kind of expertise you'd like to monetize or any questions you have"
                    rows={4}
                    className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none"
                  />
                </div>
                
                <div className="flex items-center mb-6">
                  <input
                    type="checkbox"
                    id="keepUpdated"
                    name="keepUpdated"
                    checked={formData.keepUpdated}
                    onChange={handleCheckboxChange}
                    className="h-5 w-5 rounded border-neutral-700 text-primary-500 focus:ring-primary-500 focus:ring-offset-neutral-900"
                  />
                  <label htmlFor="keepUpdated" className="ml-2 block text-sm">
                    Keep me updated about Uniquers
                  </label>
                </div>
                
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full py-3"
                  withGlow
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Join Uniquers Today'}
                </Button>
              </form>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="text-center py-8">
              <div className="flex justify-center mb-6">
                <div className="rounded-full bg-success-500/20 p-4">
                  <Check className="h-12 w-12 text-success-500" />
                </div>
              </div>
              <h2 className="text-3xl font-display font-bold mb-4">Thank You!</h2>
              <p className="text-neutral-300 mb-6">
                You've successfully joined the Uniquers waitlist. We'll keep you updated on our progress and let you know when we launch.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    fullName: '',
                    email: '',
                    company: '',
                    interests: '',
                    keepUpdated: false
                  });
                }}
              >
                Back to Form
              </Button>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};
