import React from 'react';
import { motion } from 'framer-motion';
import { 
  Coins, Clock, Users, Database, 
  BarChart3, CalendarClock, 
  Clock4, Sparkles, DollarSign, Check, MessageSquare
} from 'lucide-react';

interface BenefitItemProps {
  icon: React.ReactNode;
  title: string;
  delay: number;
}

const BenefitItem: React.FC<BenefitItemProps> = ({ icon, title, delay }) => {
  return (
    <motion.div 
      className="flex items-center space-x-3 mb-6"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay }}
    >
      <div className="bg-primary-500/10 rounded-full p-2 flex items-center justify-center">
        {icon}
      </div>
      <span>{title}</span>
    </motion.div>
  );
};

export const BenefitsSection = () => {
  const expertBenefits = [
    { icon: <Coins className="h-5 w-5 text-primary-400" />, title: "Passive income generation", delay: 0.1 },
    { icon: <Clock className="h-5 w-5 text-primary-400" />, title: "Reduced repetitive explanations", delay: 0.2 },
    { icon: <Users className="h-5 w-5 text-primary-400" />, title: "Expanded client reach", delay: 0.3 },
    { icon: <BarChart3 className="h-5 w-5 text-primary-400" />, title: "Data-driven content improvement", delay: 0.4 },
    { icon: <CalendarClock className="h-5 w-5 text-primary-400" />, title: "Streamlined appointment management", delay: 0.5 },
    { icon: <MessageSquare className="h-5 w-5 text-primary-400" />, title: "Efficient client communication", delay: 0.6 },
  ];

  const clientBenefits = [
    { icon: <Database className="h-5 w-5 text-secondary-400" />, title: "24/7 access to expert knowledge", delay: 0.1 },
    { icon: <Clock4 className="h-5 w-5 text-secondary-400" />, title: "Self-paced learning", delay: 0.2 },
    { icon: <DollarSign className="h-5 w-5 text-secondary-400" />, title: "Cost-effective access to expertise", delay: 0.3 },
    { icon: <Check className="h-5 w-5 text-secondary-400" />, title: "Consistent information quality", delay: 0.4 },
    { icon: <CalendarClock className="h-5 w-5 text-secondary-400" />, title: "Easy booking process", delay: 0.5 },
    { icon: <Sparkles className="h-5 w-5 text-secondary-400" />, title: "AI-powered assistance", delay: 0.6 },
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
            Benefits for <span className="text-primary-400">Everyone</span>
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Uniquers creates value for both experts and their clients by bridging the gap between
            one-on-one consultation and scalable knowledge distribution.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <motion.h3 
              className="text-2xl font-display font-semibold mb-8 relative pl-4 border-l-4 border-primary-500"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              For Experts
            </motion.h3>
            
            <div>
              {expertBenefits.map((benefit, index) => (
                <BenefitItem key={index} {...benefit} />
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
              For Clients
            </motion.h3>
            
            <div>
              {clientBenefits.map((benefit, index) => (
                <BenefitItem key={index} {...benefit} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};