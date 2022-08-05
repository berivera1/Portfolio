gameObj.Game = function (game) {};

gameObj.Game.prototype = {
  create: function () {
    console.log("State - Game");

    // Reset the score and timer.
    gameObj.gScore = 0;
    gameObj.gTime = "01:20";

    this.stage.backgroundColor = "#000";

    // Add images to stage
    var spBackground = this.add.sprite(this.world.centerX, this.world.centerY, 'backgroundSkewed');
    spBackground.anchor.setTo(0.5, 0.5);

    // Add Music + btn
    btMusic = this.add.button(960-45, 45, 'musicButton', this.musicClick, this, 1, 1, 1);
    this.game.sound.mute = true;
    btMusic.anchor.setTo(0.5, 0.5);
    if (!this.game.sound.mute) {
      btMusic.setFrames(0, 0, 0);
    }

    // P1 + P2
    var spP1 = this.add.sprite(128, 453, 'p1');
    spP1.anchor.setTo(0.5, 0.5);
    spP1.animations.add('walk');
    spP1.animations.play('walk', 2, true);
    spP1.animations.currentAnim.speed = 4;

    var spP1HeartA = this.add.sprite(82, 406, 'heartfull');
    spP1HeartA.scale.x *= 0.6;
    spP1HeartA.scale.y *= 0.6;
    var spP1HeartB = this.add.sprite(112, 406, 'heartfull');
    spP1HeartB.scale.x *= 0.6;
    spP1HeartB.scale.y *= 0.6;
    var spP1HeartC = this.add.sprite(142, 406, 'heartempty');
    spP1HeartC.scale.x *= 0.6;
    spP1HeartC.scale.y *= 0.6;

    var spP2 = this.add.sprite(763, 246, 'p2');
    spP2.scale.x *= -1;
    spP2.anchor.setTo(0.5, 0.5);
    spP2.animations.add('walk');
    spP2.animations.play('walk', 2, true);
    spP2.animations.currentAnim.speed = 4;

    var spP2HeartA = this.add.sprite(717, 199, 'heartfull');
    spP2HeartA.scale.x *= 0.6;
    spP2HeartA.scale.y *= 0.6;
    var spP2HeartB = this.add.sprite(747, 199, 'heartfull');
    spP2HeartB.scale.x *= 0.6;
    spP2HeartB.scale.y *= 0.6;
    var spP2HeartC = this.add.sprite(777, 199, 'heartfull');
    spP2HeartC.scale.x *= 0.6;
    spP2HeartC.scale.y *= 0.6;

    // Projectiles
    var p1BulletA = this.add.sprite(572, 572, 'p1bullet');
    var p1BulletB = this.add.sprite(793, 037, 'p1bullet');

    var p2BulletA = this.add.sprite(24, 456, 'p2bullet');
    var p2BulletB = this.add.sprite(126, 054, 'p2bullet');
    var p2BulletC = this.add.sprite(465, 179, 'p2bullet');

    // Add button
    // The numbers given in par are indexes of the frame in this order:
    // OVER, OUT, DOWN
    var btP1Win = this.add.button(80, 650, 'p1WinButton', this.p1Click, this, 1, 0, 2);
    btP1Win.anchor.setTo(0.64, 0.5);
    var btP2Win = this.add.button(880, 650, 'p2WinButton', this.p2Click, this, 1, 0, 2);
    btP2Win.anchor.setTo(0.64, 0.5);
    var btTie = this.add.button(this.world.centerX, 650, 'tieButton', this.tieClick, this, 1, 0, 2);
    btTie.anchor.setTo(0.64, 0.5);
    var btPoints = this.add.button(this.world.centerX, 550, 'pointsButton', this.pointInc, this, 1, 0, 2);
    btPoints.anchor.setTo(0.7, 0.5);

    // Text

    //Add text
    txScore = gameObj.gScore;
    txTime = gameObj.gTime;
    var generalStyle = {
      width: "150px",
      font: "62px VT323",
      fill: "white",
      align: "center"
    };
    txTime = this.add.text(this.world.centerX, 50, txTime, generalStyle);
    txTime.anchor.setTo(0.5, 0.5);

    txScore = this.add.text(this.world.centerX, 100, txScore, generalStyle);
    txScore.anchor.setTo(0.5, 0.5);

    timerSeconds = 80;
    //  Create our Timer
    timerObj = this.time.create(false);
    //  Set a TimerEvent to occur after 2 seconds
    timerObj.loop(1000, this.updateTimer, this);
    //  Start the timer running - this is important!
    //  It won't start automatically, allowing you to hook it to button events and the like.
    timerObj.start();
  },
  p1Click: function() {
    gameObj.p1WinCounter++;
    this.state.start('P1Win');
  },
  p2Click: function() {
    gameObj.p2WinCounter++;
    this.state.start('P2Win');
  },
  tieClick: function() {
    this.state.start('Tie');
  },
  musicClick: function () {
    if (!this.game.sound.mute) {
      this.game.sound.mute = true;
      btMusic.setFrames(1, 1, 1);
  } else {
      this.game.sound.mute = false;
      btMusic.setFrames(0, 0, 0);
    }
  },
  updateTimer: function () {
    timerSeconds--;
    var timerSec = timerSeconds%60;
    if (timerSec < 10) {
      gameObj.gTime = "0" + Math.floor(timerSeconds/60) + ":0" + timerSec;
    } else {
      gameObj.gTime = "0" + Math.floor(timerSeconds/60) + ":" + timerSec;
    }
    txTime.text = gameObj.gTime;
    if (timerSeconds == 0) {
      if(gameObj.gScore >= 100) {
        gameObj.p1WinCounter++;
        this.state.start('P1Win');
      } else if (gameObj.gScore >= 50) {
        gameObj.p2WinCounter++;
        this.state.start('P2Win');
      } else {
        this.state.start('Tie');
      }

    }
  },
  pointInc: function () {
    gameObj.gScore += 10;
    txScore.setText(gameObj.gScore);
  },
};
