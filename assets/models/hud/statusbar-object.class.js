class StatusbarObject extends DrawableObjects {
  x = 10;
  y = 0;
  width = 200;
  height = 50;
  percentage;

  /** Check collectable for count */
  collect(collectable) {
    if (!this.isCollect()) {
      if (collectable instanceof Coins) {
        this.countCoin(+1);
      }
      if (collectable instanceof Bottles) {
        this.countBottle(+1);
      } else {
        this.lastCollect = new Date().getTime();
      }
    }
  }

  /** Counts the coins up to a maximum of 5. For setPercentageCoins() the current value is multiplied by 20.
   *
   * @param {number} count - iterate collected coin
   */
  countCoin(count) {
    this.setCoin += count;
    this.setPercentageCoins(this.setCoin * 20);
    if (this.setCoin > 5) {
      this.setCoin = 5;
    }
  }

  /** Counts the coins up to a maximum of 5. For setPercentageCoins() the current value is multiplied by 20.
   *
   * @param {number} count - iterate collected coin
   */
  countBottle(count) {
    this.setBottle += count;
    this.setPercentageBottle(this.setBottle * 20);
    if (this.setBottle > 5) {
      this.setBottle = 5;
    }
  }

  /** slight delay for collectibles */
  isCollect() {
    let timepassed = new Date().getTime() - this.lastCollect; // difference in ms
    timepassed = timepassed / 1000; // difference ins s
    return timepassed < 0.2;
  }

  /** Gives the statusbars numbers for array position */
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
}
