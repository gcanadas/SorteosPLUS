
//Defino el objeto que va a contener los datos
class Usuario {
    constructor(nombre, apellido, dni, edad, sexo) {
        this.nombre = nombre.toUpperCase();
        this.apellido = apellido.toUpperCase();
        this.dni = parseInt(dni)
}
}

//Función para validar nombres
function validarNombre(nombre) {
    let ban;
    do{
        if (!nombreValido.test(nombre)) {
            alert ("No es un nombre válido");
            nombre = prompt ("Ingrese el nombre nuevamente");
            ban = true;
        }
        else{
            return nombre;
        }
    }while(ban);
}

//Función para ingresar nombres
function ingresarNombre(participante) {
    //Ingreso los datos hasta que se escriba ESC
    for(let i=0; i < maximo; i++ ){
        let nombre = prompt("Ingrese el " + (i+1) + "° nombre. (Para terminar la carga ingrese ESC.)");
        nombre = validarNombre(nombre);
        if (nombre == "ESC"){
            return participante;
        }
        else{
            let apellido = prompt("Ingrese el apellido");
            apellido = validarNombre(apellido);
            let dni = prompt("Ingrese DNI");

            participante.push (new Usuario(nombre, apellido, dni));
        }

    }
}

function buscarNombre(participantes) {
    buscar = prompt ("Ingrese nombre para realizar la busqueda");
    const resultado = participantes.filter((el) => el.nombre.includes(buscar.toUpperCase()));
    if (resultado == []) {
        alert("No se encontro ninguna coincidencia");
    }
    else {
        alert(`Se encontraron ${resultado.length} coincidencias.\n ${JSON.stringify(resultado)}`);
        //Muestro en el DOM los resultados
        let divBusqueda = document.createElement("div");
        divBusqueda.innerHTML = `<h2> Se encontraron ${resultado.length} coincidencias </h2>`;
        document.body.appendChild(divBusqueda);
    
        for (const buscar of resultado) {
            let divBusqueda = document.createElement("div");
            divBusqueda.innerHTML = `<h3> Nombre: ${buscar.nombre}. Apellido: ${buscar.apellido}. DNI: ${buscar.dni} </h3>`;
            document.body.appendChild(divBusqueda);
        }    
    }
}

function modificarNombre(participantes) {
    alert("La lista de participantes se mostrará a continuación")

    //Muestro en el DOM todos los nombres cargados
    for (let i=0; i < participantes.length; i++) {
        let divParticipantes = document.createElement("div");
        divParticipantes.innerHTML = `<h3> ${i+1}: Nombre: ${participantes[i].nombre}. Apellido: ${participantes[i].apellido}. DNI: ${participantes[i].dni} </h3>`;
        document.body.appendChild(divParticipantes);

        console.log(i + " " + " " + participantes[i].nombre + " " + participantes[i].apellido + " " + participantes[i].dni);
    }

    
    let indice = parseInt(prompt("Ingresar la posición del dato a modificar. (Para salir ingrese 000)"));
    if (indice == 000){
        return participantes;
    }
    else{
        let nombre = prompt("Ingrese el nombre");
        nombre = validarNombre(nombre);
        let apellido = prompt("Ingrese el apellido");
        apellido = validarNombre(apellido);
        let dni = prompt("Ingrese DNI");
        participantes[indice-1] = (new Usuario(nombre, apellido, dni));
        return participantes;
    }
}

//Función para validar números
function validarNumero(numero) {
    let ban;
    do{
        if (numero == "ESC"){
            return numero;
        } 
        else if (isNaN(numero)) {
            alert ("No se ingreso un número");
            numero = prompt ("Ingrese el número nuevamente");
            ban = true;
        }
        else{
            return numero;
        }
    }while(ban);
}

//Función para ingresar números
function ingresarNumero(participantes) {
    //Ingreso los numeros hasta que se ingrese ESC
    for(let i=0; i < maximo; i++ ){
        let numeros = prompt("Ingrese el " + (i+1) + " número. Para terminar la carga ingrese ESC.");
        numeros = validarNumero(numeros);
        if (numeros == "ESC"){
            return participantes;
        }
        else{
        participantes.push(numeros);
        }
    }
}

