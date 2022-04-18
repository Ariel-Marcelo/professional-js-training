import MediaPlayer from './MediaPlayer.js';
import AutoPlay from './plugins/AutoPlay.js';

const video = document.querySelector('video');
const player = new MediaPlayer({ el: video, plugins: [new AutoPlay()] });

const button_play = document.getElementById('button-play');
button_play.onclick = () => player.togglePlay();

const button_mute = document.getElementById('button-mute');
button_mute.onclick = () => player.toggleMute();