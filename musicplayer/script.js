// Music Player App
class MusicPlayer {
  constructor() {
    // DOM elements
    this.audio = document.getElementById('audioPlayer');
    this.playBtn = document.getElementById('playBtn');
    this.prevBtn = document.getElementById('prevBtn');
    this.nextBtn = document.getElementById('nextBtn');
    this.progressBar = document.getElementById('progressBar');
    this.volumeSlider = document.getElementById('volumeSlider');
    this.trackTitle = document.getElementById('trackTitle');
    this.trackArtist = document.getElementById('trackArtist');
    this.currentTimeDisplay = document.getElementById('currentTime');
    this.durationDisplay = document.getElementById('duration');
    this.volumeDisplay = document.getElementById('volumeDisplay');
    this.playlistEl = document.getElementById('playlist');
    this.playlistContainer = document.getElementById('playlistContainer');
    this.playlistToggleBtn = document.getElementById('playlistToggleBtn');
    this.playlistModal = document.getElementById('playlistModal');
    this.closePlaylistBtn = document.getElementById('closePlaylistBtn');
  this.addTrackBtn = document.getElementById('addTrackBtn');
    this.albumArt = document.getElementById('albumArt');
    this.themeToggle = document.getElementById('theme-toggle');

    // State
    this.currentTrackIndex = 0;
    this.isPlaying = false;
    this.tracks = [
      {
        title: 'Essence',
        artist: 'Davido ft. Wizkid',
        url: 'davido1.mp3',
        color: '#FF6B6B'
      },
      {
        title: 'Fall',
        artist: 'Davido',
        url: 'davido2.mp3',
        color: '#4ECDC4'
      },
      {
        title: 'Assurance',
        artist: 'Davido',
        url: 'davido3.mp3',
        color: '#FFE66D'
      },
      {
        title: 'If',
        artist: 'Davido',
        url: 'davido4.mp3',
        color: '#95E1D3'
      },
      {
        title: 'Risky (Remix)',
        artist: 'Davido ft. Popcaan',
        url: 'davido5.mp3',
        color: '#C7CEEA'
      },
      {
        title: 'Blow My Mind',
        artist: 'Davido ft. Chris Brown',
        url: 'davido6.mp3',
        color: '#FF8C94'
      },
      {
        title: 'A Good Friend',
        artist: 'Davido ft. H.E.R.',
        url: 'davido7.mp3',
        color: '#FCBAD3'
      },
      {
        title: 'Uptown',
        artist: 'Davido',
        url: 'davido8.mp3',
        color: '#A8D8EA'
      }
    ];

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.loadTheme();
    this.renderPlaylist();
    this.loadTrack(0);
  }

  setupEventListeners() {
    this.playBtn.addEventListener('click', () => this.togglePlay());
    this.prevBtn.addEventListener('click', () => this.prevTrack());
    this.nextBtn.addEventListener('click', () => this.nextTrack());
    this.progressBar.addEventListener('input', (e) => this.seek(e.target.value));
    this.volumeSlider.addEventListener('input', (e) => this.setVolume(e.target.value));
    this.themeToggle.addEventListener('click', () => this.toggleTheme());
    this.playlistToggleBtn.addEventListener('click', () => this.togglePlaylist());
  if (this.addTrackBtn) this.addTrackBtn.addEventListener('click', () => this.promptAddTrack());
    this.closePlaylistBtn.addEventListener('click', () => this.closePlaylist());
    this.playlistModal.addEventListener('click', (e) => {
      if (e.target === this.playlistModal) this.closePlaylist();
    });

    // Audio events
    this.audio.addEventListener('timeupdate', () => this.updateProgress());
    this.audio.addEventListener('loadedmetadata', () => this.updateDuration());
    this.audio.addEventListener('ended', () => this.nextTrack());
    this.audio.addEventListener('error', () => this.handleAudioError());
  }

  loadTrack(index) {
    if (index < 0 || index >= this.tracks.length) return;
    
    this.currentTrackIndex = index;
    const track = this.tracks[index];
    
    this.audio.src = track.url;
    this.trackTitle.textContent = track.title;
    this.trackArtist.textContent = track.artist;
    
    // Update album art color
    this.albumArt.style.background = `linear-gradient(135deg, ${track.color}, #764ba2)`;
    
    // Update active playlist item
    this.updatePlaylistUI();
    
    if (this.isPlaying) {
      this.audio.play().catch(err => {
        console.warn('Play error:', err);
        this.handleAudioError();
      });
    }
  }

