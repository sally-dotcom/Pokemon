// Fetch Pokémon data from PokeAPI
async function fetchPokemon() {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50');
      const data = await response.json();
      const pokemonList = data.results;
      displayPokemon(pokemonList);
    } catch (error) {
      console.error('Error fetching Pokémon:', error);
    }
  }
  
  // Display Pokémon cards
  function displayPokemon(pokemonList) {
    const container = document.getElementById('pokemon-container');
    container.innerHTML = ''; // Clear previous content
  
    pokemonList.forEach(async (pokemon) => {
      const pokemonData = await fetch(pokemon.url).then((res) => res.json());
      const card = document.createElement('div');
      card.className = 'pokemon-card';
  
      card.innerHTML = `
        <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
        <h3>${pokemonData.name}</h3>
        <p>Type: ${pokemonData.types.map((type) => type.type.name).join(', ')}</p>
      `;
  
      container.appendChild(card);

      // Inside displayPokemon function
const favoriteButton = document.createElement('button');
favoriteButton.textContent = '❤️ Favorite';
favoriteButton.addEventListener('click', () => addToFavorites(pokemonData));
card.appendChild(favoriteButton);
    });
  }
  
  // Search functionality
  document.getElementById('search').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.pokemon-card');
  
    cards.forEach((card) => {
      const name = card.querySelector('h3').textContent.toLowerCase();
      if (name.includes(searchTerm)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';

        async function addToFavorites(pokemon) {
          const response = await fetch('http://localhost:3000/favorites', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pokemon),
          });
          if (response.ok) {
            alert(`${pokemon.name} added to favorites!`);
          }
        }
      }
    });
  });
  
  // Toggle dark mode
  document.getElementById('toggle-mode').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });
  
  // Initialize app
  fetchPokemon();