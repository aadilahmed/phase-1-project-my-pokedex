fetch("https://pokeapi.co/api/v2/pokemon/?limit=10")
.then(response => response.json())
.then(pokemonContainerList => {
    return fetch(pokemonContainerList.results[0].url);
})
.then(response => response.json())
.then(pokemonObj => {
    console.log(pokemonObj.height);
});