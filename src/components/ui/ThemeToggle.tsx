import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useThemeStore } from '../../store/themeStore';

const ThemeToggle: React.FC = () => {
  const { darkMode, toggleTheme } = useThemeStore();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-12 h-12 rounded-full flex items-center justify-center neo-button p-0"
      whileTap={{ scale: 0.95 }}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.div
        initial={false}
        animate={{ rotate: darkMode ? 0 : 180, opacity: darkMode ? 1 : 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="absolute"
      >
        <Moon size={20} className="text-secondary-500" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{ rotate: darkMode ? 180 : 0, opacity: darkMode ? 0 : 1 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="absolute"
      >
        <Sun size={20} className="text-warning-500" />
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;