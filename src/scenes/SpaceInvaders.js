import Phaser from 'phaser';
import Math from "./Math";

let score = 0;
let lives = 3;
let isStarted = false;
let ufoCount = 0;
let xTimes = 0;
let dir = "right";
let cursors;
let enemies;
let isShooting = false;
let scoreText;
let livesText;
let winText;
let playerLava;
let enemyLava;
let bigInvaderLava;

let redLaserVelo = 200;
let bigInvaders = [];


let enemyInfo = {
    width: 40,
    height: 30,
    count: {
        row: 5,
        col: 9
    },
    offset: {
        top: 125,
        left: 60
    },
    padding: 5
};


export default class SpaceInvaders extends Phaser.Scene {
    constructor() {
      super('SpaceInvaders');
      console.log("this in constructor", this);
      this.shoot = this.shoot.bind(this);
      this.enemyFire = this.enemyFire.bind(this);
      this.initEnemys = this.initEnemys.bind(this);
      this.moveEnemies = this.moveEnemies.bind(this);
      this.manageGreenLaser = this.manageGreenLaser.bind(this);
      this.manageRedLaser = this.manageRedLaser.bind(this);
      this.checkOverlap = this.checkOverlap.bind(this);
      this.makeBigInvader = this.makeBigInvader.bind(this);
      this.win = this.win.bind(this);
      this.lose = this.lose.bind(this);

    }

    preload() {
      this.load.image('bg', '../public/assets/images/spaceBG.jpg');
      this.load.image('invader', '../public/assets/images/UfoGrey.png');
      this.load.image('bigInvader', '../public/assets/images/UfoBlue.png');
      this.load.image('player', '../public/assets/images/RocketGrey.png');
      this.load.image('redLaser', '../public/assets/images/redLaser.png');
      this.load.image('greenLaser', '../public/assets/images/greenLaser.png');
    }

    create() {
      console.log("this in create", this)
      this.add.image(0, 0, 'bg').setOrigin(0, 0);
    
      cursors = this.input.keyboard.createCursorKeys();

      this.input.keyboard.addCapture('SPACE');
      enemies = this.physics.add.staticGroup();
      playerLava = this.add.rectangle(0, 0, 800, 0, 0x000).setOrigin(0);
      enemyLava = this.add.rectangle(0, 590, 800, 0, 0x000).setOrigin(0);
      bigInvaderLava = this.add.rectangle(790, 0, 0, 640, 0x000).setOrigin(0);
      this.physics.add.existing(playerLava);
      this.physics.add.existing(enemyLava);
      this.physics.add.existing(bigInvaderLava);

      this.player = this.physics.add.sprite(400, 560, 'player').setScale(2);
      this.player.setCollideWorldBounds(true);

      scoreText = this.add.text(16, 16, "Score: " + score, { fontSize: '20px', fill: '#FFF' });
      livesText = this.add.text(696, 16, "Lives: " + lives, { fontSize: '20px', fill: '#FFF' });
      let startText = this.add.text(400, 350, "Use Your Arrow Keys to Move\n Press the Spacebar or Click to Shoot\n \n Click to Play", { fontSize: '22px', fill: '#FFF', align: 'center' }).setOrigin(0.5);

      this.input.keyboard.on('keydown-SPACE', this.shoot);


      let shoot = this.shoot;
      let makeBigInvader = this.makeBigInvader;
      let moveEnemies = this.moveEnemies;
      let enemyFire = this.enemyFire;
      this.input.on('pointerdown', function () {
        if (isStarted == false) {
            isStarted = true;
            startText.destroy();
            setInterval(makeBigInvader, 15000);
            setInterval(moveEnemies, 850);
            setInterval(enemyFire, 3000);
        } else {
            shoot();
        }
      });
      this.initEnemys();
    }

    update() {
        if (isStarted == true) {
            if (cursors.left.isDown) {
                this.player.setVelocityX(-160);
            }
            else if (cursors.right.isDown) {
                this.player.setVelocityX(160);
            }
            else {
                this.player.setVelocityX(0);
            }
        }
    }

