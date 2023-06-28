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
  speed = 3; //2

  constructor() {
    super().loadImage("./assets/img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.animate();
    let self = this; //! In setIntervall wird this. nicht erkannt !
    let keyboardIntervall = setInterval(this.keyboardInputs, 1000 / 60, self); // setIntervall( function, time, argument1)
  }

  animate() {
    // setInterval(() => {
    //   if (this.world.keyboard.RIGHT) {
    //     this.x += this.speed;
    //   }
    //   if (this.world.keyboard.LEFT) {
    //     this.x -= this.speed;
    //   }
    // }, 1000 / 60);

    // setInterval(() => {this.keyboardInputs();}, 1000 / 60);

    setInterval(() => {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        let i = this.currentImg % this.IMAGES_WALKING.length; // % = modulo
        let path = this.IMAGES_WALKING[i];
        this.img = this.imgCache[path];
        this.currentImg++;
        if (this.currentImg > 5) {
          this.currentImg = 0;
        }
      }
    }, 100);
  }

  keyboardInputs(self){
    if (self.world.keyboard.RIGHT) {
      self.x += self.speed;
    }
    if (self.world.keyboard.LEFT) {
      self.x -= self.speed;
    }
  }

  jump() {}
}
