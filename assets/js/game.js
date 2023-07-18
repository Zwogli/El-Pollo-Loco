let canvas;
let world;
let keyboard = new Keyboard();
// let intervalIDs = []; //todo
let stopInterval;

function init() {
  canvas = document.getElementById("canvas");
  canvasWidth = canvas.width;
  
  //todo setInterval(stopGame, 1000/60)
}

function startGame(){
  document.getElementById('start-screen').classList.add('d-none');
  world = new World(canvas, keyboard); // lädt die Schablone World, mit Character und Enemies

  console.log(world.character);
}

/* todo         
function stopGame(){
  if (!stopInterval) {
    intervalIDs.forEach(id => {
      setInterval(id);
    });
  }
  if (pausableIntervall) {
    console.log('hi')
    intervalIDs.forEach(id => {
      clearInterval(id);
    });
  }
}
*/

function setPausableInterval(fn, time) {
  let intervalID;
  setInterval(() => {
    if (stopInterval) {
      clearInterval(intervalID);
      intervalID = undefined;
      return;
    }
    if (!intervalID) {
      intervalID = setInterval(fn, time);
    }
  }, 60);
}

window.addEventListener("resize", () => {
  if (window.innerWidth < 720) {
    document.getElementById("screen-canvas").classList.add("d-none");
    document.getElementById("device-screen").classList.remove("d-none");
  } else {
    document.getElementById("screen-canvas").classList.remove("d-none");
    document.getElementById("device-screen").classList.add("d-none");
  }
});
