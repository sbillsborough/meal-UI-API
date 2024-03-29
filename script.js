const search = document.getElementById("search");
const submit = document.getElementById("submit");
const mealsEl = document.getElementById("meals");
const resultHeading = document.getElementById("result-heading");
const rndmMeal = document
  .querySelector("button")
  .addEventListener("click", randomMeal);

function randomMeal() {
  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((res) => res.json())
    .then((res) => {
      addMealToDom(res.meals[0]);
    })
    .then(() => {
      resultHeading.innerHTML = `<h3>Your random meal is...</h3>`;
    });
}

function searchMeal(e) {
  e.preventDefault();
  // clears the single meal
  mealsEl.innerHTML = "";

  // get the search term
  const searchTerm = search.value;

  //check if the search input is empty
  if (searchTerm.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
      .then((res) => res.json())
      .then((res) => {
        addMealToDom(res.meals[0]);
      })
      .then((data) => {
        resultHeading.innerHTML = `<h3>Your search result for '${searchTerm}' is...<h3>`;
      })
      .catch((error) => alert("Sorry, that meal doesn't exist"));
    resultHeading.innerHTML = `<p class="greeting">Simply search for a meal of your choice. <br><br>Or if you don't know what you fancy just hit
    the
    'Random
    Meal' button and we'll do the work for you.</p>`;
    //clear search
    search.value = "";
  } else {
    alert("Please enter a search value");
    resultHeading.innerHTML = `<p class="greeting">Simply search for a meal of your choice. <br><br>Or if you don't know what you fancy just hit
    the
    'Random
    Meal' button and we'll do the work for you.</p>`;
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
        

        <div class="main">
          <h3>Ingredients:</h3>
            <ul>
              ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
            </ul>
          <h3><strong>Method:</strong></h3><p>${meal.strInstructions}
          
        </div>
      </div>
      <div class="footer"><a href="#top">Back to the top</a>
      </div>`;
}

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
