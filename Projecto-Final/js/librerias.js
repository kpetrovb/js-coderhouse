const DateTime = luxon.DateTime;

function updateTime()
{
    const ahora = DateTime.now().setLocale('es');
    const ahoraString = ahora.toFormat ("'Son las ' HH:mm:ss ' del ' dd ' de ' LLLL");
    document.getElementById ("hora").textContent = ahoraString; 
}

setInterval (updateTime, 1000);

updateTime();
