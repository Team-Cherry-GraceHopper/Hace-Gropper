import Phaser from "phaser";
let meItem;
let lText;

export default class EndCreds extends Phaser.Scene {

  constructor() {
    super("EndCreds");

  }

  preload() {
    this.load.tilemapTiledJSON(
      "credits",
      "../public/assets/tilemaps/credits.json"
    );
    this.load.image(
      "urban-landscape-background-Preview",
      "../public/assets/tilesets/city.png"
    );
    this.load.image(
      "Nature Background Raw",
      "../public/assets/tilesets/trees.png"
    );
    this.load.image("finalDay", "../public/assets/tilesets/finalDay.png");
    this.load.image("clouds", "../public/assets/tilesets/clouds.png");
    this.load.image(
      "TeamCherry",
      "../public/assets/images/pridleflags/teamcherry.png"
    );
    this.load.image("DUDE", "../public/assets/sprites/Dude_Monster.png");
    this.load.image("OWL", "../public/assets/sprites/Owlet_Monster.png");
    this.load.image("PINKMONSTER", "../public/assets/sprites/Pink_Monster.png");
  }

  create() {
    const info = document.getElementById("rules");
    info.classList.add("hidden");

    const map = this.make.tilemap({
      key: "credits",
      tileWidth: 32,
      tileHeight: 32,
    });

    const cityTiles = map.addTilesetImage(
      "urban-landscape-background-Preview",
      "urban-landscape-background-Preview",
      32,
      32
    );
    const treeTiles = map.addTilesetImage(
      "Nature Background Raw",
      "Nature Background Raw",
      32,
      32
    );

    const triangleTiles = map.addTilesetImage("finalDay", "finalDay", 32, 32);
    const cloudTiles = map.addTilesetImage("clouds", "clouds", 32, 32);
    
    let floorLayer = map.createLayer("Background", [
      cityTiles,
      treeTiles,
      triangleTiles,
      cloudTiles,
    ]);

    let lilSprites = map.getObjectLayer("Spritey")["objects"];
    meItem = this.physics.add.staticGroup();

    lilSprites.forEach((object) => {
      let obj = meItem.create(object.x, object.y, object.name);
      obj.setScale(object.width / object.width, object.height / object.height);
      obj.setOrigin(0);
      obj.body.width = object.width;
      obj.body.height = object.height;
    });
    
    lText = this.add.text(
      6,
      25,
      `L Phansalkar is a fucking hot ass developer`,
      {
        backgroundColor: "black",
        fontSize: "15px",
        fill: "white",
      }
    );
    lText.setScrollFactor(0);
  }

  update() {}
}
