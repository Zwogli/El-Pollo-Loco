class BabyChicken extends MovableObject{
  IMAGES_WALKING = [
    './assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
    './assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
    './assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
  ];
  x = 200;
  y = 380;
  width = 40;
  height = 40;
  postion_startX;
  position_startY = 380;
  world;

  constructor(postion_startX, timeToJump){
    super().loadImage('./assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
    this.loadImages(this.IMAGES_WALKING);
    this.energy = 20;
    this.x = postion_startX;
    this.postion_startX = postion_startX;
    this.speed = .2 + Math.random() * .3;
    this.applyGravity();

    let self = this;
    let jumpIntervall = setInterval(this.enemieJumpAction, timeToJump, self);
    let actionIntervall = setInterval(this.enemieAction, 1000 / 60, self);
    let animationIntervall = setInterval(this.enemieImageAnimation, 100, self);
  }

  enemieJumpAction(self){
 if (!self.isAboveGround()) {
      self.jump(10);
    }
  }

  /**It´s a setIntervall function for enemie action.
   * 
   * @param {object} self - self = this
   */
  enemieAction(self){
      self.movementLoop(self);
  }

  enemieImageAnimation(self){
    self.playAnimation(self.IMAGES_WALKING);
    self.setFixedPosition();
  }
}