import { motion } from 'framer-motion';
import audioManager from '../utils/AudioManager';

const CategorySelection = ({ onSelectCategory }) => {
  // Handle category selection with sound effect
  const handleCategorySelect = (category) => {
    // Play selection sound effect
    audioManager.playSoundEffect('select');
    onSelectCategory(category);
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-4xl text-center py-8"
    >
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, type: "spring" }}
        className="mb-12"
      >
        <h1 className="text-5xl font-bold mb-2">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            The Science Quizzard
          </span>
        </h1>
        <p className="text-xl text-blue-300/80 mt-2">Choose your mission destination</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Earth Science Card */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          whileHover={{ scale: 1.03, boxShadow: "0 0 25px rgba(59, 130, 246, 0.5)" }}
          onClick={() => handleCategorySelect('earth-science')}
          className="category-card group cursor-pointer"
        >
          <div className="holographic-overlay"></div>
          <div className="h-48 bg-gradient-to-br from-blue-600/20 to-cyan-400/20 rounded-t-xl overflow-hidden relative">
            <div className="absolute inset-0 planet-earth"></div>
            <div className="absolute top-0 right-0 m-4 bg-blue-500/30 text-blue-300 px-3 py-1 rounded-full backdrop-blur-md text-sm font-medium border border-blue-400/30">
              20 Questions
            </div>
          </div>
          <div className="p-6 bg-gradient-to-b from-blue-900/60 to-blue-800/60 rounded-b-xl border-t border-blue-500/40 relative overflow-hidden">
            <div className="absolute inset-0 bg-circuit-pattern opacity-10"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 rounded-full bg-blue-400 mr-2 animate-pulse"></div>
                <h3 className="text-2xl font-bold text-white">Earth Science</h3>
              </div>
              <p className="text-blue-200/90 mb-4">Explore the geology, atmosphere, and water systems of our home planet</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-xs uppercase tracking-wider text-blue-300/70">Difficulty: Grade 4</span>
                <span className="flex items-center text-blue-300 group-hover:text-blue-100 transition-colors">
                  Start Mission
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Astronomy Card */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          whileHover={{ scale: 1.03, boxShadow: "0 0 25px rgba(139, 92, 246, 0.5)" }}
          onClick={() => handleCategorySelect('astronomy')}
          className="category-card group cursor-pointer"
        >
          <div className="holographic-overlay"></div>
          <div className="h-48 bg-gradient-to-br from-purple-600/20 to-pink-500/20 rounded-t-xl overflow-hidden relative">
            <div className="absolute inset-0 space-scene"></div>
            <div className="absolute top-0 right-0 m-4 bg-purple-500/30 text-purple-300 px-3 py-1 rounded-full backdrop-blur-md text-sm font-medium border border-purple-400/30">
              20 Questions
            </div>
          </div>
          <div className="p-6 bg-gradient-to-b from-purple-900/60 to-purple-800/60 rounded-b-xl border-t border-purple-500/40 relative overflow-hidden">
            <div className="absolute inset-0 bg-circuit-pattern opacity-10"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 rounded-full bg-purple-400 mr-2 animate-pulse"></div>
                <h3 className="text-2xl font-bold text-white">Astronomy</h3>
              </div>
              <p className="text-purple-200/90 mb-4">Discover planets, stars, and other fascinating objects in our universe</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-xs uppercase tracking-wider text-purple-300/70">Difficulty: Grade 4</span>
                <span className="flex items-center text-purple-300 group-hover:text-purple-100 transition-colors">
                  Start Mission
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-16 max-w-lg mx-auto p-6 bg-indigo-900/30 backdrop-blur-md rounded-xl border border-indigo-500/30"
      >
        <h3 className="text-xl font-bold text-blue-300 mb-2 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Mission Briefing
        </h3>
        <ul className="space-y-2 text-gray-300/90 text-sm">
          <li className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Each mission contains 20 questions to test your knowledge
          </li>
          <li className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            You'll have 30 seconds to answer each question
          </li>
          <li className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Track your score and join the Cosmic Leaderboard
          </li>
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default CategorySelection; 