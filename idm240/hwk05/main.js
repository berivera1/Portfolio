document.getElementById("wrapper").style.height = window.innerHeight + "px";
document.getElementById("great-wave").style.height = window.innerHeight - document.getElementById("great-wave").offsetTop + "px";


var audioPlayerObj = document.getElementById('audioplayer');
var playPauseObj = document.getElementById('mute-btn');

var sndPlaying = false;

var wheels = Array.from(document.getElementsByClassName("wheel"));

function audioToggle() {
	if (sndPlaying) {
		audioPlayerObj.pause();
		sndPlaying = false;
		document.getElementsByClassName('txt-rotate')[0].dataset.rotateto = '[ "P L A Y" ]';
		document.getElementsByClassName('txt-rotate')[0].dataset.rotatefrom = '[ "P A U S E" ]';
		rotateText();
		wheels.forEach(function(curWheel) {
		  curWheel.classList.remove("wheel-rotate");
		});
	} else {
		audioPlayerObj.play();
		sndPlaying = true;
		document.getElementsByClassName('txt-rotate')[0].dataset.rotateto = '[ "P A U S E" ]';
		document.getElementsByClassName('txt-rotate')[0].dataset.rotatefrom = '[ "P L A Y" ]';
		rotateText();
		wheels.forEach(function(curWheel) {
		  curWheel.classList.add("wheel-rotate");
		});
	}
}

document.getElementsByClassName("tape-recorder")[0].addEventListener("click", function(){audioToggle();}, false);

function resizeDivs() {
	checkMuteMatch();
	document.getElementById("wrapper").style.height = window.innerHeight + "px";
	document.getElementById("great-wave").style.height = window.innerHeight - document.getElementById("great-wave").offsetTop + "px";
}

window.addEventListener('resize', resizeDivs, false);

var TxtRotate = function(el, toRotate, fromRotate) {
  this.toRotate = toRotate;
	this.fromRotate = fromRotate;
  this.el = el;
  this.txt = '';
	this.isDeleting = true;
  this.tick(2, 1);
};

TxtRotate.prototype.tick = function(countdown, pastMid) {
	if (countdown > 0 && pastMid > 0) {
		var fullTxt = this.fromRotate[0];
	}
	else {
		var fullTxt = this.toRotate[0];
	}

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

	if (countdown == 2) {
		this.txt = fullTxt.substring(0, fullTxt.length);
		countdown = 1;
	}

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;

  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
		countdown--;
		this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    delta = 500;
		pastMid--;
  }

	if (countdown > 0) {
	  setTimeout(function() {
	    that.tick(countdown, pastMid);
	  }, delta);
	}
};

function rotateText() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotateto');
		var fromRotate = elements[i].getAttribute('data-rotatefrom');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), JSON.parse(fromRotate));
    }
  }
};

const gsTitle = {
	init() {
		this._root = document.querySelector( "#gsTitle" );
		this._titles = this._root.querySelectorAll( ".gsTitle-title" );
		this._frame = this._frame.bind( this );
		this.setTexts( [
			"ONEOHTRIX",
			"ONƎOH┴ɹIX",
			"σηєσнхтриχ",
			"๏ภє๏ђՇгเא",
			"一あトリック",
		] );
	},
	on() {
		if ( !this._frameId ) {
			this._frame();
		}
	},
	off() {
		clearTimeout( this._frameId );
		this._textContent( this._text );
		delete this._frameId;
	},
	setTexts( [ text, ...alt ] ) {
		this._text = text;
		this._textAlt = alt;
	},

	_text: "",
	_textAlt: [],
	_rand( n ) {
		return Math.random() * n | 0;
	},
	_textContent( txt ) {
		this._titles.forEach( el => el.innerHTML = txt );
	},
	_frame() {
		const txt = Array.from( this._text );

		for ( let i = 0; i < 6; ++i ) {
			const ind = this._rand( this._text.length );

			txt[ ind ] = this._textAlt[ this._rand( this._textAlt.length ) ][ ind ];
		}
		this._textContent( txt.join( "" ) );
		this._root.classList.add( "gsTitle-glitched" );
		setTimeout( () => {
			this._textContent( this._text );
			this._root.classList.remove( "gsTitle-glitched" );
		}, 250 + Math.random() * 200 );
		this._frameId = setTimeout( this._frame, 750 + Math.random() * 500 );
	},
};

