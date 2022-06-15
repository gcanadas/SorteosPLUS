//Definición de variables globales
const nombreValido = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
let cantGanadores = 0;
let total = 0;
let participantes = [];
let sorteoID = "";
let url = "";

let divPaso1 = document.getElementById("divPaso1");
let divPaso2 = document.getElementById("divPaso2");
let divPaso3 = document.getElementById("divPaso3");
let divPaso4 = document.getElementById("divPaso4");
let divPeliculas = document.getElementById("divPeliculas");
let btnSorteoNombres = document.getElementById("btnSorteoNombres");
let btnSorteoNumeros = document.getElementById("btnSorteoNumeros");
let btnSorteoPeliculas = document.getElementById("btnSorteoPeliculas");


//Defino el objeto que va a contener los datos
class Usuario {
    constructor(nombre, apellido, dni) {
        this.nombre = nombre.toUpperCase();
        this.apellido = apellido.toUpperCase();
        this.dni = parseInt(dni)
}
}

//Defino expresiones regulares para validar los formularios
const expresiones = {
	ID: /^[a-zA-Z0-9\_\-]{4,10}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,20}$/, // Letras y espacios, pueden llevar acentos.
	//password: /^.{4,12}$/, // 4 a 12 digitos.
	//correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	dni: /^\d{6,8}$/ // 6 a 8 numeros.
}


//Funciones para listar los datos (numeros o nombres) que se ingresan
function listarNombres() {
    let divListado = document.getElementById("divListado");
    const almacenados = JSON.parse(localStorage.getItem(sorteoID));
    for(const objeto of almacenados)
        divListado.innerHTML += `<p class = "form_text"> Nombre: ${objeto.nombre}   Apellido: ${objeto.apellido}   DNI: ${objeto.dni} </p>`
}

function listarNumeros() {
    let divListado = document.getElementById("divListado");
    const almacenados = JSON.parse(localStorage.getItem("Numeros"));
    for(const numero of almacenados)
        divListado.innerHTML += `<p> Número: ${numero} </p>`
}

function agregarBotonSorteo(total){
    if(total > cantGanadores){
        divPaso4.innerHTML = `<div class="container-fluid p-4 contenedor_titulo">
                                <div class="row justify-content-center">
                                    <div class="col-sm-3 text-center">
                                        <button class="btn btn-danger mt-3" id="btnSortearNombre">Sortear Participantes</button>
                                    </div>
                                </div>
                            </div>`
    }
}

//Función para validar que los indices aleatorios no se repitan
function validarAleatorio(aleatorio, maximo, indice){ 
    while (true) {
        for(let i=0; i < indice; i++){
            if (aleatorio[indice] == aleatorio[i]){
                break;
            }
            else if (i == (indice - 1)){
                return aleatorio[indice];
            }
        }
        aleatorio[indice] = Math.floor((Math.random()*(maximo)));
    }
}

//Función para comprobar que los numeros sorteados no se repitan
function validarSorteoNumeros(rangoInicial,rangoFinal,ganador,indice){
    while (true) {
        for (let i=0; i < indice; i++){
            if(ganador[indice] == ganador[i]){
                break;
            }else if(i == (indice - 1)){
                return ganador[indice];
            }
        }
        ganador[indice] = Math.floor((Math.random() * (rangoFinal - rangoInicial + 1))) + rangoInicial;
    }
}

//Función para realizar sorteo de nombres
function sorteo() {
    let aleatorio = [];
    divListarGanadores.innerHTML = "";
    for(let i=0; i < cantGanadores; i++){
        aleatorio[i] = Math.floor((Math.random()*(participantes.length)));
        i >= 1 && (aleatorio[i] = validarAleatorio(aleatorio, participantes.length, i));
        let divListarGanadores = document.getElementById("divListarGanadores");
        divListarGanadores.innerHTML += `<div class="card text-center text-bg-danger mb-3">
                                            <div class="card-body">
                                                <h3> El ganador número ${i+1} es: ${(participantes[aleatorio[i]].nombre || "ERROR")} ${(participantes[aleatorio[i]].apellido || "ERROR")}. DNI: ${(participantes[aleatorio[i]].dni || "ERROR")} </h3>
                                            </div>
                                        </div>`
        document.body.appendChild(divListarGanadores);
    }
}

