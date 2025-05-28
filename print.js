window.addEventListener("load", (event) => {
  const url = new URL(window.location.href);
  const searchParams = url.searchParams;

  const tableContainer = document.createElement("div");

  var recipeName = "My Recipe";
  var recipeAuthor = "John Smith";
  var ingredients = "";
  var instructions = "";

  searchParams.forEach((value, key) => {
    if (key.includes("ingredient")) {
      ingredients += `<tr><td><li class="tableStyling">${value}</li></td></tr>`;
    } else if (key.includes("step")) {
      instructions += `<tr><td>${
        parseInt(key.split("step").pop()) + 1
      }. ${value}</li></td>`;
    } else if (key == "recipeName") {
      recipeName = value;
    } else if (key == "recipeAuthor") {
      recipeAuthor = value;
    }
  });

  tableContainer.innerHTML = `
    <table class="recipeTable">
        <thead>
            <tr>
                <th>${recipeName}</th>
            </tr>
            <tr>
                <th>${recipeAuthor}</th>
            </tr>
        </thead>
        <tbody>
            <tr class="recipeTableCategory">
                <td>Ingredients</td>
            </tr>
            ${ingredients}
            <tr class="recipeTableCategory">
                <td>Instructions</td>
            </tr>
            ${instructions}
        </tbody>
        </table>`;

  document.body.appendChild(tableContainer);
  window.print();
});
