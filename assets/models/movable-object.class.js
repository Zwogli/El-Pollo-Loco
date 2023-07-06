class MovableObject extends DrawableObjects {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 1.5; // dt.: Beschleunigung
  position_startY;
  energy = 100;
  lastHit = 0;
  idle_countdown = 0;

  // character.isColliding(chicken)
  isColliding(object) {
    return (
      this.x + this.width > object.x &&
      this.y + this.height > object.y &&
      this.x < object.x &&
      this.y < object.y + object.height
    );
  }

  hit() {
    this.energy -= 20;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime(); //timestamp
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit; // difference in ms
    timepassed = timepassed / 1000; // difference ins s
    console.log(timepassed < 1)
    return timepassed < 1; //
  }

  isDead() {
    return this.energy == 0;
  }

  sleepCount() {
    this.idle_countdown++;
    let idleCountdown_seconds = this.idle_countdown / 10; // change into seconds
    return idleCountdown_seconds > 5;
  }

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) { // ThrowableObjects should always fall.
      return true;
    }else{
      return this.y < this.position_startY;
    }
  }

  jump(jumpEnergy) {
    this.speedY = jumpEnergy;
  }

  isMoving() {
    return (
      this.world.keyboard.LEFT &&
      this.world.keyboard.RIGHT &&
      this.world.keyboard.UP &&
      this.world.keyboard.DOWN &&
      this.world.keyboard.SPACE &&
      this.isJumping
    );
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  movementLoop(self) {
    if (!self.otherDirection) {
      self.moveLeft();
      if (self.x < self.postion_startX - 200) {
        self.otherDirection = true;
      }
    } else if (self.otherDirection) {
      self.moveRight();
      if (self.x > self.postion_startX) {
        self.otherDirection = false;
      }
    }
  }
}