function buscarNumero(participantes) {
    buscar = parseInt(prompt ("Ingrese el número que desea buscar"));
    const resultado = participantes.filter((el) => el.includes(buscar));
    if (resultado == []) {
        alert("No se encontro ninguna coincidencia");
    }
    else {
        alert(`Se encontraron ${resultado.length} coincidencias.\n ${JSON.stringify(resultado)}`);

        //Muestro en el DOM los resultados
        let divBusqueda = document.createElement("div");
        divBusqueda.innerHTML = `<h2> Se encontraron ${resultado.length} coincidencias </h2>`;
        document.body.appendChild(divBusqueda);
    
        for (let i=0; i < resultado.length; i++) {
            let divBusqueda = document.createElement("div");
            divBusqueda.innerHTML = `<h3> Número: ${resultado[i]} </h3>`;
            document.body.appendChild(divBusqueda);
        }    
    }
}

function modificarNumero(participantes) {
    alert("Para ver la lista de los números participantes abra la consola con F12")

    for (let i=0; i < participantes.length; i++) {
        let divParticipantes = document.createElement("div");
        divParticipantes.innerHTML = `<h3> ${i+1}: Nombre: ${participantes[i].nombre}. Apellido: ${participantes[i].apellido}. DNI: ${participantes[i].dni} </h3>`;
        document.body.appendChild(divParticipantes);

        console.log(`${i}  es el número: ${participantes[i]}`);
    }
    
    let indice = parseInt(prompt("Ingresar la posición del número a modificar. (Para salir ingrese 000)"));
    if (indice == 000){
        return participantes;
    }
    else{
        let numero = prompt("Ingrese el número");
        numero = validarNumero(numero);
        participantes[indice-1] = numero;
        return participantes;
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

//Función para realizar sorteo de nombres
function sorteo(participantes, cantGanadores) {
    let aleatorio = [];
    for(let i=0; i < cantGanadores; i++){
        aleatorio[i] = Math.floor((Math.random()*(participantes.length))); //calcúlo un índice aleatorio.
        if(i >= 1){
            aleatorio[i] = validarAleatorio(aleatorio, participantes.length, i);
        }

        //Muestro los ganadores en el DOM
        let divGanadores = document.createElement("div");
        divGanadores.innerHTML = `<h3> El ganador número ${i+1} es: ${participantes[aleatorio[i]].nombre} ${participantes[aleatorio[i]].apellido}. DNI: ${participantes[aleatorio[i]].dni} </h3>`;
        document.body.appendChild(divGanadores);

        alert (`El ganador número ${i+1} es: ${participantes[aleatorio[i]].nombre} ${participantes[aleatorio[i]].apellido} DNI: ${participantes[aleatorio[i]].dni}`);
    }
}

//Función para realizar sorteo de números
function sorteoNumero(participantes, cantGanadores) {
    let aleatorio = [];
    for(let i=0; i < cantGanadores; i++){
        aleatorio[i] = Math.floor((Math.random()*(participantes.length))); //calcúlo un índice aleatorio.
        if(i >= 1){
            aleatorio[i] = validarAleatorio(aleatorio, participantes.length, i);
        }

        //Muestro los ganadores en el DOM
        let divGanadores = document.createElement("div");
        divGanadores.innerHTML = `<h3> El ${i+1} ganador es el número: ${participantes[aleatorio[i]]} </h3>`;
        document.body.appendChild(divGanadores);

        alert (`El ${i + 1} ganador es el número: ${participantes[aleatorio[i]]}`);
    }
}


function menuNombres(cantGanadores) {
    let eleccion = 0;
    let participantes = [];
    while (eleccion != 4) {
        eleccion = parseInt(prompt("Seleccione la opción deseada:\n 1. Ingresar participantes.\n 2. Buscar participante.\n 3. Modificar datos ingresados.\n 4. Realizar sorteo.\n"));
        switch(eleccion){
            case (1):
                participantes = ingresarNombre(participantes);
                break;
            case (2):
                buscarNombre(participantes);
                break;
            case (3):
                participantes = modificarNombre(participantes);
                break;
            case (4):
                sorteo(participantes,cantGanadores);
                break;
            default:
                alert ("ERROR. NO SE INGRESO UNA OPCIÓN CORRECTA")
                break;
        }
    }
}

function menuNumeros(cantGanadores) {
    let eleccion = 0;
    let participantes = [];
    while (eleccion != 4) {
        eleccion = parseInt(prompt("Seleccione la opción deseada:\n 1. Ingresar número.\n 2. Buscar número.\n 3. Modificar datos ingresados.\n 4. Realizar sorteo.\n"));
        switch(eleccion){
            case (1):
                participantes = ingresarNumero(participantes);
                break;
            case (2):
                buscarNumero(participantes);
                break;
            case (3):
                participantes = modificarNumero(participantes);
                break;
            case (4):
                sorteoNumero(participantes,cantGanadores);
                break;
            default:
                alert ("ERROR. NO SE INGRESO UNA OPCIÓN CORRECTA")
                break;
        }
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
let ban1;
let ban2;
let datos = [];
let participantes = [];
let numeros = [];


//Obtengo por eventos la cantidad de ganadores de mi sorteo
let formGanadores = document.getElementById("formGanadores");
formGanadores.addEventListener("submit", validarGanadores);

//Obtengo por eventos el tipo de sorteo a realizar
let formTipoSorteo = document.getElementById("formTipoSorteo")
formTipoSorteo.addEventListener("submit", validarTipo);

//Realizar la carga de los participantes
let formCarga = document.getElementById("formCarga");
formCarga.addEventListener("submit", (e) => {
    e.preventDefault();
    let formulario = new FormData(e.target);
    const participante = new Usuario (formulario.get("nombre"), formulario.get("apellido"), formulario.get("dni"))
    participantes.push(participante);
    console.log(participantes)
})

//Realizar la carga de los números
let formCarga2 = document.getElementById("formCarga2");
formCarga2.addEventListener("submit", (e) => {
    e.preventDefault();
    let formulario = new FormData(e.target);
    numeros.push(formulario.get("numero"));
    console.log(numeros);
})

//Realizar sorteo
let sortear = document.getElementById("sortear");
let sortearNumeros = document.getElementById("sortearNumero");
sortear.addEventListener("click", sorteo(participantes, document.getElementById("inputGanadores").value));
sortearNumeros.addEventListener("click", sorteoNumero(participantes, document.getElementById("inputGanadores").value));

function validarGanadores(e) {
    let divGanadores = document.getElementById("divGanadores");
    let submitGanadores = document.getElementById("submitGanadores");
    e.preventDefault();
    let formulario = e.target;

    if ((formulario.children[0].value <= 0) || (formulario.children[0].value > 5)){
        alert ("La cantidad de ganadores debe ser un número entre 1 y 5")
    }
    else{
        divGanadores.innerHTML = `<h3> El sorteo tendrá ${formulario.children[0].value} ganadores`;
        submitGanadores.disabled = true;

    }
}

function validarTipo (e) {
    e.preventDefault();
    let divCarga = document.getElementById("divCarga");
    let divCarga2 = document.getElementById("divCarga2");
    let divSorteo = document.getElementById("sortear");
    let divSorteo2 = document.getElementById("sortearNumero");


    let valor = parseInt(document.querySelector('input[name="tipo"]:checked').value);

    console.log(valor)
    switch(valor){
        case (1):
            divCarga.style.display = "block";
            divSorteo.style.display = "block";
            divCarga2.style.display = "none";
            divSorteo2.style.display = "none";
            break;
        case (2):
            divCarga2.style.display = "block";
            divSorteo2.style.display = "block";
            divCarga.style.display = "none";
            divSorteo.style.display = "none";
            break;
        default:
            alert ("ERROR. NO SE INGRESO NINGUNA OPCIÓN")
            break;
    }

}

