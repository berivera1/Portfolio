<?php
  define('DB_SERVER', 'berdevs.com');
  define('DB_USER', 'theberde_admin');
  define('DB_PASS', 'XWTXSw9mDqNXKKBD');
  define('DB_NAME', 'theberde_aeat_proj');

  //define('DB_SERVER', 'localhost');
  //define('DB_USER', 'root');
  //define('DB_PASS', '');
  //define('DB_NAME', 'aeat-proj');

  $connection = mysqli_connect(DB_SERVER, DB_USER, DB_PASS, DB_NAME);

  if (mysqli_connect_errno()) {
    die ('Database connection failed: ' .
        mysqli_connect_error() .
        ' (' . mysqli_connect_errno() . ')'
    );
  }

  mysqli_set_charset($connection,"utf8");
?>
