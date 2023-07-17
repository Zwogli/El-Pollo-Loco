class StatusbarBottles extends StatusbarObject {
  IMAGES = [
    "./assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png", // 0
    "./assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
    "./assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
    "./assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
    "./assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png",
    "./assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png", // 5
  ];
  x = 10;
  y = 80;
  width = 200;
  height = 50;
  percentage;

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.setPercentageBottle(0);
  }

    // setPercentage(50);
    setPercentageBottle(percentage){
      this.percentage = percentage // => between 0-5 (6)
      let path = this.IMAGES[this.resolveImageIndex()];
      this.img = this.imgCache[path];
    }
}
