<?php

// Redicts the user to another pg.
function redirect_to($location = NULL) {
  if ($location != NULL) {
    header("Location:{$location}");
    exit;
  }
}

// Print the name of a variable. Used for internal testing.
function print_var_name($var) {
    foreach($GLOBALS as $var_name => $value) {
        if ($value === $var) {
            return $var_name;
        }
    }
    return false;
}

// Get size of DB.
function db_size($connection) {
  $query = "SELECT * ";
  $query .= 'FROM recipes ';

  $result = mysqli_query($connection, $query);

  return mysqli_num_rows($result);
}

// Check if an ID exists in the database. Important on the chance an ID # is deleted.
function check_in_db($var, $column, $connection) {
  $query = "SELECT $column ";
  $query .= 'FROM recipes ';
  $query .= "WHERE id='$var'";

  $result = mysqli_query($connection, $query);

  if (mysqli_num_rows($result) > 0) {
    return True;
  } else {
    return False;
  }

  if (!$result) {
    return False;
  }
}

// Get random ID number that exists in the database.
function rand_id_in_db($connection) {
  $query = 'SELECT MAX(id) ';
  $query .= 'FROM recipes ';

  $result = mysqli_query($connection, $query);

  $check_num = False;

  while ($max = mysqli_fetch_assoc($result)) {
    while($check_num == False) {
      $rand_num = mt_rand(1, $max['MAX(id)']);
      $check_num = check_in_db($rand_num, "id", $connection);
    }
  }

  return $rand_num;
}

// Checks if any values in an array are the same.
function check_same_arr($arr) {
  if (count($arr) == 0) {
    return False;
  }

  for($i = 0; $i < count($arr) - 1; $i++) {
    for($j = $i + 1; $j < count($arr); $j++){
      if($arr[$i] == $arr[$j]) {
        return True;
      }
    }
  }
}

// Creates an array consisting of all numbers that appear multiple times in a given array.
function create_pairs_arr($arr) {
  $final_arr = array();
  if (count($arr) == 0) {
    return $final_arr;
  }

  for($i = 0; $i < count($arr) - 1; $i++) {
    for($j = $i + 1; $j < count($arr); $j++){
      if($arr[$i] == $arr[$j]) {
        array_push($final_arr, $arr[$i]);
      }
    }
  }
  return $final_arr;
}

// Returns a double-digit version of a given integer.
function make_dd($int) {
  if($int < 10) {
    return "0" . $int;
  } else {
    return $int;
  }
}
?>
