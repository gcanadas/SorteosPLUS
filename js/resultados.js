let url = "https://randomuser.me/api/?results=1&seed=always&nat=es";
let selectGanadores = document.getElementById("selectGanadores");
let divUltimosGanadores = document.getElementById("divUltimosGanadores"); 

selectGanadores.addEventListener("input", () => {
    url = `https://randomuser.me/api/?results=${selectGanadores.value}&seed=always&nat=es`
});

setInterval(() => {fetch(url)
.then ((response) => response.json())
.then (data => {
    console.log(data.results[0]);
    divUltimosGanadores.innerHTML = "";
    for (let i = 0; i < (selectGanadores.value); i++) {
        console.log(data.results[i].name.first);
        console.log(data.results[i].picture.medium);
        const div = document.createElement('div')
        divUltimosGanadores.innerHTML += `
        <div class="col-sm-3 mb-3">
        <div class="card" style="width: 18rem;">
        <img class="card-img-top" src=${data.results[i].picture.large} alt="Card image cap">
        <div class="card-body">
          <p class="card-text">${data.results[i].name.first} ${data.results[i].name.last}</p>
        </div>
        </div>
        </div>`
    }
});}, 1000);

