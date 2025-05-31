import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Brain, ChevronRight, Bot, BarChart, Eye } from 'lucide-react';

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  const projects = [
    {
      title: "Neural Network Optimizer",
      description: "Developed a novel optimization algorithm that reduces training time by 35% while improving accuracy by 5% compared to standard methods.",
      icon: <Brain className="w-6 h-6" />,
      tags: ["PyTorch", "Optimization", "Research"],
      color: "from-blue-500 to-purple-600"
    },
    {
      title: "Conversational AI Assistant",
      description: "Built an advanced conversational agent capable of understanding context and maintaining coherent, helpful dialogues across various domains.",
      icon: <Bot className="w-6 h-6" />,
      tags: ["NLP", "Transformers", "Python"],
      color: "from-purple-500 to-pink-600"
    },
    {
      title: "Predictive Analytics Platform",
      description: "Created a system that analyzes business data to predict market trends with 87% accuracy, helping clients make data-driven decisions.",
      icon: <BarChart className="w-6 h-6" />,
      tags: ["Data Science", "TensorFlow", "Dashboard"],
      color: "from-green-500 to-teal-600"
    },
    {
      title: "Computer Vision Framework",
      description: "Developed a computer vision framework that enables real-time object detection, tracking, and classification for security applications.",
      icon: <Eye className="w-6 h-6" />,
      tags: ["OpenCV", "CNN", "Edge Computing"],
      color: "from-orange-500 to-red-600"
    }
  ];
  
  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="section-padding py-20 relative overflow-hidden bg-gray-50 dark:bg-gray-900"
    >
      <div className="container mx-auto container-padding">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore a selection of my innovative AI research and development projects
            that demonstrate practical applications of neural networks and machine learning.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard 
              key={index}
              project={project}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <a 
            href="#" 
            className="inline-flex items-center neo-button"
          >
            <span>View All Projects</span>
            <ChevronRight size={16} className="ml-2" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

interface ProjectProps {
  project: {
    title: string;
    description: string;
    icon: React.ReactNode;
    tags: string[];
    color: string;
  };
  index: number;
  isInView: boolean;
}

const ProjectCard: React.FC<ProjectProps> = ({ project, index, isInView }) => {
  return (
    <motion.div
      className="neo-box group hover:translate-y-[-5px] transition-all duration-300 overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
    >
      <div className={`h-2 bg-gradient-to-r ${project.color}`} />
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg mb-4">
            {project.icon}
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            <ChevronRight size={18} />
          </motion.button>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {project.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, i) => (
            <span 
              key={i}
              className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <a 
            href="#" 
            className="text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300 transition-colors inline-flex items-center"
          >
            <span>View Project</span>
            <ChevronRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;