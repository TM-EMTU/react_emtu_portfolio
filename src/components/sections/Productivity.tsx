import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FileText, Download, Clock, Brain, Sparkles, ChevronRight, BookOpen } from 'lucide-react';

const Productivity: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [activeCategory, setActiveCategory] = useState('all');
  
  const resources = [
    {
      title: "EmtuXBrain Daily Productivity Planner",
      description: "A simple, printable planner to help you stay focused, track your day, and build productive habits.",
      category: "guide",
      icon: <Brain className="w-6 h-6" />,
      downloads: 230,
      previewUrl: "https://as1.ftcdn.net/jpg/01/40/53/12/1000_F_140531219_chCHBmALfRuKyyfZasWWT8eIM4f6wC2P.webp", // <-- Preview image URL
      downloadUrl: "/pdfs/Daily_Productivity_Planner.pdf"           // <-- PDF for download
    },
    {
      title: "Habit Tracker",
      description: "A simple, printable Habit tracker to help you track your day, and build productive habits.",
      category: "template",
      icon: <FileText className="w-6 h-6" />,
      downloads: 856,
      downloadUrl: "/pdfs/30-Day_Study_Habit_Tracker (1).xlsx" ,          // <-- PDF for download
      previewUrl: "https://www.betterup.com/hs-fs/hubfs/Blog%20Images/Building%20good%20habits/building-good-habits-in-seven-steps-building-good-habits.png?width=1999&name=building-good-habits-in-seven-steps-building-good-habits.png"
    },
    {
      title: "Pre-Deep Work Preparation Guide",
      description: "A simple, guide to help you prepare for deep work sessions.",
      category: "guide",
      icon: <BookOpen className="w-6 h-6" />,
      downloads: 967,
      downloadUrl: "/pdfs/Pre_Deep_Work_Preparation_Guide.pdf" ,          // <-- PDF for download
      previewUrl: "https://miro.medium.com/v2/resize:fit:4800/format:webp/1*tj382zNssygSFWLNBhHiDg.jpeg"
    },
    {
      title: "Not ableable for now",
      description: "",
      category: "template",
      icon: <Clock className="w-6 h-6" />,
      downloads: 0,
      previewUrl: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Resources' },
    { id: 'guide', name: 'Guides' },
    { id: 'template', name: 'Templates' }
  ];

  const filteredResources = activeCategory === 'all' 
    ? resources 
    : resources.filter(resource => resource.category === activeCategory);

  return (
    <section 
      id="productivity" 
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
            <span className="gradient-text">Discipline Library</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
           Boost your focus and take control of your time.
Download free productivity sheets, planners, and tools designed to help you stay consistent, kill distractions, and win each day with clarity.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex bg-white dark:bg-gray-800 rounded-lg p-1 shadow-neo dark:shadow-neo-dark">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-2 rounded-md transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredResources.map((resource, index) => (
            <ResourceCard 
              key={index}
              resource={resource}
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
            <span>View All Resources</span>
            <ChevronRight size={16} className="ml-2" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

interface ResourceCardProps {
  resource: {
    title: string;
    description: string;
    icon: React.ReactNode;
    downloads: number;
    previewUrl: string;
    downloadUrl?: string;
  };
  index: number;
  isInView: boolean;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource, index, isInView }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="neo-box group cursor-pointer overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 overflow-hidden rounded-t-lg">
        <motion.img
          src={resource.previewUrl}
          alt={resource.title}
          className="w-full h-full object-cover"
          animate={{
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.3 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="bg-primary-100 dark:bg-primary-900/30 p-2 rounded-lg text-primary-600 dark:text-primary-400">
            {resource.icon}
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
            <Download size={14} className="mr-1" />
            {resource.downloads.toLocaleString()}
          </span>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {resource.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {resource.description}
        </p>

        <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
          <button className="text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300 transition-colors flex items-center">
            <Sparkles size={16} className="mr-2" />
            Preview
          </button>
          {resource.downloadUrl ? (
            <a
              href={resource.downloadUrl}
              download
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
            >
              <Download size={16} className="mr-2" />
              Download
            </a>
          ) : (
            <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center">
              <Download size={16} className="mr-2" />
              Download
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Productivity;