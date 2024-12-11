/****CODIGO MAIN****/

//Creo el array de objetos y lo inicializo con los datos conocidos. En un futuro, si se amplia la oferta de controladores, se puede agregar dinamicamente al array.
const controllerArr = [];
for (let i = 0; i < maxControllers; i++) controllerArr.push (new Controlador (controllerNames[i], ubArr[i], doArr[i], 0));
guardarEnLS("ListaControladores", controllerArr);

const tableControllers = document.getElementById("tbodyControladores");

renderizarTabla ();

/**
 * 
 */
const projectConfig = document.getElementById("projectConfig");

projectConfig.addEventListener ("submit", analizar);
