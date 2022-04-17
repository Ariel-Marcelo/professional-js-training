function MediaPlayer(config) {
  this.media = config.el;
}

MediaPlayer.prototype.play = function() {
  console.log ("th");
  this.media.play();
};

MediaPlayer.prototype.pause = function() {
  this.media.pause();
};

MediaPlayer.prototype.togglePlay = function() {
  console.log (this.media);
  if (this.media.paused) {
    this.play();
  } else {
    this.pause();
  }
};

export default MediaPlayer;