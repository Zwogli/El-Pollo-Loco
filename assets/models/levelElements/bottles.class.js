class Bottles extends MovableObject{
width = 100;
height = 80;
offset = {
  x: 35,
  y: 10,
  width: -60,
  height: -20
}

  constructor(img, x, y){
    super().loadImage(img);
    this.x = x;
    this.y = y;
    this.setFixedPosition();
  }
}