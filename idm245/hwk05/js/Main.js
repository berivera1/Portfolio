gameObj.Main = function (game) {};

gameObj.Main.prototype = {
  create: function () {
    console.log("State - Main");

    gameObj.p1WinCounter = 0;
    gameObj.p2WinCounter = 0;

    this.stage.backgroundColor = "#000";

    // Add images to stage
    var spBackground = this.add.sprite(this.world.centerX, this.world.centerY, 'background');
    spBackground.anchor.setTo(0.5, 0.5);
    var spLogo = this.add.sprite(this.world.centerX, this.world.centerY - 180, 'logo');
    spLogo.anchor.setTo(0.5, 0.5);

    // Add Music + btn
    btMusic = this.add.button(960-45, 45, 'musicButton', this.musicClick, this, 1, 1, 1);
    this.game.sound.mute = true;
    btMusic.anchor.setTo(0.5, 0.5);
    if (!this.game.sound.mute) {
      btMusic.setFrames(0, 0, 0);
    }

    // Add button
    // The numbers given in par are indexes of the frame in this order:
    // OVER, OUT, DOWN
    var btPlay = this.add.button(this.world.centerX, this.world.centerY + 25, 'playButton', this.playClick, this, 1, 0, 2);
    btPlay.anchor.setTo(0.64, 0.5);
    var btHelp = this.add.button(this.world.centerX, this.world.centerY + 120, 'helpButton', this.helpClick, this, 1, 0, 2);
    btHelp.anchor.setTo(0.64, 0.5);
    var btCredits = this.add.button(this.world.centerX, this.world.centerY + 215, 'creditsButton', this.creditsClick, this, 1, 0, 2);
    btCredits.anchor.setTo(0.60, 0.5);

    music = this.add.audio('mainsong');
    music.play();
    music.loopFull();
  },
  playClick: function() {
    this.state.start('Game');
  },
  helpClick: function() {
    this.state.start('Help');
  },
  creditsClick: function() {
    this.state.start('Credits');
  },
  musicClick: function () {
    if (!this.game.sound.mute) {
      this.game.sound.mute = true;
      btMusic.setFrames(1, 1, 1);
  } else {
      this.game.sound.mute = false;
      btMusic.setFrames(0, 0, 0);
    }
  }
};