//Función para realizar sorteo de números
function sorteoNumero(rangoInicial, rangoFinal) {
    let aleatorio = [];
    divListarGanadores.innerHTML = "";
    for(let i=0; i < cantGanadores; i++){
        aleatorio[i] = Math.floor((Math.random() * (rangoFinal - rangoInicial + 1))) + rangoInicial;
        i >= 1 && (aleatorio[i] = validarSorteoNumeros(rangoInicial, rangoFinal, aleatorio, i));
        let divListarGanadores = document.getElementById("divListarGanadores");
        divListarGanadores.innerHTML += `<div class="card text-center text-bg-danger mb-3">
                                            <div class="card-body">
                                                <h3> El ${i+1} ganador es el número: ${(aleatorio[i])} </h3>
                                            </div>
                                        </div>`
        document.body.appendChild(divListarGanadores);
    }
}

function crearFormulario(){
    divPaso3.innerHTML = `<div class="container-fluid p-4 contenedor_titulo">
    <h3>Ingresar los participantes del sorteo</h3>
    <form class="form-group m-3" id="formCargaNombre">
      <div class="row justify-content-center my-2">
        <label class="col-sm-1 col-form-label py-0 form_text" for="nombre">Nombre: </label>
        <div class="col-sm-3">
          <input class="w-100 text-center form-control form-control-sm" type="text" name="nombre" id="nombre" placeholder="Ingrese el nombre" required>
        </div>
      </div>
      <div class="row justify-content-center my-2">
        <label class="col-sm-1 col-form-label py-0 form_text" for="apellido">Apellido: </label>
        <div class="col-sm-3">
          <input class="w-100 text-center form-control form-control-sm" type="text" name="apellido" id="apellido" placeholder="Ingrese el apellido" required>
        </div>
      </div>
      <div class="row justify-content-center my-2">
        <label class="col-sm-1 col-form-label py-0 form_text" for="dni">DNI: </label>
        <div class="col-sm-3">
          <input class="w-100 text-center form-control form-control-sm" type="number" name="dni" id="dni" placeholder="Ingrese el DNI" required>
        </div>
      </div>
      <div class="row justify-content-center my-2">
        <div class="col-sm-2 text-center">
          <input class="btn btn-primary mt-3"type="submit" id="submitParticipante" value="Guardar">
        </div>
      </div>
    </form>
    <div class="row justify-content-center my-2">
      <div class="col-sm-3 text-center">
        <button class="btn btn-secondary" id="btnListarNombres">Ver participantes guardados</button>
      </div>
    </div>
  </div>`
}

function buscarID(anteriorID) {
    let ban = false;
    for (let i = 0; i < localStorage.length; i++) {
        if(anteriorID === localStorage.key(i)){
            ban = true;
            break;
        }
    }
    if(ban){
        participantes = JSON.parse(localStorage.getItem(anteriorID));
        cantGanadores = localStorage.getItem(`cont${anteriorID}`);
        console.log(cantGanadores);
        sorteoID = anteriorID;
        crearFormulario();
        agregarBotonSorteo(participantes.length);
        Toastify({
            text: `Se encontro el sorteo con ID ${anteriorID}`,
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "linear-gradient(to right, #348f50, #56b4d3)",
            },
        }).showToast();
    }else {
        Toastify({
            text: `No se encontro el sorteo con ID ${anteriorID}`,
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "linear-gradient(to right, #f00000, #dc281e)",
            },
        }).showToast();
    }
}

