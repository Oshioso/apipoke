const poke_container = document.querySelector(".container_pokemon");
const pokemonCount = 100;

const getPokemons = async () => {
    for (let i = 1; i <= pokemonCount; i++) {
        await fetchPokemon(i);
    }
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
            console.log(type)
            return { name: type.type.name, iconUrl: typeIconUrl }; // Retorna nome e URL do ícone
        })
    );

    createPokemonCard(data, typesInfo);
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

getPokemons();
