import Phaser from "phaser";
import config from "./config/config";
import Lobby from "./scenes/Lobby";
import Engineering from "./scenes/Engineering";
import Technology from "./scenes/Technology";
let cursors;
let grace;

class Game extends Phaser.Game {
  constructor() {
    super(config);
    // include any scenes in the game
    this.scene.add("Lobby", Lobby);
    this.scene.add("Engineering", Engineering);
    this.scene.add("Technology", Technology);
    this.scene.start("Technology", Technology);
    // change scene.start to see if it works to test it & make sure you import it on top

    // this.scene.physics.world.enable(this);
    // this.scene.add.existing(this);
  }
}

// 29 map.createLayer('Layer name in Tiled', variable name)
// 27 variable name = map.addTilesetImage('Tileset name in Tiled', tileset .png file)

const game = new Game(config);
