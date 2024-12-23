/****CODIGO MAIN****/

//Cargo los array de controladores desde la API local

async function getStandartControllers () 
{
    try{
        const response = await fetch("json/controladores.json")
        const json = await response.json();
        // Recibimos el JSON parseado 

        //Cargo todos los array que utilizo en la programación con la información levantada desde el JSON.
        for (let i = 0; i < json.length; i++)
        {
            for (let j = 0; j < json[i].length; j++)
            {
                i === 0 && (controllerNames[j] = json[i][j]);
                i === 1 && (ubArr[j] = json[i][j]);
                i === 2 && (doArr[j] = json[i][j]);
            }
        }
    } catch (error) {
        // Capturamos posibles errores
        console.error("Error al cargar el JSON:", error);
    };
}

let tableControllers = null;
const controllerArr = [];
const projectConfig = document.getElementById("projectConfig");


async function ejecutarLogica () 
{
    await getStandartControllers();
    
    for (let i = 0; i < maxControllers; i++) controllerArr.push (new Controlador (controllerNames[i], ubArr[i], doArr[i], 0));
    tableControllers = document.getElementById("tbodyControladores");
    guardarEnLS("ListaControladores", controllerArr);
    
    renderizarTabla ();
    
    projectConfig.addEventListener ("submit", analizar);
}

ejecutarLogica ();






