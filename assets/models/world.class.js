class World {
  canvas;
  ctx; //context
  character = new Character(); //Erstellt aus der Schablone ein Objekt
  enemies = [new Chicken(), new Chicken(), new Chicken(), new BabyChicken(), new BabyChicken(), new BabyChicken(),];
  clouds = [
    new Cloud('./assets/img/5_background/layers/4_clouds/1.png', 100),
    new Cloud('./assets/img/5_background/layers/4_clouds/2.png', 500),
  ];
  backgroundLayers = [
    new BackgroundLayer('./assets/img/5_background/layers/air.png', 0),
    new BackgroundLayer('./assets/img/5_background/layers/3_third_layer/1.png', 0),
    new BackgroundLayer('./assets/img/5_background/layers/2_second_layer/1.png', 0),
    new BackgroundLayer('./assets/img/5_background/layers/1_first_layer/1.png', 0),

    new BackgroundLayer('./assets/img/5_background/layers/air.png', canvas.width),
    new BackgroundLayer('./assets/img/5_background/layers/3_third_layer/2.png', canvas.width),
    new BackgroundLayer('./assets/img/5_background/layers/2_second_layer/2.png', canvas.width),
    new BackgroundLayer('./assets/img/5_background/layers/1_first_layer/2.png', canvas.width),
  ]

  constructor(canvas){
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.draw();
  }

  draw(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //clear canvas!

    this.addArrayToWorld(this.backgroundLayers);
    this.addArrayToWorld(this.clouds);
    this.addArrayToWorld(this.enemies);

    this.addToWorld(this.character);

    
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
    this.ctx.drawImage(object.img, object.x, object.y, object.width, object.height);
  }
}
