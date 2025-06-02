import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Brain, ChevronRight, Bot, BarChart, Eye, Bolt, ExternalLink } from 'lucide-react';

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  const projects = [
    {
      title: "YouTube Video Chatbot 🤖",
      description: "This project is a YouTube Video Chatbot that allows users to interact with the transcript of any YouTube video. It uses Generative AI (via Gemini) to answer questions based on the video’s transcript, making it a powerful tool for content interaction and retrieval.",
      icon: <Brain className="w-6 h-6" />,
      tags: ["Langchain", "Python", "Sklearn"],
      color: "from-blue-500 to-purple-600",
      github: "https://github.com/TM-EMTU/YouTube-Video-Chatbot/tree/main",
      live: "https://youtube-video-chatbot-3.onrender.com/"
    },
    {
      title: "Conversational AI Assistant",
      description: "Built an advanced conversational agent capable of understanding context and maintaining coherent, helpful dialogues across various domains.",
      icon: <Bot className="w-6 h-6" />,
      tags: ["NLP", "Transformers", "Python"],
      color: "from-purple-500 to-pink-600",
      github: "https://github.com/yourusername/conversational-ai-assistant",
      live: "https://conversational-ai-demo.com"
    },
    {
      title: "Predictive Analytics Platform",
      description: "Created a system that analyzes business data to predict market trends with 87% accuracy, helping clients make data-driven decisions.",
      icon: <BarChart className="w-6 h-6" />,
      tags: ["Data Science", "TensorFlow", "Dashboard"],
      color: "from-green-500 to-teal-600",
      github: "https://github.com/yourusername/predictive-analytics-platform",
      live: "https://predictive-analytics-demo.com"
    },
    {
      title: "Computer Vision Framework",
      description: "Developed a computer vision framework that enables real-time object detection, tracking, and classification for security applications.",
      icon: <Eye className="w-6 h-6" />,
      tags: ["OpenCV", "CNN", "Edge Computing"],
      color: "from-orange-500 to-red-600",
      github: "https://github.com/yourusername/computer-vision-framework",
      live: "https://computer-vision-demo.com"
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
            Explore a selection of my innovative AI  development projects
            that demonstrate practical applications of NLP and machine learning.
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
    github?: string;
    live?: string;
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
          <div className="flex flex-row gap-6 items-center">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center pl-1 pr-1 text-primary-600 dark:text-primary-400 font-semibold transition-all duration-300
                  after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-1 after:w-0 after:rounded after:bg-gradient-to-r after:from-primary-400 after:to-purple-500
                  hover:after:w-full after:transition-all after:duration-500"
                style={{ overflow: 'hidden' }}
              >
                View Project
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center pl-1 pr-1 text-green-600 dark:text-green-400 font-semibold transition-all duration-300
                  after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-1 after:w-0 after:rounded after:bg-gradient-to-r after:from-green-400 after:to-emerald-500
                  hover:after:w-full after:transition-all after:duration-500"
                style={{ overflow: 'hidden' }}
              >
                <Bolt size={16} className="mr-1" />
                Live
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;