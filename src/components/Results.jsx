import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getScores, saveScore } from '../data';
import NicknameForm from './NicknameForm';
import { generateLeaderboard } from '../data/leaderboard';
import audioManager from '../utils/AudioManager';

const getThemeColors = (category) => {
  return category === 'earth-science' 
    ? {
        primary: 'emerald',
        gradient: 'from-emerald-400 via-green-500 to-teal-500',
        bgFrom: 'from-emerald-900/50',
        bgTo: 'to-green-900/50',
        border: 'border-emerald-500/30'
      }
    : {
        primary: 'purple',
        gradient: 'from-blue-400 via-purple-500 to-pink-500',
        bgFrom: 'from-indigo-900/50',
        bgTo: 'to-purple-900/50',
        border: 'border-indigo-500/30'
      };
};

const Results = ({ score, totalQuestions, category, onRestart, onBackToCategories }) => {
  const theme = getThemeColors(category);
  const [showNicknameForm, setShowNicknameForm] = useState(true);
  const [leaderboard, setLeaderboard] = useState([]);
  const [yourScore, setYourScore] = useState(null);
  const percentage = Math.round((score / totalQuestions) * 100);
  const isPerfectScore = score === totalQuestions;
  
  const handleNicknameSubmit = (nickname) => {
    // Save score with nickname
    const scoreRecord = saveScore(score, totalQuestions, category, nickname);
    setYourScore(scoreRecord);
    setShowNicknameForm(false);
    
    // Refresh leaderboard
    setLeaderboard(generateLeaderboard(score, category));
  };
  
  // Load leaderboard
  useEffect(() => {
    setLeaderboard(generateLeaderboard(score, category));
  }, [score, category]);
  
  // Determine message and emoji based on score
  const getResults = () => {
    if (percentage >= 90) return { message: "Commander status achieved! You're a science genius!", emoji: "🚀" };
    if (percentage >= 70) return { message: "Great job, space cadet! Your knowledge is impressive!", emoji: "🌎" };
    if (percentage >= 50) return { message: "Good effort! Keep exploring the scientific universe!", emoji: "✨" };
    return { message: "The journey of discovery has just begun. Keep studying!", emoji: "🔭" };
  };
  
  const { message, emoji } = getResults();
  
  useEffect(() => {
    // Return to main music when showing results
    audioManager.returnToMainMusic();
  }, []);
  
  if (showNicknameForm) {
    return (
      <NicknameForm 
        score={score}
        totalQuestions={totalQuestions}
        category={category}
        onSubmit={handleNicknameSubmit}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-5xl mx-auto py-10"
    >
      <div className="text-center mb-10">
        <motion.h2 
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r ${theme.gradient}`}
        >
          Mission Complete!
        </motion.h2>
        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-gray-300/80"
        >
          Your space exploration journey results
        </motion.p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <motion.div 
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`bg-${theme.primary}-900/30 p-8 rounded-2xl border-2 ${theme.border} backdrop-blur-sm relative overflow-hidden shadow-lg`}
        >
          <div className="holographic-overlay"></div>
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl"></div>
          
          <div className="flex flex-col items-center justify-center gap-6 relative">
            <motion.div 
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="w-48 h-48 rounded-full flex items-center justify-center bg-gradient-to-br from-indigo-900/70 to-purple-900/70 border-8 border-indigo-600/50 shadow-xl relative overflow-hidden">
                <div className="scanner-line absolute top-0 left-0 w-full h-full"></div>
                <span className="text-5xl font-bold text-white holographic-text">{percentage}%</span>
              </div>
              
              {isPerfectScore && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, type: "spring" }}
                  className="absolute -top-6 -right-6 bg-yellow-500 text-yellow-900 font-bold px-4 py-2 rounded-full text-xl shadow-xl border-2 border-yellow-400 flex items-center gap-1"
                >
                  <span>Perfect!</span> 🏆
                </motion.div>
              )}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center"
            >
              <p className="text-2xl mb-4">
                Agent <span className="font-bold text-blue-400">{yourScore.nickname}</span> scored <span className="font-bold text-green-400">{score}</span> of <span className="font-bold">{totalQuestions}</span>
              </p>
              
              <div className="flex items-center justify-center mt-2 p-4 bg-indigo-800/30 rounded-xl border border-indigo-600/30 holo-card">
                <span className="text-3xl mr-4">{emoji}</span>
                <p className="text-xl">{message}</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`bg-${theme.primary}-900/30 p-8 rounded-2xl border-2 ${theme.border} backdrop-blur-sm relative overflow-hidden shadow-lg`}
        >
          <div className="holographic-overlay"></div>
          <div className="absolute -top-12 -left-12 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl"></div>
          
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 bg-indigo-700/50 rounded-full flex items-center justify-center mr-3 border border-indigo-600/50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-purple-300">Cosmic Leaderboard</h3>
          </div>
          
          {leaderboard.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="max-h-96 overflow-auto custom-scrollbar"
            >
              <div className="space-y-3 mb-6">
                {leaderboard.map((entry, index) => (
                  <motion.div 
                    key={index}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      entry.name === "You" 
                        ? "bg-indigo-600/40 border border-indigo-400/50" 
                        : "bg-indigo-800/30"
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="text-2xl font-bold mr-3 text-indigo-300">#{index + 1}</span>
                      <span className={entry.name === "You" ? "font-bold text-white" : "text-blue-200"}>
                        {entry.name}
                      </span>
                    </div>
                    <span className="text-xl font-bold text-purple-300">{entry.score}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="text-center p-8 bg-indigo-800/20 rounded-lg">
              <p>No scores yet! You're the first explorer!</p>
            </div>
          )}
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex justify-center gap-4 flex-wrap"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRestart}
          className={`px-8 py-3 bg-gradient-to-r ${theme.gradient} rounded-xl font-bold text-white shadow-xl relative overflow-hidden group`}
        >
          <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
          <span className="relative flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Try Again
          </span>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBackToCategories}
          className={`px-8 py-3 bg-gradient-to-r from-${theme.primary}-600/80 to-${theme.primary}-700/80 rounded-xl font-bold text-white shadow-xl relative overflow-hidden group`}
        >
          <span className="absolute top-0 left-0 w-full h-full bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
          <span className="relative flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
            </svg>
            Choose Another Mission
          </span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Results; 