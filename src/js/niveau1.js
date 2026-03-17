import * as fct from "/src/js/fonctions.js";






export default class niveau1 extends Phaser.Scene {

  constructor() {
    super({
      key: "niveau1"
    });
  }

  
  preload() {

    this.load.image("Phaser_tuilesdejeu_1", "src/assets/laboratoire.png");
    this.load.image("Phaser_tuilesdejeu_2", "src/assets/Tiles_scientifique.png");
    this.load.image("Phaser_tuilesdejeu_3", "src/assets/Labo.png");
    this.load.tilemapTiledJSON("carte1", "src/assets/map_niveau_1.json");

    this.load.spritesheet("Sprite_monster_1_", "src/assets/Sprite_monster.png", {
      frameWidth: 65,
      frameHeight: 77,
    }
    );

    this.load.spritesheet("Sprite_monster_2_", "src/assets/Sprite_monster_2.png", {
      frameWidth: 65,
      frameHeight: 77,
    }
    );

    this.load.audio('blob', 'src/assets/sound_monstre.mp3');
    this.load.audio('scream', 'src/assets/sound_scream.mp3');
    this.load.audio('background', 'src/assets/sound_oppressant_acceuile.mp3');






  }

  create() {

    var son_blob;
    var son_scream;
    var son_background;

    this.son_blob = this.sound.add('blob');
    this.son_scream = this.sound.add('scream');
    this.son_background = this.sound.add('background');

    this.son_background.play({
      loop: true,
      volume: 0.5
    });

    const carteDuNiveau1 = this.add.tilemap("carte1");

    fct.doNothing();
    fct.doAlsoNothing();

    const tileset1 = carteDuNiveau1.addTilesetImage(
      "laboratoire",
      "Phaser_tuilesdejeu_1"
    );

    const tileset2 = carteDuNiveau1.addTilesetImage(
      "Tiles_scientifique",
      "Phaser_tuilesdejeu_2"
    );

    const tileset3 = carteDuNiveau1.addTilesetImage(
      "Labo",
      "Phaser_tuilesdejeu_3"
    );


    const calque_background = carteDuNiveau1.createLayer(
      "Calque_de_Tuiles_2",
      [tileset1, tileset2, tileset3]
    );

    const calque_background_2 = carteDuNiveau1.createLayer(
      "fouiller",
      [tileset1, tileset2, tileset3]
    );

    const calque_plateformes = carteDuNiveau1.createLayer(
      "marcher",
      [tileset1, tileset2, tileset3]
    );


    calque_plateformes.setCollisionByProperty({ estSolide: true });





    this.add.text(400, 100, "Vous êtes dans le niveau 1", {
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
      fontSize: "22pt"
    });

    this.porte_retour = this.physics.add.staticSprite(100, 550, "img_porte1");

    this.player = this.physics.add.sprite(128, 550, "img_perso");
    this.player.refreshBody();
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.clavier = this.input.keyboard.createCursorKeys();
    this.physics.add.collider(this.player, calque_plateformes);



    this.physics.world.setBounds(0, 0, 3200, 640);
    this.cameras.main.setBounds(0, 0, 3200, 640);
    this.cameras.main.startFollow(this.player);

    this.monsters = this.physics.add.group();

for (let i = 0; i < 5; i++) {

  let monster = this.monsters.create(
    Phaser.Math.Between(800, 3000),
    Phaser.Math.Between(100, 500),
    "Sprite_monster_1_"
  );

  monster.setBounce(1);
  monster.setCollideWorldBounds(true);
  monster.body.allowGravity = false;
  monster.setMaxVelocity(150, 150);
  monster.setDrag(50, 50);
}

this.physics.add.overlap(this.player, this.monsters,chocMonster, null, this);
this.physics.add.collider(this.monsters, calque_plateformes);

    this.anims.create({
      key: "anim_tourne_gauche_m",
      frames: this.anims.generateFrameNumbers("Sprite_monster_2_", {
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



    









  }

  update() {

   

    if (this.clavier.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play("anim_tourne_gauche", true);
    } else if (this.clavier.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play("anim_tourne_droite", true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("anim_face");
    }
    if (this.clavier.up.isDown && this.player.body.blocked.down) {
      this.player.setVelocityY(-430);
    }

    let vitesse = 60;

    

this.monsters.children.iterate((monster) => {
  if (!monster) return;

  // mouvement vers le joueur
  this.physics.moveToObject(monster, this.player, vitesse);

  // animation
  if (monster.body.velocity.x < 0) {
    monster.anims.play("anim_tourne_gauche_m", true);
    
  } else if (monster.body.velocity.x > 0) {
    monster.anims.play("anim_tourne_droite_m", true);
    
  } else {
    monster.anims.play("anim_face_m");
    
  }
});
    if (Phaser.Input.Keyboard.JustDown(this.clavier.space) == true) {
      if (this.physics.overlap(this.player, this.porte_retour)) {
        console.log("niveau 1 : retour vers selection");
        this.son_background.stop();
        this.scene.switch("selection");
      }
    }
  }
}

function chocMonster(un_player, un_monster) {
  

  this.son_scream.play();
  this.physics.pause();
  
  

  un_player.setTint(0xff0000);
  un_player.anims.play("anim_face");

  this.add.text(400, 250, "PERDU", {
    fontSize: "64px",
    fill: "#ff0000"
  }).setOrigin(0.5);

  
  this.time.delayedCall(1500, () => {
    this.son_background.stop();
    this.scene.start("accueil", { x: 288, y: 384 });
  });
}
