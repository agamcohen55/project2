const searchInput = document.getElementById('search');
const pokedex = document.getElementById('pokedex');

searchInput.addEventListener('keyup', debounce(function () {
    const searchQuery = searchInput.value.toLowerCase();
    searchPokemon(searchQuery);
}, 500));

async function searchPokemon(query) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
        const data = await response.json();
        displayPokemon(data);
    } catch (error) {
        console.error('אירעה שגיאה: ', error);
    }
}

function displayPokemon(pokemon) {
    const pokemonCard = document.createElement('div');
    pokemonCard.classList.add('card');
    const pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    pokemonCard.innerHTML = `
        <img src="${pokemon.sprites.front_default}" alt="${pokemonName}">
        <h2>${pokemonName}</h2>
        <p>מספר: ${pokemon.id}</p>
        <p>גובה: ${pokemon.height} dm</p>
        <p>משקל: ${pokemon.weight} hg</p>
    `;
    pokedex.innerHTML = '';
    pokedex.appendChild(pokemonCard);
}

function debounce(func, wait) {
    let timeout;
    return function () {
        const context = this;
        const args = arguments;
        const later = function () {
            func.apply(context, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
