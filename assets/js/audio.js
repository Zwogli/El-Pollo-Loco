// Character sounds
characterWalkingSound = new Audio('./assets/audio/character/walking.mp3');
characterJumpSound = new Audio('./assets/audio/character/jump.wav');
characterHurtSound = new Audio('assets/audio/character/hurt.wav');
// Endboss sounds
endbossHurtSound = new Audio('./assets/audio/endboss/endbosshurt.wav');
endbossDeadSound = new Audio('assets/audio/endboss/endbossdead.wav');
// Collectable sound
collectBottleSound = new Audio('./assets/audio/bottle/collectbottle.wav');
throwBottleSound = new Audio('./assets/audio/bottle/throw.mp3');
// Background music
menuSound = new Audio('./assets/audio/Komiku_-_13_-_Good_Fellow.mp3');
gameMusic = new Audio('./assets/audio/background.mp3');
bossMusic = new Audio('./assets/audio/backgroundBossFight.wav');
looseSound = new Audio('./assets/audio/backgroundLoose.mp3');
winSound = new Audio('./assets/audio/backgroundWin.wav');

let muteSoundToggle = false;

function volumeControllSound(vol){
    characterWalkingSound.volume = vol;
    characterJumpSound.volume = vol;
    characterHurtSound.volume = vol;
    endbossHurtSound.volume = vol;
    endbossDeadSound.volume = vol;
    collectBottleSound.volume = vol;
    throwBottleSound.volume = vol;
}

function volumeControllMusic(vol){
    menuSound.volume = vol;
    gameMusic.volume = vol;
    bossMusic.volume = vol;
    looseSound.volume = vol;
    winSound.volume = vol;
}

function checkMute(){
    let mute = document.getElementById('mute');
    if(!mute.checked){
        volumeControllSound(0.3);
        volumeControllMusic(0.3);
    }else{
        volumeControllSound(0);
        volumeControllMusic(0);
    }
}