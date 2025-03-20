// Audio Manager - Handles sound effects and background music
class AudioManager {
  constructor() {
    this.backgroundMusic = null;
    this.backgroundMusic2 = null;
    this.soundEffects = {};
    this.isMuted = false;
    this.bgMusicVolume = 0.4; // Default background music volume
    this.sfxVolume = 0.6;     // Default sound effects volume
    this.isInitialized = false;
  }

  // Initialize audio manager and preload sounds
  init() {
    if (this.isInitialized) return;

    // Create background music elements
    this.backgroundMusic = new Audio(`${import.meta.env.BASE_URL}sounds/background.mp3`);
    this.backgroundMusic2 = new Audio(`${import.meta.env.BASE_URL}sounds/background2.mp3`);
    
    // Set up properties for both tracks
    this.backgroundMusic.volume = this.bgMusicVolume;
    this.backgroundMusic2.volume = this.bgMusicVolume;
    
    // Add ended event listener to start the second track
    this.backgroundMusic.addEventListener('ended', () => {
      this.backgroundMusic2.play().catch(error => {
        console.log('Background music 2 playback prevented by browser: ', error);
      });
    });

    // Add ended event listener to start the first track again
    this.backgroundMusic2.addEventListener('ended', () => {
      this.backgroundMusic.play().catch(error => {
        console.log('Background music playback prevented by browser: ', error);
      });
    });

    // Preload sound effects
    this.preloadSoundEffect('select', `${import.meta.env.BASE_URL}sounds/select.mp3`);
    this.preloadSoundEffect('correct', `${import.meta.env.BASE_URL}sounds/correct.mp3`);
    this.preloadSoundEffect('wrong', `${import.meta.env.BASE_URL}sounds/wrong.mp3`);
    this.preloadSoundEffect('blip', `${import.meta.env.BASE_URL}sounds/blip.mp3`);
    
    this.isInitialized = true;
  }

  // Preload a sound effect and store in the collection
  preloadSoundEffect(name, path) {
    const audio = new Audio(path);
    audio.volume = this.sfxVolume;
    audio.preload = 'auto';
    this.soundEffects[name] = audio;
  }

  // Play a sound effect by name
  playSoundEffect(name) {
    if (this.isMuted) return;
    
    // Ensure the manager is initialized
    if (!this.isInitialized) {
      this.init();
    }

    // If the sound effect exists, play it
    if (this.soundEffects[name]) {
      // Create a clone for overlapping sounds
      const sound = this.soundEffects[name].cloneNode();
      sound.volume = this.sfxVolume;
      
      // Fix for mobile devices - need user interaction
      const playPromise = sound.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log('Audio playback prevented by browser: ', error);
        });
      }
    }
  }

  // Start playing background music
  playBackgroundMusic() {
    if (this.isMuted) return;
    
    // Ensure the manager is initialized
    if (!this.isInitialized) {
      this.init();
    }

    // Start playing if not already playing
    if (this.backgroundMusic && this.backgroundMusic.paused) {
      const playPromise = this.backgroundMusic.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log('Background music playback prevented by browser: ', error);
        });
      }
    }
  }

  // Stop background music
  stopBackgroundMusic() {
    if (this.backgroundMusic) {
      this.backgroundMusic.pause();
      this.backgroundMusic.currentTime = 0;
    }
    if (this.backgroundMusic2) {
      this.backgroundMusic2.pause();
      this.backgroundMusic2.currentTime = 0;
    }
  }

  // Pause background music
  pauseBackgroundMusic() {
    if (this.backgroundMusic) {
      this.backgroundMusic.pause();
    }
    if (this.backgroundMusic2) {
      this.backgroundMusic2.pause();
    }
  }

  // Resume background music
  resumeBackgroundMusic() {
    if (!this.isMuted) {
      if (this.backgroundMusic && this.backgroundMusic.paused && this.backgroundMusic.currentTime > 0) {
        this.backgroundMusic.play().catch(error => {
          console.log('Resume background music prevented by browser: ', error);
        });
      } else if (this.backgroundMusic2 && this.backgroundMusic2.paused && this.backgroundMusic2.currentTime > 0) {
        this.backgroundMusic2.play().catch(error => {
          console.log('Resume background music 2 prevented by browser: ', error);
        });
      }
    }
  }

  // Mute all audio
  mute() {
    this.isMuted = true;
    if (this.backgroundMusic) {
      this.backgroundMusic.pause();
    }
    if (this.backgroundMusic2) {
      this.backgroundMusic2.pause();
    }
  }

  // Unmute all audio
  unmute() {
    this.isMuted = false;
    // Resume background music if it was playing
    if (this.backgroundMusic && !this.backgroundMusic.ended) {
      this.resumeBackgroundMusic();
    }
  }

  // Set background music volume (0-1)
  setBackgroundVolume(volume) {
    this.bgMusicVolume = Math.max(0, Math.min(1, volume));
    if (this.backgroundMusic) {
      this.backgroundMusic.volume = this.bgMusicVolume;
    }
    if (this.backgroundMusic2) {
      this.backgroundMusic2.volume = this.bgMusicVolume;
    }
  }

  // Set sound effects volume (0-1)
  setSFXVolume(volume) {
    this.sfxVolume = Math.max(0, Math.min(1, volume));
    
    // Update volume for all preloaded sound effects
    Object.values(this.soundEffects).forEach(sound => {
      sound.volume = this.sfxVolume;
    });
  }
}

// Create a singleton instance
const audioManager = new AudioManager();

export default audioManager; 