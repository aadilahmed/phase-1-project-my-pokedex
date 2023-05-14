/* Fetches Pokémon data from local db to render on page */
fetch(`http://localhost:3000/pokemon/`)
.then(response => response.json())
.then(pokemonData => { 
    pokemonData.forEach(pokemon => {
    let card = renderPokemon(pokemon);
    document.querySelector("#pokemon-collection").appendChild(card);
    })
}) 

/* Builds a Pokémon card and appends to the DOM */
function renderPokemon(pokemon){
    let card = document.createElement('div');
    card.className = 'card';

    let pokeName = document.createElement('h2');
    const capitalized = pokemon.name.charAt(0).toUpperCase() + 
    pokemon.name.slice(1);
    pokeName.textContent = `#${pokemon.id} ${capitalized}`;
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

    /* Changes Pokémon status to 'caught' */
    card.querySelector('.caught-btn').addEventListener('click', (e) => {
        pokemon.caught = true;
        updatePokemon(pokemon, {"caught":pokemon.caught})
        .then((pokemonData) => {
            disableCaughtButton(card)
        });
    }); 

    return card;
}

/* Implements creation of nickname functionality */
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
        e.preventDefault();
        addHyperlink.style.display = 'none';
        form.style.display = 'block'
    }) 
    
    removeHyperlink.addEventListener('click', (e) => {
        e.preventDefault();
        removeHyperlink.style.display = 'none';
        addHyperlink.style.display = 'block';
        pokeNickname.style.display = 'none';
        updatePokemon(pokemon, {"nickname":""});
    })
    
    if(pokemon.nickname.length === 0){
        pokeNickname.style.display = 'none';
        removeHyperlink.style.display = 'none';
    }
    else {
        setNickname(pokemon, pokeNickname, form, removeHyperlink, addHyperlink); 
    }
    
    /* Handles form submission and updating of both DOM and database */
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        updatePokemon(pokemon, {"nickname":e.target.nickname.value})
        .then((pokemonData) => {
            setNickname(pokemonData, pokeNickname, form, removeHyperlink, addHyperlink);
        })     
    })

    container.append(form, removeHyperlink, pokeNickname, addHyperlink);
    
    return container;
}
/* Patches new data into db.json */
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
/* Disables caught button functionality */
function disableCaughtButton(card) {
    card.querySelector('.caught-btn').disabled = true;
    card.querySelector('.caught-btn').innerText = "Caught!";
    card.style["background-color"] = "#caedcc";
}
/* Sets nickname and handles hyperlink display */
function setNickname(pokemon, pokeNickname, form, removeHyperlink, addHyperlink) {
    pokeNickname.textContent = pokemon.nickname;
    form.style.display = 'none';
    pokeNickname.style.display = 'block';
    removeHyperlink.style.display = 'block';
    addHyperlink.style.display = 'none';
}