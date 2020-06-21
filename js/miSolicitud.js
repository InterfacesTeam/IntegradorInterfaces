var botonGuardar = document.getElementById("botonGuardar");
var botonCancelar = document.getElementById("botonCancelar");
var botonPaginaPrincipal = document.getElementById("botonPaginaPrincipal");
var botonSolicitudes = document.getElementById("botonSolicitudes");
var nuevaDescripción = document.getElementById("inputEdicion");
var idSolicitudVieja = Lockr.get('nuevo');

var listaDeSolicitudes = Lockr.get('solicitudes');

botonGuardar.addEventListener('click', () =>{
    
    if(nuevaDescripción.value == ""){
        document.getElementById("error").style.display = "block"
    }
    else{

        if(idSolicitudVieja == null){
            var f = new Date();
            nuevaFecha = (f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear());
            nuevoEstado = "Abierto"
            numeroID = listaDeSolicitudes.length + 1
            
            crearSolicitud(numeroID, nuevaDescripción.value, nuevaFecha, nuevoEstado)
        }
        else{
            var solicitudVieja = buscarSolicitud(idSolicitudVieja)        
            listaDeSolicitudes = listaDeSolicitudes.filter(solicitud => solicitud.ID != idSolicitudVieja)

            crearSolicitud(parseInt(idSolicitudVieja), nuevaDescripción.value, solicitudVieja.FechaSolicitud, solicitudVieja.Estado);
        }

        Lockr.rm('nuevo')
        location.href = 'misSolicitudes.html'
    }
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



if(idSolicitudVieja == null){
    nuevaDescripción.placeholder="Descripción de la solicitud"
}
else{
    nuevaDescripción.value = buscarSolicitud(idSolicitudVieja).Descripción
}