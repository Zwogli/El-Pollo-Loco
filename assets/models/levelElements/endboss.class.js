class Endboss extends MovableObject{
  IMAGES_WALKING = [
    './assets/img/4_enemie_boss_chicken/1_walk/G1.png',
    './assets/img/4_enemie_boss_chicken/1_walk/G2.png',
    './assets/img/4_enemie_boss_chicken/1_walk/G3.png',
    './assets/img/4_enemie_boss_chicken/1_walk/G4.png',
  ];
  IMAGES_ALERT = [
    './assets/img/4_enemie_boss_chicken/2_alert/G5.png',
    './assets/img/4_enemie_boss_chicken/2_alert/G6.png',
    './assets/img/4_enemie_boss_chicken/2_alert/G7.png',
    './assets/img/4_enemie_boss_chicken/2_alert/G8.png',
    './assets/img/4_enemie_boss_chicken/2_alert/G9.png',
    './assets/img/4_enemie_boss_chicken/2_alert/G10.png',
    './assets/img/4_enemie_boss_chicken/2_alert/G11.png',
    './assets/img/4_enemie_boss_chicken/2_alert/G12.png',
  ];
  IMAGES_ATTACK = [
    './assets/img/4_enemie_boss_chicken/3_attack/G13.png',
    './assets/img/4_enemie_boss_chicken/3_attack/G14.png',
    './assets/img/4_enemie_boss_chicken/3_attack/G15.png',
    './assets/img/4_enemie_boss_chicken/3_attack/G16.png',
    './assets/img/4_enemie_boss_chicken/3_attack/G17.png',
    './assets/img/4_enemie_boss_chicken/3_attack/G18.png',
    './assets/img/4_enemie_boss_chicken/3_attack/G19.png',
    './assets/img/4_enemie_boss_chicken/3_attack/G20.png',
  ];
  IMAGES_HURT = [
    './assets/img/4_enemie_boss_chicken/4_hurt/G21.png',
    './assets/img/4_enemie_boss_chicken/4_hurt/G22.png',
    './assets/img/4_enemie_boss_chicken/4_hurt/G23.png',
  ];
  IMAGES_DEAD = [
    './assets/img/4_enemie_boss_chicken/5_dead/G24.png',
    './assets/img/4_enemie_boss_chicken/5_dead/G25.png',
    './assets/img/4_enemie_boss_chicken/5_dead/G26.png',
  ];
  y = 120;
  width = 250;
  height = 350;
  offset = {
    x: 20,
    y: 60,
    width: -30,
    height: -90
  }
  x_attack = 0;
  world;
  endbossTrigger = false;
  speed = 1;
  triggerDelay = 0;


  constructor(){
    super();
    this.renderImages();
    this.renderVariables()

    //todo let self = this;
    // intervallIds.push(setInterval(this.enbossIntervall, 1000/60, self));
    // intervallIds.push(setInterval(this.enbossAnimation, 200, self));

    setPausableInterval(this.enbossIntervall.bind(this), 1000/60);
    setPausableInterval(this.enbossAnimation.bind(this), 200);
  }

  /** Load image, images into the imgCache - drawable-objects */
  renderImages(){
    this.loadImage(this.IMAGES_ALERT[1]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
  }

  /** Set diffrent starting variables */
  renderVariables(){
    this.x = canvas.width * 3 + 200;;  //canvas.width * 3 + 200;
    this.energy = 40;
  }

  /** Intervall method, image animation */
  //todo enbossAnimation(self){
  //   if (self.isDead()) {
  //     self.playAnimation(self.IMAGES_DEAD);
  //   }else if(self.isHurt()){
  //     self.playAnimation(self.IMAGES_HURT);
  //   }else if(self.characterNearAttackRange()){
  //     self.x_attack = -50;
  //     self.playAnimation(self.IMAGES_ATTACK);
  //   }else if (self.isBeginnigMoveset()) {
  //     self.x_attack = 0;
  //     self.playAnimation(self.IMAGES_WALKING);
  //   }else if(self.endbossTrigger){
  //     self.playAnimation(self.IMAGES_ALERT);
  //   }
  // }
  enbossAnimation(){
    if (this.isDead()) {
      this.playAnimation(this.IMAGES_DEAD);
    }else if(this.isHurt()){
      this.playAnimation(this.IMAGES_HURT);
    }else if(this.characterNearAttackRange()){
      this.x_attack = -50;
      this.playAnimation(this.IMAGES_ATTACK);
    }else if (this.isBeginnigMoveset()) {
      this.x_attack = 0;
      this.playAnimation(this.IMAGES_WALKING);
    }else if(this.endbossTrigger){
      this.playAnimation(this.IMAGES_ALERT);
    }
  }
  
  /**Intervall method, for enemie action */
  //todo enbossIntervall(self){
  //   self.setFixedPosition();
  //   if(self.characterTriggerBoss() && !self.triggerDelay){
  //     self.endbossTrigger = true;
  //     self.triggerDelay = new Date().getTime();
  //   }else if (self.isBeginnigMoveset()) {
  //     self.moveLeft();
  // }
  // }
  enbossIntervall(){
    this.setFixedPosition();
    if(this.characterTriggerBoss() && !this.triggerDelay){
      this.endbossTrigger = true;
      this.triggerDelay = new Date().getTime();
    }else if (this.isBeginnigMoveset()) {
      this.moveLeft();
  }
  }

  characterTriggerBoss(){
    return this.world.character.x > this.world.canvas.width * 2.5 + 200
  }

  characterNearAttackRange(){
    let distance = this.x_fix - this.world.character.x_fix + this.world.character.width_fix;
    return distance < 250;
  }

  isAlarmed() {
    let timepassed = new Date().getTime() - this.triggerDelay; // difference in ms
    timepassed = timepassed / 1000; // difference ins s
    return timepassed > 2; 
  }

  isBeginnigMoveset(){
    return this.isAlarmed() && this.triggerDelay && !this.characterNearAttackRange() && !this.isDead();
  }
}