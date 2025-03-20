import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IntroLoader = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [showTerminal, setShowTerminal] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  // Terminal text animation steps
  const terminalLines = [
    "$ initializing science_quizzard.exe",
    "$ loading knowledge database...",
    "$ connecting to stellar network...",
    "$ calibrating quantum processors...",
    "$ synchronizing galactic databases...",
    "$ loading educational protocols...",
    "$ activating neural interface...",
    "$ initiating holographic display...",
    "$ system check: all systems operational",
    "$ launching The Science Quizzard..."
  ];

  useEffect(() => {
    // Simulate terminal typing and loading progress
    const terminalInterval = setInterval(() => {
      if (step < terminalLines.length - 1) {
        setStep(prev => prev + 1);
        setLoadingProgress(prev => prev + (100 / terminalLines.length));
      } else {
        // Complete loading
        setLoadingProgress(100);
        clearInterval(terminalInterval);
        
        // Allow progress bar to reach 100% then transition out
        setTimeout(() => {
          setShowTerminal(false);
          // Completely remove the loader after animation completes
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Background animations */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Animated grid */}
            <div className="absolute inset-0 holographic-grid opacity-20"></div>
            
            {/* Animated scan line */}
            <div className="absolute top-0 left-0 w-full h-2 bg-blue-500/30 animate-scan"></div>
            
            {/* Planets */}
            <motion.div 
              className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-purple-900/30 backdrop-blur-3xl"
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
              className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-blue-900/20 backdrop-blur-3xl"
              animate={{ 
                rotate: -360,
                scale: [1, 1.03, 1], 
              }}
              transition={{ 
                rotate: { duration: 180, repeat: Infinity, ease: "linear" },
                scale: { duration: 15, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }
              }}
            />
            
            {/* Animated stars */}
            <div className="absolute inset-0 space-stars opacity-40"></div>
          </div>
          
          {/* Central content */}
          <div className="relative z-10 max-w-4xl w-full px-6">
            {/* Logo */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              className="mb-12 text-center"
            >
              
              <h1 className="mt-4 text-3xl font-bold">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
                  System Initialization
                </span>
              </h1>
            </motion.div>
            
            {/* Terminal window */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="w-full bg-gray-900/80 border-2 border-indigo-500/50 rounded-xl overflow-hidden backdrop-blur-md shadow-[0_0_20px_rgba(99,102,241,0.3)]"
            >
              {/* Terminal header */}
              <div className="bg-gray-800/80 px-4 py-3 border-b border-indigo-500/30 flex items-center">
                <div className="flex gap-2 mr-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-xs text-center flex-1 text-indigo-300 font-mono">
                  science_quizzard_v1.0.4.exe — cosmic_terminal
                </div>
              </div>
              
              {/* Terminal content */}
              <div className="p-5 font-mono text-sm text-green-400 h-64 overflow-hidden relative">
                <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-transparent via-transparent to-indigo-950/30 pointer-events-none"></div>
                <div className="scanner-line absolute left-0 right-0 h-full"></div>
                
                {/* Terminal lines */}
                <div className="space-y-2">
                  {terminalLines.slice(0, step + 1).map((line, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex"
                    >
                      <span className="text-indigo-400 mr-2">&gt;</span>
                      <span className={index === step ? "typing-animation" : ""}>
                        {line}
                      </span>
                      {index === step && (
                        <span className="ml-1 inline-block w-2 h-4 bg-green-500 animate-blink"></span>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Loading progress */}
              <div className="px-5 py-4 border-t border-indigo-500/30 bg-gray-800/50">
                <div className="flex justify-between items-center mb-2 text-xs text-indigo-300">
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                    <span>Loading system modules</span>
                  </div>
                  <div>{Math.floor(loadingProgress)}%</div>
                </div>
                <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"
                    style={{ width: `${loadingProgress}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${loadingProgress}%` }}
                    transition={{ duration: 0.3 }}
                  ></motion.div>
                </div>
              </div>
            </motion.div>
            
            {/* System status */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="mt-8 text-center text-sm text-indigo-300/70"
            >
              <p>
                <span className="text-indigo-400">The Science Quizzard</span> is loading...
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroLoader; 