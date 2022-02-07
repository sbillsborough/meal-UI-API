const search = document.getElementById("search");
const submit = document.getElementById("submit");
const mealsEl = document.getElementById("meals");
const resultHeading = document.getElementById("result-heading");

function searchMeal(e) {
  e.preventDefault();
  // clears the single meal
  mealsEl.innerHTML = "";

  // get the search term
  const searchTerm = search.value;
  console.log(searchTerm);

  //check if the search input is empty
  if (searchTerm.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
      .then((res) => res.json())
      .then((res) => {
        addMealToDom(res.meals[0]);
      })
      .then((data) => {
        console.log(data);
        resultHeading.innerHTML = `<h3>Your search result for '${searchTerm}' is...<h3>`;

        if (data.meals === null) {
          resultHeading.innerHTML = `Something went wrong. Please try again!`;
        } else {
          mealsEl.innerHTML = data.meals
            .map(
              (meal) =>
                `<div class="meal">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
              <div class="meal-info" data-mealId="${meal.idMeal}">
                <h3>${meal.strMeal}</h3>
              </div>
            </div>`
            )
            .join("");
        }
      });
    //clear search
    search.value = "";
  } else {
    alert("Please enter a search value");
  }
}

// add meal to DOM

function addMealToDom(meal) {
  const ingredients = [];

  // gets ingredients maximum 20
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  mealsEl.innerHTML = `
      <div class="single-meal">
        <h3>${meal.strMeal}</h3>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        
        <div class="single-meal-info">
          ${
            meal.strCategory
              ? `<p><strong>Category:</strong> ${meal.strCategory}</p>`
              : ""
          }
          ${meal.strArea ? `<p><strong>Area:</strong> ${meal.strArea}</p>` : ""}
        </div>
        

        <div class=main>
          <h3>Ingredients:</h3>
            <ul>
              ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
            </ul>
          <h3><strong>Method:</strong></h3><p>${meal.strInstructions}
          
        </div>
      </div>`;
}

//Event Listeners
submit.addEventListener("submit", searchMeal);

mealsEl.addEventListener("click", (e) => {
  const mealInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains("meal-info");
    } else {
      return false;
    }
  });

  if (mealInfo) {
    const mealId = mealInfo.getAttribute("data-mealid");
    getMealById(mealId);
  }
});
