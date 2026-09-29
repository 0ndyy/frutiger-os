// --- PLAYLIST DATA ---
var mpPlaylist = [
  { title: "California Gurls", artist: "Katy Perry (feat. Snoop Dogg)", length: "04:59", src: "../../audio/music/CaliforniaGurls.mp3" },
  { title: "CANYON.MID", artist: "George Stone", length: "2:01", src: "../../audio/music/canyon.mid.mp3" },
  { title: "Feel This Moment", artist: "Pitbull (feat. Christina Aguilera)", length: "03:50", src: "../../audio/music/FeelThisMoment.mp3" },
  { title: "GTA San Andreas Theme", artist: "Michael Hunte", length: "02:23", src: "../../audio/music/GTA_SanAndreas.mp3" },
  { title: "PASPORT.MID", artist: "Passport Designs", length: "02:03", src: "../../audio/music/pasport.mid.mp3" },
  { title: "Titanium", artist: "David Guetta (feat. Sia)", length: "03:57", src: "../../audio/music/Titanium.mp3" },
  { title: "title.wma", artist: "Stan LePard", length: "05:24", src: "../../audio/music/title.wma.mp3" },
  { title: "Zelda Overworld", artist: "Koji Kondo", length: "01:19", src: "../../audio/music/ZeldaOverworld.mp3" }
];

var mpSkins = [
  { name: "9SeriesDefault", width: "346px", height:"349px", holderWidth: "200px", holderHeight:"30px", holderTop: "0", holderLeft:"100px", source:"res/mp_skins/9SeriesDefault/index.html"},
  { name: "Pulsar", width: "347px", height:"319px", holderWidth: "150px", holderHeight:"80px", holderTop: "0", holderLeft:"0", source:"res/mp_skins/Pulsar/index.html"}
];

var mpCurrentIndex = 0;
var mpAudio = new Audio();
mpAudio.volume = 0.5;

document.addEventListener('DOMContentLoaded', () => {
  populatePlaylist();
  loadTrack(mpCurrentIndex);
  
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
  
  mpPlaylist.forEach((track, index) => {
    const trackItem = document.createElement('div');
    trackItem.className = 'mp_9SeriesDefault_track-item'; 
    
    if (index === mpCurrentIndex) {
      trackItem.style.backgroundColor = 'rgba(0, 255, 0, 0.2)';
    }
    
    trackItem.innerHTML = `
      <span class="mp_9SeriesDefault_track-name">${(index + 1).toString().padStart(2, '0')}. ${track.title}</span>
      <span class="mp_9SeriesDefault_track-artist">${track.artist}</span>
      <span class="mp_9SeriesDefault_track-length">${track.length}</span>
    `;
    
    trackItem.onclick = () => {
      mpCurrentIndex = index;
      loadTrack(mpCurrentIndex);
      mpAudio.play();
      updateStatusText(mpPlaylist[mpCurrentIndex].title.substring(0, 21).toUpperCase());
      populatePlaylist(); 
    };
    
    screenContainer.appendChild(trackItem);
  });
}

function loadTrack(index) {
  mpAudio.src = mpPlaylist[index].src;
  mpAudio.load();
  updateStatusText("READY");
  
  const seekBar = document.querySelector('.mp-ui-seek-bar');
  const seekFill = document.querySelector('.mp-ui-seek-fill');
  if (seekBar && seekFill) {
      seekBar.value = 0;
      updateSliderFill(seekBar, seekFill, 0);
  }
}

function togglePlay() {
  if (mpAudio.paused) {
      mpAudio.play();
      updateStatusText(mpPlaylist[mpCurrentIndex].title.substring(0, 21).toUpperCase());
  } else {
      mpAudio.pause();
      updateStatusText("PAUSED");
  }
}

function stopAudio() {
  mpAudio.pause();
  mpAudio.currentTime = 0;
  updateStatusText("STOPPED");
}

function nextTrack() {
  mpCurrentIndex = (mpCurrentIndex + 1) % mpPlaylist.length;
  loadTrack(mpCurrentIndex);
  mpAudio.play();
  updateStatusText(mpPlaylist[mpCurrentIndex].title.substring(0, 21).toUpperCase());
  populatePlaylist();
}

function prevTrack() {
  mpCurrentIndex = (mpCurrentIndex - 1 + mpPlaylist.length) % mpPlaylist.length;
  loadTrack(mpCurrentIndex);
  mpAudio.play();
  updateStatusText(mpPlaylist[mpCurrentIndex].title.substring(0, 21).toUpperCase());
  populatePlaylist();
}

function toggleMute() {
  mpAudio.muted = !mpAudio.muted;
  updateStatusText(mpAudio.muted ? "MUTED" : "UNMUTED");
}

function rewindAudio() { mpAudio.currentTime = Math.max(0, mpAudio.currentTime - 5); }
function ffwdAudio() { mpAudio.currentTime = Math.min(mpAudio.duration, mpAudio.currentTime + 5); }

function seekAudio(value) {
  const seekFill = document.querySelector('.mp-ui-seek-fill');
  const seekBar = document.querySelector('.mp-ui-seek-bar');
  updateSliderFill(seekBar, seekFill);
  if (mpAudio.duration) {
    mpAudio.currentTime = (value / 100) * mpAudio.duration;
  }
}

function changeVolume(value) {
  const volFill = document.querySelector('.mp-ui-volume-fill');
  const volBar = document.querySelector('.mp-ui-volume-bar');
  updateSliderFill(volBar, volFill);
  mpAudio.volume = value / 100;
  if (mpAudio.muted && mpAudio.volume > 0) mpAudio.muted = false;
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

mpAudio.addEventListener('timeupdate', () => {
  const statusTime = document.querySelector('.mp-ui-status-time');
  if (statusTime) {
      const m = Math.floor(mpAudio.currentTime / 60);
      const s = Math.floor(mpAudio.currentTime % 60);
      statusTime.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
  
  if (mpAudio.duration) {
    const progressPercent = (mpAudio.currentTime / mpAudio.duration) * 100;
    const seekBar = document.querySelector('.mp-ui-seek-bar');
    const seekFill = document.querySelector('.mp-ui-seek-fill');
    if (seekBar && seekFill) {
        seekBar.value = progressPercent;
        updateSliderFill(seekBar, seekFill, progressPercent);
    }
  }
});

mpAudio.addEventListener('ended', nextTrack);

function mpChangeSkin(skinId){
  let _iframe = document.querySelector("#mp-update-iframe");
  let _holder = document.querySelector("#mp-update-holder");

  if(!_iframe || !_holder) return;

  _iframe.style.width = mpSkins[skinId].width;
  _iframe.style.height = mpSkins[skinId].height;
  _iframe.src = mpSkins[skinId].source;

  _holder.style.width = mpSkins[skinId].holderWidth;
  _holder.style.height = mpSkins[skinId].holderHeight;
  _holder.style.top = mpSkins[skinId].holderTop;
  _holder.style.left = mpSkins[skinId].holderLeft;
}