let currentlyPlayingButton = null;
let currentlyPlayingAudio = null;
let currentplay=null;
let currentpause=null;

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function changeicon(element){
    const playIcon = '/assets/playbutton.png';
    const pauseIcon = '/assets/pausebutton.png';
    const playerplayIcon = '/assets/player_icon3.png';
    const playerpauseIcon = '/assets/pausebutton2.png';
    const audioId = element.getAttribute('data-audio-id');
    const audio = document.getElementById(audioId);
    const footerPlayPause = document.getElementById('footerPlayPause');

    const songContainer = document.querySelector('.song');
    const songImage = document.querySelector('.alb');
    const songName = songContainer.querySelector('.song-name');
    const songSinger = songContainer.querySelector('.singer');


    if (currentlyPlayingButton !==null && currentlyPlayingButton !== element) {
        currentlyPlayingButton.src = playIcon;
        currentlyPlayingAudio.pause();
        currentlyPlayingAudio.currentTime = 0;
        console.log('Pausing current song');
    }

    if (element.src.includes(playIcon)) {
        element.src = pauseIcon;
        currentpause=element;
        currentlyPlayingButton = element;
        currentlyPlayingAudio = audio;
        audio.play();
        footerPlayPause.src=playerpauseIcon;


        // Update the song information
        const card = element.closest('.card');
        const cardImgSrc = card.querySelector('.card-img').src;
        const cardTitle = card.querySelector('.card-title').textContent;
        const cardSinger = card.querySelector('.card-info').textContent;

        songImage.src = cardImgSrc;
        songName.textContent = cardTitle;
        songSinger.textContent = cardSinger;

        console.log('Playing song');
    } else {
        element.src = playIcon;
        currentlyPlayingButton = null;
        currentplay=element;
        audio.pause();
        audio.currentTime = 0; // Reset audio to the beginning
        footerPlayPause.src=playerplayIcon;
        console.log('Pausing and stopping song');
    }
    const audioPlayer = document.getElementById(audioId);
    const volumeControl = document.getElementById('volumeControl');
    
    // Set initial volume based on the range input value
    audioPlayer.volume = volumeControl.value / 100;
    
    // Update volume when range input changes
    volumeControl.addEventListener('input', (event) => {
    audioPlayer.volume = event.target.value / 100;
    let span=document.querySelector(".volumeup");
    if(audioPlayer.volume==0){
        span.innerHTML="volume_off";
    }else if(audioPlayer.volume===1){
        span.innerHTML="volume_up";
    } else{
        span.innerHTML="volume_down";
    }
    });

    audio.addEventListener('timeupdate', () => {
        const progressBar = document.querySelector('.progress-bar');
        const currTime = document.querySelector('.curr-time');
        const totTime = document.querySelector('.tot-time');

        const duration = audio.duration;
        const currentTime = audio.currentTime;

        progressBar.max = duration;
        progressBar.value = currentTime;

        currTime.textContent = formatTime(currentTime);
        totTime.textContent = formatTime(duration);
    });

    const progressBar = document.querySelector('.progress-bar');
    progressBar.addEventListener('input', () => {
        audio.currentTime = progressBar.value;
    });
}

function toggleFooterPlayPause() {
    const playIcon = '/assets/player_icon3.png';
    const pauseIcon = '/assets/pausebutton2.png';
    if (currentlyPlayingAudio) {
        const footerPlayPause = document.getElementById('footerPlayPause');
        if (currentlyPlayingAudio.paused) {
            currentlyPlayingAudio.play();
            footerPlayPause.src = pauseIcon;
            if (currentlyPlayingButton) {
                currentlyPlayingButton.src = '/assets/pausebutton.png';
            }
        } else {
            currentlyPlayingAudio.pause();
            footerPlayPause.src = playIcon;
            if (currentlyPlayingButton) {
                currentlyPlayingButton.src = '/assets/playbutton.png';
            }
        }
    }
}




let song;
document.addEventListener('DOMContentLoaded', () => {
    const playButtons = document.querySelectorAll('.playbutton .pausebutton ');
    playButtons.forEach(button => {
        button.addEventListener('click', () => {
            changeicon(button);
        });
    });
    
    const footerPlayPause = document.getElementById('footerPlayPause');
    footerPlayPause.addEventListener('click',toggleFooterPlayPause);


    const liked = document.querySelector('.liked');
    liked.addEventListener('click', () => {
        if (liked.src.includes('/assets/like2.png')) {
            liked.src = '/assets/like1.png';
        } else {
            liked.src = '/assets/like2.png';
        }
    });
    
});

let url = "https://open.spotify.com/search/";

let input = document.querySelector('.search');
input.addEventListener("keypress", (event) => {
    if (event.key === 'Enter') {
        let song = input.value;
            getresult(song);
            input.value="";
        }
    });

function playPreviousAudio() {
        if (currentlyPlayingAudio) {
            const currentId = currentlyPlayingAudio.id;
            const currentNumber = parseInt(currentId.replace('audio', ''), 10);
            const previousNumber = currentNumber - 1;
            const previousAudioId = `audio${previousNumber}`;
            const previousAudioElement = document.querySelector(`[data-audio-id="${previousAudioId}"]`);
            
            if (previousAudioElement) {
                changeicon(previousAudioElement);
            } else {
                console.log('No previous audio available');
            }
        } else {
            console.log('No audio currently playing');
        }
}
    
function playNextAudio() {
        if (currentlyPlayingAudio) {
            const currentId = currentlyPlayingAudio.id;
            const currentNumber = parseInt(currentId.replace('audio', ''), 10);
            const nextNumber = currentNumber + 1;
            const nextAudioId = `audio${nextNumber}`;
            const nextAudioElement = document.querySelector(`[data-audio-id="${nextAudioId}"]`);
            
            if (nextAudioElement) {
                changeicon(nextAudioElement);
            } else {
                console.log('No next audio available');
            }
        } else {
            console.log('No audio currently playing');
        }
}

const backward = document.querySelector('.backward');
backward.addEventListener('click', playPreviousAudio);
const forward = document.querySelector('.forward');
forward.addEventListener('click', playNextAudio);

function getresult(song) {
    try {
        window.open(url + encodeURIComponent(song), '_blank');
    } catch (e) {
        console.log("error", e);
    }
}

// document.addEventListener('DOMContentLoaded', () => {
//     const playButtons = document.querySelectorAll('.playicon .pauseicon');
//     playButtons.forEach(button => {
//         button.addEventListener('click', () => {
//             changeicon(button);
//         });
//     });
// });







