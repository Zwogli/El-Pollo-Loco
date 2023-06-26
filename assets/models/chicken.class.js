class Chicken extends MovableObject{
  x = 200;
  y = 345;
  width = 80;
  height = 80;

  constructor(){
    super().loadImage('./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    this.x = this.x + Math.random() * 500;
  }
}