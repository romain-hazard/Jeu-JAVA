import * as fct from "/src/js/fonctions.js";

var monster4;


export default class niveau3 extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "niveau3" //  ici on précise le nom de la classe en tant qu'identifiant
    });
  }
  preload() {
    this.load.image("Phaser_tuiles_dejeu1", "src/assets/laboratory.png");
    this.load.image("Phaser_tuiles_dejeu2", "src/assets/laboratory_objects_1.png");
    this.load.tilemapTiledJSON("niveau3", "src/assets/map_niveau_3_mov.json");

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


  }

  create() {

    const carteDuNiveau3 = this.add.tilemap("niveau3");

    const tileset1 = carteDuNiveau3.addTilesetImage(
      "laboratory",
      "Phaser_tuiles_dejeu1"
    );

    const tileset2 = carteDuNiveau3.addTilesetImage(
      "laboratory objects",
      "Phaser_tuiles_dejeu2"
    );

    const calque_3 = carteDuNiveau3.createLayer(
      "c_background_3",
      [tileset1, tileset2]
    );

    const calque_3_2 = carteDuNiveau3.createLayer(
      "c_background_3.2",
      [tileset1, tileset2]
    );

    const calque_3_2_1 = carteDuNiveau3.createLayer(
      "c_background_3.2.1",
      [tileset1, tileset2]
    );

    const calque_s_3 = carteDuNiveau3.createLayer(
      "c_background_s_3",
      [tileset1, tileset2]
    );

    const calque_o_3 = carteDuNiveau3.createLayer(
      "c_objets_3",
      [tileset1, tileset2]
    );

    this.add.text(400, 100, "Vous êtes dans le niveau 3", {
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
      fontSize: "22pt"
    });

    this.porte_retour = this.physics.add.staticSprite(100, 550, "img_porte3");

    this.player = this.physics.add.sprite(33, 192, "img_perso");

    calque_s_3.setCollisionByProperty({ estSolide: true });
    calque_o_3.setCollisionByProperty({ estSolide: true });

    this.physics.add.collider(this.player, calque_s_3);
    this.physics.add.collider(this.player, calque_o_3);
    this.player.refreshBody();
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.clavier = this.input.keyboard.createCursorKeys();
    this.physics.add.collider(this.player, this.groupe_plateformes);


    this.physics.world.gravity.y = 0;


    this.player.setCollideWorldBounds(true);
    this.cameras.main.startFollow(this.player);
    this.physics.world.setBounds(0, 0, 3200, 640);
    this.cameras.main.setBounds(0, 0, 3200, 640);


    calque_3.setDepth(0);
    calque_3_2.setDepth(1);
    calque_s_3.setDepth(2);
    calque_o_3.setDepth(3);
    this.player.setDepth(4);
    calque_3_2_1.setDepth(5);


    monster4 = this.physics.add.sprite(1100, 256, "Sprite_monster");
    monster4.setBounce(1);
    monster4.setCollideWorldBounds(true);
    this.physics.add.collider(monster4, calque_s_3);
    this.physics.add.collider(monster4, calque_o_3);

    monster4.setDepth(4);

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


    this.physics.add.collider(this.player, calque_s_3);
    this.physics.add.collider(this.player, monster4);
    monster4.body.allowGravity = false;
    monster4.setMaxVelocity(150, 150);
    monster4.setDrag(50, 50);



  }


  update() {
    let vitesse = 160;
    this.player.setVelocity(0, 0);

    if (this.clavier.left.isDown) {
      this.player.setVelocityX(-vitesse);
      this.player.anims.play("anim_tourne_gauche", true);
    }
    else if (this.clavier.right.isDown) {
      this.player.setVelocityX(vitesse);
      this.player.anims.play("anim_tourne_droite", true);
    }
    else if (this.clavier.up.isDown) {
      this.player.setVelocityY(-vitesse);
      this.player.anims.play("anim_tourne_droite", true);
    }
    else if (this.clavier.down.isDown) {
      this.player.setVelocityY(vitesse);
      this.player.anims.play("anim_tourne_gauche", true);
    }
    else {
      this.player.anims.play("anim_face", true);
    }


    if (Phaser.Math.Between(0, 100) < 2) { 
      monster4.setVelocity(
      Phaser.Math.Between(-150, 150),
      Phaser.Math.Between(-150, 150)
    );
    }
    if (monster4.body.velocity.x < 0) {
      monster4.anims.play("anim_tourne_gauche_m", true);
    } else if (monster4.body.velocity.x > 0) {
      monster4.anims.play("anim_tourne_droite_m", true);
    }


    if (Phaser.Input.Keyboard.JustDown(this.clavier.space) == true) {
      if (this.physics.overlap(this.player, this.porte_retour)) {
        console.log("niveau 3 : retour vers selection");
        this.scene.switch("selection");
      }
    }




  }
}
