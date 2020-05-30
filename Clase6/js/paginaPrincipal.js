var solicitudes = [
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

crearSolicitudEnTabla()



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
    nuevaFecha = document.getElementById("fecha").value,
    nuevoEstado = document.getElementById("estado").value;

    agregarSolicitud(nuevaDescripción, nuevaFecha, nuevoEstado);
}


function crearSolicitudEnTabla(){
    tbody = document.querySelector('#tablaSolicitudes tbody');

    tbody.innerHTML = '';

    for(var i = 0; i < solicitudes.length; i++){
        var fila = tbody.insertRow(i);
        var celdaDescripcion = fila.insertCell(0),
        celdaFecha = fila.insertCell(1),
        celdaEstado = fila.insertCell(2),
        celdaCheckBox = fila.insertCell(3);
        
        celdaDescripcion.innerHTML = solicitudes[i].Descripción;
        celdaFecha.innerHTML = solicitudes[i].FechaSolicitud;
        celdaEstado.innerHTML = solicitudes[i].Estado;

        var checkBox = document.createElement('input')
        checkBox.type ='radio';
        checkBox.className = "checkBox",
        checkBox.name = "boton";
        checkBox.value = solicitudes[i].ID;

        celdaCheckBox.appendChild(checkBox);

        tbody.appendChild(fila);

    }
}

function eliminarSolicitud(){
    var todosLosCheckBox = document.getElementsByClassName("checkBox");
    
    for(var i = 0; i < todosLosCheckBox.length; i++){
        if(todosLosCheckBox[i].checked){
            console.log(todosLosCheckBox[i].value)
        }
    }


    /*jsonVar.hobbies.forEach(function(currentValue, index, arr){
        if(jsonVar.hobbies[index].name==name){
            jsonVar.hobbies.splice(index, index);     
         }
        })*/
}
