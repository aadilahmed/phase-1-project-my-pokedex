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

    let card = createCard(pokemon);
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

function createCard(pokemon){
    let card = document.createElement('div');
    card.className = 'card';

    let pokeName = document.createElement('h2');
    const capitalized = pokemon.name.charAt(0).toUpperCase() + 
    pokemon.name.slice(1);
    pokeName.textContent = capitalized;

    let pokeNickname = document.createElement('p');
    pokeNickname.textContent = pokemon.nickname;

    let pokeImage = document.createElement('img');
    pokeImage.className = 'pokemon-image'
    pokeImage.src = pokemon.image;

    let caughtBtn = document.createElement('button');
    caughtBtn.className = 'caught-btn';
    caughtBtn.innerText = 'Caught!';

    card.append(pokeName);
    card.append(pokeNickname);
    card.append(pokeImage); 
    card.append(caughtBtn);

    return card;
}