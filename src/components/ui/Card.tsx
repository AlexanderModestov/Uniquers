import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glassEffect?: boolean;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  glassEffect = false,
  hoverEffect = false
}) => {
  const glassStyles = glassEffect 
    ? 'bg-neutral-900/40 backdrop-blur-sm border border-neutral-800/50'
    : 'bg-neutral-900 border border-neutral-800';

  return (
    <motion.div
      className={`rounded-xl p-6 ${glassStyles} ${className}`}
      whileHover={hoverEffect ? { 
        y: -5,
        boxShadow: '0 10px 30px -10px rgba(0, 194, 255, 0.3)',
        borderColor: 'rgba(0, 194, 255, 0.4)'
      } : {}}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};