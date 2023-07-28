class Character extends MovableObject {
  assets;
  x = 100;
  y = 150;
  width = 150;
  height = 280;
  offset = {
    x: 25,
    y: 110,
    width: -50,
    height: -120,
  };
  world;
  speed = 10; //3
  isJumping = false;
  position_startY = 150;

  constructor(assets) {
    super();
    this.assets = assets;
    this.renderImages();
    this.applyGravity();

    setPausableInterval(this.keyboardInputs.bind(this), 1000 / 60);
    setPausableInterval(this.imageAnimation.bind(this), 100);
    // setPausableInterval(this.hurtAnimation.bind(this), 50*3);
  }

  renderImages() {
    this.loadImage("./assets/img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.assets.IMAGES_DEAD);
    this.loadImages(this.assets.IMAGES_IDLE_LONG);
    this.loadImages(this.assets.IMAGES_JUMPING);
    this.loadImages(this.assets.IMAGES_HURT);
    this.loadImages(this.assets.IMAGES_WALKING);
  }

  pauseAudio(){
    characterWalkingSound.pause();
    characterJumpSound.pause();
    characterHurtSound.pause();
    characterDeadSound.pause();
  }

  /** Intervall method, image animation */
  imageAnimation() {
    this.pauseAudio();
    if (this.isDead()) {
      characterDeadSound.play();
      this.playSingleAnimation(this.assets.IMAGES_DEAD);
      this.idle_countdown = 0;
    } 
    // else if (this.isHurt()) {
    //   // this.playAnimation(this.assets.IMAGES_HURT);
    //   this.playSingleAnimation(this.assets.IMAGES_HURT);
    //   this.idle_countdown = 0;
    // } 
    else if (this.isAboveGround() && this.speedY >= 0) {
      characterJumpSound.play();
      this.playAnimation(this.assets.IMAGES_JUMPING);
      this.idle_countdown = 0;
      if (this.isAboveGround() && this.speedY <= 0) {
        this.playAnimation(this.assets.IMAGES_IDLE);
      }
    } else if (!this.isAboveGround() && this.isJumping) {
      this.loadImage("./assets/img/2_character_pepe/2_walk/W-21.png");
      this.isJumping = false;
    } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      characterWalkingSound.play();
      this.playAnimation(this.assets.IMAGES_WALKING);
      this.idle_countdown = 0;
    } else if (!this.isMoving()) {
      this.sleepCount();
    }
    if (this.isHurt() && !this.isDead()) {
      characterHurtSound.play();
      this.playSingleAnimation(this.assets.IMAGES_HURT);
      this.idle_countdown = 0;
    } 
    if (this.sleepCount()) {
      this.playAnimation(this.assets.IMAGES_IDLE_LONG);
    }
  }

  /** Intervall method, for character action & inputs*/
  keyboardInputs() {
    if (this.world.keyboard.RIGHT && this.world.level.levelArea_end >= this.x) {
      this.moveRight();
      this.otherDirection = false;
      if (this.isCharacterReachedLevelEnds()) {
        this.bgLayerMoveLeft();
      }
    }
    if (
      this.world.keyboard.LEFT &&
      this.world.level.levelArea_start <= this.x
    ) {
      this.moveLeft();
      this.otherDirection = true;
      if (this.isCharacterReachedLevelEnds()) {
        this.bgLayerMoveRight();
      }
    }
    if (this.world.keyboard.UP && !this.isAboveGround()) {
      this.jump(20);
      this.isJumping = true;
    }
    this.setFixedPosition();
    this.world.camera_x = -this.x + 200; // invert camera motion and set position
  }

  /** level limitation */
  isCharacterReachedLevelEnds() {
    return (
      this.x < this.world.level.levelArea_end &&
      this.x > this.world.level.levelArea_start
    );
  }

  bgLayerMoveLeft() {
    this.world.level.backgroundLayers.forEach((layer) => {
      layer.forEach((b) => {
        b.moveLeft();
      });
    });
  }

  bgLayerMoveRight() {
    this.world.level.backgroundLayers.forEach((layer) => {
      layer.forEach((b) => {
        b.moveRight();
      });
    });
  }
}
