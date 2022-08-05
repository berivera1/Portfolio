gameObj.P1Win = function (game) {};

gameObj.P1Win.prototype = {
  create: function () {
    console.log("State - P1Win");
    // Add images to stage
    var spBackground = this.add.sprite(this.world.centerX, this.world.centerY, 'background');
    spBackground.anchor.setTo(0.5, 0.5);

    // Add Music + btn
    btMusic = this.add.button(960-45, 45, 'musicButton', this.musicClick, this, 0, 0, 0);
    btMusic.anchor.setTo(0.5, 0.5);

    var spP1 = this.add.sprite(this.world.centerX-300, 275, 'p1');
    spP1.anchor.setTo(0.5, 0.5);
    spP1.animations.add('walk');
    spP1.animations.play('walk', 2, true);
    spP1.animations.currentAnim.speed = 4;

    var spP2 = this.add.sprite(this.world.centerX+300, 275, 'p2');
    spP2.scale.x *= -1;
    spP2.anchor.setTo(0.5, 0.5);
    spP2.animations.add('walk');
    spP2.animations.play('walk', 2, true);
    spP2.animations.currentAnim.speed = 3;

    var spTear = this.add.sprite(780, 285, 'tear');

    var trophy = this.add.sprite(130, 275, 'trophy');

    // Add button
    // The numbers given in par are indexes of the frame in this order:
    // OVER, OUT, DOWN
    var btPlay = this.add.button(this.world.centerX-150, this.world.centerY + 320, 'playAgainButton', this.playClick, this, 1, 0, 2);
    btPlay.anchor.setTo(0.64, 0.5);
    var btMenu = this.add.button(this.world.centerX+150, this.world.centerY + 320, 'menuButton', this.openOverlay, this, 1, 0, 2);
    btMenu.anchor.setTo(0.64, 0.5);

    // Add text
    var textWin = "P1 WINS!";
    var textCounter = "Win Counter";
    var textP1Wins = "x5";
    var textP2Wins = "x2";
    var textTimeLeft = "Time Left: 00:36";

    var titleStyle = {
      width: "150px",
      font: "72px VT323",
      fill: "#0fcacf",
      align: "center"
    };
    var generalStyle = {
      width: "150px",
      font: "52px VT323",
      fill: "white",
      align: "center"
    };

    var textWin = this.add.text(this.world.centerX, 80, textWin, titleStyle);
    textWin.anchor.setTo(0.5, 0.5);
    var textCounter = this.add.text(this.world.centerX, 285, textCounter, generalStyle);
    textCounter.anchor.setTo(0.5, 0.5);
    var textP1Wins = this.add.text(this.world.centerX - 240, 265, textP1Wins, generalStyle);
    var textP2Wins = this.add.text(this.world.centerX + 200, 265, textP2Wins, generalStyle);
    var textTimeLeft = this.add.text(this.world.centerX, 460, textTimeLeft, generalStyle);
    textTimeLeft.anchor.setTo(0.5, 0.5);
  },
  openOverlay: function() {
    spOverlay = this.add.sprite(this.world.centerX, this.world.centerY, 'overlay');
    spOverlay.anchor.setTo(0.5, 0.5);
    textQuestion = "Do you want to return to the\nmenu?\nThis will reset your current\nwin counter.";
    generalStyle = {
      width: "150px",
      font: "52px VT323",
      fill: "white",
      align: "center"
    };
    textQuestion = this.add.text(this.world.centerX, 280, textQuestion, generalStyle);
    textQuestion.anchor.setTo(0.5, 0.5);
    btYes = this.add.button(this.world.centerX-150, this.world.centerY+150, 'yesButton', this.mainClick, this, 1, 0, 2);
    btYes.anchor.setTo(0.64, 0.5);
    btNo = this.add.button(this.world.centerX+150, this.world.centerY+150, 'noButton', this.closeOverlay, this, 1, 0, 2);
    btNo.anchor.setTo(0.64, 0.5);
  },
  closeOverlay: function() {
    spOverlay.destroy();
    textQuestion.destroy();
    btYes.destroy();
    btNo.destroy();
  },
  playClick: function() {
    this.state.start('Game');
  },
  mainClick: function() {
    this.state.start('MainNoMusic');
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
