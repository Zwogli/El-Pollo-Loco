class Coins extends MovableObject{
IMAGE = './assets/img/8_coin/coin_2.png';
width = 180;
height = 180;
offset_x = 60;
offset_y = 60;
offset_width = -120;
offset_height = -120;

  constructor(x, y){
    super().loadImage(this.IMAGE);
    this.x = x;
    this.y = y;
  }
}