    checkOverlap(spriteA, spriteB) {
        var boundsA = spriteA.getBounds();
        var boundsB = spriteB.getBounds();
        return Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB);
    }

    shoot() {
      if (isStarted == true) {
          if (isShooting === false) {
              this.manageGreenLaser(this.physics.add.sprite(this.player.x, this.player.y, "greenLaser"));
              isShooting = true;
            //   shootSound.play();
          }
      }
    }

    initEnemys() {
      for (let i = 0; i < enemyInfo.count.col; i++) {
          for (let j = 0; j < enemyInfo.count.row; j++) {
              var enemyX = (i * (enemyInfo.width + enemyInfo.padding)) + enemyInfo.offset.left;
              var enemyY = (j * (enemyInfo.height + enemyInfo.padding)) + enemyInfo.offset.top;
              enemies.create(enemyX, enemyY, 'invader').setScale(1.7).setOrigin(0.5);
          }
      }
    }

    
    moveEnemies() {
        if (isStarted === true) {
            if (xTimes === 30) {
                if (dir === "right") {
                    dir = "left";
                    xTimes = 0;
                } else {
                    dir = "right";
                    xTimes = 0;
                }
            }
            if (dir === "right") {
                enemies.children.each(function (enemy) {

                    enemy.x = enemy.x + 10;
                    enemy.body.reset(enemy.x, enemy.y);

                }, this);
                xTimes++;
            } else {
                enemies.children.each(function (enemy) {

                    enemy.x = enemy.x - 10;
                    enemy.body.reset(enemy.x, enemy.y);

                }, this);
                xTimes++;
            }
        }
    }


    manageGreenLaser(greenLaser) {
      
      greenLaser.setVelocityY(-380);
      
      let checkOverlap = this.checkOverlap;
      let win = this.win;

      var i = setInterval(function () {
          enemies.children.each(function (enemy) {
              if (checkOverlap(greenLaser, enemy)) {
                  greenLaser.destroy();
                  clearInterval(i);
                  isShooting = false;
                  enemy.destroy();
                  score++;
                  scoreText.setText("Score: " + score);

                //   explosionSound.play();

                  if ((score - ufoCount) === (enemyInfo.count.col * enemyInfo.count.row)) {
                      win();
                  }
              }
          }, this);


          for (var step = 0; step < bigInvaders.length; step++) {
              var bigInvader = bigInvaders[step];

              if (checkOverlap(greenLaser, bigInvader)) {
                  greenLaser.destroy();
                  clearInterval(i);
                  isShooting = false;

                  scoreText.setText("Score: " + score);


                //   explosionSound.play();

                  if ((score - ufoCount) === (enemyInfo.count.col * enemyInfo.count.row)) {
                      win()
                  }

                  bigInvader.destroy();
                  bigInvader.isDestroyed = true;
                //   bigInvaderSound.stop();
                  score++;
                  ufoCount++;
              }
          }
      }, 10);

      this.physics.add.overlap(greenLaser, playerLava, function () {
          greenLaser.destroy();
          clearInterval(i);
        //   explosionSound.play();
          isShooting = false;
      })
    }

    manageRedLaser(redLaser, enemy) {

      console.log("this in manageRedLaser", this);

      let checkOverlap = this.checkOverlap;
      let lose = this.lose;
      let player = this.player;

      var angle = Phaser.Math.Angle.BetweenPoints(enemy, this.player);
      this.physics.velocityFromRotation(angle, redLaserVelo, redLaser.body.velocity);
      redLaserVelo = redLaserVelo + 2;

      var i = setInterval(function () {
          if (checkOverlap(redLaser, player)) {
              redLaser.destroy();
              clearInterval(i);
              lives--;
              livesText.setText("Lives: " + lives);
            //   explosionSound.play();

              if (lives == 0) {
                  lose();
              }
          }
      }, 10);

      this.physics.add.overlap(redLaser, enemyLava, function () {
          redLaser.destroy();
        //   explosionSound.play();
          clearInterval(i);
      })
    }

    

   //Enemy Fire
  

    enemyFire() {
        let manageRedLaser = this.manageRedLaser;
        if (isStarted === true) {
            var enemy = enemies.children.entries[Phaser.Math.Between(0, enemies.children.entries.length - 1)];
            manageRedLaser(this.physics.add.sprite(enemy.x, enemy.y, "redLaser"), enemy);
        }
    }   
    
    //Flying bigInvaders

    makeBigInvader() {
        if (isStarted == true) {
            this.manageBigInvader(this.physics.add.sprite(0, 60, "bigInvader").setScale(2));
        }
    }

    manageBigInvader(bigInvader) {
        bigInvaders.push(bigInvader);
        bigInvader.isDestroyed = false;
        bigInvader.setVelocityX(90);
        this.physics.add.overlap(bigInvader, bigInvaderLava, function () {
            bigInvader.destroy();
            bigInvader.isDestroyed = true;
            // bigInvaderSound.stop();
        })
        // bigInvaderSound.play();
    }

    win() {
    //   explosionSound.stop();
    //   bigInvaderSound.stop();
    //   shootSound.stop();
    //   move.stop()

    //   winText = this.add.text(400, 300, `You did it!\nOur astronauts are in safe hands!\n Score: ` + score, { fontSize: '22px', fill: '#FFF', align: 'center' })

      alert(`You did it!\nOur astronauts are in safe hands!\n Score: ` + score);
      this.scene.stop("SpaceInvaders");
      this.scene.start("Math", Math);
    }

    lose() {
        //   explosionSound.stop();
        //   bigInvaderSound.stop();
        //   shootSound.stop();
        //   move.stop()
    
        //   winText = this.add.text(400, 300, `You did it!\nOur astronauts are in safe hands!\n Score: ` + score, { fontSize: '22px', fill: '#FFF', align: 'center' })
    
          alert(`You Lost :( \n Score: ` + score);
    }
  }