async function recomendarPelicula (tipo){
        let titulo = '';
        let fecha = ';'
        let pagina = Math.floor((Math.random() * 50)) + 1;
        url = `https://api.themoviedb.org/3/${tipo}/popular?api_key=b6758256a44fe97ea09dba93d081ef56&language=es-MX&page=${pagina}`
        const respuesta = await fetch(url);
        if(tipo === 'movie'){
            titulo = "title";
            fecha = "release_date";
        }else{
            titulo = "name";
            fecha = "first_air_date";
        }
        if(respuesta.status === 200){
            const resultado = await respuesta.json();
            let peliculas = '';
			resultado.results.forEach(pelicula => {
				peliculas += `<div class="col-sm-3 my-2">
                                <div class="card" style="width: 18rem;">
                                    <img src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" class="card-img-top" alt="Poster de película">
                                    <div class="card-body">
                                        <h5 class="card-title">${pelicula[titulo]}</h5>
                                    </div>
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item">Fecha: ${(pelicula[fecha]||"Información no disponible")}</li>
                                        <li class="list-group-item">Popularidad: ${(pelicula.popularity||"Información no disponible")}</li>
                                        <li class="list-group-item">Puntaje: ${(pelicula.vote_average||"Información no disponible")}</li>
                                    </ul>
                                </div>
                            </div>`;
			});
            divPeliculas.innerHTML = peliculas;
        }
}

//-----------------------------------
//Programa Principal de la Aplicación
//-----------------------------------

//Selecciono el tipo de app a ejecutar
btnSorteoNombres.addEventListener("click", () => {
    btnSorteoNombres.className = "sorteo_Icons sorteo_Icons_Active";
    btnSorteoNumeros.className = "sorteo_Icons";
    btnSorteoPeliculas.className = "sorteo_Icons";
    divPaso1.innerHTML = `<div class="container p-4 contenedor_titulo">
                            <h3>¿Deseas realizar un sorteo nuevo o recuperar los datos de un sorteo anterior?</h3>
                            <div class="row justify-content-evenly">
                                <div class="col-3">
                                    <button class="btn btn-primary m-3" id="btnNuevoSorteo">Sorteo Nuevo</button>
                                </div>
                                <div class="col-3">
                                    <button class="btn btn-primary m-3" id="btnCargarAnterior">Cargar Anterior</button>
                                </div>
                            </div>
                        </div>`
    divListarGanadores.innerHTML = "";
    divPeliculas.innerHTML = "";
});

btnSorteoNumeros.addEventListener("click", () => {
    btnSorteoNumeros.className = "sorteo_Icons sorteo_Icons_Active";
    btnSorteoNombres.className = "sorteo_Icons";
    btnSorteoPeliculas.className = "sorteo_Icons";
    divPaso1.innerHTML = `<div class="container-fluid p-4 contenedor_titulo">
                            <h3>Indicar el rango de los valores a sortear</h3>
                            <div class="row justify-content-center align-items-center my-3">
                                <div class="col-sm-2">
                                    <input class="w-100 text-center form-control form-control-sm" type="number" name="rangoInicial" id="rangoInicial" value="0">
                                </div>
                                <div class="col-sm-1 img_rango"></div>
                                <div class="col-sm-2">
                                    <input class="w-100 text-center form-control form-control-sm" type="number" name="rangoFinal" id="rangoFinal" value="1">
                                </div>
                            </div>
                            <h3 class="mt-5">Indicar la cantidad de números a elegir (Máximo 5 números)</h3>
                            <div class="row justify-content-center align-items-center my-3">
                                <div class="col-sm-2">
                                    <input class="w-100 text-center form-control form-control-sm" type="number" name="inputGanadores" id="inputGanadores" value="1">
                                </div>
                            </div>
                            <div class="row justify-content-center">
                                <div class="col-sm-3 text-center">
                                    <button class="btn btn-danger mt-3" id="btnSortearNumeros">Elegir números ganadores</button>
                                </div>
                            </div>
                        </div>`
    divPaso2.innerHTML = "";
    divPaso3.innerHTML = "";
    divPaso4.innerHTML = "";
    divListarGanadores.innerHTML = "";
    divPeliculas.innerHTML = "";
});

