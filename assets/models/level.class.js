class Level{
  levelArea_start;
  levelArea_end;
  enemies;
  clouds;
  backgroundLayers;

  constructor(levelArea, enemies, clouds, backgroundLayers){
    this.levelArea_start = levelArea[0];
    this.levelArea_end = levelArea[1];
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundLayers = backgroundLayers;
  }
}