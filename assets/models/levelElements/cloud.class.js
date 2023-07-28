class Cloud extends MovableObject {
  y = 30;
  width = 1000;
  height = 200;
  speed = .2;

  constructor(img, x) {
    super().loadImage(img);
    this.x = x;

    let startPosition = x;
    setPausableInterval(this.animate.bind(this), 1000/60, startPosition);
  }

  /** Animate cloud movement
   * 
   * @param {number} x - [level/levels.js] create object on this position
   */
  animate(startPosition) {
      this.moveRight();
      if (this.isLevelEndsX()) {
        this.x = startPosition;
      }
  }
  
  isLevelEndsX(){
    return this.x >= 720 * 5;
  }
}

