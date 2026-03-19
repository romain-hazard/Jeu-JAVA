import * as fct from "/src/js/fonctions.js";

export default class menu extends Phaser.Scene {
  constructor() {
    super({ key: "menu" });
  }

  preload() {
    this.load.image("menu_fond", "src/assets/menu_fond.png");
    this.load.image("imageBoutonPlay", "src/assets/start.png");
    this.load.image("consigne_fond", "src/assets/fond_consigne_2.png");
  }

  create() {
    this.showMenu();
  }

  
  showMenu() {
    const width = this.sys.game.config.width;
    const height = this.sys.game.config.height;

    this.children.removeAll();

    let bg = this.add.image(0, 0, "menu_fond").setOrigin(0);
    bg.displayWidth = width;
    bg.displayHeight = height;

    let bouton_play = this.add.image(width/2, height/2, "imageBoutonPlay")
      .setScale(0.5)
      .setInteractive({ useHandCursor: true });

    bouton_play.on("pointerup", () => {
      this.showConsignes();
    });
  }

showConsignes() {
  const width = this.sys.game.config.width;
  const height = this.sys.game.config.height;

  this.children.removeAll();
  let bg = this.add.image(0, 0, "consigne_fond").setOrigin(0);
  bg.displayWidth = width;
  bg.displayHeight = height;

  
  let bouton_start = this.add.image(150, 70, "imageBoutonPlay") 
    .setScale(0.5)
    .setInteractive({ useHandCursor: true });

  bouton_start.on("pointerup", () => {
    this.scene.start("accueil",{ x: 32, y: 200 });
  });
}
}