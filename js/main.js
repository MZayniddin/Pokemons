const elList = document.querySelector('.pokemon-list');
const elTypeSelect = document.querySelector('select[id=types]');
const elInputName = document.querySelector('#input-name');
const elAlpSelect = document.querySelector('#sort-select');
const elForm = document.querySelector('.form');

function renderPokemons(arr, element) {
  element.innerHTML = '';
  arr.forEach(pokemon => {
    const pokemonImg = document.createElement('img');
    pokemonImg.setAttribute('src', pokemon.img);
    pokemonImg.setAttribute('width', '157');
    pokemonImg.setAttribute('height', '157');
    const pokemonImgDiv = document.createElement('div');
    pokemonImgDiv.appendChild(pokemonImg);

    const pokemonName = document.createElement('h3');
    pokemonName.innerText = pokemon.name;

    const pokemonType = document.createElement('p');
    pokemonType.innerText = pokemon.type.join(', ');

    const infoWrapper = document.createElement('div');

    const pokemonWeight = document.createElement('strong');
    pokemonWeight.innerText = pokemon.weight;

    const pokemonHeight = document.createElement('strong');
    pokemonHeight.innerText = pokemon.height;

    infoWrapper.append(pokemonWeight, pokemonHeight);

    const newPokemon = document.createElement('li');
    newPokemon.className = 'pokemon-item'
    newPokemon.append(pokemonImgDiv, pokemonName, pokemonType, infoWrapper);

    element.appendChild(newPokemon);
  });
}

function filterTypes(arr) {
  const types = [];
  arr.forEach(pokemon => {
    pokemon.type.forEach(item => {
      if (!types.includes(item)) {
        types.push(item);
      }
    })
  });
  return types;
}

function renderTypesSelect(arr, element) {
  arr.forEach(option => {
    const newOption = document.createElement('option');
    newOption.innerText = option;
    newOption.value = option
    element.appendChild(newOption);
  })
}

renderTypesSelect(filterTypes(pokemons), elTypeSelect);
renderPokemons(pokemons, elList);

elForm.addEventListener('submit', (event) => {
  event.preventDefault();
  let selectedValue = elTypeSelect.value;
  let filteredPokemons = [];
  if (selectedValue === 'All') {
    filteredPokemons = pokemons;
  } else {
    filteredPokemons = pokemons.filter(pokemon => pokemon.type.includes(selectedValue));
  }

  const nameRegex = new RegExp(elInputName.value, 'gi')
  const filterByName = filteredPokemons.filter(item => item.name.match(nameRegex));


  let sortedPokemons = [];
  if (elAlpSelect.value === 'a-z') {
    sortedPokemons = filterByName.sort((a, b) => a.name.localeCompare(b.name));
  } else if(elAlpSelect.value === 'z-a'){
    sortedPokemons = filterByName.sort((a, b) => a.name.localeCompare(b.name)).reverse();
  }

  renderPokemons(sortedPokemons, elList);
})