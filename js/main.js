//Defino el objeto que va a contener los datos
class Usuario {
    constructor(nombre, apellido, dni, edad, sexo) {
        this.nombre = nombre.toUpperCase();
        this.apellido = apellido.toUpperCase();
        this.dni = parseInt(dni)
    //    this.edad = parseInt(edad);
    //    this.sexo = sexo;
    }
/*    sumaIva() {
        this.precio = this.precio * 1.21;
    }*/
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
    }
}

function modificarNombre(participantes) {
    alert("Para ver la lista de participantes abra la consola con F12")

    for (let i=0; i < participantes.length; i++) {
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
        participantes[indice] = (new Usuario(nombre, apellido, dni));
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
    }
}

function modificarNumero(participantes) {
    alert("Para ver la lista de los números participantes abra la consola con F12")

    for (let i=0; i < participantes.length; i++) {
        console.log(`${i}  es el número: ${participantes[i]}`);
    }
    
    let indice = parseInt(prompt("Ingresar la posición del número a modificar. (Para salir ingrese 000)"));
    if (indice == 000){
        return participantes;
    }
    else{
        let numero = prompt("Ingrese el número");
        numero = validarNumero(numero);
        participantes[indice] = numero;
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
        alert (`El ganador número ${i + 1} es: ${participantes[aleatorio[i]].nombre} ${participantes[aleatorio[i]].apellido} DNI: ${participantes[aleatorio[i]].dni}`);
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

alert ("Bienvenido a la Aplicación de sorteos");

//Primero se consulta por la cantidad de ganadores
do{
    cantGanadores = parseInt(prompt("Ingrese la cantidad de ganadores (máximo 5)"));
    if (isNaN(cantGanadores)){
        alert ("La cantidad ingresada no es un número")
        ban1 = true;
    }
    else if ((cantGanadores <= 0) || (cantGanadores > 5)){
        alert ("La cantidad ingresada debe ser un número entre 1 y 5")
        ban1 = true;
    }
    else{
        ban1 = false;
    }
}while(ban1);

//Se consulta si se van a sortear nombres o números
do{
    tipo = parseInt(prompt ("Seleccione la opción deseada:\n 1. Realizar sorteo de nombres.\n 2. Realizar sorteo de números.\n"));
    if ((tipo === 1) || (tipo === 2)){
        ban2 = false;
    }
    else{
        alert ("No se seleccionó una opción correcta");
        ban2 = true;
    }
}while(ban2);


//Se realizará el ingreso de datos según la elección previa
switch(tipo){
    case (1):
        menuNombres (cantGanadores);
        //datos = ingresarNombre();
        break;
    case (2):
        menuNumeros (cantGanadores);
        //datos = ingresarNumero();
        break;
    default:
        alert ("ERROR. NO SE INGRESO NINGUNA OPCIÓN")
        break;
}
