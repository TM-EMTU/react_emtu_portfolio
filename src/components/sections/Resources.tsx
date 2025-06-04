import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FileText, Download, Clock, Brain, Sparkles, ChevronRight, BookOpen } from 'lucide-react';
import AnimatedBackground from '../ui/AnimatedBackground';
import { useForm } from '@formspree/react';

// Move resources array here, before the component function
const resources = [
    {
    title: "Git & GitHub Guide",
    description: "A beginner-friendly guide to Git and GitHub, covering essential commands and workflows.",
    category: "Programming",
    icon: <FileText className="w-6 h-6" />,
    downloads: 48, 
    downloadUrl: "/pdfs/Git_and_GitHub_Guide.pdf",
    previewUrl: "https://media.licdn.com/dms/image/v2/D5612AQFGp9Te6E1Dsw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1673375513790?e=1754524800&v=beta&t=e7kw06TwG5iql3PltlsXBNqAwK1yvsEtGOG7nn3MfwA"
  },
      {
    title: "Pre-Deep Work Preparation Guide",
    description: "A simple, guide to help you prepare for deep work sessions.",
    category: "Productivity", // changed from "guide"
    icon: <BookOpen className="w-6 h-6" />,
    downloads: 60,
    downloadUrl: "/pdfs/Pre_Deep_Work_Preparation_Guide.pdf",
    previewUrl: "https://miro.medium.com/v2/resize:fit:4800/format:webp/1*tj382zNssygSFWLNBhHiDg.jpeg"
  },
  {
    title: "Habit Tracker",
    description: "A simple, printable Habit tracker to help you track your day, and build productive habits.",
    category: "Productivity",
    icon: <FileText className="w-6 h-6" />,
    downloads: 46,
    downloadUrl: "https://docs.google.com/spreadsheets/d/1BVjDZNGF2YOkR5XY7DGIW1cv1I6PdEkHqLjvl4uqqLA/edit?usp=sharing",
    previewUrl: "https://www.betterup.com/hs-fs/hubfs/Blog%20Images/Building%20good%20habits/building-good-habits-in-seven-steps-building-good-habits.png?width=1999&name=building-good-habits-in-seven-steps-building-good-habits.png"
  },
  {
    title: "NLP Guide by EmtuX",
    description: "A comprehensive guide to Natural Language Processing, covering key concepts, techniques, and applications.",
    category: "Programming",
    icon: <Clock className="w-6 h-6" />,
    downloads: 2, 
    downloadUrl: "/pdfs/NLP_guide.pdf",
    previewUrl: "https://ik.imagekit.io/rmlbayysp/1748860138962-Cover_page_SfUhDrVKf1.png"
  },
    {
    title: "Not available now",
    description: "...",
    category: "",
    icon: <BookOpen className="w-6 h-6" />,
    downloads: 2, 
    previewUrl: "/default-preview.png",
    downloadUrl: ""
  },
    {
    title: "Not available now",
    description: "...",
    category: "",
    icon: <Clock className="w-5 h-5" />,
    downloads: 2, 
    downloadUrl: "/default-preview.png",
    previewUrl: "/default-preview.png"
  },

];

const SUGGEST_KEY = "emtux_resource_suggested_at";
const SUGGEST_LIMIT_HOURS = 24;

const lastSuggest = localStorage.getItem(SUGGEST_KEY);
const canSuggest = !lastSuggest || (Date.now() - Number(lastSuggest)) > SUGGEST_LIMIT_HOURS * 60 * 60 * 1000;

