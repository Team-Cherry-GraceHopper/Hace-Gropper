import Phaser from "phaser";
import Player from "../entities/Player";

let item;
let text;
let object;
let Clues;

export default class Engineering extends Phaser.Scene {
  constructor() {
    super("Engineering");
  }
  preload() {
    this.load.tilemapTiledJSON(
      "map",
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
    this.load.image("cherokeeFlag", "../public/assets/images/cherokeeFlag.png");
    this.load.image("lock", "../public/assets/images/lock.png");
    this.load.spritesheet("mary", "../public/assets/sprites/marySprite.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create() {
    this.add.image(0, 0, "engineeringFloor");

    const map = this.make.tilemap({
      key: "map",
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

    Clues = map.getObjectLayer("Clues")["objects"];
    console.log(["objects"]);

    wallLayer.setCollisionByExclusion([-1]);
    spaceStation.setCollisionByExclusion([-1]);
    furnitureLayer.setCollisionByExclusion([-1]);
    chalkboardLayer.setCollisionByExclusion([-1]);
    plantsAndDecorLayer.setCollisionByExclusion([-1]);
    this.physics.add.collider(this.player, wallLayer);
    this.physics.add.collider(this.player, spaceStation);
    this.physics.add.collider(this.player, furnitureLayer);
    this.physics.add.collider(this.player, chalkboardLayer);
    this.physics.add.collider(this.player, plantsAndDecorLayer);
  }

  update() {
    this.player.update(this.cursors);
  }
  createAnimations() {
    this.anims.create({
      key: "walk right",
      frames: this.anims.generateFrameNumbers("mary", { start: 6, end: 8 }),
      frameRate: 6,
      repeat: -1,
    });
    this.anims.create({
      key: "walk left",
      frames: this.anims.generateFrameNumbers("mary", { start: 2, end: 5 }),
      frameRate: 6,
      repeat: -1,
    });
    this.anims.create({
      key: "walk up",
      frames: this.anims.generateFrameNumbers("mary", { start: 9, end: 11 }),
      frameRate: 6,
      repeat: -1,
    });
    this.anims.create({
      key: "walk down",
      frames: this.anims.generateFrameNumbers("mary", { start: 0, end: 2 }),
      frameRate: 6,
      repeat: -1,
    });
    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("mary", { start: 0, end: 0 }),
      frameRate: 6,
      repeat: -1,
    });
  }
}
