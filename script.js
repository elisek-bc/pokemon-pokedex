const form = document.querySelector("form");
const input = document.getElementById("poke-search");
const searchButton = document.getElementById("search-button");
const pokeNumberBox = document.getElementById("poke-number");
const typeBox = document.getElementById("types");
const imageScreen = document.getElementById("displayImage");

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

// Search on click
searchButton.addEventListener('click', () => {
    // for every species, return the ones that match the input
    const results = pokeSpecies.filter((specimen)=> {
        const lowercaseInput = input.value.toLowerCase();
        return specimen.name === lowercaseInput;
    });

    // no matches
    if (results[0] === undefined){
        nameBox.style.color = "#CC0000";
        nameBox.innerHTML = "No matching Pokemon found";
        movesBox.innerHTML = "";
        nameBox.style.borderBottom = "none";
        pokeNumberBox.innerHTML = "";
        typeBox.innerHTML = "";
        imageScreen.src="";
        imageScreen.alt="";
    
    // matches
    } else {
        nameBox.style.color = "black";
        nameBox.innerHTML = results[0].name.toUpperCase();
        nameBox.style.borderBottom = "1px solid black"
        input.value="";

        // fetch particular species data
        const pokeSpeciesData = fetchData(`https://pokeapi.co/api/v2/pokemon/${results[0].name}`);

        movesBox.innerHTML = "";
        const list = document.createElement('ul');
        movesBox.append(list);

        // show moves 
        pokeSpeciesData.moves.map((move) => {
            const listEl = document.createElement('li');
            listEl.innerHTML = move.move.name;
            list.append(listEl);
        })

        // show image
        imageScreen.src = pokeSpeciesData.sprites.front_default;
        imageScreen.alt = `${results[0].name}-image`;

        // show index
        const gameIndex = pokeSpeciesData.game_indices[4].game_index;
        pokeNumberBox.querySelector('p').innerHTML = gameIndex;
        
        // show types
        typeBox.innerHTML="";
        pokeSpeciesData.types.map((item) => {
            console.log(item.type.name);
            const divType = document.createElement('div');

            switch (item.type.name) {
                case "normal": divType.style.backgroundColor = "#A8A77A";
                break;
                case "fighting": divType.style.backgroundColor = "#C22E28";
                break;
                case "flying": divType.style.backgroundColor = "#A98FF3";
                break;
                case "poison": divType.style.backgroundColor = "#A33EA1";
                break;
                case "ground": divType.style.backgroundColor = "#E2BF65";
                break;
                case "rock": divType.style.backgroundColor = "#B6A136";
                break;
                case "bug": divType.style.backgroundColor = "#A6B91A";
                break;
                case "ghost": divType.style.backgroundColor = "#735797";
                break;
                case "steel": divType.style.backgroundColor = "#B7B7CE";
                break;
                case "fire": divType.style.backgroundColor = "#EE8130";
                break;
                case "water": divType.style.backgroundColor = "#6390F0";
                break;
                case "grass": divType.style.backgroundColor = "#7AC74C";
                break;
                case "electric": divType.style.backgroundColor = "#F7D02C";
                break;
                case "psychic": divType.style.backgroundColor = "#F95587";
                break;
                case "ice": divType.style.backgroundColor = "#96D9D6";
                break;
                case "dragon": divType.style.backgroundColor = "#6F35FC";
                break;
                case "dark": divType.style.backgroundColor = "#705746";
                break;
                case "fairy": divType.style.backgroundColor = "#D685AD";
                break;
            }
            divType.innerHTML = item.type.name;
            typeBox.append(divType);
        });
    };
});