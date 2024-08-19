import { fetchPokemonMoves } from './api';

document.addEventListener('DOMContentLoaded', async function () {
    try {
        const moves = await fetchPokemonMoves();
        displayMoves(moves.results);
    } catch (error) {
        document.getElementById('moves-list').innerHTML = '<p class="text-danger">Failed to load Pokémon moves.</p>';
    }

    const displayMoves = (moves) => {
        const movesList = document.getElementById('moves-list');
        movesList.innerHTML = moves.map(move => `
            <div class="col-md-4 mb-3">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${move.name}</h5>
                        <a href="move-details.html?move=${move.name}" class="btn btn-primary">View Details</a>
                    </div>
                </div>
            </div>
        `).join('');
    };
});
