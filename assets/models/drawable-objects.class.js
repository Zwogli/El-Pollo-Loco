class DrawableObjects {
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
  currentImg = 0;

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

  /**Animate Images
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
  }

  setHitBoxColor(ctx, color) {
    ctx.beginPath();
    ctx.lineWidth = "5";
    ctx.strokeStyle = color;
    ctx.rect(
      this.x + this.offset_x,
      this.y + this.offset_y,
      this.width + this.offset_width,
      this.height + this.offset_height
    );
    ctx.stroke();
  }
}
