import { fetchPokemon } from './api.js';

document.addEventListener('DOMContentLoaded', function () {
    const teamContainer = document.getElementById('team-container');
    const searchInput = document.getElementById('team-search');
    const addButton = document.getElementById('add-pokemon');
    
    let team = [];

    addButton.addEventListener('click', async () => {
        const pokemonName = searchInput.value.toLowerCase();
        try {
            const pokemon = await fetchPokemon(pokemonName);
            addPokemonToTeam(pokemon);
        } catch (error) {
            alert('Failed to add Pokémon to team.');
        }
    });

    const addPokemonToTeam = (pokemon) => {
        if (team.length < 6) {
            team.push(pokemon);
            updateTeamDisplay();
        } else {
            alert('Team is full!');
        }
    };

    const updateTeamDisplay = () => {
        teamContainer.innerHTML = team.map(pokemon => `
            <div class="col-md-2 mb-3">
                <div class="card">
                    <img src="${pokemon.sprites.front_default}" class="card-img-top" alt="${pokemon.name}">
                    <div class="card-body">
                        <h5 class="card-title">${pokemon.name}</h5>
                    </div>
                </div>
            </div>
        `).join('');
    };
});
