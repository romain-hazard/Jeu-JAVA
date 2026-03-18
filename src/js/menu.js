import * as fct from "/src/js/fonctions.js";

export default class menu extends Phaser.Scene {
  constructor() {
    super({ key: "menu" });
  }

  preload() {
    this.load.image("menu_fond", "src/assets/menu_fond.png");
    this.load.image("imageBoutonPlay", "src/assets/start.png");
    this.load.image("Bouton_consignes", "src/assets/bouton_info.png");
    this.load.image("consigne_fond", "src/assets/menu_consigne.png");
  }

  create() {
    const width = this.sys.game.config.width;
    const height = this.sys.game.config.height;

    // Fond menu
    let bg = this.add.image(0, 0, "menu_fond").setOrigin(0);
    bg.displayWidth = width;
    bg.displayHeight = height;

    // Boutons réduits et espacés
    const boutonScale = 0.5;

    let bouton_play = this.add.image(width/2, height/2 - 50, "imageBoutonPlay")
      .setScale(boutonScale)
      .setInteractive({ useHandCursor: true });

    let bouton_consigne = this.add.image(width/2, height/2 + 50, "Bouton_consignes")
      .setScale(boutonScale)
      .setInteractive({ useHandCursor: true });

    // Cliquer sur Play → accueil
    bouton_play.on("pointerup", () => {
      this.scene.switch("accueil");
    });

    // Cliquer sur Info → afficher les consignes
    bouton_consigne.on("pointerup", () => {
      this.showConsignes();
    });
  }

  showConsignes() {
    const width = this.sys.game.config.width;
    const height = this.sys.game.config.height;

    // Masquer les boutons du menu en les détruisant
    this.children.removeAll();

    // Fond consignes
    let bg_consigne = this.add.image(0, 0, "consigne_fond").setOrigin(0);
    bg_consigne.displayWidth = width;
    bg_consigne.displayHeight = height;

    // Bouton Start pour revenir à l'accueil
    const boutonScale = 0.5;
    let bouton_start = this.add.image(width/2, height - 100, "imageBoutonPlay")
      .setScale(boutonScale)
      .setInteractive({ useHandCursor: true });

    bouton_start.on("pointerup", () => {
      this.scene.switch("accueil");
    });
  }
}