
var botonNuevaSolicitud = document.getElementById("botonNuevaSolicitud");
var botonEditar = document.getElementById("botonEditar");
var botonEliminar = document.getElementById("botonEliminar")
var botonDebugear = document.getElementById("botonDebugear")
var todosLosCheckBox = document.getElementsByClassName("checkBox");
var botonSalir = document.getElementById("botonSalir");
var botonUsuarios = document.getElementById("botonUsuarios");
var botonPaginaPrincipal = document.getElementById("botonPaginaPrincipal");
var error = document.getElementById("error");

console.log("Hola")

actualizarTablaSolicitudes()

function actualizarTablaSolicitudes() {
    var solicitudes = Lockr.getAll();

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

function IDCheckeado(){
    var IDCheckeado;
    for(var i = 0; i < todosLosCheckBox.length; i++){
        if(todosLosCheckBox[i].checked){
            IDCheckeado = todosLosCheckBox[i].value
        }
    }
    return IDCheckeado
}


botonNuevaSolicitud.addEventListener('click', () => {
    Lockr.set('nuevo', null)
    location.href="miSolicitud.html"
})

botonEditar.addEventListener('click', () => {
    if (IDCheckeado() == null) {
        error.style.display = 'block'
    }
    else{
        Lockr.set('nuevo', IDCheckeado())
        location.href ="miSolicitud.html";
    }
})

botonEliminar.addEventListener('click', () => {
    if (IDCheckeado() == null) {
        error.style.display = 'block'
    }
    else{
        Lockr.rm(IDCheckeado())
        actualizarTablaSolicitudes()   
    }
})

botonSalir.addEventListener('click', () => {
    location.href="index.html"
});

botonPaginaPrincipal.addEventListener('click', () => {
    location.href = "paginaPrincipal.html"
})

botonUsuarios.addEventListener('click', () => {
    location.href = "misUsuarios.html"
})

botonDebugear.addEventListener('click', () =>{
    Lockr.flush()

    Lockr.set(1 , {
        "ID": 1,
        "Descripción": "Pedido de notebook",
        "Estado": "Abierta",
        "FechaSolicitud": "30/03/2020"
    });

    Lockr.set(2 , {
        "ID": 2,
        "Descripción": "Cambio de horario",
        "Estado": "En progreso",
        "FechaSolicitud": "03/04/2020"
    });

    Lockr.set(3 , {
        "ID": 3,
        "Descripción": "Pedido de una bicicleta para llegar a la universidad",
        "Estado": "Cerrada",
        "FechaSolicitud": "12/05/2020"
    });

    actualizarTablaSolicitudes()

})
