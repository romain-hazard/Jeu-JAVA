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
 
  }

  create() {



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

    
   
    this.add.text(400, 100, "Vous êtes dans le niveau 2", {
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
      fontSize: "22pt"
    });

    this.porte_retour = this.physics.add.staticSprite(33, 48, "img_porte2");

    this.player = this.physics.add.sprite(100, 300, "img_perso");
    this.player.refreshBody();
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.clavier = this.input.keyboard.createCursorKeys();
    this.physics.add.collider(this.player,calque_plateformes);



    this.physics.world.setBounds(0, 0, 3200, 640);
    this.cameras.main.setBounds(0, 0, 3200, 640);
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
        console.log("niveau 3 : retour vers selection");
        this.scene.switch("selection");
      }
    }
  }
}
