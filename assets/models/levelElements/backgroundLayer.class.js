class BackgroundLayer extends MovableObject{
y = 0;
width = 720 + 1; //canvas ist als globalevariable in der game.js
height = 480;

  constructor(img, x, maxSpeed){
    super().loadImage(img);
    this.x = x;
    this.speed = maxSpeed;
  }
}