const gsTitle2 = {
	init() {
		this._root = document.querySelector( "#gsTitle2" );
		this._titles = this._root.querySelectorAll( ".gsTitle-title" );
		this._frame = this._frame.bind( this );
		this.setTexts( [
			"POINT",
			"ԀOIN┴",
			"Пσιηт",
			"ק๏เภՇ",
			"ポイント",
		] );
	},
	on() {
		if ( !this._frameId ) {
			this._frame();
		}
	},
	off() {
		clearTimeout( this._frameId );
		this._textContent( this._text );
		delete this._frameId;
	},
	setTexts( [ text, ...alt ] ) {
		this._text = text;
		this._textAlt = alt;
	},

	_text: "",
	_textAlt: [],
	_rand( n ) {
		return Math.random() * n | 0;
	},
	_textContent( txt ) {
		this._titles.forEach( el => el.innerHTML = txt );
	},
	_frame() {
		const txt = Array.from( this._text );

		for ( let i = 0; i < 6; ++i ) {
			const ind = this._rand( this._text.length );

			txt[ ind ] = this._textAlt[ this._rand( this._textAlt.length ) ][ ind ];
		}
		this._textContent( txt.join( "" ) );
		this._root.classList.add( "gsTitle-glitched" );
		setTimeout( () => {
			this._textContent( this._text );
			this._root.classList.remove( "gsTitle-glitched" );
		}, 250 + Math.random() * 200 );
		this._frameId = setTimeout( this._frame, 750 + Math.random() * 500 );
	},
};

const gsTitle3 = {
	init() {
		this._root = document.querySelector( "#gsTitle3" );
		this._titles = this._root.querySelectorAll( ".gsTitle-title" );
		this._frame = this._frame.bind( this );
		this.setTexts( [
			"NEVER",
			"NƎΛƎɹ",
			"ηєгда",
			"ภєשєг",
			"決して",
		] );
	},
	on() {
		if ( !this._frameId ) {
			this._frame();
		}
	},
	off() {
		clearTimeout( this._frameId );
		this._textContent( this._text );
		delete this._frameId;
	},
	setTexts( [ text, ...alt ] ) {
		this._text = text;
		this._textAlt = alt;
	},

	_text: "",
	_textAlt: [],
	_rand( n ) {
		return Math.random() * n | 0;
	},
	_textContent( txt ) {
		this._titles.forEach( el => el.innerHTML = txt );
	},
	_frame() {
		const txt = Array.from( this._text );

		for ( let i = 0; i < 6; ++i ) {
			const ind = this._rand( this._text.length );

			txt[ ind ] = this._textAlt[ this._rand( this._textAlt.length ) ][ ind ];
		}
		this._textContent( txt.join( "" ) );
		this._root.classList.add( "gsTitle-glitched" );
		setTimeout( () => {
			this._textContent( this._text );
			this._root.classList.remove( "gsTitle-glitched" );
		}, 250 + Math.random() * 200 );
		this._frameId = setTimeout( this._frame, 750 + Math.random() * 500 );
	},
};

gsTitle.init();
gsTitle2.init();
gsTitle3.init();

var onOffGlitch = false;

document.getElementsByClassName("opn-title")[0].addEventListener("click", function(){
	if (onOffGlitch == false) {
		gsTitle.on();
		gsTitle2.on();
		gsTitle3.on();
		onOffGlitch = true;
	}
	else {
		gsTitle.off();
		gsTitle2.off();
		gsTitle3.off();
		onOffGlitch = false;
	}
}, false);

var lineartToF = false;

var lineartMovement;
lineartMovement = anime({
      targets: '#lineart-svg path',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 1500,
      delay: function(el, i) { return i * 250 },
      direction: 'normal',
      loop: false
    });

document.getElementById("lineart-svg").addEventListener("click", function(){
	if (lineartToF == false) {
		lineartMovement = anime({
      targets: '#lineart-svg path',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 1500,
      delay: function(el, i) { return i * 250 },
      direction: 'reverse',
      loop: 1
    });
		lineartToF = true;
	}
	else {
		lineartMovement = anime({
      targets: '#lineart-svg path',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 1500,
      delay: function(el, i) { return i * 250 },
      direction: 'normal',
      loop: false
    });
		lineartToF = false;
	}
}, false);

function checkMuteMatch() {
	var muteMatch = window.matchMedia("(max-width: 768px)");
	if (muteMatch.matches) {
	    document.getElementById("mute-btn").style.right = document.getElementById("lineart-svg-container").getBoundingClientRect().left + 10 + "px";
	}
}
