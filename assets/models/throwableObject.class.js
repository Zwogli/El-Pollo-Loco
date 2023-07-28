class ThrowableObject extends MovableObject{
IMAGES_ROTATE = [
  './assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
  './assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
  './assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
  './assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
];
IMAGES_SPLASH = [
  './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
  './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
  './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
  './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
  './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
  './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
];
width = 100;
height = 80;
speedY;
speedX;
position_startY = 300;
numRotate = 0;
isHitEnemy = false;
direction;

constructor(x, y, direction){
  super();
  this.renderImages();
  this.renderVariables(x, y, direction);  

  this.speedY = 20;
  this.applyGravity();
  setPausableInterval(this.throw.bind(this), 25);
}

renderImages(){
  this.loadImage("./assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png");
  this.loadImages(this.IMAGES_ROTATE);
  this.loadImages(this.IMAGES_SPLASH);
}

renderVariables(x, y, direction){
  this.x = x;
  this.y = y;
  this.direction = direction;
}

throw(){
    if(!this.direction){
      this.x += 8;
    }else{
      this.x -= 8;
    }
    this.setFixedPosition();
    this.animateThrow();
}

animateThrow(){
  if(this.isHigherGround() && !this.isHitEnemy){
    this.loadImage(this.IMAGES_ROTATE[this.numRotate]);
      this.iterateRotate();
    }else{
      this.playAnimation(this.IMAGES_SPLASH);
    }
}

/** Render img array position */
iterateRotate(){
  if(this.numRotate >= this.IMAGES_ROTATE.length - 1){
    this.numRotate = 0;
  }else{
    this.numRotate++;
  }
}

/** Check y-position for delete */
isHigherGround(){
  return this.y < 350
}
}