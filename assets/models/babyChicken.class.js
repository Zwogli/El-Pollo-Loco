class BabyChicken extends MovableObject{
  IMAGES_WALKING = [
    './assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
    './assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
    './assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
  ];
  currentImg = 0;
  x = 200;
  y = 380;
  width = 40;
  height = 40;
  startPosition_x;

  constructor(){
    super().loadImage('./assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
    this.x = this.x + Math.random() * 500;
    const startPosition = this.x;
    this.startPosition_x = startPosition;
    this.speed = .2 + Math.random() * .3;
    this.loadImages(this.IMAGES_WALKING);
    this.animate();
  }

  animate(){
    this. moveLeft();
    
    setInterval(() => {
      let i = this.currentImg % this.IMAGES_WALKING.length; // % = modulo
      let path = this.IMAGES_WALKING[i];
      this.img = this.imgCache[path];
      this.currentImg++;
      if(this.currentImg > 5){
        this.currentImg = 0;
      }
    }, 100);
  }
}