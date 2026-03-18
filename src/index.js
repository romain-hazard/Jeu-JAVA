
import selection from "/src/js/selection.js";
import niveau1 from "/src/js/niveau1.js";
import niveau2 from "/src/js/niveau2.js";
import niveau3 from "/src/js/niveau3.js";
import accueil from "/src/js/accueil.js";
import menu from "/src/js/menu.js";

var config = {
  type: Phaser.AUTO,
  width: 1390,
  height: 630,
   
  physics: {
    
    default: "arcade", 
    arcade: {
      
      gravity: {
        y: 300 
      },
      debug: true 
    }
  },
  scene: [menu,accueil, niveau1, niveau2, niveau3 ]
};


var game = new Phaser.Game(config);
game.scene.start("menu");
