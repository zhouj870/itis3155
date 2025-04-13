'use strict';
/*  json data is from https://api.sampleapis.com/ */

const icedCoffeeBtn = document.getElementById('icedCoffeeBtn');
const hotCoffeeBtn = document.getElementById('hotCoffeeBtn');
const container = document.querySelector('.container');

icedCoffeeBtn.addEventListener('click',loadIcedCoffeeData);
hotCoffeeBtn.addEventListener('click',loadHotCoffeeData);

function loadIcedCoffeeData()
{
    fetch('data/iced.json')
        .then(response => {
            if(!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            addDrinks(data);
        })
        .catch(error => {
            console.error('Error fetching ice coffee data:', error);
        });
}

function loadHotCoffeeData()
{
    fetch('data/hot.json')
        .then(response => {
            if(!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            addDrinks(data);
        })
        .catch(error => {
            console.error('Error fetching hot coffee data:', error);
        });
}

function addDrinks(drinks)
{
    container.innerHTML = ''; // Clear previous content

  drinks.forEach(drink => {
    const article = document.createElement('article');
    article.classList.add('card');

    const img = document.createElement('img');
    img.src = drink.image;
    img.alt = drink.title;
    article.appendChild(img);

    const content = document.createElement('div');
    content.classList.add('content');

    const title = document.createElement('h3');
    title.textContent = drink.title;
    content.appendChild(title);

    const description = document.createElement('p');
    description.textContent = `${drink.description} Ingredients include:`;
    content.appendChild(description);

    const ingredientsDiv = document.createElement('div');
    ingredientsDiv.classList.add('ingredients');

    drink.ingredients.forEach(ingredient => {
      const ingredientDiv = document.createElement('div');
      ingredientDiv.classList.add('ingredient');
      ingredientDiv.textContent = ingredient;
      ingredientsDiv.appendChild(ingredientDiv);
    });

    content.appendChild(ingredientsDiv);
    article.appendChild(content);
    container.appendChild(article);
    });
}

