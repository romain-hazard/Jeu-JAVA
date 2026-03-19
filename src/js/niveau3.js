import * as fct from "/src/js/fonctions.js";




export default class niveau3 extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "niveau3" //  ici on précise le nom de la classe en tant qu'identifiant
    });
  }
  preload() {
    this.load.spritesheet("img_portal", "src/assets/portal.png", {
      frameWidth: 66,
      frameHeight: 68,
    });
    this.load.image("Phaser_tuiles_dejeu1", "src/assets/laboratory.png");
    this.load.image("Phaser_tuiles_dejeu2", "src/assets/laboratory_objects_1.png");
    this.load.tilemapTiledJSON("niveau3", "src/assets/map_niveau_3_noir.json");

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
    this.load.audio('scream', 'src/assets/sound_scream.mp3');
    this.load.audio('background', 'src/assets/sound_oppressant_acceuile.mp3');
    this.load.audio('win', 'src/assets/son_win_fin.mp3');


    this.load.image("bullet", "src/assets/Slime.png")
    this.load.image("fond_final", "src/assets/fond_fin.png");

  }

  tirer() {
    let coefDir = (this.player.direction === 'left') ? -1 : 1;

    let bullet = this.groupeBullets.create(
      this.player.x + (25 * coefDir),
      this.player.y,
      'bullet'
    );

    bullet.setVelocity(600 * coefDir, 0);
    bullet.body.allowGravity = false;
    bullet.setCollideWorldBounds(true);
    bullet.body.onWorldBounds = true;
    bullet.setScale(0.3);
    bullet.setDepth(5);
  }

  hitMonster(bullet, monster) {
    monster.pointsVie--;

    if (monster.pointsVie <= 0) {
      monster.destroy();
    }

    bullet.destroy();
  }


  create() {

    var son_scream;
    var son_background;
    var son_win;

    this.son_scream = this.sound.add('scream');
    this.son_background = this.sound.add('background');
    this.son_win = this.sound.add('win');


    this.son_background.play({
      loop: true,
      volume: 3
    });


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

    WebFont.load({
      custom: {
        families: ['plasdrip']
      },
      active: () => {
        this.add.text(400, 100, "Vous etes dans le niveau 3", {
          fontFamily: 'plasdrip',
          fontSize: "22pt",
          color: '#37d83c'
        });
      }
    });



    this.player = this.physics.add.sprite(33, 192, "img_perso");
    this.player.direction = 'right';
    this.boutonFeu = this.input.keyboard.addKey('Z');
    this.groupeBullets = this.physics.add.group();




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




    this.monsters = this.physics.add.group();

    const positions = [
  { x: 352, y: 480 },
  { x: 640, y: 320 },
  { x: 928, y: 288 },
  { x: 1184, y: 224 },
  { x: 1376, y: 256 },
  { x: 1728, y: 480 },
  { x: 2368, y: 192 },
  { x: 2720, y: 480 }
];

positions.forEach(pos => {
  let monster = this.monsters.create(
    pos.x,
    pos.y,
    "Sprite_monster_1_"
  );

  monster.setBounce(1);
  monster.setCollideWorldBounds(true);
  monster.body.allowGravity = false;
  monster.setMaxVelocity(150, 150);
  monster.setDrag(50, 50);
  monster.pointsVie = 3;
});
    this.physics.add.overlap(this.groupeBullets, this.monsters, this.hitMonster, null, this);
    this.physics.add.collider(this.monsters, calque_s_3);
    
    this.physics.world.on("worldbounds", (body) => {
      let obj = body.gameObject;
      if (this.groupeBullets.contains(obj)) {
        obj.destroy();
      }
    });



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
      frames: [{ key: "Sprite_monster", frame: 20 }],
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



    calque_3.setDepth(0);
    calque_3_2.setDepth(1);
    calque_s_3.setDepth(2);
    calque_o_3.setDepth(3);
    this.player.setDepth(4);
    this.monsters.setDepth(4);
    calque_3_2_1.setDepth(5);




    this.physics.add.overlap(this.player, this.monsters, chocMonster3, null, this);

    this.anims.create({
      key: "portal_tourne",
      frames: this.anims.generateFrameNumbers("img_portal", {
        start: 0,
        end: 4,
      }),
      frameRate: 10,
      repeat: -1
    });



    this.portal_retour3 = this.physics.add.sprite(2784, 448, "img_portal");
    this.portal_retour3.body.allowGravity = false;
    this.portal_retour3.setDepth(4);



    calque_3.setCollisionByProperty({ estSolide: true });

   
    this.physics.add.collider(this.player, calque_3);
  
    this.physics.add.collider(this.groupeBullets, calque_3, (bullet) => {
      bullet.destroy();
    });


    this.physics.add.collider(this.groupeBullets, calque_s_3, (bullet) => {
  bullet.destroy();
});

this.physics.add.collider(this.groupeBullets, calque_o_3, (bullet) => {
  bullet.destroy();
});


this.physics.add.collider(this.monsters, this.monsters);
  }


  update() {


    if (Phaser.Input.Keyboard.JustDown(this.boutonFeu)) {
      this.tirer();
    }


    if (this.clavier.left.isDown) {
      this.player.direction = 'left';
    }
    else if (this.clavier.right.isDown) {
      this.player.direction = 'right';
    }

    this.portal_retour3.anims.play("portal_tourne", true);
    

    let vitesse = 80;
    this.player.setVelocity(0, 0);

    if (this.clavier.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play("anim_tourne_gauche", true);
    }
    else if (this.clavier.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play("anim_tourne_droite", true);
    }
    else if (this.clavier.up.isDown) {
      this.player.setVelocityY(-160);
      this.player.anims.play("anim_tourne_droite", true);
    }
    else if (this.clavier.down.isDown) {
      this.player.setVelocityY(160);
      this.player.anims.play("anim_tourne_gauche", true);
    }
    else {
      this.player.anims.play("anim_face", true);
    }


    this.monsters.children.iterate((monster) => {
      if (!monster) return;


      this.physics.moveToObject(monster, this.player, vitesse);

      if (monster.body.velocity.x < 0) {
        monster.anims.play("anim_tourne_gauche_m", true);
      } else if (monster.body.velocity.x > 0) {
        monster.anims.play("anim_tourne_droite_m", true);
      } else {
        monster.anims.play("anim_face_m");
      }
    
    
    
    });
    

    if (Phaser.Input.Keyboard.JustDown(this.clavier.space)) {

  if (this.win) return;

  let surPortail = this.physics.overlap(this.player, this.portal_retour3);
  let plusDeMonstres = this.monsters.countActive(true) === 0;

  if (surPortail && plusDeMonstres) {

    this.win = true;

    this.son_background.stop();
    this.son_win.play();

    this.player.setVelocity(0, 0);

    let img = this.add.image(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      "fond_final"
    );

    img.setScrollFactor(0);
    img.setDepth(100);


    let scaleX = this.cameras.main.width / img.width;
    let scaleY = this.cameras.main.height / img.height;
    let scale = Math.min(scaleX, scaleY);
    img.setScale(scale);

    this.time.delayedCall(6000, () => {
      this.scene.start("menu");
    });

  } 
  else if (surPortail) {

    this.add.text(this.player.x, this.player.y - 20, "MONSTRES RESTANTS", {
      fontSize: "24px",
      fill: "#ff0000"
    }).setDepth(100);

  }
}



  }
}
function chocMonster3(un_player, un_monster) {

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
    this.scene.start("accueil", { x: 1376, y: 448 });
  });
}
