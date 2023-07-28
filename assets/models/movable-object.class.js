class MovableObject extends DrawableObjects {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 1.5; // dt.: Beschleunigung
  position_startY;
  energy = 100;
  lastHit = 0;
  idle_countdown = 0;

  /** Check object isColliding with object. 
   * Example Function call is this.character.isColliding(enemy), 
   * check colission bettween character and enemy */
  isColliding(object) {
    return (
      this.x_fix + this.width_fix > object.x_fix && // char.R -> obj.L (>) 
      this.y_fix + this.height_fix > object.y_fix &&  // char.B -> obj.T (>)
      this.x_fix < object.x_fix + object.width_fix &&  // char.L -> obj.R (<)
      this.y_fix < object.y_fix + object.height_fix // char.T -> obj.B (<)
    );
  }

  /** Calculates the energybar, hold up at 0.
   * Made a timestamp. */
  hit() {
    if (!this.isHurt()) { // timeout for hit
      this.energy -= 20;
      if (this.energy < 0) {
        this.energy = 0;
      } else {
        this.lastHit = new Date().getTime(); //timestamp
      }
    }
  }

  /** Time how long object is hurt */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit; // difference in ms
    timepassed = timepassed / 1000; // difference ins s
    return timepassed < 1; 
  }

  isDead() {
    return this.energy == 0;
  }

  /** Time until the character sleeps */
  sleepCount() {
    this.idle_countdown++;
    let idleCountdown_seconds = this.idle_countdown / 10; // change into seconds
    return idleCountdown_seconds > 5;
  }

  applyGravity() {
    setPausableInterval(this.checkGravity.bind(this), 1000/25);
  }
  checkGravity(){
    if (this.isAboveGround() || this.speedY > 0) {
      this.y -= this.speedY;
      this.speedY -= this.acceleration;
    }
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

  isFalling(){
    return this.speedY <= 0;
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

  /** Enemy movement loop with flip image */
  movementLoop() {
    if (!this.otherDirection) {
      this.moveLeft();
      if (this.x < this.postion_startX - 200) {
        this.otherDirection = true;
      }
    } else if (this.otherDirection) {
      this.moveRight();
      if (this.x > this.postion_startX) {
        this.otherDirection = false;
      }
    }
  }
}
