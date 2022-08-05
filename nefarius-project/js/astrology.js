//Initialize Global Varriables
var userMonth = 0;
var userDay = 0;
var userSign = "nan";
var counter = 0; // Global counter, used for just counting from 0 to 12 when initializing the zodiac sign buttons.
var rotate = 0; // The rotation degree, used for rotating the zodiac carousel later on.

//Function: Rotate Elements in the Array by {pleaces} Places
function shiftArrayToRight(arr, places) {
    for (var i = 0; i < places; i++) {
        arr.unshift(arr.pop());
    }
}

/*
   EVERYTHING AFTER THIS POINT
   RELATES TO INITIALIZING THE
   STAR SIGN OBJECTS.
*/

//Function: Take month & day params to return the user's astrological sign.
function getSign(month, day) {
  var sign = "nan";
  if (((month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) && day > 31) ||
  ((month == 4 || month == 6 || month == 9 || month == 11) && day > 30) || (month == 2 && day > 29) || (day < 1)) {
    sign="oph"; // If the user entered a day that doesn't exist, *easteregg* return Ophiuchus.
  }
  else if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) {
    sign = "cap";
  }
  else if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) {
    sign = "sag";
  }
  else if ((month == 10 && day >= 24) || (month == 11 && day <= 21)) {
    sign = "sco";
  }
  else if ((month == 9 && day >= 23) || (month == 10 && day <= 23)) {
    sign = "lib";
  }
  else if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) {
    sign = "vir";
  }
  else if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) {
    sign = "leo";
  }
  else if ((month == 6 && day >= 22) || (month == 7 && day <= 22)) {
    sign = "can";
  }
  else if ((month == 5 && day >= 21) || (month == 6 && day <= 21)) {
    sign = "gem";
  }
  else if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) {
    sign = "tau";
  }
  else if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) {
    sign = "ari";
  }
  else if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) {
    sign = "pis";
  }
  else if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) {
    sign = "aqu";
  }
  else {
    sign = "oph";
  }
  return sign;
}

//Function: Create sign Object for each astrological sign.
function sign(starsign, name, sound, image, description, isSelected, dates) {
  this.starsign = starsign;
  this.name = name;
  this.sound = `sounds/${sound}.wav`;
  this.image = `img/icons/${image}.png`;
  this.description = description;
  this.isSelected = false;
  this.dates = dates;
  var audio = new Audio(this.sound);
  //Interior function to play the sign's sound file when called.
  this.playSound = function() {
    audio.play();
  };

  //Interior function to stop the sign's sound file when called. Prevents multiple sounds from overlapping.
  this.stopSound = function() {
    audio.load();
    audio.pause();
  };
}

//Function: Create tangible button for {sign} Sign on HTML page.
function makeSignBtn(sign) {
  const btn = document.createElement("a");
  btn.style.gridArea = `btn-${counter}`;
  btn.id = `btn-${counter}`;
  btn.classList.add("sign-btn");

  const img = document.createElement("img");
  img.src = sign.image;

  if (sign.isSelected == true) {
    img.classList.add("is-selected");
  }
  else {
    img.classList.add("sign");
  }
  img.id = `btn-${sign.starsign}`;

  btn.append(img);

  return btn;
}

