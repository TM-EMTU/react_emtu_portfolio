import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, Mail, MapPin, MessageCircle, Check } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';

const CONTACT_KEY = "emtux_contacted_at";
const CONTACT_LIMIT_HOURS = 72;

const lastContact = localStorage.getItem(CONTACT_KEY);
const canContact = !lastContact || (Date.now() - Number(lastContact)) > CONTACT_LIMIT_HOURS * 60 * 60 * 1000;

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [state, handleSubmit] = useForm("mzzrqpja");

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canContact) {
      alert("You can only send a message every 72 hours.");
      return;
    }
    await handleSubmit(e); // Call Formspree's handleSubmit
    localStorage.setItem(CONTACT_KEY, Date.now().toString());
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="section-padding py-20 relative overflow-hidden bg-white dark:bg-gray-950"
    >
      <div className="container mx-auto container-padding">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Get In Touch</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Interested in collaborating on AI research or need a custom machine learning solution?
            Feel free to reach out!
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="neo-box h-full">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Contact Information
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-primary-100 dark:bg-primary-900/30 p-3 rounded-lg text-primary-600 dark:text-primary-400">
                    <Mail size={20} />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                      Email
                    </h4>
                    <a 
                      href="mailto:contact@emtuxbrain.ai" 
                      className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      emtu561@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-secondary-100 dark:bg-secondary-900/30 p-3 rounded-lg text-secondary-600 dark:text-secondary-400">
                    <MapPin size={20} />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                      Location
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Dhaka, banlgadesh
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-accent-100 dark:bg-accent-900/30 p-3 rounded-lg text-accent-600 dark:text-accent-400">
                    <MessageCircle size={20} />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                      Social
                    </h4>
                    <div className="flex space-x-4 mt-2">
                      <a 
                        href="#" 
                        className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                      >
                        Twitter
                      </a>
                      <a 
                        href="https://www.linkedin.com/in/tanjil-mahmud-1551aa334/" 
                        className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                      >
                        LinkedIn
                      </a>
                      <a 
                        href="https://github.com/TM-EMTU/" 
                        className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                      >
                        GitHub
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-10 py-6 border-t border-gray-200 dark:border-gray-800">
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Current Availability
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
I’m currently available for AI project consultations and selective collaborations. For speaking engagements or mentoring, please reach out at least 1–2 weeks in advance.
                </p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="neo-box">
              {state.succeeded ? (
                <div className="flex flex-col items-center justify-center py-10">
                  <div className="w-16 h-16 bg-success-100 dark:bg-success-900/30 rounded-full flex items-center justify-center mb-6">
                    <Check size={32} className="text-success-600 dark:text-success-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
                    Thank you for reaching out. I'll get back to you as soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-primary-500 focus:border-primary-500"
                      />
                      <ValidationError prefix="Email" field="email" errors={state.errors} />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      name="subject"
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>      <ValidationError prefix="Message" field="message" errors={state.errors} />
                  <div className="mt-4 flex justify-end">
                    <button
                      type="submit"
                      disabled={state.submitting || !canContact}
                      className="flex items-center space-x-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
                    >
                      <Send size={18} />
                      <span>
                        {state.submitting ? "Sending..." : "Send Message"}
                      </span>
                    </button>
                  </div>
                  {!canContact && (
                    <div className="text-red-500 text-sm mt-2">
                      You can only send one message every 72 hours.
                    </div>
                  )}
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;