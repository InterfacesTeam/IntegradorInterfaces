var botonGuardar = document.getElementById("botonGuardar");
var botonCancelar = document.getElementById("botonCancelar");
var nuevaDescripción = document.getElementById("inputEdicion")


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
        llenarSolicitud()
        location.href = 'paginaPrincipal.html'
    }
})

botonCancelar.addEventListener('click', () =>{
    location.href = 'paginaPrincipal.html'
})