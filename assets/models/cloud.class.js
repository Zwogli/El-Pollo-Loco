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
    this.moveRight(x);
  }

  moveRight(x){
    let startPosition = x;
    setInterval(() => {
      this.x += this.speed;
      if (this.x >= 1500) {
        this.x = startPosition;
      }
    }, 1000/60);
  }
}

