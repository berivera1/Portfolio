/*
  ---------------------------
    COMMISSIONS I RAINFALL
  ---------------------------
*/

var ctx;
var cW;
var cH;

var mouseIn = false;

var raindrops;

var rainStrength = 1;

function initCanvas() {

	ctx = document.getElementById("particle-canvas").getContext("2d");

  ctx.canvas.width = document.getElementById("canvas-holder").offsetWidth - 32;
	ctx.canvas.height = ctx.canvas.width;

	cW = ctx.canvas.width;
	cH = ctx.canvas.height;

}

function Raindrops() {
	this.x;
	this.y;
	this.s;
	this.width;
	this.height;
  this.rotate;
  this.special = false;

	this.drops = [];

}
Raindrops.prototype.addDrop = function() {
	this.x = (Math.floor(Math.random() * 8)) * ctx.canvas.width / 8;
  this.x += (this.x/ctx.canvas.width)*(19/584)*ctx.canvas.width;
	this.y = 0;
	this.s = 15;

  if (Math.floor(Math.random() * 100) > 98) {
      this.special = true;
  }
  else {
    this.special = false;
  }

	this.drops.push({
		x: this.x,
		y: this.y,
		velY: 0.1,
		width: ctx.canvas.width * (54 / 584),
		height: ctx.canvas.width / 70,
		speed: this.s,
		life: 60,
    special: this.special
	});

};
Raindrops.prototype.render = function() {
  window.addEventListener('resize', function(event){
    ctx.canvas.width = document.getElementById("canvas-holder").offsetWidth - 32;
  	ctx.canvas.height = ctx.canvas.width * (1770 / 1705);
  });

	for (var i = 0; i < rainStrength; i++) {
		if (mouseIn == true) {
      this.addDrop();
    }
	};

	ctx.save();

	ctx.clearRect(0, 0, cW, cH);

	for (var i = 0; i < this.drops.length; i++) {
		var drop = this.drops[i];

    if (drop.special == true){
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    }
    else {
      ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    }
		ctx.fillRect(drop.x, drop.y, drop.width, drop.height);
		drop.y += drop.speed * 0.2 + Math.random() * 4;
		drop.x += 0;


		if (drop.y + drop.height > cH) {

			this.drops.splice(i, 1);
		}
	};

	ctx.restore();

};


function init() {

	raindrops = new Raindrops();

	loop();
}

function render() {

	raindrops.render();

}

function loop() {
	requestAnimationFrame(loop);
	render();
}

window.addEventListener('load', function() {
	initCanvas();
	init();
});

document.getElementById("particle-canvas").addEventListener("mouseenter", function() {
	mouseIn = true;
});

document.getElementById("particle-canvas").addEventListener("mouseleave", function() {
	mouseIn = false;
});

/*
  ---------------------------
    TREE OF DELETE GROWTH
  ---------------------------
*/

var treeInOrOut = true;
var treeGrowth;

document.getElementById("tree-of-delete").addEventListener("click", function() {
  if (!treeInOrOut) {
    treeGrowth = anime({
      targets: '#tree-of-delete polyline',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 1500,
      delay: function(el, i) { return i * 250 },
      direction: 'normal',
      loop: false
    });
    treeInOrOut = true;
  }
  else {
    treeGrowth = anime({
      targets: '#tree-of-delete polyline',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 1500,
      delay: function(el, i) { return i * 250 },
      direction: 'reverse',
      loop: 1
    });
    treeInOrOut = false;
  }
});

/*
  ---------------------------
    COMMISSIONS II COMPACT
  ---------------------------
*/


var com2InOrOut = false;
var lines;
var xs;

document.getElementById("commissions-b").addEventListener("click", function() {
  if (!com2InOrOut) {
    lines = anime({
      targets: '#commissions-b rect',
      translateY: 300,
      easing: 'easeInOutSine',
      duration: 500,
      delay: function(el, i) { return i * 250 },
      direction: 'normal',
      loop: false
    });
    setTimeout(function(){
      xs = anime({
        targets: '#commissions-b polygon',
        translateX: -300,
        translateY: 300,
        rotate: 90,
        easing: 'easeInOutSine',
        duration: 700,
        delay: function(el, i) { return i * 400 },
        direction: 'normal',
        loop: false
      });
    }, 4500);
    com2InOrOut = true;
  }
  else {
    lines = anime({
      targets: '#commissions-b rect',
      translateY: 0,
      easing: 'easeInOutSine',
      duration: 500,
      delay: function(el, i) { return i * 250 },
      direction: 'normal',
      loop: false
    });
    setTimeout(function(){
      xs = anime({
        targets: '#commissions-b polygon',
        translateX: 0,
        translateY: 0,
        rotate: 0,
        easing: 'easeInOutSine',
        duration: 700,
        delay: function(el, i) { return i * 400 },
        direction: 'normal',
        loop: false
      });
    }, 4500);
    com2InOrOut = false;
  }
});

/*
  ---------------------------
    COMMISSIONS II COMPACT
  ---------------------------
*/

var eccoInOrOut = false;
var eccoC1;
var eccoC2;
var eccoO;

document.getElementById("myriad").addEventListener("click", function() {
  if (!eccoInOrOut) {
    eccoC1 = anime({
      targets: '#myriad #ecco-c1',
      translateX: -34,
      easing: 'easeInOutSine',
      duration: 700,
      direction: 'normal',
      loop: false
    });
    eccoC2 = anime({
      targets: '#myriad #ecco-c2',
      translateX: -68,
      easing: 'easeInOutSine',
      duration: 700,
      direction: 'normal',
      loop: false
    });
    eccoO = anime({
      targets: '#myriad #ecco-o',
      translateX: -102,
      easing: 'easeInOutSine',
      duration: 700,
      direction: 'normal',
      loop: false
    });
    eccoInOrOut = true;
  }
  else {
    eccoC1 = anime({
      targets: '#myriad #ecco-c1',
      translateX: 0,
      easing: 'easeInOutSine',
      duration: 700,
      direction: 'normal',
      loop: false
    });
    eccoC2 = anime({
      targets: '#myriad #ecco-c2',
      translateX: 0,
      easing: 'easeInOutSine',
      duration: 700,
      direction: 'normal',
      loop: false
    });
    eccoO = anime({
      targets: '#myriad #ecco-o',
      translateX: 0,
      easing: 'easeInOutSine',
      duration: 700,
      direction: 'normal',
      loop: false
    });
    eccoInOrOut = false;
  }
});
