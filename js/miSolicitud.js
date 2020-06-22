// Botones de acciones
var botonGuardar = document.getElementById("botonGuardar");
var botonCancelar = document.getElementById("botonCancelar");
var botonPaginaPrincipal = document.getElementById("botonPaginaPrincipal");
var botonSolicitudes = document.getElementById("botonSolicitudes");
// Los 3 campos para llenar datos
var inputDescripcion = document.getElementById("inputDescripcion");
var inputFecha = document.getElementById("inputFecha");
var inputEstado = document.getElementById("inputEstado");
// Errores posibles
var errorIngresaCosasVacias = document.getElementById("errorIngresaCosasVacias");
var errorFechaInvalida = document.getElementById("errorFechaInvalida");
// Demás
var listaDeSolicitudes = Lockr.get('solicitudes');
var idSolicitudVieja = Lockr.get('nuevo');
var f = new Date();
const diaDeHoy = f.getFullYear()+"-"+("0" + (f.getMonth() + 1)).slice(-2) +"-"+("0" + (f.getDate())).slice(-2);

// Inicio de los campos
if(idSolicitudVieja == null){
    inputDescripcion.placeholder="Descripción de la solicitud"
    inputFecha.value = diaDeHoy
}
else{
    let solicitudVieja = buscarSolicitud(idSolicitudVieja)

    inputDescripcion.value = solicitudVieja.Descripción
    inputFecha.value = convertirStringEnDate(solicitudVieja.FechaSolicitud)
    inputEstado.value = solicitudVieja.Estado
}

//Acciones de botones
botonGuardar.addEventListener('click', () =>{
    errorIngresaCosasVacias.style.display = "none"
    errorFechaInvalida.style.display = "none"

    setTimeout('corroboracionDeDatosYRegistro()', 1000);
})

botonCancelar.addEventListener('click', () =>{
    Lockr.rm('nuevo')
    location.href = 'misSolicitudes.html'
})

botonSalir.addEventListener('click', () => {
    Lockr.rm('nuevo')
    location.href="index.html"
})

botonPaginaPrincipal.addEventListener('click', () => {
    Lockr.rm('nuevo')
    location.href = "paginaPrincipal.html"
})

botonSolicitudes.addEventListener('click', () => {
    Lockr.rm('nuevo')
    location.href = "misSolicitudes.html"
})

function corroboracionDeDatosYRegistro(){

    if(inputDescripcion.value == "" || inputEstado.value == "Estado"){
        errorIngresaCosasVacias.style.display = "block"
    }

    else if(inputFecha.value > diaDeHoy){
        errorFechaInvalida.style.display = "block"
    }

    else{

        let numeroID = listaDeSolicitudes.length + 1;

        if(idSolicitudVieja != null){
            listaDeSolicitudes = listaDeSolicitudes.filter(solicitud => solicitud.ID != idSolicitudVieja)
            numeroID = idSolicitudVieja
        }
        
        crearSolicitud(numeroID, inputDescripcion.value, convertirDateEnString(inputFecha.value) , inputEstado.value)
        Lockr.rm('nuevo')
        location.href = 'misSolicitudes.html'
    }
}

function crearSolicitud(numeroID, nuevaDescripción, nuevaFecha, nuevoEstado){
    
    listaDeSolicitudes.push({
        ID: numeroID,
        Descripción: nuevaDescripción,
        FechaSolicitud: nuevaFecha,
        Estado: nuevoEstado
    });

    Lockr.set('solicitudes', listaDeSolicitudes)
}

function buscarSolicitud(id){
    return listaDeSolicitudes.find( solicitudVieja => solicitudVieja.ID == id)
}

function convertirDateEnString(string) {
    return string.split('-').reverse().join('/');
}

function convertirStringEnDate(string){
    return string.split('/').reverse().join('-');
}






