class Endboss extends MovableObject{
  IMAGES_WALKING = [
    './assets/img/4_enemie_boss_chicken/1_walk/G1.png',
    './assets/img/4_enemie_boss_chicken/1_walk/G2.png',
    './assets/img/4_enemie_boss_chicken/1_walk/G3.png',
    './assets/img/4_enemie_boss_chicken/1_walk/G4.png',
  ]
  y = 120;
  width = 250;
  height = 350;

  constructor(){
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING)
    this.x = canvas.width * 3 + 200; //canvas.width * 3 + 200;
  }
}