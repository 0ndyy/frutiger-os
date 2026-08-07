document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('os-audio-player');
    const playBtn = document.getElementById('btn-play');
    const pauseBtn = document.getElementById('btn-pause');
    const stopBtn = document.getElementById('btn-stop');

    // Make sure elements exist before assigning listeners
    if(audioPlayer && playBtn && pauseBtn && stopBtn) {
        
        playBtn.addEventListener('click', () => {
            audioPlayer.play();
        });

        pauseBtn.addEventListener('click', () => {
            audioPlayer.pause();
        });

        stopBtn.addEventListener('click', () => {
            audioPlayer.pause();
            audioPlayer.currentTime = 0; // Reset to beginning
        });
    }
});

// Optional: Function to swap skins on the fly
function changeMusicSkin(skinClassName) {
    const skinContainer = document.getElementById('player-skin-container');
    // Remove existing skin classes (assuming they all start with 'skin-')
    skinContainer.className = skinContainer.className.replace(/\bskin-\S+/g, '');
    // Add the new one
    skinContainer.classList.add(skinClassName);
}