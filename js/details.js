import { fetchPokemon } from './api.js';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const pokemonId = urlParams.get('id');

document.addEventListener('DOMContentLoaded', async function () {
    try {
        const pokemon = await fetchPokemon(pokemonId);
        displayPokemonDetails(pokemon);
    } catch (error) {
        document.getElementById('pokemon-details').innerHTML = '<p class="text-danger">Failed to load Pokémon details.</p>';
    }

    const displayPokemonDetails = (pokemon) => {
        document.getElementById('pokemon-details').innerHTML = `
            <div class="card">
                <img src="${pokemon.sprites.front_default}" class="card-img-top" alt="${pokemon.name}">
                <div class="card-body">
                    <h5 class="card-title">${pokemon.name}</h5>
                    <p class="card-text">Height: ${pokemon.height}</p>
                    <p class="card-text">Weight: ${pokemon.weight}</p>
                    <p class="card-text">Types: ${pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
                    <p class="card-text">Abilities: ${pokemon.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ')}</p>
                    <p class="card-text">Stats: ${pokemon.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join(', ')}</p>
                </div>
            </div>
        `;
    };
});
