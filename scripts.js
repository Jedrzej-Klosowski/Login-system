// =======================
// DOM ELEMENTY
// =======================
const stickyPlayer = document.getElementById("sticky-player");
const stickyAudio = document.getElementById("sticky-audio");
const carouselContainer = document.getElementById("carousel-container");
let colorThief;
const menuButton = document.getElementById("menu-button");
const dropdownMenu = document.getElementById("dropdown-menu");
const menuIcon = document.getElementById("menu-icon");

// Initialize ColorThief when available, fallback if not
if (typeof ColorThief !== 'undefined') {
  colorThief = new ColorThief();
}

// =======================
// ZAMYKANIE ODTWARZACZA
// =======================
document.getElementById("close-player").addEventListener("click", () => {
  stickyPlayer.classList.add("hidden");
  stickyAudio.pause();

  // Po zakończeniu animacji przywróć pierwotny kolor tła
  setTimeout(() => {
    resetCarouselBackground();
  }, 500); // Czas trwania animacji
});

// =======================
// ODTWARZANIE UTWORU
// =======================
function playTrack(src, title, imgSrc) {
  const [titlePart, producerPart] = title.split(" - Produced by ");
  document.getElementById("track-title").textContent = titlePart || title;
  document.getElementById("track-producer").textContent = producerPart
    ? `Produced by: ${producerPart}`
    : "";
  stickyAudio.src = decodeURIComponent(src);
  document.getElementById("track-cover").src = imgSrc || "";
  stickyPlayer.classList.remove("hidden");
  stickyPlayer.style.visibility = "visible";
  stickyAudio.play();

  // Zmień tło karuzeli na gradientowe na podstawie okładki
  changeCarouselBackgroundFromImage(imgSrc);
}

// =======================
// OBSŁUGA PRZYCISKU PLAY
// =======================
function playSelectedTrack(button) {
  const src = button.getAttribute("data-src");
  const title = button.getAttribute("data-title");
  const img = button.getAttribute("data-img");
  playTrack(src, title, img);
}

// =======================
// MENU ROZWIJANE Z ANIMACJĄ
// =======================
menuButton.addEventListener("click", (e) => {
  e.stopPropagation();
  dropdownMenu.classList.toggle("show");
  menuIcon.classList.toggle("rotate-90");
});

document.addEventListener("click", (event) => {
  if (
    !menuButton.contains(event.target) &&
    !dropdownMenu.contains(event.target)
  ) {
    dropdownMenu.classList.remove("show");
    menuIcon.classList.remove("rotate-90");
  }
});

// =======================
// BACKGROUND GRADIENT FUNCTIONS
// =======================
function changeCarouselBackgroundFromImage(imgSrc) {
  if (!imgSrc || !colorThief) return;
  
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.onload = function() {
    try {
      const dominantColor = colorThief.getColor(img);
      const palette = colorThief.getPalette(img, 3);
      
      const rgb1 = `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`;
      const rgb2 = palette.length > 1 ? `rgb(${palette[1][0]}, ${palette[1][1]}, ${palette[1][2]})` : rgb1;
      
      const newGradient = `linear-gradient(to right, ${rgb1}, ${rgb2})`;
      carouselContainer.style.setProperty('--new-gradient', newGradient);
      carouselContainer.classList.add('gradient-transition');
    } catch (error) {
      console.warn('Could not extract colors from image:', error);
    }
  };
  img.src = imgSrc;
}

function resetCarouselBackground() {
  carouselContainer.classList.remove('gradient-transition');
  carouselContainer.style.background = 'linear-gradient(to right, #f3f4f6, #f3f4f6)';
}

// =======================
// ENHANCED STICKY PLAYER CONTROLS
// =======================
class EnhancedStickyPlayer {
  constructor() {
    this.audio = stickyAudio;
    this.player = stickyPlayer;
    this.isPlaying = false;
    this.currentTrack = null;
    
    // Initialize after a short delay to ensure DOM is ready
    setTimeout(() => {
      this.initializeControls();
      this.attachEventListeners();
    }, 100);
  }
  
  initializeControls() {
    // Hide the default audio controls
    if (this.audio) {
      this.audio.removeAttribute('controls');
      this.audio.style.display = 'none';
    }
    
    // Create custom control elements if they don't exist
    if (!document.getElementById('custom-play-btn')) {
      this.createCustomControls();
    }
    
    // Initialize elements
    this.playBtn = document.getElementById('custom-play-btn');
    this.progressBar = document.getElementById('custom-progress-bar');
    this.progressFill = document.getElementById('custom-progress-fill');
    this.currentTimeEl = document.getElementById('custom-current-time');
    this.totalTimeEl = document.getElementById('custom-total-time');
    this.volumeBtn = document.getElementById('custom-volume-btn');
    this.volumeSlider = document.getElementById('custom-volume-slider');
  }
  
