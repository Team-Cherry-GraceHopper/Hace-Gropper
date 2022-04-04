import Phaser from "phaser";
import Player from "../entities/Player";
import Technology from "./Technology";
import Engineering from "./Engineering";
import Math from "./Math";
import config from "../config/config";

let clueList = document.getElementById("clue-list");

let lobbyScene = document.getElementById("lobbyscene");
let sciScene = document.getElementById("sciscene");
let techScene = document.getElementById("techscene");
let engScene = document.getElementById("engscene");
let mathScene = document.getElementById("mathscene");

let restartButton = document.getElementById("restart-hg");
restartButton.addEventListener("click", () => {
  localStorage.clear();
  clueList.classList.remove("hidden");
  lobbyScene.innerHTML = "";
  sciScene.innerHTML = "";
  techScene.innerHTML = "";
  engScene.innerHTML = "";
  mathScene.innerHTML = "";
  window.location.reload();
});

lobbyScene.innerHTML = localStorage.getItem("lobby")
  ? "<b>Lobby</b>: Grace Hopper"
  : null;
sciScene.innerHTML = localStorage.getItem("science")
  ? "<b>Science Room</b>: Rosalind Franklin"
  : null;
techScene.innerHTML = localStorage.getItem("tech")
  ? "<b>Technology Room</b>: Lynn Conway"
  : null;
engScene.innerHTML = localStorage.getItem("eng")
  ? "<b>Engineering Room</b>: Mary G Ross"
  : null;
mathScene.innerHTML = localStorage.getItem("math")
  ? "<b>Math Room</b>: Katherine Johnson"
  : null;

let Clues;
let item;
let object;
let SDoor;
let TDoor;
let EDoor;
let MDoor;
let engDoor;
let mathDoor;
let sciDoor;
let clueCount = 0;
let techDoor;
let nameGuessCount = 1;
let guessButton = document.getElementById("sublname");
let firstnameLGuess = document.getElementById("firstnamelguess");
let lastnameLGuess = document.getElementById("lastnamelguess");
let nameguess = document.getElementById("nameLguess");
function submitLName() {
  const firstNameGuess = firstnameLGuess.value.toUpperCase();
  const lastNameGuess = lastnameLGuess.value.toUpperCase();
  if (
    (firstNameGuess === "GRACE" && lastNameGuess === "HOPPER") ||
    (firstNameGuess === "" && lastNameGuess === "HOPPER")
  ) {
    localStorage.setItem("lobby", "complete");
    let dialogue = document.getElementById("inner");
    setTimeout(() => {
      dialogue.innerText =
        "Look behind those curtains at the top of the room. They each have letters...what do they mean?";
    }, 2000);
    nameGuessCount = 1;
    console.log("yoooo");
    let nameguess = document.getElementById("nameLguess");
    nameguess.classList.add("hidden");
    let lobbyClues = document.getElementById("clue-list");
    lobbyClues.classList.add("hidden");
    let lobbyScene = document.getElementById("lobbyscene");
    lobbyScene.innerHTML = "<b>Lobby</b>: Grace Hopper";
    let lobbyBlock = document.getElementById("clue-list");
    lobbyBlock.classList.add("hidden");
  } else if (nameGuessCount === 3) {
    localStorage.setItem("lobby", "complete");
    let dialogue = document.getElementById("inner");
    setTimeout(() => {
      dialogue.innerText =
        "Look behind those curtains at the top of the room. They each have letters...what do they mean?";
    }, 2000);
    let lobbyBlock = document.getElementById("clue-list");
    lobbyBlock.classList.add("hidden");
    let nameguess = document.getElementById("nameLguess");
    nameguess.classList.add("hidden");
    let lobbyScene = document.getElementById("lobbyscene");
    sciScene.innerHTML = "<b>Lobby</b>: Grace Hopper";
  } else {
    nameGuessCount++;
  }
  firstnameLGuess.value = "";
  lastnameLGuess.value = "";
}

function checkLName() {
  nameguess.classList.toggle("hidden");
  console.log("pleaseeee");
  guessButton.addEventListener("click", submitLName);
}
export default class Lobby extends Phaser.Scene {
  constructor() {
    super({ key: "Lobby" });
  }

