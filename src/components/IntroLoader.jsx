import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IntroLoader = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [showTerminal, setShowTerminal] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  // Enhanced terminal text with more space theme
  const terminalLines = [
    "$ initiating quantum core systems...",
    "$ establishing neural network connections...",
    "$ loading cosmic knowledge database...",
    "$ calibrating holographic interfaces...",
    "$ synchronizing with stellar databases...",
    "$ activating space-time learning protocols...",
    "$ initializing educational matrix...",
    "$ configuring cosmic quiz parameters...",
    "$ all systems operational: ready for launch",
    "$ welcome to The Science Quizzard..."
  ];

  useEffect(() => {
    const terminalInterval = setInterval(() => {
      if (step < terminalLines.length - 1) {
        setStep(prev => prev + 1);
        setLoadingProgress(prev => prev + (100 / terminalLines.length));
      } else {
        setLoadingProgress(100);
        clearInterval(terminalInterval);
        setTimeout(() => {
          setShowTerminal(false);
          setTimeout(() => {
            onComplete();
          }, 1000);
        }, 800);
      }
    }, 600);
    
    return () => clearInterval(terminalInterval);
  }, [step, onComplete]);

  return (
    <AnimatePresence mode="wait">
      {showTerminal && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#070b14]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Enhanced background effects */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Space stars background */}
            <div className="space-stars"></div>
            
            {/* Nebula effect */}
            <div className="absolute inset-0 nebula-glow"></div>
            
            {/* Holographic grid */}
            <div className="absolute inset-0 holographic-grid opacity-20"></div>
            
            {/* Animated scan line with holographic effect */}
            <div className="absolute top-0 left-0 w-full h-2 holographic-scanner"></div>
            
            {/* Floating planets with cosmic animation */}
            <motion.div 
              className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-purple-900/30 backdrop-blur-3xl float-cosmic"
              animate={{ 
                rotate: 360, 
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                rotate: { duration: 120, repeat: Infinity, ease: "linear" },
                scale: { duration: 20, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }
              }}
            />
            
            <motion.div 
              className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-blue-900/20 backdrop-blur-3xl float-cosmic"
              animate={{ 
                rotate: -360,
                scale: [1, 1.03, 1], 
              }}
              transition={{ 
                rotate: { duration: 180, repeat: Infinity, ease: "linear" },
                scale: { duration: 15, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }
              }}
            />
            
            {/* Twinkling stars */}
            <div className="absolute inset-0 twinkling-stars"></div>
          </div>
          
          {/* Main content */}
          <div className="relative z-10 max-w-4xl w-full px-6">
            {/* Enhanced logo section */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              className="mb-12 text-center"
            >
              <h1 className="mt-4 text-3xl font-['Orbitron'] font-bold cosmic-text">
                <span className="holographic-text" data-text="System Initialization">
                  System Initialization
                </span>
              </h1>
            </motion.div>
            
            {/* Enhanced terminal window */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="holo-panel w-full bg-gray-900/80 rounded-xl overflow-hidden backdrop-blur-md"
            >
              {/* Terminal header with holographic effect */}
              <div className="bg-gray-800/80 px-4 py-3 border-b border-indigo-500/30 flex items-center holographic-overlay">
                <div className="flex gap-2 mr-4">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="text-xs text-center flex-1 text-indigo-300 font-['Orbitron']">
                  QUANTUM_TERMINAL_v2.0
                </div>
              </div>
              
              {/* Enhanced terminal content */}
              <div className="p-5 font-mono text-sm text-green-400 h-64 overflow-hidden relative">
                <div className="scanner-line"></div>
                <div className="particles-container absolute inset-0"></div>
                
                {/* Terminal lines with enhanced animation */}
                <div className="space-y-2 relative z-10">
                  {terminalLines.slice(0, step + 1).map((line, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center"
                    >
                      <span className="text-indigo-400 mr-2 option-indicator">&gt;</span>
                      <span className={`${index === step ? "typing-animation" : ""} cosmic-text`}>
                        {line}
                      </span>
                      {index === step && (
                        <span className="ml-1 inline-block w-2 h-4 bg-green-500 animate-blink"></span>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Enhanced loading progress */}
              <div className="px-5 py-4 border-t border-indigo-500/30 bg-gray-800/50">
                <div className="flex justify-between items-center mb-2 text-xs font-['Orbitron'] text-indigo-300">
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                    <span>QUANTUM CORE INITIALIZATION</span>
                  </div>
                  <div>{Math.floor(loadingProgress)}%</div>
                </div>
                <div className="progress-bar">
                  <motion.div 
                    className="progress-fill"
                    style={{ width: `${loadingProgress}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${loadingProgress}%` }}
                    transition={{ duration: 0.3 }}
                  ></motion.div>
                </div>
              </div>
            </motion.div>
            
            {/* Enhanced system status */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="mt-8 text-center text-sm font-['Orbitron']"
            >
              <p className="cosmic-text">
                <span className="text-indigo-400">The Science Quizzard</span> is preparing for launch...
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroLoader; 