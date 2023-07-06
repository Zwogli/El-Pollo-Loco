class Bottles extends MovableObject{
x = 100;
y = 100;
width = 100;
height = 80;
offset_x = 35;
offset_y = 10;
offset_width = -60;
offset_height = -20;

  constructor(img, x, y){
    super().loadImage(img);
    this.x = x;
    this.y = y;
  }
}