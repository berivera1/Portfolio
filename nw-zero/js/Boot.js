var gameObj = {
  // Global variables are decleared here!
  gTime: "02:00",
  spOverlay: "",
  textQuestion: "",
  generalStyle: "",
  btYes: "",
  btNo: "",
  btMusic: "",
  music: "",
  p1WinCounter: 0,
  p2WinCounter: 0
};

gameObj.Boot = function (game) {};

gameObj.Boot.prototype = {
  preload: function () {
    this.load.image('preloaderBg', 'img/loading-bg.png');
    this.load.image('preloaderBar', 'img/loading-bar.png');
  },
  create: function () {
    this.state.start('Preloader');
  }
};
