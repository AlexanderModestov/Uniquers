import React from 'react';
import { motion } from 'framer-motion';
import { Card } from './ui/Card';
import { 
  Brain, Briefcase, Dumbbell, Languages
} from 'lucide-react';

interface UseCaseCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  examples: string[];
  color: string;
  index: number;
}

const UseCaseCard: React.FC<UseCaseCardProps> = ({ 
  icon, 
  title, 
  description, 
  examples, 
  color,
  index
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: 0.1 * index }}
    >
      <Card glassEffect hoverEffect className="h-full">
        <div className="flex items-start mb-6">
          <div className={`${color} rounded-full p-3 w-12 h-12 flex items-center justify-center mr-4`}>
            {icon}
          </div>
          <h3 className="text-xl font-display font-semibold">{title}</h3>
        </div>
        <p className="text-neutral-300 mb-4">{description}</p>
        <ul className="space-y-2">
          {examples.map((example, i) => (
            <li key={i} className="flex items-start">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary-400 mt-2 mr-2"></span>
              <span className="text-neutral-400 text-sm">{example}</span>
            </li>
          ))}
        </ul>
      </Card>
    </motion.div>
  );
};

export const UseCasesSection = () => {
  const useCases = [
    {
      icon: <Brain className="h-6 w-6 text-white" />,
      title: "Therapists & Coaches",
      description: "Expand your practice beyond one-on-one sessions.",
      examples: [
        "Share therapeutic techniques and exercises",
        "Distribute self-help materials to clients",
        "Create premium content packages for specific issues",
        "Automate answers to common therapy questions"
      ],
      color: "bg-primary-500/20 border border-primary-500/30"
    },
    {
      icon: <Briefcase className="h-6 w-6 text-white" />,
      title: "Business Consultants",
      description: "Scale your consulting business with digital knowledge products.",
      examples: [
        "Share industry reports and market analyses",
        "Create methodology documentation for clients",
        "Build case study libraries with controlled access",
        "Offer premium templates and frameworks"
      ],
      color: "bg-secondary-500/20 border border-secondary-500/30"
    },
    {
      icon: <Dumbbell className="h-6 w-6 text-white" />,
      title: "Fitness Trainers",
      description: "Help clients train effectively between personal sessions.",
      examples: [
        "Create workout routines and video demonstrations",
        "Share nutritional guidance and meal plans",
        "Develop progress tracking tools for clients",
        "Build exercise libraries with proper form tutorials"
      ],
      color: "bg-accent-500/20 border border-accent-500/30"
    },
    {
      icon: <Languages className="h-6 w-6 text-white" />,
      title: "Language Tutors",
      description: "Support student learning beyond scheduled lessons.",
      examples: [
        "Distribute lesson materials and practice exercises",
        "Create pronunciation guides and audio samples",
        "Share culture and context resources",
        "Build vocabulary lists with learning tools"
      ],
      color: "bg-success-500/20 border border-success-500/30"
    }
  ];

  return (
    <section id="use-cases" className="py-20 bg-background relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-background to-secondary-900/20 z-0"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Perfect For <span className="text-secondary-400">Every Expert</span>
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            See how different specialists are using Uniquers to transform their practice
            and create new income streams while better serving their clients.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {useCases.map((useCase, index) => (
            <UseCaseCard 
              key={index} 
              {...useCase} 
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};