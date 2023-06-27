class Cloud extends MovableObject {
  x = 0;
  y = 30;
  width = 400;
  height = 200;

  constructor(img, x) {
    super().loadImage(img);
    this.x = x;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.x += .1;
    }, 1000/60);
  }
}
