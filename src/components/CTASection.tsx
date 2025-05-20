import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  message: z.string().min(10, { message: "Please provide some details about your needs" })
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      // TODO: Replace with your actual API endpoint
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      form.reset();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div>
        <input
          {...form.register('name')}
          type="text"
          placeholder="Your Name"
          className="w-full p-2 rounded bg-neutral-800 text-white border border-neutral-700 focus:border-primary-500 focus:outline-none"
        />
        {form.formState.errors.name && (
          <p className="text-red-500 text-sm mt-1">{form.formState.errors.name.message}</p>
        )}
      </div>

      <div>
        <input
          {...form.register('email')}
          type="email"
          placeholder="Your Email"
          className="w-full p-2 rounded bg-neutral-800 text-white border border-neutral-700 focus:border-primary-500 focus:outline-none"
        />
        {form.formState.errors.email && (
          <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
        )}
      </div>

      <div>
        <textarea
          {...form.register('message')}
          placeholder="Your Message"
          className="w-full p-2 rounded bg-neutral-800 text-white border border-neutral-700 focus:border-primary-500 focus:outline-none resize-none"
          rows={4}
        />
        {form.formState.errors.message && (
          <p className="text-red-500 text-sm mt-1">{form.formState.errors.message.message}</p>
        )}
      </div>

      <Button 
        type="submit" 
        variant="primary" 
        size="lg" 
        withGlow
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Submit"}
      </Button>

      {showSuccess && (
        <div className="mt-4 p-4 bg-green-500/10 border border-green-500/20 text-green-400 rounded-lg">
          Thanks! We'll get back to you within 24 hours.
        </div>
      )}
    </form>
  );
};

export const CTASection = () => {
  return (
    <section id="contact-section" className="py-20 bg-background relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-radial-gradient from-primary-500/10 to-background z-0"></div>

      {/* Glowing ball of light */}
      <motion.div 
        className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 blur-3xl opacity-30 z-0"
        initial={{ x: -100, y: -100 }}
        animate={{ x: 100, y: 100 }}
        transition={{ duration: 15, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          className="bg-neutral-900/40 backdrop-blur-md border border-neutral-800/50 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
              Get Early Access
            </h2>
            <p className="text-neutral-400 mb-8">
              Join Uniquers Today
            </p>
            <ContactForm />
          </div>
        </motion.div>
      </div>
    </section>
  );
};