class AutoPause {
  constructor() {
    this.threshold = 0.25;
    this.myhandlerIntersection = this.handlerIntersection.bind(this); // esto es importante porque this es el objeto
    // que llama a la función y más adelante myhandlerIntersection es llamado por el intersectionObserver así que
    // necesito asegurarme que mi objeto this es AutoPause para poder acceder a this.player y this.pause
  }
  run(myPlayer) {
    this.player = myPlayer;
    const observer = new IntersectionObserver(this.myhandlerIntersection, {threshold: this.threshold});
    observer.observe(this.player.media);

    document.addEventListener('visibilitychange', this.handleVisibilityChange);
  }
  handlerIntersection(entries) {
    const entry = entries[0]; // este array entries contiene información de la intersección del elemento segun las reglas predefinidas
    // se devuelve un array porque puede estar observando a varios elementos que pueden intersecar al mismo tiempo así 
    // que en un arreglo devuelve información de cada uno , en este caso solo tenermos un observado 
    const isVisible = entry.intersectionRatio >= this.threshold;
    if (isVisible) {
      this.player.play();
    } else {
      this.player.pause();
    }
  }

  handleVisibilityChange() {
    const isVisible = document.visibilityState === 'visible';
    if (isVisible) {
      this.player.play();
    } else {
      this.player.pause();
    }
  }
}

export default AutoPause;