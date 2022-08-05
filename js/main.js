// Initializing global variables

var projTop = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000, 2100];

var projTopTablet = [10, 110, 210, 310, 410, 510, 610, 710, 810, 910, 1010, 1110, 1210, 1310, 1410, 1510, 1610, 1710, 1810, 1910, 2010, 2110];

var tabletWatch = window.matchMedia("screen and (max-aspect-ratio: 1/1)");

var phoneWatch = window.matchMedia("screen and (max-aspect-ratio: 2/1)");

var isExploring = false;

var startTime = new Date();

var endTime;

// Changing out picutres depending on if the user is on a Tablet / Mobile.

if (tabletWatch.matches) {

  document.getElementById("bear-logo").src = "img/logo/crlogo_grey.svg";

}



// Function: Skip the splash screen.

function skipSplash() {

  document.getElementById("splash").classList.add("skip-splash");

}



// Function: Open up the main menu.

function openMainMenu() {

  undoMenuPop();

  setTimeout(function(){

    document.getElementById("main-menu").style.opacity = "1";

  }, 10);

  // If the user is on Tablet / Mobile, the menu slides opened downward. Otherwise, it slides rightwards.

  if (tabletWatch.matches) {

    document.getElementById("main-menu").classList.add("push-down");

    document.getElementById("main-menu").classList.remove("pop-up");

  }

  else {

    document.getElementById("main-menu").classList.add("push-right");

    document.getElementById("main-menu").classList.remove("pop-left");

  }

  var menuItems = document.getElementsByClassName("menu-item");

  for(var i = 0; i < menuItems.length; i++) {

    menuItems[i].classList.add("slit-in");

    menuItems[i].classList.remove("slit-out");

  }

  document.getElementById("bear-logo-white").classList.add("slit-in");

  document.getElementById("bear-logo-white").classList.remove("slit-out");

  document.getElementById("exit-btn-img").classList.add("swirl-in");

  document.getElementById("exit-btn-img").classList.remove("swirl-out");

  document.getElementById("social-icons").classList.add("slit-in");

  document.getElementById("social-icons").classList.remove("slit-out");

}





// Function: Close the main menu.

function closeMainMenu() {

  undoMenuPop();

  document.getElementById("vl").classList.remove("fade-in");

  // If the user is on Tablet / Mobile, the menu slides closed upward. Otherwise, it slides leftwards.

  if (tabletWatch.matches) {

    document.getElementById("main-menu").classList.add("pop-up");

    document.getElementById("main-menu").classList.remove("push-down");

  }

  else {

    document.getElementById("main-menu").classList.add("pop-left");

    document.getElementById("main-menu").classList.remove("push-right");

  }

  var menuItems = document.getElementsByClassName("menu-item");

  for(var i = 0; i < menuItems.length; i++) {

    menuItems[i].classList.add("slit-out");

    menuItems[i].classList.remove("slit-in");

  }

  document.getElementById("bear-logo-white").classList.add("slit-out");

  document.getElementById("bear-logo-white").classList.remove("slit-in");

  document.getElementById("exit-btn-img").classList.add("swirl-out");

  document.getElementById("exit-btn-img").classList.remove("swirl-in");

  document.getElementById("social-icons").classList.add("slit-out");

  document.getElementById("social-icons").classList.remove("slit-in");

  setTimeout(function(){

    document.getElementById("main-menu").style.opacity = "0";

  }, 499);

}



// Function: When the user goes from a project to Home, revert

// all the variables and styles back to their original properties.

