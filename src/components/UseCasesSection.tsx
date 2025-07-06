import React from 'react';
import { motion } from 'framer-motion';
import { Card } from './ui/Card';
import { 
  Brain, Briefcase, Dumbbell, Languages, Scale
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
        <div className="mb-3">
          <h4 className="text-primary-400 font-semibold text-sm mb-2">How Uniquers Helps:</h4>
        </div>
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
      title: "Therapist or Coach",
      description: "Problem: Constantly answering the same client questions, hard to keep up with content marketing.",
      examples: [
        "Builds a landing page that highlights their approach, credentials, and booking options",
        "AI chatbot answers FAQs about pricing, scheduling, and methodology",
        "Publishes weekly posts based on their existing notes and webinars",
        "Sends personalized email digests to leads and clients"
      ],
      color: "bg-primary-500/20 border border-primary-500/30"
    },
    {
      icon: <Scale className="h-6 w-6 text-white" />,
      title: "Legal or Tax Consultant",
      description: "Problem: Too much time spent on repetitive communication and not enough on client work.",
      examples: [
        "Creates a clean, professional landing page with service tiers and intake forms",
        "Automates responses to common questions about services, deadlines, and regulations",
        "Generates LinkedIn and blog content from previous cases or public webinars",
        "Builds trust through consistent expert content"
      ],
      color: "bg-secondary-500/20 border border-secondary-500/30"
    },
    {
      icon: <Dumbbell className="h-6 w-6 text-white" />,
      title: "Nutritionist or Fitness Expert",
      description: "Problem: Struggling to keep clients engaged between sessions and grow their audience.",
      examples: [
        "Turns session notes and guides into a chatbot that answers client questions",
        "Publishes weekly tips to Instagram, Facebook, and newsletters automatically",
        "Landing page collects leads and encourages bookings for consultations or programs"
      ],
      color: "bg-accent-500/20 border border-accent-500/30"
    },
    {
      icon: <Briefcase className="h-6 w-6 text-white" />,
      title: "Freelancer or Creative Professional",
      description: "Problem: Online presence is fragmented and managing outreach is time-consuming.",
      examples: [
        "Generates a sleek, branded landing page with portfolio highlights and inquiry form",
        "Answers common questions about pricing, process, and availability",
        "Repackages past projects and testimonials into shareable posts and newsletters",
        "Helps nurture leads with automated, friendly follow-ups"
      ],
      color: "bg-success-500/20 border border-success-500/30"
    },
    {
      icon: <Languages className="h-6 w-6 text-white" />,
      title: "Language Tutor or Online Educator",
      description: "Problem: Wants to grow passive income and reduce manual teaching prep.",
      examples: [
        "Landing page promotes lessons, courses, and downloadable materials",
        "Chatbot answers questions about schedules, pricing, and topics",
        "Converts lesson transcripts into educational blog posts and email content",
        "Scales presence on social and email with zero extra time"
      ],
      color: "bg-warning-500/20 border border-warning-500/30"
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
            <span className="text-secondary-400">Cases</span>
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            See how different specialists are using Uniquers to transform their practice
            and create new income streams while better serving their clients.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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