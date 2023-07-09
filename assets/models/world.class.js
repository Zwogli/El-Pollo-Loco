class World {
  canvas;
  ctx; //context
  keyboard;
  keyboard = new Keyboard();
  camera_x;
  level;
  character = new Character(); //Erstellt aus der Schablone ein Objekt
  statusbarLive = new StatusbarLive();
  statusbarCoins = new StatusbarCoins();
  statusbarBottles = new StatusbarBottles();
  throwableObjects = [];

  constructor(canvas, keyboard) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.keyboard = keyboard;
    this.level = initLevel(0); //generate level object
    this.draw();
    this.setWorld();
    let self = this;
    let collisionEnemy = setInterval(this.worldIntervall, 100, self);
  }

  setWorld() {
    this.character.world = this; //übergibt die world variablen an den Character
    this.level.world = this;
  }

  worldIntervall(self) {
    self.checkCollisionsEnemies(self);
    self.checkCollisionsCoin(self);
    self.checkCollisionsBottle(self);
    self.checkThrow(self);
  }

  checkCollisionsEnemies(self) {
    self.level.enemies.forEach((enemy) => {
      if (self.character.isColliding(enemy)) {
        self.character.hit();
        self.statusbarLive.setPercentageLive(self.character.energy);
      }
      //todo if (self.character.isJumpEnemy(enemy)) { 
      //   self.character.jump(20);
      //   console.log('jump')
      // }
    });
  }

  checkCollisionsCoin(self) {
    self.level.coins.forEach((coin) => {
      if (self.character.isColliding(coin)) {
        self.statusbarCoins.collect(coin);
        self.statusbarCoins.setPercentageCoins(self.statusbarCoins.setCoin);
        self.level.coins.splice(this.level.coins.indexOf(coin), 1);
      }
    });
  }

  checkCollisionsBottle(self) {
    self.level.bottles.forEach((bottle) => {
      if (self.character.isColliding(bottle)) {
        self.statusbarBottles.collect(bottle);
        self.statusbarBottles.setPercentageBottle(self.statusbarBottles.setBottle);
        self.level.bottles.splice(this.level.bottles.indexOf(bottle), 1);
      }
    });
  }

  checkThrow(self) {
    if (self.keyboard.THROW) {
      let bottle = new ThrowableObject(
        this.character.x +
          this.character.offset_width +
          this.character.width * 0.5,
        this.character.y +
          this.character.offset_height +
          this.character.height +
          0.5
      );
      self.throwableObjects.push(bottle);
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //clear canvas!

    this.ctx.translate(this.camera_x, 0);

    this.addArrayToWorld(this.level.backgroundLayers);
    this.addArrayToWorld(this.level.clouds);
    this.addArrayToWorld(this.level.coins);
    this.addArrayToWorld(this.level.bottles);
    this.addArrayToWorld(this.level.enemies);
    this.addArrayToWorld(this.throwableObjects);

    this.addToWorld(this.character);

    this.ctx.translate(-this.camera_x, 0);

    // HUD
    this.addToWorld(this.statusbarLive);
    this.addToWorld(this.statusbarCoins);
    this.addToWorld(this.statusbarBottles);

    let self = this; // this wird nicht in requestAnimationFrame erkannt, daher wird eine hilfsvariable erzeugt.
    requestAnimationFrame(function () {
      //draw() wird immer wieder aufgerufen, um animationen anzuzeigen muss canvas immer wieder gelöscht werden!!
      self.draw();
    });
  }

  addArrayToWorld(array) {
    array.forEach((object) => {
      // object = neue Variable für die Array Objekte
      this.addToWorld(object);
    });
  }

  addToWorld(object) {
    if (object.otherDirection) {
      this.flipImage(object);
    }

    object.draw(this.ctx);
    object.drawHitBox(this.ctx);

    if (object.otherDirection) {
      this.flipImageBack(object);
    }
  }

  flipImage(object) {
    this.ctx.save(); // saves the entire state of the canvas by pushing the current state onto a stack.
    this.ctx.translate(object.width, 0); // translate(x, y),
    this.ctx.scale(-1, 1); // scale(x, y) adds a scaling transformation to the canvas units horizontally and/or vertically.
    object.x = object.x * -1;
  }

  flipImageBack(object) {
    object.x = object.x * -1;
    this.ctx.restore();
  }
}
