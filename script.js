// Set image listener
// document.getElementById("setImageButton").addEventListener("click", promptIMGUpload);

// Change quantity listener
document
  .getElementById("newIngredientQuantity")
  .addEventListener("change", function () {
    if (
      document.getElementById("newIngredientQuantity").value < 0 ||
      document.getElementById("newIngredientQuantity").value == ""
    ) {
      document.getElementById("newIngredientQuantity").value = 0;
    }
  });

// Add ingredient listener
document
  .getElementById("addIngredientButton")
  .addEventListener("click", function () {
    addIngredient(
      document.getElementById("newIngredient").value.trim(),
      document.getElementById("newIngredientQuantity").value.trim(),
      document.getElementById("measurementDropdown").value
    );
  });

// Add step listener
document.getElementById("addStepButton").addEventListener("click", function () {
  addStep(document.getElementById("newStep").value);
});

// Save listener
document.getElementById("save").addEventListener("click", save);

// Load listener
document.getElementById("load").addEventListener("click", promptFileUpload);

// Print listener
document.getElementById("print").addEventListener("click", printPDF);

// Reset recipe
document.getElementById("reset").addEventListener("click", resetRecipe);

function addCompletedIngredient(ingredient) {
  // Create a new list item
  const newItem = document.createElement("li");

  // Create the content of the list item
  newItem.innerHTML = `${ingredient}
  <a class="delete-button"><span class="material-symbols-outlined">delete</span></a>`;

  // Add the new item to the ingredient list
  document.getElementById("ingredientList").appendChild(newItem);

  // Add event listener to the trash button
  newItem
    .querySelector(".delete-button")
    .addEventListener("click", function () {
      newItem.remove(); // Remove the list item when trash button is clicked
    });

  // Clear inputs after adding
  document.getElementById("newIngredient").value = "";
  document.getElementById("newIngredientQuantity").value = "";
}

function addIngredient(ingredientName, ingredientQuantity, measurement) {
  // Ensure input is not empty
  if (ingredientName === "" || ingredientQuantity === "") {
    alert("Please enter both an ingredient and a quantity.");
    return;
  }

  // Create a new list item
  const newItem = document.createElement("li");

  // Create the content of the list item
  if (measurement == "discrete") {
    newItem.innerHTML = `${ingredientQuantity} ${ingredientName}
    <a class="delete-button"><span class="material-symbols-outlined">delete</span></a>`;
  } else if (measurement.startsWith("A")) {
    newItem.innerHTML = `${measurement} of ${ingredientName}
  <a class="delete-button"><span class="material-symbols-outlined">delete</span></a>`;
  } else if (measurement == "as needed" || measurement == "to serve") {
    newItem.innerHTML = `${ingredientName} ${measurement}
  <a class="delete-button"><span class="material-symbols-outlined">delete</span></a>`;
  } else if (measurement == "cup" && ingredientQuantity > 1) {
    newItem.innerHTML = `${ingredientQuantity} ${measurement}s of ${ingredientName}
  <a class="delete-button"><span class="material-symbols-outlined">delete</span></a>`;
  } else {
    newItem.innerHTML = `${ingredientQuantity} ${measurement} of ${ingredientName}
    <a class="delete-button"><span class="material-symbols-outlined">delete</span></a>`;
  }

  // Add the new item to the ingredient list
  document.getElementById("ingredientList").appendChild(newItem);

  // Add event listener to the trash button
  newItem
    .querySelector(".delete-button")
    .addEventListener("click", function () {
      newItem.remove(); // Remove the list item when trash button is clicked
    });

  // Clear inputs after adding
  document.getElementById("newIngredient").value = "";
  document.getElementById("newIngredientQuantity").value = "";
}

function addStep(stepInput) {
  const stepList = document.getElementById("stepList");

  if (stepInput === "") {
    alert("Please enter a step");
    return;
  }

  // Create a new list item
  const newItem = document.createElement("li");

  // Create the content of the list item
  newItem.innerHTML = `${stepInput}
    <a class="delete-button"><span class="material-symbols-outlined">delete</span></a>`;

  // Add the new item to the ingredient list
  stepList.appendChild(newItem);

  // Add event listener to the trash button
  newItem
    .querySelector(".delete-button")
    .addEventListener("click", function () {
      newItem.remove(); // Remove the list item when trash button is clicked
    });

  // Clear inputs after adding
  document.getElementById("newStep").value = "";
}

