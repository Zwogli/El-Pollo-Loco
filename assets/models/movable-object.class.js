class MovableObject {
  x = 100;
  y = 150;
  width = 150;
  height = 280;
  offset_x = 0;
  offset_y = 0;
  offset_width = 0;
  offset_height = 0;
  img;
  imgCache = {};
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 1.5; // dt.: Beschleunigung
  position_startY;

  draw(ctx){
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawHitBox(ctx){
    if (this instanceof Character) {
      this.setHitBoxColor(ctx, 'blue');
    }
    if (this instanceof Chicken || this instanceof BabyChicken || this instanceof Endboss) {
      this.setHitBoxColor(ctx, 'red');
    }
  }

  setHitBoxColor(ctx, color){
    ctx.beginPath();
    ctx.lineWidth = '5';
    ctx.strokeStyle = color;
    ctx.rect(this.x + this.offset_x, this.y + this.offset_y, this.width + this.offset_width, this.height + this.offset_height);
    ctx.stroke();
  }

  // character.isColliding(chicken)
  isColliding(object){
    return  this.x + this.width > object.x &&
            this.y + this.height > object.y &&
            this.x < object.x &&
            this.y < object.y + object.height
  }

 applyGravity(){
  setInterval(() => {
    if(this.isAboveGround() || this.speedY > 0){
      this.y -= this.speedY;
      this.speedY -= this.acceleration;
    }
  }, 1000 / 25);
 }

isAboveGround(){
  return this.y < this.position_startY;
}

jump(jumpEnergy) {
  this.speedY = jumpEnergy;
}

  /**Load picture.
   *
   * @param {Object} path - new Image
   */
  loadImage(path) {
    this.img = new Image(); //Abb. new Image = <img id="image"> ausgeschrieben, => this.img = document.getElementById('image')
    this.img.src = path;
  }

  /**Load pictures from Array.
   *
   * @param {Array} array - ['img/bild1.png', 'img/bild2.png',...]
   */
  loadImages(array) {
    array.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imgCache[path] = img;
    });
  }

  /**Animate Images
   * 
   * @param {Array} images - Image Array 
   */
  playAnimation(images) {
    let i = this.currentImg % images.length; // % = modulo
    let path = images[i];
    this.img = this.imgCache[path];
    this.currentImg++;
    if (this.currentImg > 5) {
      this.currentImg = 0;
    }
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  movementLoop(self){
    if(!self.otherDirection){
      self.moveLeft();
      if(self.x < self.postion_startX - 200){
        self.otherDirection = true;
      }
    }else if (self.otherDirection) {
      self.moveRight();
      if (self.x > self.postion_startX) {
        self.otherDirection = false;
      }
    }
  }
}
