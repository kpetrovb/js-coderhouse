const ubMpc15 = 8;
const ubMpc18 = 10;
const ubMpc24 = 20;
const ubMpc36 = 28;
const doMpc15 = 7;
const doMpc18 = 8;
const doMpc24 = 4;
const doMpc36 = 8;
const ubArr = [ubMpc15, ubMpc18, ubMpc24, ubMpc36];
const doArr = [doMpc15, doMpc18, doMpc24, doMpc36];
const controllerNames = ["MP-C 15", "MP-C 18", "MP-C 24", "MP-C 36"]
const maxControllers = 4;

/****DEFINICIÓN DE MENSAJES PARA INTERACCIÓN CON EL USUARIO****/
const MSG_INPUT_TOT = "Ingrese la cantidad de puntos totales que requiere el proyecto"
const MSG_INPUT_DO = "Ingrese la cantidad de salidas digitales que requiere el proyecto"
const MSG_INPUT_BOOKING = "Ingrese el procentaje de reserva que quiere considerar"
const MSG_INPUT_CANT = "Ingrese la cantidad de stock que existe actualmente del "

/****VARIABLES GLOBALES****/
let inputTotal = null;
let inputDo = null;
let inputBooking = null;

/****DEFINICION DE CLASES****/
class Controlador {
    constructor (nombre, universal, digital, cantidad)
    {
        this.nombre = nombre;
        this.universal = universal;
        this.digital = digital;
        this.cantidad = cantidad; 
        this.chosen = false;
    }
}

/****DEFINICION DE FUNCIONES****/
function getIntegerInput (msg)
{
    let input = null;
    do{
        input = parseInt (prompt (msg));
    }while (isNaN (input));

    return input;
}

/****CODIGO MAIN****/
inputTotal      = getIntegerInput (MSG_INPUT_TOT);
inputDo         = getIntegerInput (MSG_INPUT_DO);
inputBooking    = getIntegerInput (MSG_INPUT_BOOKING);

console.log ("Usted ingreso: " + inputTotal + " Puntos totales + " + inputDo + " Salidas Digitales + " + inputBooking + "% Porcentaje de reserva"); //Con proposito durante el desarrollo.

//Creo el array de objetos y lo inicializo con los datos conocidos. En un futuro, si se amplia la oferta de controladores, se puede agregar dinamicamente al array.
const controllerArr = [];
for (let i = 0; i < maxControllers; i++) controllerArr.push (new Controlador (controllerNames[i], ubArr[i], doArr[i], 0));

//Pido ingresar la cantidad de stock que hay de cada controlador
for (let i = 0; i < controllerArr.length; i++) controllerArr[i].cantidad = getIntegerInput (MSG_INPUT_CANT + controllerArr[i].nombre);

//Calculo la cantidad de entradas universales requeridas, y ademas las salidas digitales, considerando la reserva solicitada.
let ubPoint = inputTotal - inputDo;
ubPoint = ubPoint + (ubPoint * (inputBooking / 100));
inputDo = inputDo + (inputDo * (inputBooking / 100));
//Redondeo al entero superior para asegurar el porcentaje de reserva.
ubPoint = Math.ceil (ubPoint);
inputDo = Math.ceil (inputDo);
inputTotal = ubPoint + inputDo; //Actualizo la cantidad total de puntos que requiere el proyecto.
console.log ("Puntos Universales: " + ubPoint + " | Salidas Digitales: " + inputDo);

//Filtro el Array original para quedarme solo con los controladores que tengo stock disponible
const filteredControllerArr = controllerArr.filter ((el) => el.cantidad > 0);
console.log (controllerArr);

//Pre selecciono los controladores que cumplen con los parametros requeridos.
filteredControllerArr.forEach ((el) => {
    if (el.universal >= ubPoint & el.digital >= inputDo) el.chosen = true;
});
console.log (filteredControllerArr);

const chosenControllersArr = filteredControllerArr.filter ((el) => el.chosen === true);
console.log (chosenControllersArr);

//Me aseguro que el primer elemento sea el controlador mas optimo.
chosenControllersArr.sort ((a, b) => {
    if (a.universal < b.universal) return -1;
    if (a.universal > b.universal) return 1;
    return 0;
});

//El controlador elegido es el primer elemento del array doblemente filtrado
//Valido que algun controlador cumpla con las condiciones.
if (chosenControllersArr.length == 0)
{
    alert ("El aplicativo actual no determina combinaciones de controladores.");
}else{
    alert ("El controlador correspondiente es: " + chosenControllersArr[0].nombre);
    for (el of controllerArr)
    {
        if (el.nombre === chosenControllersArr[0].nombre) el.cantidad--;
    }
    console.log (chosenControllersArr[0]);
}