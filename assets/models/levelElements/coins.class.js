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
    super();
    this.renderImages();
    this.renderVariables(x, y)
    this.setFixedPosition();
    this.animateCoin();
  }

  /** Load image, images into the imgCache - drawable-objects */
  renderImages(){
    this.loadImage(this.IMAGE);
    this.loadImages(this.IMAGES_COIN);
  }

  /** Set diffrent starting variables
   * 
   * @param {number} x  - [levels/level.js] create object on this position
   * @param {number} y  - [levels/level.js] create object on this position
   */
  renderVariables(x, y){
    this.x = x;
    this.y = y;
  }

  /** Intervall method, image animation */
  animateCoin(){
    let intervallCoin = setInterval(() => {
      this.playAnimation(this.IMAGES_COIN);
    }, 500);
    intervallIds.push(intervallCoin);
  }
}