//Creating all 12 astrological signs as objects (so they're easily editable).
const cap = new sign(
  "Capricorn",
  "H.H. Holmes",
  "holmes",
  "holmes",
  "As a Capricorn, you tend to be smart, hardworking, and will always get whatever you set your mind to. Whether that is conning people out of thousands of dollars, or murdering 27 people in a \"Murder Hotel\", you always put your best foot forward and accomplish your goals! You can think outside of the box, but you prefer to have strict boundaries to constrain against, just like the strict boundaries of a building designed to trap victims for days before their inevitable death.",
  false,
  "Dec 22 - Jan 19"
);
const sag = new sign(
  "Sagittarius",
  "John Gotti",
  "gotti",
  "gotti",
  "As a Sagittarius, you are generous and idealistic, and have a great sense of humor, joking even in front of your enemies. At times, however, you can be very impacient. Though that may lead to you swearing out a detecive every now and then, you don't let that bring you down! You always land on your feet, even if that may involve a certain person or two \"going away for a while\". You may sometimes fear that someone has it out for you, but you don't obsess over those off-the-wall theories.",
  false,
  "Nov 22 - Dec 21"
);
const sco = new sign(
  "Scorpio",
  "Dragan Mikic",
  "mikic",
  "mikic",
  "As a Scorpio, you try to be as brave as you can, and a true friend to those around you. You love going on long journeys with your best friends; robberies, art burglaries, and the like are always a great adventure! You sometimes feel trailed, as if you are being chased down by Interpol, and may find it hard to trust those around you, but you don't let that get in the way of your passion. Though some may call you stubborn, and you may leave a fingerprint behind every couple of robberies, you don't care because you love what you do.",
  false,
  "Oct 23 - Nov 21"
);
const lib = new sign(
  "Libra",
  "Jim Jones",
  "jones",
  "jones",
  "As a Libra, you are cooperative and social. You hold all of your friends so close that sometimes your friend group can look a bit like a cult. You try to avoid confrontation as much as you can, and some might say you'd even go as far as Guyana to avoid one person. You love to share everything with your friends, from your books and movies to your leftover Flavor Aid. You are a leader to someone, whether it's a club, a friend group, or a Peoples Temple, but you try to not let that get to your head.",
  false,
  "Sep 23 - Oct 22"
);
const vir = new sign(
  "Virgo",
  "Belle Gunness",
  "gunness",
  "gunness",
  "As a Virgo, you try your hardest to be analytical, hardworking, and practical in every situation. Some would call you a clean freak, probably because you make sure to never leave any evidence behind. You are all work and no play. You are always thinking about how to dispose of the body, never taking time off to relax by yourself. You always have an escape plan for every situation, which can end up with you burning down a farm, or even faking your own death. ",
  false,
  "Aug 23 - Sep 22"
);
const leo = new sign(
  "Leo",
  "Peter Salerno",
  "salerno",
  "salerno",
  "As a Leo, you are creative, passionate, and generous, but you can be arrognant and stubborn at times. You enjoy the luxuries of life, such as high-end jewelery and diamonds, which you are careful about stealing. Your generosity even follows you to work, where you make sure to only steal from the rich, and never from the poor. You're passionate about what you do, and with your friends, you breathe life into your work. Your creative approach to your passion, whether it is only stealing from families while they're eating dinner, or whatever else is your passion, is astounding, and other can learn from you.",
  false,
  "Jul 23 - Aug 22"
);
const can = new sign(
  "Cancer",
  "Billy the Kid",
  "kid",
  "kid",
  "As a Cancer, you are tenacious, imaginative, and loyal to those around you. Though you may not be a leader in every situation, even when you're just a member in a group like the Regulators, you're always loyal to the group as a whole. You are the focus of many tales and legends, but you don't let that get to you. You have a tendency to be overly-suspicious of new people, but that's just because you're always on the run from the sheriff. You may not live to see what old age is like, but the life that you do live will surely make up for it.",
  false,
  "Jun 21 - Jul 22"
);
const gem = new sign(
  "Gemini",
  "Bonnie & Clyde",
  "bac",
  "bac",
  "As a Gemini, you are affectionate, curious, and adapt well to new situations. You have a partner in crime that you do everything with, and you're never found without them. You enjoy short trips around town, going around to small stores and gas stations with your gang and your guns. Some might call you a \"public enemy\", butyou just see yourself as an adventurer. You put on a serious face in front of others, but those who are close to you know that deep down you're joyous and carefree.",
  false,
  "May 21 - Jun 20"
);
const tau = new sign(
  "Taurus",
  "Alice Diamond",
  "diamond",
  "diamond",
  "As a Taurus, you are patient, practical, and a reliable friend. Your knack for planning and strategizing will lead you to a position of power. You are a natural-born leader, and you rule with an iron fist. Though you may be serious at work, you're known to party and let loose when you have the chance. You enjoy luxorious clothes, preferring to steal shag and fur coats over anything else. You're a fighter, and you can always get back up when knocked down. Whether it's with your words or with your fist, you pack a punch that others would be jealous of.",
  false,
  "Apr 20 - May 20"
);
const ari = new sign(
  "Aries",
  "Al Capone",
  "capone",
  "capone",
  "As an Aries, you are confident, optimistic, and honest. There are times, though , when you can be a bit too impulsive for your own good. You are loved by those around you, and people always want you to tag along with them to events. Some people may see you as a nuisance, whether it is because you're stealing their bootlegging business or whatever else, but you don't let that bother you. You're a charitable person, and some would even go as far as to call you a \"Modern Day Robin Hood\".",
  false,
  "Mar 21 - Apr 19"
);
const pis = new sign(
  "Pisces",
  "Charles Manson",
  "manson",
  "manson",
  "As a Pisces, you are intuitive and musical. You love making and listening to music, especially bands like The Beatles. You love your friends to the point where you'd even start a commune with them. You sometimes look for hidden meanings where there are none, and you can be a conspiracy theorist at times. Your main pitfall is that you like to make a martyr out of the smallest things. All these things make you a great storyteller, though, and you can get people to believe any story with your way with words.",
  false,
  "Feb 19 - Mar 20"
);
const aqu = new sign(
  "Aquarius",
  "Jack the Ripper",
  "jack",
  "jack",
  "As an Aquarius, you are progressive and independent. You commit all of your crimes on your own, and don't like to rely on others to help you out. You can be tempermental and uncompormising, though, which can lead to a murder every now and then. You don't let that get you down, though, because you're a pragmatist, so these are just opportunities to practice your surgical skills. Whereas other people run from your knife, you run from emotional expression. Others see you as a good listener, though, and love to keep your company.",
  false,
  "Jan 20 - Feb 18"
);
const oph = new sign(
  "Ophiuchus",
  "The Zodiac Killer",
  "zodiac",
  "zodiac",
  "Mysterious, haunting, and always lurking in the shadows, some wonder whether you even exist. You love the mystery of puzzles, cryptograms, and ciphers, even going as far as to make some of your own. You are intrigued by astrological symbolism, so much so that some would call it an obsession. You are a point for intrigue, fear, and speculation in others. You prefer to work alone, and taunt those that try to catch up to you. Everybody knows your name, but you sometimes feel as if nobody knows who you even are.",
  false,
  "NaN - NaN"
);
const nan = new sign(
  "",
  "",
  "",
  "",
  "",
  false,
  ""
);

