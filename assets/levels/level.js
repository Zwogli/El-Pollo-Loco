function initLevel(lvlNumber){
  if(lvlNumber == 0){
    return new Level(
      createAreaLevel1(),
      createEnemiesLevel1(),
      createCoinsLevel1(),
      createBottlesLevel1(),
      createCloudsLevel1(),
      createBackgrounds(),
    )
  }
}

/** Define start, end level */
function createAreaLevel1(){
  return [- 720 * 1.5, 720 * 4];
}

function createEnemiesLevel1(){
return [
  new Chicken(550), 
  new Chicken(850),
  new Chicken(1200),
  new BabyChicken(-300, 6000),
  new BabyChicken(-500, 4000),
  new BabyChicken(-400, 5000), 
  new BabyChicken(600, 2500), 
  new BabyChicken(1100, 3200),
  new Endboss(assetsEndboss),
];
}

function createCoinsLevel1(){
  return[
    new Coins(- 720 * 2 + 400, 150),
    new Coins(- 720 * 2 + 550, 80),
    new Coins(- 720 * 2 + 700, 150),
    new Coins(500, 100),
    new Coins(720 * 2 - 300, 50),
  ]
}

function createBottlesLevel1(){
  return[
    new Bottles('./assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png', -600, 350),
    new Bottles('./assets/img/6_salsa_bottle/salsa_bottle.png', -500, 200),
    new Bottles('./assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 300, 370),
    new Bottles('./assets/img/6_salsa_bottle/salsa_bottle.png', 720, 200),
    new Bottles('./assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 720 * 2 + 400, 350),
  ]
}

function createCloudsLevel1(){
  return [
      new Cloud('assets/img/5_background/layers/4_clouds/full.png', -2000),
      new Cloud('assets/img/5_background/layers/4_clouds/full.png', -1050),
    ];
}

function createBackgrounds(){
  return [
    createBgLayerAirLevel1(),
    createBgLayer3Level1(),
    createBgLayer2Level1(),
    createBgLayer1Level1(),
]
}

function createBgLayerAirLevel1(){
return [
  new BackgroundLayer('./assets/img/5_background/layers/air.png', - 720 * 2, 0),
  new BackgroundLayer('./assets/img/5_background/layers/air.png', -720, 0),
  new BackgroundLayer('./assets/img/5_background/layers/air.png', 720 - 720, 0),
  new BackgroundLayer('./assets/img/5_background/layers/air.png', 720, 0),
  new BackgroundLayer('./assets/img/5_background/layers/air.png', 720 * 2, 0),
  new BackgroundLayer('./assets/img/5_background/layers/air.png', 720 * 3, 0),
  new BackgroundLayer('./assets/img/5_background/layers/air.png', 720 * 4, 0),
  new BackgroundLayer('./assets/img/5_background/layers/air.png', 720 * 5, 0),
]
}

function createBgLayer1Level1(){
return [
  new BackgroundLayer('./assets/img/5_background/layers/1_first_layer/1.png', - 720 * 2, 0),
  new BackgroundLayer('./assets/img/5_background/layers/1_first_layer/2.png', -720, 0),
  new BackgroundLayer('./assets/img/5_background/layers/1_first_layer/1.png', 720 - 720, 0),
  new BackgroundLayer('./assets/img/5_background/layers/1_first_layer/2.png', 720, 0),
  new BackgroundLayer('./assets/img/5_background/layers/1_first_layer/1.png', 720 * 2, 0),
  new BackgroundLayer('./assets/img/5_background/layers/1_first_layer/2.png', 720 * 3, 0),
  new BackgroundLayer('./assets/img/5_background/layers/1_first_layer/1.png', 720 * 4, 0),
  new BackgroundLayer('./assets/img/5_background/layers/1_first_layer/2.png', 720 * 5, 0),
]
}

function createBgLayer2Level1(){
return [
  new BackgroundLayer('./assets/img/5_background/layers/2_second_layer/1.png', - 720 * 2, -1),
  new BackgroundLayer('./assets/img/5_background/layers/2_second_layer/2.png', -720, -1),
  new BackgroundLayer('./assets/img/5_background/layers/2_second_layer/1.png', 720 - 720, -1),
  new BackgroundLayer('./assets/img/5_background/layers/2_second_layer/2.png', 720, -1),
  new BackgroundLayer('./assets/img/5_background/layers/2_second_layer/1.png', 720 * 2, -1),
  new BackgroundLayer('./assets/img/5_background/layers/2_second_layer/2.png', 720 * 3, -1),
  new BackgroundLayer('./assets/img/5_background/layers/2_second_layer/1.png', 720 * 4, -1),
  new BackgroundLayer('./assets/img/5_background/layers/2_second_layer/2.png', 720 * 5, -1),
]
}

function createBgLayer3Level1(){
return [
  new BackgroundLayer('./assets/img/5_background/layers/3_third_layer/1.png', - 720 * 2, -2),
  new BackgroundLayer('./assets/img/5_background/layers/3_third_layer/2.png', -720, -2),
  new BackgroundLayer('./assets/img/5_background/layers/3_third_layer/1.png', 720 - 720, -2),
  new BackgroundLayer('./assets/img/5_background/layers/3_third_layer/2.png', 720, -2),
  new BackgroundLayer('./assets/img/5_background/layers/3_third_layer/1.png', 720 * 2, -2),
  new BackgroundLayer('./assets/img/5_background/layers/3_third_layer/2.png', 720 * 3, -2),
  new BackgroundLayer('./assets/img/5_background/layers/3_third_layer/1.png', 720 * 4, -2),
  new BackgroundLayer('./assets/img/5_background/layers/3_third_layer/2.png', 720 * 5, -2),
]
}