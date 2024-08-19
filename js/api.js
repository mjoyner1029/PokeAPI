const BASE_URL = 'https://pokeapi.co/api/v2';

const cache = {};

// Fetch Pokémon data by name or ID
const fetchPokemon = async (identifier) => {
    try {
        const cacheKey = `pokemon-${identifier}`;
        if (cache[cacheKey]) {
            return cache[cacheKey];
        }
        const response = await fetch(`${BASE_URL}/pokemon/${identifier}`);
        if (!response.ok) throw new Error(`Pokémon not found: ${response.statusText}`);
        const data = await response.json();
        cache[cacheKey] = data;
        return data;
    } catch (error) {
        console.error('Error fetching Pokémon:', error);
        throw error;
    }
};

// Fetch Pokémon types
const fetchPokemonTypes = async () => {
    try {
        const cacheKey = 'pokemon-types';
        if (cache[cacheKey]) {
            return cache[cacheKey];
        }
        const response = await fetch(`${BASE_URL}/type`);
        if (!response.ok) throw new Error(`Failed to fetch types: ${response.statusText}`);
        const data = await response.json();
        cache[cacheKey] = data;
        return data;
    } catch (error) {
        console.error('Error fetching Pokémon types:', error);
        throw error;
    }
};

// Fetch Pokémon abilities
const fetchPokemonAbilities = async () => {
    try {
        const cacheKey = 'pokemon-abilities';
        if (cache[cacheKey]) {
            return cache[cacheKey];
        }
        const response = await fetch(`${BASE_URL}/ability`);
        if (!response.ok) throw new Error(`Failed to fetch abilities: ${response.statusText}`);
        const data = await response.json();
        cache[cacheKey] = data;
        return data;
    } catch (error) {
        console.error('Error fetching Pokémon abilities:', error);
        throw error;
    }
};

// Fetch Pokémon moves
const fetchPokemonMoves = async () => {
    try {
        const cacheKey = 'pokemon-moves';
        if (cache[cacheKey]) {
            return cache[cacheKey];
        }
        const response = await fetch(`${BASE_URL}/move`);
        if (!response.ok) throw new Error(`Failed to fetch moves: ${response.statusText}`);
        const data = await response.json();
        cache[cacheKey] = data;
        return data;
    } catch (error) {
        console.error('Error fetching Pokémon moves:', error);
        throw error;
    }
};

// Fetch Pokémon by generation
const fetchPokemonsByGeneration = async (generation) => {
    try {
        const cacheKey = `generation-${generation}`;
        if (cache[cacheKey]) {
            return cache[cacheKey];
        }

        const generationRanges = {
            1: { start: 1, end: 151 },
            2: { start: 152, end: 251 },
            3: { start: 252, end: 386 },
            4: { start: 387, end: 493 },
            5: { start: 494, end: 649 },
            6: { start: 650, end: 721 },
            7: { start: 722, end: 809 },
            8: { start: 810, end: 898 }
        };

        const { start, end } = generationRanges[generation];
        if (!start || !end) throw new Error('Invalid generation');

        const response = await fetch(`${BASE_URL}/pokemon?limit=1000`);
        if (!response.ok) throw new Error(`Failed to fetch Pokémon: ${response.statusText}`);
        const data = await response.json();

        const filteredPokemons = data.results.filter(pokemon => {
            const id = parseInt(pokemon.url.split('/').slice(-2, -1)[0], 10);
            return id >= start && id <= end;
        });

        cache[cacheKey] = filteredPokemons;
        return filteredPokemons;
    } catch (error) {
        console.error('Error fetching Pokémon by generation:', error);
        throw error;
    }
};

// Fetch Pokémon details by move name
const fetchMoveDetails = async (moveName) => {
    try {
        const cacheKey = `move-${moveName}`;
        if (cache[cacheKey]) {
            return cache[cacheKey];
        }
        const response = await fetch(`${BASE_URL}/move/${moveName}`);
        if (!response.ok) throw new Error(`Move not found: ${response.statusText}`);
        const data = await response.json();
        cache[cacheKey] = data;
        return data;
    } catch (error) {
        console.error('Error fetching move details:', error);
        throw error;
    }
};

// Fetch Pokémon details by ability name
const fetchAbilityDetails = async (abilityName) => {
    try {
        const cacheKey = `ability-${abilityName}`;
        if (cache[cacheKey]) {
            return cache[cacheKey];
        }
        const response = await fetch(`${BASE_URL}/ability/${abilityName}`);
        if (!response.ok) throw new Error(`Ability not found: ${response.statusText}`);
        const data = await response.json();
        cache[cacheKey] = data;
        return data;
    } catch (error) {
        console.error('Error fetching ability details:', error);
        throw error;
    }
};

// Fetch Pokémon details by type name
const fetchTypeDetails = async (typeName) => {
    try {
        const cacheKey = `type-${typeName}`;
        if (cache[cacheKey]) {
            return cache[cacheKey];
        }
        const response = await fetch(`${BASE_URL}/type/${typeName}`);
        if (!response.ok) throw new Error(`Type not found: ${response.statusText}`);
        const data = await response.json();
        cache[cacheKey] = data;
        return data;
    } catch (error) {
        console.error('Error fetching type details:', error);
        throw error;
    }
};

export {
    fetchPokemon,
    fetchPokemonTypes,
    fetchPokemonAbilities,
    fetchPokemonMoves,
    fetchPokemonsByGeneration,
    fetchMoveDetails,
    fetchAbilityDetails,
    fetchTypeDetails
};
