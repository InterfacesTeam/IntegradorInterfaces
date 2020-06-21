// Botones de acciones
var botonGuardar = document.getElementById("botonGuardar");
var botonCancelar = document.getElementById("botonCancelar");
var botonPaginaPrincipal = document.getElementById("botonPaginaPrincipal");
var botonSolicitudes = document.getElementById("botonSolicitudes");
// Los 3 campos para llenar datos
var descripcion = document.getElementById("inputDescripcion");
var fecha = document.getElementById("inputFecha");
var estado = document.getElementById("inputEstado");
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
    descripcion.placeholder="Descripción de la solicitud"
    fecha.value = diaDeHoy
}
else{
    let solicitudVieja = buscarSolicitud(idSolicitudVieja)

    descripcion.value = solicitudVieja.Descripción
    fecha.value = convertirStringEnDate(solicitudVieja.FechaSolicitud)
    estado.value = solicitudVieja.Estado
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

    if(descripcion.value == "" || estado.value == "Estado"){
        errorIngresaCosasVacias.style.display = "block"
    }

    else if(fecha.value > diaDeHoy){
        errorFechaInvalida.style.display = "block"
    }

    else{

        let numeroID = listaDeSolicitudes.length + 1;

        if(idSolicitudVieja != null){
            listaDeSolicitudes = listaDeSolicitudes.filter(solicitud => solicitud.ID != idSolicitudVieja)
            numeroID = idSolicitudVieja
        }
        
        crearSolicitud(numeroID, descripcion.value, convertirDateEnString(fecha.value) , estado.value)
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






