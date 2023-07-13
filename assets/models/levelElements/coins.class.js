class Coins extends MovableObject{
IMAGES_COIN = [
  './assets/img/8_coin/coin_1.png',
  './assets/img/8_coin/coin_2.png',
]
IMAGE = './assets/img/8_coin/coin_2.png';
width = 180;
height = 180;
offset = {
  x: 60,
  y: 60,
  width: -120,
  height: -120
}

  constructor(x, y){
    super().loadImage(this.IMAGE);
    this.loadImages(this.IMAGES_COIN);
    this.x = x;
    this.y = y;
    this.setFixedPosition();
    this.animateCoin();
  }

  animateCoin(){
    setInterval(() => {
      this.playAnimation(this.IMAGES_COIN);
    }, 500);
  }
}