class Cloud extends MovableObject {
  x = 0;
  y = 30;
  width = 1000;
  height = 200;
  speed = .15;

  constructor(img, x) {
    super().loadImage(img);
    this.x = x;
    this.animate(x);
  }

  animate(x) {
    let startPosition = x;
    setInterval(() => {
      this.moveRight();
      if (this.isLevelEndsX()) {
        this.x = startPosition;
      }
    }, 1000/60);
  }

  isLevelEndsX(){
    return this.x >= canvas.width * 5;
  }
}

