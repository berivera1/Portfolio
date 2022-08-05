var gameObj = {
  // Global variables are decleared here!
  gTime: "00:00",
  spOverlay: "",
  textQuestion: "",
  generalStyle: "",
  btYes: "",
  btNo: "",
  btMusic: "",
  music: ""
};

gameObj.Boot = function (game) {};

gameObj.Boot.prototype = {
  preload: function () {
    console.log("State - Boot");
    this.load.image('preloaderBg', 'img/loading-bg.png');
    this.load.image('preloaderBar', 'img/loading-bar.png');
  },
  create: function () {
    this.state.start('Preloader');
  }
};
