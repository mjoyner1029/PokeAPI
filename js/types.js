import { fetchPokemonTypes } from './api.js';

document.addEventListener('DOMContentLoaded', async function () {
    try {
        const types = await fetchPokemonTypes();
        displayTypes(types.results);
    } catch (error) {
        document.getElementById('types-list').innerHTML = '<p class="text-danger">Failed to load Pokémon types.</p>';
    }

    const displayTypes = (types) => {
        const typesList = document.getElementById('types-list');
        typesList.innerHTML = types.map(type => `
            <div class="col-md-4 mb-3">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${type.name}</h5>
                        <a href="type-details.html?type=${type.name}" class="btn btn-primary">View Details</a>
                    </div>
                </div>
            </div>
        `).join('');
    };
});
