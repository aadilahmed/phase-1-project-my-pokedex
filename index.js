fetch(`http://localhost:3000/pokemon/`)
.then(response => response.json())
.then(pokemonData => { 
    pokemonData.forEach(pokemon => {
    let card = renderPokemon(pokemon);
    document.querySelector("#pokemon-collection").appendChild(card);
    })
}) 

function renderPokemon(pokemon){
    let card = document.createElement('div');
    card.className = 'card';

    let pokeName = document.createElement('h2');
    const capitalized = pokemon.name.charAt(0).toUpperCase() + 
    pokemon.name.slice(1);
    pokeName.textContent = `#${pokemon.number} ${capitalized}`;
    pokeName.className = 'name';

    let pokeImage = document.createElement('img');
    pokeImage.className = 'pokemon-image'
    pokeImage.src = pokemon.image;

    let caughtBtn = document.createElement('button');
    caughtBtn.className = 'caught-btn';
    caughtBtn.innerText = ' Add to Pokédex '; 
    
    let container = createNickname(pokemon);

    card.append(pokeName, container, pokeImage, caughtBtn);

    if(pokemon.caught) {
        disableCaughtButton(card)
    }

    card.querySelector('.caught-btn').addEventListener('click', (e) => {
        pokemon.caught = true;
        updatePokemon(pokemon, {"caught":pokemon.caught})
        .then((pokemonData) => {
            disableCaughtButton(card)
        });
    }); 

    return card;
}

function createNickname(pokemon) {
    let container = document.createElement('div');
    container.className = 'container';

    let form = document.createElement('form');
    form.className = 'add-nickname-form';

    let addHyperlink = document.createElement('a');
    addHyperlink.className = 'add-nickname';
    addHyperlink.setAttribute('href',"javacsript:void(0);");
    addHyperlink.innerText = 'Add nickname'
    addHyperlink.style.display = 'block'

    let removeHyperlink = document.createElement('a');
    removeHyperlink.className = 'remove-nickname';
    removeHyperlink.setAttribute('href',"javacsript:void(0);");
    removeHyperlink.innerText = 'X';
    removeHyperlink.style.display = 'none';

    let textbox = document.createElement('input');
    textbox.setAttribute("type", "text");
    textbox.className = 'input-text';
    textbox.name = 'nickname';
    textbox.value = ''; 

    let submit = document.createElement('input');
    submit.setAttribute("type", "submit");
    submit.className = 'submit';
    submit.name = 'submit';
    submit.value = 'Save'; 

    let pokeNickname = document.createElement('h3');
    pokeNickname.className = 'pokeNickname'
    pokeNickname.textContent = pokemon.nickname;
    
    form.append(textbox, submit);

    form.style.display = 'none';

    addHyperlink.addEventListener('click', (e) => {
        addHyperlink.style.display = 'none';
        form.style.display = 'block'
    }) 
    
    removeHyperlink.addEventListener('click', (e) => {
        removeHyperlink.style.display = 'none';
        addHyperlink.style.display = 'block';
        pokeNickname.style.display = 'none';
    })
    
    if(pokemon.nickname.length === 0){
        pokeNickname.style.display = 'none';
        removeHyperlink.style.display = 'none';
    }
    else {
        pokeNickname.textContent = pokemon.nickname;
        form.style.display = 'none';
        pokeNickname.style.display = 'block';
        addHyperlink.style.display = 'none';   
        removeHyperlink.style.display = 'block';     
    }
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        updatePokemon(pokemon, {"nickname":e.target.nickname.value})
        .then((pokemonData) => {
            pokeNickname.textContent = pokemonData.nickname;
            form.style.display = 'none';
            pokeNickname.style.display = 'block';
            removeHyperlink.style.display = 'block';
        })     
    })

    container.append(form, removeHyperlink, pokeNickname, addHyperlink);
    
    return container;
}

function updatePokemon(pokemon, newValue) {
    return fetch(`http://localhost:3000/pokemon/${pokemon.id}`, {
       method: 'PATCH',
       headers: {
         'Content-Type': 'application/json',
         'Accept': 'application/json',
       },
       body: JSON.stringify(newValue)
       })
       .then((response) => response.json());        
}

function disableCaughtButton(card) {
    card.querySelector('.caught-btn').disabled = true;
    card.querySelector('.caught-btn').innerText = "Caught!";
    card.style["background-color"] = "#caedcc";
}