function initLevel(lvlNumber){
  if(lvlNumber == 0){
    return new Level(
      createLevel1Area(),
      createLevel1Enemies(),
      createLevel1Coins(),
      createLevel1Bottles(),
      createLevel1Clouds(),
      createLevel1BackgroundLayers(),
    )
  }
}

function createLevel1Area(){
  return [- canvas.width * 1.5, canvas.width * 3];
}

function createLevel1Enemies(){
return [
  new Chicken(550), 
  new Chicken(850),
  new Chicken(1200),
  new BabyChicken(-300, 6000),
  new BabyChicken(-500, 4000),
  new BabyChicken(-400, 5000), 
  new BabyChicken(600, 2500), 
  new BabyChicken(1100, 3200),
  new Endboss(),
];
}

function createLevel1Coins(){
  return[
    new Coins(- canvas.width * 2 + 400, 150),
    new Coins(- canvas.width * 2 + 550, 80),
    new Coins(- canvas.width * 2 + 700, 150),
    new Coins(500, 100),
    new Coins(canvas.width * 2 - 300, 50),
  ]
}

function createLevel1Bottles(){
  return[
    new Bottles('./assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png', -600, 350),
    new Bottles('./assets/img/6_salsa_bottle/salsa_bottle.png', -500, 200),
    new Bottles('./assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 300, 370),
    new Bottles('./assets/img/6_salsa_bottle/salsa_bottle.png', canvas.width, 200),
    new Bottles('./assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png', canvas.width * 2 + 400, 350),
  ]
}

function createLevel1Clouds(){
  return [
      new Cloud('assets/img/5_background/layers/4_clouds/full.png', -1050),
    ];
}

function createLevel1BackgroundLayers(){
  return [
    // canvas.width
    new BackgroundLayer('./assets/img/5_background/layers/air.png', - canvas.width * 2),
    new BackgroundLayer('./assets/img/5_background/layers/3_third_layer/1.png', - canvas.width * 2),
    new BackgroundLayer('./assets/img/5_background/layers/2_second_layer/1.png', - canvas.width * 2),
    new BackgroundLayer('./assets/img/5_background/layers/1_first_layer/1.png', - canvas.width * 2),
    new BackgroundLayer('./assets/img/5_background/layers/air.png', -canvas.width),
    new BackgroundLayer('./assets/img/5_background/layers/3_third_layer/2.png', -canvas.width),
    new BackgroundLayer('./assets/img/5_background/layers/2_second_layer/2.png', -canvas.width),
    new BackgroundLayer('./assets/img/5_background/layers/1_first_layer/2.png', -canvas.width),

    new BackgroundLayer('./assets/img/5_background/layers/air.png', canvas.width - canvas.width),
    new BackgroundLayer('./assets/img/5_background/layers/3_third_layer/1.png', canvas.width - canvas.width),
    new BackgroundLayer('./assets/img/5_background/layers/2_second_layer/1.png', canvas.width - canvas.width),
    new BackgroundLayer('./assets/img/5_background/layers/1_first_layer/1.png', canvas.width - canvas.width),
    new BackgroundLayer('./assets/img/5_background/layers/air.png', canvas.width),
    new BackgroundLayer('./assets/img/5_background/layers/3_third_layer/2.png', canvas.width),
    new BackgroundLayer('./assets/img/5_background/layers/2_second_layer/2.png', canvas.width),
    new BackgroundLayer('./assets/img/5_background/layers/1_first_layer/2.png', canvas.width),

    new BackgroundLayer('./assets/img/5_background/layers/air.png', canvas.width * 2),
    new BackgroundLayer('./assets/img/5_background/layers/3_third_layer/1.png', canvas.width * 2),
    new BackgroundLayer('./assets/img/5_background/layers/2_second_layer/1.png', canvas.width * 2),
    new BackgroundLayer('./assets/img/5_background/layers/1_first_layer/1.png', canvas.width * 2),
    new BackgroundLayer('./assets/img/5_background/layers/air.png', canvas.width * 3),
    new BackgroundLayer('./assets/img/5_background/layers/3_third_layer/2.png', canvas.width * 3),
    new BackgroundLayer('./assets/img/5_background/layers/2_second_layer/2.png', canvas.width * 3),
    new BackgroundLayer('./assets/img/5_background/layers/1_first_layer/2.png', canvas.width * 3),
  ];
}