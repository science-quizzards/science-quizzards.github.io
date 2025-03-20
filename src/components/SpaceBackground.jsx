import { motion } from 'framer-motion';

const SpaceBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden -z-10">
      {/* Base dark space background */}
      <div className="absolute inset-0 bg-black"></div>
      
      {/* Animated stars layer */}
      <div className="space-stars absolute inset-0 opacity-95"></div>
      
      {/* Dynamic particles */}
      <div className="absolute inset-0">
        <div className="particles-container absolute inset-0"></div>
      </div>
      
      {/* Holographic grid effect */}
      <div className="holographic-grid absolute inset-0 pointer-events-none"></div>
      
      {/* Animated planets */}
      <div className="absolute top-0 right-0 w-full h-full">
        {/* Jupiter-like planet */}
        <motion.div 
          className="absolute right-0 top-20 w-40 h-40 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle at 40% 40%, #c48a3f, #624a2e 45%, #30271f 60%, #0d0a08 90%)',
            boxShadow: '0 0 40px 5px rgba(196, 138, 63, 0.15)'
          }}
          animate={{ 
            x: [10, 0, 10], 
            y: [0, 5, 0],
            rotate: 360,
          }}
          transition={{ 
            x: { duration: 10, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" },
            y: { duration: 15, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" },
            rotate: { duration: 180, repeat: Infinity, ease: "linear" }
          }}
        />
        
        {/* Saturn-like planet with rings */}
        <motion.div 
          className="absolute left-10 bottom-32 w-72 h-30 opacity-20"
          animate={{ 
            x: [-20, 0, -20], 
            y: [10, 0, 10],
          }}
          transition={{ 
            x: { duration: 20, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" },
            y: { duration: 25, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }
          }}
        >
          <div className="w-32 h-32 rounded-full mx-auto"
            style={{
              background: 'radial-gradient(circle at 45% 45%, #e8d59d, #bd9d5f 45%, #705c31 70%, #372e18 90%)',
              boxShadow: '0 0 30px rgba(232, 213, 157, 0.2)'
            }}
          />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-8 rounded-full"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(232, 213, 157, 0.3) 20%, rgba(232, 213, 157, 0.5) 50%, rgba(232, 213, 157, 0.3) 80%, transparent 100%)',
              transform: 'perspective(500px) rotateX(75deg)'
            }}
          />
        </motion.div>
        
        {/* Distant blue planet */}
        <motion.div 
          className="absolute left-1/2 top-36 w-20 h-20 rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle at 40% 40%, #8eb8e5, #6298d1 40%, #3e70a7 60%, #1b3955 90%)',
            boxShadow: '0 0 20px rgba(110, 170, 235, 0.2)'
          }}
          animate={{ 
            x: [5, -5, 5], 
            scale: [1, 1.05, 1],
          }}
          transition={{ 
            x: { duration: 8, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" },
            scale: { duration: 12, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }
          }}
        />
      </div>
      
      {/* Nebula clusters */}
      <div className="absolute inset-0">
        {/* Purple/blue nebula */}
        <motion.div 
          className="absolute top-1/3 -left-20 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.07), rgba(79, 70, 229, 0.04), transparent 70%)',
            filter: 'blur(40px)'
          }}
          animate={{ 
            opacity: [0.4, 0.7, 0.4],
            scale: [1, 1.1, 1], 
          }}
          transition={{ 
            opacity: { duration: 10, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" },
            scale: { duration: 15, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }
          }}
        />
        
        {/* Red/orange nebula */}
        <motion.div 
          className="absolute bottom-0 right-0 w-full h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle at center, rgba(244, 114, 182, 0.05), rgba(251, 113, 133, 0.03), transparent 70%)',
            filter: 'blur(60px)'
          }}
          animate={{ 
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.05, 1], 
          }}
          transition={{ 
            opacity: { duration: 12, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" },
            scale: { duration: 18, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }
          }}
        />
      </div>
      
      {/* Animated shooting stars */}
      <ShootingStars />
      
      {/* Glowing orbs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-nebula-pulse"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-nebula-pulse" 
        style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-3/4 left-1/3 w-40 h-40 bg-cyan-500/5 rounded-full blur-2xl animate-nebula-pulse"
        style={{ animationDelay: '5s' }}></div>
    </div>
  );
};

// Animated shooting stars component
const ShootingStars = () => {
  // Generate random positions for shooting stars
  const stars = Array.from({ length: 5 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 70}%`,
    left: `${Math.random() * 100}%`,
    duration: 2 + Math.random() * 3,
    delay: Math.random() * 10,
    size: 1 + Math.random() * 2
  }));

  return (
    <>
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute w-0.5 h-0.5 bg-white rounded-full pointer-events-none"
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