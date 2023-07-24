function toggleOptions() {
  let options = document.getElementById("options-div");
  options.classList.toggle("d-none");
  togglePausedInterval(options);
  playMenuMusic(options);
}

function toggleInstruction() {
  let instruction = document.getElementById("instruction");
  instruction.classList.toggle("d-none");
  togglePausedInterval(instruction);
  playMenuMusic(instruction);
}

/** Is height > width, use landscape mode */
function checkLandscapeMode() {
  if (screen.availHeight > screen.availWidth) {
    this.document
      .getElementById("rotateDevice-screen")
      .classList.remove("d-none");
    this.document.getElementById("screen").classList.add("d-none");
  } else {
    this.document.getElementById("rotateDevice-screen").classList.add("d-none");
    this.document.getElementById("screen").classList.remove("d-none");
  }
}

/** If window shrink, add zoom to the screen */
function fitToScreen() {
  let bodyWidth = document.getElementById("body").clientWidth;
  let bodyHeight = document.getElementById("body").clientHeight;
  if (bodyWidth < 725) {
    let zoomFactorW = bodyWidth / 725;
    document.getElementById(
      "screen"
    ).style = `zoom:${zoomFactorW}; ,-moz-transform: scale(${zoomFactorW});`;
    document.getElementById("controller-div").classList.remove("d-none");
  } else if (bodyHeight < 485 || isFullscreen) {
    let zoomFactorH = bodyHeight / 485;
    document.getElementById(
      "screen"
    ).style = `zoom:${zoomFactorH}; ,-moz-transform: scale(${zoomFactorH});`;
    document.getElementById("controller-div").classList.remove("d-none");
  } else {
    document.getElementById(
      "screen"
    ).style = `zoom:1; ,-moz-transform: scale(1);`;
    document.getElementById("controller-div").classList.add("d-none");
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