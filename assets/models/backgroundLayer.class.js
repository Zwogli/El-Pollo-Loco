class BackgroundLayer extends MovableObject{
x = 0;
y = 0;
width = canvas.width + 1; //canvas ist als globalevariable in der game.js
height = canvas.height;

  constructor(img, x){
    super().loadImage(img);
    this.x = x;
  }
}