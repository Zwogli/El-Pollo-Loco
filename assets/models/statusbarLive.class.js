class StatusbarLive extends DrawableObjects{
IMAGES = [
  './assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',   // 0
  './assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
  './assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
  './assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
  './assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
  './assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',   // 5
]
x = 10;
y = 0;
width = 200;
height = 50;
percentage = 100;

  constructor(){
    super();
    this.loadImages(this.IMAGES);
    this.setPercentage(100);
  }

  // setPercentage(50);
  setPercentage(percentage){
    this.persentage = percentage // => between 0-5 (6)
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imgCache[path];
  }

  resolveImageIndex(){
    if (this.percentage == 100) {
      return 5;
    }else if (this.percentage > 80) {
      return 4;
    }else if (this.percentage > 60) {
      return 3;
    }else if (this.percentage > 40) {
      return 2;
    }else if (this.percentage > 20) {
      return 1;
    }else {
      return 0;
    }
  }
}