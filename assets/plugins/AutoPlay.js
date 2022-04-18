function AutoPlay() {

}

AutoPlay.prototype.run = function(mediaPlayer) {
  mediaPlayer.mute();
  mediaPlayer.play();
}

export default AutoPlay;