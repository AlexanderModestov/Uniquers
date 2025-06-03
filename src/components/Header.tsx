import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/Button';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();

  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(5, 8, 22, 0)', 'rgba(5, 8, 22, 0.9)']
  );

  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ['blur(0px)', 'blur(8px)']
  );

  const borderColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(49, 49, 66, 0)', 'rgba(49, 49, 66, 0.5)']
  );

  const scrollToJoinForm = () => {
    const element = document.getElementById('join-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const body = document.body;
    if (isOpen) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'auto';
    }

    return () => {
      body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-12 md:py-6"
      style={{
        backgroundColor,
        backdropFilter: backdropBlur,
        borderBottom: '1px solid',
        borderColor,
      }}
    >
      <div className="container mx-auto flex items-center justify-between">
        <a href="#" className="flex items-center">
          <img src="/logo.svg" alt="Uniquers" className="h-10" />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-neutral-100 hover:text-primary-400 transition-colors">
            Features
          </a>
          <a href="#experts" className="text-neutral-100 hover:text-primary-400 transition-colors">
            For Experts
          </a>
          <a href="#clients" className="text-neutral-100 hover:text-primary-400 transition-colors">
            For Clients
          </a>
          <a href="#use-cases" className="text-neutral-100 hover:text-primary-400 transition-colors">
            Use Cases
          </a>
        </nav>

        <div className="hidden md:flex items-center">
          <Button 
            variant="primary" 
            size="lg" 
            withGlow 
            onClick={scrollToJoinForm}
          >
            Contact Us
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <Menu className="h-6 w-6 text-white" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className={`fixed inset-0 z-40 bg-background md:hidden ${isOpen ? 'block' : 'hidden'}`}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -50 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
          <a 
            href="#features" 
            className="text-2xl font-semibold text-neutral-100 hover:text-primary-400"
            onClick={() => setIsOpen(false)}
          >
            Features
          </a>
          <a 
            href="#experts" 
            className="text-2xl font-semibold text-neutral-100 hover:text-primary-400"
            onClick={() => setIsOpen(false)}
          >
            For Experts
          </a>
          <a 
            href="#clients" 
            className="text-2xl font-semibold text-neutral-100 hover:text-primary-400"
            onClick={() => setIsOpen(false)}
          >
            For Clients
          </a>
          <a 
            href="#use-cases" 
            className="text-2xl font-semibold text-neutral-100 hover:text-primary-400"
            onClick={() => setIsOpen(false)}
          >
            Use Cases
          </a>
          <div className="pt-6">
            <Button 
              variant="primary" 
              size="lg" 
              withGlow 
              onClick={scrollToJoinForm}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.header>
  );
};