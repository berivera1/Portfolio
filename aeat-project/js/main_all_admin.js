var tabletMode = window.matchMedia("(min-width: 768px) and (max-width: 1279px)");

document.getElementById("main-pg").style.minHeight = (window.innerHeight - document.getElementById("navbar-header").getBoundingClientRect().height - document.getElementById("navbar-header").getBoundingClientRect().height) + "px";

function showHideRemoveBtn() {
  if(document.getElementsByClassName("admin-card").length > 1) {
    document.getElementById("remove-btn").classList.remove("hidden");
  }
  else {
    document.getElementById("remove-btn").classList.add("hidden");
  }
}

function getSteps() {
  if (document.getElementsByClassName("admin-card").length < 9) {
     return "0" + getStepsPlusOne();
   }
   return getStepsPlusOne();
}

function getStepsPlusOne() {
  return document.getElementsByClassName("admin-card").length + 1;
}



document.getElementById("remove-btn").addEventListener("click", function() {
    if (document.getElementsByClassName("admin-card").length > 1) {
      var stepsHolder = document.getElementById("steps-holder");
      stepsHolder.removeChild(document.getElementsByClassName("admin-card")[document.getElementsByClassName("admin-card").length - 1]);
    }
    showHideRemoveBtn();
  }, false);

showHideRemoveBtn();