function revertExplore() {

  isExploring = false;

  document.getElementById("title-card").style.opacity = 1;

  projTop = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900];

  projTopTablet = [10, 110, 210, 310, 410, 510, 610, 710, 810, 910, 1010, 1110, 1210, 1310, 1410, 1510, 1610, 1710, 1810, 1910];

  document.getElementById("cur").innerHTML = "1";

  document.getElementById("section-01-titlescreen").style.top = "100%";

  document.getElementById("wp-project").style.top = "200%";

  document.getElementById("bn-project").style.top = "300%";

  document.getElementById("section-02-titlescreen").style.top = "400%";

  document.getElementById("veer-project").style.top = "500%";

  document.getElementById("crp-project").style.top = "600%";

  document.getElementById("tf-project").style.top = "700%";
  
  document.getElementById("aeat-project").style.top = "800%";

  document.getElementById("opn-project").style.top = "900%";

  document.getElementById("nfrs-project").style.top = "1000%";

  document.getElementById("section-03-titlescreen").style.top = "1100%";

  document.getElementById("wtti-project").style.top = "1200%";

  document.getElementById("ma-project").style.top = "1300%";

  document.getElementById("ta-project").style.top = "1400%";

  document.getElementById("sfkz-project").style.top = "1500%";

  document.getElementById("nwz-project").style.top = "1600%";

  document.getElementById("nw-project").style.top = "1700%";

  document.getElementById("section-04-titlescreen").style.top = "1800%";

  document.getElementById("dod-project").style.top = "1900%";

  document.getElementById("pwrd-project").style.top = "2000%";

  document.getElementById("gc-project").style.top = "2100%";

  document.getElementById("cc-project").style.top = "2200%";

  var projScrollItems = document.getElementsByClassName("sidenav-proj-scroll");

  for (var i = 0; i < projScrollItems.length; i++) {

    projScrollItems[i].style.opacity = "1";

    projScrollItems[i].classList.add("fade-out");

    projScrollItems[i].classList.remove("fade-in");

  }

  setTimeout(function(){

    let root = document.documentElement;

    root.style.setProperty("--main-bg-color", "#484848");

    var pics = document.getElementsByClassName("white-img");

    for (var i = 0; i < pics.length; i++) {

      pics[i].style.filter = "";

    }

  }, 250);

  setTimeout(function(){

    for (var i = 0; i < projScrollItems.length; i++) {

      projScrollItems[i].style.display = "none";

    }

  }, 10);

}



// Function: When the user clicks "EXPLORE", bring all the tabs upward.

function explore() {

  isExploring = true;

  pushProj(false, true); // Push all the projects upward in the browser.

  var projScrollItems = document.getElementsByClassName("sidenav-proj-scroll");

  for (var i = 0; i < projScrollItems.length; i++) {

    projScrollItems[i].style.opacity = "0";

    projScrollItems[i].style.display = "block";

    projScrollItems[i].classList.remove("fade-out");

    projScrollItems[i].classList.add("fade-in");

  }



  setTimeout(function(){

    document.getElementById("title-card").style.opacity = 0;

  }, 500);

}





// Function: Push all the project divs upward. IsUp is a bool for if the user is

// clicks the up arrow or down arrow. IsFromExplore is just a bool to check if

// this funtion is being called from the explore() function.