btnSorteoPeliculas.addEventListener("click", () => {
    btnSorteoNombres.className = "sorteo_Icons";
    btnSorteoNumeros.className = "sorteo_Icons";
    btnSorteoPeliculas.className = "sorteo_Icons sorteo_Icons_Active";
    divPaso1.innerHTML = `<div class="container-fluid p-4 contenedor_titulo">
                            <h3>Indica que deseas que te recomendemos</h3>
                            <div class="row justify-content-evenly">
                                <div class="col-5 text-center">
                                    <button class="btn btn-primary m-3" id="btnSeries">Recomendar Series</button>
                                </div>
                                <div class="col-5 text-center">
                                    <button class="btn btn-primary m-3" id="btnPeliculas">Recomendar Peliculas</button>
                                </div>
                            </div>
                        </div>`
    divPaso2.innerHTML = "";
    divPaso3.innerHTML = "";
    divPaso4.innerHTML = "";
    divListarGanadores.innerHTML = "";
    divPeliculas.innerHTML = "";
});

//Agrego EventListeners para las diferentes partes agregadas
divPaso1.addEventListener("click", (e) => {
    if(e.target.id === 'btnNuevoSorteo') {
        divPaso2.innerHTML =`<div class="container-fluid p-4 contenedor_titulo">
                                <h3>Ingresar un ID y cantidad de ganadores para el sorteo (máximo 5)</h3>
                                <form class="form-group row m-3 justify-content-center" id="formCantGanadores">
                                    <div class="col-sm-3">
                                        <input type="text" class="form-control text-center" id="inputSorteoID" name="inputSorteoID" placeholder="Ingrese ID para el sorteo" required>
                                    </div>
                                    <div class="col-sm-2">
                                        <input type="number" class="form-control text-center" id="inputCantGanadores" name="inputCantGanadores" placeholder="Cantidad ganadores" required>
                                    </div>
                                    <div class="col-sm-1">
                                        <input type="submit" id="submitCantGanadores" class="btn btn-primary" value="Enviar">
                                    </div>
                                </form>
                            </div>`
    }else if(e.target.id === 'btnCargarAnterior') {
        divPaso2.innerHTML =`<div class="container-fluid p-4 contenedor_titulo">
                                <h3>Ingresar un ID para realizar la carga de los datos almacenados</h3>
                                <form class="form-group row m-3 justify-content-center" id="formSorteoID">
                                    <div class="col-sm-3">
                                        <input type="text" class="form-control text-center" id="inputSorteoID" placeholder="Ingrese ID del sorteo" required>
                                    </div>
                                    <div class="col-sm-1">
                                        <input type="submit" id="submitSorteoID" class="btn btn-primary" value="Buscar">
                                    </div>
                                </form>
                            </div>`
    }
});

divPaso1.addEventListener("click", (e) => {
    if(e.target.id === 'btnSortearNumeros'){
        let rangoInicial = document.getElementById("rangoInicial").value;
        let rangoFinal = document.getElementById("rangoFinal").value;
        let inputGanadores = document.getElementById("inputGanadores").value;
        if(rangoInicial > 0 && inputGanadores > 0 && (rangoFinal-rangoInicial) > inputGanadores){
            cantGanadores = parseInt(inputGanadores);
            sorteoNumero(parseInt(rangoInicial), parseInt(rangoFinal));
        }else{
            Toastify({
                text: "Revisar los valores ingresados (Rango inicial y final deben ser positivos)",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "center", 
                stopOnFocus: true,
                style: {
                    background: "linear-gradient(to right, #f00000, #dc281e)",
                },
            }).showToast();
        }
    }
});

divPaso1.addEventListener("click", (e) => {
    if(e.target.id === 'btnSeries'){
        url = "https://api.themoviedb.org/3/movie/550?api_key=b6758256a44fe97ea09dba93d081ef56";
        recomendarPelicula('tv');
    }else if(e.target.id ==='btnPeliculas'){
        url = "https://api.themoviedb.org/3/movie/550?api_key=b6758256a44fe97ea09dba93d081ef56";
        recomendarPelicula('movie');
    }
})

