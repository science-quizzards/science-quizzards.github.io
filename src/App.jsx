import { useState, useEffect } from 'react'
import Quiz from './components/Quiz'
import CategorySelection from './components/CategorySelection'
import IntroLoader from './components/IntroLoader'
import audioManager from './utils/AudioManager'

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize audio and handle user interaction requirements for audio playback
  useEffect(() => {
    const initAudio = () => {
      audioManager.init();
      
      // Attempt to play background music (will work after user interaction)
      if (!selectedCategory) {
        audioManager.playBackgroundMusic();
      }
      
      // Remove the event listeners after first interaction
      document.removeEventListener('click', initAudio);
      document.removeEventListener('touchstart', initAudio);
    };

    // Add event listeners for user interaction
    document.addEventListener('click', initAudio);
    document.addEventListener('touchstart', initAudio);

    // Cleanup listeners on unmount
    return () => {
      document.removeEventListener('click', initAudio);
      document.removeEventListener('touchstart', initAudio);
    };
  }, []);

  // Handle category selection
  const handleCategorySelect = (category) => {
    // Play selection sound effect
    audioManager.playSoundEffect('select');
    setSelectedCategory(category);
  };

  // Handle going back to category selection
  const handleBackToCategories = () => {
    // Play selection sound effect
    audioManager.playSoundEffect('select');
    setSelectedCategory(null);
  };

  // Handle loader completion
  const handleLoaderComplete = () => {
    setLoading(false);
  };

  return (
    <>
      {/* Terminal-style loading screen */}
      {loading && <IntroLoader onComplete={handleLoaderComplete} />}
      
      {/* Background video */}
      <div className="fixed inset-0 overflow-hidden">
        <video
          className="video-background"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={`${import.meta.env.BASE_URL}videos/background.mp4`} type="video/mp4" />
        </video>
      </div>
      
      {/* Main application - only shown after loading completes */}
      <div className="min-h-screen py-6 px-4 relative flex flex-col items-center bg-black/50">
        
        
        <div className="w-full max-w-6xl mx-auto flex-grow flex flex-col items-center">
          {!selectedCategory ? (
            <CategorySelection onSelectCategory={handleCategorySelect} />
          ) : (
            <Quiz category={selectedCategory} onBackToCategories={handleBackToCategories} />
          )}
        </div>
      </div>
    </>
  )
}

export default App
