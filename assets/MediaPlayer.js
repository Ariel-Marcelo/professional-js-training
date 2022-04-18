function MediaPlayer(config) {
  this.media = config.el;
  this.plugins = config.plugins || [];

  this._initPlugins();
}
MediaPlayer.prototype._initPlugins = function() {
  this.plugins.forEach(plugin => {
    plugin.run(this);
  });
}
MediaPlayer.prototype.mute = function() {
  this.media.muted = true;
}
MediaPlayer.prototype.unmute = function() {
  this.media.muted = false;
}
MediaPlayer.prototype.play = function() {
  console.log ("th");
  this.media.play();
};

MediaPlayer.prototype.pause = function() {
  this.media.pause();
};

// si el video esta pausado entonces lo reproduce, si esta reproduciendo lo pausa
MediaPlayer.prototype.togglePlay = function() {
  console.log (this.media);
  if (this.media.paused) {
    this.play();
  } else {
    this.pause();
  }
};
// si el video esta sin volumen entonces pone volumen
MediaPlayer.prototype.toggleMute = function() {
  if (this.media.muted) {
    this.unmute();
  } else {
    this.mute();
  }
}

export default MediaPlayer;