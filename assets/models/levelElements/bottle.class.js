class Bottles extends MovableObject{
x = 100;
y = 100;
width = 100;
height = 80;

  constructor(img, x, y){
    super().loadImage(img);
    this.x = x;
    this.y = y;
  }
}