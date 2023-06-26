class Cloud extends MovableObject{
y = 30;
width = 400;
height = 200;

  constructor(img, x,){
    super().loadImage(img);
    this.x = x
    // this.x = this.x + Math.random() * 500;
  }
}