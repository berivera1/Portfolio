<?php
  include "includes/init.php";

  $id = isset($_GET["id"]) ? mysqli_real_escape_string($connection, $_GET["id"]) : null;

  if (!$id) {
    redirect_to("index.php");
  }
  else {
    $query = 'SELECT * ';
    $query .= 'FROM recipes ';
    $query .= "WHERE id = '$id' ";
    $query .= 'LIMIT 1';

    $result = mysqli_query($connection, $query);

    if (!$result) {
      die('Database query failed.');
    }

    if (check_in_db($id, "id", $connection) == False) {
      redirect_to("index.php");
    }
  }

  while ($recipe = mysqli_fetch_assoc($result)) {

    $cur_recipe_title = $recipe['title'];
    echo "<title>AEAT | $cur_recipe_title</title>";

    include "includes/_header_b.php";
?>
  <div class="recipe-head">
    <img class="card-img recipe-header-img grid-area" src="img/recipe_pics/<?php echo $recipe['recipe_folder']; ?>/beauty_pic.jpg">
    <div class="beginning-desc">
      <h3 id="recipe-first-line" class="title"><?php echo $recipe['title']; ?></h3>
      <h4 id="recipe-second-line">with <?php echo $recipe['side']; ?></h4>
      <p><?php echo $recipe['description']; ?></p>
    </div>
  </div>
  <div id="main-desc" class="main-desc-recipe">
  <div class="ingredients-img-div grid-area">
    <img class="card-img card-img-ings later-recipe-img" src="img/recipe_pics/<?php echo $recipe['recipe_folder']; ?>/ingredients.png">
  </div>
  <div class="ingredients-list-div grid-area">
    <h3 class="title recipe-ing">Ingredients</h3>
    <ul>
      <?php
        $ing_list = $recipe['ingredients'];
        $ing_string_array = explode("\\", $ing_list);
        for ($i = 0; $i < substr_count($ing_list, '\\'); $i++) {
      ?>
        <li><?php echo $ing_string_array[$i]; ?></li>
      <?php } ?>
    </ul>
  </div>
  <?php
    $step_list = $recipe['steps'];
    $step_string_array = explode("\\", $step_list);
    for ($i = 0; $i < substr_count($step_list, '\\'); $i+=2) {
      $cur_step = $i/2+1; //Finding the current step # by taking the substrings with '\' divided by 2, then normalizing by adding 1.
  ?>
  <div class="pic-step-combo-<?php echo $cur_step; ?> grid-area card-step">
    <img class="card-img later-recipe-img recipe-step-img card-img" src="img/recipe_pics/<?php echo $recipe['recipe_folder']; ?>/step_<?php if ($cur_step <= 9 ) { $cur_step_str ='0'; } $cur_step_str .= $cur_step; echo $cur_step_str; ?>.jpg">
    <div class="container-step">
      <h4 class="title recipe-steps"><?php echo $step_string_array[$i]; ?></h4>
      <p><?php echo $step_string_array[$i+1]; ?></p>
    </div>
  </div>
<?php } ?>
</div>
<?php } // Ending the while loop.
mysqli_free_result($result); ?>
<?php include "includes/_footer.php"; ?>
