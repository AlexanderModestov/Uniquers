import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from './ui/Button';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  telegram: z.string().optional(),
  message: z.string().optional(),
  subscribed: z.boolean().default(true),
});

type FormData = z.infer<typeof formSchema>;

export const JoinList = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/potential_customers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      reset();
      alert('Thank you for your interest! We will get back to you soon.');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-neutral-900/50 p-8 rounded-xl border border-neutral-800">
      <h2 className="text-3xl font-display font-bold text-center mb-8">Join Uniquers</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block mb-2">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full px-4 py-2 bg-neutral-800 rounded-lg border border-neutral-700 focus:border-primary-500 focus:outline-none"
            {...register('name')}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-error-400">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-2">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 bg-neutral-800 rounded-lg border border-neutral-700 focus:border-primary-500 focus:outline-none"
            {...register('email')}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-error-400">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-2">Phone</label>
          <input
            type="tel"
            placeholder="Enter your phone number"
            className="w-full px-4 py-2 bg-neutral-800 rounded-lg border border-neutral-700 focus:border-primary-500 focus:outline-none"
            {...register('phone')}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-error-400">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-2">Telegram (Optional)</label>
          <input
            type="text"
            placeholder="Your Telegram username"
            className="w-full px-4 py-2 bg-neutral-800 rounded-lg border border-neutral-700 focus:border-primary-500 focus:outline-none"
            {...register('telegram')}
          />
        </div>

        <div>
          <label className="block mb-2">What interests you about Uniquers? (Optional)</label>
          <textarea
            placeholder="Tell us what kind of expertise you'd like to monetize or any questions you have"
            className="w-full px-4 py-2 bg-neutral-800 rounded-lg border border-neutral-700 focus:border-primary-500 focus:outline-none min-h-[100px]"
            {...register('message')}
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="subscribed"
            className="w-4 h-4 rounded border-neutral-700 bg-neutral-800"
            {...register('subscribed')}
          />
          <label htmlFor="subscribed">Keep me updated about Uniquers</label>
        </div>

        <Button 
          type="submit" 
          variant="primary" 
          className="w-full" 
          withGlow
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Join Uniquers"}
        </Button>
      </form>
    </div>
  );
};