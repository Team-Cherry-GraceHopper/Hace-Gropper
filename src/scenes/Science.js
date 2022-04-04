import Phaser from "phaser";
import Player from "../entities/Player";
import Memory from "../scenes/Memory";

let item;
let sciDoor;
let scienceClues = document.getElementById("science-clues");
let sciClueCount = 0;
let nameGuessCount = 1;
let guessButton = document.getElementById("subsname");
let firstnameSGuess = document.getElementById("firstnamesguess");
let lastnameSGuess = document.getElementById("lastnamesguess");
let nameguess = document.getElementById("nameSguess");
function submitSName() {
  const firstNameGuess = firstnameSGuess.value.toUpperCase();
  const lastNameGuess = lastnameSGuess.value.toUpperCase();
  if (
    (firstNameGuess === "ROSALIND" && lastNameGuess === "FRANKLIN") ||
    (firstNameGuess === "" && lastNameGuess === "FRANKLIN")
  ) {
    localStorage.setItem("sci", "complete");
    nameGuessCount = 1;
    console.log("yoooo");
    let nameguess = document.getElementById("nameSguess");
    nameguess.classList.add("hidden");
    // let sciClues = document.getElementById("science-clues");
    scienceClues.classList.toggle("hidden");
    let sciScene = document.getElementById("sciscene");
    sciScene.innerHTML = "<b>Science Room</b>: Rosalind Franklin";
    let sciBlock = document.getElementById("science-clues");
    sciBlock.classList.add("hidden");
  } else if (nameGuessCount === 3) {
    localStorage.setItem("sci", "complete");
    let sciBlock = document.getElementById("science-clues");
    sciBlock.classList.add("hidden");
    let nameguess = document.getElementById("nameSguess");
    nameguess.classList.add("hidden");
    let sciScene = document.getElementById("sciscene");
    sciScene.innerHTML = "<b>Science Room</b>: Rosalind Franklin";
  } else {
    nameGuessCount++;
  }
  firstnameSGuess.value = "";
  lastnameSGuess.value = "";
}

function checkSName() {
  nameguess.classList.toggle("hidden");
  console.log("pleaseeee");
  guessButton.addEventListener("click", submitSName);
}
export default class Science extends Phaser.Scene {
  constructor() {
    super("Science");
  }

