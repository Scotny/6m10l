import { pokemons } from "./pokemons.js";

let main = document.querySelector("main");

function createPokemon(params) {
  let card = document.createElement("div");
  card.classList.add("card");
  main.appendChild(card);

  let p_index = document.createElement("p");
  p_index.classList.add("index");
  p_index.innerHTML = params?.num;
  card.appendChild(p_index);

  let h2 = document.createElement("h2");
  h2.innerHTML = params?.name;
  card.appendChild(h2);

  let img = document.createElement("img");
  img.src = params?.img;
  card.appendChild(img);

  let h3 = document.createElement("h3");
  h3.innerHTML = `${params?.type[0] || ""} ${params?.type[1] || ""}`;
  card.appendChild(h3);

  let candy = document.createElement("p");
  candy.classList.add("card_p");
  candy.innerHTML = `Candy count: ${params?.candy_count || "?"}`;
  card.appendChild(candy);

  let weight = document.createElement("p");
  weight.classList.add("card_p");
  if (params?.weight && params.weight.includes(".")) {
    let weightParts = params.weight.split(".");
    params.weight = weightParts.join(",");
  }
  weight.innerHTML = `${params?.weight}`;
  card.appendChild(weight);

  let h4 = document.createElement("h4");
  h4.innerHTML = `${params?.weaknesses[0] || ""} ${
    params?.weaknesses[1] || ""
  } ${params?.weaknesses[2] || ""} ${params?.weaknesses[3] || ""} ${
    params?.weaknesses[4] || ""
  } ${params?.weaknesses[5] || ""} ${params?.weaknesses[6] || ""} ${
    params?.weaknesses[7] || ""
  }`;
  card.appendChild(h4);

  let spawn = document.createElement("p");
  spawn.classList.add("spawn");
  spawn.innerHTML = `${params?.spawn_time}`;
  card.appendChild(spawn);
}

pokemons.forEach((pokemon) => {
  createPokemon(pokemon);
});

let input = document.querySelector("input");
let all = document.getElementById("all");
let search = document.getElementById("search");
let select = document.querySelector("select");

search.addEventListener("click", () => {
  main.innerHTML = "";
  pokemons.forEach((pokemon) => {
    if (pokemon.name.includes(input.value)) {
      createPokemon(pokemon);
    }
  });
});

select.addEventListener("input", () => {
  main.innerHTML = "";
  let sortedPokemons;
  if (select.value === "az") {
    sortedPokemons = pokemons.sort((a, b) => a?.name.localeCompare(b?.name));
  } else if (select.value === "za") {
    sortedPokemons = pokemons.sort((a, b) => b?.name.localeCompare(a?.name));
  } else if (select.value === "low") {
    sortedPokemons = pokemons.sort(
      (a, b) =>
        parseFloat(a?.weight.replace(",", ".")) -
        parseFloat(b?.weight.replace(",", "."))
    );
  } else if (select.value === "high") {
    sortedPokemons = pokemons.sort(
      (a, b) =>
        parseFloat(b?.weight.replace(",", ".")) -
        parseFloat(a?.weight.replace(",", "."))
    );
  }
  sortedPokemons.forEach((pokemon) => {
    createPokemon(pokemon);
  });
});

all.addEventListener("click", () => {
  main.innerHTML = "";
  let allPokemons = pokemons.sort((a, b) => a?.num - b?.num);
  allPokemons.forEach((pokemon) => {
    createPokemon(pokemon);
  });
});
