window.onload = function () {
  setTimeout(function(){
    document.getElementById("searchbar-div").style.top = 48 + getOffset() + "px"; // Set the top of the Filters dropdown to the bottom of the Searchbar div (the element that goes above it).
    document.getElementById("main-pg").style.transform = "translateY(" + document.getElementById("searchbar-div").offsetHeight + "px)"; // Transform the search results as the filters tab gets pushed downwards.
    if (resizePgOnSearch == true) {
      document.getElementById("main-pg").style.height = document.getElementById("main-pg").offsetHeight + document.getElementById("searchbar-div").offsetHeight + "px"; // Adjust the height of the results holder accordingly to push the footer downwards.
    }
    setTimeout(function(){ document.getElementById("searchbar-div").style.zIndex = 50; }, 300);
    searchOut = true;

    document.getElementById("filters-options").style.top = 93 + getOffset() + "px"; // Set the top of the Filters dropdown to the bottom of the Searchbar div (the element that goes above it).
    var filtOffset = document.getElementById("filters-options").offsetHeight + document.getElementById("searchbar-div").offsetHeight;
    document.getElementById("main-pg").style.transform = "translateY(" + filtOffset + "px)"; // Transform the search results as the filters tab gets pushed downwards.
    if (resizePgOnFilters == true){
      document.getElementById("main-pg").style.height = document.getElementById("main-pg").offsetHeight + document.getElementById("filters-options").offsetHeight + "px"; // Adjust the height of the results holder accordingly to push the footer downwards.
    }
    setTimeout(function(){ document.getElementById("filters-options").style.zIndex = 0; }, 300);
    filtOut = true;
  }, 300);
}
