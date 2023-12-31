class BabyChicken extends MovableObject {
  IMAGES_WALKING = [
    "./assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "./assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "./assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];
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

    setPausableInterval(this.enemieJumpAction.bind(this), timeToJump);
    setPausableInterval(this.enemieAction.bind(this), 1000/60);
    setPausableInterval(this.enemieImageAnimation.bind(this), 100);
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
  enemieJumpAction() { 
    if (!this.isAboveGround()) {
      this.jump(10);
    }
  }
  /**Intervall method, for enemie action */
  enemieAction() {
    this.movementLoop();
  }

  /** Intervall method, image animation */
  enemieImageAnimation() {
    this.playAnimation(this.IMAGES_WALKING);
    this.setFixedPosition();
  }
}
