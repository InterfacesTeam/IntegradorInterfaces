var botonSalir = document.getElementById("botonSalir");
var botonSolicitudes = document.getElementById("botonSolicitudes");
var botonNuevoUsuario = document.getElementById("botonNuevoUsuario");
var botonPaginaPrincipal = document.getElementById("botonPaginaPrincipal");

botonSalir.addEventListener('click', ()  => {
    location.href="index.html"
})

botonSolicitudes.addEventListener('click', () => {
    location.href="misSolicitudes.html"
})


botonNuevoUsuario.addEventListener('click', () => {
    location.href="nuevoUsuario.html"
})

botonPaginaPrincipal.addEventListener('click', () => {
    location.href="paginaPrincipal.html"
})

function actualizarTablaUsuarios() {
    var solicitudes = [];
    
    for (i = 0; i < Lockr.length; i++) {
        if(Lockr[i].id > 100) {
            solicitudes.append(i);
        }
    } 

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