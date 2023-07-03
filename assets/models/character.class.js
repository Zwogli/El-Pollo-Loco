class Character extends MovableObject {
  IMAGES_WALKING = [
    "./assets/img/2_character_pepe/2_walk/W-21.png",
    "./assets/img/2_character_pepe/2_walk/W-22.png",
    "./assets/img/2_character_pepe/2_walk/W-23.png",
    "./assets/img/2_character_pepe/2_walk/W-24.png",
    "./assets/img/2_character_pepe/2_walk/W-25.png",
    "./assets/img/2_character_pepe/2_walk/W-26.png",
  ];
  currentImg = 0;
  x = 100;
  y = 150;
  width = 150;
  height = 280;
  world;
  speed = 10; //3

  constructor() {
    super().loadImage("./assets/img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);

    let self = this; //! In setIntervall wird this. nicht erkannt !
    let keyboardIntervall = setInterval(this.keyboardInputs, 1000 / 60, self); // setIntervall( function, time, argument1)
    let animationIntervall = setInterval(this.walkingAnimation, 100, self);
  }

  walkingAnimation(self) {
    if (self.world.keyboard.RIGHT || self.world.keyboard.LEFT) {
      self.playAnimation(self.IMAGES_WALKING);
    }
  }

  keyboardInputs(self) {
    if (
      self.world.keyboard.LEFT &&
      self.world.level.levelArea_start <= self.x
    ) {
      self.x -= self.speed;
      self.otherDirection = true;
    }
    if (self.world.keyboard.RIGHT && self.world.level.levelArea_end >= self.x) {
      self.x += self.speed;
      self.otherDirection = false;
    }
    self.world.camera_x = -self.x + 200; // invert camera motion and set position
  }

  jump() {}
}
