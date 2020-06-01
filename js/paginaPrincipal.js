actualizarTablaSolicitudes()
var botonGuardar = document.getElementById("botonGuardar");
var botonCancelar = document.getElementById("botonCancelar");
var botonEditar = document.getElementById("botonEditar");
var editorSolicitud = document.getElementById("editorSolicitud")
var nuevaDescripción = document.getElementById("descripcionSolicitudEditada");
var todosLosCheckBox = document.getElementsByClassName("checkBox");


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

function eliminarSolicitud(){

    Lockr.rm(IDCheckeado())
    actualizarTablaSolicitudes()   
}


botonGuardar.addEventListener('click', () => {
    if(nuevaDescripción.value == ""){
        document.getElementById("error").style.display = "block"
    }
    else{
        var solicitudVieja = Lockr.get(IDCheckeado())
        fechaSolicitudVieja = solicitudVieja.FechaSolicitud,
        estadoSolicitudVieja = solicitudVieja.Estado
        descripcionSolicitudNueva = nuevaDescripción.value;
        

        Lockr.set(IDCheckeado(), {
            "ID": IDCheckeado(),
            "Descripción": descripcionSolicitudNueva,
            "Estado": estadoSolicitudVieja,
            "FechaSolicitud": fechaSolicitudVieja
        })

        console.log(Lockr.get(IDCheckeado()))
        console.log(Lockr.getAll())

        actualizarTablaSolicitudes()
        editorSolicitud.style.display = 'none'

    }
})

botonEditar.addEventListener('click' , () => {
   
    if(IDCheckeado() == null){
        console.log("Hola")
    }else{
        editorSolicitud.style.display = 'block'
    }
})

botonCancelar.addEventListener('click', () =>{
    editorSolicitud.style.display = 'none'
})