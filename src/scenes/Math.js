import Phaser from "phaser";
import Player from "../entities/Player";
import Lobby from "./Lobby";
import SpaceInvaders from "./SpaceInvaders";

let item;
let door;
let rocket;
let mathClueCount = 0;
let nameGuessCount = 1;
let mathClueList = document.getElementById("math-clues");
let guessButton = document.getElementById("submname");
let firstnameGuess = document.getElementById("firstnamemguess");
let lastnameGuess = document.getElementById("lastnamemguess");
let nameguess = document.getElementById("nameMguess");
function submitMName() {
  const firstNameGuess = firstnameGuess.value.toUpperCase();
  const lastNameGuess = lastnameGuess.value.toUpperCase();
  if (
    (firstNameGuess === "KATHERINE" && lastNameGuess === "JOHNSON") ||
    (firstNameGuess === "" && lastNameGuess === "JOHNSON")
  ) {
    localStorage.setItem("math", "complete");
    nameGuessCount = 0;
    console.log("yoooo");
    let nameguess = document.getElementById("nameMguess");
    nameguess.classList.add("hidden");
    // let win = document.getElementById("299");
    let mathClues = document.getElementById("math-clues");
    mathClues.classList.add("hidden");
    // win.classList.toggle("hidden");
    let mathScene = document.getElementById("mathscene");
    mathScene.innerHTML = "<b>Math Room</b>: Katherine Johnson";
  } else if (nameGuessCount === 3) {
    localStorage.setItem("math", "complete");
    // let lose = document.getElementById("29");
    // lose.classList.toggle("hidden");

    let nameguess = document.getElementById("nameMguess");
    nameguess.classList.add("hidden");
    let mathScene = document.getElementById("mathscene");
    mathScene.innerHTML = "<b>Math Room</b>: Katherine Johnson";
  } else {
    nameGuessCount++;
  }
  firstnameGuess.value = "";
  lastnameGuess.value = "";
}

function checkName() {
  nameguess.classList.toggle("hidden");
  console.log("pleaseeee");
  guessButton.addEventListener("click", submitMName);
}
export default class Math extends Phaser.Scene {
  constructor() {
    super("Math");
  }

  preload() {
    this.load.tilemapTiledJSON(
      "mathMap",
      "../public/assets/tilemaps/MathRoom.json"
    );
    // tilesets
    this.load.image("lobbyTiles", "../public/assets/tilesets/LobbyTiles.png");
    this.load.image(
      "furniture",
      "../public/assets/tilesets/studyTimeTiles.png"
    );
    this.load.image("school", "../public/assets/tilesets/schoolmap.png");
    // objects
    this.load.image("Pennant", "../public/assets/images/WVSUPennant.png");
    this.load.image("Medal", "../public/assets/images/PMoF.png");
    this.load.image("Calculator", "../public/assets/images/Calculator.png");
    this.load.image("Moon", "../public/assets/images/FullMoon.png");
    this.load.image("Rocket", "../public/assets/images/RocketWhite.png");
    this.load.image("ExitDoor", "../public/assets/images/exitDoor.png");

    this.load.spritesheet(
      "katherine",
      "../public/assets/sprites/katherine.png",
      {
        frameWidth: 32,
        frameHeight: 32,
      }
    );
  }

