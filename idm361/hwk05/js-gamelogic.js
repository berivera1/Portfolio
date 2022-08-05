var plyr_turn = Math.round(Math.random());
var p0 = "𐩒";
var p0Pieces = 8;
var p1 = "✖";
var p1Pieces = 8;
var curMovableTiles = [];
var deadTiles = [];
var lastMove;
var moveStage = 0;

function nextMove(){
    if(plyr_turn == 0) {
        plyr_turn = 1;
        document.getElementById("whosturn").innerHTML = p0 + "'s Turn";
        startMove();
    } else {
        plyr_turn = 0;
        document.getElementById("whosturn").innerHTML = p1 + "'s Turn";
        startMove();
    }
}

function checkDead(){
    p0Pieces = 0;
    p1Pieces = 0;
    for(i = 1; i < 49; i++) {
        let curTile = document.getElementById("s"+i);
        if(curTile.textContent == "𐩒") {
           p0Pieces++;
        } else if(curTile.textContent == "✖") {
            p1Pieces++;
        }
    }
    if(p0Pieces == 0) {
        location.href = "p1.html";
    } else if(p1Pieces == 0) {
        location.href = "p0.html";
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
        if((curTile.textContent == "𐩒") && (plyr_turn == 1)) {
            curTile.style.opacity = 1;
            curMovableTiles.push(curTile);
        } else if((curTile.textContent == "✖") && (plyr_turn == 0)) {
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
        if (i%6 == 0 && (((i-6 == j || i-1 == j || i+6 == j) && curTile.textContent == "") || ((i-7 == j || i-6 == j || i-1 == j || i+5 == j || i+6 == j) && curTile.textContent == "✖" && plyr_turn == 1) || ((i-7 == j || i-6 == j || i-1 == j || i+5 == j || i+6 == j) && curTile.textContent == "𐩒" && plyr_turn == 0)) && !deadTiles.includes(curTile)) {
            curTile.style.opacity = 1;
            curMovableTiles.push(curTile);
        } else if(i%6 == 1 && (((i-6 == j || i+1 == j || i+6 == j) && curTile.textContent == "") || ((i-6 == j || i-5 == j || i+1 == j || i+6 == j || i+7 == j) && curTile.textContent == "✖" && plyr_turn == 1) || ((i-6 == j || i-5 == j || i+1 == j || i+6 == j || i+7 == j) && curTile.textContent == "𐩒" && plyr_turn == 0)) && !deadTiles.includes(curTile)) {
            curTile.style.opacity = 1;
            curMovableTiles.push(curTile);
        } else if (i%6 > 1 && (((i-6 == j || i-1 == j || i+1 == j || i+6 == j) && curTile.textContent == "") || ((i-7 == j || i-6 == j || i-5 == j || i-1 == j || i+1 == j || i+5 == j || i+6 == j || i+7 == j) && curTile.textContent == "✖" && plyr_turn == 1) || ((i-7 == j || i-6 == j || i-5 == j || i-1 == j || i+1 == j || i+5 == j || i+6 == j || i+7 == j) && curTile.textContent == "𐩒" && plyr_turn == 0)) && !deadTiles.includes(curTile)) {
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
        document.getElementById("s"+i).innerHTML = "✖";
    } else if(curMovableTiles.length != 0) {
        document.getElementById("s"+i).innerHTML = "𐩒";
    }
    checkDead();
}

function delTile(tile) {
    tile.innerHTML = "";
    tile.style.opacity = 0;
    deadTiles.push(tile);
}