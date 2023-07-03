class World {
  canvas;
  ctx; //context
  keyboard;
  level; 
  character = new Character(); //Erstellt aus der Schablone ein Objekt
  keyboard = new Keyboard;
  camera_x;

  constructor(canvas, keyboard){
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.keyboard = keyboard;
    this.level = initLevel(0); //generate level object
    this.draw();
    this.setWorld();
  }

  setWorld(){
    this.character.world = this;  //übergibt die world variablen an den Character
    this.level.world = this;
  }

  draw(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //clear canvas!

    this.ctx.translate(this.camera_x, 0);

    this.addArrayToWorld(this.level.backgroundLayers);
    this.addArrayToWorld(this.level.clouds);
    this.addArrayToWorld(this.level.enemies);

    this.addToWorld(this.character);

    this.ctx.translate(-this.camera_x, 0);

    
    let self = this; // this wird nicht in requestAnimationFrame erkannt, daher wird eine hilfsvariable erzeugt.
    requestAnimationFrame(function(){ //draw() wird immer wieder aufgerufen, um animationen anzuzeigen muss canvas immer wieder gelöscht werden!!
      self.draw();
    });
  }

  addArrayToWorld(array){
    array.forEach(object => { // object = neue Variable für die Array Objekte
      this.addToWorld(object);
    });
  }

  addToWorld(object){
    if(object.otherDirection){
      this.ctx.save(); // saves the entire state of the canvas by pushing the current state onto a stack.
      this.ctx.translate(object.width, 0); // translate(x, y),
      this.ctx.scale(-1, 1); // scale(x, y) adds a scaling transformation to the canvas units horizontally and/or vertically.
      object.x = object.x * -1;
    }

    object.draw(this.ctx);
    object.drawHitBox(this.ctx);

    if(object.otherDirection){
      object.x = object.x * -1;
      this.ctx.restore();
    }
  }
}
