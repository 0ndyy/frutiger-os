// --- PLAYLIST DATA ---
const playlist = [
  { title: "California Gurls", artist: "Katy Perry (feat. Snoop Dogg)", length: "04:59", src: "/res/audio/music/CaliforniaGurls.mp3" },
  { title: "CANYON.MID", artist: "George Stone", length: "2:01", src: "/res/audio/music/canyon.mid.mp3" },
  { title: "Feel This Moment", artist: "Pitbull (feat. Christina Aguilera)", length: "03:50", src: "/res/audio/music/FeelThisMoment.mp3" },
  { title: "GTA San Andreas Theme", artist: "Michael Hunte", length: "02:23", src: "/res/audio/music/GTA_SanAndreas.mp3" },
  { title: "PASPORT.MID", artist: "Passport Designs", length: "02:03", src: "/res/audio/music/pasport.mid.mp3" },
  { title: "Titanium", artist: "David Guetta (feat. Sia)", length: "03:57", src: "/res/audio/music/Titanium.mp3" },
  { title: "title.wma", artist: "Stan LePard", length: "05:24", src: "/res/audio/music/title.wma.mp3" },
  { title: "Zelda Overworld", artist: "Koji Kondo", length: "01:19", src: "/res/audio/music/ZeldaOverworld.mp3" }
];



let currentIndex = 0;
const audio = new Audio();
audio.volume = 0.5;



document.addEventListener('DOMContentLoaded', () => {
  populatePlaylist();
  loadTrack(currentIndex);
  
  const volBar = document.querySelector('.mp-ui-volume-bar');
  const volFill = document.querySelector('.mp-ui-volume-fill');
  if (volBar && volFill) {
      volBar.value = 50;
      updateSliderFill(volBar, volFill);
  }
});





function populatePlaylist() {
  const screenContainer = document.querySelector('.mp-ui-screen');
  if (!screenContainer) return;

  screenContainer.innerHTML = ""; 
  
  playlist.forEach((track, index) => {
    const trackItem = document.createElement('div');
    trackItem.className = 'mp_9SeriesDefault_track-item'; 
    
    if (index === currentIndex) {
      trackItem.style.backgroundColor = 'rgba(0, 255, 0, 0.2)';
    }
    
    trackItem.innerHTML = `
      <span class="mp_9SeriesDefault_track-name">${(index + 1).toString().padStart(2, '0')}. ${track.title}</span>
      <span class="mp_9SeriesDefault_track-artist">${track.artist}</span>
      <span class="mp_9SeriesDefault_track-length">${track.length}</span>
    `;
    
    trackItem.onclick = () => {
      currentIndex = index;
      loadTrack(currentIndex);
      audio.play();
      updateStatusText(playlist[currentIndex].title.substring(0, 21).toUpperCase());
      populatePlaylist(); 
    };
    
    screenContainer.appendChild(trackItem);
  });
}

function loadTrack(index) {
  audio.src = playlist[index].src;
  audio.load();
  updateStatusText("READY");
  
  const seekBar = document.querySelector('.mp-ui-seek-bar');
  const seekFill = document.querySelector('.mp-ui-seek-fill');
  if (seekBar && seekFill) {
      seekBar.value = 0;
      updateSliderFill(seekBar, seekFill, 0);
  }
}





function togglePlay() {
  if (audio.paused) {
      audio.play();
      updateStatusText(playlist[currentIndex].title.substring(0, 21).toUpperCase());
  } else {
      audio.pause();
      updateStatusText("PAUSED");
  }
}

function stopAudio() {
  audio.pause();
  audio.currentTime = 0;
  updateStatusText("STOPPED");
}

function nextTrack() {
  currentIndex = (currentIndex + 1) % playlist.length;
  loadTrack(currentIndex);
  audio.play();
  populatePlaylist();
}

function prevTrack() {
  currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
  loadTrack(currentIndex);
  audio.play();
  populatePlaylist();
}

function toggleMute() {
  audio.muted = !audio.muted;
  updateStatusText(audio.muted ? "MUTED" : "UNMUTED");
}

function rewindAudio() { audio.currentTime = Math.max(0, audio.currentTime - 5); }
function ffwdAudio() { audio.currentTime = Math.min(audio.duration, audio.currentTime + 5); }

function seekAudio(value) {
  const seekFill = document.querySelector('.mp-ui-seek-fill');
  const seekBar = document.querySelector('.mp-ui-seek-bar');
  updateSliderFill(seekBar, seekFill);
  if (audio.duration) {
    audio.currentTime = (value / 100) * audio.duration;
  }
}

function changeVolume(value) {
  const volFill = document.querySelector('.mp-ui-volume-fill');
  const volBar = document.querySelector('.mp-ui-volume-bar');
  updateSliderFill(volBar, volFill);
  audio.volume = value / 100;
  if (audio.muted && audio.volume > 0) audio.muted = false;
}



function updateStatusText(text) {
  const statusEl = document.querySelector('.mp-ui-status-text');
  if (statusEl) statusEl.textContent = text;
}

function updateSliderFill(slider, fillElem, overridePercent = null) {
  if (!slider || !fillElem) return;
  const min = slider.min || 0;
  const max = slider.max || 100;
  const percent = overridePercent !== null ? overridePercent : ((slider.value - min) / (max - min)) * 100;
  fillElem.style.width = `${percent}%`;
}



audio.addEventListener('timeupdate', () => {
  const statusTime = document.querySelector('.mp-ui-status-time');
  if (statusTime) {
      const m = Math.floor(audio.currentTime / 60);
      const s = Math.floor(audio.currentTime % 60);
      statusTime.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
  
  if (audio.duration) {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    const seekBar = document.querySelector('.mp-ui-seek-bar');
    const seekFill = document.querySelector('.mp-ui-seek-fill');
    if (seekBar && seekFill) {
        seekBar.value = progressPercent;
        updateSliderFill(seekBar, seekFill, progressPercent);
    }
  }
});

audio.addEventListener('ended', nextTrack);