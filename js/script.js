const card_atutomatico = document.querySelector(".container_pokemon")

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
  
}

const create_pokemon_card = (poke) => {
    
    console.log(poke)

    const card_div = document.createElement('div')
    card_div.classList(".card_pokemon")

    const name = poke.name[0].toUpperCase() + pokemonConut.name.slice(i)
    const id = poke.id.tostring().padStart(3, '0')

    const type = poke.types.map(type => type.type.name)
    console.log(type)

    const innerHTML = `
        <img class="pokemon_img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/717.png" alt="">

        <h1>
            <span class="pokemon_nunber">#857</span>
            <span class="pokemon_name">yveltal</span>
        </h1>

        <div class="pokemon_type">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/17.png" alt="">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/3.png" alt="">
        </div>
    
    `


    card_div.classList(".card_pokemon")

}


getPokemons()
