import { fetchPokemon } from './api.js';

document.addEventListener('DOMContentLoaded', function () {
    const team1Input = document.getElementById('team1');
    const team2Input = document.getElementById('team2');
    const battleButton = document.getElementById('battle-button');
    const resultContainer = document.getElementById('battle-result');

    battleButton.addEventListener('click', async () => {
        const team1Name = team1Input.value.toLowerCase();
        const team2Name = team2Input.value.toLowerCase();

        try {
            const team1Pokemon = await fetchPokemon(team1Name);
            const team2Pokemon = await fetchPokemon(team2Name);
            simulateBattle(team1Pokemon, team2Pokemon);
        } catch (error) {
            alert('Failed to simulate battle.');
        }
    });

    const simulateBattle = (pokemon1, pokemon2) => {
        // Basic simulation logic (you can enhance this)
        const team1Power = pokemon1.stats.reduce((total, stat) => total + stat.base_stat, 0);
        const team2Power = pokemon2.stats.reduce((total, stat) => total + stat.base_stat, 0);

        if (team1Power > team2Power) {
            resultContainer.innerHTML = `<p>${pokemon1.name} wins!</p>`;
        } else if (team1Power < team2Power) {
            resultContainer.innerHTML = `<p>${pokemon2.name} wins!</p>`;
        } else {
            resultContainer.innerHTML = `<p>It's a draw!</p>`;
        }
    };
});