  togglePlay() {
    if (this.isPlaying) {
      this.audio.pause();
      this.isPlaying = false;
      this.playBtn.textContent = '▶';
    } else {
      this.audio.play().catch(err => console.warn('Play error:', err));
      this.isPlaying = true;
      this.playBtn.textContent = '⏸';
    }
  }

  nextTrack() {
    const nextIndex = (this.currentTrackIndex + 1) % this.tracks.length;
    this.loadTrack(nextIndex);
    if (this.isPlaying) {
      this.audio.play().catch(err => console.warn('Play error:', err));
    }
  }

  prevTrack() {
    const prevIndex = (this.currentTrackIndex - 1 + this.tracks.length) % this.tracks.length;
    this.loadTrack(prevIndex);
    if (this.isPlaying) {
      this.audio.play().catch(err => console.warn('Play error:', err));
    }
  }

  seek(value) {
    if (this.audio.duration) {
      this.audio.currentTime = (value / 100) * this.audio.duration;
    }
  }

  setVolume(value) {
    this.audio.volume = value / 100;
    this.volumeDisplay.textContent = value + '%';
  }

  updateProgress() {
    if (this.audio.duration) {
      const progress = (this.audio.currentTime / this.audio.duration) * 100;
      this.progressBar.value = progress;
      this.currentTimeDisplay.textContent = this.formatTime(this.audio.currentTime);
    }
  }

  updateDuration() {
    this.durationDisplay.textContent = this.formatTime(this.audio.duration);
  }

  formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return '0:00';
    
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  renderPlaylist() {
    this.playlistEl.innerHTML = this.tracks.map((track, index) => `
      <div class="playlist-item ${index === this.currentTrackIndex ? 'active' : ''}" data-index="${index}">
        <div class="playlist-item-title">${this.escapeHtml(track.title)}</div>
        <div class="playlist-item-artist">${this.escapeHtml(track.artist)}</div>
      </div>
    `).join('');

    // Add click handlers to playlist items
    this.playlistEl.querySelectorAll('.playlist-item').forEach((item, index) => {
      item.addEventListener('click', () => {
        this.loadTrack(index);
        this.togglePlay();
        this.closePlaylist();
      });
    });
  }

  // Prompt the user to add a remote audio URL (useful for YouTube Audio Library, FMA, Internet Archive links)
  promptAddTrack() {
    const url = prompt('Paste an MP3 URL (http(s)://...)');
    if (!url) return;
    const title = prompt('Track title (optional)', 'New Track') || 'New Track';
    const artist = prompt('Artist (optional)', 'Unknown') || 'Unknown';

    // Basic validation
    try {
      const u = new URL(url);
      // add to playlist
      const color = this.randomColor();
      this.tracks.push({ title, artist, url: u.toString(), color });
      this.renderPlaylist();
      alert('Track added to playlist. If playback is blocked by CORS, try a different URL or use local files.');
    } catch (e) {
      alert('Invalid URL');
    }
  }

  randomColor() {
    const colors = ['#FF6B6B','#4ECDC4','#FFE66D','#95E1D3','#C7CEEA','#FF8C94','#FCBAD3','#A8D8EA'];
    return colors[Math.floor(Math.random()*colors.length)];
  }

  updatePlaylistUI() {
    this.playlistEl.querySelectorAll('.playlist-item').forEach((item, index) => {
      item.classList.toggle('active', index === this.currentTrackIndex);
    });
  }

  toggleTheme() {
    const root = document.documentElement;
    const isDark = root.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    
    root.setAttribute('data-theme', newTheme);
    this.themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('musicplayer-theme', newTheme);
  }

  loadTheme() {
    const saved = localStorage.getItem('musicplayer-theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (prefersDark ? 'dark' : 'light');
    
    document.documentElement.setAttribute('data-theme', theme);
    this.themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  }

  handleAudioError() {
    console.error('Audio playback error');
    const errorMsg = `⚠️ Unable to load audio. 
This player requires audio files in the same directory.
Please add .mp3 files named: davido1.mp3, davido2.mp3, etc.

For demo purposes, the player UI is fully functional!`;
    alert(errorMsg);
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  togglePlaylist() {
    this.playlistModal.classList.add('active');
  }

  closePlaylist() {
    this.playlistModal.classList.remove('active');
  }
}

// Initialize player when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new MusicPlayer();
});
