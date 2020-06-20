var botonGuardar = document.getElementById("botonGuardar");
var botonCancelar = document.getElementById("botonCancelar");
var botonPaginaPrincipal = document.getElementById("botonPaginaPrincipal");
var botonSolicitudes = document.getElementById("botonSolicitudes");
var nuevaDescripción = document.getElementById("inputEdicion");
var idSolicitudVieja = Lockr.get('nuevo');

const listaDeSolicitudes = Lockr.get('solicitudes');


function agregarSolicitud(nuevaDescripción, nuevaFecha, nuevoEstado){
    var numeroID = listaDeSolicitudes.length + 1;
    
    listaDeSolicitudes.push({
        ID: numeroID,
        Descripción: nuevaDescripción,
        FechaSolicitud: nuevaFecha,
        Estado: nuevoEstado
    });

    Lockr.set('solicitudes', listaDeSolicitudes)
}

function llenarSolicitud(){
    var f = new Date();
    nuevaFecha = (f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear());
    nuevoEstado = "Abierto"

    agregarSolicitud(nuevaDescripción.value, nuevaFecha, nuevoEstado);
}

botonGuardar.addEventListener('click', () =>{
    
    if(nuevaDescripción.value == ""){
        document.getElementById("error").style.display = "block"
    }
    else{

        if(idSolicitudVieja == null){
            llenarSolicitud()
        }
        else{
                
            var solicitudVieja = buscarSolicitud(idSolicitudVieja)        
            var fechaSolicitudVieja = solicitudVieja.FechaSolicitud,
            estadoSolicitudVieja = solicitudVieja.Estado
            descripcionSolicitudNueva = nuevaDescripción.value;
            
            const nuevaLista = listaDeSolicitudes.filter(solicitud => solicitud.ID != idSolicitudVieja)

            nuevaLista.push({
                "ID": parseInt(idSolicitudVieja), 
                "Descripción": descripcionSolicitudNueva,
                "Estado": estadoSolicitudVieja,
                "FechaSolicitud": fechaSolicitudVieja
            })
            
            Lockr.set('solicitudes', nuevaLista)
            
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

if(idSolicitudVieja == null){
    nuevaDescripción.placeholder="Descripción de la solicitud"
}
else{
    nuevaDescripción.value = buscarSolicitud(idSolicitudVieja).Descripción
}


function buscarSolicitud(id){
    return listaDeSolicitudes.find( solicitudVieja => solicitudVieja.ID == id)
}