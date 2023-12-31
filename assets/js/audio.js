// Character sounds
characterWalkingSound = new Audio("./assets/audio/character/walking.mp3");
characterJumpSound = new Audio("./assets/audio/character/jump.wav");
characterHurtSound = new Audio("./assets/audio/character/hurt.wav");
characterDeadSound = new Audio("./assets/audio/character/dead.wav");
// Endboss sounds
endbossHurtSound = new Audio("./assets/audio/endboss/endbosshurt.wav");
endbossDeadSound = new Audio("./assets/audio/endboss/endbossdead.wav");
// Collectable sound
collectCoinSound = new Audio("./assets/audio/coin/coincollect.wav");
collectBottleSound = new Audio("./assets/audio/bottle/collectbottle.wav");
throwBottleSound = new Audio("./assets/audio/bottle/throw.mp3");
// Background music
menuMusic = new Audio("./assets/audio/Komiku_-_13_-_Good_Fellow.mp3");
gameMusic = new Audio("./assets/audio/background.mp3");
bossMusic = new Audio("./assets/audio/backgroundBossFight.wav");
looseSound = new Audio("./assets/audio/backgroundLoose.mp3");
winSound = new Audio("./assets/audio/backgroundWin.wav");
let muteSoundToggle = false;

/** Render sound and music param */
function manageAudio() {
  volumeControllSound(0.3);
  volumeControllMusic(0.3);
}

/** Set Sound param
 * 
 * @param {number} vol - load sound volume param
 */
function volumeControllSound(vol) {
  characterWalkingSound.volume = vol;
  characterJumpSound.volume = vol;
  characterHurtSound.volume = vol;
  characterDeadSound.volume = vol;
  endbossHurtSound.volume = vol;
  endbossDeadSound.volume = vol;
  collectBottleSound.volume = vol;
  throwBottleSound.volume = vol;
}

/** Set Music param
 * 
 * @param {number} vol - load music volume param
 */
function volumeControllMusic(vol) {
  menuMusic.volume = vol;
  gameMusic.volume = vol;
  bossMusic.volume = vol;
  looseSound.volume = vol;
  winSound.volume = vol;
}

/** Check mute checkbox */
function checkMute() {
  let mute = document.getElementById("mute");
  if (!mute.checked) {
    volumeControllSound(0.3);
    volumeControllMusic(0.3);
  } else {
    volumeControllSound(0);
    volumeControllMusic(0);
  }
}

/** Manage Menu Music
 * 
 * @param {Node} id - instruction or option container
 */
function playMenuMusic(id) {
  if (!id.classList.contains("d-none")) {
    gameMusic.pause();
    bossMusic.pause();
    menuMusic.play();
  } else if (isGameStarted) {
    menuMusic.pause();
    if (isGameStarted && world.endboss.characterTriggerBoss()) {
      bossMusic.play();
    } else {
      gameMusic.play();
    }
  }
}
