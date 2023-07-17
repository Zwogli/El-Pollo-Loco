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
  world;

  constructor(postion_startX) {
    super();
    this.renderImages();
    this.renderVariables(postion_startX);
    let self = this;
    let actionIntervall = setInterval(this.enemieAction, 1000 / 60, self);
    let animationIntervall = setInterval(this.enemieImageAnimation, 100, self);
  }

  /** Load image, images into the imgCache - drawable-objects */
  renderImages(){
    this.loadImage("./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
  }

  /** Set diffrent starting variables
   * 
   * @param {number} postion_startX - [levels/level.js] create object on this position
   */
  renderVariables(postion_startX){
    this.energy = 20;
    this.x = postion_startX;
    this.postion_startX = postion_startX;
    this.speed = 0.1 + Math.random() * 0.2;
  }

  /**Intervall method, for enemie action */
  enemieAction(self) {
    self.movementLoop(self);
  }

  /** Intervall method, image animation */
  enemieImageAnimation(self) {
    self.playAnimation(self.IMAGES_WALKING);
    self.setFixedPosition();
  }
}