  create() {
    console.log(this.cache.tilemap.get("mathMap").data);
    let localCount = localStorage.getItem("mcount");
    if (localStorage.getItem("math") === "complete") {
      mathClueList.classList.toggle("hidden");
    } else if (localCount === "4") {
      let mathClues = document.getElementById("math-clues");
      mathClues.classList.remove("hidden");
      let clue30 = document.getElementById("30");
      let clue31 = document.getElementById("31");
      let clue32 = document.getElementById("32");
      let clue33 = document.getElementById("33");
      clue30.classList.remove("hidden");
      clue31.classList.remove("hidden");
      clue32.classList.remove("hidden");
      clue33.classList.remove("hidden");
      let count = document.getElementById("mathClueCount");
      count.innerText = localCount;
      let dialogue = document.getElementById("inner");
      dialogue.innerText =
        "Great job! Why don't we head back to the main lobby?";
      checkName();
    } else {
      mathClueList.classList.remove("hidden");
    }
    let lobbyClues = document.getElementById("clue-list");
    lobbyClues.classList.add("hidden");

    // let mathCluesText = document.getElementById('math-clues');
    // mathCluesText.classList.remove('hidden');

    const map = this.make.tilemap({
      key: "mathMap",
      tileWidth: 32,
      tileHeight: 32,
    });

    const lobbyTiles = map.addTilesetImage("LobbyTiles", "lobbyTiles");
    const furnitureTiles = map.addTilesetImage("studyTimeTiles", "furniture");
    const schoolTiles = map.addTilesetImage("SchoolTiles", "school");

    let floorLayer = map.createLayer("Floor", [lobbyTiles, schoolTiles]);
    let windowLayer = map.createLayer("Windows", [
      schoolTiles,
      furnitureTiles,
      lobbyTiles,
    ]);
    let furnitureLayer = map.createLayer("Furniture", furnitureTiles);
    let stuffLayer = map.createLayer("Stuff", [furnitureTiles, schoolTiles]);
    let topFurnitureLayer = map.createLayer("Top Furniture", [
      furnitureTiles,
      schoolTiles,
    ]);

    this.player = new Player(this, 470, 590, "katherine").setScale(1.1);

    this.createAnimations();

    this.cursors = this.input.keyboard.createCursorKeys();

    let mathClues = map.getObjectLayer("MathClues")["objects"];
    item = this.physics.add.staticGroup();

    mathClues.forEach((object) => {
      let obj = item.create(object.x, object.y, object.name);
      obj.setScale(object.width / object.width, object.height / object.height);
      obj.setOrigin(0);
      obj.body.width = object.width;
      obj.body.height = object.height;
    });
    this.physics.add.overlap(this.player, item, this.mCollect, null, this);

    let exitDoor = map.getObjectLayer("Door")["objects"];
    door = this.physics.add.staticGroup();

    exitDoor.forEach((object) => {
      let obj = door.create(object.x, object.y, object.name);
      obj.setScale(object.width / object.width, object.height / object.height);
      obj.setOrigin(0);
      obj.body.width = object.width;
      obj.body.height = object.height;
    });
    this.physics.add.overlap(this.player, door, this.exit, null, this);

    let rocketLayer = map.getObjectLayer("Rocket")["objects"];
    rocket = this.physics.add.staticGroup();

    rocketLayer.forEach((object) => {
      let obj = rocket.create(object.x, object.y, object.name);
      obj.setScale(object.width / object.width, object.height / object.height);
      obj.setOrigin(0);
      obj.body.width = object.width;
      obj.body.height = object.height;
    });
    this.physics.add.overlap(this.player, rocket, this.startGame, null, this);

    furnitureLayer.setCollisionByExclusion([-1]);
    windowLayer.setCollisionByExclusion([-1]);
    stuffLayer.setCollisionByExclusion([-1]);
    topFurnitureLayer.setCollisionByExclusion([-1]);

    this.physics.add.collider(this.player, furnitureLayer);
    this.physics.add.collider(this.player, windowLayer);
    this.physics.add.collider(this.player, stuffLayer);
    this.physics.add.collider(this.player, topFurnitureLayer);
  }

  update() {
    this.player.update(this.cursors);
  }

  mCollect(player, object) {
    if (localStorage.getItem(object.texture.key)) {
      console.log("You already found that clue!");
      return false;
    }
    mathClueCount += 1;
    localStorage.setItem("mcount", mathClueCount);
    object.destroy(object.x, object.y);

    // text.setText(`Clues: y`); // set the text to show the current score
    let clue30 = document.getElementById("30");
    let clue31 = document.getElementById("31");
    let clue32 = document.getElementById("32");
    let clue33 = document.getElementById("33");
    let clue103 = document.getElementById("103");

    let count = document.getElementById("mathClueCount");
    count.innerText = mathClueCount;
    let objName = object.texture.key;

    if (objName === "Pennant") {
      this.setItem(objName, "collected");
      clue30.classList.remove("hidden");
    } else if (objName === "Medal") {
      this.setItem(objName, "collected");
      clue31.classList.remove("hidden");
    } else if (objName === "Calculator") {
      this.setItem(objName, "collected");
      clue32.classList.remove("hidden");
    } else if (objName === "Moon") {
      this.setItem(objName, "collected");
      clue33.classList.remove("hidden");
    }

    let localCount = localStorage.getItem("mcount");
    if (localCount === "3") {
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

  startGame() {
    this.scene.stop("Math");
    this.scene.start("SpaceInvaders", SpaceInvaders);
  }

  exit() {
    let nameguess = document.getElementById("nameMguess");
    nameguess.classList.add("hidden");
    mathClueList.classList.add("hidden");
    this.scene.stop("Math");
    this.scene.start("Lobby", Lobby);
  }

  createAnimations() {
    this.player.anims.create({
      key: "walk right",
      frames: this.anims.generateFrameNumbers("katherine", {
        start: 6,
        end: 8,
      }),
      frameRate: 6,
      repeat: -1,
    });
    this.player.anims.create({
      key: "walk left",
      frames: this.anims.generateFrameNumbers("katherine", {
        start: 3,
        end: 5,
      }),
      frameRate: 6,
      repeat: -1,
    });
    this.player.anims.create({
      key: "walk up",
      frames: this.anims.generateFrameNumbers("katherine", {
        start: 9,
        end: 11,
      }),
      frameRate: 6,
      repeat: -1,
    });
    this.player.anims.create({
      key: "walk down",
      frames: this.anims.generateFrameNumbers("katherine", {
        start: 0,
        end: 2,
      }),
      frameRate: 6,
      repeat: -1,
    });
    this.player.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("katherine", {
        start: 1,
        end: 1,
      }),
      frameRate: 6,
      repeat: -1,
    });
  }
}