  preload() {
    this.load.tilemapTiledJSON("map", "../public/assets/tilemaps/GHLobby.json");
    this.load.image("lobby", "../public/assets/tilesets/LobbyTiles.png");
    this.load.image("text", "../public/assets/tilesets/Text.png");
    this.load.image("Ship", "../public/assets/images/navyShip.png");
    this.load.image("Moth", "../public/assets/images/CompPic.png");
    this.load.image("Engineering", "../public/assets/images/Door.png");
    this.load.image("Math", "../public/assets/images/Door.png");
    this.load.image("Science", "../public/assets/images/Door.png");
    this.load.image("Tech", "../public/assets/images/Door.png");
    this.load.spritesheet(
      "grace",
      "../public/assets/sprites/gh-spritesheet.png",
      {
        frameWidth: 17,
        frameHeight: 34,
      }
    );
  }

  create() {
    if (
      localStorage.getItem("lobby") === "complete" &&
      localStorage.getItem("sci") === "complete" &&
      localStorage.getItem("eng") === "complete" &&
      localStorage.getItem("math") === "complete" &&
      localStorage.getItem("tech") === "complete"
    ) {
      this.scene.stop("Lobby");
      this.scene.start("EndCreds");
    }
    if (localStorage.getItem("lobby") === "complete") {
      clueList.classList.add("hidden");
    } else {
      clueList.classList.remove("hidden");
    }

    console.log(this.cache.tilemap.get("map").data);
    const rules = document.getElementById("rules");
    const playGameBtn = document.getElementById("play-maingame-btn");

    playGameBtn.addEventListener("click", function (e) {
      rules.classList.add("hidden");
    });

    // console.log(this.cache.tilemap.get("map").data);
    const map = this.make.tilemap({
      key: "map",
      tileWidth: 32,
      tileHeight: 32,
    });

    const lobbyTiles = map.addTilesetImage("Walls and Floor", "lobby");
    const textTiles = map.addTilesetImage("Text", "text");

    let floorLayer = map.createLayer("Floor and Wall", lobbyTiles);
    let furnitureLayer = map.createLayer("Furniture", lobbyTiles);
    let objectLayer = map.createLayer("Objects", lobbyTiles);
    let letterLayer = map.createLayer("Letters", textTiles);

    this.player = new Player(this, 470, 610, "grace").setScale(1.75); //Joe is pleased

    // this.item = new InteractableObj(this, 'ship')

    //Player class might have five different modes - grace, mary, etc...

    this.createAnimations(); //maybe also move this to player class?

    this.cursors = this.input.keyboard.createCursorKeys(); // move this to PLayer class

    // this.createCollisions();

    Clues = map.getObjectLayer("Clues")["objects"];

    // Doors layers

    SDoor = map.getObjectLayer("SDoor")["objects"];
    TDoor = map.getObjectLayer("TDoor")["objects"];
    EDoor = map.getObjectLayer("EDoor")["objects"];
    MDoor = map.getObjectLayer("MDoor")["objects"];

    item = this.physics.add.staticGroup();
    engDoor = this.physics.add.staticGroup();
    techDoor = this.physics.add.staticGroup();
    mathDoor = this.physics.add.staticGroup();
    sciDoor = this.physics.add.staticGroup();
    techDoor = this.physics.add.staticGroup();

    Clues.forEach((object) => {
      let obj = item.create(object.x, object.y, object.name);
      obj.setScale(object.width / object.width, object.height / object.height);
      obj.setOrigin(0);
      obj.body.width = object.width;
      obj.body.height = object.height;
      console.log(item);
    });
    TDoor.forEach((object) => {
      let obj = techDoor.create(object.x, object.y, object.name);
      obj.setScale(object.width / object.width, object.height / object.height);
      obj.setOrigin(0);
      obj.body.width = object.width;
      obj.body.height = object.height;
    });
    EDoor.forEach((object) => {
      let obj = engDoor.create(object.x, object.y, object.name);
      obj.setScale(object.width / object.width, object.height / object.height);
      obj.setOrigin(0);
      obj.body.width = object.width;
      obj.body.height = object.height;
    });

    MDoor.forEach((object) => {
      let obj = mathDoor.create(object.x, object.y, object.name);
      obj.setScale(object.width / object.width, object.height / object.height);
      obj.setOrigin(0);
      obj.body.width = object.width;
      obj.body.height = object.height;
    });

    SDoor.forEach((object) => {
      let obj = sciDoor.create(object.x, object.y, object.name);
      obj.setScale(object.width / object.width, object.height / object.height);
      obj.setOrigin(0);
      obj.body.width = object.width;
      obj.body.height = object.height;
    });

    this.physics.add.overlap(this.player, item, this.collect, null, this);
    this.physics.add.overlap(this.player, engDoor, this.enterERoom, null, this);
    this.physics.add.overlap(
      this.player,
      mathDoor,
      this.enterMRoom,
      null,
      this
    );
    this.physics.add.overlap(this.player, sciDoor, this.enterSRoom, null, this);
    this.physics.add.overlap(
      this.player,
      techDoor,
      this.enterTRoom,
      null,
      this
    );

    furnitureLayer.setCollisionByExclusion([-1]);
    objectLayer.setCollisionByExclusion([-1]);
    this.physics.add.collider(this.player, furnitureLayer);
    this.physics.add.collider(this.player, objectLayer);
    let curtainsLayer = map.createLayer("Curtains", lobbyTiles);
  }

