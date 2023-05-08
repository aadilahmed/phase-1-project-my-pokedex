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
    
    let container = createNickname(pokeNickname);

    card.append(pokeName);
    card.append(container);
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

function createNickname(pokeNickname) {
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
    
    form.appendChild(textbox);
    form.appendChild(submit);

    form.style.display = 'none';

    hyperlink.addEventListener('click', (e) => {
        hyperlink.style.display = 'none';
        form.style.display = 'block'
    })   
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        pokeNickname.textContent = e.target.nickname.value;
        form.style.display = 'none';      
        pokeNickname.style.display = 'block';        
    })

    container.append(form);
    container.append(hyperlink);  
    
    return container;
}