<?php
  include "includes/init.php";

  echo "<title>AEAT | Admin Panel</title>";

  include "includes/_header_admin.php";

  $id = isset($_GET["id"]) ? mysqli_real_escape_string($connection, $_GET["id"]) : null;

  if (isset($_POST['delete'])) {
    if (!$id) {
      redirect_to("admin.php");
    } else {
      $query = 'SELECT * ';
      $query .= 'FROM recipes ';
      $query .= "WHERE id = '$id' ";
      $query .= 'LIMIT 1';

      $result = mysqli_query($connection, $query);

      if (!$result) {
        die('Database query failed.');
      }

      if (check_in_db($id, "id", $connection) == False) {
        redirect_to("admin.php");
      }
    }
  }

  //Delete a recipe from the database, its image files, and its directory
  if (isset($_POST['delete'])) {
    while ($recipe = mysqli_fetch_assoc($result)) {
      $target_dir = "img/recipe_pics/" . $recipe['recipe_folder'] . "/";
      if ($handle = opendir($target_dir)) {
        while (false !== ($file = readdir($handle))) {
          if ('.' === $file) continue;
          if ('..' === $file) continue;
            unlink($target_dir . $file) or die("Couldn't delete file");
        }
        closedir($handle);
      }
      rmdir($target_dir);

      $query = 'DELETE ';
      $query .= 'FROM recipes ';
      $query .= "WHERE id = '$id' ";
      $query .= 'LIMIT 1';

      if (mysqli_query($connection, $query)) {
          echo '<div class="alert alert-success" role="alert">Record deleted successfully!</div>';
      } else {
          echo '<div class="alert alert-danger" role="alert">Error deleting record :' . mysqli_error($connection) . '</div>';
      }
    }

  } elseif (isset($_POST['submit'])) {
    $recipe_title = mysqli_real_escape_string($connection, $_POST['recipeTitle']);
    $recipe_side = mysqli_real_escape_string($connection, $_POST['recipeSide']);
    $recipe_description = mysqli_real_escape_string($connection, $_POST['recipeDescription']);
    $recipe_ingredients = mysqli_real_escape_string($connection, str_replace("\n", "\\", $_POST['recipeIngredients'])) . "\\\\";
    $recipe_steps = "";
    $recipe_step_names = array();
    $recipe_step_descs = array();
    foreach($_POST['recipeStepNames'] AS $val) {
        array_push($recipe_step_names, mysqli_real_escape_string($connection, $val));
    }
    foreach($_POST['recipeStepDescs'] AS $val) {
        array_push($recipe_step_descs, mysqli_real_escape_string($connection, $val));
    }
    for($i = 1; $i <= count($recipe_step_names); $i++) {
      $recipe_steps .= $i . " ";
      $recipe_steps .= $recipe_step_names[$i - 1];
      $recipe_steps .= ":\\\\";
      $recipe_steps .= $recipe_step_descs[$i - 1];
      $recipe_steps .= "\\\\";
    }
    $recipe_filters = array();
    foreach($_POST['filtersArray'] AS $val) {
        array_push($recipe_filters, mysqli_real_escape_string($connection, $val));
    }
    $recipe_filters_str = "";
    for($i = 0; $i < count($recipe_filters); $i++) {
      $recipe_filters_str .= $recipe_filters[$i];
    }

    // Validation
    $errors = array();
    $required_fields = array(
      'recipeTitle',
      'recipeSide',
      'recipeDescription',
      'recipeIngredients',
    );
    foreach ($required_fields as $field) {
      $value = trim($_POST[$field]);
      if (!isset($value) || $value == '') {
        $errors[$field] = $field . ' can\'t be blank';
      }
    }

    if (!empty($errors)) {
      redirect_to("admin.php");
    }

    $query = "UPDATE recipes ";
    $query .= "SET title = '{$recipe_title}', side = '{$recipe_side}', description = '{$recipe_description}', ingredients = '{$recipe_ingredients}', steps = '{$recipe_steps}', filters = '{$recipe_filters_str}'";
    $query .= "WHERE id = '$id' ";
    $query .= 'LIMIT 1';

    error_log($query);

    $result = mysqli_query($connection, $query);

    if ($result) {
      $message = '<div class="alert alert-success" role="alert">Page updated!</div>';
    } else {
      $message = '<div class="alert alert-danger" role="alert">Page update failed.</div>' . $query;
    }

    $query = 'SELECT * ';
    $query .= 'FROM recipes ';
    $query .= "WHERE id = '$id' ";
    $query .= 'LIMIT 1';

    $result = mysqli_query($connection, $query);

    if (!$result) {
      die('Database query failed.');
    }

    if (check_in_db($id, "id", $connection) == False) {
      redirect_to("admin.php");
    }

    while ($recipe = mysqli_fetch_assoc($result)) {
      $recipe_hero_path = $recipe['recipe_folder'];

      $target_dir = "img/recipe_pics/" . $recipe_hero_path;

      isset($_GET["id"]) ? mysqli_real_escape_string($connection, $_GET["id"]) : null;

      if(isset($_FILES['recipeHero']) && !empty($_FILES["recipeHero"]["name"])) {
        unlink($target_dir . "/beauty_pic_500.jpg");
        $maxDim = 500;
        $file_name = $_FILES['recipeHero']['tmp_name'];
        list($width, $height, $type, $attr) = getimagesize( $file_name );
        if ( $width > $maxDim || $height > $maxDim ) {
            $target_filename = $file_name;
            $ratio = $width/$height;
            if( $ratio > 1) {
                $new_width = $maxDim;
                $new_height = $maxDim/$ratio;
            } else {
                $new_width = $maxDim*$ratio;
                $new_height = $maxDim;
            }
            $src = imagecreatefromstring( file_get_contents( $file_name ) );
            $dst = imagecreatetruecolor( $new_width, $new_height );
            imagecopyresampled( $dst, $src, 0, 0, 0, 0, $new_width, $new_height, $width, $height );
            imagedestroy( $src );
            imagejpeg( $dst, $target_dir . "/beauty_pic_500.jpg"); // adjust format as needed
            imagedestroy( $dst );
        }
      }

      if(isset($_FILES['recipeHero']) && !empty($_FILES["recipeHero"]["name"])) {
        unlink($target_dir . "/beauty_pic.jpg");
        $target_file = $target_dir . basename($_FILES["recipeHero"]["name"]);
        $uploadOk = 1;
        $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

        $check = getimagesize($_FILES["recipeHero"]["tmp_name"]);
        if($check !== false) {
            $uploadOk = 1;
        } else {
            $error_msg = "File is not an image.";
            $uploadOk = 0;
        }

        if ($_FILES["recipeHero"]["size"] > 2000000) {
          $error_msg = "Sorry, your file is too large.";
          $uploadOk = 0;
        }

        if($imageFileType != "jpg") {
          $error_msg = "Sorry, for the hero image, only JPG files are allowed.";
          $uploadOk = 0;
        }
        if ($uploadOk == 0) {
          $error_msg = "Sorry, your file was not uploaded.";
          die($error_msg);
          // if everything is ok, try to upload file
        } else {
          if (move_uploaded_file($_FILES["recipeHero"]["tmp_name"], $target_dir . "/beauty_pic.jpg")) {
          } else {
            $error_msg = "Sorry, there was an error uploading your file.";
            die($error_msg);
          }
        }
      }

      if(isset($_FILES['recipeIngredients']) && !empty($_FILES["recipeIngredients"]["name"])) {
        unlink($target_dir . "/ingredients.png");
        $target_file = $target_dir . basename($_FILES["recipeIngredients"]["name"]);
        $uploadOk = 1;
        $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

        $check = getimagesize($_FILES["recipeIngredients"]["tmp_name"]);
        if($check !== false) {
            $uploadOk = 1;
        } else {
            $error_msg = "File is not an image.";
            $uploadOk = 0;
        }

        if ($_FILES["recipeIngredients"]["size"] > 500000) {
          $error_msg = "Sorry, your file is too large.";
          $uploadOk = 0;
        }

        if($imageFileType != "png") {
          $error_msg = "Sorry, for the ingredients image, only PNG files are allowed.";
          $uploadOk = 0;
        }
        if ($uploadOk == 0) {
          $error_msg = "Sorry, your file was not uploaded.";
          die($error_msg);
          // if everything is ok, try to upload file
        } else {
          if (move_uploaded_file($_FILES["recipeIngredients"]["tmp_name"], $target_dir . "/ingredients.png")) {
          } else {
            $error_msg = "Sorry, there was an error uploading your file.";
            die($error_msg);
          }
        }
      }
      $i = 1;
      foreach($_POST['recipeStepNames'] AS $val) {
        if(isset($_FILES['recipeStepImg' . make_dd($i)]) && !empty($_FILES['recipeStepImg' . make_dd($i)]["name"])) {
          $i_adj = make_dd($i);
          if(file_exists($target_dir . "/step_" . $i_adj . ".jpg")) {
            unlink($target_dir . "/step_" . $i_adj . ".jpg");
          }
          $target_file = $target_dir . basename($_FILES['recipeStepImg' . make_dd($i)]["name"]);
          $uploadOk = 1;
          $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

          $check = getimagesize($_FILES['recipeStepImg' . make_dd($i)]["tmp_name"]);
          if($check !== false) {
              $uploadOk = 1;
          } else {
              $error_msg = "File is not an image.";
              $uploadOk = 0;
          }

          if ($_FILES['recipeStepImg' . make_dd($i)]["size"] > 500000) {
            $error_msg = "Sorry, your file is too large.";
            $uploadOk = 0;
          }

          if($imageFileType != "jpg") {
            $error_msg = "Sorry, for the step images, only JPG files are allowed.";
            $uploadOk = 0;
          }
          if ($uploadOk == 0) {
            $error_msg = "Sorry, your file was not uploaded.";
            die($error_msg);
            // if everything is ok, try to upload file
          } else {
            if (move_uploaded_file($_FILES['recipeStepImg' . make_dd($i)]["tmp_name"], $target_dir . "/step_" . $i_adj . ".jpg")) {
            } else {
              $error_msg = "Sorry, there was an error uploading your file.";
              die($error_msg);
            }
          }
        }
        $i++;
      }
    }
  }

  $query = 'SELECT * ';
  $query .= 'FROM recipes ';
  $query .= "WHERE id = '$id' ";
  $query .= 'LIMIT 1';

  $result = mysqli_query($connection, $query);

  if (!$result) {
    die('Database query failed.');
  }

  if (check_in_db($id, "id", $connection) == False) {
    redirect_to("admin.php");
  }

  while ($recipe = mysqli_fetch_assoc($result)) {
?>
  <?php include 'includes/_aside.php'; ?>
  <main class="col-md-9 admin-main">
      <?php
        if (isset($message)) {
          echo "<p>{$message}</p>";
        }
       ?>
      <h2><?php echo $recipe['title']; ?> with <?php echo $recipe['side']; ?></h2>
      <form method="POST" action="manage_recipe.php?id=<?php echo $id; ?>" enctype="multipart/form-data">
        <div class="form-recipeHero">
          <label for="recipeHero">Recipe Hero Image<br /><span class="desc-class">Must be a JPG.</span></label>
          <input type="file" class="form-control" name="recipeHero" id="recipeHero" placeholder="filename">
        </div>
        <div class="form-group">
          <label for="recipeIngredients">Recipe Ingredients Image<br /><span class="desc-class">Must be a PNG.</span></label>
          <input type="file" class="form-control" name="recipeIngredients" id="recipeIngredients"
          placeholder="filename">
        </div>
        <div class="form-group">
          <label for="recipeTitle">Recipe Name</label>
          <input type="text" class="form-control" name="recipeTitle" id="recipeTitle" placeholder="My Recipe Title" value="<?php echo $recipe['title']; ?>" required>
        </div>
        <div class="form-group">
          <label for="recipeSide">Recipe Side</label>
          <input type="text" class="form-control" name="recipeSide" id="recipeSide" placeholder="My Recipe Side" value="<?php echo $recipe['side']; ?>" required>
        </div>
        <div class="form-group">
          <label for="recipeDescription">Recipe Description</label>
          <input type="text" class="form-control" name="recipeDescription" id="recipeDescription" placeholder="My Recipe Description" value="<?php echo $recipe['description']; ?>" required>
        </div>
        <div class="form-group">
          <label for="recipeIngredients">Recipe Ingredients<br /><span class="desc-class">Separate each ingredient with a new line.</span></label>
          <textarea class="form-control" name="recipeIngredients" id="recipeIngredients" placeholder="My Recipe Ingredients" required><?php $ing_list = $recipe['ingredients']; $ing_string_array = explode("\\", $ing_list); for ($i = 0; $i < substr_count($ing_list, '\\'); $i++) {  echo trim($ing_string_array[$i], " "); } ?></textarea>
        </div>
        <div class="form-group">
          <div id="steps-holder">
            <h4>Steps:</h4>
            <?php
              $step_list = $recipe['steps'];
              $step_string_array = explode("\\", $step_list);
              for ($i = 0; $i < substr_count($step_list, '\\'); $i+=2) {
                $cur_step = $i/2+1; //Finding the current step # by taking the substrings with '\' divided by 2, then normalizing by adding 1.
            ?>
              <div class="admin-card">
                <h4>Step <?php echo make_dd($cur_step); ?></h4>
                <label for="recipeStepImgs[]">Step Image<br /><span class="desc-class">Must be a JPG.</span></label>
                <input type="file" class="form-control" name="recipeStepImg<?php echo make_dd($cur_step) ?>" id="stepImg<?php echo make_dd($cur_step) ?>" placeholder="filename">
                <label for="recipeStepNames[]">Step Name</label>
                <input type="text" class="form-control" name="recipeStepNames[]" id="stepName<?php echo make_dd($cur_step) ?>" placeholder="Step Name" value="<?php
                if($cur_step < 10) {
                  echo substr(str_replace(":", "", $step_string_array[$i]), 2);
                } else {
                  echo substr(str_replace(":", "", $step_string_array[$i]), 3);
                } ?>" required>
                <label for="recipeStepDescs[]">Step Description</label>
                <textarea class="form-control" name="recipeStepDescs[]" id="stepDesc<?php echo make_dd($cur_step) ?>" placeholder="Step Description" required><?php echo $step_string_array[$i+1]; ?></textarea>
              </div>
            <?php } ?>
          </div>
          <br>
          <button id="add-btn" type="button" name="add_step" class="btn btn-success">Add a Step +</button>
          <button id="remove-btn" type="button" name="remove_step" class="btn btn-danger right-margin-btn">Remove Last Step -</button>
        </div>
        <div class="form-group">
          <label>Recipe Filters</label>
            <input type="checkbox" name="filtersArray[]" value="Vegan\" <?php if (strpos($recipe['filters'], 'Vegan') !== false) { echo 'checked'; }?>><span class="filters-span">Vegan</span></input>
            <input type="checkbox" name="filtersArray[]" value="Vegetarian\" <?php if (strpos($recipe['filters'], 'Vegetarian') !== false) { echo 'checked'; }?>><span class="filters-span">Vegetarian</span></input>
            <input type="checkbox" name="filtersArray[]" value="Pescatarian\" <?php if (strpos($recipe['filters'], 'Pescatarian') !== false) { echo 'checked'; }?>><span class="filters-span">Pescatarian</span></input>
            <input type="checkbox" name="filtersArray[]" value="Dairy-Free\" <?php if (strpos($recipe['filters'], 'Dairy-Free') !== false) { echo 'checked'; }?>><span class="filters-span">Dairy-Free</span></input>
            <input type="checkbox" name="filtersArray[]" value="Gluten-Free\" <?php if (strpos($recipe['filters'], 'Gluten-Free') !== false) { echo 'checked'; }?>><span class="filters-span">Gluten-Free</span></input>
        </div>
        <button type="submit" name="submit" class="btn btn-primary right-margin-btn">Submit</button>
        <button type="submit" name="delete" class="btn btn-danger" formnovalidate>Delete This Recipe</button>
      </form>
      <br>
      <br>
    </main>
<?php
break;
}
include "includes/_footer_manage_recipe.php"; ?>