//Array to hold all of the signs.
var signs = [aqu, pis, ari, tau, gem, can, leo, vir, lib, sco, sag, cap];

/*
   EVERYTHING AFTER THIS POINT
   RELATES TO BINDING THE STAR
   SIGNS TO THE HTML PG.
*/

//Function: What to do on "SUBMIT" event.
function submit(dob) {
  //Bring the signs array back to its initial state, just in case something causes it to shift prematurely.
  signs = [aqu, pis, ari, tau, gem, can, leo, vir, lib, sco, sag, cap];

  //Hide all the starting content from the page.
  $(".starting-content").addClass("fade-out");
  $(".on-click-content").addClass("fade-in-short-delay");
  $(".title").addClass("move-up");

  //Evaluates true if the "SUBMIT" button was clicked in the title pg, rather than the "EXPLORE" button.
  if(dob == 1) {
    //Show all the secondary content.
    document.getElementById("grd-zodiac-wheel").style.transform = "translate(-110%, -44%)";
    document.getElementById("grd-zodiac-wheel").classList.add("push-left");
    $(".followup-content").addClass("fade-in-short-delay");

    userMonth = parseInt($("#month-list").val());
    userDay = parseInt($("#day-select").val());
    userSign = getSign(userMonth, userDay);

    //*easteregg*, replaces sign[0] (always Aquarius) with Ophiuchus on wheel until page is reloaded if the user entered an invalid date.
    if (eval(userSign) == oph) {
      signs[0] = oph;
      document.getElementsByClassName("sign-title")[0].classList.add("glitch-holder"); //This does nothing right now. It was gonna have a glitchy effect but I removed that. Might re-add later.
    }

    userSign = eval(userSign);

    //Shift the array so that userSign is the astrological sign @ signs[0].
    shiftArrayToRight(signs, 12-signs.indexOf(userSign));

    signs[0].isSelected = true;
    setTimeout(function(){ signs[0].playSound(); }, 2000);
  }
  //Evaluates true if the "EXPLORE" button was clicked in the title pg, rather than the "SUBMIT" button.
  else {
    userMonth = 1;
    userDay = 1;
    userSign = nan;
  }

  var ch = $('#grd-zodiac-wheel').height();
  $('#grd-zodiac-wheel').css({'width': ch + 'px'});

  //Initializing Event Listeners for each of the signs.
  signs.forEach(function(sign) {
    const signBtn = makeSignBtn(sign);
    signBtn.addEventListener("click", function() {
        $(".followup-content").addClass("fade-in-no-delay");
        document.getElementById("grd-zodiac-wheel").classList.add("push-left");
        sign.isSelected = true;
        document.getElementById(`btn-${sign.starsign}`).classList.add("is-selected");
        document.getElementById(`btn-${sign.starsign}`).classList.remove("sign");
        document.getElementById("sign-name").innerHTML = sign.starsign.toUpperCase();
        document.getElementById("sign-dates").innerHTML = sign.dates.toUpperCase();
        document.getElementById("sign-desc").innerHTML = sign.description;
        document.getElementById("criminal-name").innerHTML = sign.name.toUpperCase();
        sign.playSound();
        signs.forEach(function(tempSign) {
          //If the current sign is not the sign clicked on by the user, this evaluates True.
          if (tempSign != sign) {
            tempSign.isSelected = false;
            tempSign.stopSound();
            document.getElementById(`btn-${tempSign.starsign}`).classList.add("sign");
            document.getElementById(`btn-${tempSign.starsign}`).classList.remove("is-selected");
          }
        });
        //Gets the previous sign clicked on by the user.
        var lastSel = signs[0];
        //Shifts the array rightward to change signs[0] to the current sign clicked on by the user.
        shiftArrayToRight(signs, 12-signs.indexOf(sign));
        //Using the difference between the previous sign and current sign the user selected, rotate the carousel.
        if (signs.indexOf(lastSel) <= 6) {
          rotate = rotate + (30 * signs.indexOf(lastSel));
        }
        else {
          rotate = rotate + (-30 * (12 - signs.indexOf(lastSel)));
        }
        //Since the entire grid rotates, rotate the information in the opposite direction so it doesn't move.
        document.getElementsByClassName("sign-title")[0].style.transform = `rotate(${-rotate}deg)`;
        document.getElementById("grd-zodiac-wheel").style.transform = `translate(-110%, -44%) rotate(${rotate}deg)`;
        signs.forEach(function(curSign) {
          document.getElementById(`btn-${curSign.starsign}`).style.transform = `rotate(${-rotate}deg)`;
          document.getElementById(`btn-${curSign.starsign}`).style.transition = "0.75s ease";
        });
        document.getElementById(`btn-${sign.starsign}`).style.transform += "scale(1.3)";
      }, false);
    //Base global counter, starts at 0, ends at 11, and used to get the right element in signs array.
    counter+=1;
    document.getElementById("grd-zodiac-wheel").append(signBtn);
  });

  //Evaluates true if the "SUBMIT" button was clicked in the title pg, rather than the "EXPLORE" button.
  //Programatically, needs to run after the event listeners are configured to make sure the page displays correctly.
  if (dob == 1) {
    document.getElementById("grd-zodiac-wheel").classList.add("push-left");
    document.getElementById(`btn-${signs[0].starsign}`).style.transform += "scale(1.3)";
    document.getElementById(`btn-${signs[0].starsign}`).classList.add("is-selected");
    document.getElementById(`btn-${signs[0].starsign}`).classList.remove("sign");
    document.getElementById("sign-name").innerHTML = signs[0].starsign.toUpperCase();
    document.getElementById("sign-dates").innerHTML = signs[0].dates.toUpperCase();
    document.getElementById("sign-desc").innerHTML = signs[0].description;
    document.getElementById("criminal-name").innerHTML = signs[0].name.toUpperCase();
  }
}

