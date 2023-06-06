let pokemon;
let pokemonFiltrati;
//*fetch per poter estrapolare i dati
fetch("pokemon.json-master/pokedex.json")
  .then((response) => response.json())
  .then((data) => {
    //*usando lo slice, abbiamo preso un nuovo array che comprendesse
    //*i pokemon di prima generazione(da 0 a 150)
    pokemon = data.slice(0, 151);
    console.log(pokemon);
    generatePokemon(pokemon);
  })
  .catch((err) => {
    console.log(err, "OH NOES, C'E' UN ERRORE");
  });

//*metodo per generare le card pokemon
function generatePokemon(pokemon) {
  let pokedex = document.querySelector("#pokedex");
  pokedex.innerHTML = "";
  pokemon.map((value) => {
    const card = `<div class="card"> 
            <h2>${value.name.english}</h2> 
            <img src="pokemon.json-master/images/${formatId(value.id)}.png" style="width:250px" /> 
        </div>`;
    pokedex.insertAdjacentHTML("beforeend", card);
  });
}

//*metodo per combaciare l'id con src immagini
function formatId(id) {
  /* console.log(id.toString().length) */
  if (id.toString().length == 1) {
    return `00${id}`;
  } else if (id.toString().length == 2) {
    return `0${id}`;
  } else {
    return id;
  }
}


//*Metodo per filtrare le ricerche: per nome e tipo di pokemon, da migliorare
//TODO: trovare un modo per cercare i nomi dei pokemon con la lettera minuscola
//TODO: sistemare la condizione if, non si riesce a filtrare i pokemon per tipo
const searchBar = document.querySelector("#search-bar");
searchBar.addEventListener("keyup", (event) => {
  let pokemonFiltrati = [];
  if (event.target.value.startsWith("type:")) {
    const value = event.target.value.replace("type:", "");
    pokemonFiltrati = pokemon.filter((typeFilter) => {
      return typeFilter.type.indexOf(value) != 1;
    });
  } else {
    console.log(pokemonFiltrati);
    pokemonFiltrati = pokemon.filter((pokemonFilter) => {
      return pokemonFilter.name.english.startsWith(event.target.value);
    });
  }
  generatePokemon(pokemonFiltrati);

});

