import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';
import { ChevronRight, BrainCircuit, Layers, Clock, DollarSign, X } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.3,
      delayChildren: 0.3,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export const HeroSection = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen pt-20 overflow-hidden relative">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-radial-gradient from-primary-500/10 to-background z-0"></div>
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('/src/assets/grid.png')] bg-repeat opacity-20 z-0"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          className="flex flex-col items-center justify-center min-h-[80vh] text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="mb-6 animate-float"
            variants={itemVariants}
          >
            <div className="inline-block bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full py-1 px-4 text-white text-sm font-semibold">
              Knowledge Base Management Reimagined
            </div>
          </motion.div>
          
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-300 via-secondary-300 to-accent-300 animate-gradient-x"
            variants={itemVariants}
          >
            Monetize Your Expertise
            <br />
            <span className="text-white">Without Selling Your Time</span>
          </motion.h1>
          
          <motion.p
            className="text-lg md:text-xl text-neutral-300 max-w-2xl mb-8"
            variants={itemVariants}
          >
            Uniquers is a specialized platform that helps remote specialists automate repetitive aspects of their work while creating new revenue streams from their knowledge.
          </motion.p>
          
          <motion.div
            className="flex flex-col md:flex-row gap-4 mb-16"
            variants={itemVariants}
          >
            <Button 
              variant="primary" 
              size="lg" 
              withGlow 
              icon={<ChevronRight className="h-5 w-5" />}
              iconPosition="right"
              onClick={() => {
                const joinForm = document.getElementById('join-form');
                joinForm?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Contact Us
            </Button>
            <Button variant="outline" size="lg" onClick={() => setShowModal(true)}>
              Watch Demo
            </Button>
          </motion.div>
          
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl"
          >
            <div className="bg-neutral-900/60 backdrop-blur-sm border border-neutral-800/50 rounded-xl p-4 flex items-center justify-center flex-col text-center hover:border-primary-500/50 transition-all duration-300">
              <BrainCircuit className="h-10 w-10 text-primary-400 mb-3" />
              <h3 className="font-semibold mb-1">AI-Powered</h3>
              <p className="text-sm text-neutral-400">Automate answers with your knowledge</p>
            </div>
            
            <div className="bg-neutral-900/60 backdrop-blur-sm border border-neutral-800/50 rounded-xl p-4 flex items-center justify-center flex-col text-center hover:border-secondary-500/50 transition-all duration-300">
              <Layers className="h-10 w-10 text-secondary-400 mb-3" />
              <h3 className="font-semibold mb-1">Multi-Format</h3>
              <p className="text-sm text-neutral-400">Text, audio, video all in one place</p>
            </div>
            
            <div className="bg-neutral-900/60 backdrop-blur-sm border border-neutral-800/50 rounded-xl p-4 flex items-center justify-center flex-col text-center hover:border-accent-500/50 transition-all duration-300">
              <Clock className="h-10 w-10 text-accent-400 mb-3" />
              <h3 className="font-semibold mb-1">Time-Saving</h3>
              <p className="text-sm text-neutral-400">Focus on clients, not repetitive work</p>
            </div>
            
            <div className="bg-neutral-900/60 backdrop-blur-sm border border-neutral-800/50 rounded-xl p-4 flex items-center justify-center flex-col text-center hover:border-success-500/50 transition-all duration-300">
              <DollarSign className="h-10 w-10 text-success-400 mb-3" />
              <h3 className="font-semibold mb-1">Revenue Growth</h3>
              <p className="text-sm text-neutral-400">New income streams from your expertise</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-neutral-900 p-8 rounded-xl border border-neutral-800 max-w-md w-full mx-4 relative"
          >
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            <h3 className="text-2xl font-display font-bold mb-4">Coming Soon!</h3>
            <p className="text-neutral-300 mb-6">
              We're working on an exciting demo video that will showcase all the amazing features of Uniquers. Stay tuned!
            </p>
            <Button 
              variant="primary" 
              className="w-full" 
              onClick={() => setShowModal(false)}
            >
              Got it
            </Button>
          </motion.div>
        </div>
      )}
      
      {/* Curved divider at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="fill-neutral-900">
          <path d="M0,64L60,58.7C120,53,240,43,360,48C480,53,600,75,720,74.7C840,75,960,53,1080,42.7C1200,32,1320,32,1380,32L1440,32L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z" />
        </svg>
      </div>
    </div>
  );
};