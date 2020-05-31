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
    var nuevaDescripción = document.getElementById("descripcion").value,
    f = new Date();
    nuevaFecha = (f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear());
    nuevoEstado = "Abierto"

    agregarSolicitud(nuevaDescripción, nuevaFecha, nuevoEstado);
}

