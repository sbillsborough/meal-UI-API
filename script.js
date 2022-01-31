const search_meal = 'http://www.themealdb.com/api/json/v1/1/search.php?s="';

const meal_img =
  "https://themealdb.com/images/media/meals/llcbn01574260722.jpg/preview";

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

// Fetch initial meals

getMeals(search_meal) {
    const response = await fetch(url);
    if (response.status === 200) {
    const data = await response.json();
    }

    showMeals(data.results);
}