  update() {
    this.player.update(this.cursors);
  }
  enterTRoom() {
    let dialogue = document.getElementById("inner");
    setTimeout(() => {
      dialogue.innerText = "try looking around the room a bit!";
    }, 2000);
    this.scene.stop("Lobby");
    this.scene.start("Technology", Technology);
  }
  enterERoom() {
    let dialogue = document.getElementById("inner");
    setTimeout(() => {
      dialogue.innerText = "try looking around the room a bit!";
    }, 2000);
    this.scene.stop("Lobby");
    this.scene.start("Engineering", Engineering);
  }

  enterMRoom() {
    let dialogue = document.getElementById("inner");
    setTimeout(() => {
      dialogue.innerText = "try looking around the room a bit!";
    }, 2000);
    this.scene.stop("Lobby");
    this.scene.start("Math", Math);
  }

  enterSRoom() {
    let dialogue = document.getElementById("inner");
    setTimeout(() => {
      dialogue.innerText = "try looking around the room a bit!";
    }, 2000);
    this.scene.stop("Lobby");
    this.scene.start("Science");
  }

  collect(player, object) {
    if (this.getItem(object.texture.key)) {
      // need to work on this
      console.log("You already found that clue!");
      return false;
    }
    // this is what happens when we overlap with the object
    clueCount += 1;
    localStorage.setItem("lcount", clueCount);
    object.destroy(object.x, object.y);
    let clue1 = document.getElementById("1");
    let clue2 = document.getElementById("2");
    let clue99 = document.getElementById("99");
    let count = document.getElementById("clueCount");
    count.innerText = clueCount;

    // console.log(object); // object name
    let objName = object.texture.key;

    if (objName === "Ship") {
      this.setItem(objName, "collected");
      clue1.classList.remove("hidden");
    } else if (objName === "Moth") {
      this.setItem(objName, "collected");
      clue2.classList.remove("hidden");
    }

    let lobbyCount = localStorage.getItem("lcount");

    if (lobbyCount === "2") {
      checkLName();

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

  createAnimations() {
    // Joe says this belongs in the player class, even if it changes by scene - it's attached to each specific sprite
    this.anims.create({
      key: "walk right",
      frames: this.anims.generateFrameNumbers("grace", { start: 11, end: 14 }),
      //something to keep in mind about line 62 - it is a decision that youre making and it can be a return from a function i.e. getWalkRight and you can pass in string, if character === grace return start (numbers) else if character === mary start(marynumbers)
      //each mechanism is like its own system

      frameRate: 6,
      repeat: -1,
    });
    this.anims.create({
      key: "walk left",
      frames: this.anims.generateFrameNumbers("grace", { start: 15, end: 18 }),
      frameRate: 6,
      repeat: -1,
    });
    this.anims.create({
      key: "walk up",
      frames: this.anims.generateFrameNumbers("grace", { start: 23, end: 30 }),
      frameRate: 6,
      repeat: -1,
    });
    this.anims.create({
      key: "walk down",
      frames: this.anims.generateFrameNumbers("grace", { start: 0, end: 6 }),
      frameRate: 6,
      repeat: -1,
    });
    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("grace", { start: 0, end: 0 }),
      frameRate: 6,
      repeat: -1,
    });
  }
}
