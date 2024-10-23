const pokemonConut  = 150;

const fetchPokemon = async (pokemons) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemons}`);
  
    const data = await APIResponse.json();
    console.log(data)
    return data;
}

const getPokemons = async () => {
    for (let i = 1; i <= pokemonConut; i++){
        await fetchPokemon(i)
    }

}


getPokemons()