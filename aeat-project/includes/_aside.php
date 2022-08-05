<aside class="col-md-3">
  <h2>Recipes</h2>
  <div class="list-group">

    <?php
      $query = 'SELECT id, title ';
      $query .= 'FROM recipes ';
      $query .= 'ORDER BY id ASC';

      $result = mysqli_query($connection, $query);

      if (!$result) {
        die('Database query failed.');
      }

      while ($course = mysqli_fetch_assoc($result)) {
        echo '<a href="manage_recipe.php?id=';
        echo urlencode($course['id']);
        echo '" class="list-group-item';
        if (isset($safe_id)) {
          if ($course['id'] == $safe_id) {
            echo ' active';
          }
        }
        echo '">';
        echo $course['title'];
        echo '</a>';
      } // end while
      mysqli_free_result($result);
    ?>

    <a href="admin.php" class="list-group-item"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Add a Recipe +</a>

  </div>
</aside>
