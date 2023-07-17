class BabyChicken extends MovableObject {
  IMAGES_WALKING = [
    "./assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "./assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "./assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];
  x = 200;
  y = 380;
  width = 40;
  height = 40;
  postion_startX;
  position_startY = 380;
  world;

  constructor(postion_startX, timeToJump) {
    super();
    this.renderImages();
    this.renderVariables(postion_startX);
    this.applyGravity();

    let self = this;
    let jumpIntervall = setInterval(this.enemieJumpAction, timeToJump, self);
    let actionIntervall = setInterval(this.enemieAction, 1000 / 60, self);
    let animationIntervall = setInterval(this.enemieImageAnimation, 100, self);
  }

  /** Load image, images into the imgCache - drawable-objects */
  renderImages(){
    this.loadImage("./assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
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
    this.speed = 0.2 + Math.random() * 0.3;
  }

  /** Intervall method, let object jump - movable-objects*/
  enemieJumpAction(self) {
    if (!self.isAboveGround()) {
      self.jump(10);
    }
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
