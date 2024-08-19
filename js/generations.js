import { fetchPokemonsByGeneration } from './api.js';

document.addEventListener('DOMContentLoaded', async function () {
    const generationSelect = document.getElementById('generation-select');
    const generationPokemons = document.getElementById('generation-pokemons');

    // Function to load Pokémon based on the selected generation
    const loadPokemons = async (generation) => {
        try {
            const pokemons = await fetchPokemonsByGeneration(generation);
            displayPokemons(pokemons);
        } catch (error) {
            generationPokemons.innerHTML = '<p class="text-danger">Failed to load Pokémon by generation.</p>';
        }
    };

    // Display Pokémon on the page
    const displayPokemons = (pokemons) => {
        generationPokemons.innerHTML = pokemons.map(pokemon => `
            <div class="col-md-4 mb-3">
                <div class="card">
                    <img src="${pokemon.sprites.front_default}" class="card-img-top" alt="${pokemon.name}">
                    <div class="card-body">
                        <h5 class="card-title">${pokemon.name}</h5>
                    </div>
                </div>
            </div>
        `).join('');
    };

    // Load Pokémon for the initial selection
    loadPokemons(parseInt(generationSelect.value, 10));

    // Event listener for changes in generation select
    generationSelect.addEventListener('change', () => {
        const generation = parseInt(generationSelect.value, 10);
        loadPokemons(generation);
    });
});
