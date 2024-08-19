import { fetchPokemonAbilities } from './api.js';

document.addEventListener('DOMContentLoaded', async function () {
    try {
        const abilities = await fetchPokemonAbilities();
        displayAbilities(abilities.results);
    } catch (error) {
        document.getElementById('abilities-list').innerHTML = '<p class="text-danger">Failed to load Pokémon abilities.</p>';
    }

    const displayAbilities = (abilities) => {
        const abilitiesList = document.getElementById('abilities-list');
        abilitiesList.innerHTML = abilities.map(ability => `
            <div class="col-md-4 mb-3">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${ability.name}</h5>
                        <a href="ability-details.html?ability=${ability.name}" class="btn btn-primary">View Details</a>
                    </div>
                </div>
            </div>
        `).join('');
    };
});
