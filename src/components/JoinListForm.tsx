import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '../lib/supabase';
import { Button } from './ui/Button';
import { CheckCircle2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
  message: z.string().optional(),
  subscribed: z.boolean().default(true),
});

type FormData = z.infer<typeof formSchema>;

export const JoinListForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('potential_customers')
        .insert([data]);

      if (error) throw error;

      setIsSubmitted(true);
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-neutral-900/40 backdrop-blur-sm border border-neutral-800/50 rounded-xl p-8 text-center max-w-xl mx-auto">
        <CheckCircle2 className="w-16 h-16 text-success-400 mx-auto mb-4" />
        <h3 className="text-2xl font-display font-bold mb-2">Thank You!</h3>
        <p className="text-neutral-300">
          Your information has been successfully submitted. We'll be in touch soon!
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-neutral-900/40 backdrop-blur-sm border border-neutral-800/50 rounded-xl p-8 max-w-xl mx-auto"
    >
      <div className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-1">
            Name *
          </label>
          <input
            type="text"
            id="name"
            {...register('name')}
            className="w-full px-4 py-2 bg-neutral-800/50 border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
            placeholder="Enter your name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-error-400">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-1">
            Email *
          </label>
          <input
            type="email"
            id="email"
            {...register('email')}
            className="w-full px-4 py-2 bg-neutral-800/50 border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-error-400">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-neutral-300 mb-1">
            Phone (Optional)
          </label>
          <input
            type="tel"
            id="phone"
            {...register('phone')}
            className="w-full px-4 py-2 bg-neutral-800/50 border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
            placeholder="Enter your phone number"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-neutral-300 mb-1">
            Why do you want to join Uniquers? (Optional)
          </label>
          <textarea
            id="message"
            {...register('message')}
            className="w-full px-4 py-2 bg-neutral-800/50 border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white h-32 resize-none"
            placeholder="Tell us about your interest in Uniquers"
          />
        </div>

        <div className="flex items-start">
          <input
            type="checkbox"
            id="subscribed"
            {...register('subscribed')}
            className="mt-1 h-4 w-4 rounded border-neutral-700 bg-neutral-800/50 text-primary-500 focus:ring-primary-500"
          />
          <label htmlFor="subscribed" className="ml-2 block text-sm text-neutral-300">
            Do you want to get updates from us?
          </label>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Join Uniquers'}
        </Button>
      </div>
    </form>
  );
};