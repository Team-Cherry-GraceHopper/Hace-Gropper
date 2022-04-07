import Phaser from "phaser";

import config from "./config/config";
import Lobby from "./scenes/Lobby";
import Engineering from "./scenes/Engineering";
import Technology from "./scenes/Technology";
import Science from "./scenes/Science";
import Math from "./scenes/Math";
import SpaceInvaders from "./scenes/SpaceInvaders";
import Scrammble from "./scenes/Scrammble";
import Memory from "./scenes/Memory";
import Pridle from "./scenes/Pridle";
import EndCreds from "./scenes/EndCreds";

class Game extends Phaser.Game {
  constructor() {
    super(config);

    // include ALL scenes in the game
    this.scene.add("Lobby", Lobby);
    this.scene.add("Engineering", Engineering);
    this.scene.add("Technology", Technology);
    this.scene.add("Science", Science);
    this.scene.add("Math", Math);
    this.scene.add("SpaceInvaders", SpaceInvaders);
    this.scene.add("EndCreds", EndCreds);
    this.scene.add("Scrammble", Scrammble);
    this.scene.add("Memory", Memory);
    this.scene.add("Pridle", Pridle);
    this.scene.start("Lobby");

  
  }
}

const game = new Game(config);
