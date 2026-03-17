import * as fct from "/src/js/fonctions.js";

export default class niveau1 extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "niveau1" //  ici on précise le nom de la classe en tant qu'identifiant
    });
  }
  preload() {
 this.load.image("Phaser_tuilesdejeu", "src/assets/laboratoire.png");
 this.load.tilemapTiledJSON("carte1", "src/assets/map_niveau_1.json"); 


  }

  create() {


const carteDuNiveau1 = this.add.tilemap("carte1");

    fct.doNothing();
    fct.doAlsoNothing();

// chargement du jeu de tuiles
const tileset = carteDuNiveau1.addTilesetImage(
          "laboratoire",
          "Phaser_tuilesdejeu"
        );  
const calque_background = carteDuNiveau1.createLayer(
          "Calque_de_Tuiles_2",
          tileset
        );

// chargement du calque calque_background_2
const calque_background_2 = carteDuNiveau1.createLayer(
          "fouiller",
          tileset 
        );

// chargement du calque calque_plateformes
const calque_plateformes = carteDuNiveau1.createLayer(
          "marcher",
          tileset
        );  
calque_plateformes.setCollisionByProperty({ estSolide: true }); 

calque_plateformes.setCollisionByExclusion([-1]);






   /* this.add.image(400, 300, "img_ciel");
    this.groupe_plateformes = this.physics.add.staticGroup();
    this.groupe_plateformes.create(200, 584, "img_plateforme");
    this.groupe_plateformes.create(600, 584, "img_plateforme");
    // ajout d'un texte distintcif  du 
    */

  this.calque_plateformes = this.physics.add.staticGroup();

    this.add.text(400, 100, "Vous êtes dans le niveau 1", {
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
      fontSize: "22pt"
    });

    this.porte_retour = this.physics.add.staticSprite(100, 550, "img_porte1");

    this.player = this.physics.add.sprite(100, 450, "img_perso");
    this.player.refreshBody();
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.clavier = this.input.keyboard.createCursorKeys();
    this.physics.add.collider(this.player, calque_plateformes);


    this.physics.world.setBounds(0, 0, 1600, 640);
    this.cameras.main.setBounds(0, 0, 1600, 640);
    this.cameras.main.startFollow(this.player); 

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
      this.player.setVelocityY(-330);
    }

    if (Phaser.Input.Keyboard.JustDown(this.clavier.space) == true) {
      if (this.physics.overlap(this.player, this.porte_retour)) {
        this.scene.switch("selection");
      }
    }
  }
}
