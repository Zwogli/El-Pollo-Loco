class Chicken extends MovableObject {
  IMAGES_WALKING = [
    "./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "./assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "./assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  x = 200;
  y = 345;
  width = 80;
  height = 80;
  postion_startX;

  constructor(postion_startX) {
    super().loadImage(
      "./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png"
    );
    this.x = postion_startX;
    this.postion_startX = postion_startX;
    this.speed = 0.1 + Math.random() * 0.2;
    this.loadImages(this.IMAGES_WALKING);
    let self = this;
    let actionIntervall = setInterval(this.enemieAction, 1000 / 60, self);
    let animationIntervall = setInterval(this.enemieImageAnimation, 100, self);
  }

  enemieAction(self) {
    self.movementLoop(self);
  }

  enemieImageAnimation(self) {
    self.playAnimation(self.IMAGES_WALKING);
    self.setFixedPosition();
  }
}
