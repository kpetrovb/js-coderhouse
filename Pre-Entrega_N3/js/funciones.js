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
function getIntegerInput (msg) //Funcion fuera de uso por usar DOM.
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
    for (let i = 0; i < maxControllers; i++)
    {
        const tr            = document.createElement("tr");

        const tdNombre      = document.createElement("td");
        const tdUniversal   = document.createElement("td");
        const tdDigital     = document.createElement("td");
        const tdCantidad    = document.createElement("td");

        
        tdNombre.innerText      = `${controllerArr[i].nombre}`;
        tdUniversal.innerText   = `${controllerArr[i].universal}`;
        tdDigital.innerText     = `${controllerArr[i].digital}`;
        
        const spanCantidad = document.createElement("span");
        spanCantidad.innerText  = `${controllerArr[i].cantidad}`;
        spanCantidad.addEventListener("click", () => {
            clickSpanCantidad(tdCantidad, spanCantidad, controllerArr[i]);           
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
        
        controller.cantidad = parseInt(inputCantidad.value);
        inputCantidad.value = "";
        renderizarTabla();    
    });

    td.append(inputCantidad);
    
    span.className = "ocultar-elemento";
}

function selectChosen ()
{
    //Levanto el array desde local storage
    const arrLS = obtenerDeLS("ControladoresAptos");

    if (arrLS.length == 0)
        {
            //
            const tag = document.getElementById("competenciaExcedida");
            tag.innerText = "El aplicativo actual no determina combinaciones de controladores."
        }else{
            const tag = document.getElementById("competenciaExcedida");
            tag.innerText = ""
            for (el of controllerArr)
            {
                if (el.nombre === arrLS[0].nombre) 
                {    
                    el.cantidad--;
                
                    renderizarTabla();
                    //Aca necesito encontrar el td correspondiente al controlador buscado..
                    const finalTable = document.getElementById("tbodyControladores");
                    //console.log(finalTable);
                    const filas = finalTable.querySelectorAll("tr"); //Levanto todos los tr

                    for (el of filas)
                    {
                        console.log(el);
                        const td = el.querySelector ("td");
                        if (td.textContent === arrLS[0].nombre)
                        {
                            const tdOfChosen = el.querySelectorAll ("td").forEach(celda => {
                                celda.className = "controladorElegido";
                            });
                            continue;
                            //console.log(tdOfChosen);
                            //break;
                        }
                        const tdOfChosen = el.querySelectorAll ("td").forEach(celda => {
                            celda.className = "controladorNoApto";
                        });
                    }
                    /*Voy a probar recorrerlo de otra forma
                    filas.forEach ( (filas) => {
                        const td = filas.querySelector ("td");
                        if (td.textContent === chosenControllersArr[0].nombre) console.log ("BINGO");
                    })*/

                }
            }
        }
}

function analizar (evt)
{
    evt.preventDefault();

    inputTotalGet      = document.getElementById("inputTotal");
    inputDoGet         = document.getElementById("inputDo");
    inputBookingGet    = document.getElementById("inputBooking");

    inputTotal = parseInt(inputTotalGet.value);
    inputDo = parseInt(inputDoGet.value);
    inputBooking = parseInt(inputBookingGet.value);

    inputTotalGet.value = "";
    inputDoGet.value = "";
    inputBookingGet.value = "";

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
    //console.log (controllerArr);

    //Pre selecciono los controladores que cumplen con los parametros requeridos.
    filteredControllerArr.forEach ((el) => {
        if (el.universal >= ubPoint & el.digital >= inputDo) el.chosen = true;
    });
    //console.log (filteredControllerArr);

    const chosenControllersArr = filteredControllerArr.filter ((el) => el.chosen === true);
    //console.log (chosenControllersArr);

    //Me aseguro que el primer elemento sea el controlador mas optimo.
    chosenControllersArr.sort ((a, b) => {
        if (a.universal < b.universal) return -1;
        if (a.universal > b.universal) return 1;
        return 0;
    });

    //Luego de hacer todo el analisis, mando el array de controladores aptos al Local Storage
    guardarEnLS("ControladoresAptos", chosenControllersArr);

    //El controlador elegido es el primer elemento del array doblemente filtrado
    //Valido que algun controlador cumpla con las condiciones.
    selectChosen();
}

/**
 * FUNCIONES LOCAL STORAGE
 */
function guardarEnLS(clave, valor) {
    const valorJSON = JSON.stringify(valor);

    localStorage.setItem(clave, valorJSON);
}

function transformarLocalStorage(valorJSON) {
    if(valorJSON === null) {
        return null;
    }

    const arr = [];

    for(const el of valorJSON) {
        arr.push(
            new Controlador(
                el.nombre,
                el.universal,
                el.digital,
                el.cantidad,
                el.chosen,
            )
        )
    }

    return arr;
}

function obtenerDeLS(clave) {
    return transformarLocalStorage(
        JSON.parse(
            localStorage.getItem(clave)
        )
    ) /*|| [
        for (el of objeto)
        {
            new Controlador el.nombres
        }
        new Producto("Tomates", 20, 2),
        new Producto("Lechuga", 30, 3),
        new Producto("Yogurt", 50, 4),
    ];*/
}