import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { shuffleArray } from '../data';
import audioManager from '../utils/AudioManager';

const Question = ({ question, onAnswer, selectedOption, showExplanation, timeLimit = 60 }) => {
  const [selectedOptionLocal, setSelectedOptionLocal] = useState(null);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  
  // Shuffle options when question changes
  useEffect(() => {
    setShuffledOptions(shuffleArray([...question.options]));
    setSelectedOptionLocal(null);
    setTimeLeft(timeLimit);
  }, [question, timeLimit]);
  
  // Update local state if parent component sends down props
  useEffect(() => {
    if (selectedOption !== null) {
      setSelectedOptionLocal(selectedOption);
    }
  }, [selectedOption]);
  
  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !selectedOptionLocal) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !selectedOptionLocal) {
      // Time's up, auto-select wrong answer
      handleAnswer(null);
    }
  }, [timeLeft, selectedOptionLocal]);

  const handleAnswer = (option) => {
    // Play sound effect when selecting an option
    audioManager.playSoundEffect('select');
    
    // Set local state first for immediate UI feedback
    setSelectedOptionLocal(option);
    
    // Then call parent's onAnswer with result
    onAnswer(option === question.answer, option);
  };

  // Calculate time progress percentage
  const timeProgress = (timeLeft / timeLimit) * 100;
  const isTimeRunningOut = timeLeft <= 10;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto bg-gradient-to-b from-indigo-900/40 to-purple-900/30 p-8 rounded-2xl shadow-lg border border-indigo-500/30 relative"
    >
      {/* Holographic overlay */}
      <div className="holographic-overlay absolute inset-0 rounded-2xl pointer-events-none"></div>
      
      <div className="mb-8 flex justify-between items-center relative z-10">
        <div className="px-4 py-2 bg-blue-900/50 rounded-lg border border-blue-500/50 text-blue-300 font-bold backdrop-blur-sm">
          <span className="holographic-text">Question</span>
        </div>
        
        <div className={`relative w-12 h-12 flex items-center justify-center ${
          timeLeft <= 10 ? 'animate-pulse' : ''
        }`}>
          <div className="absolute inset-0">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="24"
                cy="24"
                r="20"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                className="text-gray-700/30"
              />
              <circle
                cx="24"
                cy="24"
                r="20"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                strokeDasharray={125.66} // 2 * π * r
                strokeDashoffset={125.66 * (1 - timeLeft / 60)}
                className={`transition-all duration-1000 ease-linear ${
                  timeLeft <= 10
                    ? 'text-red-500'
                    : 'text-indigo-500'
                }`}
              />
          </svg>
          </div>
          <span className={`relative z-10 text-lg font-bold ${
            timeLeft <= 10
              ? 'text-red-400'
              : 'text-white'
          }`}>
            {Math.max(0, timeLeft)}s
          </span>
        </div>
      </div>
      
      <h2 className="text-3xl font-bold mb-10 text-center text-white bg-indigo-900/30 py-5 px-6 rounded-xl border border-indigo-500/30 shadow-inner relative holo-panel">
        <span className="relative z-10">{question.question}</span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 relative z-10">
        {shuffledOptions.map((option, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => !selectedOptionLocal && handleAnswer(option)}
            disabled={selectedOptionLocal !== null}
            className={`
              relative p-6 rounded-xl cursor-pointer transition-all text-left
              ${!selectedOptionLocal 
                ? 'bg-indigo-800/30 hover:bg-indigo-700/40 border-2 border-indigo-500/50 shadow-md' 
                : option === question.answer
                  ? 'bg-green-800/40 border-2 border-green-500 shadow-md'
                  : selectedOptionLocal === option
                    ? 'bg-red-800/40 border-2 border-red-500 shadow-md'
                    : 'bg-indigo-900/20 border-2 border-indigo-600/20 opacity-60'
              }
            `}
          >
            {/* Neon scan effect visible on hover when not yet answered */}
            {!selectedOptionLocal && (
              <div className="absolute inset-0 pointer-events-none option-scan-effect"></div>
            )}
            
            <div className="flex items-center gap-4 relative z-10">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-indigo-700/70 border border-indigo-500 text-xl font-bold shadow option-indicator">
                {String.fromCharCode(65 + index)}
              </div>
              <span className="text-xl">{option}</span>
            </div>

            {selectedOptionLocal && option === question.answer && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute top-3 right-3 text-green-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </motion.div>
            )}

            {selectedOptionLocal === option && option !== question.answer && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute top-3 right-3 text-red-400"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>

      {showExplanation && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-6 bg-purple-800/30 border-2 border-purple-500/50 rounded-xl shadow-inner relative explanation-panel"
        >
          <h3 className="font-bold text-2xl text-purple-300 mb-3 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="holographic-text">Explanation</span>
          </h3>
          <div className="scanning-line"></div>
          <p className="text-lg leading-relaxed relative z-10">{question.explanation}</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Question; 