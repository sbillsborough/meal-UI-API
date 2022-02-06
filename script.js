const search = document.getElementById("search");
const submit = document.getElementById("submit");
const mealsEl = document.getElementById("meals");
const resultHeading = document.getElementById("result-heading");
const single_mealEl = document.getElementById("single-meal");

function searchMeal(e) {
  e.preventDefault();
  // clears the single meal
  single_mealEl.innerHTML = "";

  // get the search term
  const searchTerm = search.value;
  console.log(searchTerm);

  //check if the search input is empty
  if (searchTerm.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        resultHeading.innerHTML = `<h3>You searched for '${searchTerm}'<h3>`;

        if (data.meals === null) {
          resultHeading.innerHTML = `Something went wrong. Please try again!`;
        } else {
          mealsEl.innerHTML = data.meals
            .map(
              (meal) => `<div class="meal">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <div class="meal-info" data-mealId="${meal.idMeal}">
            </div>
            <div>

            <h3>${meal.strMeal}</h3>
            <h5>Ingredients:</h5>
            
            <p>${meal.strInstructions}</p>

            </div>
            
            </div>
            `
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

// get meal by id
function getMealById(mealId) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${searchTerm}`)
    .then((res) => res.json())
    .then((data) => {
      // const meal = data.meals[0];
      addMealToDom(res.meal[0]);
    });
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

  single_mealEl.innerHTML = `<div class="single-meal">
        <h1>${meal.strMeal}</h1>
        <img src="${meal.strMealthumb}" alt="${meal.strMeal}">
        </div>
        <div class="single-meal-info">
          ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
          ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
        </div>

        <div class=main>
          <p>${meal.strInstructions}</p>
          <h2>Ingredients</h2>
          <ul>
            ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
          </ul>
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
