</head>
<body>
  <div class="wrapper">
    <div id="navbar-header">
      <div class="navbar-div" id="logo-div">
        <a id="logo-btn" href="index.php">
          <object id="logo-obj" data="img/logo.svg" type="image/svg+xml">
            <img src="img/logo.png" alt="Aeat Logo">
          </object>
        </a>
      </div>
      <a class="navbar-txt-item" href="index.php">Home</a>
      <a class="navbar-txt-item" href="search.php">Browse</a>
      <a class="navbar-txt-item" href="recipe.php?id=<?php echo mt_rand(1, 40);?>">A Recipe</a>
      <a class="navbar-txt-item" href="help.php">Help</a>
      <div class="navbar-div mobile-right-divs" id="search-div">
        <a id="search-btn" href="#">
          <object id="search-obj" data="img/search.svg" type="image/svg+xml">
            <img src="img/search.png" alt="Search">
          </object>
        </a>
      </div>
      <div class="navbar-div mobile-right-divs" id="dd-menu-div">
        <object id="dd-menu-obj" data="img/hamburger.svg" type="image/svg+xml">
          <img src="img/hamburger.png" alt="Hamburger">
        </object>
      </div>
    </div>
    <div id="dd-menu-pullout-menu">
      <a class="menu-item" id="home-btn-pullout-menu" href="index.php">Home</a>
      <a class="menu-item" id="x-mark-pullout-menu" href="#">&#10005;</a>
      <a class="menu-item" href="search.php">Browse</a>
      <a class="menu-item" href="recipe.php?id=<?php echo mt_rand(1, 40);?>">Random Recipe</a>
      <a class="menu-item" href="help.php">Help</a>
    </div>
    <div id="searchbar-div">
      <img id="filter-icon" class="hidden" src="img/filter.png"></img>
      <form id="search-form" action="search.php">
        <input type="text" name="search">
        <input type="submit" value="Submit">
      </form>
    </div>
    <div id="filters-options" class="hidden">
      <h4>Dietary Restrictions</h4>
      <form class="filter-form" action="">
        <input id="veg-check" type="checkbox" name="filtersList" value="vegan" onclick="selectOnlyThis(this)"><label for="veg-check">Vegan</label>
        <input id="vegt-check" type="checkbox" name="filtersList" value="vegetarian" onclick="selectOnlyThis(this)"><label for="vegt-check">Vegetarian</label>
        <input id="pesc-check" type="checkbox" name="filtersList" value="pescatarian" onclick="selectOnlyThis(this)"><label for="pesc-check">Pescatarian</label>
        <input id="df-check" type="checkbox" name="filtersList" value="dairy-free" onclick="selectOnlyThis(this)"><label for="df-check">Dairy-Free</label>
        <input id="gf-check" type="checkbox" name="filtersList" value="gluten-free" onclick="selectOnlyThis(this)"><label for="gf-check">Gluten-Free</label>
      </form>
    </div>
    <div id="main-pg">
