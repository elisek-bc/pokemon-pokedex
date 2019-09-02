const form = document.querySelector("form");
const input = document.getElementById("poke-search");
const searchButton = document.getElementById("search-button");
const imageScreen = document.getElementById("display");

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
console.log(pokeSpecies);

searchButton.addEventListener('click', () => {
    const results = pokeSpecies.filter((specimen)=> {
        //return name.includes(input.value);
        return specimen.name === input.value;
    });

    nameBox.innerHTML = results[0].name;
    input.value="";

    const pokeSpeciesData = fetchData(`https://pokeapi.co/api/v2/pokemon/${results[0].name}`);
    console.log(pokeSpeciesData);

});
