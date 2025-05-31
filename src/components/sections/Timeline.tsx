import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, GraduationCap, Award } from 'lucide-react';

const Timeline: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  const timelineEvents = [
    {
      year: "2023",
      title: "Lead AI Researcher",
      organization: "TechFusion Labs",
      description: "Leading a team of researchers working on next-generation neural network architectures and their applications in healthcare.",
      icon: <Briefcase className="w-5 h-5" />,
      type: "work"
    },
    {
      year: "2022",
      title: "AI Innovation Award",
      organization: "Global Tech Summit",
      description: "Recognized for groundbreaking research in optimizing transformer-based models for resource-constrained environments.",
      icon: <Award className="w-5 h-5" />,
      type: "award"
    },
    {
      year: "2021",
      title: "Senior AI Engineer",
      organization: "Neural Systems Inc.",
      description: "Developed and implemented advanced machine learning solutions for enterprise clients across various industries.",
      icon: <Briefcase className="w-5 h-5" />,
      type: "work"
    },
    {
      year: "2020",
      title: "PhD in Artificial Intelligence",
      organization: "Stanford University",
      description: "Completed doctoral research on 'Optimizing Neural Network Architectures for Real-time Applications' with honors.",
      icon: <GraduationCap className="w-5 h-5" />,
      type: "education"
    },
    {
      year: "2018",
      title: "Machine Learning Engineer",
      organization: "AI Innovations",
      description: "Built predictive models and recommendation systems used by millions of users worldwide.",
      icon: <Briefcase className="w-5 h-5" />,
      type: "work"
    },
    {
      year: "2016",
      title: "MSc in Computer Science",
      organization: "MIT",
      description: "Specialized in machine learning and neural networks with a focus on computer vision applications.",
      icon: <GraduationCap className="w-5 h-5" />,
      type: "education"
    },
  ];
  
  const getTypeColor = (type: string) => {
    switch(type) {
      case 'work':
        return 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400';
      case 'education':
        return 'bg-secondary-100 dark:bg-secondary-900/30 text-secondary-600 dark:text-secondary-400';
      case 'award':
        return 'bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400';
    }
  };
  
  return (
    <section 
      id="timeline" 
      ref={sectionRef}
      className="section-padding py-20 relative overflow-hidden bg-white dark:bg-gray-950"
    >
      <div className="container mx-auto container-padding">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">My Journey</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore my career path and key milestones in AI research and development.
          </p>
        </motion.div>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-800 transform md:translate-x-[-0.5px]" />
          
          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <TimelineItem 
                key={index}
                event={event}
                index={index}
                isInView={isInView}
                isEven={index % 2 === 0}
                typeColor={getTypeColor(event.type)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface TimelineItemProps {
  event: {
    year: string;
    title: string;
    organization: string;
    description: string;
    icon: React.ReactNode;
  };
  index: number;
  isInView: boolean;
  isEven: boolean;
  typeColor: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ event, index, isInView, isEven, typeColor }) => {
  return (
    <div className="relative flex flex-col md:flex-row items-center">
      <motion.div 
        className={`flex items-center justify-center z-10 ${
          isEven ? 'md:order-1' : 'md:order-1'
        }`}
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
      >
        <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-900 border-4 border-primary-500 dark:border-primary-700 flex items-center justify-center">
          <div className="text-primary-600 dark:text-primary-400">
            {event.icon}
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        className={`neo-box md:w-5/12 ml-12 md:ml-0 mt-4 md:mt-0 ${
          isEven 
            ? 'md:mr-auto md:pr-16' 
            : 'md:ml-auto md:pl-16'
        }`}
        initial={{ 
          opacity: 0, 
          x: isEven ? -50 : 50 
        }}
        animate={isInView 
          ? { opacity: 1, x: 0 } 
          : { opacity: 0, x: isEven ? -50 : 50 }
        }
        transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
      >
        <div className="flex flex-wrap items-start gap-3 mb-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${typeColor}`}>
            {event.year}
          </span>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
          {event.title}
        </h3>
        
        <p className="text-primary-600 dark:text-primary-400 font-medium mb-3">
          {event.organization}
        </p>
        
        <p className="text-gray-600 dark:text-gray-400">
          {event.description}
        </p>
      </motion.div>
    </div>
  );
};

export default Timeline;