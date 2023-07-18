class StatusbarCoins extends StatusbarObject {
  IMAGES = [
    "./assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png", // 0
    "./assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png",
    "./assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png",
    "./assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png",
    "./assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png",
    "./assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png", // 5
  ];

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.y = 40;
    this.setPercentageCoins(0);
  }

  /** Chooses based on percentage.
   *
   * @param {number} percentage - between 0-100
   */
  setPercentageCoins(percentage) {
    this.percentage = percentage; // => between 0-5 (6)
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imgCache[path];
  }
}
