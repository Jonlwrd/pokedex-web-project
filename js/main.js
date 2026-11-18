const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const pokemonScreen = document.querySelector('.pokemon__screen');

const form = document.querySelector('.form__search');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

pokemonImage.addEventListener('load', () => {
  pokemonImage.style.display = 'block';
});

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status == 200) {
    const data = await APIResponse.json();
    return data;
  }
}

const renderPokemon = async (pokemon) => {

  pokemonScreen.classList.remove('not-found');
  pokemonImage.style.display = 'none';
  pokemonImage.removeAttribute('src');
  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = `#${String(data.id).padStart(3, '0')} -`;
    pokemonImage.src =
      data['sprites']['other']['home']['front_default']
      || data['sprites']['other']['official-artwork']['front_default']
      || data['sprites']['front_default'];
    searchPokemon = data.id;
  } else {
    pokemonScreen.classList.add('not-found');
    pokemonName.innerHTML = 'Not Found :(';
    pokemonNumber.innerHTML = '';
  }

  input.value = '';
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const value = input.value.trim().toLowerCase();
  if (!value) return;

  renderPokemon(value);
});

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);