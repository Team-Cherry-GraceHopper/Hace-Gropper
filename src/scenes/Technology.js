import Phaser from "phaser";
import Player from "../entities/Player";

export default class Technology extends Phaser.Scene {
  constructor() {
    super("Technology");
  }
  preload() {
    this.load.tilemapTiledJSON(
      "map",
      "../public/assets/tilemaps/TechRoomM.json"
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
  }
  create() {
    console.log("hi", this.cache.tilemap.get("map").data);
    this.add.image(275, 275, "Floor");

    const map = this.make.tilemap({
      key: "map",
      tileWidth: 32,
      tileHeight: 32,
    });
    const schoolTiles = map.addTilesetImage("SCHOOL", "schoolmap");
    const wallTiles = map.addTilesetImage("MODERNSTUDY-WALLS", "walls");
    const prideTiles = map.addTilesetImage("PRIDEFLAG", "Pride");
    const vaporTiles = map.addTilesetImage(
      "VAPORWAVE",
      "VaporwaveFurniture",
      32,
      32
    );

    let floorLayer = map.createLayer("floorsnwallsnsuch", [
      wallTiles,
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
    ]);
  }
  update() {}
}
