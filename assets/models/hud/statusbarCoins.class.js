class StatusbarCoins extends StatusbarObject {
  IMAGES = [
    "./assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png", // 0
    "./assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png",
    "./assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png",
    "./assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png",
    "./assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png",
    "./assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png", // 5
  ];
  x = 10;
  y = 40;
  width = 200;
  height = 50;
  percentage = 0;
  

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.setPercentageCoins(0);
  }

    // setPercentage(50);
    setPercentageCoins(percentage){
      this.percentage = percentage // => between 0-5 (6)
      let path = this.IMAGES[this.resolveImageIndex()];
      this.img = this.imgCache[path];
    }
}
