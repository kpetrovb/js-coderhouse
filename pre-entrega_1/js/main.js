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
const controllerArr = ["MP-C 15", "MP-C 18", "MP-C 24", "MP-C 36"]
const maxControllers = 4;

/****DEFINICIÓN DE MENSAJES PARA INTERACCIÓN CON EL USUARIO****/
const MSG_INPUT_TOT = "Ingrese la cantidad de puntos totales que requiere el proyecto"
const MSG_INPUT_DO = "Ingrese la cantidad de salidas digitales que requiere el proyecto"
const MSG_INPUT_BOOKING = "Ingrese el procentaje de reserva que quiere considerar"

/****VARIABLES GLOBALES****/
let inputTotal = null;
let inputDo = null;
let inputBooking = null;

do
{
    inputTotal = parseInt (prompt (MSG_INPUT_TOT));
}while (isNaN(inputTotal));

do
{
    inputDo = parseInt (prompt (MSG_INPUT_DO));
}while (isNaN(inputDo));

do
{
    inputBooking = parseInt (prompt (MSG_INPUT_BOOKING));
}while (isNaN(inputBooking));
/*Los do...while anteriores podrian condensarse en una función que pida numeros y valide que lo ingresado fue un numero*/

console.log ("Usted ingreso: " + inputTotal + " Puntos totales + " + inputDo + " Salidas Digitales + " + inputBooking + "% Porcentaje de reserva");

let ubPoint = inputTotal - inputDo;

ubPoint = ubPoint + (ubPoint * (inputBooking / 100));
inputDo = inputDo + (inputDo * (inputBooking / 100));

let rsltUbArr = [];
let rsltDoArr = [];
for (let i = 0; i < maxControllers; i++)
{
    rsltUbArr[i] = ubPoint / ubArr[i];
    rsltDoArr[i] = inputDo / doArr[i];
}

let flagArr = [];
let flagCount = 0;
for (let i = 0; i < maxControllers; i++)
{
    if (rsltDoArr[i] <= 1 && rsltUbArr[i] <= 1)
    {
        console.log (flagCount);
        flagArr[i] = 1;
        flagCount++;
        
    }
}

console.log ("######" + flagCount + "  " + flagArr);

switch (flagCount)
{
    case 1:
        for (let i = 0; i < maxControllers; i++)
        {
            if (flagArr[i] == 1)
            { 
                console.log ("El controlador que aplica para el proyecto es: " + controllerArr[i]);
                alert ("El controlador que aplica para el proyecto es: " + controllerArr[i]);
                break;
            }
        }
        break;
    case 2:
        for (let i = 0; i < maxControllers; i++)
        {
            if (flagArr[i] == 1)
            { 
                console.log ("El controlador que aplica para el proyecto es: " + controllerArr[i]);
                alert ("El controlador que aplica para el proyecto es: " + controllerArr[i]);
                break;
            }
        }
        break;
    case 3:
        for (let i = 0; i < maxControllers; i++)
        {
            if (flagArr[i] == 1)
            { 
                console.log ("El controlador que aplica para el proyecto es: " + controllerArr[i]);
                alert ("El controlador que aplica para el proyecto es: " + controllerArr[i]);
                break;
            }
        }
        break;
    case 4:
        for (let i = 0; i < maxControllers; i++)
        {
            if (flagArr[i] == 1)
            { 
                console.log ("El controlador que aplica para el proyecto es: " + controllerArr[i]);
                break;
            }
        }
        break;
    default:
        alert ("Sus requerimientos no son soportados por la versión actual del aplicativo.");
        break;        
}

console.log ("Array de Ub's: ");
console.log (rsltUbArr);
console.log ("Array de DO's: ");
console.log (rsltDoArr);