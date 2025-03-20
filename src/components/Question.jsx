import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { shuffleArray } from '../data';
import audioManager from '../utils/AudioManager';

const Question = ({ question, onAnswer, selectedOption, showExplanation, timeLimit = 60, questionNumber, theme }) => {
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
      className={`
        max-w-4xl mx-auto 
        bg-${theme.primary}-900/30 
        backdrop-blur-lg 
        border border-${theme.primary}-500/20
        p-8 rounded-2xl 
        relative
        shadow-lg
        shadow-${theme.primary}-500/10
      `}
    >
      {/* Header with Timer */}
      <div className="mb-8 flex justify-between items-center">
        <div className={`px-4 py-2 bg-${theme.primary}-900/40 rounded-lg text-${theme.primary}-300 font-[Orbitron] text-sm`}>
          Question {questionNumber}
        </div>
        
        <div className={`relative w-14 h-14 flex items-center justify-center ${
          timeLeft <= 10 ? 'animate-pulse' : ''
        }`}>
          <div className="absolute inset-0">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="28"
                cy="28"
                r="24"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                className="text-gray-700/30"
              />
              <circle
                cx="28"
                cy="28"
                r="24"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                strokeDasharray={150.79} // 2 * π * r
                strokeDashoffset={150.79 * (1 - timeLeft / 60)}
                className={`transition-all duration-1000 ease-linear ${
                  timeLeft <= 10
                    ? 'text-red-500'
                    : `text-${theme.primary}-500`
                }`}
              />
            </svg>
          </div>
          <span className={`relative z-10 text-lg font-[Orbitron] ${
            timeLeft <= 10
              ? 'text-red-400'
              : `text-${theme.primary}-100`
          }`}>
            {Math.max(0, timeLeft)}
          </span>
        </div>
      </div>
      
      {/* Question Text */}
      <div className="mb-10">
        <h2 className={`
          text-2xl md:text-3xl 
          font-[Orbitron] 
          text-center 
          bg-clip-text text-transparent 
          bg-gradient-to-r ${theme.gradient}
          drop-shadow-lg
          filter
          [text-shadow:0_0_10px_${theme.primary}-500/30]
        `}>
          {question.question}
        </h2>
      </div>
      
      {/* Answer Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {shuffledOptions.map((option, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.02, filter: 'brightness(1.1)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => !selectedOptionLocal && handleAnswer(option)}
            disabled={selectedOptionLocal !== null}
            className={`
              w-full p-5 rounded-xl text-left transition-all
              font-[Orbitron] backdrop-blur-sm
              border-2
              hover:shadow-lg hover:shadow-${theme.primary}-500/20
              ${!selectedOptionLocal 
                ? `bg-${theme.primary}-900/30 hover:bg-${theme.primary}-800/40 border-${theme.primary}-500/30` 
                : option === question.answer
                  ? 'bg-green-900/30 border-green-500/50'
                  : selectedOptionLocal === option
                    ? 'bg-red-900/30 border-red-500/50'
                    : `bg-${theme.primary}-900/20 border-${theme.primary}-600/20 opacity-60`
              }
            `}
          >
            <div className="flex items-center gap-4">
              <div className={`
                w-10 h-10 flex-shrink-0 rounded-lg flex items-center justify-center
                ${!selectedOptionLocal 
                  ? `bg-${theme.primary}-700/50 border border-${theme.primary}-500/50` 
                  : option === question.answer
                    ? 'bg-green-700/50 border border-green-500/50'
                    : selectedOptionLocal === option
                      ? 'bg-red-700/50 border border-red-500/50'
                      : `bg-${theme.primary}-700/30 border border-${theme.primary}-500/30`
                }
              `}>
                {String.fromCharCode(65 + index)}
              </div>
              <span className={`text-lg text-${theme.primary}-100`}>{option}</span>
            </div>

            {/* Answer Indicators */}
            {selectedOptionLocal && (option === question.answer || selectedOptionLocal === option) && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`absolute top-4 right-4 ${
                  option === question.answer ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {option === question.answer ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Explanation Panel */}
      {showExplanation && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-6 p-6 bg-${theme.primary}-900/30 backdrop-blur-sm border border-${theme.primary}-500/30 rounded-xl`}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className={`w-2 h-2 rounded-full bg-${theme.primary}-400`}></div>
            <h3 className={`font-[Orbitron] text-xl text-${theme.primary}-300`}>
              Explanation
            </h3>
          </div>
          <p className={`font-[Orbitron] text-base text-${theme.primary}-100/90 leading-relaxed`}>
            {question.explanation}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Question; 