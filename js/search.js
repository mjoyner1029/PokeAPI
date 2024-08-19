import { fetchPokemon } from './api.js';

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('search-form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const searchTerm = document.getElementById('pokemon-search').value.toLowerCase();

        try {
            const pokemon = await fetchPokemon(searchTerm);
            displayPokemon(pokemon);
        } catch (error) {
            document.getElementById('pokemon-info').innerHTML = '<p class="text-danger">Pokémon not found.</p>';
        }
    });

    const displayPokemon = (pokemon) => {
        document.getElementById('pokemon-info').innerHTML = `
            <div class="card">
                <img src="${pokemon.sprites.front_default}" class="card-img-top" alt="${pokemon.name}">
                <div class="card-body">
                    <h5 class="card-title">${pokemon.name}</h5>
                    <p class="card-text">Height: ${pokemon.height}</p>
                    <p class="card-text">Weight: ${pokemon.weight}</p>
                    <p class="card-text">Types: ${pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
                    <p class="card-text">Abilities: ${pokemon.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ')}</p>
                </div>
            </div>
        `;
    };
});
