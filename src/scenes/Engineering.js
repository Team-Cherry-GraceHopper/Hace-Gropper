import Phaser from "phaser";
import Player from "../entities/Player";

let eItem;
let eText;
let eObject;
let EngineeringClues;

export default class Engineering extends Phaser.Scene {
    constructor () {
        super("Engineering")
    }
    preload(){
        this.load.tilemapTiledJSON('map', '../public/assets/tilemaps/engineeringnew4.json');
        this.load.image('engineeringFloor', '../public/assets/tilesets/LobbyTiles.png');
        this.load.image('spaceStationpng', '../public/assets/tilesets/neotiles.png');
        this.load.image('furniturepng', '../public/assets/tilesets/shop-and-hospital.png');
        this.load.image('chalkboardpng', '../public/assets/tilesets/chalkboards.png');
        this.load.image('plantsAndDecorPng','../public/assets/tilesets/studyTimeTiles.png' );
        this.load.image('planet','../public/assets/images/purplePlanet.png' )
        this.load.image('coin','../public/assets/images/coin.png')
        this.load.image('skunk','../public/assets/images/skunk.png')
        this.load.image('flag','../public/assets/images/cherokeeFlag.png' )
        this.load.image('lock','../public/assets/images/lock.png' )
        this.load.spritesheet('mary', '../public/assets/sprites/marySprite.png', {
            frameWidth: 32,
            frameHeight: 32,
        })


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

        this.player = new Player(this, 470, 610, 'mary').setScale(1.5);
        this.createAnimations()
        this.cursors = this.input.keyboard.createCursorKeys();
        
        EngineeringClues = map.getObjectLayer('Clues')['objects'];
        eItem = this.physics.add.staticGroup();

        EngineeringClues.forEach(object => {
          let obj = eItem.create(object.x, object.y, object.name);
            obj.setScale(object.width/object.width, object.height/object.height);
            obj.setOrigin(0);
            obj.body.width = object.width;
            obj.body.height = object.height;
          });
        
          this.physics.add.overlap(this.player, eItem, this.eCollect, null, this);


    this.player = new Player(this, 470, 610, "mary").setScale(1.5);
    this.createAnimations();
    this.cursors = this.input.keyboard.createCursorKeys();

        eText = this.add.text(570, 70, `Clues: x`, {
          fontSize: '20px',
          fill: '#ffffff'
        });
      eText.setScrollFactor(0);

    
    }

    update () {
        this.player.update(this.cursors)
    }
    eCollect(player, object) {
      object.destroy(object.x, object.y);
      eText.setText(`Clues: y`); // set the text to show the current score
      // list = []
      // list.push(object.listClues)
      //`${list}
      return false;
    }
    createAnimations() { 
        this.anims.create({
            key: 'walk right',
            frames: this.anims.generateFrameNumbers('mary', { start: 6, end: 8 }),
            frameRate: 6,
            repeat: -1,
          });
          this.anims.create({
              key: 'walk left',
              frames: this.anims.generateFrameNumbers('mary', { start: 2, end: 5 }),
              frameRate: 6,
              repeat: -1,
          }); 
          this.anims.create({
            key: 'walk up',
            frames: this.anims.generateFrameNumbers('mary', { start:9, end: 11 }),
            frameRate: 6,
            repeat: -1,
          });
          this.anims.create({
            key: 'walk down',
            frames: this.anims.generateFrameNumbers('mary', { start: 0, end: 2 }),
            frameRate: 6,
            repeat: -1,
          }); 
          this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('mary', { start: 0, end: 0 }),
            frameRate: 6,
            repeat: -1,
          }); 
      }
}

