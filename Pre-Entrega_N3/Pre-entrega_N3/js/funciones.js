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
const nColumnas = 4;
let renderAgain = false;

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

function renderizarTabla ()
{
    
    tableControllers.innerText = "";

    for (el of controllerArr) 
    {
        const tr            = document.createElement("tr");
        const tdNombre      = document.createElement("td");
        const tdUniversal   = document.createElement("td");
        const tdDigital     = document.createElement("td");
        const tdCantidad    = document.createElement("td");
        
        tdNombre.innerText      = `${el.nombre}`;
        tdUniversal.innerText   = `${el.universal}`;
        tdDigital.innerText     = `${el.digital}`;
        
        const spanCantidad = document.createElement("span");
        spanCantidad.innerText  = `${el.cantidad}`;
        spanCantidad.addEventListener("click", () => {
            clickSpanCantidad(tdCantidad, spanCantidad, el);
        });

        tdCantidad.append(spanCantidad);

        tr.append(tdNombre, tdUniversal, tdDigital, tdCantidad);
        tableControllers.append(tr);
    }
}


function clickSpanCantidad(td, span, controller) 
{    
    const inputCantidad = document.createElement("input");
    inputCantidad.type = "text";
    inputCantidad.value = controller.cantidad;
    
    inputCantidad.addEventListener("change", () => {
        
        controller.cantidad = inputCantidad.value;
        renderizarTabla();    
    });

    
    td.append(inputCantidad);
    
    span.className = "ocultar-elemento";
}


/**
 * 
 */