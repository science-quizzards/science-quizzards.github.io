import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Question from './Question';
import Results from './Results';
import { fetchQuestions, shuffleArray } from '../data';
import audioManager from '../utils/AudioManager';

// Determine the category name for display
const getCategoryName = (categorySlug) => {
  return categorySlug === 'earth-science' ? 'Earth Science' : 'Astronomy';
};

const Quiz = ({ category, onBackToCategories }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [quizComplete, setQuizComplete] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [countdown, setCountdown] = useState(3);
  const [canPlayBlip, setCanPlayBlip] = useState(true);

  // Load questions for selected category
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const data = await fetchQuestions(category);
        // Randomize the question order
        setQuestions(shuffleArray(data));
        setLoading(false);
      } catch (error) {
        console.error(`Failed to load ${category} questions:`, error);
        setLoading(false);
      }
    };

    loadQuestions();
  }, [category]);

  // Start category-specific music when quiz starts
  useEffect(() => {
    if (quizStarted) {
      audioManager.playCategoryMusic(category);
    }
    
    // Cleanup function to return to main music when unmounted
    return () => {
      audioManager.returnToMainMusic();
    };
  }, [quizStarted, category]);

  // Timer effect
  useEffect(() => {
    if (!quizStarted || quizComplete || showExplanation) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        // Play blip sound when time is running low
        if (prevTime <= 10 && prevTime > 0) {
          audioManager.playSoundEffect('blip');
        }
        
        if (prevTime <= 0) {
          clearInterval(timer);
          handleAnswer(false, null); // Automatically handle answer as wrong
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Reset timer when unmounting
    return () => {
      clearInterval(timer);
      setCanPlayBlip(true); // Reset blip state when timer is cleared
    };
  }, [quizStarted, quizComplete, currentQuestionIndex, showExplanation]);

  // Reset timer when moving to next question
  useEffect(() => {
    setTimeLeft(60);
    setCanPlayBlip(true);
  }, [currentQuestionIndex]);

  // Countdown effect for explanation
  useEffect(() => {
    if (!showExplanation) return;

    const countdownTimer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 0) {
          clearInterval(countdownTimer);
          if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(null);
            setShowExplanation(false);
          } else {
            setQuizComplete(true);
          }
          return 3; // Reset countdown
        }
        return prev - 0.1; // Decrease by 0.1 for smoother transition
      });
    }, 100);

    return () => clearInterval(countdownTimer);
  }, [showExplanation]);

  const handleAnswer = (isCorrect, option) => {
    clearInterval(timeLeft); // Clear any existing timer
    setTimeLeft(60); // Reset timer
    setCanPlayBlip(true); // Reset blip state
    
    // Play sound based on answer
    isCorrect ? audioManager.playSoundEffect('correct') : audioManager.playSoundEffect('wrong');
    
    // Update score
    if (isCorrect) {
      setScore(score + 1);
    }
    
    // Set selected option for UI
    setSelectedOption(option);
    setShowExplanation(true);
    setCountdown(3); // Start countdown
  };

  const startQuiz = () => {
    audioManager.playSoundEffect('select');
    setQuizStarted(true);
  };

  const restartQuiz = () => {
    audioManager.playSoundEffect('select');
    setQuestions(shuffleArray(questions));
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizComplete(false);
    setSelectedOption(null);
    setShowExplanation(false);
  };

  // Handle back button click
  const handleBack = () => {
    audioManager.returnToMainMusic();
    onBackToCategories();
  };

  // Add a color theme helper
  const getThemeColors = () => {
    return category === 'earth-science' 
      ? {
          primary: 'emerald',
          gradient: 'from-emerald-400 via-teal-500 to-cyan-500',
          bgFrom: 'from-emerald-900/60',
          bgTo: 'to-teal-800/60',
          accent: 'emerald',
          icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          )
        }
      : {
          primary: 'purple',
          gradient: 'from-blue-400 via-purple-500 to-pink-500',
          bgFrom: 'from-purple-900/60',
          bgTo: 'to-purple-800/60',
          accent: 'purple',
          icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          )
        };
  };

  const theme = getThemeColors();

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-96 w-full">
        <div className="relative">
          <motion.div 
            className="w-24 h-24 relative"
            animate={{ 
              rotateZ: [0, 180, 360]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "linear"
            }}
          >
            <div className="absolute inset-0 rounded-full border-4 border-t-indigo-600 border-r-transparent border-b-transparent border-l-transparent"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-r-purple-600 border-b-transparent border-l-transparent" style={{ transform: 'rotate(45deg)' }}></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-r-transparent border-b-blue-600 border-l-transparent" style={{ transform: 'rotate(135deg)' }}></div>
          </motion.div>
          
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <motion.div 
              className="w-12 h-12 bg-indigo-900/50 rounded-lg flex items-center justify-center"
              animate={{ rotate: [0, 90, 180, 270, 360] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            >
              <svg className="w-8 h-8 text-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            </motion.div>
          </motion.div>
        </div>
        <p className="mt-8 text-xl text-indigo-400 holographic-text">Initializing {getCategoryName(category)} Mission...</p>
      </div>
    );
  }

  if (!quizStarted) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-4xl mx-auto flex flex-col items-center space-y-8 pt-10"
      >
        {/* Title Section */}
        <motion.div
          initial={{ y: -50, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
          className="text-center"
        >
          <h1 className="text-5xl font-[Orbitron] font-bold mb-4">
            <span className={`bg-clip-text text-transparent bg-gradient-to-r ${theme.gradient}`}>
              {getCategoryName(category)} Mission
            </span>
          </h1>
          <div className="flex items-center justify-center gap-3">
            <div className={`h-0.5 w-12 bg-${theme.primary}-500/50 rounded`}></div>
            <svg className={`w-6 h-6 text-${theme.primary}-400`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {theme.icon}
            </svg>
            <div className={`h-0.5 w-12 bg-${theme.primary}-500/50 rounded`}></div>
          </div>
        </motion.div>

        {/* Mission Briefing Section */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-2xl mx-auto"
        >
          <div className={`text-${theme.primary}-300 font-[Orbitron] text-xl mb-4 flex items-center gap-2`}>
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Mission Briefing
          </div>

          <div className="space-y-3">
            <div className={`bg-${theme.primary}-900/30 backdrop-blur-sm rounded-lg p-4 flex items-center gap-3`}>
              <div className={`w-2 h-2 rounded-full bg-${theme.primary}-400`}></div>
              <span className={`font-[Orbitron] text-${theme.primary}-100`}>
                Answer {questions.length} questions about {getCategoryName(category)}
              </span>
            </div>
            
            <div className={`bg-${theme.primary}-900/30 backdrop-blur-sm rounded-lg p-4 flex items-center gap-3`}>
              <div className={`w-2 h-2 rounded-full bg-${theme.primary}-400`}></div>
              <span className={`font-[Orbitron] text-${theme.primary}-100`}>
                You have 30 seconds to answer each question - think fast!
              </span>
            </div>
            
            <div className={`bg-${theme.primary}-900/30 backdrop-blur-sm rounded-lg p-4 flex items-center gap-3`}>
              <div className={`w-2 h-2 rounded-full bg-${theme.primary}-400`}></div>
              <span className={`font-[Orbitron] text-${theme.primary}-100`}>
                Your score will be saved to the cosmic leaderboard
              </span>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={handleBack}
            className="px-6 py-3 bg-gray-800/50 hover:bg-gray-800/70 text-gray-300 rounded-lg backdrop-blur-sm flex items-center gap-2 transition-all font-[Orbitron]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Categories
          </motion.button>
          
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            onClick={startQuiz}
            className={`px-8 py-3 bg-${theme.primary}-700/60 hover:bg-${theme.primary}-700/80 text-white rounded-lg backdrop-blur-sm flex items-center gap-2 transition-all font-[Orbitron]`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            </svg>
            Start Mission
          </motion.button>
        </div>
      </motion.div>
    );
  }

  if (quizComplete) {
    return (
      <Results 
        score={score} 
        totalQuestions={questions.length} 
        category={category}
        onRestart={restartQuiz}
        onBackToCategories={handleBack}
      />
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-8 flex justify-between items-center">
        <button 
          onClick={handleBack}
          className="px-4 py-2 bg-gray-800/70 text-gray-300 rounded-lg border border-gray-600/50 backdrop-blur-sm flex items-center gap-2 hover:bg-gray-700/70 transition-all font-[Orbitron]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Exit
        </button>
        
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-sm text-blue-300/80 font-[Orbitron]">Question</div>
            <div className="text-2xl font-bold text-white font-[Orbitron]">
              {currentQuestionIndex + 1} <span className="text-blue-300/60">/ {questions.length}</span>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-sm text-purple-300/80 font-[Orbitron]">Score</div>
            <div className="text-2xl font-bold text-white font-[Orbitron]">{score}</div>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <Question 
          key={currentQuestionIndex}
          question={questions[currentQuestionIndex]} 
          onAnswer={handleAnswer}
          selectedOption={selectedOption}
          showExplanation={showExplanation}
          questionNumber={currentQuestionIndex + 1}
          theme={theme}
        />
      </AnimatePresence>

      {/* Question and Explanation */}
      <div className="mb-4">
        {showExplanation && (
          <div className="mt-4">
            <div className="h-2 bg-gray-300 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 transition-all duration-100"
                style={{ width: `${(countdown / 3) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz; 