import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { Check } from 'lucide-react';
import { supabase } from '../supabaseClient';

interface FormData {
  name: string;
  email: string;
  phone: string;
  telegram: string;
  message: string;
  updates: boolean;
}

export const JoinForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    telegram: '',
    message: '',
    updates: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    // Check if Supabase URL and key are configured
    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
      console.error('Supabase environment variables are not configured properly');
      setError('Database connection error. Please contact the administrator.');
      setIsSubmitting(false);
      return;
    }
    
    try {
      console.log('Submitting form data to Supabase:', {
        ...formData,
        updates: formData.updates // logging for debugging
      });
      
      // Insert data into Supabase 'potential_customers' table
      const { data, error: supabaseError } = await supabase
        .from('potential_customers')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            telegram: formData.telegram || null, // Handle empty string
            message: formData.message || null, // Handle empty string
            subscribed: formData.updates
          }
        ])
        .select();
      
      if (supabaseError) {
        console.error('Supabase error:', supabaseError);
        throw new Error(supabaseError.message);
      }
      
      console.log('Form submission successful:', data);
      
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        telegram: '',
        message: '',
        updates: false
      });
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-20 bg-neutral-900" id="join-form">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-2xl mx-auto">
          {!isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="overflow-hidden">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-display font-bold mb-2">Join Uniquers Today</h2>
                  <p className="text-neutral-400">Start your journey to monetizing your expertise</p>
                </div>
                
                {error && (
                  <div className="bg-error-500/10 border border-error-500/50 text-error-400 px-4 py-3 rounded-md mb-6">
                    {error}
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="telegram" className="block text-sm font-medium mb-2">
                      Telegram (Optional)
                    </label>
                    <input
                      type="text"
                      id="telegram"
                      value={formData.telegram}
                      onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                      className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Why do you want to join us? (Optional)
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="updates"
                      checked={formData.updates}
                      onChange={(e) => setFormData({ ...formData, updates: e.target.checked })}
                      className="h-5 w-5 rounded border-neutral-700 text-primary-500 focus:ring-primary-500 focus:ring-offset-neutral-900"
                    />
                    <label htmlFor="updates" className="ml-2 block text-sm">
                      Do you want to get updates?
                    </label>
                  </div>
                  
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full"
                    withGlow
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Join Now'}
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
                  Your submission has been received. We'll be in touch soon!
                </p>
                <Button
                  variant="outline"
                  onClick={() => setIsSubmitted(false)}
                >
                  Submit Another Response
                </Button>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
