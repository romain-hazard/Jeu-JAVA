
export default class niveau3 extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "niveau3" //  ici on précise le nom de la classe en tant qu'identifiant
    });
  }
  preload() {
    this.load.image("Phaser_tuilesdejeu1", "src/assets/laboratory.png");
    this.load.image("Phaser_tuilesdejeu2", "src/assets/laboratory_objects_1.png");
    this.load.tilemapTiledJSON("niveau3", "src/assets/map_niveau_3_mov.json");
  }

  create() {

    const carteDuNiveau3 = this.add.tilemap("niveau3");

    const tileset1 = carteDuNiveau3.addTilesetImage(
      "laboratory",
      "Phaser_tuilesdejeu1"
    );

    const tileset2 = carteDuNiveau3.addTilesetImage(
      "laboratory objects",
      "Phaser_tuilesdejeu2"
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



    /*this.add.image(400, 300, "img_ciel");
    this.groupe_plateformes = this.physics.add.staticGroup();
    this.groupe_plateformes.create(200, 584, "img_plateforme");
    this.groupe_plateformes.create(600, 584, "img_plateforme");
    // ajout d'un texte distintcif  du niveau*/

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
    this.cameras.main.startFollow(this.player);

    calque_3.setDepth(0);
    calque_3_2.setDepth(1);
    calque_s_3.setDepth(2);
    calque_o_3.setDepth(3);
    this.player.setDepth(4);
    calque_3_2_1.setDepth(5);


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

    if (Phaser.Input.Keyboard.JustDown(this.clavier.space) == true) {
      if (this.physics.overlap(this.player, this.porte_retour)) {
        console.log("niveau 3 : retour vers selection");
        this.scene.switch("selection");
      }
    }




  }
}
