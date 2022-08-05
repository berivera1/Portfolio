<?php
  include "includes/init.php";

  echo "<title>AEAT | Home</title>";

  include "includes/_header_b.php";

  $query = 'SELECT * ';
  $query .= 'FROM recipes ';

  $result = mysqli_query($connection, $query);

  if (!$result) {
    die('Database query failed.');
  }
?>
<div id="index-welcome">
  <h1 class="title" id="welcome-text">Welcome!</h1>
</div>
<div id="main-desc">
  <p><b>&#198;at</b> <i>(v)</i> :<br>To share a delicious home-cooked meal with friends and family.<br><br>Hello, bonjour, hola, and kon'nichiwa! Here at &#198;at, we believe that food brings people together. We're focused on bringing you healthy, delicious recipes that you can share with your loved ones. So go on...</p>
  <a id="amazing-btn" href="recipe.php?id=<?php echo rand_id_in_db($connection);?>">make something amazing!</a>
  <p>Still don't know where to start? Why not try out one of these curated recipes:</p>
</div>
<div class="card-holder">
<?php
  $arr_size = 4; //  Change this number to change the amount of recipes that show up on the front pg. DO NOT MAKE LARGER THAN ~~ mysqli_num_rows(TABLE) ~~ !
  $rand_id_arr = array();

  for($i = 1; $i <= $arr_size; $i++) {
    array_push($rand_id_arr, rand_id_in_db($connection));
  }

  while(check_same_arr($rand_id_arr) == True) {
    // If there are any values that appear multiple times in the array, check the keys of the numbers that appear multiple times, and reroll.
    $rand_id_arr_pairs = create_pairs_arr($rand_id_arr);
    for($i = 0; $i < count($rand_id_arr_pairs); $i++) {
      $rand_id_arr[array_search($rand_id_arr_pairs[$i], $rand_id_arr)] = rand_id_in_db($connection);
    }
  }

  mysqli_free_result($result);

  for($i = 0; $i < count($rand_id_arr); $i++) {
    $query = 'SELECT * ';
    $query .= 'FROM recipes ';
    $temp_num = $rand_id_arr[$i];
    $query .= "WHERE id = '$temp_num' ";

    $query .= 'LIMIT 1';

    $result = mysqli_query($connection, $query);

    if (!$result) {
      die('Database query failed.');
    }

    while ($recipe = mysqli_fetch_assoc($result)) {
?>
  <div class="card">
    <a href="recipe.php?id=<?php echo $temp_num ?>">
      <img class="card-img" src="img/recipe_pics/<?php echo $recipe['recipe_folder']; ?>/beauty_pic_500.jpg">
      <div class="container">
        <h4 class="title card-text"><?php echo $recipe['title']; ?></h4>
        <p class="card-text">with <?php echo $recipe['side']; ?></p>
      </div>
    </a>
  </div>
<?php
    } // end while loop.
    mysqli_free_result($result);
  }
?>
</div>
<?php include "includes/_footer.php"; ?>
