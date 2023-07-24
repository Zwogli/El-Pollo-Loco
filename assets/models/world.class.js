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

  constructor(canvas, keyboard) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.keyboard = keyboard;
    this.level = initLevel(0); //generate level object
    this.level.enemies.forEach(arrayEnemy => {
      this.enemy.push(arrayEnemy);
    });
    this.endboss = this.level.enemies.find(e => e instanceof Endboss);
    // this.endboss = this.level.enemies.find(e => e instanceof Endboss); // find class Enboss in array
    this.draw();
    this.setWorld();

    setPausableInterval(this.worldIntervallFast.bind(this), 1000/60);
    setPausableInterval(this.worldIntervallSlow.bind(this), 100);
  }

  setWorld() {
    this.character.world = this; //übergibt die world variablen an den Character
    this.level.world = this;
    this.enemy.forEach(arrayEnemy => {
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

  worldIntervallSlow(){
    this.checkThrow();
  }

  checkCollisionsEnemies() {
    this.level.enemies.forEach((enemy) => {
      if (this.isJumpOff(enemy)){
          enemy.energy -= 100;
          this.character.jump(5);
          this.deleteObject(this.level.enemies, enemy);
        }
      else if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.statusbarLive.setPercentageLive(this.character.energy);
      }
    });
  }

  isJumpOff(enemy){
    return this.character.isColliding(enemy) &&
    this.character.isAboveGround() && 
    this.character.isFalling();
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

  checkCollisionThrowBottle(){
    this.throwableObjects.forEach((bottle) => {
      this.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy)){
          enemy.hit();
          bottle.isHitEnemy = true;
          bottle.animateThrow();
          if (enemy.energy == 0 && enemy instanceof Chicken || enemy.energy == 0 && enemy instanceof BabyChicken) {
            this.deleteObject(this.level.enemies, enemy);
          }
          bottle.isHitEnemy = false;
        }
        if(bottle.y > 500){
          this.deleteObject(this.throwableObjects, bottle);
        }
      })
    })
  }

  checkThrow() {
    if (this.isThrowing()) {
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
    }
}

  isThrowing(){
    return this.keyboard.THROW && this.statusbarBottles.setBottle > 0;
      
  }

  positionBottleStartX(){
    return this.character.x_fix + this.character.width_fix * 0.5;
  }

  positionBottleStartY(){
    return this.character.y_fix + this.character.height_fix * 0.2;
  }

  deleteObject(path, object){
    path.splice(path.indexOf(object), 1);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //clear canvas!

    this.ctx.translate(this.camera_x, 0);
    
    this.level.backgroundLayers.forEach( bg => this.addArrayToWorld(bg));
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
    // object.drawHitBox(this.ctx);

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

  /**Check which endscreen should load. */
  checkEndscreen(){
    let endboss = this.enemy.find(e => e instanceof Endboss);
    
    if (this.character.energy == 0) {
      bossMusic.pause();
      looseSound.play();
      let path = "./assets/img/9_intro_outro_screens/game_over/oh no you lost!.png";
      this.stopGame(path);
    }else if (endboss.energy == 0) {
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
  stopGame(path){
    let endscreen = document.getElementById('endscreen');
    let imgEndscreen = document.getElementById('img-endscreen');

    imgEndscreen.src = path;
    setTimeout(() => {
      endscreen.classList.remove('d-none');
      stopInterval = true;
    }, 1000);
  }
}
