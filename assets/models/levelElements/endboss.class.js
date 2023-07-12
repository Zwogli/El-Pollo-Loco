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
  offset_x = 20;
  offset_y = 60;
  offset_width = -30;
  offset_height = -90;
  world;
  endbossTrigger = false;
  speed = 1;
  triggerDelay = 0;


  constructor(){
    super().loadImage(this.IMAGES_ALERT[1]);
    this.renderImages();
    this.x = canvas.width * 3 + 200;;  //canvas.width * 3 + 200;
    this.energy = 40;
    let self = this;
    let checkInervall = setInterval(this.enbossIntervall, 1000/60, self)
    let animateInervall = setInterval(this.enbossAnimation, 200, self)
  }

  renderImages(){
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
  }

  // todo
  enbossAnimation(self){
    if (self.isDead()) {
      self.playAnimation(self.IMAGES_DEAD);
    }else if(self.isHurt()){
      self.playAnimation(self.IMAGES_HURT);
    }else if (self.isBeginnigMoveset()) {
      self.playAnimation(self.IMAGES_WALKING);
    }else if(self.endbossTrigger){
      self.playAnimation(self.IMAGES_ALERT);
    }
  }
  
  enbossIntervall(self){
    if(self.characterIsNearEndboss() && !self.triggerDelay){
      console.log(self.triggerDelay)
      self.endbossTrigger = true;
      self.triggerDelay = new Date().getTime();
      console.log(self.triggerDelay)
    }else if (self.isAlarmed() && self.triggerDelay) {
      self.moveLeft();
  }
    
    self.setFixedPosition();
  }

  characterIsNearEndboss(){
    return this.world.character.x > this.world.canvas.width * 2.5 + 200
  }

  isAlarmed() {
    let timepassed = new Date().getTime() - this.triggerDelay; // difference in ms
    timepassed = timepassed / 1000; // difference ins s
    return timepassed > 1; 
  }

  isBeginnigMoveset(){
    return this.isAlarmed() && this.triggerDelay;
  }
}