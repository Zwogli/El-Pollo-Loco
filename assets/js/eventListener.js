/**Set keyboard variable on keydown true*/
window.addEventListener("keydown", (event) => {
  if(event.keyCode == 65){
    keyboard.LEFT = true;
  }
  if(event.keyCode == 68){
    keyboard.RIGHT = true;
  }
  if(event.keyCode == 87){
    keyboard.UP = true;
  }
  if(event.keyCode == 83){
    keyboard.DOWN = true;
  }
  if(event.keyCode == 32){
    keyboard.SPACE = true;
  }
  if(event.keyCode == 70){  // F
    keyboard.THROW = true;
  }
})

/**Set keyboard variable on keyup false*/
window.addEventListener("keyup", (event) => {
  if(event.keyCode == 65){
    keyboard.LEFT = false;
  }
  if(event.keyCode == 68){
    keyboard.RIGHT = false;
  }
  if(event.keyCode == 87){
    keyboard.UP = false;
  }
  if(event.keyCode == 83){
    keyboard.DOWN = false;
  }
  if(event.keyCode == 32){
    keyboard.SPACE = false;
  }
  if(event.keyCode == 70){
    keyboard.THROW = false;
  }
})

/** Check window size */
window.addEventListener("resize", () => {
  if (window.innerWidth < 720) {
    document.getElementById("device-screen").classList.remove("d-none");
    document.getElementById("options-div").style.display = 'none';
    document.getElementById("screen-canvas").classList.add("d-none");
    document.getElementById("start-screen").classList.add("d-none");
  } else {
    document.getElementById("device-screen").classList.add("d-none");
    document.getElementById("options-div").style.display = 'flex';
    document.getElementById("screen-canvas").classList.remove("d-none");
    document.getElementById("start-screen").classList.remove("d-none");
  }
});