function pushProj(isUp, isFromExplore) {

  var curProj = document.getElementById("cur");

  var curNum = parseInt(curProj.innerHTML);

  var closeAllProjs = false;

  var hexStr = "";

  var hueDegStr = "";

  var brightStr = "";

  var grayStr = "";

  // If the users presses the up arrow and the current viewed project is the

  // first one, return the user to the Home page.

  if (isUp == true && curNum == 1) {

    isExploring = false;

    revertExplore();

    closeAllProjs = true;

  }

  // Else, if the user presses up, return the user to the previous Project div

  // in the list of Projects.

  else if (isUp == true) {

    curNum -= 1;

    for (var i = 0; i < projTop.length ; i++) {

      projTop[i] = projTop[i]+100;

      projTopTablet[i] = projTopTablet[i]+100;

    }

  }

  // Else, if the user clicks the down arrow and is not on the final project,

  // bring them to the next Project div.

  else if (isUp == false && curNum < 22 && isFromExplore == false) {

    curNum += 1;

    for (var i = 0; i < projTop.length ; i++) {

      projTop[i] = projTop[i]-100;

      projTopTablet[i] = projTopTablet[i]-100;

    }

  }

  // If the user is on a Tablet or Phone, move the divs accordingly.

  if(tabletWatch.matches) {

    document.getElementById("section-01-titlescreen").style.top = `${projTopTablet[0]}%`;

    document.getElementById("wp-project").style.top = `${projTopTablet[1]}%`;

    document.getElementById("bn-project").style.top = `${projTopTablet[2]}%`;

    document.getElementById("section-02-titlescreen").style.top = `${projTopTablet[3]}%`;

    document.getElementById("veer-project").style.top = `${projTopTablet[4]}%`;

    document.getElementById("crp-project").style.top = `${projTopTablet[5]}%`;

    document.getElementById("tf-project").style.top = `${projTopTablet[6]}%`;
    
    document.getElementById("aeat-project").style.top = `${projTopTablet[7]}%`;

    document.getElementById("opn-project").style.top = `${projTopTablet[8]}%`;

    document.getElementById("nfrs-project").style.top = `${projTopTablet[9]}%`;

    document.getElementById("section-03-titlescreen").style.top = `${projTopTablet[10]}%`;

    document.getElementById("wtti-project").style.top = `${projTopTablet[11]}%`;

    document.getElementById("ma-project").style.top = `${projTopTablet[12]}%`;

    document.getElementById("ta-project").style.top = `${projTopTablet[13]}%`;

    document.getElementById("sfkz-project").style.top = `${projTopTablet[14]}%`;

    document.getElementById("nwz-project").style.top = `${projTopTablet[15]}%`;

    document.getElementById("nw-project").style.top = `${projTopTablet[16]}%`;

    document.getElementById("section-04-titlescreen").style.top = `${projTopTablet[17]}%`;

    document.getElementById("dod-project").style.top = `${projTopTablet[18]}%`;

    document.getElementById("pwrd-project").style.top = `${projTopTablet[19]}%`;

    document.getElementById("gc-project").style.top = `${projTopTablet[20]}%`;

    document.getElementById("cc-project").style.top = `${projTopTablet[21]}%`;

  }

  // Else, move the divs as if the user is on the desktop.

  else {

    document.getElementById("section-01-titlescreen").style.top = `${projTop[0]}%`;

    document.getElementById("wp-project").style.top = `${projTop[1]}%`;

    document.getElementById("bn-project").style.top = `${projTop[2]}%`;

    document.getElementById("section-02-titlescreen").style.top = `${projTop[3]}%`;

    document.getElementById("veer-project").style.top = `${projTop[4]}%`;

    document.getElementById("crp-project").style.top = `${projTop[5]}%`;

    document.getElementById("tf-project").style.top = `${projTop[6]}%`;
    
    document.getElementById("aeat-project").style.top = `${projTop[7]}%`;

    document.getElementById("opn-project").style.top = `${projTop[8]}%`;

    document.getElementById("nfrs-project").style.top = `${projTop[9]}%`;

    document.getElementById("section-03-titlescreen").style.top = `${projTop[10]}%`;

    document.getElementById("wtti-project").style.top = `${projTop[11]}%`;

    document.getElementById("ma-project").style.top = `${projTop[12]}%`;

    document.getElementById("ta-project").style.top = `${projTop[13]}%`;

    document.getElementById("sfkz-project").style.top = `${projTop[14]}%`;

    document.getElementById("nwz-project").style.top = `${projTop[15]}%`;

    document.getElementById("nw-project").style.top = `${projTop[16]}%`;

    document.getElementById("section-04-titlescreen").style.top = `${projTop[17]}%`;

    document.getElementById("dod-project").style.top = `${projTop[18]}%`;

    document.getElementById("pwrd-project").style.top = `${projTop[19]}%`;

    document.getElementById("gc-project").style.top = `${projTop[20]}%`;

    document.getElementById("cc-project").style.top = `${projTop[21]}%`;

  }

  // Set the UI elements to match the colors of the current Project div.

  if (curNum == 2) {

    hexStr = "#000000";

  }

  if (curNum == 3) {

    hexStr = "#1e73be";

  }

  else if (curNum == 5) {

    hexStr = "#422B67";

  }

  else if (curNum == 6) {

    hexStr = "#485356";

  }

  else if (curNum == 7) {

    hexStr = "#000";

  }

  else if (curNum == 8) {

    hexStr = "#4169e1";

  }

  else if (curNum == 9) {

    hexStr = "#888888";

  }

  else if (curNum == 10) {

    hexStr = "#E73C7E";

  }

  else if (curNum == 12) {

      hexStr = "#3693d9";

  }

  else if (curNum == 13) {

    hexStr = "#ce0f58";

  }

  else if (curNum == 15) {

    hexStr = "#6f2da8";

  }

  else if (curNum == 16) {

    hexStr = "#FF0000";

  }

  else if (curNum == 17) {

    hexStr = "#0083ab";

  }

  else if (curNum == 19) {

      hexStr = "#040404";

  }

  else if (curNum == 20) {

    hexStr = "#666";

  }

  else if (curNum == 21) {

    hexStr = "#555";

  }

  else if (curNum == 22) {

    hexStr = "#993fa6";

  }

  else {

    hexStr = "#484848";

  }

  setTimeout(function(){

    let root = document.documentElement;

    root.style.setProperty("--main-bg-color", hexStr);

    var pics = document.getElementsByClassName("white-img");

    for (var i = 0; i < pics.length; i++) {

      pics[i].style.filter = `hue-rotate(${hueDegStr}deg) brightness(${brightStr}%) grayscale(${grayStr}%)`;

    }

  }, 250);

  // Set the counter viewable on the page to the correct #.

  curProj.innerHTML = curNum;

  // If the user goes back to the Home page, recall revertExplore.

  // This matches LN 134 - 137, but is necessary to make sure everything looks

  // as intended.

  if (isUp == true && curNum == 1 && closeAllProjs == true) {

    revertExplore();

  }

}



