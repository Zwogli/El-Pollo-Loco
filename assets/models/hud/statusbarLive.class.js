class StatusbarLive extends StatusbarObject{
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
// percentage = 100;

  constructor(){
    super();
    this.loadImages(this.IMAGES);
    this.setPercentageLive(100);
  }

  // setPercentage(50);
  setPercentageLive(percentage){
    this.percentage = percentage // => between 0-5 (6)
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imgCache[path];
  }
}