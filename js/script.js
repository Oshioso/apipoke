const poke_container = document.querySelector(".container_pokemon");
const typeFilter = document.getElementById("typeFilter");
const searchInput = document.getElementById("searchInput");
const pokemonCount = 150;
let allPokemonData = [];

const getPokemons = async () => {
    for (let i = 1; i <= pokemonCount; i++) {
        await fetchPokemon(i);
    }
    displayPokemons(allPokemonData);
};

// Função para obter todos os tipos de Pokémon e preencher o select
const getAllPokemonTypes = async () => {
    const response = await fetch('https://pokeapi.co/api/v2/type/');
    const data = await response.json();

    data.results.forEach(type => {
        if (!["unknown", "stellar"].includes(type.name)) { // Exclui os tipos 'unknown' e 'stellar'
            const option = document.createElement('option');
            option.value = type.name;
            option.textContent = type.name.charAt(0).toUpperCase() + type.name.slice(1);
            typeFilter.appendChild(option);
        }
    });
    
};

const fetchPokemon = async (id) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await APIResponse.json();

    // Itera sobre os tipos do Pokémon e faz uma nova requisição para cada tipo
    
    const typesInfo = await Promise.all(
        data.types.map(async (type) => {
            const typeResponse = await fetch(type.type.url);
            const typeData = await typeResponse.json();
            const typeIconUrl = typeData.sprites["generation-viii"]["sword-shield"].name_icon; // Captura o ícone do tipo específico
            return { name: type.type.name, iconUrl: typeIconUrl }; // Retorna nome e URL do ícone
        })
    );

    allPokemonData.push({ ...data, typesInfo }); // Armazena os dados do Pokémon
};

const createPokemonCard = (poke, typesInfo) => {
    const card_div = document.createElement('div');
    card_div.classList.add("card_pokemon");

    const name = poke.name[0].toUpperCase() + poke.name.slice(1);
    const id = poke.id.toString().padStart(3, '0');

    // Criando os ícones de tipo dinamicamente com URL do ícone específico
    const types = typesInfo.map(type => {
        return `<img src="${type.iconUrl}" alt="${type.name}">`;
    }).join("");

    const pokeinnerHTML = `
        <img class="pokemon_img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png" alt="${name}">
        <h1>
            <span class="pokemon_number">#${id}</span>
            <span class="pokemon_name">${name}</span>
        </h1>
        <div class="pokemon_type">
            ${types}
        </div>
    `;
    card_div.innerHTML = pokeinnerHTML;

   

    poke_container.appendChild(card_div);
};

const displayPokemons = (pokemonList) => {
    poke_container.innerHTML = ""; // Limpa o container
    pokemonList.forEach(pokemon => {
        createPokemonCard(pokemon, pokemon.typesInfo);
    });
};

typeFilter.addEventListener("change", () => {
    const selectedType = typeFilter.value;
    if (selectedType === "") {
        // Exibe todos os Pokémon se nenhum tipo estiver selecionado
        displayPokemons(allPokemonData);
    } else {
        // Filtra e exibe Pokémon pelo tipo selecionado
        const filteredPokemons = allPokemonData.filter(pokemon => 
            pokemon.typesInfo.some(type => type.name === selectedType)
        );
        displayPokemons(filteredPokemons);
    }
});

searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();

    const filteredPokemons = allPokemonData.filter(pokemon => {
        return (
            pokemon.name.toLowerCase().includes(searchTerm) || 
            pokemon.id.toString().includes(searchTerm)
        );
    });

    displayPokemons(filteredPokemons);
});

getAllPokemonTypes();
getPokemons();
