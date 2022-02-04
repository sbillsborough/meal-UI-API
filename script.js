const search = document.getElementById("search");
const mealsEl = document.getElementById("meals");
const resultHeading = document.getElementById("result-heading");
const single_mealEl = document.getElementById("single-meal");

function searchMeal(e) {
  e.preventDefault();
  // clears the single meal
  single_mealEl.innerHTML = "";
  // get the search term
  const searchTerm = search.value;

  if (searchTerm.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
      .then((res) => res.json())
      .then((data) => {
        resultHeading.innerHTML = `<h3>You searched for '${searchTerm}'<h3>`;
        if (data.meals === null) {
          resultHeading.innerHTML = `Something went wrong. Please try again!`;
        } else {
          mealsEl.innerHTML = data.meals
            .map(
              (meals) => `<div class="meal">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <div class="meal-info" data-mealID="${meal.idMeal}">
              <h3>${meal.strMeal}</h3>
            </div>
            </div>
            `
            )
            .join("");
        }
      });
    search.value = "";
  } else {
    resultHeading.innerHTML = "<h2>Please type in the keywords to search</h2>";
  }
}

// get meal by id
function getMealByID(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      addMealToDom(meal);
    });
}
