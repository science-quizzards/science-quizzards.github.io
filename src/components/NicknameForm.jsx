import { useState } from 'react';
import { motion } from 'framer-motion';

const NicknameForm = ({ score, totalQuestions, category, onSubmit }) => {
  const [nickname, setNickname] = useState('');
  const percentage = Math.round((score / totalQuestions) * 100);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(nickname.trim() || 'Anonymous Explorer');
  };

  // Determine rank based on percentage
  let rank = 'Cosmic Novice';
  let rankColor = 'text-blue-400';
  
  if (percentage >= 90) {
    rank = 'Galactic Grand Master';
    rankColor = 'text-purple-400';
  } else if (percentage >= 80) {
    rank = 'Stellar Scientist';
    rankColor = 'text-indigo-400';
  } else if (percentage >= 70) {
    rank = 'Planetary Pioneer';
    rankColor = 'text-blue-400';
  } else if (percentage >= 60) {
    rank = 'Asteroid Apprentice';
    rankColor = 'text-cyan-400';
  } else if (percentage >= 50) {
    rank = 'Lunar Learner';
    rankColor = 'text-teal-400';
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto bg-gradient-to-b from-indigo-900/50 to-purple-900/50 p-8 rounded-2xl backdrop-blur-sm border border-indigo-500/30 shadow-xl"
    >
      <h2 className="text-2xl font-bold text-center mb-1 text-white">Mission Complete!</h2>
      
      <div className="my-6 flex flex-col items-center">
        <div className="relative mb-3">
          <div className="w-32 h-32 rounded-full bg-gradient-to-b from-indigo-600/20 to-purple-600/20 flex items-center justify-center border-4 border-indigo-500/30">
            <div className="text-4xl font-bold text-white">{percentage}%</div>
          </div>
          <div className="absolute -top-2 -right-2 bg-indigo-900/80 border border-indigo-500/50 rounded-lg px-2 py-1 text-xs font-bold text-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            {score}/{totalQuestions}
          </div>
        </div>
        
        <div className="holographic-text mb-1">
          <span className={`text-xl font-bold ${rankColor}`}>{rank}</span>
        </div>
        
        <p className="text-gray-300/80 text-sm">
          {
            percentage >= 80 ? "Exceptional knowledge! You're a true science genius!" : 
            percentage >= 60 ? "Great job! You have an impressive understanding of science!" : 
            percentage >= 40 ? "Good effort! Keep exploring and learning!" : 
            "You're just beginning your journey. Keep studying!"
          }
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="mt-6">
        <div className="mb-5 relative">
          <label className="block text-sm text-indigo-300 mb-2 font-medium" htmlFor="nickname">
            Enter Your Cosmic Identity
          </label>
          <div className="relative">
            <input
              id="nickname"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Your Nickname"
              maxLength={20}
              className="w-full bg-indigo-900/30 border border-indigo-500/40 focus:border-indigo-400 rounded-lg px-4 py-3 text-white placeholder-indigo-300/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
            />
            <div className="absolute inset-0 rounded-lg pointer-events-none holographic-scanner"></div>
          </div>
          <div className="text-right mt-1">
            <span className="text-xs text-indigo-400/70">{nickname.length}/20</span>
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(79, 70, 229, 0.5)" }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-white font-bold transition-all relative overflow-hidden group"
        >
          <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
          <span className="relative flex items-center justify-center gap-2">
            Join the Cosmic Leaderboard
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </span>
        </motion.button>
      </form>
    </motion.div>
  );
};

export default NicknameForm; 