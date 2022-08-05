gameObj.Credits = function (game) {};

gameObj.Credits.prototype = {
  create: function () {
    console.log("State - Credits");
    // Add images to stage
    var spBackground = this.add.sprite(this.world.centerX, this.world.centerY, 'background');
    spBackground.anchor.setTo(0.5, 0.5);

    // Add Music + btn
    btMusic = this.add.button(960-45, 45, 'musicButton', this.musicClick, this, 0, 0, 0);
    btMusic.anchor.setTo(0.5, 0.5);

    // Add text
    var txCredits = "Concept / Gameplay: Beck R.\n\nArt: Beck R.\n\nProgramming: Beck R.\n\nSpecial thanks to Jervo\nand everyone in the\nprogram, love y'all!";

    var generalStyle = {
      width: "150px",
      font: "46px VT323",
      fill: "white",
      align: "center"
    };
    var txCredits = this.add.text(this.world.centerX, this.world.centerY, txCredits, generalStyle);
    txCredits.anchor.setTo(0.5, 0.5);

    // Add button
    // The numbers given in par are indexes of the frame in this order:
    // OVER, OUT, DOWN
    var btPlay = this.add.button(this.world.centerX-150, this.world.centerY + 300, 'playButton', this.playClick, this, 1, 0, 2);
    btPlay.anchor.setTo(0.64, 0.5);
    var btHelp = this.add.button(this.world.centerX+150, this.world.centerY + 300, 'helpButton', this.helpClick, this, 1, 0, 2);
    btHelp.anchor.setTo(0.64, 0.5);
    var btCredits = this.add.sprite(this.world.centerX, 60, 'creditsButton');
    btCredits.anchor.setTo(0.60, 0.5);
  },
  playClick: function() {
    this.state.start('Game');
  },
  helpClick: function() {
    this.state.start('Help');
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
