let switchMenu = document.getElementById('switch-menu');
let mediaProperties = document.getElementById('media-properties')
let mediaPlaylist = document.getElementById('media-playlist')
let mediaPlaylistList = document.getElementById('media-playlist-list')
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
let backPage = document.getElementById('media-left');
let forwardPage = document.getElementById('media-right');
let audioPlayer = document.getElementById('audio-player');

let isPlayingOtherMedia = false;

const jsmediatags = window.jsmediatags;

let songPaths = [
    '1. Anticyclone.mp3',
    '2. Lost Umbrella.mp3',
    '3. Pascal Beats.mp3',
    '4. COOLER GIRL.mp3',
    '5. Loop Spinner.mp3',
    '6. Tears Radar.mp3',
    '7. An image in the making.mp3',
    '8. Floating Moonlight City.mp3',
    '9. The stars get dark.mp3',
    '10. Billow of Fireworks.mp3',
    '11. Copy and Pastime.mp3',
    '12. SAKASAMA Girl Feeling.mp3',
    '13. NON-USE.mp3',
    '14. Secret Music.mp3',
]

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const gainNode = audioContext.createGain();
let source = audioContext.createBufferSource();

let songsDivs = [];

let songInterval;
let songCurrentDuration = 0;

let playlistPage = 0;

switchMenu.addEventListener("click", () => {
    toggleMenu();
});

backPage.addEventListener("click", () => {
    playlistPage--;
    if (playlistPage < 0) playlistPage = 0;
    switchPage();
})

forwardPage.addEventListener("click", () => {
    playlistPage++;
    if (playlistPage > songsDivs.length / 5) playlistPage = Math.floor(songsDivs.length / 5);
    console.log(playlistPage)
    switchPage();
})

function switchPage() {
    mediaPlaylistList.innerHTML = '';
    let startIndex = playlistPage * 5
    console.log(startIndex + " " + (startIndex + 5))
    for (let i = startIndex; i < startIndex + 5; i++) {
        if (i < songPaths.length) {
            mediaPlaylistList.appendChild(songsDivs[i])
        }
    }
}

function wallpaperMediaPlaybackListener(event) {
    isPlayingOtherMedia = event.state == window.wallpaperMediaIntegration.PLAYBACK_PLAYING;
}

function toggleMenu() {
    mediaPlaylist.classList.toggle('hide-properties')
    mediaProperties.classList.toggle('hide-properties')
}

function convertSecondsToMinute(totalSeconds) {
    let secondsRound = Math.round(totalSeconds);
    let minutes = Math.floor(secondsRound / 60);
    let seconds = secondsRound % 60;

    let minuteString = (minutes < 10 ? '0' : '') + minutes;
    let secondString = (seconds < 10 ? '0' : '') + seconds;

    let resultString = minuteString + ':' + secondString;
    return resultString;
}

document.addEventListener("DOMContentLoaded", ()=> {
    mediaPlaylistList.innerHTML = '';
    songPaths.forEach((songName, index) => {
        let song = document.createElement('div');
        song.setAttribute("data-song-path", songName);
        song.innerHTML = songName.slice(0, songName.length-4);
        song.addEventListener("click", (event) => {
            let songPath = event.target.getAttribute("data-song-path");
            loadAudio("assets/" + songPath)
                .then(songProperties => {
                    try {
                        source.stop();
                    } catch {}

                    songCurrentDuration = 0;
                    clearInterval(songInterval);
                    elapsedTime.innerHTML = "0:00"
                    slider.value = 0;

                    source = audioContext.createBufferSource();
                    source.buffer = songProperties.buffer;
                    source.connect(gainNode);

                    source.start();

                    songInterval = setInterval(() => {
                        songCurrentDuration++;
                        elapsedTime.innerHTML = convertSecondsToMinute(songCurrentDuration);
                        slider.value = Math.floor((songCurrentDuration / songProperties.buffer.duration) * 100)
                        if (songCurrentDuration > songProperties.buffer.duration) {
                            songCurrentDuration = 0;
                            clearInterval(songInterval);
                            elapsedTime.innerHTML = "0:00"
                            slider.value = 0;
                        } 
                    }, 1000);

                    const imageData = songProperties.tag.picture.data;
                    const imageFormat = songProperties.tag.picture.format;
                    let image = '';
                    let base64string = '';

                    for (let i = 0; i < imageData.length; i++) {
                        base64string+= String.fromCharCode(imageData[i]);
                    }

                    image = `data:${imageFormat};base64,${window.btoa(base64string)}`

                    updatePlayer(songProperties.tag.title, songProperties.tag.album, songProperties.tag.artist, image, convertSecondsToMinute(songProperties.buffer.duration))
                    toggleMenu();
                })
                .catch(error => {
                    console.error(error);
                })
        });
        if (index < 5) {
            mediaPlaylistList.appendChild(song);
        }

        songsDivs.push(song)
    });
});

function updatePlayer(title, album, artist, image, songDuration) {
    titleDisplay.innerHTML = title;
    artistDisplay.innerHTML = artist;
    imageDisplay.style.backgroundImage = `url(${image})`;
    duration.innerHTML = songDuration;
}

function loadAudio(audioFileName) {
    const fullPath = window.location.href.replace(/\/[^\/]*$/, '/') + audioFileName;
    return new Promise((resolve, reject) => {
        fetch(fullPath)
            .then(response => response.arrayBuffer())
            .then(data => {
            const blob = new Blob([data]);
                jsmediatags.read(blob, {
                    onSuccess: (tags) => {
                        console.log(tags)
                        audioContext.decodeAudioData(data)
                        .then(buffer => {
                            resolve({
                                buffer: buffer,
                                tag: tags.tags
                            })
                        })
                        .catch(error => {
                            console.error(error)
                        })
                        
                    },
                    onError: (error) => {
                        background.innerHTML += error.info
                        console.log(error)
                    }
                })
            } )
            .catch(error => {
                reject(error);
            });
    });
}

function playAudio(audioBuffer, tag) {
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.start();

    console.log(source.buffer.metadata)

    // You can use the tag information here if needed
    // console.log("Tag:", tag);
}

function changeVolume(volumeValue) {
    gainNode.gain.value = volumeValue;
}