// Function: Pop the menu items inside the main menu leftward if the user

// clicks the "About" or "Contact" section.

function popMenuLeft(linkEl) {

  var menuItems = document.getElementsByClassName("menu-item");

  for(var i = 0; i < menuItems.length; i++) {

    menuItems[i].classList.remove("slit-out");

    menuItems[i].classList.remove("slit-in");

  }

  var menuItems = document.getElementsByClassName("menu-item");

  for (var i = 0; i < menuItems.length; i++) {

    menuItems[i].classList.add("pop-menu-left");

  }

  var socialMenuItems = document.getElementsByClassName("menu-item-social");

  for (var i = 0; i < socialMenuItems.length; i++) {

    socialMenuItems[i].classList.add("pop-menu-left-social");

  }

  document.getElementById("social-icons").classList.add("pop-menu-left");

  document.getElementById("vl").classList.add("fade-in");

  if (linkEl === "about") {

    document.getElementById("about-desc").classList.add("fade-in");

  }

  else if (linkEl === "contact") {

    document.getElementById("contact-desc").classList.add("fade-in");

  }

}



// Function: On menu close, revert all of the menu items back to their

// original positions.

function undoMenuPop() {

  var menuItems = document.getElementsByClassName("menu-item");

  for (var i = 0; i < menuItems.length; i++) {

    menuItems[i].classList.remove("pop-menu-left");

  }

  var socialMenuItems = document.getElementsByClassName("menu-item-social");

  for (var i = 0; i < socialMenuItems.length; i++) {

    socialMenuItems[i].classList.remove("pop-menu-left-social");

  }

  document.getElementById("social-icons").classList.remove("pop-menu-left");

  document.getElementById("about-desc").classList.remove("fade-in");

}



// Function: Some text animation to add flare to the project.

function animatedText(target, texts, changeInterval, updateInterval, onTextChanged) {

  var currentText=parseInt(Math.random()*texts.length);

  var areaText=texts[0];

  this.t1=setInterval(function(){

    var c=parseInt(Math.random()*Math.max(texts[currentText].length,

      areaText.length));

    var s=texts[currentText][c];

    if(typeof s == "undefined") {

      s=" ";

    }

    while(areaText.length<c) {

      areaText+=" ";

    }

    var newText=(areaText.slice(0,c)+s+areaText.slice(c+1)).trim();

    var diff=!(newText==areaText);

    areaText=newText;

    if(onTextChanged && diff) {

      onTextChanged();

    }

    target.innerHTML=areaText.length==0?"&nbsp;":areaText;

  }.bind(this),updateInterval?updateInterval:25);

  this.t2=setInterval(function(){

    currentText=parseInt(Math.random()*texts.length);

  }.bind(this),changeInterval?changeInterval:4000); // How long is takes (max) for the string to change.

}

animatedText.prototype={

  constructor:animatedText,

  stop:function(){clearInterval(this.t1);clearInterval(this.t2);}

};



// Every 12 seconds, switch "BER" in "THE BER DESIGNS" with one of the words in the string, chosen randomly.

setTimeout(function(){

  new animatedText(document.getElementById("ber"),

    ["CLEAN", "COOL", "CRAZY", "SLICK", "SUBLIME", "SMOOTH", "CHIC", "CERTIFIABLE", "STUNNING"])

    ;}, 12000);



// All of the Event Listeners for buttons and such on the HTML.

document.getElementById("skip-btn").addEventListener("click", skipSplash, false);



document.getElementById("explore-btn").addEventListener("click", explore, false);



document.getElementById("hamburger").addEventListener("click", openMainMenu, false);

document.getElementById("exit-btn").addEventListener("click", closeMainMenu, false);

