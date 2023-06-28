class Character extends MovableObject{
  IMAGES_WALKING = [
      './assets/img/2_character_pepe/2_walk/W-21.png',
      './assets/img/2_character_pepe/2_walk/W-22.png',
      './assets/img/2_character_pepe/2_walk/W-23.png',
      './assets/img/2_character_pepe/2_walk/W-24.png',
      './assets/img/2_character_pepe/2_walk/W-25.png',
      './assets/img/2_character_pepe/2_walk/W-26.png',
    ];
    currentImg = 0;
  x = 100;
  y = 150;
  width = 150;
  height = 280;
  world;

  constructor(){
    super().loadImage('./assets/img/2_character_pepe/2_walk/W-21.png');
    this.loadImages(this.IMAGES_WALKING);
    this.animate();
  }

  animate(){
    setInterval(() => {
      let i = this.currentImg % this.IMAGES_WALKING.length; // % = modulo
      let path = this.IMAGES_WALKING[i];
      this.img = this.imgCache[path];
      this.currentImg++;
      if(this.currentImg > 5){
        this.currentImg = 0;
      }
    }, 180);
  }

  jump(){}
}