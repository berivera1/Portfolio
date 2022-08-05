gameObj.Game = function (game) {};

gameObj.Game.prototype = {
  create: function () {
    // Reset the score and timer.
    gameObj.gTime = "02:00";

    this.stage.backgroundColor = "#000";

    speed = 6;
    p1Dir = 4;
    p2Dir = 2;

    // Add images to stage
    var spBackground = this.add.sprite(this.world.centerX, this.world.centerY, 'backgroundSkewed');
    spBackground.anchor.setTo(0.5, 0.5);

    // Add Music + btn
    btMusic = this.add.button(960-45, 45, 'musicButton', this.musicClick, this, 1, 1, 1);
    btMusic.anchor.setTo(0.5, 0.5);
    if (!this.game.sound.mute) {
      btMusic.setFrames(0, 0, 0);
    }

    p1Shooting = false;
    p2Shooting = false;
    this.input.gamepad.start();
    p1Pad = this.input.gamepad.pad2;
    p2Pad = this.input.gamepad.pad3;

    p1Pad.addCallbacks(this, {onConnect: this.addButtonsP1});
    p2Pad.addCallbacks(this, {onConnect: this.addButtonsP2});

    p1X = 100;
    p1Y = this.world.centerY;

    p2X = this.game.width-100;
    p2Y = this.world.centerY;

    p1Lives = 3;
    p2Lives = 3;

    // P1 + P2
    spP1 = this.add.sprite(p1X, p1Y, 'p1');
    spP1.anchor.setTo(0.5, 0.5);
    spP1.animations.add('walk');
    spP1.animations.play('walk', 2, true);
    spP1.animations.currentAnim.speed = 4;
    this.physics.enable(spP1, Phaser.Physics.ARCADE);

    spP1HeartA = this.add.sprite(p1X-45, p1Y-50, 'heartfull');
    spP1HeartA.scale.x *= 0.6;
    spP1HeartA.scale.y *= 0.6;
    spP1HeartB = this.add.sprite(p1X-15, p1Y-50, 'heartfull');
    spP1HeartB.scale.x *= 0.6;
    spP1HeartB.scale.y *= 0.6;
    spP1HeartC = this.add.sprite(p1X+15, p1Y-50, 'heartfull');
    spP1HeartC.scale.x *= 0.6;
    spP1HeartC.scale.y *= 0.6;

    spP2 = this.add.sprite(p2X, p2Y, 'p2');
    spP2.scale.x *= -1;
    spP2.anchor.setTo(0.5, 0.5);
    spP2.animations.add('walk');
    spP2.animations.play('walk', 2, true);
    spP2.animations.currentAnim.speed = 4;
    this.physics.enable(spP2, Phaser.Physics.ARCADE);

    spP2HeartA = this.add.sprite(p2X-45, p2Y-50, 'heartfull');
    spP2HeartA.scale.x *= 0.6;
    spP2HeartA.scale.y *= 0.6;
    spP2HeartB = this.add.sprite(p2X-15, p2Y-50, 'heartfull');
    spP2HeartB.scale.x *= 0.6;
    spP2HeartB.scale.y *= 0.6;
    spP2HeartC = this.add.sprite(p2X+15, p2Y-50, 'heartfull');
    spP2HeartC.scale.x *= 0.6;
    spP2HeartC.scale.y *= 0.6;

    // Define constants
    shotDelay = 500; // milliseconds (10 bullets/second)
    bulletSpeed = 500; // pixels/second
    numBullets = 5;

    // Create an object pool of bullets
    p1BulletPool = this.add.group();
    for(var i = 0; i < numBullets; i++) {
        // Create each bullet and add it to the group.
        var bullet = this.add.sprite(0, 0, 'p1Bullet');
        p1BulletPool.add(bullet);
        // Set its pivot point to the center of the bullet
        bullet.anchor.setTo(0.5, 0.5);
        // Enable physics on the bullet
        this.physics.enable(bullet, Phaser.Physics.ARCADE);
        // Set its initial state to "dead".
        bullet.kill();
    }

    // Create an object pool of bullets
    p2BulletPool = this.add.group();
    for(var i = 0; i < numBullets; i++) {
        // Create each bullet and add it to the group.
        var bullet = this.add.sprite(0, 0, 'p2Bullet');
        p2BulletPool.add(bullet);
        // Set its pivot point to the center of the bullet
        bullet.anchor.setTo(0.5, 0.5);
        // Enable physics on the bullet
        this.physics.enable(bullet, Phaser.Physics.ARCADE);
        // Set its initial state to "dead".
        bullet.kill();
    }

    // Text
    txTime = gameObj.gTime;
    var generalStyle = {
      width: "150px",
      font: "62px VT323",
      fill: "white",
      align: "center"
    };
    txTime = this.add.text(this.world.centerX, 50, txTime, generalStyle);
    txTime.anchor.setTo(0.5, 0.5);

    timerSeconds = 120;
    //  Create our Timer
    timerObj = this.time.create(false);
    //  Set a TimerEvent to occur after 2 seconds
    timerObj.loop(1000, this.updateTimer, this);
    //  Start the timer running - this is important!
    //  It won't start automatically, allowing you to hook it to button events and the like.
    timerObj.start();
  },
  update: function () {

  },
  render: function () {
    // CHECK FOR PLAYERS BUTTON PRESSES
    if (this.input.keyboard.isDown(Phaser.Keyboard.E) || p1Shooting) {
      this.p1ShootBullet();
    }
    if (this.input.keyboard.isDown(Phaser.Keyboard.U) || p2Shooting) {
      this.p2ShootBullet();
    }
    if (this.input.keyboard.isDown(Phaser.Keyboard.W) || p1Pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.1) {
      p1Dir = 1;
      spP1.y -= speed;
      spP1HeartA.y -= speed;
      spP1HeartB.y -= speed;
      spP1HeartC.y -= speed;
    }
    if (this.input.keyboard.isDown(Phaser.Keyboard.I) || p2Pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.1) {
      p2Dir = 1;
      spP2.y -= speed;
      spP2HeartA.y -= speed;
      spP2HeartB.y -= speed;
      spP2HeartC.y -= speed;
    }
    if (this.input.keyboard.isDown(Phaser.Keyboard.A) || p1Pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1) {
      p1Dir = 2;
      spP1.x -= speed;
      spP1.scale.x = -1;
      spP1HeartA.x -= speed;
      spP1HeartB.x -= speed;
      spP1HeartC.x -= speed;
    }
    if (this.input.keyboard.isDown(Phaser.Keyboard.J) || p2Pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1) {
      p2Dir = 2;
      spP2.x -= speed;
      spP2.scale.x = -1;
      spP2HeartA.x -= speed;
      spP2HeartB.x -= speed;
      spP2HeartC.x -= speed;
    }
    if (this.input.keyboard.isDown(Phaser.Keyboard.S) || p1Pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.1) {
      p1Dir = 3;
      spP1.y += speed;
      spP1HeartA.y += speed;
      spP1HeartB.y += speed;
      spP1HeartC.y += speed;
    }
    if (this.input.keyboard.isDown(Phaser.Keyboard.K) || p2Pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.1) {
      p2Dir = 3;
      spP2.y += speed;
      spP2HeartA.y += speed;
      spP2HeartB.y += speed;
      spP2HeartC.y += speed;
    }
    if (this.input.keyboard.isDown(Phaser.Keyboard.D) || p1Pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1) {
      p1Dir = 4;
      spP1.x += speed;
      spP1.scale.x = 1;
      spP1HeartA.x += speed;
      spP1HeartB.x += speed;
      spP1HeartC.x += speed;
    }
    if (this.input.keyboard.isDown(Phaser.Keyboard.L) || p2Pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1) {
      p2Dir = 4;
      spP2.x += speed;
      spP2.scale.x = 1;
      spP2HeartA.x += speed;
      spP2HeartB.x += speed;
      spP2HeartC.x += speed;
    }
    // LOOP THE PLAYERS
    if (spP1.x > this.game.width+40) {
      spP1.x = -39;
      spP1HeartA.x = spP1.x-45;
      spP1HeartB.x = spP1.x-15;
      spP1HeartC.x = spP1.x+15;
    } if (spP1.x < -40) {
      spP1.x = this.game.width+39;
      spP1HeartA.x = spP1.x-45;
      spP1HeartB.x = spP1.x-15;
      spP1HeartC.x = spP1.x+15;
    } if (spP1.y > this.game.height+45) {
      spP1.y = -44;
      spP1HeartA.y = spP1.y-50;
      spP1HeartB.y = spP1.y-50;
      spP1HeartC.y = spP1.y-50;
    } if (spP1.y < -45) {
      spP1.y = this.game.height+44;
      spP1HeartA.y = spP1.y-50;
      spP1HeartB.y = spP1.y-50;
      spP1HeartC.y = spP1.y-50;
    }
    if (spP2.x > this.game.width+40) {
      spP2.x = -39;
      spP2HeartA.x = spP2.x-45;
      spP2HeartB.x = spP2.x-15;
      spP2HeartC.x = spP2.x+15;
    } if (spP2.x < -40) {
      spP2.x = this.game.width+39;
      spP2HeartA.x = spP2.x-45;
      spP2HeartB.x = spP2.x-15;
      spP2HeartC.x = spP2.x+15;
    } if (spP2.y > this.game.height+45) {
      spP2.y = -44;
      spP2HeartA.y = spP2.y-50;
      spP2HeartB.y = spP2.y-50;
      spP2HeartC.y = spP2.y-50;
    } if (spP2.y < -45) {
      spP2.y = this.game.height+44;
      spP2HeartA.y = spP2.y-50;
      spP2HeartB.y = spP2.y-50;
      spP2HeartC.y = spP2.y-50;
    }
    // Check collisions
    this.physics.arcade.collide(p1BulletPool, spP2, function(spP2, bullet) {
        // Kill the bullet
        bullet.kill();
        this.p2Hit();
        hitSound = this.add.audio('hit');
        hitSound.play();
    }, null, this);
    this.physics.arcade.collide(p2BulletPool, spP1, function(spP1, bullet) {
        // Kill the bullet
        bullet.kill();
        this.p1Hit();
        hitSound = this.add.audio('hit');
        hitSound.play();
    }, null, this);
    for(i = 0; i < p1BulletPool.length; i++) {
      if (p1BulletPool.children[i].position.x > this.game.width+40) {
        p1BulletPool.children[i].position.x = -39;
      } if (p1BulletPool.children[i].position.x < -40) {
        p1BulletPool.children[i].position.x = this.game.width+39;
      } if (p1BulletPool.children[i].position.y > this.game.height+45) {
        p1BulletPool.children[i].position.y = -44;
      } if (p1BulletPool.children[i].position.y < -45) {
        p1BulletPool.children[i].position.y = this.game.height+44;
      }
    }
    for(i = 0; i < p2BulletPool.length; i++) {
      if (p2BulletPool.children[i].position.x > this.game.width+40) {
        p2BulletPool.children[i].position.x = -39;
      } if (p2BulletPool.children[i].position.x < -40) {
        p2BulletPool.children[i].position.x = this.game.width+39;
      } if (p2BulletPool.children[i].position.y > this.game.height+45) {
        p2BulletPool.children[i].position.y = -44;
      } if (p2BulletPool.children[i].position.y < -45) {
        p2BulletPool.children[i].position.y = this.game.height+44;
      }
    }
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
      this.state.start('Tie');
    }
  },
  p1ShootBullet: function () {
    // Enforce a short delay between shots by recording
    // the time that each bullet is shot and testing if
    // the amount of time since the last shot is more than
    // the required delay.
    if (this.p1LastBulletShotAt === undefined) this.p1LastBulletShotAt = 0;
    if (this.time.now - this.p1LastBulletShotAt < shotDelay) return;
    this.p1LastBulletShotAt = this.time.now;

    // Get a dead bullet from the pool
    var bullet = p1BulletPool.getFirstDead();

    // If there aren't any bullets available then don't shoot
    if (bullet === null || bullet === undefined) return;

    // Revive the bullet
    // This makes the bullet "alive"
    bullet.revive();

    // Bullets should kill themselves when they leave the world.
    // Phaser takes care of this for me by setting this flag
    // but you can do it yourself by killing the bullet if
    // its x,y coordinates are outside of the world.
    bullet.checkWorldBounds = false;
    bullet.outOfBoundsKill = false;

    // Set the bullet position to the gun position.
    bullet.reset(spP1.x, spP1.y);

    laserSound = this.add.audio('laser');
    laserSound.play();

    // Shoot it
    if (p1Dir == 1) {
      bullet.body.velocity.x = 0;
      bullet.body.velocity.y = -bulletSpeed;
    } else if (p1Dir == 2) {
      bullet.body.velocity.x = -bulletSpeed;
      bullet.body.velocity.y = 0;
    } else if (p1Dir == 3) {
      bullet.body.velocity.x = 0;
      bullet.body.velocity.y = bulletSpeed;
    } else {
      bullet.body.velocity.x = bulletSpeed;
      bullet.body.velocity.y = 0;
    }
    this.time.events.add(Phaser.Timer.SECOND * 5, function() {
        // Kill the bullet
        bullet.kill();
    }, this);
  },
  p2ShootBullet: function () {
    // Enforce a short delay between shots by recording
    // the time that each bullet is shot and testing if
    // the amount of time since the last shot is more than
    // the required delay.
    if (this.p2LastBulletShotAt === undefined) this.p2LastBulletShotAt = 0;
    if (this.time.now - this.p2LastBulletShotAt < shotDelay) return;
    this.p2LastBulletShotAt = this.time.now;

    // Get a dead bullet from the pool
    var bullet = p2BulletPool.getFirstDead();

    // If there aren't any bullets available then don't shoot
    if (bullet === null || bullet === undefined) return;

    // Revive the bullet
    // This makes the bullet "alive"
    bullet.revive();

    // Bullets should kill themselves when they leave the world.
    // Phaser takes care of this for me by setting this flag
    // but you can do it yourself by killing the bullet if
    // its x,y coordinates are outside of the world.
    bullet.checkWorldBounds = false;
    bullet.outOfBoundsKill = false;

    // Set the bullet position to the gun position.
    bullet.reset(spP2.x, spP2.y);

    laserSound = this.add.audio('laser');
    laserSound.play();

    // Shoot it
    if (p2Dir == 1) {
      bullet.body.velocity.x = 0;
      bullet.body.velocity.y = -bulletSpeed;
    } else if (p2Dir == 2) {
      bullet.body.velocity.x = -bulletSpeed;
      bullet.body.velocity.y = 0;
    } else if (p2Dir == 3) {
      bullet.body.velocity.x = 0;
      bullet.body.velocity.y = bulletSpeed;
    } else {
      bullet.body.velocity.x = bulletSpeed;
      bullet.body.velocity.y = 0;
    }
    this.time.events.add(Phaser.Timer.SECOND * 5, function() {
        // Kill the bullet
        bullet.kill();
    }, this);
  },
  p1Hit: function() {
    p1Lives--;
    if(p1Lives <= 0) {
      gameObj.p2WinCounter++;
      this.state.start('P2Win');
    } else if (p1Lives == 2) {
      spP1HeartC.loadTexture('heartempty');
    } else {
      spP1HeartB.loadTexture('heartempty');
    }
  },
  p2Hit: function() {
    p2Lives--;
    if(p2Lives <= 0) {
      gameObj.p1WinCounter++;
      this.state.start('P1Win');
    } else if (p2Lives == 2) {
      spP2HeartC.loadTexture('heartempty');
    } else {
      spP2HeartB.loadTexture('heartempty');
    }
  },
  addButtonsP1: function() {
    p1ShootButton = p1Pad.getButton(Phaser.Gamepad.XBOX360_RIGHT_TRIGGER);

    p1ShootButton.onDown.add(function() {
      p1Shooting = true;
    }, this);
    p1ShootButton.onUp.add(function() {
      p1Shooting = false;
    }, this);
  },
  addButtonsP2: function() {
    p2ShootButton = p2Pad.getButton(Phaser.Gamepad.XBOX360_RIGHT_TRIGGER);

    p2ShootButton.onDown.add(function() {
      p2Shooting = true;
    }, this);
    p2ShootButton.onUp.add(function() {
      p2Shooting = false;
    }, this);
  }
};
