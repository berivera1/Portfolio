<?php
  include "includes/init.php";

  echo "<title>AEAT | Admin Panel</title>";

  include "includes/_header_admin.php";

  if (isset($_POST['submit'])) {
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
    for($i = 0; $i < count($recipe_step_names); $i++) {
      $recipe_steps .= $i . " ";
      $recipe_steps .= $recipe_step_names[$i];
      $recipe_steps .= ":\\\\";
      $recipe_steps .= $recipe_step_descs[$i];
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

    $recipe_hero_path = "Recipe_" . str_replace(" ", "_", $_POST['recipeTitle']) . "_with_" . str_replace(" ", "_", $_POST['recipeSide']);

    $target_dir = "img/recipe_pics/" . $recipe_hero_path;

    mkdir($target_dir, 0777, true);

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
    $i = 1;
    foreach($_POST['recipeStepNames'] AS $val) {
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
        $i_adj = make_dd($i);
        if (move_uploaded_file($_FILES['recipeStepImg' . make_dd($i)]["tmp_name"], $target_dir . "/step_" . $i_adj . ".jpg")) {
        } else {
          $error_msg = "Sorry, there was an error uploading your file.";
          die($error_msg);
        }
      }
      $i++;
    }

    $query = "INSERT INTO recipes (";
    $query .= "title, side, description, ingredients, steps, filters, recipe_folder";
    $query .= ") VALUES (";
    $query .= " '{$recipe_title}', '{$recipe_side}', '{$recipe_description}', '{$recipe_ingredients}', '{$recipe_steps}', '{$recipe_filters_str}', '{$recipe_hero_path}'";
    $query .= ")";

    error_log($query);

    $result = mysqli_query($connection, $query);

    if ($result) {
      $message = '<div class="alert alert-success" role="alert">Page updated!</div>';
    } else {
      $message = '<div class="alert alert-danger" role="alert">Page update failed.</div>' . $query;
    }
  }
?>
  <?php include 'includes/_aside.php'; ?>
  <main class="col-md-9 admin-main">
      <?php
        if (isset($message)) {
          echo "<p>{$message}</p>";
        }
       ?>
      <h2>Add Recipe</h2>
      <form method="POST" action="<?php echo $_SERVER['PHP_SELF']; ?>" enctype="multipart/form-data">
        <div class="form-recipeHero">
          <label for="recipeHero">Recipe Hero Image<br /><span class="desc-class">Must be a JPG.</span></label>
          <input type="file" class="form-control" name="recipeHero" id="recipeHero" placeholder="filename" required>
        </div>
        <div class="form-group">
          <label for="recipeIngredients">Recipe Ingredients Image<br /><span class="desc-class">Must be a PNG.</span></label>
          <input type="file" class="form-control" name="recipeIngredients" id="recipeIngredients" placeholder="filename" required>
        </div>
        <div class="form-group">
          <label for="recipeTitle">Recipe Name</label>
          <input type="text" class="form-control" name="recipeTitle" id="recipeTitle" placeholder="My Recipe Title" required>
        </div>
        <div class="form-group">
          <label for="recipeSide">Recipe Side</label>
          <input type="text" class="form-control" name="recipeSide" id="recipeSide" placeholder="My Recipe Side" required>
        </div>
        <div class="form-group">
          <label for="recipeDescription">Recipe Description</label>
          <input type="text" class="form-control" name="recipeDescription" id="recipeDescription" placeholder="My Recipe Description" required>
        </div>
        <div class="form-group">
          <label for="recipeIngredients">Recipe Ingredients<br /><span class="desc-class">Separate each ingredient with a new line.</span></label>
          <textarea class="form-control" name="recipeIngredients" id="recipeIngredients" placeholder="My Recipe Ingredients" required></textarea>
        </div>
        <div class="form-group">
          <div id="steps-holder">
            <h4>Steps:</h4>
            <div class="admin-card">
              <h4>Step 01</h4>
              <label for="recipeStepImgs[]">Step Image<br /><span class="desc-class">Must be a JPG.</span></label>
              <input type="file" class="form-control" name="recipeStepImg01" id="stepImg01" placeholder="filename" required>
              <label for="recipeStepNames[]">Step Name</label>
              <input type="text" class="form-control" name="recipeStepNames[]" id="stepName01" placeholder="Step Name" required>
              <label for="recipeStepDescs[]">Step Description</label>
              <textarea class="form-control" name="recipeStepDescs[]" id="stepDesc01" placeholder="Step Description" required></textarea>
            </div>
          </div>
          <br>
          <button id="add-btn" type="button" name="add_step" class="btn btn-success">Add a Step +</button>
          <button id="remove-btn" type="button" name="remove_step" class="btn btn-danger">Remove Last Step -</button>
        </div>
        <div class="form-group">
          <label>Recipe Filters</label>
            <input type="checkbox" name="filtersArray[]" value="Vegan\"><span class="filters-span">Vegan</span></input>
            <input type="checkbox" name="filtersArray[]" value="Vegetarian\"><span class="filters-span">Vegetarian</span></input>
            <input type="checkbox" name="filtersArray[]" value="Pescatarian\"><span class="filters-span">Pescatarian</span></input>
            <input type="checkbox" name="filtersArray[]" value="Dairy-Free\"><span class="filters-span">Dairy-Free</span></input>
            <input type="checkbox" name="filtersArray[]" value="Gluten-Free\"><span class="filters-span">Gluten-Free</span></input>
        </div>
        <button type="submit" name="submit" class="btn btn-primary">Submit</button>
      </form>
    </main>
<?php include "includes/_footer_admin.php"; ?>
