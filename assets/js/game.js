let canvas;
let world;
let keyboard = new Keyboard();
let stopInterval;
let assetsCharacter = new AssetsCharacter()

function init() {
  canvas = document.getElementById("canvas");
  canvasWidth = canvas.width;
  // checkWindowWidth();
  bindBtnsPressEvents();
}

function startGame(mode){
  if(mode == 'start'){
    document.getElementById('start-screen').classList.add('d-none');
    world = new World(canvas, keyboard); // load the class World as template -> object
  }else{
   location.reload();
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

// function checkWindowWidth(){
//   setInterval(() => {
//     if(window.innerWidth < 720){
//       document.getElementById("controller-div").style.display = 'flex';
//     }else{
//       document.getElementById("controller-div").style.display = 'none';
//     }
//   }, 100);
// }

function bindBtnsPressEvents(){
  document.getElementById('btn-left').addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.LEFT = true;
});
  document.getElementById('btn-left').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.LEFT = false;
  });

  document.getElementById('btn-right').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.RIGHT = true;
  });
  document.getElementById('btn-right').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.RIGHT = false;
  });

  document.getElementById('btn-jump').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.UP = true;
  });
  document.getElementById('btn-jump').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.UP = false;
  });

  document.getElementById('btn-throw').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.THROW = true;
  });
  document.getElementById('btn-throw').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.THROW = false;
  });
}