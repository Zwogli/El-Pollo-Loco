let canvas;
let world;
let keyboard = new Keyboard();
let stopInterval;

function init() {
  canvas = document.getElementById("canvas");
  canvasWidth = canvas.width;
}

function startGame(mode){
  if(mode == 'start'){
    document.getElementById('start-screen').classList.add('d-none');
    world = new World(canvas, keyboard); // load the class World as template -> object
  }else{
    let endscreenLost  = document.getElementById(`endscreen-${mode}`)
    endscreenLost.classList.add('d-none');
    stopInterval = undefined;
    world = new World(canvas, keyboard); // load the class World as template -> object
  }
  console.log(world.character);
}

/** Start and Stop game intervalls */
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