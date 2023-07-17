class Character extends MovableObject {
  IMAGES_DEAD = [
    "./assets/img/2_character_pepe/5_dead/D-51.png",
    "./assets/img/2_character_pepe/5_dead/D-52.png",
    "./assets/img/2_character_pepe/5_dead/D-53.png",
    "./assets/img/2_character_pepe/5_dead/D-54.png",
    "./assets/img/2_character_pepe/5_dead/D-55.png",
    "./assets/img/2_character_pepe/5_dead/D-56.png",
    "./assets/img/2_character_pepe/5_dead/D-57.png",
  ];
  IMAGES_IDLE = [
    "./assets/img/2_character_pepe/1_idle/long_idle/I-11.png",
    "./assets/img/2_character_pepe/1_idle/long_idle/I-12.png",
    "./assets/img/2_character_pepe/1_idle/long_idle/I-13.png",
    "./assets/img/2_character_pepe/1_idle/long_idle/I-14.png",
    "./assets/img/2_character_pepe/1_idle/long_idle/I-15.png",
    "./assets/img/2_character_pepe/1_idle/long_idle/I-16.png",
    "./assets/img/2_character_pepe/1_idle/long_idle/I-17.png",
    "./assets/img/2_character_pepe/1_idle/long_idle/I-18.png",
    "./assets/img/2_character_pepe/1_idle/long_idle/I-19.png",
    "./assets/img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];
  IMAGES_JUMPING = [
    "./assets/img/2_character_pepe/3_jump/J-31.png",
    "./assets/img/2_character_pepe/3_jump/J-32.png",
    "./assets/img/2_character_pepe/3_jump/J-33.png",
    "./assets/img/2_character_pepe/3_jump/J-34.png",
    "./assets/img/2_character_pepe/3_jump/J-35.png",
    "./assets/img/2_character_pepe/3_jump/J-36.png",
    "./assets/img/2_character_pepe/3_jump/J-37.png",
    "./assets/img/2_character_pepe/3_jump/J-38.png",
    "./assets/img/2_character_pepe/3_jump/J-39.png",
  ];
  IMAGES_HURT = [
    "./assets/img/2_character_pepe/4_hurt/H-41.png",
    "./assets/img/2_character_pepe/4_hurt/H-42.png",
    "./assets/img/2_character_pepe/4_hurt/H-43.png",
  ];
  IMAGES_WALKING = [
    "./assets/img/2_character_pepe/2_walk/W-21.png",
    "./assets/img/2_character_pepe/2_walk/W-22.png",
    "./assets/img/2_character_pepe/2_walk/W-23.png",
    "./assets/img/2_character_pepe/2_walk/W-24.png",
    "./assets/img/2_character_pepe/2_walk/W-25.png",
    "./assets/img/2_character_pepe/2_walk/W-26.png",
  ];
  x = 100;
  y = 150;
  width = 150;
  height = 280;
  offset = {
    x: 25,
    y: 110,
    width: -50,
    height: -120
  }
  world;
  speed = 10; //3
  isJumping = false;
  position_startY = 150;

  constructor() {
    super();
    this.renderImages();
    this.applyGravity();
    //todo let self = this; //! In setIntervall wird this. nicht erkannt !
    // intervallIds.push(setInterval(this.keyboardInputs, 1000 / 60, self)); // setIntervall( function, time, argument1)
    // intervallIds.push(setInterval(this.imageAnimation, 100, self));

    setPausableInterval(this.keyboardInputs.bind(this), 1000/60);
    setPausableInterval(this.imageAnimation.bind(this), 100);
  }

  renderImages(){
    this.loadImage("./assets/img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_WALKING);
  }

  /** Intervall method, image animation */
  //todo imageAnimation(self) {
  //   if (self.isDead()) {
  //     self.playAnimation(self.IMAGES_DEAD);
  //     self.idle_countdown = 0;
  //   }else if (self.isHurt()) {
  //     self.playAnimation(self.IMAGES_HURT);
  //     self.idle_countdown = 0;
  //   }else if (self.isAboveGround()) {
  //     self.playAnimation(self.IMAGES_JUMPING);
  //     self.idle_countdown = 0;
  //   } else if (!self.isAboveGround() && self.isJumping) {
  //     self.loadImage("./assets/img/2_character_pepe/2_walk/W-21.png");
  //     self.isJumping = false;
  //   } else if (self.world.keyboard.RIGHT || self.world.keyboard.LEFT) {
  //     self.playAnimation(self.IMAGES_WALKING);
  //     self.idle_countdown = 0;
  //   }else if(!self.isMoving() ) {
  //     self.sleepCount();
  //   }
  //   if (self.sleepCount()) {
  //     self.playAnimation(self.IMAGES_IDLE);
  //   } 
  // }
  imageAnimation() {
    if (this.isDead()) {
      this.playAnimation(self.IMAGES_DEAD);
      this.idle_countdown = 0;
    }else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
      this.idle_countdown = 0;
    }else if (this.isAboveGround()) {
      this.playAnimation(this.IMAGES_JUMPING);
      this.idle_countdown = 0;
    } else if (!this.isAboveGround() && this.isJumping) {
      this.loadImage("./assets/img/2_character_pepe/2_walk/W-21.png");
      this.isJumping = false;
    } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.playAnimation(this.IMAGES_WALKING);
      this.idle_countdown = 0;
    }else if(!this.isMoving() ) {
      this.sleepCount();
    }
    if (this.sleepCount()) {
      this.playAnimation(this.IMAGES_IDLE);
    } 
  }
  
  /** Intervall method, for character action & inputs*/
  //todo keyboardInputs(self) {
  //   if (self.world.keyboard.RIGHT && self.world.level.levelArea_end >= self.x) {
  //     self.moveRight();
  //     self.otherDirection = false;
  //   }
  //   if (
  //     self.world.keyboard.LEFT &&
  //     self.world.level.levelArea_start <= self.x
  //   ) {
  //     self.moveLeft();
  //     self.otherDirection = true;
  //   }
  //   if (self.world.keyboard.UP && !self.isAboveGround()) {
  //     self.jump(20);
  //     self.isJumping = true;
  //   }
  //   self.setFixedPosition();
  //   self.world.camera_x = -self.x + 200; // invert camera motion and set position
  // }
  keyboardInputs() {
    if (this.world.keyboard.RIGHT && this.world.level.levelArea_end >= this.x) {
      this.moveRight();
      this.otherDirection = false;
      if(this.x < this.world.level.levelArea_end && this.x > this.world.level.levelArea_start) {
        this.world.level.backgroundLayers.forEach(layer => { 
            layer.forEach(b => {
                b.moveLeft();
            })
        });
      };
    }
    if (
      this.world.keyboard.LEFT &&
      this.world.level.levelArea_start <= this.x
    ) {
      this.moveLeft();
      this.otherDirection = true;
      if(this.x < this.world.level.levelArea_end && this.x > this.world.level.levelArea_start) {
        this.world.level.backgroundLayers.forEach(layer => { 
            layer.forEach(b => {
                b.moveRight();
            })
        });
      };
    }
    if (this.world.keyboard.UP && !this.isAboveGround()) {
      this.jump(20);
      this.isJumping = true;
    }
    this.setFixedPosition();
    this.world.camera_x = -this.x + 200; // invert camera motion and set position
  }
}
