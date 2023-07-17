class DrawableObjects {
  x = 100;
  y = 150;
  width = 150;
  height = 280;
  offset = {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  }
  x_fix;
  y_fix;
  width_fix;
  height_fix;
  x_attack = 0;
  img;
  imgCache = {};
  currentImg = 0;
  percentage;
  lastCollect = 0;
  setCoin = 0;
  setBottle = 0;

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
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

  /**Animate Images with modulo
   *
   * @param {Array} images - Image Array
   */
  playAnimation(images) {
    let i = this.currentImg % images.length; // % = modulo
    let path = images[i];
    this.img = this.imgCache[path];
    this.currentImg++;
    if (this.currentImg > images.length) {
      this.currentImg = 0;
    }
  }

  /** select hitbox color */
  drawHitBox(ctx) {
    if (this instanceof Character) {
      this.setHitBoxColor(ctx, "blue");
    }
    if (
      this instanceof Chicken ||
      this instanceof BabyChicken ||
      this instanceof Endboss
    ) {
      this.setHitBoxColor(ctx, "red");
    }
    if (this instanceof Coins || this instanceof Bottles || this instanceof ThrowableObject) {
      this.setHitBoxColor(ctx, "green");
    }
  }

  /** Draw hitbox */
  setHitBoxColor(ctx, color) {
    ctx.beginPath();
    ctx.lineWidth = "5";
    ctx.strokeStyle = color;
    ctx.rect(
      this.x + this.offset.x,
      this.y + this.offset.y,
      this.width + this.offset.width,
      this.height + this.offset.height
    );
    ctx.stroke();
  }

  /** Calc the real x, y, width & height, without offset*/
  setFixedPosition(){
    this.x_fix = this.x + this.offset.x + this.x_attack;
    this.y_fix = this.y + this.offset.y;
    this.width_fix = this.width + this.offset.width;
    this.height_fix = this.height + this.offset.height;
  }
}
