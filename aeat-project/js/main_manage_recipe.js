document.getElementById("add-btn").addEventListener("click", function() {
    var mainDiv = document.createElement("div");
    mainDiv.classList.add("admin-card");
    var domString = '<h4>Step ' + getSteps() + '</h4><label for="recipeStepImg' + getSteps() + '">Step Image<br /><span class="desc-class">Must be a JPG.</span></label><input type="file" class="form-control" name="recipeStepImg' + getSteps() + '" id="stepImg' + getSteps() + '" placeholder="filename" required><label for="recipeStepNames[]">Step Name</label><input type="text" class="form-control" name="recipeStepNames[]" id="stepName' + getSteps() + '" placeholder="Step Name" required><label for="recipeStepDescs[]">Step Description</label><textarea class="form-control" name="recipeStepDescs[]" id="stepDesc' + getSteps() + '1" placeholder="Step Description"></textarea>';
    mainDiv.innerHTML = domString;
    document.getElementById("steps-holder").appendChild(mainDiv);
    showHideRemoveBtn();
  }, false);
