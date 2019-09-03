const form = document.querySelector("form");
const input = document.getElementById("poke-search");
const searchButton = document.getElementById("search-button");
const pokeNumberBox = document.getElementById("poke-number");

let nameBox = document.getElementById("name");
let movesBox = document.getElementById("moves");

// Reusable function that GETs the data with MXL_req (thanks to Olivier)
function fetchData (url) {
    const requests = new XMLHttpRequest();
    requests.open('GET', url, false);
    requests.send();
    return (JSON.parse(requests.response));
}

// Gets the full Poke Json data.
const pokeData = fetchData("https://pokeapi.co/api/v2/generation/1/");
const xhttp = new XMLHttpRequest();

const pokeSpecies = pokeData.pokemon_species;

searchButton.addEventListener('click', () => {
    const results = pokeSpecies.filter((specimen)=> {
        //return name.includes(input.value);
        const lowercaseInput = input.value.toLowerCase();
        return specimen.name === lowercaseInput;
    });

    nameBox.innerHTML = results[0].name;
    input.value="";

    const pokeSpeciesData = fetchData(`https://pokeapi.co/api/v2/pokemon/${results[0].name}`);

    movesBox.innerHTML = "";
    const list = document.createElement('ul');
    movesBox.append(list);
    pokeSpeciesData.moves.map((move) => {
        const listEl = document.createElement('li');
        listEl.innerHTML = move.move.name;
        list.append(listEl);
    }
    )
    console.log(pokeSpeciesData.sprites.front_default);
    const imageScreen = document.getElementById("displayImage");
    imageScreen.src = pokeSpeciesData.sprites.front_default;
    imageScreen.alt = `${results[0].name}-image`;

    const gameIndex = pokeSpeciesData.game_indices[4].game_index;
    
    pokeNumberBox.querySelector('p').innerHTML = gameIndex;
});
