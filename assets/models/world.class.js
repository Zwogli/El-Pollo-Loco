class World {
  canvas;
  ctx; //context
  keyboard;
  keyboard = new Keyboard();
  camera_x;
  level;
  character = new Character(assetsCharacter); //Erstellt aus der Schablone ein Objekt
  enemy = [];
  endboss;
  statusbarLive = new StatusbarLive();
  statusbarCoins = new StatusbarCoins();
  statusbarBottles = new StatusbarBottles();
  throwableObjects = [];
  assetsCharacter;
  throwing = false;

  constructor(canvas, keyboard) {
    this.initGame(canvas, keyboard);
    this.draw();
    this.setWorld();

    setPausableInterval(this.worldIntervallFast.bind(this), 1000 / 60);
    setPausableInterval(this.worldIntervallSlow.bind(this), 100);
  }

  /** Load game framework
   *
   * @param {Node} canvas - document.getElementById('canvas')
   * @param {EventListener} keyboard - bind keyboard
   */
  initGame(canvas, keyboard) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.keyboard = keyboard;
    this.level = initLevel(0); //generate level object
    this.level.enemies.forEach((arrayEnemy) => {
      this.enemy.push(arrayEnemy);
    });
    this.endboss = this.level.enemies.find((e) => e instanceof Endboss);
  }

  /** shares variables with objects */
  setWorld() {
    this.character.world = this; //übergibt die world variablen an den Character
    this.level.world = this;
    this.enemy.forEach((arrayEnemy) => {
      arrayEnemy.world = this;
    });
  }

  worldIntervallFast() {
    this.checkCollisionsEnemies();
    this.checkCollisionsCoin();
    this.checkCollisionsBottle();
    this.checkCollisionThrowBottle();
    this.checkEndscreen();
  }

  worldIntervallSlow() {
    this.checkThrow();
  }

  /** Check if character jump off or hit by enemy */
  checkCollisionsEnemies() {
    this.level.enemies.forEach((enemy) => {
      if (enemy instanceof Chicken || enemy instanceof BabyChicken) {
        if (this.isJumpOff(enemy)) {
          enemy.energy -= 20;
          this.character.jump(5);
          this.deleteObject(this.level.enemies, enemy);
        }
      } else if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.statusbarLive.setPercentageLive(this.character.energy);
      }
    });
  }

  isJumpOff(enemy) {
    return (
      this.character.isColliding(enemy) &&
      this.character.isAboveGround() &&
      this.character.isFalling()
    );
  }

  checkCollisionsCoin() {
    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin)) {
        collectCoinSound.play();
        this.statusbarCoins.collect(coin);
        this.deleteObject(this.level.coins, coin);
      }
    });
  }

  checkCollisionsBottle() {
    this.level.bottles.forEach((bottle) => {
      if (this.character.isColliding(bottle)) {
        collectBottleSound.play();
        this.statusbarBottles.collect(bottle);
        this.deleteObject(this.level.bottles, bottle);
      }
    });
  }

  /** Check bottle collision, hitting normal enemies delete them.  */
  checkCollisionThrowBottle() {
    this.throwableObjects.forEach((bottle) => {
      this.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy)) {
          enemy.hit();
          bottle.isHitEnemy = true;
          bottle.animateThrow();
          if (
            (enemy.energy == 0 && enemy instanceof Chicken) ||
            (enemy.energy == 0 && enemy instanceof BabyChicken)
          ) {
            this.deleteObject(this.level.enemies, enemy);
          }
          bottle.isHitEnemy = false;
        }
        if (bottle.y > 500) {
          this.deleteObject(this.throwableObjects, bottle);
        }
      });
    });
  }

  /** Check throw input and generate bottle object */
  checkThrow() {
    if (
      this.isThrowing() &&
      !this.throwing &&
      this.throwableObjects.length < 1
    ) {
      this.character.idle_countdown = 0;
      this.character.loadImage("./assets/img/2_character_pepe/2_walk/W-21.png");
      let bottle = new ThrowableObject(
        this.positionBottleStartX(),
        this.positionBottleStartY(),
        this.character.otherDirection
      );
      throwBottleSound.play();
      this.throwableObjects.push(bottle);
      this.statusbarBottles.countBottle(-1);
      this.throwing = true;
    } else if (!this.keyboard.THROW) {
      this.throwing = false;
    }
  }

  isThrowing() {
    return this.keyboard.THROW && this.statusbarBottles.setBottle > 0;
  }

  positionBottleStartX() {
    return this.character.x_fix + this.character.width_fix * 0.5;
  }

  positionBottleStartY() {
    return this.character.y_fix + this.character.height_fix * 0.2;
  }

  deleteObject(path, object) {
    path.splice(path.indexOf(object), 1);
  }

  /** Draw World */
  draw() {
    this.ctx.clearRect(0, 0, 720, 480); //clear canvas!

    this.ctx.translate(this.camera_x, 0);
    this.drawDynamicCameraObjects();
    this.ctx.translate(-this.camera_x, 0);

    this.drawFixCameraObjects();

    let self = this; // this wird nicht in requestAnimationFrame erkannt, daher wird eine hilfsvariable erzeugt.
    requestAnimationFrame(function () {
      //draw() wird immer wieder aufgerufen, um animationen anzuzeigen muss canvas immer wieder gelöscht werden!!
      self.draw();
    });
  }

  /** Drawed objects are moving into the canvas */
  drawDynamicCameraObjects() {
    this.level.backgroundLayers.forEach((bg) => this.addArrayToWorld(bg));
    this.addArrayToWorld(this.level.clouds);
    this.addArrayToWorld(this.level.coins);
    this.addArrayToWorld(this.level.bottles);
    this.addArrayToWorld(this.level.enemies);
    this.addArrayToWorld(this.throwableObjects);

    this.addToWorld(this.character);
  }

  /** Drawed objects are fixed into the canvas */
  drawFixCameraObjects() {
    // HUD
    this.addToWorld(this.statusbarLive);
    this.addToWorld(this.statusbarCoins);
    this.addToWorld(this.statusbarBottles);
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
    // object.drawHitBox(this.ctx);
    if (object.otherDirection) {
      this.flipImageBack(object);
    }
  }

  /** Reflect image */
  flipImage(object) {
    this.ctx.save(); // saves the entire state of the canvas by pushing the current state onto a stack.
    this.ctx.translate(object.width, 0); // translate(x, y),
    this.ctx.scale(-1, 1); // scale(x, y) adds a scaling transformation to the canvas units horizontally and/or vertically.
    object.x = object.x * -1;
  }

  /** Reflect image back */
  flipImageBack(object) {
    object.x = object.x * -1;
    this.ctx.restore();
  }

  /**Check which endscreen should load. */
  checkEndscreen() {
    let endboss = this.enemy.find((e) => e instanceof Endboss);

    if (this.character.energy == 0) {
      bossMusic.pause();
      looseSound.play();
      let path =
        "./assets/img/9_intro_outro_screens/game_over/oh no you lost!.png";
      this.stopGame(path);
    } else if (endboss.energy == 0) {
      bossMusic.pause();
      winSound.play();
      let path = "./assets/img/9_intro_outro_screens/game_over/game over!.png";
      this.stopGame(path);
    }
  }

  /**Render endscreen & stop interval
   *
   * @param {string} path - endscreen img
   */
  stopGame(path) {
    let endscreen = document.getElementById("endscreen");
    let imgEndscreen = document.getElementById("img-endscreen");

    imgEndscreen.src = path;
    setTimeout(() => {
      endscreen.classList.remove("d-none");
      stopInterval = true;
    }, 1000);
  }
}
