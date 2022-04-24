import MediaPlayer from './MediaPlayer.js';
import AutoPlay from './plugins/AutoPlay.js';
import AutoPause from './plugins/AutoPause.js';

const video = document.querySelector('video');
const player = new MediaPlayer({ el: video, plugins: [new AutoPlay(), new AutoPause()] });

const button_play = document.getElementById('button-play');
button_play.onclick = () => player.togglePlay();

const button_mute = document.getElementById('button-mute');
button_mute.onclick = () => player.toggleMute();

// comprobemos si tenemos en el navegador serviceWorkers
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(error => { // realizamos el registro de un archivo y si hay error lo capturamos
        console.log(error.message);
    });
}else {
    console.log ("I don't have service workers");
}