const Resources: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [activeCategory, setActiveCategory] = useState('all');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [resourcesState, setResourcesState] = useState(resources);
  const [showAll, setShowAll] = useState(false);
  const [showSubmission, setShowSubmission] = useState(false);
  const [submission, setSubmission] = useState({
    title: '',
    description: '',
    url: '',
    category: '',
    email: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [state, handleSubmit] = useForm("mzzrqpja");
  const [suggestState, handleSuggestSubmit] = useForm("mzzrqpja");
  
  const categories = [
    { id: 'all', name: 'All Resources' },
    { id: 'Productivity', name: 'Productivity' },
    { id: 'Programming', name: 'Programming' }
  ];

  const filteredResources = activeCategory === 'all'
  ? (showAll ? resourcesState : resourcesState.slice(0, 4))
  : resourcesState.filter(resource => resource.category === activeCategory);

  const handleDownload = (index: number) => {
    setResourcesState(prev =>
      prev.map((res, i) =>
        i === index ? { ...res, downloads: res.downloads + 1 } : res
      )
    );
  };

  const onSuggestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSuggest) {
      alert("You can only suggest one resource every 24 hours.");
      return;
    }
    await handleSuggestSubmit(e); // Call Formspree's handler
    localStorage.setItem(SUGGEST_KEY, Date.now().toString());
  };

  return (
    <>
      {previewUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={() => setPreviewUrl(null)}>
          <div className="bg-white dark:bg-gray-900 rounded-lg p-4 max-w-2xl w-full relative" onClick={e => e.stopPropagation()}>
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={() => setPreviewUrl(null)}>✕</button>
            {previewUrl.endsWith('.pdf') ? (
              <iframe
                src={previewUrl}
                title="PDF Preview"
                className="w-full h-[70vh] rounded"
              />
            ) : previewUrl.includes('docs.google.com/spreadsheets') ? (
              <iframe
                src={
                  // Convert the Google Sheets link to embed format
                  previewUrl.replace('/edit', '/preview').replace('?usp=sharing', '') + '?widget=true&headers=false'
                }
                title="Google Sheets Preview"
                className="w-full h-[70vh] rounded"
              />
            ) : previewUrl.endsWith('.xlsx') ? (
              <iframe
                src={`https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(previewUrl)}`}
                title="Excel Preview"
                className="w-full h-[70vh] rounded"
              />
            ) : (
              <img src={previewUrl} alt="Preview" className="w-full h-auto rounded" />
            )}
          </div>
        </div>
      )}
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
              <span className="gradient-text">Resources Library</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
             Explore a growing collection of learning guides, templates, planners, and tools designed to help you learn smarter, stay organized, and achieve your goals.
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
            {filteredResources.map((resource, index) =>
  resource && resource.previewUrl ? (
    <ResourceCard
      key={index}
      resource={resource}
      index={index}
      isInView={isInView}
      onPreview={setPreviewUrl}
      onDownload={handleDownload}
    />
  ) : null
)}
          </div>

          {activeCategory === 'all' && !showAll && resourcesState.length > 4 && (
  <motion.div 
    className="mt-16 text-center"
    initial={{ opacity: 0 }}
    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
    transition={{ duration: 0.5, delay: 0.8 }}
  >
    <button 
      onClick={() => setShowAll(true)}
      className="inline-flex items-center neo-button"
    >
      <span>View All Resources</span>
      <ChevronRight size={16} className="ml-2" />
    </button>
  </motion.div>
)}

<button
  onClick={() => {
    setShowSubmission(true);
    setSubmitted(false);
    setSubmission({ title: '', description: '', url: '', category: '', email: '' });
  }}
  className="mb-8 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
>
  Suggest a Resource
</button>

{showSubmission && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md relative">
      <button
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
        onClick={() => setShowSubmission(false)}
      >✕</button>
      <h3 className="text-lg font-bold mb-4">Suggest a Resource</h3>
      {suggestState.succeeded ? (
        <div className="text-green-600 font-semibold">Thank you for your suggestion!</div>
      ) : (
        <form
          onSubmit={onSuggestSubmit}
          className="space-y-3"
        >
          <input
            className="w-full p-2 rounded border dark:bg-gray-800"
            placeholder="Title"
            name="title"
            value={submission.title}
            onChange={e => setSubmission({ ...submission, title: e.target.value })}
            required
          />
          <textarea
            className="w-full p-2 rounded border dark:bg-gray-800"
            placeholder="Description"
            name="description"
            value={submission.description}
            onChange={e => setSubmission({ ...submission, description: e.target.value })}
            required
          />
          <input
            className="w-full p-2 rounded border dark:bg-gray-800"
            placeholder="Resource URL"
            name="url"
            value={submission.url}
            onChange={e => setSubmission({ ...submission, url: e.target.value })}
            required
          />
          <input
            className="w-full p-2 rounded border dark:bg-gray-800"
            placeholder="Category"
            name="category"
            value={submission.category}
            onChange={e => setSubmission({ ...submission, category: e.target.value })}
          />
          <input
            className="w-full p-2 rounded border dark:bg-gray-800"
            placeholder="Your Email (optional)"
            name="email"
            value={submission.email}
            onChange={e => setSubmission({ ...submission, email: e.target.value })}
            type="email"
          />
          <button
            type="submit"
            className="w-full bg-primary-600 text-white py-2 rounded hover:bg-primary-700"
            disabled={suggestState.submitting || !canSuggest}
          >
            {suggestState.submitting ? "Submitting..." : "Submit"}
          </button>
          {!canSuggest && (
  <div className="text-red-500 text-sm mt-2">
    You can only suggest one resource every 72 hours.
  </div>
)}
        </form>
      )}
    </div>
  </div>
)}
        </div>
      </section>
    </>
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
  onPreview: (url: string) => void;
  onDownload: (index: number) => void;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource, index, isInView, onPreview, onDownload }) => {
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
          src={resource.previewUrl || "/default-preview.png"}
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
          <button
            className="text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300 transition-colors flex items-center"
            onClick={() => onPreview(resource.downloadUrl || resource.previewUrl)}
            type="button"
          >
            <Sparkles size={16} className="mr-2" />
            Preview
          </button>
          {resource.downloadUrl ? (
            <a
              href={resource.downloadUrl}
              download
              onClick={() => onDownload(index)}
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
            >
              <Download size={16} className="mr-2" />
              Download
            </a>
          ) : (
            <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center" disabled>
              <Download size={16} className="mr-2" />
              Download
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Resources;