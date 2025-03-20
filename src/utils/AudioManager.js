// Audio Manager - Handles sound effects and background music
class AudioManager {
  constructor() {
    this.currentMusic = null;
    this.mainMusic = null;
    this.earthMusic = null;
    this.spaceMusic = null;
    this.soundEffects = {};
    this.isMuted = false;
    this.bgMusicVolume = 0.4; // Default background music volume
    this.sfxVolume = 0.6;     // Default sound effects volume
    this.isInitialized = false;
  }

  // Initialize audio manager and preload sounds
  init() {
    if (this.isInitialized) return;

    // Initialize all music tracks
    this.mainMusic = new Audio(`${import.meta.env.BASE_URL}sounds/main.mp3`);
    this.earthMusic = new Audio(`${import.meta.env.BASE_URL}sounds/earth.mp3`);
    this.spaceMusic = new Audio(`${import.meta.env.BASE_URL}sounds/space.mp3`);
    
    // Set up properties for all tracks
    [this.mainMusic, this.earthMusic, this.spaceMusic].forEach(track => {
      if (track) {
        track.volume = this.bgMusicVolume;
        track.loop = true; // Enable looping for all tracks
      }
    });

    // Preload sound effects
    this.preloadSoundEffect('select', `${import.meta.env.BASE_URL}sounds/select.mp3`);
    this.preloadSoundEffect('correct', `${import.meta.env.BASE_URL}sounds/correct.mp3`);
    this.preloadSoundEffect('wrong', `${import.meta.env.BASE_URL}sounds/wrong.mp3`);
    this.preloadSoundEffect('blip', `${import.meta.env.BASE_URL}sounds/blip.mp3`);
    this.preloadSoundEffect('complete', `${import.meta.env.BASE_URL}sounds/complete.mp3`);
    
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

  // New method to handle music transitions
  async transitionMusic(newTrack) {
    if (this.isMuted) return;
    
    // Ensure initialization
    if (!this.isInitialized) {
      this.init();
    }

    // If it's the same track, do nothing
    if (this.currentMusic === newTrack) return;

    // Fade out current music if playing
    if (this.currentMusic && !this.currentMusic.paused) {
      await this.fadeOut(this.currentMusic);
      this.currentMusic.pause();
      this.currentMusic.currentTime = 0;
    }

    // Set and play new track
    this.currentMusic = newTrack;
    if (this.currentMusic) {
      this.currentMusic.currentTime = 0;
      await this.fadeIn(this.currentMusic);
    }
  }

  // Fade out helper
  async fadeOut(audio, duration = 1000) {
    const steps = 20;
    const volumeStep = audio.volume / steps;
    const stepDuration = duration / steps;

    return new Promise(resolve => {
      const fadeInterval = setInterval(() => {
        if (audio.volume > volumeStep) {
          audio.volume -= volumeStep;
        } else {
          audio.volume = 0;
          clearInterval(fadeInterval);
          resolve();
        }
      }, stepDuration);
    });
  }

  // Fade in helper
  async fadeIn(audio, duration = 1000) {
    audio.volume = 0;
    const playPromise = audio.play();
    if (playPromise) {
      await playPromise.catch(error => {
        console.log('Audio playback prevented by browser: ', error);
      });
    }

    const steps = 20;
    const targetVolume = this.bgMusicVolume;
    const volumeStep = targetVolume / steps;
    const stepDuration = duration / steps;

    return new Promise(resolve => {
      const fadeInterval = setInterval(() => {
        if (audio.volume < targetVolume - volumeStep) {
          audio.volume += volumeStep;
        } else {
          audio.volume = targetVolume;
          clearInterval(fadeInterval);
          resolve();
        }
      }, stepDuration);
    });
  }

  // Play main menu music
  playMainMusic() {
    this.transitionMusic(this.mainMusic);
  }

  // Play category-specific music
  playCategoryMusic(category) {
    const track = category === 'earth-science' ? this.earthMusic : this.spaceMusic;
    this.transitionMusic(track);
  }

  // Return to main music (for quiz exit/completion)
  returnToMainMusic() {
    this.transitionMusic(this.mainMusic);
  }

  // Stop all music
  stopAllMusic() {
    [this.mainMusic, this.earthMusic, this.spaceMusic].forEach(track => {
      if (track) {
        track.pause();
        track.currentTime = 0;
      }
    });
    this.currentMusic = null;
  }

  // Mute all audio
  mute() {
    this.isMuted = true;
    if (this.currentMusic) {
      this.currentMusic.pause();
    }
  }

  // Unmute all audio
  unmute() {
    this.isMuted = false;
    if (this.currentMusic) {
      this.currentMusic.play().catch(error => {
        console.log('Audio playback prevented by browser: ', error);
      });
    }
  }

  // Set background music volume (0-1)
  setBackgroundVolume(volume) {
    this.bgMusicVolume = Math.max(0, Math.min(1, volume));
    [this.mainMusic, this.earthMusic, this.spaceMusic].forEach(track => {
      if (track) {
        track.volume = this.bgMusicVolume;
    }
    });
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