document.getElementById("twitter").addEventListener("click", closeMainMenu, false);

document.getElementById("linkedin").addEventListener("click", closeMainMenu, false);

document.getElementById("gmail").addEventListener("click", closeMainMenu, false);



document.getElementById("mobile-logo").addEventListener("click", function(){

  closeMainMenu();

  revertExplore();

}, false);

document.getElementById("logo").addEventListener("click", function(){

  closeMainMenu();

  revertExplore();

}, false);

document.getElementById("logo-white").addEventListener("click", function(){

  closeMainMenu();

  revertExplore();

}, false);



document.getElementById("home").addEventListener("click", function(){

  closeMainMenu();

  revertExplore();

}, false);

document.getElementById("about").addEventListener("click", function(){

  undoMenuPop();

  popMenuLeft("about");

}, false);

document.getElementById("work").addEventListener("click", function(){

  closeMainMenu();

  explore();

}, false);

for(var i = 0; i < document.getElementsByClassName("proj-logo-link").length; i++) {

  document.getElementsByClassName("proj-logo-link")[i].addEventListener("click", function(){

    revertExplore();
  
  }, false);

}



document.getElementById("proj-up").addEventListener("click", function(){

  pushProj(true, false);

}, false);

document.getElementById("proj-down").addEventListener("click", function(){

  pushProj(false, false);

}, false);

$(window).bind('mousewheel', function (event) {
    endTime = new Date();
    var timeDiff = endTime - startTime;
    if (timeDiff > 100) {
        if (event.originalEvent.wheelDelta >= 0) {
            if (isExploring == true) {
                pushProj(true, false);
            }
        }
        else {
            if (isExploring == false) {
                explore();
            } else {
                pushProj(false, false);
            }
        }
        startTime = new Date();
    }
});

var supportTouch = $.support.touch,
    scrollEvent = "touchmove scroll",
    touchStartEvent = supportTouch ? "touchstart" : "mousedown",
    touchStopEvent = supportTouch ? "touchend" : "mouseup",
    touchMoveEvent = supportTouch ? "touchmove" : "mousemove";
$.event.special.swipeupdown = {
    setup: function () {
        var thisObject = this;
        var $this = $(thisObject);
        $this.bind(touchStartEvent, function (event) {
            var data = event.originalEvent.touches ?
                event.originalEvent.touches[0] :
                event,
                start = {
                    time: (new Date).getTime(),
                    coords: [data.pageX, data.pageY],
                    origin: $(event.target)
                },
                stop;

            function moveHandler(event) {
                if (!start) {
                    return;
                }
                var data = event.originalEvent.touches ?
                    event.originalEvent.touches[0] :
                    event;
                stop = {
                    time: (new Date).getTime(),
                    coords: [data.pageX, data.pageY]
                };

                // prevent scrolling
                if (Math.abs(start.coords[1] - stop.coords[1]) > 10) {
                    event.preventDefault();
                }
            }
            $this
                .bind(touchMoveEvent, moveHandler)
                .one(touchStopEvent, function (event) {
                    $this.unbind(touchMoveEvent, moveHandler);
                    if (start && stop) {
                        if (stop.time - start.time < 1000 &&
                            Math.abs(start.coords[1] - stop.coords[1]) > 30 &&
                            Math.abs(start.coords[0] - stop.coords[0]) < 75) {
                            start.origin
                                .trigger("swipeupdown")
                                .trigger(start.coords[1] > stop.coords[1] ? "swipeup" : "swipedown");
                        }
                    }
                    start = stop = undefined;
                });
        });
    }
};
$.each({
    swipedown: "swipeupdown",
    swipeup: "swipeupdown"
}, function (event, sourceEvent) {
    $.event.special[event] = {
        setup: function () {
            $(this).bind(sourceEvent, $.noop);
        }
    };
});

$("#page-container").on('swipedown', function (event) {
    endTime = new Date();
    var timeDiff = endTime - startTime;
    if (timeDiff > 100) {
        if (isExploring == true) {
            pushProj(true, false);
        }
        startTime = new Date();
    }
});

$("#page-container").on('swipeup', function (event) {
    endTime = new Date();
    var timeDiff = endTime - startTime;
    if (timeDiff > 100) {
        if (isExploring == false) {
            explore();
        } else {
            pushProj(false, false);
        }
        startTime = new Date();
    }
});