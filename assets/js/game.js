let canvas;
let world;



function init() {
  canvas = document.getElementById("canvas");
  canvasWidth = canvas.width;
  world = new World(canvas); // lädt die Schablone World, mit Character und Enemies

  console.log(world.character);
}
