class MovableObject{
  x = 100;
  y = 180;
  width = 150;
  height = 250;
  img;

  loadImage(path){
    this.img = new Image(); //Abb. new Image = <img id="image"> ausgeschrieben, => this.img = document.getElementById('image')
    this.img.src = path;
  }

  moveRight(){}

  moveLeft(){}
}