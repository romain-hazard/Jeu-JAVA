
var portal;

export default class accueil extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "accueil" //  ici on précise le nom de la classe en tant qu'identifiant
    });
  }
  preload() {
    this.load.image("Phaser_tuilesdejeu1", "src/assets/laboratory.png");
    this.load.image("Phaser_tuilesdejeu2", "src/assets/laboratory_objects_1.png");
    this.load.tilemapTiledJSON("accueil", "src/assets/map_accueil.json");  
    this.load.spritesheet("img_portal", "src/assets/portal.png",{
      frameWidth: 66,
      frameHeight: 68,
    });
    
     
 
  }



  create() {
   /* this.add.image(400, 300, "img_ciel");
    this.groupe_plateformes = this.physics.add.staticGroup();
    this.groupe_plateformes.create(200, 584, "img_plateforme");
    this.groupe_plateformes.create(600, 584, "img_plateforme");
    // ajout d'un texte distintcif  du niveau
    */

    this.anims.create({
      key: "portal_tourne", 
      frames: this.anims.generateFrameNumbers("img_portal", {
        start: 0,
        end: 4,
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

    
    this.add.text(400, 100, "Vous êtes dans le accueil", {
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
      fontSize: "22pt"
    });

    this.porte_retour = this.physics.add.staticSprite(100, 550, "img_porte3");

    this.player = this.physics.add.sprite(32, 200, "img_perso");
    //calque_sol.setCollisionByExclusion([-1]);

    this.portal1 = this.physics.add.sprite(480,384,"img_portal");
    this.portal2 = this.physics.add.sprite(992,192,"img_portal");
    this.portal3 = this.physics.add.sprite(1376,320,"img_portal");

    calque_mur.setCollisionByExclusion([-1]);
    calque_perimetre.setCollisionByExclusion([-1]);
    calque_deco.setCollisionByExclusion([-1]);
    calque_accessoire.setCollisionByExclusion([-1]);
    this.player.refreshBody();
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.clavier = this.input.keyboard.createCursorKeys();
    this.physics.add.collider(this.player, calque_perimetre);
    this.physics.add.collider(this.player, calque_deco);
    this.physics.add.collider(this.player, calque_sol);
    this.physics.add.collider(this.player, calque_mur);

this.physics.world.gravity.y = 0;

  this.player.setCollideWorldBounds(true);
  this.cameras.main.startFollow(this.player);
  this.physics.world.setBounds(0, 0, 3200, 640);
  this.cameras.main.setBounds(0, 0, 3200, 640);
  this.cameras.main.startFollow(this.player); 

  
  }

  update() {
    
let vitesse = 160;
this.player.setVelocity(0,0);

this.portal1.anims.play("portal_tourne", true);
this.portal2.anims.play("portal_tourne", true);
this.portal3.anims.play("portal_tourne", true);


if (Phaser.Input.Keyboard.JustDown(this.clavier.space) == true) {
if (this.physics.overlap(this.player, this.portal1)){
      this.scene.start("niveau1");}

if (this.physics.overlap(this.player, this.portal2)){
      this.scene.switch("niveau2");}

if (this.physics.overlap(this.player, this.portal3)){
      this.scene.switch("niveau3");}
}



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

    if (Phaser.Input.Keyboard.JustDown(this.clavier.space) == true) {
      if (this.physics.overlap(this.player, this.porte_retour)) {
        console.log("accueil : retour vers selection");
        this.scene.switch("selection");
      }
    }
  }
}
