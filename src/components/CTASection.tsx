import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';
import { ChevronRight, Sparkles } from 'lucide-react';

// ContactForm component (replace with your actual form)
const ContactForm = () => {
  return (
    <form className="flex flex-col gap-4">
      <input type="text" placeholder="Your Name" className="p-2 rounded bg-neutral-800 text-white" />
      <input type="email" placeholder="Your Email" className="p-2 rounded bg-neutral-800 text-white" />
      <textarea placeholder="Your Message" className="p-2 rounded bg-neutral-800 text-white"></textarea>
      <Button variant="primary" size="lg" withGlow>
        Submit
      </Button>
    </form>
  );
};

export const CTASection = () => {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
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
              Ready to Monetize Your Knowledge?
            </h2>
            <p className="text-neutral-400 mb-8">
              Join thousands of experts who have transformed their practice with Uniquers.
              Start automating and earning today.
            </p>
            <ContactForm />
          </div>
        </motion.div>
      </div>
    </section>
  );
};