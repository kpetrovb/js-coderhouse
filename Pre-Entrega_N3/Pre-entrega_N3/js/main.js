/****CODIGO MAIN****/
/*
inputTotal      = getIntegerInput (MSG_INPUT_TOT);
inputDo         = getIntegerInput (MSG_INPUT_DO);
inputBooking    = getIntegerInput (MSG_INPUT_BOOKING);

console.log ("Usted ingreso: " + inputTotal + " Puntos totales + " + inputDo + " Salidas Digitales + " + inputBooking + "% Porcentaje de reserva"); //Con proposito durante el desarrollo.
*/
//Creo el array de objetos y lo inicializo con los datos conocidos. En un futuro, si se amplia la oferta de controladores, se puede agregar dinamicamente al array.
const controllerArr = [];
for (let i = 0; i < maxControllers; i++) controllerArr.push (new Controlador (controllerNames[i], ubArr[i], doArr[i], 0));

const tableControllers = document.getElementById("tbodyControladores");

console.log(controllerArr);
console.log(tableControllers);
renderizarTabla ();



//Pido ingresar la cantidad de stock que hay de cada controlador
//for (let i = 0; i < controllerArr.length; i++) controllerArr[i].cantidad = getIntegerInput (MSG_INPUT_CANT + controllerArr[i].nombre);
//renderizarTabla (controllerArr, tableControllers);
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
    //alert ("El aplicativo actual no determina combinaciones de controladores.");
}else{
    //alert ("El controlador correspondiente es: " + chosenControllersArr[0].nombre);
    for (el of controllerArr)
    {
        if (el.nombre === chosenControllersArr[0].nombre) el.cantidad--;
    }
    //console.log (chosenControllersArr[0]);
}