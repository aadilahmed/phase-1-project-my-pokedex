let promises = initializeFetchArray();

Promise.all(promises)
.then(results => results.forEach(pokemonObj => {
    console.log(pokemonObj.name); 
     let pokemon = {
        name:pokemonObj.name,
        image:pokemonObj.sprites.other["official-artwork"].front_default,
        caught:false,
        nickname:""
    }

    let card = document.createElement('div');
    card.className = 'card';
    let pokeName = document.createElement('h2');
    pokeName.textContent = pokemon.name;
    let pokeNickname = document.createElement('p');
    pokeNickname.textContent = pokemon.nickname;
    let pokeImage = document.createElement('img');
    pokeImage.className = 'pokemon-image'
    pokeImage.src = pokemon.image;

    card.append(pokeName);
    card.append(pokeNickname);
    card.append(pokeImage);

    document.querySelector("#pokemon-collection").appendChild(card); 
 })
); 

function initializeFetchArray(){
    let promises = [];
    for(let i = 0; i < 10; i++) {
        promises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${i+1}`)
        .then(response => response.json()));
    }

    return promises;
}