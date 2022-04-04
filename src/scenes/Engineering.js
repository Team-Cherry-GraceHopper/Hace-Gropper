import Phaser from "phaser";
import Player from "../entities/Player";
import Lobby from "./Lobby";

let eItem;
let eObject;
let EngineeringClues;
let Door;
let backToLobbyDoor;
let eClueCount = 0;
let engineeringClues = document.getElementById("engineering-clues");
let nameGuessCount = 1;
let guessButton = document.getElementById("subename");
let firstnameEGuess = document.getElementById("firstenameguess");
let lastnameEGuess = document.getElementById("lastenameguess");
let nameguess = document.getElementById("nameEguess");
function submitEName() {
  const firstNameGuess = firstnameEGuess.value.toUpperCase();
  const lastNameGuess = lastnameEGuess.value.toUpperCase();
  if (
    (firstNameGuess === "MARY" && lastNameGuess === "ROSS") ||
    (firstNameGuess === "" && lastNameGuess === "ROSS")
  ) {
    localStorage.setItem("eng", "complete");
    nameGuessCount = 1;
    console.log("yoooo");
    let nameguess = document.getElementById("nameEguess");
    nameguess.classList.add("hidden");
    let engClues = document.getElementById("engineering-clues");
    engClues.classList.add("hidden");
    let engScene = document.getElementById("engscene");
    engScene.innerHTML = "<b>Engineering Room</b>: Mary Golda Ross";
    let engBlock = document.getElementById("engineering-clues");
    engBlock.classList.add("hidden");
  } else if (nameGuessCount === 3) {
    localStorage.setItem("math", "complete");
    let engBlock = document.getElementById("engineering-clues");
    engBlock.classList.add("hidden");
    let nameguess = document.getElementById("nameEguess");
    nameguess.classList.add("hidden");
    let engScene = document.getElementById("engscene");
    engScene.innerHTML = "<b>Engineering Room</b>: Mary Golda Ross";
  } else {
    nameGuessCount++;
  }
  firstnameEGuess.value = "";
  lastnameEGuess.value = "";
}

