import React from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, 
  Database, 
  Megaphone, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

interface TariffPlan {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  goal: string;
  description: string;
  features: string[];
  outcome: string;
}

export const TariffsSection = () => {
  const tariffPlans: TariffPlan[] = [
    {
      id: 'digital-front-door',
      title: 'Expert Digital Front Door',
      subtitle: 'Plan 1',
      icon: <Globe className="h-8 w-8 text-primary-400" />,
      goal: 'Generate new potential clients by establishing a powerful online presence.',
      description: 'A personalized, high-converting landing page designed as your digital storefront. We showcase your main services, unique value, and personal credibility, which is paramount for successful client acquisition.',
      features: [
        'Attracts new clients by effectively presenting your expertise',
        'Features a streamlined lead capture form (waitlist or contact form) to easily collect new potential clients',
        'Automate the creation process for your page and profile using AI tools'
      ],
      outcome: 'A compelling entry point that converts prospective visitors into engaged leads, building your client pipeline.'
    },
    {
      id: 'knowledge-hub',
      title: 'Expert Knowledge Hub',
      subtitle: 'Plan 2',
      icon: <Database className="h-8 w-8 text-secondary-400" />,
      goal: 'Transform your full experience into an intelligent, accessible knowledge base.',
      description: 'A robust Retrieval-Augmented Generation (RAG) system that consolidates your entire knowledge, from FAQs to detailed insights.',
      features: [
        'Automates responses to "trivial and classic" client questions, significantly freeing your valuable time',
        'Powers intelligent FAQ bots and contextual bots that provide precise, thorough, and accurate answers based on your unique domain knowledge',
        'Turns repetitive queries into a valuable data asset for creating scalable knowledge products'
      ],
      outcome: 'Share your whole experience efficiently and accurately, providing clients with immediate, expert-level information 24/7.'
    },
    {
      id: 'content-automation',
      title: 'AI-Powered Content & Marketing Automation',
      subtitle: 'Plan 3',
      icon: <Megaphone className="h-8 w-8 text-accent-400" />,
      goal: 'Scale your marketing communications and diversify your content for broader reach.',
      description: 'Leverage advanced AI-driven tools to efficiently produce a wide array of content formats from your core expertise.',
      features: [
        'Automates content creation for various needs, supporting your marketing communications',
        'Generates diverse formats to increase accessibility and reach, including text summaries, audio content, and interactive guides',
        'Unlocks multiple monetization avenues by enabling the creation and sale of productized knowledge'
      ],
      outcome: 'Amplify your influence by delivering your expertise in engaging, scalable formats across various channels.'
    }
  ];

  return (
    <section className="py-20 bg-neutral-900/50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-900/5 to-transparent"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Our Expert <span className="text-primary-400">Scaling Solutions</span>
          </h2>
          <p className="text-neutral-400 max-w-3xl mx-auto text-lg">
            Choose the plan that best amplifies your unique expertise
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {tariffPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card 
                glassEffect 
                hoverEffect 
                className="h-full flex flex-col relative overflow-hidden"
              >
                {/* Plan number badge */}
                <div className="absolute top-4 right-4 bg-primary-500/20 backdrop-blur-sm border border-primary-500/30 rounded-full px-3 py-1">
                  <span className="text-xs font-medium text-primary-300">{plan.subtitle}</span>
                </div>

                {/* Icon and title */}
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 p-3 rounded-xl border border-neutral-700/50 mr-4">
                    {plan.icon}
                  </div>
                  <h3 className="text-xl font-display font-semibold text-white leading-tight">
                    {plan.title}
                  </h3>
                </div>

                {/* Goal */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-primary-300 mb-2 uppercase tracking-wide">Goal</h4>
                  <p className="text-neutral-300 text-sm leading-relaxed">{plan.goal}</p>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-secondary-300 mb-2 uppercase tracking-wide">What it is</h4>
                  <p className="text-neutral-300 text-sm leading-relaxed">{plan.description}</p>
                </div>

                {/* Features */}
                <div className="mb-6 flex-grow">
                  <h4 className="text-sm font-semibold text-accent-300 mb-3 uppercase tracking-wide">How it helps</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start text-sm text-neutral-300">
                        <CheckCircle2 className="h-4 w-4 text-success-400 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Outcome */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-warning-300 mb-2 uppercase tracking-wide">Outcome</h4>
                  <p className="text-neutral-300 text-sm leading-relaxed">{plan.outcome}</p>
                </div>

                {/* CTA Button */}
                <div className="mt-auto">
                  <Button 
                    variant="primary" 
                    size="sm" 
                    className="w-full group"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};