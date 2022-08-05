gameObj.Help = function (game) {};

gameObj.Help.prototype = {
  create: function () {
    console.log("State - Help");
    // Add images to stage
    var spBackground = this.add.sprite(this.world.centerX, this.world.centerY, 'background');
    spBackground.anchor.setTo(0.5, 0.5);

    // Add Music + btn
    btMusic = this.add.button(960-45, 45, 'musicButton', this.musicClick, this, 1, 1, 1);
    this.game.sound.mute = true;
    btMusic.anchor.setTo(0.5, 0.5);
    if (!this.game.sound.mute) {
      btMusic.setFrames(0, 0, 0);
    }

    var spControlBoxes = this.add.sprite(this.world.centerX-9, 260, 'controlBoxes');
    spControlBoxes.anchor.setTo(0.5, 0.5);

    var spP1 = this.add.sprite(this.world.centerX-350, 175, 'p1');
    spP1.anchor.setTo(0.5, 0.5);
    spP1.animations.add('walk');
    spP1.animations.play('walk', 2, true);
    spP1.animations.currentAnim.speed = 4;

    var spP2 = this.add.sprite(this.world.centerX+350, 175, 'p2');
    spP2.scale.x *= -1;
    spP2.anchor.setTo(0.5, 0.5);
    spP2.animations.add('walk');
    spP2.animations.play('walk', 2, true);
    spP2.animations.currentAnim.speed = 4;

    // Add text
    var textFirst = "This is";
    var textSecond = "P1";
    var textSecond2 = "P2";
    var textKeyboard = "W  A  S  D    E";
    var textKeyboard2 = "I  J  K  L    U";
    var textControls = "Move     Shoot";
    var textControls2 = "Move     Shoot";
    var textHearts = "You have 3 hearts.";
    var textKill = "Kill the other player to win.";
    var textLoop = "Be careful, \"the stage loops\"!";

    var generalStyle = {
      width: "150px",
      font: "42px VT323",
      fill: "white",
      align: "center"
    };
    var txFirst = this.add.text(this.world.centerX - 275, 140, textFirst, generalStyle);
    var txSecond = this.add.text(this.world.centerX - 235, 178, textSecond, generalStyle);
    var txFirst2 = this.add.text(this.world.centerX + 150, 140, textFirst, generalStyle);
    var txSecond2 = this.add.text(this.world.centerX + 190, 178, textSecond2, generalStyle);
    var txKeyboard = this.add.text(this.world.centerX - 395, 238, textKeyboard, generalStyle);
    var txKeyboard2 = this.add.text(this.world.centerX + 125, 238, textKeyboard2, generalStyle);
    var textControls = this.add.text(this.world.centerX - 340, 288, textControls, generalStyle);
    var textControls2 = this.add.text(this.world.centerX + 180, 288, textControls2, generalStyle);
    var textHearts = this.add.text(this.world.centerX - 280, 388, textHearts, generalStyle);
    var textKill = this.add.text(this.world.centerX - 280, 468, textKill, generalStyle);
    var textLoop = this.add.text(this.world.centerX - 280, 548, textLoop, generalStyle);

    var spHeartA = this.add.sprite(520, 386, 'heartfull');
    var spHeartB = this.add.sprite(580, 386, 'heartfull');
    var spHeartC = this.add.sprite(640, 386, 'heartfull');

    // Add button
    // The numbers given in par are indexes of the frame in this order:
    // OVER, OUT, DOWN
    var btPlay = this.add.button(this.world.centerX-150, this.world.centerY + 300, 'playButton', this.playClick, this, 1, 0, 2);
    btPlay.anchor.setTo(0.64, 0.5);
    var btHelp = this.add.sprite(this.world.centerX, 60, 'helpButton');
    btHelp.anchor.setTo(0.64, 0.5);
    var btCredits = this.add.button(this.world.centerX+150, this.world.centerY + 300, 'creditsButton', this.creditsClick, this, 1, 0, 2);
    btCredits.anchor.setTo(0.60, 0.5);
  },
  playClick: function() {
    this.state.start('Game');
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
