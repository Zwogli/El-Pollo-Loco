class World {
  canvas;
  ctx; //context
  keyboard;
  keyboard = new Keyboard();
  camera_x;
  level;
  character = new Character(); //Erstellt aus der Schablone ein Objekt
  enemy = [];
  statusbarLive = new StatusbarLive();
  statusbarCoins = new StatusbarCoins();
  statusbarBottles = new StatusbarBottles();
  throwableObjects = [];

  constructor(canvas, keyboard) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.keyboard = keyboard;
    this.level = initLevel(0); //generate level object
    this.level.enemies.forEach(arrayEnemy => {
      this.enemy.push(arrayEnemy);
    });
    // this.endboss = this.level.enemies.find(e => e instanceof Endboss); // find class Enboss in array
    this.draw();
    this.setWorld();
    let self = this;
    let collisionEnemy = setInterval(this.worldIntervallFast, 1000/60, self);
    let actionFeedback = setInterval(this.worldIntervallSlow, 100, self);
  }

  setWorld() {
    this.character.world = this; //übergibt die world variablen an den Character
    this.level.world = this;
    this.enemy.forEach(arrayEnemy => {
      arrayEnemy.world = this;
    });
  }

  worldIntervallFast(self) {
    self.checkCollisionsEnemies(self);
    self.checkCollisionsCoin(self);
    self.checkCollisionsBottle(self);
    self.checkCollisionThrowBottle(self);
  }

  worldIntervallSlow(self){
    self.checkThrow(self);
  }

  checkCollisionsEnemies(self) {
    self.level.enemies.forEach((enemy) => {
      if (self.isJumpOff(enemy)){
          enemy.energy -= 100;
          self.character.jump(5);
          this.deleteObject(this.level.enemies, enemy);
        }
      else if (self.character.isColliding(enemy)) {
        self.character.hit();
        self.statusbarLive.setPercentageLive(self.character.energy);
      }
    });
  }

  isJumpOff(enemy){
    return this.character.isColliding(enemy) &&
    this.character.isAboveGround() && 
    this.character.isFalling();
  }

  checkCollisionsCoin(self) {
    self.level.coins.forEach((coin) => {
      if (self.character.isColliding(coin)) {
        self.statusbarCoins.collect(coin);
        this.deleteObject(this.level.coins, coin);
      }
    });
  }

  checkCollisionsBottle(self) {
    self.level.bottles.forEach((bottle) => {
      if (self.character.isColliding(bottle)) {
        self.character.collect(bottle);
        this.deleteObject(this.level.bottles, bottle);
      }
    });
  }

  checkCollisionThrowBottle(self){
    self.throwableObjects.forEach((bottle) => {
      self.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy)){
          enemy.hit();
          console.log(enemy.energy)
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

  checkThrow(self) {
      if (self.isThrowing()) {
        self.character.idle_countdown = 0;
        self.character.loadImage("./assets/img/2_character_pepe/2_walk/W-21.png");
        let bottle = new ThrowableObject(
          this.positionBottleStartX(),
          this.positionBottleStartY(),
          this.character.otherDirection
        );
        self.throwableObjects.push(bottle);
        self.character.countBottle(-1);
      }
  }

  isThrowing(){
    return this.keyboard.THROW && this.character.setBottle > 0;
      
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
