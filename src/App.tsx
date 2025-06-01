import React, { useEffect } from 'react';
import { Layout } from './components/layout/Layout';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Timeline from './components/sections/Timeline';
import Tools from './components/sections/Tools';
import Resources from './components/sections/Resources';
import Contact from './components/sections/Contact';
import CursorTrail from './components/ui/CursorTrail';
import { useThemeStore } from './store/themeStore';

function App() {
  const { initTheme } = useThemeStore();

  useEffect(() => {
    // Initialize theme based on user preference
    initTheme();
  }, [initTheme]);

  return (
    <Layout>
      <CursorTrail />
      <Hero />
      <About />
      <Projects />
      {/* <Timeline /> */}
      <Tools />
      <Resources />
      <Contact />
    </Layout>
  );
}

export default App;