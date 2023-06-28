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
  // console.log(event.keyCode, keyboard);
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
  // console.log(event.keyCode, keyboard);
})