import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, Code, Cpu, BrainCircuit, Sliders } from 'lucide-react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const Tools: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [activeTab, setActiveTab] = useState('nlp');
  
  const tabs = [
    { id: 'nlp', name: 'Text Generator', icon: <Code className="w-5 h-5" /> },
    { id: 'vision', name: 'Image Classifier', icon: <Cpu className="w-5 h-5" /> },
    { id: 'neural', name: 'Neural Playground', icon: <BrainCircuit className="w-5 h-5" /> },
  ];
  
  return (
    <section 
      id="tools" 
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
            <span className="gradient-text">AI Lab</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Try out interactive demos of some of the AI tools and models I've built.
            These simplified versions give you a glimpse of the capabilities.
          </p>
        </motion.div>
        
        <motion.div
          className="neo-box bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-800 px-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 border-b-2 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {tab.icon}
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
          
          {/* Content */}
          <div className="p-6">
            {activeTab === 'nlp' && <TextGenerator />}
            {activeTab === 'vision' && <ImageClassifier />}
            {activeTab === 'neural' && <NeuralPlayground />}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const TextGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [displayed, setDisplayed] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Typing effect
  useEffect(() => {
    if (!result) {
      setDisplayed('');
      return;
    }
    let i = 0;
    setDisplayed('');
    const interval = setInterval(() => {
      if (i < result.length) {
        setDisplayed((prev) => prev + result[i]);
        i++;
      } else {
        clearInterval(interval); // Stop exactly at the end, never append undefined
      }
    }, 18);
    return () => clearInterval(interval);
  }, [result]);

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    setResult('');
    setDisplayed('');
    try {
      const response = await axios.post(
        'https://emtu-gemini-api.onrender.com/api/gemini-generic',
        { prompt }
      );
      const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from Gemini.';
      setResult(text);
    } catch (error) {
      setResult('Error: Unable to generate text. Please check your API key and try again.');
    }
    setIsGenerating(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Enter a prompt for the AI to enerate text  
        </label>
        <textarea
          id="prompt"
          rows={3}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Explain the importance of AI research in simple terms..."
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-primary-500 focus:border-primary-500"
        />
      </div>
      
      <div className="flex justify-center">
        <button
          onClick={handleGenerate}
          disabled={isGenerating || !prompt}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
            isGenerating || !prompt
              ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              : 'bg-primary-600 hover:bg-primary-700 text-white'
          }`}
        >
          <Sparkles size={18} />
          <span>{isGenerating ? 'Generating...' : 'Generate Text'}</span>
        </button>
      </div>
      
      {displayed && (
        <div className="mt-6 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Generated Output:</h3>
          <div className="prose dark:prose-invert max-w-none">
            <ReactMarkdown>{displayed}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
};

const ImageClassifier: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<{label: string, confidence: number}[]>([]);
  
  const sampleImages = [
    'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1643457/pexels-photo-1643457.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=400'
  ];
  
  const handleSelectImage = (url: string) => {
    setSelectedImage(url);
    setResults([]);
  };
  
  const handleAnalyze = () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    setResults([]);
    
    // Simulate image classification
    setTimeout(() => {
      const fakeResults = [
        { label: "Cat", confidence: 0.92 },
        { label: "Pet", confidence: 0.85 },
        { label: "Mammal", confidence: 0.78 },
        { label: "Animal", confidence: 0.72 },
        { label: "Feline", confidence: 0.65 }
      ];
      
      setResults(fakeResults);
      setIsAnalyzing(false);
    }, 1500);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Select a sample image to classify
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {sampleImages.map((image, index) => (
            <div 
              key={index}
              onClick={() => handleSelectImage(image)}
              className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                selectedImage === image
                  ? 'border-primary-500 ring-2 ring-primary-300 dark:ring-primary-800'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <img 
                src={image} 
                alt={`Sample ${index + 1}`} 
                className="w-full h-24 object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-center">
        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing || !selectedImage}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
            isAnalyzing || !selectedImage
              ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              : 'bg-primary-600 hover:bg-primary-700 text-white'
          }`}
        >
          <Cpu size={18} />
          <span>{isAnalyzing ? 'Analyzing...' : 'Analyze Image'}</span>
        </button>
      </div>
      
      {results.length > 0 && (
        <div className="mt-6 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Classification Results:</h3>
          <div className="space-y-3">
            {results.map((result, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-gray-700 dark:text-gray-300">{result.label}</span>
                <div className="w-2/3 flex items-center">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div 
                      className="bg-primary-600 h-2.5 rounded-full" 
                      style={{ width: `${result.confidence * 100}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                    {(result.confidence * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const NeuralPlayground: React.FC = () => {
  const [learningRate, setLearningRate] = useState(0.05);
  const [layers, setLayers] = useState(3);
  const [neurons, setNeurons] = useState(5);
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  
  const handleTrain = () => {
    setIsTraining(true);
    setTrainingProgress(0);
    setAccuracy(0);
    
    // Simulate training progress
    const interval = setInterval(() => {
      setTrainingProgress(prev => {
        const newProgress = prev + 2;
        
        // Update accuracy based on current settings and progress
        const baseAccuracy = 0.7; // Starting accuracy
        const learningRateEffect = learningRate * 0.5; // More learning rate can help up to a point
        const layersEffect = Math.min(layers / 10, 0.2); // Diminishing returns for more layers
        const neuronsEffect = Math.min(neurons / 20, 0.15); // Diminishing returns for more neurons
        
        // Progress affects accuracy but plateaus
        const progressEffect = Math.min((newProgress / 100) * 0.2, 0.15);
        
        // Calculate accuracy with some randomness
        const calculatedAccuracy = baseAccuracy + learningRateEffect + layersEffect + neuronsEffect + progressEffect;
        // Add slight random fluctuations
        const randomFactor = (Math.random() * 0.02) - 0.01;
        
        // Ensure accuracy is between 0 and 1
        const newAccuracy = Math.min(Math.max(calculatedAccuracy + randomFactor, 0), 0.99);
        setAccuracy(newAccuracy);
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsTraining(false);
          return 100;
        }
        return newProgress;
      });
    }, 100);
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Learning Rate: {learningRate.toFixed(2)}
          </label>
          <div className="flex items-center">
            <Sliders size={16} className="text-gray-500 dark:text-gray-400 mr-2" />
            <input
              type="range"
              min="0.01"
              max="0.2"
              step="0.01"
              value={learningRate}
              onChange={(e) => setLearningRate(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Hidden Layers: {layers}
          </label>
          <div className="flex items-center">
            <BrainCircuit size={16} className="text-gray-500 dark:text-gray-400 mr-2" />
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={layers}
              onChange={(e) => setLayers(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Neurons per Layer: {neurons}
          </label>
          <div className="flex items-center">
            <Cpu size={16} className="text-gray-500 dark:text-gray-400 mr-2" />
            <input
              type="range"
              min="2"
              max="10"
              step="1"
              value={neurons}
              onChange={(e) => setNeurons(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-center">
        <button
          onClick={handleTrain}
          disabled={isTraining}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
            isTraining
              ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              : 'bg-primary-600 hover:bg-primary-700 text-white'
          }`}
        >
          <BrainCircuit size={18} />
          <span>{isTraining ? 'Training...' : 'Train Network'}</span>
        </button>
      </div>
      
      {(isTraining || trainingProgress > 0) && (
        <div className="mt-6 space-y-4">
          <div>
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
              <span>Training Progress</span>
              <span>{trainingProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div 
                className="bg-primary-600 h-2.5 rounded-full transition-all duration-300" 
                style={{ width: `${trainingProgress}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
              <span>Accuracy</span>
              <span>{(accuracy * 100).toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div 
                className="bg-success-500 h-2.5 rounded-full transition-all duration-300" 
                style={{ width: `${accuracy * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tools;