import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const SpaceBackground = ({ category = 'default' }) => {
  // Theme-specific colors and effects
  const theme = category === 'earth-science' 
    ? {
        nebula1: 'rgba(52, 211, 153, 0.07)', // emerald
        nebula2: 'rgba(16, 185, 129, 0.04)', // green
        glow1: 'bg-emerald-500/5',
        glow2: 'bg-green-500/5',
        glow3: 'bg-teal-500/5',
        planetGlow: 'rgba(52, 211, 153, 0.2)',
        planetColors: {
          earth: 'radial-gradient(circle at 40% 40%, #4ade80, #22c55e 45%, #15803d 70%, #064e3b 90%)',
          atmosphere: 'radial-gradient(circle at 45% 45%, #a5f3fc, #67e8f9 40%, #22d3ee 60%, #0891b2 90%)'
        }
      }
    : {
        nebula1: 'rgba(139, 92, 246, 0.07)', // purple
        nebula2: 'rgba(79, 70, 229, 0.04)', // indigo
        glow1: 'bg-blue-500/5',
        glow2: 'bg-purple-500/5',
        glow3: 'bg-cyan-500/5',
        planetGlow: 'rgba(139, 92, 246, 0.2)',
        planetColors: {
          planet1: 'radial-gradient(circle at 40% 40%, #c084fc, #a855f7 45%, #7e22ce 70%, #581c87 90%)',
          planet2: 'radial-gradient(circle at 45% 45%, #818cf8, #6366f1 40%, #4f46e5 60%, #3730a3 90%)'
        }
      };

  return (
    <div className="fixed inset-0 overflow-hidden -z-10">
      {/* Base dark space background */}
      <div className="absolute inset-0 bg-black"></div>
      
      {/* Enhanced animated stars layer */}
      <div className="space-stars absolute inset-0 opacity-95"></div>
      <div className="space-stars-small absolute inset-0 opacity-75" style={{ animationDuration: '200s' }}></div>
      
      {/* Dynamic particles */}
      <div className="absolute inset-0">
        <div className="particles-container absolute inset-0"></div>
      </div>
      
      {/* Category-specific planets */}
      <div className="absolute top-0 right-0 w-full h-full">
        {category === 'earth-science' ? (
          // Earth Science theme planets
          <>
            {/* Rotating Earth */}
            <motion.div 
              className="absolute right-10 top-20 w-48 h-48 rounded-full opacity-40"
              style={{
                background: theme.planetColors.earth,
                boxShadow: `0 0 50px 5px ${theme.planetGlow}`
              }}
              animate={{ 
                rotate: 360,
                scale: [1, 1.02, 1]
              }}
              transition={{ 
                rotate: { duration: 200, repeat: Infinity, ease: "linear" },
                scale: { duration: 10, repeat: Infinity, ease: "easeInOut" }
              }}
            />
            
            {/* Atmosphere layer */}
            <motion.div 
              className="absolute right-10 top-20 w-48 h-48 rounded-full opacity-20"
              style={{
                background: theme.planetColors.atmosphere,
                filter: 'blur(8px)'
              }}
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.3, 0.2]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </>
        ) : (
          // Astronomy theme planets
          <>
            {/* Distant planets */}
            <motion.div 
              className="absolute right-20 top-40 w-32 h-32 rounded-full opacity-30"
              style={{
                background: theme.planetColors.planet1,
                boxShadow: `0 0 40px 5px ${theme.planetGlow}`
              }}
              animate={{ 
                x: [0, 10, 0],
                y: [0, -10, 0]
              }}
              transition={{ 
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.div 
              className="absolute left-20 bottom-40 w-40 h-40 rounded-full opacity-25"
              style={{
                background: theme.planetColors.planet2,
                boxShadow: `0 0 30px 5px ${theme.planetGlow}`
              }}
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.25, 0.35, 0.25]
              }}
              transition={{ 
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </>
        )}
      </div>
      
      {/* Enhanced nebula clusters */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-1/3 -left-20 w-96 h-96 rounded-full"
          style={{
            background: `radial-gradient(circle at center, ${theme.nebula1}, ${theme.nebula2}, transparent 70%)`,
            filter: 'blur(40px)'
          }}
          animate={{ 
            opacity: [0.4, 0.7, 0.4],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      {/* Enhanced shooting stars */}
      <ShootingStars count={8} />
      
      {/* Theme-specific glowing orbs */}
      <motion.div 
        className={`absolute top-1/4 -left-20 w-80 h-80 ${theme.glow1} rounded-full blur-3xl`}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className={`absolute bottom-1/4 -right-20 w-80 h-80 ${theme.glow2} rounded-full blur-3xl`}
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div 
        className={`absolute top-3/4 left-1/3 w-40 h-40 ${theme.glow3} rounded-full blur-2xl`}
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />
    </div>
  );
};

// Enhanced shooting stars component
const ShootingStars = ({ count = 5 }) => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generateStars = () => Array.from({ length: count }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 70}%`,
      left: `${Math.random() * 100}%`,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 10,
      size: 1 + Math.random() * 2
    }));

    setStars(generateStars());
  }, [count]);

  return (
    <>
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full pointer-events-none"
          style={{ 
            top: star.top, 
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size * 15}px`,
          }}
          initial={{ opacity: 0, transform: "translateX(0) translateY(0) rotate(45deg)" }}
          animate={{ 
            opacity: [0, 1, 0],
            transform: "translateX(100px) translateY(100px) rotate(45deg)",
            boxShadow: [
              "0 0 0 rgba(255, 255, 255, 0)",
              "0 0 5px rgba(255, 255, 255, 0.8)",
              "0 0 0 rgba(255, 255, 255, 0)"
            ]
          }}
          transition={{ 
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeIn"
          }}
        />
      ))}
    </>
  );
};

export default SpaceBackground; 