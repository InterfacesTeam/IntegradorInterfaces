window.solicitudes = [
    {
        "ID": 1,
        "Descripción": "Pedido de notebook",
        "Estado": "Abierta",
        "FechaSolicitud": "30/03/2020"
    },
    {   
        "ID": 2,
        "Descripción": "Cambio de horario",
        "Estado": "En progreso",
        "FechaSolicitud": "03/04/2020"
    },
    {   
        "ID": 3,
        "Descripción": "Pedido de una bicicleta para llegar a la universidad",
        "Estado": "Cerrada",
        "FechaSolicitud": "12/05/2020"
    }
]
mostrarJSON()



function agregarSolicitud(nuevaDescripción, nuevaFecha, nuevoEstado){
    var nuevaSolicitud = {
        ID: solicitudes.length + 1,
        Descripción: nuevaDescripción,
        FechaSolicitud: nuevaFecha,
        Estado: nuevoEstado
    }

    solicitudes.push(nuevaSolicitud);

    crearSolicitudEnTabla()
}

function llenarSolicitud(){
    var nuevaDescripción = document.getElementById("descripcion").value,
    f = new Date();
    nuevaFecha = (f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear());
    nuevoEstado = "Abierto"

    location.href="paginaPrincipal.html";
    agregarSolicitud(nuevaDescripción, nuevaFecha, nuevoEstado);
}


















function actualizarTablaSolicitudes() {
    tbody = document.querySelector('#tablaSolicitudes tbody');
    tbody.innerHTML = '';

    for(var i = 0; i < window.solicitudes.length; i++){
        var fila = tbody.insertRow(i);
        var celdaDescripcion = fila.insertCell(0),
        celdaFecha = fila.insertCell(1),
        celdaEstado = fila.insertCell(2),
        celdaCheckBox = fila.insertCell(3);
        
        celdaDescripcion.innerHTML = window.solicitudes[i].Descripción;
        celdaFecha.innerHTML = window.solicitudes[i].FechaSolicitud;
        celdaEstado.innerHTML = window.solicitudes[i].Estado;

        var checkBox = document.createElement('input')
        checkBox.type ='radio';
        checkBox.className = "checkBox",
        checkBox.name = "boton";
        checkBox.value = window.solicitudes[i].ID;

        celdaCheckBox.appendChild(checkBox);

        tbody.appendChild(fila);
    }
}

function eliminarSolicitud(){
    var todosLosCheckBox = document.getElementsByClassName("checkBox");
    var IDCheckeado;
    for(var i = 0; i < todosLosCheckBox.length; i++){
        if(todosLosCheckBox[i].checked){
            IDCheckeado = todosLosCheckBox[i].value
        }
    }
    console.log(IDCheckeado)
    window.solicitudes = window.solicitudes.filter( solicitud => solicitud.ID != IDCheckeado )
    actualizarTablaSolicitudes()   
}


function mostrarJSON(){
    console.log(window.solicitudes)
}