  preload() {
    this.load.tilemapTiledJSON(
      "sciMap",
      "../public/assets/tilemaps/ScienceRoom.json"
    );
    this.load.image("lab", "../public/assets/tilesets/lab.png");
    this.load.image(
      "furniture",
      "../public/assets/tilesets/shop-and-hospital.png"
    );

    this.load.image("lobby", "../public/assets/tilesets/LobbyTiles.png");
    this.load.image("chemical", "../public/assets/images/chemical.png");
    this.load.image("coal", "../public/assets/images/coal.png");
    this.load.image("research", "../public/assets/images/research.png");
    this.load.image("dna", "../public/assets/images/dna.png");
    this.load.image("sciDoor", "../public/assets/images/sciDoor.png");

    this.load.spritesheet("rosalind", "../public/assets/sprites/rosalind.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create() {
    console.log(this.cache.tilemap.get("sciMap").data);

    if (localStorage.getItem("science") === "complete") {
      scienceClues.classList.toggle("hidden");
    } else {
      scienceClues.classList.remove("hidden");
    }
    let lobbyClues = document.getElementById("clue-list");
    lobbyClues.classList.add("hidden");
    const map = this.make.tilemap({
      key: "sciMap",
      tileWidth: 32,
      tileHeight: 32,
    });

    const labTiles = map.addTilesetImage("lab", "lab");
    const furnitureTiles = map.addTilesetImage("furniture", "furniture");
    const lobbyTiles = map.addTilesetImage("LobbyTiles", "lobby");

    let floorLayer = map.createLayer("Floors", [labTiles, lobbyTiles]);
    let wallLayer = map.createLayer("Walls", labTiles);
    let furnitureLayer = map.createLayer("Furniture", furnitureTiles);
    let objectLayer = map.createLayer("Objects", furnitureTiles);

    this.player = new Player(this, 470, 590, "rosalind").setScale(1.5);

    this.createAnimations();

    this.cursors = this.input.keyboard.createCursorKeys();

    let clues = map.getObjectLayer("Clues")["objects"];
    let door = map.getObjectLayer("Door")["objects"];
    item = this.physics.add.staticGroup();
    sciDoor = this.physics.add.staticGroup();

    clues.forEach((object) => {
      let obj = item.create(object.x, object.y, object.name);
      obj.setScale(object.width / object.width, object.height / object.height);
      obj.setOrigin(0);
      obj.body.width = object.width;
      obj.body.height = object.height;
    });

    door.forEach((object) => {
      let obj = sciDoor.create(object.x, object.y, object.name);
      obj.setScale(object.width / object.width, object.height / object.height);
      obj.setOrigin(0);
      obj.body.width = object.width;
      obj.body.height = object.height;
    });

    this.physics.add.overlap(this.player, item, this.collect, null, this);
    this.physics.add.overlap(this.player, sciDoor, this.exit, null, this);

    furnitureLayer.setCollisionByExclusion([-1]);
    objectLayer.setCollisionByExclusion([-1]);
    wallLayer.setCollisionByExclusion([-1]);

    this.physics.add.collider(this.player, furnitureLayer);
    this.physics.add.collider(this.player, wallLayer);
    this.physics.add.collider(this.player, objectLayer);
  }

  update() {
    this.player.update(this.cursors);
  }

  collect(player, object) {
    if (localStorage.getItem(object.texture.key)) {
      // need to work on this
      console.log("You already found that clue!");
      return false;
    }

    sciClueCount += 1;
    localStorage.setItem("scount", sciClueCount);
    object.destroy(object.x, object.y);
    // text.setText(`Clues: y`); // set the text to show the current score
    let clue3 = document.getElementById("3");
    let clue4 = document.getElementById("4");
    let clue5 = document.getElementById("5");
    let clue6 = document.getElementById("6");
    let clue101 = document.getElementById("101");

    let count = document.getElementById("sciClueCount");
    count.innerText = sciClueCount;
    let objName = object.texture.key;

    if (objName === "chemical") {
      this.setItem(objName, "collected");
      clue3.classList.remove("hidden");
    } else if (objName === "dna") {
      this.setItem(objName, "collected");
      clue4.classList.remove("hidden");
    } else if (objName === "research") {
      this.setItem(objName, "collected");
      clue5.classList.remove("hidden");
    } else if (objName === "coal") {
      this.setItem(objName, "collected");
      clue6.classList.remove("hidden");
    }
    let localCount = localStorage.getItem("scount");
    if (localCount === "4") {
      let dialogue = document.getElementById("inner");
      dialogue.innerText =
        "You did it! Why don't you go back to the main lobby?";
      // clue3.classList.toggle("hidden");
      // clue4.classList.toggle("hidden");
      // clue5.classList.toggle("hidden");
      // clue6.classList.toggle("hidden");
      // clue101.classList.remove("hidden");
      // let count = document.getElementById("sciClueCount");
      // count.innerText = localCount;

      checkSName();

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
    let sciClues = document.getElementById("science-clues");
    this.scene.stop("Science");
    const num = localStorage.getItem("scount");
    if (num === "4") {
      this.scene.start("Memory");
    } else {
      sciClues.classList.add("hidden");
      let lobbyClues = document.getElementById("clue-list");
      lobbyClues.classList.toggle("hidden");
      this.scene.start("Lobby");
    }
  }

  createAnimations() {
    this.player.anims.create({
      key: "walk right",
      frames: this.anims.generateFrameNumbers("rosalind", { start: 6, end: 8 }),
      frameRate: 6,
      repeat: -1,
    });
    this.player.anims.create({
      key: "walk left",
      frames: this.anims.generateFrameNumbers("rosalind", { start: 3, end: 5 }),
      frameRate: 6,
      repeat: -1,
    });
    this.player.anims.create({
      key: "walk up",
      frames: this.anims.generateFrameNumbers("rosalind", {
        start: 9,
        end: 11,
      }),
      frameRate: 6,
      repeat: -1,
    });
    this.player.anims.create({
      key: "walk down",
      frames: this.anims.generateFrameNumbers("rosalind", { start: 0, end: 2 }),
      frameRate: 6,
      repeat: -1,
    });
    this.player.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("rosalind", { start: 1, end: 1 }),
      frameRate: 6,
      repeat: -1,
    });
  }
}
