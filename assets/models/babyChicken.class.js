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

  constructor(){
    super().loadImage('./assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
    this.x = this.x + Math.random() * 500;
    this.loadImages(this.IMAGES_WALKING);
    this.animate();
  }

  animate(){
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