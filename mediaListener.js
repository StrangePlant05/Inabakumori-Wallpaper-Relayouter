let switchMenu = document.getElementById('switch-menu');
let mediaProperties = document.getElementById('media-properties')
let mediaPlaylist = document.getElementById('media-playlist')
let mediaButtons = document.getElementById('media-buttons')
let imageDisplay = document.getElementById('media-image');
let titleDisplay = document.getElementById('media-title');
let artistDisplay = document.getElementById('media-artist');
let duration = document.getElementById('song-duration');
let elapsedTime = document.getElementById('time-elapsed');
let slider = document.getElementById('media-slider');
let playButton = document.getElementById('media-play');
let pauseButton = document.getElementById('media-pause');
let nextButton = document.getElementById('media-next');
let previousButton = document.getElementById('media-previous');

let isPlayingOtherMedia = false;

function wallpaperMediaPlaybackListener(event) {
    isPlayingOtherMedia = event.state == window.wallpaperMediaIntegration.PLAYBACK_PLAYING;
}

switchMenu.addEventListener("click", () => {
    mediaPlaylist.classList.toggle('hide-properties')
    mediaProperties.classList.toggle('hide-properties')
});

function convertSecondsToMinute(totalSeconds) {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    let minuteString = (minutes < 10 ? '0' : '') + minutes;
    let secondString = (seconds < 10 ? '0' : '') + seconds;

    let resultString = minuteString + ':' + secondString;
    return resultString;
}