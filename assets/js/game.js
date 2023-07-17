let canvas;
let world;
let keyboard = new Keyboard();
let intervallIds = [];
let stopIntervall = null;



function init() {
  canvas = document.getElementById("canvas");
  canvasWidth = canvas.width;
  world = new World(canvas, keyboard); // lädt die Schablone World, mit Character und Enemies

  console.log(world.character);
  // setInterval(stopGame, 1000/60)
}

function stopGame(){
  if (!stopIntervall) {
    intervallIds.forEach(id => {
      setInterval(id);
    });
  }else{
      console.log('hi')
      intervallIds.forEach(id => {
        clearInterval(id);
      });
    }
}

window.addEventListener("resize", () =>{
  if(window.innerWidth < 720){
    document.getElementById('screen-canvas').classList.add('d-none');
    document.getElementById('device-screen').classList.remove('d-none');
  }else{
    document.getElementById('screen-canvas').classList.remove('d-none');
    document.getElementById('device-screen').classList.add('d-none');
  }
});