function save() {
  const date = new Date();
  var data = {
    name: "",
    author: "",
    ingredients: [],
    steps: [],
    // image: "",
    dateSaved: date,
  };

  data.name = document.getElementById("recipeName").value;
  data.author = document.getElementById("recipeAuthor").value;
  for (
    let i = 0;
    i < document.getElementById("ingredientList").childElementCount;
    i++
  ) {
    data.ingredients.push(
      document
        .getElementById("ingredientList")
        .children[i].innerText.replace("\ndelete", "")
    );
  }
  for (
    let i = 0;
    i < document.getElementById("stepList").childElementCount;
    i++
  ) {
    data.steps.push(
      document
        .getElementById("stepList")
        .children[i].innerText.replace("\ndelete", "")
    );
  }
  // data.image = document.getElementById("image").src;

  var a = document.createElement("a");
  var file = new Blob([JSON.stringify(data)], { type: "application/json" });
  a.href = URL.createObjectURL(file);
  a.download = data.name + ".json";
  a.click();
}

function resetRecipe() {
  if (confirm("Are you sure? This will erase your current recipe.")) {
    const ingredientList = document.getElementById("ingredientList");
    const stepList = document.getElementById("stepList");

    const newIngredientQuantity = document.getElementById(
      "newIngredientQuantity"
    );
    const newIngredient = document.getElementById("newIngredient");
    const newStep = document.getElementById("newStep");

    const recipeName = document.getElementById("recipeName");
    const recipeAuthor = document.getElementById("recipeAuthor");

    ingredientList.innerHTML = "";
    stepList.innerHTML = "";

    newIngredientQuantity.value = 0;
    newIngredient.value = "";
    newStep.value = "";

    recipeName.value = "My Recipe";
    recipeAuthor.value = "John Smith";
    return true;
  } else {
    return false;
  }
}

function promptFileUpload() {
  const reader = new FileReader();

  var input = document.createElement("input");
  input.type = "file";
  input.accept = ".json";

  var jsonData;

  reader.onload = function (e) {
    try {
      jsonData = JSON.parse(e.target.result);
      load(jsonData);
    } catch (error) {
      alert("Error parsing JSON: " + error);
    }
  };

  input.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      reader.readAsText(file);
    }
  });

  input.click();
}

function promptIMGUpload() {
  const reader = new FileReader();
  var input = document.createElement("input");
  input.type = "file";
  input.accept = "image/png, image/jpg";

  reader.onload = function (e) {
    try {
      const b64img = e.target.result;
      const img = document.getElementById("image");
      img.src = b64img;
      img.style = "margin-bottom: 10px;";
    } catch (error) {
      alert("Error parsing IMG: " + error);
    }
  };

  input.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      reader.readAsDataURL(file);
    }
  });

  input.click();
}

function load(data) {
  if (resetRecipe()) {
    const newIngredientQuantity = document.getElementById(
      "newIngredientQuantity"
    );
    const newIngredient = document.getElementById("newIngredient");
    const newStep = document.getElementById("newStep");

    const recipeName = document.getElementById("recipeName");
    const recipeAuthor = document.getElementById("recipeAuthor");

    for (let i = 0; i < data.ingredients.length; i++) {
      addCompletedIngredient(data.ingredients[i]);
    }

    for (let i = 0; i < data.steps.length; i++) {
      addStep(data.steps[i]);
    }

    newIngredientQuantity.value = "";
    newIngredient.value = "";
    newStep.value = "";
    // if (data.hasOwnProperty("image")) {
    //   document.getElementById("image").src = data.image;
    // } else {
    //   document.getElementById("image").src = "https://place-hold.it/500"
    // }

    recipeName.value = data.name ? data.name : "My Recipe";
    recipeAuthor.value = data.author ? data.author : "John Smith";
  }
}

function printPDF() {
  var url = `print.html?recipeName=${
    document.getElementById("recipeName").value
  }&recipeAuthor=${document.getElementById("recipeAuthor").value}`;
  for (
    let i = 0;
    i < document.getElementById("ingredientList").childElementCount;
    i++
  ) {
    url +=
      `&ingredient` +
      i +
      "=" +
      document
        .getElementById("ingredientList")
        .children[i].innerText.replace("\ndelete", "");
  }
  for (
    let i = 0;
    i < document.getElementById("stepList").childElementCount;
    i++
  ) {
    url +=
      `&step` +
      i +
      "=" +
      document
        .getElementById("stepList")
        .children[i].innerText.replace("\ndelete", "");
  }
  window.open(url, "_blank");
}
