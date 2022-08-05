var plyr_turn = Math.round(Math.random());
var soundPaused = true;
var p0 = "O";
var p0Pieces = 8;
var priorP0Pieces = 8;
var p1 = "X";
var p1Pieces = 8;
var priorP1Pieces = 8;
var curMovableTiles = [];
var deadTiles = [];
var lastMove;
var moveStage = 0;

var moveSound = new sound("audio/move.mp3", false);
var attackSound = new sound("audio/attack.mp3", false);
var winSound = new sound("audio/win.mp3", false);
var ambientSound = new sound("audio/music.mp3", true);

function nextMove(){
    if(plyr_turn == 0) {
        plyr_turn = 1;
        document.getElementById("whosturn").innerHTML = "<span class=\"varela\">" + p0 + "</span>" + "'s Turn";
        startMove();
    } else {
        plyr_turn = 0;
        document.getElementById("whosturn").innerHTML = "<span class=\"varela\">" + p1 + "</span>" + "'s Turn";
        startMove();
    }
}

function checkDead(){
    p0Pieces = 0;
    p1Pieces = 0;
    for(i = 1; i < 49; i++) {
        let curTile = document.getElementById("s"+i);
        if(curTile.textContent == "O") {
           p0Pieces++;
        } else if(curTile.textContent == "X") {
            p1Pieces++;
        }
    }
    if(p0Pieces == priorP0Pieces && p0Pieces != 0 && p1Pieces == priorP1Pieces && p1Pieces != 0) {
        if(soundPaused == false) {
            moveSound.play();
        }
    }
    if(p0Pieces != priorP0Pieces && p0Pieces != 0) {
        priorP0Pieces--;
        if(soundPaused == false) {
            attackSound.play();
        }
    }
    if(p1Pieces != priorP1Pieces && p1Pieces != 0) {
        priorP1Pieces--;
        if(soundPaused == false) {
            attackSound.play();
        }
    }
    if(p0Pieces == 0) {
        if(soundPaused == false) {
            winSound.play();
        }
        setTimeout(function(){
            location.href = "p1.html";
        }, 1050);
    } else if(p1Pieces == 0) {
        if(soundPaused == false) {
            winSound.play();
        }
        setTimeout(function(){
            location.href = "p0.html";
        }, 2000);
    } else {
        nextMove();
    }
}

function startMove(){
    moveStage = 0;
    curMovableTiles = [];
    getMovableTiles();
}

function getMovableTiles(){
    for(i = 1; i < 49; i++) {
        let curTile = document.getElementById("s"+i);
        if((curTile.textContent == "O") && (plyr_turn == 1)) {
            curTile.style.opacity = 1;
            curMovableTiles.push(curTile);
        } else if((curTile.textContent == "X") && (plyr_turn == 0)) {
            curTile.style.opacity = 1;
            curMovableTiles.push(curTile);
        } else if (!deadTiles.includes(curTile)) {
            curTile.style.opacity = 0.5;
        }
    }
    moveStage = 1;
}

function performAction(i) {
    if (curMovableTiles.includes(document.getElementById("s"+i))) {
        if(moveStage == 1) {
            lastMove = document.getElementById("s"+i);
            getPossibleMoves(i);
        } else if (moveStage == 2) {
            delTile(lastMove);
            updateMove(i);
        }
    }
}

function getPossibleMoves(i){
    curMovableTiles = [];
    let mainTile = document.getElementById("s"+i);
    for(j = 1; j < 49; j++) {
        let curTile = document.getElementById("s"+j);
        if (i%6 == 0 && (((i-6 == j || i-1 == j || i+6 == j) && curTile.textContent == "") || ((i-7 == j || i-6 == j || i-1 == j || i+5 == j || i+6 == j) && curTile.textContent == "X" && plyr_turn == 1) || ((i-7 == j || i-6 == j || i-1 == j || i+5 == j || i+6 == j) && curTile.textContent == "O" && plyr_turn == 0)) && !deadTiles.includes(curTile)) {
            curTile.style.opacity = 1;
            curMovableTiles.push(curTile);
        } else if(i%6 == 1 && (((i-6 == j || i+1 == j || i+6 == j) && curTile.textContent == "") || ((i-6 == j || i-5 == j || i+1 == j || i+6 == j || i+7 == j) && curTile.textContent == "X" && plyr_turn == 1) || ((i-6 == j || i-5 == j || i+1 == j || i+6 == j || i+7 == j) && curTile.textContent == "O" && plyr_turn == 0)) && !deadTiles.includes(curTile)) {
            curTile.style.opacity = 1;
            curMovableTiles.push(curTile);
        } else if (i%6 > 1 && (((i-6 == j || i-1 == j || i+1 == j || i+6 == j) && curTile.textContent == "") || ((i-7 == j || i-6 == j || i-5 == j || i-1 == j || i+1 == j || i+5 == j || i+6 == j || i+7 == j) && curTile.textContent == "X" && plyr_turn == 1) || ((i-7 == j || i-6 == j || i-5 == j || i-1 == j || i+1 == j || i+5 == j || i+6 == j || i+7 == j) && curTile.textContent == "O" && plyr_turn == 0)) && !deadTiles.includes(curTile)) {
            curTile.style.opacity = 1;
            curMovableTiles.push(curTile);
        } else if (!deadTiles.includes(curTile)) {
            curTile.style.opacity = 0.5;
        }
    }
    mainTile.style.opacity = 0.85;
    moveStage = 2;

    if(curMovableTiles.length == 0) {
        delTile(document.getElementById("s"+i));
        updateMove(i);
    }
}

function updateMove(i) {
    if (plyr_turn == 0 && curMovableTiles.length != 0) {
        document.getElementById("s"+i).innerHTML = "X";
    } else if(curMovableTiles.length != 0) {
        document.getElementById("s"+i).innerHTML = "O";
    }
    checkDead();
}

function delTile(tile) {
    tile.innerHTML = "";
    tile.style.opacity = 0;
    deadTiles.push(tile);
}

document.getElementById("audio-btn").addEventListener("click", function(){
    if(ambientSound.isPlaying()) {
        ambientSound.pause();
        document.getElementById("audio-btn").src = "img/audio_off.png";
    } else {
        ambientSound.play();
        document.getElementById("audio-btn").src = "img/audio_on.png";
    }
});

document.getElementById("soundeff-btn").addEventListener("click", function(){
    if(soundPaused == true) {
        soundPaused = false;
        document.getElementById("soundeff-btn").src = "img/soundeff_on.png";
    } else {
        soundPaused = true;
        document.getElementById("soundeff-btn").src = "img/soundeff_off.png";
    }
});

function sound(src, loop) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.loop = loop;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.isPlaying = function(){
        return !this.sound.paused;
    }
    this.play = function(){
        this.sound.play();
    }
    this.pause = function(){
        this.sound.pause();
    }
}