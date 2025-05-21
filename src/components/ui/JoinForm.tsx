import React, { useState } from 'react';
import { Button } from './Button';

export const JoinForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    interests: '',
    keepUpdated: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log('Submitting form data:', formData);
      const response = await fetch('http://localhost:3000/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Reset form and show success message
      setFormData({
        fullName: '',
        email: '',
        company: '',
        interests: '',
        keepUpdated: false
      });

      setSubmitStatus({ 
        success: true, 
        message: data.message || 'Request sent successfully!' 
      });

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus({ success: false, message: '' });
      }, 5000);

    } catch (error: any) {
      console.error('Form submission error:', error);
      setSubmitStatus({ 
        success: false, 
        message: `An error occurred: ${error.message || 'Unknown error'}` 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-neutral-900/50 p-8 rounded-xl border border-neutral-800">
      <h2 className="text-3xl font-display font-bold text-center mb-8">Get Early Access</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2">Full Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full px-4 py-2 bg-neutral-800 rounded-lg border border-neutral-700 focus:border-primary-500 focus:outline-none"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          />
        </div>

        <div>
          <label className="block mb-2">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 bg-neutral-800 rounded-lg border border-neutral-700 focus:border-primary-500 focus:outline-none"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div>
          <label className="block mb-2">Company (Optional)</label>
          <input
            type="text"
            placeholder="Your company name"
            className="w-full px-4 py-2 bg-neutral-800 rounded-lg border border-neutral-700 focus:border-primary-500 focus:outline-none"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          />
        </div>

        <div>
          <label className="block mb-2">What interests you about Uniquers? (Optional)</label>
          <textarea
            placeholder="Tell us what kind of expertise you'd like to monetize or any questions you have"
            className="w-full px-4 py-2 bg-neutral-800 rounded-lg border border-neutral-700 focus:border-primary-500 focus:outline-none min-h-[100px]"
            value={formData.interests}
            onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="keepUpdated"
            className="w-4 h-4 rounded border-neutral-700 bg-neutral-800"
            checked={formData.keepUpdated}
            onChange={(e) => setFormData({ ...formData, keepUpdated: e.target.checked })}
          />
          <label htmlFor="keepUpdated">Keep me updated about Uniquers</label>
        </div>

        {showSuccess && (
          <div className="text-center p-3 rounded bg-success-500/20 text-success-400">
            Thanks! We'll get back to you soon.
          </div>
        )}

        <Button 
          type="submit" 
          variant="primary" 
          className="w-full" 
          withGlow
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Join Uniquers Today"}
        </Button>
      </form>
    </div>
  );
};