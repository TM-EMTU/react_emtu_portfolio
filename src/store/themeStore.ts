import { create } from 'zustand';

type ThemeState = {
  darkMode: boolean;
  toggleTheme: () => void;
  initTheme: () => void;
};

export const useThemeStore = create<ThemeState>((set) => ({
  darkMode: false,
  
  toggleTheme: () => {
    set((state) => {
      const newDarkMode = !state.darkMode;
      
      // Update localStorage
      localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
      
      // Update document class
      if (newDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      return { darkMode: newDarkMode };
    });
  },
  
  initTheme: () => {
    set(() => {
      // Check if theme is saved in localStorage
      const savedTheme = localStorage.getItem('darkMode');
      let darkMode = false;
      
      if (savedTheme) {
        darkMode = JSON.parse(savedTheme);
      } else {
        // Check system preference
        darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
      }
      
      // Apply theme
      if (darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      return { darkMode };
    });
  },
}));