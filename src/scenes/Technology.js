import Phaser from "phaser";
import Player from "../entities/Player";
import Pridle from "./Pridle";
let tItem;
let techDoor;
let tClueCount = 0;
let techClues = document.getElementById("tech-clues");
let nameGuessTCount = 1;
let guessButton = document.getElementById("subtname");
let firstnameTGuess = document.getElementById("firstnametguess");
let lastnameTGuess = document.getElementById("lastnametguess");
let nameTguess = document.getElementById("nameTguess");

function submitTName() {
  const firstNameGuess = firstnameTGuess.value.toUpperCase();
  const lastNameGuess = lastnameTGuess.value.toUpperCase();
  if (
    (firstNameGuess === "LYNN" && lastNameGuess === "CONWAY") ||
    (firstNameGuess === "" && lastNameGuess === "CONWAY")
  ) {
    nameTguess.classList.toggle("hidden");
    localStorage.setItem("tech", "complete");
    nameGuessTCount = 0;
    let techClues = document.getElementById("tech-clues");
    techClues.classList.add("hidden");

    nameTguess.classList.add("hidden");
    let techScene = document.getElementById("techscene");
    techScene.innerHTML = "<b>Technology Room</b>: Lynn Conway";
  } else if (nameGuessTCount === 3) {
    nameTguess.classList.toggle("hidden");
    localStorage.setItem("tech", "complete");

    let techScene = document.getElementById("techscene");
    techScene.innerHTML = "<b>Technology Room</b>: Lynn Conway";
  } else {
    nameGuessTCount++;
  }
  firstnameTGuess.value = "";
  lastnameTGuess.value = "";
}
function checkName() {
  nameTguess.classList.toggle("hidden");
  guessButton.addEventListener("click", submitTName);
}
export default class Technology extends Phaser.Scene {
  constructor() {
    super({ key: "Technology" });
  }
  preload() {
    this.load.tilemapTiledJSON(
      "techMap",
      "../public/assets/tilemaps/TechRoomLL.json"
    );
    this.load.image(
      "VaporwaveFurniture",
      "../public/assets/tilesets/VaporwaveFurniture.png"
    );
    this.load.image("walls", "../public/assets/tilesets/Walls.png");
    this.load.image("schoolmap", "../public/assets/tilesets/schoolmap.png");
    this.load.image(
      "Floor",
      "../public/assets/tilesets/RepeatableStoneWall.png"
    );
    this.load.image("Pride", "../public/assets/tilesets/pride.png");
    this.load.image("BOOK", "../public/assets/images/bewk.png");
    this.load.image("PRIDEFLAG", "../public/assets/images/fleg.png");
    this.load.image("FIGURE", "../public/assets/images/stet.png");
    this.load.image("COMPUTER", "../public/assets/images/cemp.png");
    this.load.image("CALIWAVES", "../public/assets/images/cal.png");
    this.load.image("DIAMONDOOR", "../public/assets/images/rightDoortech.png");
    this.load.image("DIAMOON", "../public/assets/images/techDoorMiddle.png");
    this.load.image("MOONDOOR", "../public/assets/images/leftTechDoor.png");
    this.load.spritesheet("LYNN", "../public/assets/sprites/LYNN.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
  }
  create() {
    let localCount = localStorage.getItem("tcount");
    if (localStorage.getItem("tech") === "complete") {
      let techClues = document.getElementById("tech-clues");
      techClues.classList.add("hidden");
    } else if (localCount === "4") {
      let techClues = document.getElementById("tech-clues");
      techClues.classList.remove("hidden");
      let clue25 = document.getElementById("25");
      let clue26 = document.getElementById("26");
      let clue27 = document.getElementById("27");
      let clue28 = document.getElementById("28");
      clue25.classList.remove("hidden");
      clue26.classList.remove("hidden");
      clue27.classList.remove("hidden");
      clue28.classList.remove("hidden");
      let count = document.getElementById("tClueCount");
      count.innerText = localCount;
      let dialogue = document.getElementById("inner");
      dialogue.innerText =
        "Great job! Why don't we head back to the main lobby?";
      checkName();
    } else {
      let techClues = document.getElementById("tech-clues");
      techClues.classList.remove("hidden");
    }
    let lobbyClues = document.getElementById("clue-list");
    lobbyClues.classList.add("hidden");
    console.log("hi", this.cache.tilemap.get("techMap").data);
    //this.add.image(275, 275, "Floor");
    const nameTGuess = document.getElementById("nameTguess");

    const map = this.make.tilemap({
      key: "techMap",
      tileWidth: 32,
      tileHeight: 32,
    });
    const schoolTiles = map.addTilesetImage("SCHOOL", "schoolmap");
    const wallTiles = map.addTilesetImage("MODERNSTUDY-WALLS", "walls");
    const prideTiles = map.addTilesetImage("PRIDEFLAG", "Pride");
    const floorTiles = map.addTilesetImage("FLOOR", "Floor");
    const vaporTiles = map.addTilesetImage(
      "VAPORWAVE",
      "VaporwaveFurniture",
      32,
      32
    );
    const bookTiles = map.addTilesetImage("BOOKS", "Books");

    let floorLayer = map.createLayer("floorsnwallsnsuch", [
      wallTiles,
      floorTiles,
      vaporTiles,
      schoolTiles,
    ]);
    let accentLayer = map.createLayer("ACCENTS", [
      wallTiles,
      vaporTiles,
      schoolTiles,
      prideTiles,
    ]);

    let bumpLayer = map.createLayer("thingstoruninto", [
      wallTiles,
      vaporTiles,
      schoolTiles,
      bookTiles,
    ]);

    this.player = new Player(this, 470, 590, "LYNN").setScale(1.1); //Joe is pleased
    this.createAnimations(); //maybe also move this to player class?

    this.cursors = this.input.keyboard.createCursorKeys();

    bumpLayer.setCollisionByExclusion([-1]);
    this.physics.add.collider(this.player, bumpLayer); // move this to PLayer class

    let techClues = map.getObjectLayer("ClueObjects")["objects"];
    let door = map.getObjectLayer("DOOR")["objects"];
    tItem = this.physics.add.staticGroup();
    techDoor = this.physics.add.staticGroup();

    techClues.forEach((object) => {
      let obj = tItem.create(object.x, object.y, object.name);
      obj.setScale(object.width / object.width, object.height / object.height);
      obj.setOrigin(0);
      obj.body.width = object.width;
      obj.body.height = object.height;
    });
    door.forEach((object) => {
      let obj = techDoor.create(object.x, object.y, object.name);
      obj.setScale(object.width / object.width, object.height / object.height);
      obj.setOrigin(0);
      obj.body.width = object.width;
      obj.body.height = object.height;
    });
    this.physics.add.overlap(this.player, tItem, this.tCollect, null, this);
    this.physics.add.overlap(this.player, techDoor, this.exit, null, this);
  }
  update() {
    this.player.update(this.cursors);
  }
  tCollect(player, object) {
    if (localStorage.getItem(object.texture.key)) {
      // need to work on this
      console.log("You already found that clue!");
      return false;
    }
    tClueCount += 1;
    localStorage.setItem("tcount", tClueCount);
    object.destroy(object.x, object.y);
    // text.setText(`Clues: y`); // set the text to show the current score
    let clue25 = document.getElementById("25");
    let clue26 = document.getElementById("26");
    let clue27 = document.getElementById("27");
    let clue28 = document.getElementById("28");

    let count = document.getElementById("tClueCount");
    count.innerText = tClueCount;
    const objName = object.texture.key;
    if (object.texture.key === "COMPUTER") {
      this.setItem(objName, "collected");
      clue25.classList.remove("hidden");
    } else if (object.texture.key === "CALIWAVES") {
      this.setItem(objName, "collected");
      clue26.classList.remove("hidden");
    } else if (object.texture.key === "BOOK") {
      this.setItem(objName, "collected");
      clue27.classList.remove("hidden");
    } else if (object.texture.key === "PRIDEFLAG") {
      this.setItem(objName, "collected");
      clue28.classList.remove("hidden");
    }
    let localCount = localStorage.getItem("tcount");
    if (localCount === "4") {
      let dialogue = document.getElementById("inner");
      dialogue.innerText =
        "Great job! Why don't we head back to the main lobby?";
      checkName();

      return false;
    }
  }
  setItem(item) {
    localStorage.setItem(item, "collected");
  }

  getItem(item) {
    if (localStorage.getItem(item)) {
      return true;
    } else {
      return false;
    }
  }
  exit() {
    let techClues = document.getElementById("tech-clues");
    this.scene.stop("Technology");
    const num = localStorage.getItem("tcount");
    if (num === "4") {
      this.scene.start("Pridle");
    } else {
      techClues.classList.add("hidden");
      let lobbyClues = document.getElementById("clue-list");
      lobbyClues.classList.toggle("hidden");
      this.scene.start("Lobby");
    }
  }

  createAnimations() {
    this.player.anims.create({
      key: "walk right",
      frames: this.anims.generateFrameNumbers("LYNN", { start: 6, end: 8 }),
      frameRate: 6,
      repeat: -1,
    });
    this.player.anims.create({
      key: "walk left",
      frames: this.anims.generateFrameNumbers("LYNN", { start: 3, end: 5 }),
      frameRate: 6,
      repeat: -1,
    });
    this.player.anims.create({
      key: "walk up",
      frames: this.anims.generateFrameNumbers("LYNN", {
        start: 9,
        end: 11,
      }),
      frameRate: 6,
      repeat: -1,
    });
    this.player.anims.create({
      key: "walk down",
      frames: this.anims.generateFrameNumbers("LYNN", { start: 0, end: 2 }),
      frameRate: 6,
      repeat: -1,
    });
    this.player.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("LYNN", { start: 1, end: 1 }),
      frameRate: 6,
      repeat: -1,
    });
  }
}
