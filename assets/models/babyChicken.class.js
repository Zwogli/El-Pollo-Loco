class BabyChicken extends MovableObject{
  x = 200;
  y = 380;
  width = 40;
  height = 40;

  constructor(){
    super().loadImage('./assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
    this.x = this.x + Math.random() * 500;
  }
}