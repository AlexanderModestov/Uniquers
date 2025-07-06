import React from 'react';
import { motion } from 'framer-motion';
import { 
  Coins, Clock, Users, Database, 
  BarChart3, CalendarClock, 
  Clock4, Sparkles, DollarSign, Check, MessageSquare
} from 'lucide-react';

interface OfferItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const OfferItem: React.FC<OfferItemProps> = ({ icon, title, description, delay }) => {
  return (
    <motion.div 
      className="bg-neutral-900/60 backdrop-blur-sm border border-neutral-800/50 rounded-xl p-6 mb-6 hover:border-primary-500/50 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay }}
    >
      <div className="flex items-start space-x-4">
        <div className="bg-primary-500/10 rounded-full p-3 flex items-center justify-center">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-display font-semibold mb-3">{title}</h3>
          <p className="text-neutral-400 leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export const BenefitsSection = () => {
  const offers = [
    { 
      icon: <Database className="h-5 w-5 text-primary-400" />, 
      title: "Personalized, High-Converting Landing Pages",
      description: "These serve as a digital front door for experts, effectively showcasing their main services and aiming to convert prospective visitors into engaged clients. They are crucial for projecting the expert's personal credibility, unique value proposition, and trustworthiness, with a focus on amplifying the expert's unique personal brand.",
      delay: 0.1 
    },
    { 
      icon: <MessageSquare className="h-5 w-5 text-primary-400" />, 
      title: "RAG-Powered Communication System",
      description: "This robust system is designed to automate responses to routine and frequently asked client questions, thereby significantly freeing up the expert's valuable time. It enhances information retrieval by providing precise, thorough, and accurate answers based on a centralized, continually updated knowledge base of expert information. A crucial human-in-the-loop (HITL) process ensures accuracy, handles subjective nuance, and maintains ethical compliance.",
      delay: 0.2 
    },
    { 
      icon: <Sparkles className="h-5 w-5 text-primary-400" />, 
      title: "AI-Driven Content Generation",
      description: "This capability empowers experts to efficiently produce a wide array of content formats, scaling their knowledge dissemination beyond traditional one-on-one interactions.",
      delay: 0.3 
    },
  ];

  return (
    <section className="py-20 bg-neutral-900 relative overflow-hidden">
      {/* Light streams effect */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary-500/50 to-transparent"></div>
      
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            <span className="text-primary-400">Offers</span>
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Uniquers offers three core capabilities designed to help experts monetize their knowledge and scale their impact.
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          {offers.map((offer, index) => (
            <OfferItem key={index} {...offer} />
          ))}
        </div>
      </div>
    </section>
  );
};