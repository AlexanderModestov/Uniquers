import React from 'react';
import { motion } from 'framer-motion';
import { Card } from './ui/Card';
import { 
  Database, Upload, Headphones, Tags, BarChart, Calendar, 
  DollarSign, Users, Mic, Play, FileText, MessageSquare 
} from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, color, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay }}
    >
      <Card glassEffect hoverEffect className="h-full">
        <div className={`${color} rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4`}>
          {icon}
        </div>
        <h3 className="text-xl font-display font-semibold mb-2">{title}</h3>
        <p className="text-neutral-400">{description}</p>
      </Card>
    </motion.div>
  );
};

export const FeaturesSection = () => {
  const expertFeatures = [
    {
      icon: <Database className="h-6 w-6 text-white" />,
      title: "Content Management",
      description: "Upload, organize, and tag your specialized knowledge in various formats.",
      color: "bg-primary-500/20 border border-primary-500/30",
      delay: 0.1
    },
    {
      icon: <Upload className="h-6 w-6 text-white" />,
      title: "Multi-Format Support",
      description: "Share text, PDFs, videos, or automatically convert text to audio.",
      color: "bg-secondary-500/20 border border-secondary-500/30",
      delay: 0.2
    },
    {
      icon: <Tags className="h-6 w-6 text-white" />,
      title: "Content Tagging",
      description: "Organize with categories and tags for efficient knowledge management.",
      color: "bg-accent-500/20 border border-accent-500/30",
      delay: 0.3
    },
    {
      icon: <BarChart className="h-6 w-6 text-white" />,
      title: "Analytics Dashboard",
      description: "Track content performance and user engagement in real-time.",
      color: "bg-success-500/20 border border-success-500/30",
      delay: 0.4
    },
    {
      icon: <Calendar className="h-6 w-6 text-white" />,
      title: "Appointment System",
      description: "Configure your calendar, set pricing, and manage bookings.",
      color: "bg-warning-500/20 border border-warning-500/30",
      delay: 0.5
    },
    {
      icon: <DollarSign className="h-6 w-6 text-white" />,
      title: "Monetization Tools",
      description: "Set subscription tiers and control access to premium content.",
      color: "bg-primary-500/20 border border-primary-500/30",
      delay: 0.6
    },
  ];

  const clientFeatures = [
    {
      icon: <FileText className="h-6 w-6 text-white" />,
      title: "Knowledge Access",
      description: "Browse and search through expert content based on your access level.",
      color: "bg-primary-500/20 border border-primary-500/30",
      delay: 0.1
    },
    {
      icon: <Play className="h-6 w-6 text-white" />,
      title: "Video Playback",
      description: "Watch educational videos with bookmarking and speed control.",
      color: "bg-secondary-500/20 border border-secondary-500/30",
      delay: 0.2
    },
    {
      icon: <Headphones className="h-6 w-6 text-white" />,
      title: "Audio Learning",
      description: "Listen to content as podcasts with playback speed options.",
      color: "bg-accent-500/20 border border-accent-500/30",
      delay: 0.3
    },
    {
      icon: <Calendar className="h-6 w-6 text-white" />,
      title: "Expert Booking",
      description: "View availability calendar and book personalized sessions.",
      color: "bg-success-500/20 border border-success-500/30",
      delay: 0.4
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-white" />,
      title: "AI-Powered FAQ",
      description: "Ask questions in natural language and receive expert-based answers.",
      color: "bg-warning-500/20 border border-warning-500/30",
      delay: 0.5
    },
    {
      icon: <Users className="h-6 w-6 text-white" />,
      title: "Direct Requests",
      description: "Leave specific questions for when the expert becomes available.",
      color: "bg-primary-500/20 border border-primary-500/30",
      delay: 0.6
    },
  ];

  return (
    <section id="features" className="py-20 bg-neutral-900 relative overflow-hidden">
      {/* Glowing blobs in the background */}
      <div className="absolute top-40 left-20 w-96 h-96 bg-primary-500/10 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-40 right-20 w-96 h-96 bg-secondary-500/10 rounded-full blur-[100px] -z-10"></div>
      
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            One Platform, <span className="text-primary-400">Unlimited Possibilities</span>
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Uniquers combines expert knowledge management, client access controls, and AI-powered assistance
            into one seamless platform that works for both experts and their clients.
          </p>
        </motion.div>
        
        <div className="mb-20">
          <motion.h3 
            className="text-2xl font-display font-semibold mb-8 relative pl-4 border-l-4 border-primary-500"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span id="experts">For Experts</span>
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertFeatures.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
        
        <div>
          <motion.h3 
            className="text-2xl font-display font-semibold mb-8 relative pl-4 border-l-4 border-secondary-500"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span id="clients">For Clients</span>
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clientFeatures.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};