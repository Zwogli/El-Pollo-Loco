class BackgroundLayer extends MovableObject{
y = 0;
width = canvas.width + 1; //canvas ist als globalevariable in der game.js
height = canvas.height;

  constructor(img, x, maxSpeed){
    super().loadImage(img);
    this.x = x;
    this.speed = maxSpeed;
  }
}