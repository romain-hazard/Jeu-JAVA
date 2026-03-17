import * as fct from "/src/js/fonctions.js";

var player; 
var clavier;
var groupe_plateformes;
var monster;


export default class selection extends Phaser.Scene {
  constructor() {
    super({ key: "selection" }); 
  }
 
  preload() {


    this.load.spritesheet("Sprite_monster","src/assets/Sprite_monster.png",{
      frameWidth: 65,
      frameHeight: 77,
    }
    );

    this.load.spritesheet("Sprite_monster_2","src/assets/Sprite_monster_2.png",{
      frameWidth: 65,
      frameHeight: 77,
    }
    );



    this.load.image("img_ciel", "src/assets/sky.png");
    this.load.image("img_plateforme", "src/assets/platform.png");

    this.load.spritesheet("img_perso", "src/assets/Spritesheet.jpg", {
      frameWidth: 55,
      frameHeight: 61,
    });
    this.load.spritesheet("img_perso2", "src/assets/Spritesheet2.jpg", {
      frameWidth: 55,
      frameHeight: 61,
    });


    
    this.load.image("img_ciel", "src/assets/sky.png");
    this.load.image("img_plateforme", "src/assets/platform.png");
    /*this.load.spritesheet("img_perso", "src/assets/dude.png", {
      frameWidth: 40,
      frameHeight: 55,
    });*/
    this.load.image("img_porte1", "src/assets/door1.png");
    this.load.image("img_porte2", "src/assets/door2.png");
    this.load.image("img_porte3", "src/assets/door3.png");
  }

  create() {


      fct.doNothing();
      fct.doAlsoNothing();

 
    this.add.image(400, 300, "img_ciel");

    groupe_plateformes = this.physics.add.staticGroup();
  
    groupe_plateformes.create(200, 584, "img_plateforme");
    groupe_plateformes.create(600, 584, "img_plateforme");

  
    groupe_plateformes.create(600, 450, "img_plateforme");
    groupe_plateformes.create(50, 300, "img_plateforme");
    groupe_plateformes.create(750, 270, "img_plateforme");


    this.porte1 = this.physics.add.staticSprite(600, 414, "img_porte1");
    this.porte2 = this.physics.add.staticSprite(50, 264, "img_porte2");
    this.porte3 = this.physics.add.staticSprite(750, 234, "img_porte3");
    this.porte4 = this.physics.add.staticSprite(600, 234, "img_porte3");
    
    
    player = this.physics.add.sprite(100, 450, "img_perso");
    monster=this.physics.add.sprite(200,300,"Sprite_monster");
    monster.setBounce(1); 
    monster.setCollideWorldBounds(true); 
   
    player.setBounce(0.2); 
    player.setCollideWorldBounds(true); 

    this.anims.create({
      key: "anim_tourne_gauche", 
      frames: this.anims.generateFrameNumbers("img_perso", {
        start: 0,
        end: 8,
      }), 
      frameRate: 10, 
      repeat: -1 
    });

    
    this.anims.create({
      key: "anim_face",
      frames: [{ key: "img_perso", frame: 7 }],
      frameRate: 20
    });

    this.anims.create({
      key: "anim_tourne_droite",
      frames: this.anims.generateFrameNumbers("img_perso2", {
        start: 0,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1
    });

 this.anims.create({
      key: "anim_tourne_gauche_m", 
      frames: this.anims.generateFrameNumbers("Sprite_monster_2", {
        start: 23,
        end: 26,
      }), 
      frameRate: 10, 
      repeat: -1 
    });

    
    this.anims.create({
      key: "anim_face_m",
      frames: [{ key: "Sprite_monster", frame: 7 }],
      frameRate: 20
    });

    this.anims.create({
      key: "anim_tourne_droite_m",
      frames: this.anims.generateFrameNumbers("Sprite_monster", {
        start: 23,
        end: 26,
      }),
      frameRate: 10,
      repeat: -1
    });
    
   
    clavier = this.input.keyboard.createCursorKeys();
   
    this.physics.add.collider(player, groupe_plateformes);
    this.physics.add.collider(monster, groupe_plateformes);
    this.physics.add.collider(player, monster);

    monster.body.allowGravity = false;


    monster.setMaxVelocity(150, 150);
    monster.setDrag(50, 50);

  }



  update() {


if (Phaser.Math.Between(0, 100) < 2) { 
    monster.setVelocity(
      Phaser.Math.Between(-150, 150),
      Phaser.Math.Between(-150, 150)
    );
  }
  if (monster.body.velocity.x < 0) {
  monster.anims.play("anim_tourne_gauche_m", true);
} 
else if (monster.body.velocity.x > 0) {
  monster.anims.play("anim_tourne_droite_m", true);
}
    
    
    if (clavier.left.isDown) {
      player.setVelocityX(-160);
      player.anims.play("anim_tourne_gauche", true);
    } else if (clavier.right.isDown) {
      player.setVelocityX(160);
      player.anims.play("anim_tourne_droite", true);
    } else {
      player.setVelocityX(0);
      player.anims.play("anim_face");
    }

    if (clavier.up.isDown && player.body.touching.down) {
      player.setVelocityY(-330);
    }

    if (Phaser.Input.Keyboard.JustDown(clavier.space) == true) {
      if (this.physics.overlap(player, this.porte1))
        this.scene.switch("niveau1");
      if (this.physics.overlap(player, this.porte2))
        this.scene.switch("niveau2");
      if (this.physics.overlap(player, this.porte3))
        this.scene.switch("niveau3");
      if (this.physics.overlap(player, this.porte4))
        this.scene.switch("accueil");
    }
  }
}
