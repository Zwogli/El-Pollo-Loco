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

constructor(x, y){
  super().loadImage("./assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png");
  this.x = x;
  this.y = y;
  // this.loadImages(this.IMAGES_ROTATE[0]);
  // this.loadImages(this.IMAGES_SPLASH);
  this.throw();
}

throw(){
  this.speedY = 20;
  this.applyGravity();
  setInterval(() => {
    this.x += 8;
  }, 25);
}

}