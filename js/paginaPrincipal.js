
var botonNuevaSolicitud = document.getElementById("botonNuevaSolicitud");
var botonEditar = document.getElementById("botonEditar");
var botonEliminar = document.getElementById("botonEliminar")
var todosLosCheckBox = document.getElementsByClassName("checkBox");
var error = document.getElementById("error");

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