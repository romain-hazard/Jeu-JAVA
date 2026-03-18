import * as fct from "/src/js/fonctions.js";

var groupe_potions;

export default class niveau2 extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "niveau2" //  ici on précise le nom de la classe en tant qu'identifiant
    });
  }


  preload() {
    this.load.image("Phaser_tuilesdejeu_1_", "src/assets/laboratoire.png");
    this.load.image("Phaser_tuilesdejeu_2_", "src/assets/Tiles_scientifique.png");
    this.load.tilemapTiledJSON("carte2", "src/assets/map_niveau_2.json");

    this.load.spritesheet("Sprite_monster_1_", "src/assets/Sprite_monster.png", {
      frameWidth: 65,
      frameHeight: 77,
    });

    this.load.spritesheet("Sprite_monster_2_", "src/assets/Sprite_monster_2.png", {
      frameWidth: 65,
      frameHeight: 77,
    });

    this.load.spritesheet("img_portal", "src/assets/portal.png", {
      frameWidth: 66,
      frameHeight: 68,
    });

    this.load.spritesheet("potion", "src/assets/potion.png", {
      frameWidth: 18,
      frameHeight: 24,
    });

    this.load.audio('scream', 'src/assets/sound_scream.mp3');
    this.load.audio('background', 'src/assets/sound_oppressant_acceuile.mp3');
    this.load.audio('reussite', 'src/assets/Mission_passed_sound.mp3');

  }






  create() {

    var son_scream;
    var son_background;
    var son_reussite;

    this.son_scream = this.sound.add('scream');
    this.son_background = this.sound.add('background');
    this.son_reussite = this.sound.add('reussite');


    this.son_background.play({
      loop: true,
      volume: 0.5
    });


    const carteDuNiveau2 = this.add.tilemap("carte2");


    const tileset1 = carteDuNiveau2.addTilesetImage(
      "laboratoire",
      "Phaser_tuilesdejeu_1_"
    );

    const tileset2 = carteDuNiveau2.addTilesetImage(
      "Tiles_scientifique",
      "Phaser_tuilesdejeu_2_"
    );

    const calque_background = carteDuNiveau2.createLayer(
      "calque_background",
      [tileset1, tileset2]
    );

    const calque_background_2 = carteDuNiveau2.createLayer(
      "calque_background_2",
      [tileset1, tileset2]
    );

    const calque_plateformes = carteDuNiveau2.createLayer(
      "calque_plateformes",
      [tileset1, tileset2]
    );
    calque_plateformes.setCollisionByExclusion([-1]);

    this.monsters = this.physics.add.group();

    for (let i = 0; i < 3; i++) {
      let monsters = this.monsters.create(
        Phaser.Math.Between(800, 3000),
        Phaser.Math.Between(100, 500),
        "Sprite_monster_1_"
      );

      monsters.setBounce(1);
      monsters.setCollideWorldBounds(true);
      monsters.body.allowGravity = false;
      monsters.setMaxVelocity(150, 150);
      monsters.setDrag(50, 50);
    }

    WebFont.load({
      custom: {
        families: ['plasdrip']
      },
      active: () => {
        this.add.text(400, 100, "Vous êtes dans le niveau 2", {
          fontFamily: 'plasdrip',
          fontSize: "22pt",
          color: '#37d83c'
        });
      }
    });

    this.porte_retour = this.physics.add.staticSprite(33, 48, "img_porte2");

    this.player = this.physics.add.sprite(100, 300, "img_perso");
    this.player.refreshBody();
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.clavier = this.input.keyboard.createCursorKeys();
    this.physics.add.collider(this.player, calque_plateformes);



    this.physics.world.setBounds(0, 0, 3200, 640);
    this.cameras.main.setBounds(0, 0, 3200, 640);
    this.cameras.main.startFollow(this.player);


    this.physics.add.overlap(this.player, this.monsters, chocMonster2, null, this);



    groupe_potions = this.physics.add.group();
    groupe_potions.create(2080, 128, "potion");
    groupe_potions.create(1312, 576, "potion");
    this.physics.add.collider(groupe_potions, calque_plateformes);
    this.physics.add.overlap(this.player, groupe_potions, ramasserPotion, null, this);

    this.anims.create({
      key: "Potion",
      frames: [{ key: "potion", frame: 2 }],
      frameRate: 4
    });

    groupe_potions.children.iterate(function iterateur(Potions) {
      Potions.anims.play('Potion');
    });



    this.portal_retour2 = this.physics.add.sprite(2816, 448, "img_portal");
    this.physics.add.collider(this.portal_retour2, calque_plateformes);




  }


  update() {

    this.anims.create({
      key: "anim_tourne_gauche_m",
      frames: this.anims.generateFrameNumbers("Sprite_monster_2_", {
        start: 25,
        end: 27,
      }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "anim_face_m",
      frames: [{ key: "Sprite_monster_1_", frame: 7 }],
      frameRate: 20
    });
 
    this.anims.create({
      key: "anim_tourne_droite_m",
      frames: this.anims.generateFrameNumbers("Sprite_monster_1_", {
        start: 23,
        end: 26,
      }),
      frameRate: 10,
      repeat: -1
    });



    this.portal_retour2.anims.play("portal_tourne", true);
    if (Phaser.Input.Keyboard.JustDown(this.clavier.space) == true) {
      if (this.physics.overlap(this.player, this.portal_retour2) &&
        this.groupe_potions.countActive(true) === 0
      ) {
        this.son_background.stop();
        this.son_reussite.play(
          { volume: 0.8 }
        );
        this.time.delayedCall(3000, () => {
          this.scene.start("accueil", { x: 1088, y: 256 });
        });

      }
    }


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
      this.player.setVelocityY(-330);
    }
    if (this.clavier.down.isDown) {
      this.player.setVelocityY(300);
    }

    let vitesse = 0;



    this.monsters.children.iterate((monsters) => {
      if (!monsters) return;

      this.physics.moveToObject(monsters, this.player, vitesse);

      if (monsters.body.velocity.x < 0) {
        monsters.anims.play("anim_tourne_gauche_m", true);
      } else if (monsters.body.velocity.x > 0) {
        monsters.anims.play("anim_tourne_droite_m", true);
      } else {
        monsters.anims.play("anim_face_m");
      }
    });
    if (Phaser.Input.Keyboard.JustDown(this.clavier.space) == true) {
      if (this.physics.overlap(this.player, this.porte_retour)) {
        console.log("niveau 2 : retour vers selection");
        this.scene.switch("selection");
      }
    }
  }

}



function chocMonster2(un_player, un_monster) {

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
    this.scene.start("accueil", { x: 896, y: 480 });
  });
}



function ramasserPotion(un_player, une_potion) {
  une_potion.disableBody(true, true);
}


