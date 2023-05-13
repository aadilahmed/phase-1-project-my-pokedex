let promises = initializeFetchArray();

Promise.all(promises)
.then(results => results.forEach(pokemonObj => {
    let pokemon = {
        name:pokemonObj.name,
        id: pokemonObj.id,
        number:pokemonObj.id,
        image: pokemonObj.sprites.front_default,
        caught:false,
        nickname:""
    }

    createPokemon(pokemon);
    let card = renderPokemon(pokemon);
    document.querySelector("#pokemon-collection").appendChild(card);
 })); 

function initializeFetchArray() {
    let promises = [];
    for(let i = 0; i < 151; i++) {
        promises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${i+1}`)
        .then(response => response.json()));
    }

    return promises;
}

function renderPokemon(pokemon){
    let card = document.createElement('div');
    card.className = 'card';

    let pokeName = document.createElement('h2');
    const capitalized = pokemon.name.charAt(0).toUpperCase() + 
    pokemon.name.slice(1);
    pokeName.textContent = `#${pokemon.number} ${capitalized}`;
    pokeName.className = 'name';

    let pokeNickname = document.createElement('h3');
    pokeNickname.className = 'pokeNickname'
    pokeNickname.textContent = pokemon.nickname;
    pokeNickname.style.display = 'none';

    let pokeImage = document.createElement('img');
    pokeImage.className = 'pokemon-image'
    pokeImage.src = pokemon.image;

    let havePoke = pokemon.caught;

    let caughtBtn = document.createElement('button');
    caughtBtn.className = 'caught-btn';
    caughtBtn.innerText = ' Add to Pokédex '; 
    
    let container = createNickname(pokemon, pokeNickname);

    card.append(pokeName, container, pokeNickname, pokeImage, caughtBtn);

    if(havePoke) {
        card.querySelector('.caught-btn').disabled = true;
        card.querySelector('.caught-btn').innerText = "Caught!";
    }

    card.querySelector('.caught-btn').addEventListener('click', (e) => {
        card.querySelector('.caught-btn').disabled = true;
        card.querySelector('.caught-btn').innerText = "Caught!";
        pokemon.caught = true;
        updateCard(pokemon);
    }); 

    return card;
}

function createNickname(pokemon, pokeNickname) {
    let container = document.createElement('div');
    container.className = 'container';

    let form = document.createElement('form');
    form.className = 'add-nickname-form';

    let hyperlink = document.createElement('a');
    hyperlink.className = 'add-nickname';
    hyperlink.setAttribute('href',"javacsript:void(0);");
    hyperlink.innerText = 'Add nickname'
    hyperlink.style.display = 'block'

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
    
    form.append(textbox, submit);

    form.style.display = 'none';

    hyperlink.addEventListener('click', (e) => {
        hyperlink.style.display = 'none';
        form.style.display = 'block'
    })   
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        fetch(`http://localhost:3000/pokemon/${pokemon.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          "nickname": e.target.nickname.value
          })
        })
        .then((response) => response.json())
        .then((pokemonData) => {
            pokeNickname.textContent = pokemonData.nickname;
            form.style.display = 'none';
            pokeNickname.style.display = 'block';
        })        
    })

    container.append(form);
    container.append(hyperlink);  
    
    return container;
}

function createPokemon(pokemon) {
    fetch("http://localhost:3000/pokemon", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(pokemon)
  }).catch(err => console.log(err));
}

function updateCard(pokemon) {
     fetch(`http://localhost:3000/pokemon/${pokemon.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          "caught": pokemon.caught
          })
        })
        .then((response) => response.json());        
}