//Seperate function for if the user clicks the "SUBMIT" button that appears after the initial page.
//Could possibly be amalgamated into the submit() function? Functions different enough, though, for me to just use this solution.
function resubmit() {
  var lastSel = signs[0];

  userMonth = parseInt($("#month-restart-list").val());
  userDay = parseInt($("#day-restart-select").val());
  userSign = getSign(userMonth, userDay);

  if (eval(userSign) == oph) {
    userSign = signs[0];
    alert("Uh oh, the date you entered doesn't exist!");
  }
  else {
    userSign = eval(userSign);
    shiftArrayToRight(signs, 12-signs.indexOf(userSign));

    signs[0].isSelected = true;

    document.getElementById(`btn-${signs[0].starsign}`).classList.add("is-selected");
    document.getElementById(`btn-${signs[0].starsign}`).classList.remove("sign");
    document.getElementById("sign-name").innerHTML = signs[0].starsign.toUpperCase();
    document.getElementById("sign-dates").innerHTML = signs[0].dates.toUpperCase();
    document.getElementById("sign-desc").innerHTML = signs[0].description;
    document.getElementById("criminal-name").innerHTML = signs[0].name.toUpperCase();
    signs[0].playSound();
    signs.forEach(function(tempSign) {
      if (tempSign != signs[0]) {
        tempSign.isSelected = false;
        tempSign.stopSound();
        document.getElementById(`btn-${tempSign.starsign}`).classList.add("sign");
        document.getElementById(`btn-${tempSign.starsign}`).classList.remove("is-selected");
      }
    });

    if (signs.indexOf(lastSel) <= 6) {
      rotate = rotate + (30 * signs.indexOf(lastSel));
    }
    else {
      rotate = rotate + (-30 * (12 - signs.indexOf(lastSel)));
    }
    document.getElementsByClassName("sign-title")[0].style.transform = `rotate(${-rotate}deg)`;
    document.getElementById("grd-zodiac-wheel").style.transform = `translate(-110%, -44%) rotate(${rotate}deg)`;
    signs.forEach(function(curSign) {
      document.getElementById(`btn-${curSign.starsign}`).style.transform = `rotate(${-rotate}deg)`;
      document.getElementById(`btn-${curSign.starsign}`).style.transition = "0.75s ease";
    });
    document.getElementById(`btn-${signs[0].starsign}`).style.transform += "scale(1.3)";
    console.log(signs[0]);
  }
}

