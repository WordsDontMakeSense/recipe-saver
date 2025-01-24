// Handle adding new ingredient to the list
document
  .getElementById("addIngredientButton")
  .addEventListener("click", function () {
    // Get values from the inputs
    const ingredientName = document
      .getElementById("newIngredient")
      .value.trim();
    const ingredientQuantity = document
      .getElementById("newIngredientQuantity")
      .value.trim();
    const measurement = document.getElementById("measurementDropdown").value;
    const stepInput = document.getElementById("newStep").value.trim();

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
  });

// Handle adding new step to the list
document.getElementById("addStepButton").addEventListener("click", function () {
  // Get values from the input
  const stepInput = document.getElementById("newStep").value.trim();
  const stepList = document.getElementById("stepList");

  // Ensure input is not empty
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
});

document.getElementById("save").addEventListener("click", function () {
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
  const jsonObject = JSON.stringify(data);
  download(jsonObject, data.name + ".json", "application/json");
});

function download(content, fileName, contentType) {
  var a = document.createElement("a");
  var file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}
