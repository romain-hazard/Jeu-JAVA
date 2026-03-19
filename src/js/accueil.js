
var portal;
var player;

export default class accueil extends Phaser.Scene {
  
  constructor() {
    super({
      key: "accueil" 
    });
  }


  init(data) {
  this.spawnX = data.x;
  this.spawnY = data.y;  
}


  preload() {
    this.load.spritesheet("img_perso", "src/assets/Spritesheet.jpg", {
      frameWidth: 55,
      frameHeight: 61,
    });
    this.load.spritesheet("img_perso2", "src/assets/Spritesheet2.jpg", {
      frameWidth: 55,
      frameHeight: 61,
    });
    this.load.image("Phaser_tuilesdejeu1", "src/assets/laboratory.png");
    this.load.image("Phaser_tuilesdejeu2", "src/assets/laboratory_objects_1.png");
    this.load.tilemapTiledJSON("accueil", "src/assets/map_accueil.json");  
    this.load.spritesheet("img_portal", "src/assets/portal.png",{
      frameWidth: 66,
      frameHeight: 68,
    });
    
     this.load.font
     this.load.audio('labo', 'src/assets/acceuil_labo.mp3');
 
  }



  create() {
   /* this.add.image(400, 300, "img_ciel");
    this.groupe_plateformes = this.physics.add.staticGroup();
    this.groupe_plateformes.create(200, 584, "img_plateforme");
    this.groupe_plateformes.create(600, 584, "img_plateforme");
    // ajout d'un texte distintcif  du niveau
    */

    var son_labo;
    this.son_labo = this.sound.add('labo');
    this.son_labo.play({
      loop: true,
      volume: 0.2
    });

    this.anims.create({
      key: "portal_tourne", 
      frames: this.anims.generateFrameNumbers("img_portal", {
        start: 0,
        end: 2.5,
      }), 
      frameRate: 10, 
      repeat: -1  
    });

const carteAccueil = this.add.tilemap("accueil");



const tileset1 = carteAccueil.addTilesetImage(
  "laboratory",
  "Phaser_tuilesdejeu1"
);

const tileset2 = carteAccueil.addTilesetImage(
  "laboratory_objects_1",
  "Phaser_tuilesdejeu2"
);


const calque_fond = carteAccueil.createLayer(
  "fond_noir",
  [tileset1, tileset2]
);

const calque_perimetre = carteAccueil.createLayer(
  "perimetre_labo",
  [tileset1, tileset2]
);

const calque_sol = carteAccueil.createLayer(
  "sol_labo",
  [tileset1, tileset2]  
);

const calque_deco = carteAccueil.createLayer(
  "deco_labo",
  [tileset1, tileset2]  
);

const calque_accessoire = carteAccueil.createLayer(
  "accessoire",
  [tileset1, tileset2]  
);

const calque_mur = carteAccueil.createLayer(
  "mur_labo",
  [tileset1, tileset2]  
);

    
   WebFont.load({
    custom: {
      families: ['plasdrip']
    },
    active: () => {
      this.add.text(400, 100, "Vous etes dans l'accueil", {
        fontFamily: 'plasdrip',
        fontSize: "22pt",
        color: '#37d83c'
      });
    }
  });

    

player = this.physics.add.sprite(32, 200, "img_perso");

if (this.spawnX !== undefined && this.spawnY !== undefined) {
  player.setPosition(this.spawnX, this.spawnY);
} else {
  player.setPosition(32, 200); 
}


    this.portal1 = this.physics.add.sprite(480,384,"img_portal");
    this.portal2 = this.physics.add.sprite(992,192,"img_portal");
    this.portal3 = this.physics.add.sprite(1376,320,"img_portal");



    

    calque_mur.setCollisionByExclusion([-1]);
    calque_perimetre.setCollisionByExclusion([-1]);
    calque_deco.setCollisionByExclusion([-1]);
    calque_accessoire.setCollisionByExclusion([-1]);
    player.refreshBody();
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    this.clavier = this.input.keyboard.createCursorKeys();
    this.physics.add.collider(player, calque_perimetre);
    this.physics.add.collider(player, calque_deco);
    this.physics.add.collider(player, calque_sol);
    this.physics.add.collider(player, calque_mur);

this.physics.world.gravity.y = 0;

  player.setCollideWorldBounds(true);
  this.cameras.main.startFollow(player);
  this.physics.world.setBounds(0, 0, 3200, 640);
  this.cameras.main.setBounds(0, 0, 3200, 640);
  this.cameras.main.startFollow(player); 

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


  
  }

  update() {
    
let vitesse = 160;
player.setVelocity(0,0);

this.portal1.anims.play("portal_tourne", true);
this.portal2.anims.play("portal_tourne", true);
this.portal3.anims.play("portal_tourne", true);



if (this.physics.overlap(player, this.portal1)){
      this.son_labo.stop();
      this.scene.start("niveau1");}

if (this.physics.overlap(player, this.portal2)){
      this.son_labo.stop();
      this.scene.switch("niveau2");}

if (this.physics.overlap(player, this.portal3)){
      this.son_labo.stop();
      this.scene.switch("niveau3");}




if (this.clavier.left.isDown) {
    player.setVelocityX(-vitesse);
    player.anims.play("anim_tourne_gauche", true);
}
else if (this.clavier.right.isDown) {
    player.setVelocityX(vitesse);
    player.anims.play("anim_tourne_droite", true);
}
else if (this.clavier.up.isDown) {
    player.setVelocityY(-vitesse);
    player.anims.play("anim_tourne_droite", true);   
}
else if (this.clavier.down.isDown) {
    player.setVelocityY(vitesse);
    player.anims.play("anim_tourne_gauche", true);   
}
else {
    player.anims.play("anim_face", true);
}

    
  }
}
