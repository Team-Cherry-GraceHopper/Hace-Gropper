const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 640,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: true
      }
    },
  },
  scene: [],
  //[Lobby, Engineering]
};

export default config;
