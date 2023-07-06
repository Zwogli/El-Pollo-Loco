class Coins extends MovableObject{
IMAGE = './assets/img/8_coin/coin_2.png';
width = 180;
height = 180;

  constructor(x, y){
    super().loadImage(this.IMAGE);
    this.x = x;
    this.y = y;
  }
}