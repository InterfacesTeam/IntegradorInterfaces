console.log(window.solicitudes)

function agregarSolicitud() {
    var nuevaDescripción = document.getElementById("descripcion").value
    var f = new Date();

    var nuevaSolicitud = {
        ID: solicitudes.length + 1,
        Descripción: nuevaDescripción,
        Fecha: (f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear()),
        Estado: "Abierto"
    }
    solicitudes.push(nuevaSolicitud);
    console.log(solicitudes)
}
