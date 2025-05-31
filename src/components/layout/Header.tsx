import React, { useState, useEffect } from 'react';
import { Brain, Menu, X } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';
import NavLink from '../ui/NavLink';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-md' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <a 
            href="#" 
            className="flex items-center space-x-2 text-primary-600 dark:text-primary-400"
          >
            <Brain size={32} className="text-neural-medium" />
            <span className="font-display text-xl font-bold">EmtuXBrain</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink href="#about">About</NavLink>
            <NavLink href="#projects">Projects</NavLink>
            <NavLink href="#tools">Lab</NavLink>
            <NavLink href="#productivity">Resources</NavLink>
            <NavLink href="#contact">Contact</NavLink>
            <ThemeToggle />
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <ThemeToggle />
            <button 
              onClick={toggleMenu}
              className="ml-4 text-gray-600 dark:text-gray-300 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden bg-white dark:bg-gray-900 overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <nav className="flex flex-col px-4 pt-2 pb-6 space-y-4">
          <NavLink href="#about" onClick={() => setIsMenuOpen(false)}>About</NavLink>
          <NavLink href="#projects" onClick={() => setIsMenuOpen(false)}>Projects</NavLink>
          <NavLink href="#tools" onClick={() => setIsMenuOpen(false)}>Lab</NavLink>
          <NavLink href="#productivity" onClick={() => setIsMenuOpen(false)}>Resources</NavLink>
          <NavLink href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header