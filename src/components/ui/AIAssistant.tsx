import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Brain, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{text: string, sender: 'user' | 'ai'}[]>([
    {
      text: "Hello! I'm EmtuXBrain Assistant. How can I help you explore Tanjil's portfolio?",
      sender: 'ai'
    }
  ]);
  const [input, setInput] = useState('');
  const [width, setWidth] = useState(320);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTo({
        top: messagesEndRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  const toggleAssistant = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages([...messages, { text: input, sender: 'user' }]);
    setInput('');

    // Call Gemini proxy
    try {
      const res = await fetch('https://emtu-gemini-api.onrender.com/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input })
      });
      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from Gemini.';
      setMessages(prev => [...prev, { text, sender: 'ai' }]);
    } catch (err) {
      setMessages(prev => [...prev, { text: 'Error: Unable to get response from Gemini.', sender: 'ai' }]);
    }
  };

  const startResize = (e: React.MouseEvent) => {
    const startX = e.clientX;
    const startWidth = width;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = Math.max(320, startWidth + (moveEvent.clientX - startX));
      setWidth(newWidth);
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  return (
    <>
      {/* Toggle button */}
      <motion.button
        className="fixed bottom-6 right-6 bg-primary-600 text-white p-4 rounded-full shadow-lg z-40"
        onClick={toggleAssistant}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Toggle AI Assistant"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>
      
      {/* Assistant panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            style={{ width: width }}
            className="fixed bottom-20 right-4 max-h-[80vh] h-[32rem] bg-white dark:bg-gray-900 rounded-xl shadow-xl overflow-hidden z-40 neo-box flex flex-col"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600 to-secondary-600 p-4 flex items-center">
              <Brain size={24} className="text-white mr-2" />
              <h3 className="text-white font-medium">EmtuXBrain Assistant</h3>
            </div>
            
            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto p-4 space-y-4"
              style={{
                scrollbarWidth: 'none', // Firefox
                msOverflowStyle: 'none', // IE 10+
              }}
              ref={messagesEndRef}
            >
              {messages.map((message, index) => (
                <div 
                  key={index}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[85%] p-3 rounded-xl ${
                      message.sender === 'user' 
                        ? 'bg-primary-100 dark:bg-primary-900 text-gray-800 dark:text-gray-100' 
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100'
                    }`}
                  >
                    {message.sender === 'ai' && (
                      <div className="flex items-center mb-1">
                        <Sparkles size={14} className="text-secondary-500 mr-1" />
                        <span className="text-xs font-semibold text-secondary-500">AI Assistant</span>
                      </div>
                    )}
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Input */}
            <form onSubmit={handleSubmit} className="border-t border-gray-200 dark:border-gray-700 p-4">
              <div className="flex justify-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me about Tanjil's work..."
                  className="w-40 md:w-52 bg-gray-100 dark:bg-gray-800 rounded-l-lg py-2 px-4 focus:outline-none dark:text-white"
                />
                <button 
                  type="submit"
                  className="bg-primary-600 text-white rounded-r-lg px-4 py-2"
                >
                  <Sparkles size={20} />
                </button>
              </div>
            </form>

            {/* Resizer handle */}
            <div
              onMouseDown={startResize}
              className="absolute top-0 right-0 h-full w-2 cursor-ew-resize z-50"
              style={{ background: 'transparent' }}
              title="Drag to resize"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;