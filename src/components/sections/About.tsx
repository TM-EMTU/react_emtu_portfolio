import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { CodeIcon, Brain, Cpu, Database, Network } from 'lucide-react';

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="section-padding py-20 relative overflow-hidden bg-white dark:bg-gray-950"
    >
      <div className="container mx-auto container-padding">
        <div className="flex flex-col md:flex-row md:items-center gap-10 lg:gap-20">
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl mb-6 font-bold">
              <span className="gradient-text">About Me</span>
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Hey! I’m Tanjil Mahmud Emtu. I’m someone who’s really into tech and loves building cool stuff with code. I started teaching myself programming because I was curious, and that curiosity has now turned into a big dream — to build a company that actually makes a difference using AI.

Right now, I’m especially interested in Generative AI and Machine Learning. I enjoy learning new things, solving problems, and pushing myself to grow a little more every day. I believe in staying focused, working smart, and not giving up — even when things get tough.

I’m still at the beginning of my journey, but I’m excited about where it’s going. Thanks for stopping by — let’s see where this goes!
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              I have learned Python, JavaScript, HTML, and CSS. I’m skilled in data handling with Pandas and have explored NLP concepts. I’ve also learned frameworks like LangChain and FastAPI, Pandas, Numpy, SKlearn, to build AI-powered web apps. Currently, I’m focusing on improving my generative AI skills while staying productive. My goal is to become a Generative AI engineer who creates and trains AI models while balancing academics and tech growth.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {["Neural Networks", "Deep Learning", "Computer Vision", "NLP", "Reinforcement Learning", "TensorFlow", "PyTorch", "Python"].map((skill, index) => (
                <span 
                  key={index}
                  className="inline-block px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FeatureCard 
                icon={<Brain className="w-8 h-8 text-primary-500" />}
                title="Neural Networks"
                description="Designing and optimizing neural architectures for various applications."
              />
              <FeatureCard 
                icon={<Cpu className="w-8 h-8 text-secondary-500" />}
                title="Machine Learning"
                description="Implementing supervised and unsupervised learning algorithms."
              />
              <FeatureCard 
                icon={<Network className="w-8 h-8 text-accent-500" />}
                title="Deep Learning"
                description="Research in convolutional and recurrent neural networks."
              />
              <FeatureCard 
                icon={<Database className="w-8 h-8 text-success-500" />}
                title="Data Science"
                description="Extracting insights from complex datasets using AI techniques."
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="neo-box hover:translate-y-[-5px] transition-all duration-300">
      <div className="flex flex-col">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400">{description}</p>
      </div>
    </div>
  );
};

export default About;