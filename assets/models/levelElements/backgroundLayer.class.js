class BackgroundLayer extends MovableObject{
x = 0;
y = 0;
width = canvas.width + 1; //canvas ist als globalevariable in der game.js
height = canvas.height;
speed = 0
// acceleration = 0.1;
// maxSpeed;

  constructor(img, x, maxSpeed){
    super().loadImage(img);
    this.x = x;
    this.speed = maxSpeed;
  }

  // applySwimResistance() {
  //   if(this.speed > this.maxSpeed) {
  //       this.speed -= this.acceloration;
  //   }
// }
}