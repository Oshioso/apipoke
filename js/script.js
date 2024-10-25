const poke_container = document.querySelector(".container_pokemon")

const pokemonConut  = 40;



const getPokemons = async () => {
    for (let i = 1; i <= pokemonConut; i++){
        await fetchPokemon(i)
    }

}

const fetchPokemon = async (id) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  
    const data = await APIResponse.json();

    create_pokemon_card(data)

    //.sprites.type[0].url
  
}

const create_pokemon_card = (poke) => {
    
    console.log(poke.types[0].type.url)

    const card_div = document.createElement('div')
    card_div.classList.add("card_pokemon")

    const name = poke.name[0].toUpperCase() + poke.name.slice(1)
    const id = poke.id.toString().padStart(3, '0')

    const type = poke.types.map(type => type.type.name)
    console.log(type)

    const pokeinnerHTML = `
        <img class="pokemon_img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png" alt="${name}">

        <h1>
            <span class="pokemon_nunber">#${id}</span>
            <span class="pokemon_name">${poke.name}</span>
        </h1>

        <div class="pokemon_type">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/17.png" alt="">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/3.png" alt="">
        </div>
    
    `
    card_div.innerHTML = pokeinnerHTML

    card_div.classList.add("card_pokemon")

    poke_container.appendChild(card_div)

}


getPokemons()