divPaso2.addEventListener('submit', (e) => {
    e.preventDefault();
    let campoID = false;
    let campoCantidad = false;
    if(e.target.id === "formCantGanadores" && e.target.children[1].children[0].value > 0 && e.target.children[1].children[0].value < 6){
        cantGanadores = e.target.children[1].children[0].value
        campoCantidad = true;
    }else if(e.target.id === "formCantGanadores"){
        Toastify({
            text: "La cantidad de ganadores debe ser un número entre 1 y 5",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "center",
            stopOnFocus: true,
            style: {
                background: "linear-gradient(to right, #f00000, #dc281e)",
            },
            }).showToast();
        campoCantidad = false;
    }
    if(expresiones.ID.test(e.target.children[0].children[0].value)) {
        sorteoID = e.target.children[0].children[0].value;
        campoID = true;
    } else {
        Toastify({
            text: "El ID del sorteo debe tener entre 4 y 10 caracteres (Mayusculas, minusculas y guiones bajos y medios",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "center",
            stopOnFocus: true,
            style: {
                background: "linear-gradient(to right, #f00000, #dc281e)",
            },
            }).showToast();
        campoID = false;
    }
    if(campoCantidad && campoID){
        localStorage.setItem(`cont${sorteoID}`, cantGanadores)
        crearFormulario();
    }
})

divPaso2.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(e.target.children[0].children[0].value)
    console.log(e.target.id)
    if(e.target.id === "formSorteoID"){
        buscarID(e.target.children[0].children[0].value)
    }
})

divPaso3.addEventListener('submit', (e) => {
    e.preventDefault();
    let campoNombre = false;
    let campoApellido = false;
    let campoDNI = false;
    let formulario = new FormData(e.target);
    if(expresiones.nombre.test(formulario.get("nombre"))){
        campoNombre = true;
    }else{
        Toastify({
            text: "El nombre del participante debe tener entre 1 y 20 caracteres (Solo puede contener letras y espacios)",
            duration: 4000,
            close: true,
            gravity: "top",
            position: "center",
            stopOnFocus: true,
            style: {
                background: "linear-gradient(to right, #f00000, #dc281e)",
            },
            }).showToast();
        campoNombre = false;
    }
    if(expresiones.nombre.test(formulario.get("apellido"))){
        campoApellido = true;
    }else{
        Toastify({
            text: "El apellido del participante debe tener entre 1 y 20 caracteres (Solo puede contener letras y espacios)",
            duration: 4000,
            close: true,
            gravity: "top",
            position: "center",
            stopOnFocus: true,
            style: {
                background: "linear-gradient(to right, #f00000, #dc281e)",
            },
            }).showToast();
        campoApellido = false;
    }
    if(expresiones.dni.test(formulario.get("dni"))){
        campoDNI = true;
    }else{
        Toastify({
            text: "El DNI del participante debe tener entre 6 y 8 números",
            duration: 4000,
            close: true,
            gravity: "top",
            position: "center",
            stopOnFocus: true,
            style: {
                background: "linear-gradient(to right, #f00000, #dc281e)",
            },
            }).showToast();
        campoDNI = false;
    }
    if(campoNombre && campoApellido && campoDNI){
        const participante = new Usuario (formulario.get("nombre"), formulario.get("apellido"), formulario.get("dni"))
        participantes.push(participante)
        localStorage.setItem(sorteoID, JSON.stringify(participantes))
        e.target.reset()
        total++;
        Toastify({
            text: "Participante ingresado correctamente",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "center",
            stopOnFocus: true,
            style: {
                background: "linear-gradient(to right, #348f50, #56b4d3)",
            },
        }).showToast();
        agregarBotonSorteo(total);
    }
})

//Mostrar/ocultar participantes ingresados
divPaso3.addEventListener("click",(e) => {
    if(e.target.id === 'btnListarNombres'){
        let divListado = document.getElementById("divListado");
        divListado.style.display == "none" ? (divListado.style.display = "block", e.target.innerHTML = "Ocultar participantes") : (divListado.style.display = "none", e.target.innerHTML = "Ver participantes");
        divListado.innerHTML = `<h3>Listado de participantes</h3>`;
        listarNombres();
    }
})

divPaso4.addEventListener("click", (e) => {
    if(e.target.id === "btnSortearNombre"){
        sorteo()
    }
})