  createCustomControls() {
    if (!this.player) return;
    
    const customControls = document.createElement('div');
    customControls.className = 'custom-player-controls';
    customControls.innerHTML = `
      <button id="custom-play-btn" class="custom-play-button">
        <svg class="play-icon" viewBox="0 0 24 24" width="20" height="20">
          <path fill="currentColor" d="M8 5v14l11-7z"/>
        </svg>
        <svg class="pause-icon" viewBox="0 0 24 24" width="20" height="20" style="display: none;">
          <path fill="currentColor" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
        </svg>
      </button>
      
      <div class="progress-section">
        <div class="time-display">
          <span id="custom-current-time">0:00</span>
          <div id="custom-progress-bar" class="progress-bar">
            <div id="custom-progress-fill" class="progress-fill"></div>
          </div>
          <span id="custom-total-time">0:00</span>
        </div>
      </div>
      
      <div class="volume-controls">
        <button id="custom-volume-btn" class="volume-button">
          <svg viewBox="0 0 24 24" width="18" height="18">
            <path fill="currentColor" d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
          </svg>
        </button>
        <input type="range" id="custom-volume-slider" class="volume-slider" min="0" max="100" value="70">
      </div>
    `;
    
    // Find existing track info and insert controls after it
    const trackInfo = this.player.querySelector('.track-info');
    if (trackInfo) {
      trackInfo.insertAdjacentElement('afterend', customControls);
    } else {
      // If no track info, append to player
      this.player.appendChild(customControls);
    }
    
    // Attach control listeners immediately after creation
    setTimeout(() => {
      this.attachControlListeners();
    }, 50);
  }
  
  attachEventListeners() {
    if (!this.audio) return;
    
    // Audio events
    this.audio.addEventListener('loadedmetadata', () => this.updateDuration());
    this.audio.addEventListener('timeupdate', () => this.updateProgress());
    this.audio.addEventListener('ended', () => this.handleTrackEnd());
    this.audio.addEventListener('play', () => this.handlePlayState());
    this.audio.addEventListener('pause', () => this.handlePauseState());
  }
  
  attachControlListeners() {
    this.playBtn = document.getElementById('custom-play-btn');
    this.progressBar = document.getElementById('custom-progress-bar');
    this.volumeBtn = document.getElementById('custom-volume-btn');
    this.volumeSlider = document.getElementById('custom-volume-slider');
    
    if (this.playBtn) {
      this.playBtn.addEventListener('click', () => this.togglePlayPause());
    }
    
    if (this.progressBar) {
      this.progressBar.addEventListener('click', (e) => this.seekTo(e));
    }
    
    if (this.volumeBtn) {
      this.volumeBtn.addEventListener('click', () => this.toggleMute());
    }
    
    if (this.volumeSlider) {
      this.volumeSlider.addEventListener('input', (e) => this.setVolume(e.target.value));
      // Set initial volume
      this.setVolume(this.volumeSlider.value);
    }
  }
  
  togglePlayPause() {
    if (!this.audio) return;
    
    if (this.isPlaying) {
      this.audio.pause();
    } else {
      this.audio.play().catch(err => {
        console.error('Error playing audio:', err);
      });
    }
  }
  
  handlePlayState() {
    this.isPlaying = true;
    if (this.playBtn) {
      const playIcon = this.playBtn.querySelector('.play-icon');
      const pauseIcon = this.playBtn.querySelector('.pause-icon');
      if (playIcon) playIcon.style.display = 'none';
      if (pauseIcon) pauseIcon.style.display = 'block';
    }
  }
  
  handlePauseState() {
    this.isPlaying = false;
    if (this.playBtn) {
      const playIcon = this.playBtn.querySelector('.play-icon');
      const pauseIcon = this.playBtn.querySelector('.pause-icon');
      if (playIcon) playIcon.style.display = 'block';
      if (pauseIcon) pauseIcon.style.display = 'none';
    }
  }
  
  seekTo(e) {
    if (!this.audio || !this.audio.duration) return;
    
    const rect = this.progressBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * this.audio.duration;
    this.audio.currentTime = newTime;
  }
  
  setVolume(value) {
    if (this.audio) {
      this.audio.volume = value / 100;
    }
  }
  
  toggleMute() {
    if (this.audio) {
      this.audio.muted = !this.audio.muted;
    }
  }
  
  updateProgress() {
    if (!this.audio || !this.audio.duration) return;
    
    this.progressFill = this.progressFill || document.getElementById('custom-progress-fill');
    this.currentTimeEl = this.currentTimeEl || document.getElementById('custom-current-time');
    
    if (this.progressFill && this.currentTimeEl) {
      const percent = (this.audio.currentTime / this.audio.duration) * 100;
      this.progressFill.style.width = percent + '%';
      this.currentTimeEl.textContent = this.formatTime(this.audio.currentTime);
    }
  }
  
  updateDuration() {
    this.totalTimeEl = this.totalTimeEl || document.getElementById('custom-total-time');
    if (this.totalTimeEl && this.audio) {
      this.totalTimeEl.textContent = this.formatTime(this.audio.duration || 0);
    }
  }
  
  formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
  
  handleTrackEnd() {
    this.handlePauseState();
  }
}

// Global player instance
let enhancedPlayer;

// Initialize enhanced player when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  enhancedPlayer = new EnhancedStickyPlayer();
});

// Also initialize when sticky player becomes visible
const observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
      const target = mutation.target;
      if (target.id === 'sticky-player' && !target.classList.contains('hidden')) {
        // Player became visible, ensure controls are initialized
        if (!document.getElementById('custom-play-btn')) {
          setTimeout(() => {
            if (enhancedPlayer) {
              enhancedPlayer.initializeControls();
            }
          }, 100);
        }
      }
    }
  });
});

if (stickyPlayer) {
  observer.observe(stickyPlayer, { attributes: true });
}