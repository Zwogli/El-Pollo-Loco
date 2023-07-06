class Level{
  levelArea_start;
  levelArea_end;
  enemies;
  bottles;
  clouds;
  backgroundLayers;

  constructor(levelArea, enemies, bottles, clouds, backgroundLayers){
    this.levelArea_start = levelArea[0];
    this.levelArea_end = levelArea[1];
    this.enemies = enemies;
    this.bottles = bottles;
    this.clouds = clouds;
    this.backgroundLayers = backgroundLayers;
  }
}