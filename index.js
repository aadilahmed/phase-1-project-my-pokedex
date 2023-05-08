let promises = initializeFetchArray();

Promise.all(promises)
.then(results => results.forEach(pokemonObj => {
    let pokemon = {
        name:pokemonObj.name,
        number:pokemonObj.id,
        image: pokemonObj.sprites.front_default,
        caught:false,
        nickname:""
    }

    let card = renderCard(pokemon);
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

function renderCard(pokemon){
    let card = document.createElement('div');
    card.className = 'card';

    let pokeName = document.createElement('h2');
    const capitalized = pokemon.name.charAt(0).toUpperCase() + 
    pokemon.name.slice(1);
    pokeName.textContent = `#${pokemon.number} ${capitalized}`;
    pokeName.className = 'name';

    let pokeNickname = document.createElement('h3');
    pokeNickname.textContent = pokemon.nickname;
    pokeNickname.style.display = 'none';

    let pokeImage = document.createElement('img');
    pokeImage.className = 'pokemon-image'
    pokeImage.src = pokemon.image;

    let havePoke = pokemon.caught;

    let caughtBtn = document.createElement('button');
    caughtBtn.className = 'caught-btn';
    caughtBtn.innerText = ' Add to Pokédex '; 

    card.append(pokeName);
    card.append(pokeNickname);
    card.append(pokeImage); 
    card.append(caughtBtn);

    card.querySelector('.caught-btn').addEventListener('click', (e) => {
        havePoke = true;      
        e.target.disabled = true;
        e.target.innerText = "  Caught!  "
    }); 

    return card;
}
