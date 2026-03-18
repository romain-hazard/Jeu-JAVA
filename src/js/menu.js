export default class menu extends Phaser.Scene {
  constructor() {
    super({ key: "menu" });
  }
  //on charge les images
  preload() {
    this.load.image("menu_fond", "src/assets/menu_fond.png");
    this.load.image("imageBoutonPlay", "src/assets/start.png");
    this.load.image("Bouton_consignes", "src/assets/bouton_info.png");
    this.load.image("consigne_fond", "src/assets/menu_consigne.png");

  }

  create() {
   // on place les éléments de fond
    this.add
      .image(0, 0, "menu_fond")
      .setOrigin(0)
      .setDepth(0);

   
    var bouton_play = this.add.image(300, 450, "imageBoutonPlay").setDepth(1);
    bouton_play.setInteractive();

   

    //var bouton_consigne=this.add.image(300, 450, "Bouton_consigne").setDepth(1);
    //bouton_consigne.setInteractive();

    //Cas ou la sourris clique sur le bouton play :
    // on lance le niveau 1


bouton_consigne.on("pointerup", () => {
      this.scene.start("accueil");
    });

    bouton_play.on("pointerup", () => {
      this.scene.start("accueil");
    });
  }
} 