class Endboss extends MovableObject{
  y = 120;
  width = 250;
  height = 350;
  offset = {
    x: 20,
    y: 60,
    width: -30,
    height: -90
  }
  assets;
  x_attack = 0;
  world;
  endbossTrigger = false;
  speed = 1;
  triggerDelay = 0;


  constructor(assets){
    super();
    this.assets = assets;
    this.renderImages();
    this.renderVariables()

    setPausableInterval(this.enbossIntervall.bind(this), 1000/60);
    setPausableInterval(this.enbossAnimation.bind(this), 200);
  }

  /** Load image, images into the imgCache - drawable-objects */
  renderImages(){
    this.loadImage(this.assets.IMAGES_ALERT[1]);
    this.loadImages(this.assets.IMAGES_WALKING);
    this.loadImages(this.assets.IMAGES_ALERT);
    this.loadImages(this.assets.IMAGES_ATTACK);
    this.loadImages(this.assets.IMAGES_HURT);
    this.loadImages(this.assets.IMAGES_DEAD);
  }

  /** Set diffrent starting variables */
  renderVariables(){
    this.x = 720 * 3 + 200;
    this.energy = 60;
  }

  pauseAudio(){
    endbossDeadSound.pause();
    endbossHurtSound.pause();
  }

  /** Intervall method, image animation */
  enbossAnimation(){
    this.pauseAudio();
    if (this.isDead()) {
      endbossDeadSound.play();
      this.playAnimation(this.assets.IMAGES_DEAD);
    }else if(this.isHurt()){
      this.speed += 0.3;
      endbossHurtSound.play()
      this.playAnimation(this.assets.IMAGES_HURT);
    }else if(this.characterNearAttackRangeLeft()){
      this.x_attack = -50;
      this.playAnimation(this.assets.IMAGES_ATTACK);
    }else if(this.characterNearAttackRangeRight()){
      this.x_attack =+ 50;
      this.playAnimation(this.assets.IMAGES_ATTACK);
    }else if (this.isBeginnigMoveset()) {
      this.x_attack = 0;
      this.playAnimation(this.assets.IMAGES_WALKING);
    }else if(this.endbossTrigger){
      gameMusic.pause();
      bossMusic.play();
      this.playAnimation(this.assets.IMAGES_ALERT);
    }
  }
  
  /**Intervall method, for enemie action */
  enbossIntervall(){
    this.setFixedPosition();
    if(this.characterTriggerBoss() && !this.triggerDelay){
      this.endbossTrigger = true;
      this.triggerDelay = new Date().getTime();
    }else if (this.isBeginnigMoveset()) {
      if(this.characterIsLeft()){
        this.otherDirection = false;
        this.moveLeft();
      }else if(this.characterIsRight()){
        this.otherDirection = true;
        this.moveRight()
      }
  }
  }

  characterTriggerBoss(){
    return this.world.character.x > 720 * 2.5 + 200
  }

  characterIsLeft(){
    return this.world.character.x_fix + this.world.character.width_fix < this.x_fix;
  }

  characterIsRight(){
    return this.world.character.x_fix > this.x_fix + this.width_fix;
  }

  characterNearAttackRangeLeft(){
    let distanceLeft = this.x_fix - this.world.character.x_fix + this.world.character.width_fix;
    return distanceLeft < 250 && distanceLeft > 0;
  }

  characterNearAttackRangeRight(){
    let distanceRight =  this.world.character.x_fix - this.x_fix
    return distanceRight < 250 && distanceRight > 0;
  }

  /** Moveset delay */
  isAlarmed() {
    let timepassed = new Date().getTime() - this.triggerDelay; // difference in ms
    timepassed = timepassed / 1000; // difference ins s
    return timepassed > 2; 
  }

  isBeginnigMoveset(){
    return this.isAlarmed() && this.triggerDelay && !this.characterNearAttackRangeLeft() && !this.isDead() ||
    this.isAlarmed() && this.triggerDelay && !this.characterNearAttackRangeRight() && !this.isDead();
  }
}