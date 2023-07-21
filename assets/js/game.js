let canvas;
let world;
let keyboard = new Keyboard();
let stopInterval;
let assetsCharacter = new AssetsCharacter();
let isFullscreen;

function init() {
  checkLandscapeMode();
  fitToScreen();
  canvas = document.getElementById("canvas");
  canvasWidth = canvas.width;
  bindBtnsPressEvents();
}

/** Start Game / Reloade url */
function startGame(mode) {
  if (mode == "start") {
    document.getElementById("start-screen").classList.add("d-none");
    world = new World(canvas, keyboard); // load the class World as template -> object
  } else {
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

function toggleOptions(){
  document.getElementById('options-div').classList.toggle('d-none');
}

/** Is height > width, use landscape mode */
function checkLandscapeMode() {
  if (screen.availHeight > screen.availWidth) {
    this.document.getElementById("rotateDevice-screen").classList.remove("d-none");
    this.document.getElementById("screen").classList.add("d-none");
  } else {
    this.document.getElementById("rotateDevice-screen").classList.add("d-none");
    this.document.getElementById("screen").classList.remove("d-none");
  }
}

/** If window shrink, add zoom to the screen */
function fitToScreen(){
  let bodyWidth = document.getElementById('body').clientWidth;
  let bodyHeight = document.getElementById('body').clientHeight;
  if (bodyWidth < 725) {
      let zoomFactorW = (bodyWidth / 725);
      document.getElementById('screen').style = `zoom:${zoomFactorW}; ,-moz-transform: scale(${zoomFactorW});`;
      document.getElementById('controller-div').classList.remove('d-none');
  } else if (bodyHeight < 485 || isFullscreen) {
      let zoomFactorH = (bodyHeight / 485);
      document.getElementById('screen').style = `zoom:${zoomFactorH}; ,-moz-transform: scale(${zoomFactorH});`;
      document.getElementById('controller-div').classList.remove('d-none');
  } else {
      document.getElementById('screen').style = `zoom:1; ,-moz-transform: scale(1);`;
      document.getElementById('controller-div').classList.add('d-none');
  }
}

function toggleFullscreen() {
  if (isFullscreen) {
    document.exitFullscreen();
    isFullscreen = false;
  } else {
    document.getElementById("body").requestFullscreen();
    isFullscreen = true;
  }
}

/** add touchable btns */
function bindBtnsPressEvents() {
  document.getElementById("btn-left").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.LEFT = true;
  });
  document.getElementById("btn-left").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.LEFT = false;
  });

  document.getElementById("btn-right").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.RIGHT = true;
  });
  document.getElementById("btn-right").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.RIGHT = false;
  });

  document.getElementById("btn-jump").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.UP = true;
  });
  document.getElementById("btn-jump").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.UP = false;
  });

  document.getElementById("btn-throw").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.THROW = true;
  });
  document.getElementById("btn-throw").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.THROW = false;
  });
}
