<?php
  include "includes/init.php";

  $query_result = isset($_GET["search"]) ? $_GET["search"] : null;

  if(isset($_GET["search"])) {
    echo "<title>AEAT | Search - $query_result</title>";
  }
  else {
    echo "<title>AEAT | Search</title>";
  }

  include "includes/_header_search.php";
?>
<?php
  $query_result_orig = $query_result;
  $query_result = mysqli_real_escape_string($connection, $query_result);

  if (!$query_result) {
    $query = 'SELECT * ';
    $query .= 'FROM recipes';
  } else {
    $query = 'SELECT * ';
    $query .= 'FROM recipes ';
    $query .= "WHERE title LIKE '%{$query_result}%' OR side LIKE '%{$query_result}%' OR description LIKE '%{$query_result}%' OR ingredients LIKE '%{$query_result}%' OR steps LIKE '%{$query_result}%' ";
  }

  $result = mysqli_query($connection, $query);

  if (!$result) {
    die('Database query failed.');
  }
  elseif (mysqli_num_rows($result) == 0) {
    echo "<div id=\"main-desc\" class=\"main-desc-search\">
            <div id=\"spacing-div-search-no-results\">
              <h2 class=\"title\">Sorry, but we couldn't find anything matching $query_result_orig!</h2>
              <p>Try checking your spelling. You can also try words with a similar meaning, like \"tart\" instead of \"pie\".
            </div>
          </div";
  }
  else {
  echo '<div class="results-holder">';
  $num_rows = mysqli_num_rows($result);
  if( mysqli_num_rows($result) != db_size($connection)) { ?>
    <h2 class="title" id="results-num"><?php echo "$num_rows results found for $query_result_orig!"; ?></h2>
  <?php } ?>
  <div class="card-holder card-holder-search">
  <?php while ($recipe = mysqli_fetch_assoc($result)) { ?>
    <div class="card" id="recipe-<?php echo $recipe['id'] ?>">
      <a href="recipe.php?id=<?php echo $recipe['id'] ?>">
        <img class="card-img" src="img/recipe_pics/<?php echo $recipe['recipe_folder']?>/beauty_pic_500.jpg">
        <div class="container">
          <h4 class="title card-text"><?php echo $recipe['title']; ?></h4>
          <p class="card-text">with <?php echo $recipe['side']; ?></p>
        </div>
      </a>
    </div>
  <?php
      } // End while loop.
      echo "</div>";
    }
    mysqli_free_result($result);
?>

  </div>
<script src ="js/search_init.js"></script>
<?php include "includes/_footer.php"; ?>
