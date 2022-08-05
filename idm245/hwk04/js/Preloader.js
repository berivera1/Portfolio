gameObj.Preloader = function (game) {};

gameObj.Preloader.prototype = {
  preload: function () {
    console.log("State - Preloader");

    // Progress Bar Animation
    this.preloadBg = this.add.sprite((960-297)/2, (720-145)/2, 'preloaderBg');
    this.preloadBar = this.add.sprite((960-158)/2, (720-50)/2, 'preloaderBar');
    this.load.setPreloadSprite(this.preloadBar);

    // Load the Google WebFont Loader script
    this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');

    // Load the Main Song
    this.load.audio('mainsong', 'audio/bossfight-milkyways.mp3');

    // Load the Logo and Backgrounds
    this.load.image('logo', 'img/logo.png');
    this.load.image('background', 'img/background.png');
    this.load.image('backgroundSkewed', 'img/background-skewed.png');
    this.load.image('controlBoxes', 'img/control-boxes.png');

    // Load the Main Buttons
    this.load.spritesheet('playButton', 'img/play-button.png', 168, 63);
    this.load.spritesheet('helpButton', 'img/help-button.png', 168, 63);
    this.load.spritesheet('creditsButton', 'img/credits-button.png', 245, 63);
    this.load.spritesheet('musicButton', 'img/music-button.png', 45, 45);

    // Load the Win Condition Buttons (Temp)
    // -----TEMP-----
    this.load.spritesheet('p1WinButton', 'img/p1-win-button.png', 147, 63);
    this.load.spritesheet('p2WinButton', 'img/p2-win-button.png', 147, 63);
    this.load.spritesheet('tieButton', 'img/tie-button.png', 147, 63);

    // Load the Post-Game Buttons
    this.load.spritesheet('playAgainButton', 'img/play-again-button.png', 308, 63);
    this.load.spritesheet('menuButton', 'img/menu-button.png', 196, 63);
    this.load.spritesheet('yesButton', 'img/yes-button.png', 147, 63);
    this.load.spritesheet('noButton', 'img/no-button.png', 126, 63);

    // Load the In-Game UI Elements
    this.load.image('overlay', 'img/overlay.png');
    this.load.image('heartfull', 'img/heart-full.png');
    this.load.image('heartempty', 'img/heart-empty.png');

    // Load the Player Characters
    this.load.spritesheet('p1', 'img/a-slime.png', 80, 75, 3);
    this.load.spritesheet('p2', 'img/b-slime.png', 80, 75, 3);
    this.load.image('p1bullet', 'img/a-bullet.png');
    this.load.image('p2bullet', 'img/b-bullet.png');

    // Load the Post-Game Visuals
    this.load.image('tear', 'img/tear.png');
    this.load.image('trophy', 'img/trophy.png');
  },
  create: function () {
    this.state.start('Main');
  }
};
