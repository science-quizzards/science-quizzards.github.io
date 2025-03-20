import { motion } from 'framer-motion';
import audioManager from '../utils/AudioManager';
import { useEffect } from 'react';

const CategorySelection = ({ onSelectCategory }) => {
  // Handle category selection with sound effect
  const handleCategorySelect = (category) => {
    // Play selection sound effect
    audioManager.playSoundEffect('select');
    onSelectCategory(category);
  };
  
  useEffect(() => {
    audioManager.playMainMusic();
  }, []);
  
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
        <h1 className="text-5xl font-[Orbitron] font-bold mb-2 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          The Science Quizzard
        </h1>
        <p className="text-xl text-blue-300/80 mt-2 font-[Orbitron]">Choose your mission destination</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* Earth Science Card */}
        <div className="category-card earth rounded-xl overflow-hidden">
          <div className="relative z-10">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => handleCategorySelect('earth-science')}
              className="holo-card cursor-pointer"
            >
              <div className="h-48 bg-gradient-to-br from-emerald-600/20 to-green-400/20 rounded-t-xl overflow-hidden relative">
                <div className="absolute inset-0 planet-earth"></div>
                <div className="absolute top-0 right-0 m-4 bg-emerald-500/30 text-emerald-300 px-3 py-1 rounded-full backdrop-blur-md text-sm font-[Orbitron] border border-emerald-400/30">
                  20 Questions
                </div>
              </div>
              <div className="p-6 bg-gradient-to-b from-emerald-900/60 to-emerald-800/60 rounded-b-xl border-t border-emerald-500/40 relative overflow-hidden">
                <div className="absolute inset-0 bg-circuit-pattern opacity-10"></div>
                <div className="relative z-10">
                  <div className="flex items-center mb-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-400 mr-2"></div>
                    <h3 className="text-2xl font-[Orbitron] font-bold text-white">Earth Science</h3>
                  </div>
                  <p className="text-emerald-200/90 mb-4 text-left font-[Orbitron] text-sm">
                    Explore the geology, atmosphere, and water systems of our home planet
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs uppercase tracking-wider text-emerald-300/70 font-[Orbitron]">Difficulty: Grade 4</span>
                    <span className="flex items-center text-emerald-300 group-hover:text-emerald-100 transition-colors font-[Orbitron]">
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
        </div>

        {/* Astronomy Card */}
        <div className="category-card astronomy rounded-xl overflow-hidden">
          <div className="relative z-10">
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => handleCategorySelect('astronomy')}
              className="holo-card cursor-pointer"
            >
              <div className="h-48 bg-gradient-to-br from-purple-600/20 to-pink-500/20 rounded-t-xl overflow-hidden relative">
                <div className="absolute inset-0 space-scene"></div>
                <div className="absolute top-0 right-0 m-4 bg-purple-500/30 text-purple-300 px-3 py-1 rounded-full backdrop-blur-md text-sm font-[Orbitron] border border-purple-400/30">
                  20 Questions
                </div>
              </div>
              <div className="p-6 bg-gradient-to-b from-purple-900/60 to-purple-800/60 rounded-b-xl border-t border-purple-500/40 relative overflow-hidden">
                <div className="absolute inset-0 bg-circuit-pattern opacity-10"></div>
                <div className="relative z-10">
                  <div className="flex items-center mb-2">
                    <div className="w-3 h-3 rounded-full bg-purple-400 mr-2 animate-pulse"></div>
                    <h3 className="text-2xl font-[Orbitron] font-bold text-white">Astronomy</h3>
                  </div>
                  <p className="text-purple-200/90 mb-4 text-left font-[Orbitron] text-sm">Discover planets, stars, and other fascinating objects in our universe</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-xs uppercase tracking-wider text-purple-300/70 font-[Orbitron]">Difficulty: Grade 4</span>
                    <span className="flex items-center text-purple-300 group-hover:text-purple-100 transition-colors font-[Orbitron]">
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
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-16 max-w-lg mx-auto p-6 holo-panel backdrop-blur-md rounded-xl"
      >
        <h3 className="text-xl font-[Orbitron] font-bold text-blue-300 mb-2 flex">
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
            <span className="font-[Orbitron] text-left">Each mission contains 20 questions to test your knowledge</span>
          </li>
          <li className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-[Orbitron] text-left">You'll have 60 seconds to answer each question</span>
          </li>
          <li className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-[Orbitron] text-left">Track your score and join the Cosmic Leaderboard</span>
          </li>
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default CategorySelection; 