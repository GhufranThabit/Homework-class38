'use strict';

/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Homework/blob/main/3-UsingAPIs/Week2/README.md#exercise-2-gotta-catch-em-all

Complete the four functions provided in the starter `index.js` file:

`fetchData`: In the `fetchData` function, make use of `fetch` and its Promise 
  syntax in order to get the data from the public API. Errors (HTTP or network 
  errors) should be logged to the console.

`fetchAndPopulatePokemons`: Use `fetchData()` to load the pokemon data from the 
  public API and populate the `<select>` element in the DOM.
  
`fetchImage`: Use `fetchData()` to fetch the selected image and update the 
  `<img>` element in the DOM.

`main`: The `main` function orchestrates the other functions. The `main` 
  function should be executed when the window has finished loading.

Use async/await and try/catch to handle promises.

Try and avoid using global variables. As much as possible, try and use function 
parameters and return values to pass data back and forth.
------------------------------------------------------------------------------*/
const url = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';

async function fetchData(url) {
  const response = await fetch(url);

  if (response.ok) {
    return response.json();
  }
  throw new Error(`HTTP Error: ${response.status}`);
}

function fetchAndPopulatePokemons() {
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = 'get pokemon';
  button.classList = 'btn';
  document.body.appendChild(button);

  const select = document.createElement('select');
  select.classList = 'select';
  document.body.appendChild(select);

  button.addEventListener('click', async () => {
    const urlApi = 'https://pokeapi.co/api/v2/pokemon?limit=151';
    const data = await fetchData(urlApi);
    const results = data.results;
    results.forEach((result) => {
      const option = document.createElement('option');
      option.textContent = result.name;
      select.appendChild(option);
    });

    select.addEventListener('change', fetchImage);
  });
}

async function fetchImage(e) {
  const changeImage = document.querySelector('.current-poke');
  if (changeImage) {
    changeImage.remove();
  }

  const pokeUrl = `https://pokeapi.co/api/v2/pokemon/${e.currentTarget.value}`;
  const imgData = await fetchData(pokeUrl);
  console.log(imgData);

  const img = document.createElement('img');
  img.className = 'current-poke';
  img.src = imgData.sprites.front_shiny;
  img.alt = 'current-poke-img';
  document.body.appendChild(img);
}

function renderError(error) {
  const errorElement = document.createElement('h1');
  errorElement.textContent = error;
  document.body.appendChild(errorElement);
}

async function main() {
  try {
    const result = await fetchData(url);
    fetchAndPopulatePokemons(result);
  } catch (error) {
    renderError(error);
  }
}

window.addEventListener('load', main);
