// Add ingredient listener
document.getElementById("addIngredientButton").addEventListener("click", function () {
  addIngredient(document.getElementById("newIngredient").value.trim(), document.getElementById("newIngredientQuantity").value.trim(), document.getElementById("measurementDropdown").value);
});

// Add step listener
document.getElementById("addStepButton").addEventListener("click", function () {
  addStep(document.getElementById("newStep").value);
});

// Save listener
document.getElementById("save").addEventListener("click", save);

// Load listener
document.getElementById("load").addEventListener("click", promptFileUpload);

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
  if (measurement == "q") {
    newItem.innerHTML = `${ingredientQuantity} ${ingredientName}
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
    ingredients: [],
    steps: [],
    dateSaved: date,
  };

  data.name = document.getElementById("recipeName").value;
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

  var a = document.createElement("a");
  var file = new Blob([JSON.stringify(data)], { type: "application/json" });
  a.href = URL.createObjectURL(file);
  a.download = data.name + ".json";
  a.click();
}

function resetRecipe() {
  const ingredientList = document.getElementById("ingredientList");
  const stepList = document.getElementById("stepList");

  const newIngredientQuantity = document.getElementById("newIngredientQuantity");
  const newIngredient = document.getElementById("newIngredient");
  const newStep = document.getElementById("newStep");

  const recipeName = document.getElementById("recipeName");

  ingredientList.innerHTML = "";
  stepList.innerHTML = "";

  newIngredientQuantity.value = "";
  newIngredient.value = "";
  newStep.value = "";

  recipeName.value = "My Recipe";
}

function promptFileUpload() {
  const reader = new FileReader();

  var input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';

  var jsonData;
  
  reader.onload = function (e) {
    try {
      jsonData = JSON.parse(e.target.result);
      load(jsonData);
    } catch (error) {
      alert('Error parsing JSON: ' + error);
    }
  };

  input.addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
      reader.readAsText(file);
    }
  });

  input.click();
}

function load(data) {
  console.log(data);

  resetRecipe();

  const newIngredientQuantity = document.getElementById("newIngredientQuantity");
  const newIngredient = document.getElementById("newIngredient");
  const newStep = document.getElementById("newStep");

  const recipeName = document.getElementById("recipeName");

  for (let i = 0; i < data.ingredients.length; i++) {
    addCompletedIngredient(data.ingredients[i]);
  }

  for (let i = 0; i < data.steps.length; i++) {
    addStep(data.steps[i]);
  }

  newIngredientQuantity.value = "";
  newIngredient.value = "";
  newStep.value = "";

  recipeName.value = data.name;
}