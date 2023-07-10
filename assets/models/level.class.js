class Level{
  levelArea_start;
  levelArea_end;
  enemies;
  coins;
  bottles;
  clouds;
  backgroundLayers;

  constructor(levelArea, enemies, coins, bottles, clouds, backgroundLayers){
    this.levelArea(levelArea);
    this.enemies = enemies;
    this.coins = coins;
    this.bottles = bottles;
    this.clouds = clouds;
    this.backgroundLayers = backgroundLayers;
  }

  levelArea(levelArea){
    this.levelArea_start = levelArea[0];
    this.levelArea_end = levelArea[1];
  }
}