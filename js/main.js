
//Defino el objeto que va a contener los datos
class Usuario {
    constructor(nombre, apellido, dni) {
        this.nombre = nombre.toUpperCase();
        this.apellido = apellido.toUpperCase();
        this.dni = parseInt(dni)
}
}


//Función para listar los datos (numeros o nombres) que se ingresan
function listarNombres() {
    let divListado = document.getElementById("divListado");
    const almacenados = JSON.parse(localStorage.getItem("Participantes"));
    for(const objeto of almacenados)
        divListado.children[0].innerHTML += `<p> Nombre: ${objeto.nombre} Apellido: ${objeto.apellido} DNI: ${objeto.dni} </p>`
}

function listarNumeros() {
    let divListado = document.getElementById("divListado");
    const almacenados = JSON.parse(localStorage.getItem("Numeros"));
    for(const numero of almacenados)
        divListado.children[0].innerHTML += `<p> Número: ${numero} </p>`
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

//Función para realizar sorteo de nombres
function sorteo() {
    let aleatorio = [];
    console.log(cantGanadores);
    for(let i=0; i < cantGanadores; i++){
        aleatorio[i] = Math.floor((Math.random()*(participantes.length))); //calcúlo un índice aleatorio.

        i >= 1 && (aleatorio[i] = validarAleatorio(aleatorio, participantes.length, i));

        //Muestro los ganadores en el DOM
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
function sorteoNumero() {
    let aleatorio = [];
    for(let i=0; i < cantGanadores; i++){
        aleatorio[i] = Math.floor((Math.random()*(numeros.length))); //calcúlo un índice aleatorio.

        i >= 1 && (aleatorio[i] = validarAleatorio(aleatorio, numeros.length, i));

        //Muestro los ganadores en el DOM
        let divListarGanadores = document.getElementById("divListarGanadores");
        divListarGanadores.innerHTML += `<div class="card text-center text-bg-danger mb-3">
                                            <div class="card-body">
                                                <h3> El ${i+1} ganador es el número: ${(numeros[aleatorio[i]] || "ERROR")} </h3>
                                            </div>
                                        </div>`
        document.body.appendChild(divListarGanadores);
    }
}

//-----------------------------------
//Programa Principal de la Aplicación
//-----------------------------------

//Definición de variables globales
const maximo = 1000;
const nombreValido = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
let cantGanadores = 0;
let tipo = 0;
let participantes = [];
let numeros = [];

//Comenzar con el sorteo
let btnComenzar = document.getElementById("btnComenzar");
btnComenzar.addEventListener("click", () => {
    let divPaso1 = document.getElementById("divPaso1");
    divPaso1.innerHTML =`<div class="card">
                            <div class="card-body">
                                <h4>Paso 1: Ingresar la cantidad de ganadores que tendrá el sorteo (Máximo 5)</h4>
                                <form class="form-group row m-3 text-center" id="formGanadores">
                                    <div class="col-sm-3">
                                        <input type="number" class="form-control col-3" id="inputGanadores">
                                    </div>
                                    <div class="col-sm-2">
                                        <input type="submit" id="submitGanadores" class="btn btn-secondary" value="Enviar">
                                    </div>
                                </form>
                            </div>
                        </div>`
    
    //Obtengo por eventos la cantidad de ganadores de mi sorteo
    let formGanadores = document.getElementById("formGanadores");
    formGanadores.addEventListener("submit", (e) => {
        e.preventDefault();
        let divGanadores = document.getElementById("divGanadores");
        let submitGanadores = document.getElementById("submitGanadores");
        let divTipoSorteo = document.getElementById("divTipoSorteo");
        let formulario = e.target;
        if ((formulario.children[0].children[0].value <= 0) || (formulario.children[0].children[0].value > 5)){
            Toastify({
                text: "La cantidad de ganadores debe ser un número entre 1 y 5",
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
        else{
            cantGanadores = formulario.children[0].children[0].value;
            localStorage.setItem("cantGanadores", cantGanadores);
            divGanadores.innerHTML =`<div class="card text-center text-bg-danger">
                                        <div class="card-body">
                                            <h4> El sorteo tendrá ${(cantGanadores || "Error en la cantidad de ganadores")} ganadores</h4>
                                        </div>
                                    </div>`;
            submitGanadores.disabled = true;
            divTipoSorteo.innerHTML =`<div class="card">
                                        <div class="card-body">
                                            <h4>Paso 2: Ingresar el tipo de sorteo a realizar</h4>
                                            <form class="form-group m-3" id="formTipoSorteo">
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="radio" name="tipo" value="1" selected required>
                                                    <label class="form-check-label" for="tipo">Nombres </label>
                                                </div>
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="radio" name="tipo" value="2" required>
                                                    <label class="form-check-label" for="tipo">Números </label>
                                                </div>
                                                <input class="btn btn-secondary" type="submit" id="submitTipo" value="Seleccionar">
                                            </form>
                                        </div>
                                    </div>`
        }
        //Obtengo por eventos el tipo de sorteo a realizar   
        let formTipoSorteo = document.getElementById("formTipoSorteo")
        formTipoSorteo.addEventListener("submit", (e) => {
            e.preventDefault();
            let divCargaNombres = document.getElementById("divCargaNombres");
            let divCargaNumeros = document.getElementById("divCargaNumeros");
            let divSorteoNombres = document.getElementById("sortearNombres");
            let divSorteoNumeros = document.getElementById("sortearNumeros");

            let valor = parseInt(document.querySelector('input[name="tipo"]:checked').value);

            //console.log(valor)
            switch(valor){
                case (1):
                    divCargaNombres.style.display = "block";
                    divSorteoNombres.style.display = "block";
                    divCargaNumeros.style.display = "none";
                    divSorteoNumeros.style.display = "none";
                    break;
                case (2):
                    divCargaNumeros.style.display = "block";
                    divSorteoNumeros.style.display = "block";
                    divCargaNombres.style.display = "none";
                    divSorteoNombres.style.display = "none";
                    break;
                default:
                    Toastify({
                        text: "ERROR. NO SE INGRESO NINGUNA OPCIÓN",
                        duration: 3000,
                        close: true,
                        gravity: "top", // `top` or `bottom`
                        position: "center", // `left`, `center` or `right`
                        stopOnFocus: true, // Prevents dismissing of toast on hover
                        style: {
                          background: "linear-gradient(to right, #f00000, #dc281e)",
                        },
                    }).showToast();
                    break;
            }
        });
    });
})

//Realizar la carga de los participantes
let formCargaNombre = document.getElementById("formCargaNombre");
formCargaNombre.addEventListener("submit", (e) => {
    e.preventDefault();
    let formulario = new FormData(e.target);
    const participante = new Usuario (formulario.get("nombre"), formulario.get("apellido"), formulario.get("dni"))
    participantes.push(participante)
    localStorage.setItem("Participantes", JSON.stringify(participantes))
    formCargaNombre.reset()
    Toastify({
        text: "Participante ingresado correctamente",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #348f50, #56b4d3)",
        },
    }).showToast();
})

//Realizar la carga de los números
let formCargaNumero = document.getElementById("formCargaNumeros");
formCargaNumero.addEventListener("submit", (e) => {
    e.preventDefault();
    let formulario = new FormData(e.target);
    const numero = formulario.get("numero");
    numeros.push(numero);
    localStorage.setItem("Numeros", JSON.stringify(numeros));
    formCargaNumero.reset();
    Toastify({
        text: "Número ingresado correctamente",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #348f50, #56b4d3)",
        },
    }).showToast();
})

//Mostrar/ocultar participantes ingresados
let btnListarNombres = document.getElementById("btnListarNombres");
btnListarNombres.addEventListener("click",() => {
    let divListado = document.getElementById("divListado");
    divListado.style.display == "none" ? (divListado.style.display = "block", btnListarNombres.innerHTML = "Ocultar participantes") : (divListado.style.display = "none", btnListarNombres.innerHTML = "Ver participantes");
    divListado.children[0].innerHTML = `<h4>Listado de participantes</h4>`;
    listarNombres();
})

//Mostrar/ocultar números ingresados
let btnListarNumeros = document.getElementById("btnListarNumeros");
btnListarNumeros.addEventListener("click",() => {
    let divListado = document.getElementById("divListado");
    divListado.style.display == "none" ? (divListado.style.display = "block", btnListarNumeros.innerHTML = "Ocultar números") : (divListado.style.display = "none", btnListarNumeros.innerHTML = "Ver números");
    divListado.children[0].innerHTML = `<h4>Listado de números</h4>`;
    listarNumeros();
})

//Realizar sorteo
let btnSortearNombres = document.getElementById("btnSortearNombre");
let btnSortearNumeros = document.getElementById("btnSortearNumero");
btnSortearNombres.addEventListener("click", sorteo);
btnSortearNumeros.addEventListener("click", sorteoNumero);


