class Character extends MovableObject {
  IMAGES_WALKING = [
    "./assets/img/2_character_pepe/2_walk/W-21.png",
    "./assets/img/2_character_pepe/2_walk/W-22.png",
    "./assets/img/2_character_pepe/2_walk/W-23.png",
    "./assets/img/2_character_pepe/2_walk/W-24.png",
    "./assets/img/2_character_pepe/2_walk/W-25.png",
    "./assets/img/2_character_pepe/2_walk/W-26.png",
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
  currentImg = 0;
  x = 100;
  y = 150;
  width = 150;
  height = 280;
  offset_x = 25;
  offset_y = 110;
  offset_width = -50;
  offset_height = -120;
  world;
  speed = 10; //3
  start_positionY = 150;

  constructor() {
    super().loadImage("./assets/img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.applyGravity();

    let self = this; //! In setIntervall wird this. nicht erkannt !
    let keyboardIntervall = setInterval(this.keyboardInputs, 1000 / 60, self); // setIntervall( function, time, argument1)
    let animationIntervall = setInterval(this.imageAnimation, 100, self);
  }

  imageAnimation(self) {
    if (self.isAboveGround()) {
      self.playAnimation(self.IMAGES_JUMPING);
    } else if (self.world.keyboard.RIGHT || self.world.keyboard.LEFT) {
      self.playAnimation(self.IMAGES_WALKING);
    }
  }

  keyboardInputs(self) {
    if (self.world.keyboard.RIGHT && self.world.level.levelArea_end >= self.x) {
      self.moveRight();
      self.otherDirection = false;
    }
    if (self.world.keyboard.LEFT && self.world.level.levelArea_start <= self.x) {
      self.moveLeft();
      self.otherDirection = true;
    }
    if (self.world.keyboard.UP && !self.isAboveGround()) {
      self.jump(20);
    }
    self.world.camera_x = -self.x + 200; // invert camera motion and set position
  }
}
