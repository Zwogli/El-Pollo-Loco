let canvas;
let world;
let keyboard = new Keyboard();



function init() {
  canvas = document.getElementById("canvas");
  canvasWidth = canvas.width;
  world = new World(canvas, keyboard); // lädt die Schablone World, mit Character und Enemies

  console.log(world.character);
}