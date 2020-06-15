var botonGuardar = document.getElementById("botonGuardar");
var botonCancelar = document.getElementById("botonCancelar");
var botonPaginaPrincipal = document.getElementById("botonPaginaPrincipal");
var botonSolicitudes = document.getElementById("botonSolicitudes");
var nuevaDescripción = document.getElementById("inputEdicion");
var idSolicitudVieja = Lockr.get('nuevo');


function agregarSolicitud(nuevaDescripción, nuevaFecha, nuevoEstado){
    var numeroIDyValueLockr = Lockr.getAll().length + 1;
    var nuevaSolicitud = {
        ID: numeroIDyValueLockr,
        Descripción: nuevaDescripción,
        FechaSolicitud: nuevaFecha,
        Estado: nuevoEstado
    }

    Lockr.set(numeroIDyValueLockr,nuevaSolicitud);
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
                
            var solicitudVieja = Lockr.get(idSolicitudVieja)        
            var fechaSolicitudVieja = solicitudVieja.FechaSolicitud,
            estadoSolicitudVieja = solicitudVieja.Estado
            descripcionSolicitudNueva = nuevaDescripción.value;
            
            
            Lockr.set(idSolicitudVieja, {
                "ID": idSolicitudVieja,
                "Descripción": descripcionSolicitudNueva,
                "Estado": estadoSolicitudVieja,
                "FechaSolicitud": fechaSolicitudVieja
            })
        
            
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
    nuevaDescripción.placeholder = Lockr.get(idSolicitudVieja).Descripción
}