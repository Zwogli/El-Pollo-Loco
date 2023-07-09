class DrawableObjects {
  x = 100;
  y = 150;
  width = 150;
  height = 280;
  offset_x = 0;
  offset_y = 0;
  offset_width = 0;
  offset_height = 0;
  x_fix;
  y_fix;
  width_fix;
  height_fix;
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
    if (this instanceof Coins || this instanceof Bottles) {
      this.setHitBoxColor(ctx, "green");
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

  collect(collectable) {
    if (!this.isCollect()) {
      if (collectable instanceof Coins) {
        this.countCoin();
      }
      if (collectable instanceof Bottles) {
        this.countBottle(+1);
      } else {
        this.lastCollect = new Date().getTime();
      }
    }
  }

  countCoin() {
    this.setCoin += 20;
    if (this.setCoin > 100) {
      this.setCoin = 100;
    }
  }

  countBottle(count) {
    this.setBottle += count;
    this.world.statusbarBottles.setPercentageBottle(this.setBottle * 20);
    if (this.setBottle > 5) {
      this.setBottle = 5;
    }
  }

  isCollect() {
    let timepassed = new Date().getTime() - this.lastCollect; // difference in ms
    timepassed = timepassed / 1000; // difference ins s
    return timepassed < .2;
  }

  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage >= 80) {
      return 4;
    } else if (this.percentage >= 60) {
      return 3;
    } else if (this.percentage >= 40) {
      return 2;
    } else if (this.percentage >= 20) {
      return 1;
    } else {
      return 0;
    }
  }

  setFixedPosition(){
    this.x_fix = this.x + this.offset_x;
    this.y_fix = this.y + this.offset_y;
    this.width_fix = this.width + this.offset_width;
    this.height_fix = this.height + this.offset_height;
  }
}
