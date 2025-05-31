import React from 'react';
import Header from './Header';
import Footer from './Footer';
import AIAssistant from '../ui/AIAssistant';

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <AIAssistant />
      <Footer />
    </div>
  );
};