function checkEName() {
  nameguess.classList.toggle("hidden");
  console.log("pleaseeee");
  guessButton.addEventListener("click", submitEName);
}
export default class Engineering extends Phaser.Scene {
  constructor() {
    super("Engineering");
  }
  preload() {
    this.load.tilemapTiledJSON(
      "enginMap",
      "../public/assets/tilemaps/engineeringnew4.json"
    );
    this.load.image(
      "engineeringFloor",
      "../public/assets/tilesets/LobbyTiles.png"
    );
    this.load.image(
      "spaceStationpng",
      "../public/assets/tilesets/neotiles.png"
    );
    this.load.image(
      "furniturepng",
      "../public/assets/tilesets/shop-and-hospital.png"
    );
    this.load.image(
      "chalkboardpng",
      "../public/assets/tilesets/chalkboards.png"
    );
    this.load.image(
      "plantsAndDecorPng",
      "../public/assets/tilesets/studyTimeTiles.png"
    );
    this.load.image("planet", "../public/assets/images/purplePlanet.png");
    this.load.image("coin", "../public/assets/images/coin.png");
    this.load.image("skunk", "../public/assets/images/skunk.png");
    this.load.image("flag", "../public/assets/images/cherokeeFlag.png");
    this.load.image("lock", "../public/assets/images/lock.png");
    this.load.image("door", "../public/assets/images/Door.png");
    this.load.spritesheet("mary", "../public/assets/sprites/marySprite.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create() {
    if (localStorage.getItem("eng") === "complete") {
      engineeringClues.classList.toggle("hidden");
    } else {
      engineeringClues.classList.remove("hidden");
    }
    let lobbyClues = document.getElementById("clue-list");
    lobbyClues.classList.add("hidden");
    this.add.image(0, 0, "engineeringFloor");

    // engineeringClues.classList.remove("hidden")

    const map = this.make.tilemap({
      key: "enginMap",
      tileWidth: 32,
      tileHeight: 32,
    });

    // add tileset image to tilemap p1= name of tileset in Tiled, p2= is key in png in preload
    const engineeringTiles = map.addTilesetImage(
      "LobbyTiles",
      "engineeringFloor"
    );
    const spaceStationTiles = map.addTilesetImage(
      "spacestation",
      "spaceStationpng"
    );
    const furnitureTiles = map.addTilesetImage(
      "shop-and-hospital",
      "furniturepng"
    );
    const chalkboardTiles = map.addTilesetImage(
      "building_inner-tileg",
      "chalkboardpng",
      32,
      32
    );
    const plantsAndDecorTiles = map.addTilesetImage(
      "furniture",
      "plantsAndDecorPng"
    );

    // create layer in order, p1=name of layer in Tiled, p2= tileset image constant it's referring to
    let floorLayer = map.createLayer("Floor", engineeringTiles);
    let wallLayer = map.createLayer("Wall", engineeringTiles);
    let spaceStation = map.createLayer("spaceStation", spaceStationTiles);
    let furnitureLayer = map.createLayer("Furniture", furnitureTiles);
    let chalkboardLayer = map.createLayer("ChalkBoards", chalkboardTiles);
    let plantsAndDecorLayer = map.createLayer("Objects", plantsAndDecorTiles);

    this.player = new Player(this, 470, 610, "mary").setScale(1.5);
    this.createAnimations();
    this.cursors = this.input.keyboard.createCursorKeys();

    EngineeringClues = map.getObjectLayer("Clues")["objects"];
    eItem = this.physics.add.staticGroup();

    EngineeringClues.forEach((object) => {
      let obj = eItem.create(object.x, object.y, object.name);
      obj.setScale(object.width / object.width, object.height / object.height);
      obj.setOrigin(0);
      obj.body.width = object.width;
      obj.body.height = object.height;
    });

    // Door layers
    Door = map.getObjectLayer("Door")["objects"];
    backToLobbyDoor = this.physics.add.staticGroup();
    Door.forEach((object) => {
      let obj = backToLobbyDoor.create(object.x, object.y, object.name);
      obj.setScale(object.width / object.width, object.height / object.height);
      obj.setOrigin(0);
      obj.body.width = object.width;
      obj.body.height = object.height;
    });

    this.physics.add.overlap(this.player, eItem, this.eCollect, null, this);
    this.physics.add.overlap(
      this.player,
      backToLobbyDoor,
      this.exitRoom,
      null,
      this
    );

    wallLayer.setCollisionByExclusion([-1]);
    spaceStation.setCollisionByExclusion([-1]);
    furnitureLayer.setCollisionByExclusion([-1]);
    chalkboardLayer.setCollisionByExclusion([-1]);
    plantsAndDecorLayer.setCollisionByExclusion([-1]);
    // this.physics.add.collider(this.player, wallLayer);
    this.physics.add.collider(this.player, spaceStation);
    this.physics.add.collider(this.player, furnitureLayer);
    this.physics.add.collider(this.player, chalkboardLayer);
    this.physics.add.collider(this.player, plantsAndDecorLayer);
  }

  update() {
    this.player.update(this.cursors);
  }

  exitRoom() {
    let engClues = document.getElementById("engineering-clues");
    this.scene.stop("Engineering");
    const num = localStorage.getItem("ecount");
    if (num === "5") {
      this.scene.start("Scrammble");
    } else {
      engClues.classList.add("hidden");
      let lobbyClues = document.getElementById("clue-list");
      lobbyClues.classList.toggle("hidden");
      this.scene.start("Lobby");
    }
    // engineeringClues.classList.toggle("hidden")
  }

  eCollect(player, object) {
    if (localStorage.getItem(object.texture.key)) {
      // need to work on this
      console.log("You already found that clue!");
      return false;
    }
    eClueCount += 1;
    localStorage.setItem("ecount", eClueCount);
    object.destroy(object.x, object.y);
    let clue7 = document.getElementById("7");
    let clue8 = document.getElementById("8");
    let clue9 = document.getElementById("9");
    let clue10 = document.getElementById("10");
    let clue11 = document.getElementById("11");
    let clue100 = document.getElementById("100");

    let count = document.getElementById("eClueCount");
    count.innerText = eClueCount;
    let objName = object.texture.key;

    if (objName === "planet") {
      this.setItem(objName, "collected");
      clue11.classList.remove("hidden");
    } else if (objName === "coin") {
      this.setItem(objName, "collected");
      clue8.classList.remove("hidden");
    } else if (objName === "skunk") {
      this.setItem(objName, "collected");
      clue9.classList.remove("hidden");
    } else if (objName === "flag") {
      this.setItem(objName, "collected");
      clue7.classList.remove("hidden");
    } else if (objName === "lock") {
      this.setItem(objName, "collected");
      clue10.classList.remove("hidden");
    }
    let localCount = localStorage.getItem("ecount");
    if (localCount === "5") {
      localStorage.setItem("eng", "complete");
      let dialogue = document.getElementById("inner");
      dialogue.innerText = "You did it!";
      // setTimeout(() => {
      //   clue7.classList.toggle("hidden");
      //   clue8.classList.toggle("hidden");
      //   clue9.classList.toggle("hidden");
      //   clue10.classList.toggle("hidden");
      //   clue11.classList.toggle("hidden");
      //   clue100.classList.remove("hidden");
      //   engScene.innerHTML = "<b>Engineering Room</b>: Mary Golda Ross";
      // }, 3000);
      checkEName();
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
    this.player.anims.create({
      key: "walk right",
      frames: this.anims.generateFrameNumbers("mary", { start: 6, end: 8 }),
      frameRate: 6,
      repeat: -1,
    });
    this.player.anims.create({
      key: "walk left",
      frames: this.anims.generateFrameNumbers("mary", { start: 2, end: 5 }),
      frameRate: 6,
      repeat: -1,
    });
    this.player.anims.create({
      key: "walk up",
      frames: this.anims.generateFrameNumbers("mary", { start: 9, end: 11 }),
      frameRate: 6,
      repeat: -1,
    });
    this.player.anims.create({
      key: "walk down",
      frames: this.anims.generateFrameNumbers("mary", { start: 0, end: 2 }),
      frameRate: 6,
      repeat: -1,
    });
    this.player.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("mary", { start: 0, end: 0 }),
      frameRate: 6,
      repeat: -1,
    });
  }
}