//Function: Skip the splash screen animations, and just jump to the starting screen.
function skipSplash() {
  document.getElementById("skip-btn").classList.remove("fade-out-with-delay");
  document.getElementById("skip-btn").classList.add("fade-out");
  var fadeIns  = document.getElementsByClassName("fade-in");
  for (var i = 0; i < fadeIns.length; i++) {
    fadeIns[i].classList.add("fade-in-crazy-short-delay");
  }
  document.getElementById("nefa-title").classList.remove("text-flicker-and-push");
  document.getElementById("nefa-title").classList.add("text-push");
  document.getElementById("background-gradient").classList.remove("background-animation");
  document.getElementById("background-gradient").classList.add("background-skip-animation");
}

//Testing for animated text function so that description changes on click between signs with a bit of flare.
//Probably not gonna be implemented?
// function animatedText(target, texts, changeInterval, updateInterval, onTextChanged) {
//   var currentText=parseInt(Math.random()*texts.length);
//   var areaText=texts[0];
//   this.t1=setInterval(function(){
//     var c=parseInt(Math.random()*Math.max(texts[currentText].length,
//       areaText.length));
//     var s=texts[currentText][c];
//     if(typeof s == "undefined") {
//       s=" ";
//     }
//     while(areaText.length<c) {
//       areaText+=" ";
//     }
//     var newText=(areaText.slice(0,c)+s+areaText.slice(c+1)).trim();
//     var diff=!(newText==areaText);
//     areaText=newText;
//     if(onTextChanged && diff) {
//       onTextChanged();
//     }
//     target.innerHTML=areaText.length==0?"&nbsp;":areaText;
//   }.bind(this),updateInterval?updateInterval:50);
//   this.t2=setInterval(function(){
//     currentText=parseInt(Math.random()*texts.length);
//   }.bind(this),changeInterval?changeInterval:1);
// }
// animatedText.prototype={
//   constructor:animatedText,
//   stop:function(){clearInterval(this.t1);clearInterval(this.t2);}
// };
//
// new animatedText(document.getElementById("ber"), []);
// new animatedText(document.getElementById("ber"), []);
// new animatedText(document.getElementById("ber"), []);
// new animatedText(document.getElementById("ber"), []);

//Event Listeners for Pre-existing HTML Elements
document.getElementById("submit-btn").addEventListener("click", function() {
    submit(1); //The 1 as the param coorelates to if the "SUBMIT" button pressed on the first pg.
    document.getElementsByClassName("on-click-content")[0].style.display = "";
  }, false);
document.getElementById("explore-btn").addEventListener("click", function() {
    submit(0);//The 0 as the param coorelates to if the "EXPLORE" button pressed on the first pg.
    document.getElementsByClassName("on-click-content")[0].style.display = "";
  }, false);
document.getElementById("resubmit-btn").addEventListener("click", resubmit, false);

document.getElementById("skip-btn").addEventListener("click", skipSplash, false);
