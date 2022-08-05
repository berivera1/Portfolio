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
    playPauseObj.classList.remove("mute-btn-active");
		wheels.forEach(function(curWheel) {
		  curWheel.classList.remove("wheel-rotate");
		});
	} else {
		audioPlayerObj.play();
		sndPlaying = true;
    playPauseObj.classList.add("mute-btn-active");
		wheels.forEach(function(curWheel) {
		  curWheel.classList.add("wheel-rotate");
		});
	}
}

function resizeDivs() {
	document.getElementById("wrapper").style.height = window.innerHeight + "px";
	document.getElementById("great-wave").style.height = window.innerHeight - document.getElementById("great-wave").offsetTop + "px";
}

window.addEventListener('resize', resizeDivs, false);
