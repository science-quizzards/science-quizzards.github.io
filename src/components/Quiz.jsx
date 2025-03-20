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

  // Start background music when quiz starts
  useEffect(() => {
    if (quizStarted) {
      // Ensure background music is playing during the quiz
      audioManager.playBackgroundMusic();
    }
    
    return () => {
      // Don't stop music when unmounting - it will continue in other components
    };
  }, [quizStarted]);

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
    audioManager.playSoundEffect('select');
    onBackToCategories();
  };

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
        className="w-full max-w-4xl mx-auto text-center py-10 flex flex-col items-center"
      >
        <motion.div
          initial={{ y: -50, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
          className="mb-8"
        >
          <h1 className="text-5xl font-bold mb-3">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              {getCategoryName(category)} Mission
            </span>
          </h1>
          <div className="flex items-center justify-center gap-3">
            <div className="h-1 w-16 bg-blue-500 rounded animate-pulse"></div>
            <motion.div 
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [-1, 1, -1]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                repeatType: "mirror"
              }}
              className="flex items-center justify-center"
            >
              <svg className="w-10 h-10 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {category === 'earth-science' 
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                }
              </svg>
            </motion.div>
            <div className="h-1 w-16 bg-purple-500 rounded animate-pulse"></div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="w-full max-w-3xl mx-auto mb-12 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl -z-10"></div>
          <div className="bg-indigo-900/30 p-8 rounded-2xl border-2 border-indigo-500/30 backdrop-blur-sm relative">
            <div className="holographic-overlay absolute inset-0 rounded-2xl pointer-events-none"></div>
            
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-12 h-12 bg-indigo-700/50 rounded-full flex items-center justify-center mr-3">
                <div className="absolute inset-0 rounded-full animate-ping bg-indigo-600/20"></div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-blue-300">Mission Briefing</h2>
            </div>
            
            <ul className="text-left space-y-4 mb-8 relative z-10">
              <li className="flex items-start bg-indigo-800/30 p-4 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-purple-700/50 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span>Answer <b>{questions.length}</b> questions about {getCategoryName(category)}</span>
              </li>
              
              <li className="flex items-start bg-indigo-800/30 p-4 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-purple-700/50 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span>You have <b>30 seconds</b> to answer each question - think fast!</span>
              </li>
              
              <li className="flex items-start bg-indigo-800/30 p-4 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-purple-700/50 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span>Your <b>score</b> will be saved to the cosmic leaderboard</span>
              </li>
            </ul>
          </div>
        </motion.div>

        <div className="flex flex-wrap gap-4 justify-center">
        <motion.button
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(79, 70, 229, 0.6)" }}
            onClick={handleBack}
            className="px-6 py-3 bg-gray-800/70 text-gray-300 rounded-lg border border-gray-600/50 backdrop-blur-sm flex items-center gap-2 hover:bg-gray-700/70 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Categories
          </motion.button>
          
          <motion.button
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(79, 70, 229, 0.6)" }}
          onClick={startQuiz}
            className="px-8 py-3 bg-gradient-to-r from-indigo-700/80 to-purple-700/80 text-white rounded-lg border border-indigo-500/50 backdrop-blur-sm flex items-center gap-2 hover:from-indigo-600/80 hover:to-purple-600/80 transition-all"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
          className="px-4 py-2 bg-gray-800/70 text-gray-300 rounded-lg border border-gray-600/50 backdrop-blur-sm flex items-center gap-2 hover:bg-gray-700/70 transition-all"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          Exit
        </button>
        
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-sm text-blue-300/80">Question</div>
            <div className="text-2xl font-bold text-white">{currentQuestionIndex + 1} <span className="text-blue-300/60">/ {questions.length}</span></div>
          </div>
          
          <div className="text-center">
            <div className="text-sm text-purple-300/80">Score</div>
            <div className="text-2xl font-bold text-white holographic-text">{score}</div>
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