class MovableObject{
  x = 100;
  y = 150;
  width = 150;
  height = 280;
  img;
  imgCache = {};
  speed = .15;
  otherDirection = false;

  /**Load picture.
   * 
   * @param {Object} path - new Image
   */
  loadImage(path){
    this.img = new Image(); //Abb. new Image = <img id="image"> ausgeschrieben, => this.img = document.getElementById('image')
    this.img.src = path;
  }

  /**Load pictures from Array.
   * 
   * @param {Array} array - ['img/bild1.png', 'img/bild2.png',...]
   */
  loadImages(array){
    array.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imgCache[path] = img;
    });
  }

  moveRight(){
    setInterval(() => {
      this.x += this.speed;
    }, 1000 / 60);
  }
  
  moveLeft(){
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }
}