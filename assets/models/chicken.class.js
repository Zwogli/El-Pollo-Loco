class Chicken extends MovableObject{
  IMAGES_WALKING = [
    './assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    './assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    './assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
  ];
  currentImg = 0;
  x = 200;
  y = 345;
  width = 80;
  height = 80;

  constructor(){
    super().loadImage('./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    this.x = this.x + Math.random() * 500;
    this.speed = .1 + Math.random() * .2;
    this.loadImages(this.IMAGES_WALKING);
    this.animate();
  }

  animate(){
    this.moveLeft();

    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 250);
  }
}