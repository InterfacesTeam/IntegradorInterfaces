//botones cabezera
var botonSolicitudes = document.getElementById("botonSolicitudes");
var botonPaginaPrincipal = document.getElementById("botonPaginaPrincipal");
var botonSalir = document.getElementById("botonSalir");

var botonNuevoUsuario = document.getElementById("botonNuevoUsuario");
var botonDebugear =  document.getElementById("botonDebugear");
var botonEliminar = document.getElementById("botonEliminar");
var todosLosCheckBox = document.getElementsByClassName("checkBox");



console.log(Lockr.getAll())


botonSolicitudes.addEventListener('click', () => {
    location.href="misSolicitudes.html"
})

botonPaginaPrincipal.addEventListener('click', () => {
    location.href="paginaPrincipal.html"
})

botonSalir.addEventListener('click', ()  => {
    location.href="index.html"
})

botonNuevoUsuario.addEventListener('click', () => {
    Lockr.set('nuevo', {
        "ID": 99
    })
    location.href="miUsuario.html"
})

botonEditar.addEventListener('click', () => {
    if (IDCheckeado() == null) {
        error.style.display = 'block'
    }
    else{
        Lockr.set('nuevo', IDCheckeado())
        location.href ="miUsuario.html";
    }
})

botonEliminar.addEventListener('click', () => {
    
    if (IDCheckeado() == null) {
        error.style.display = 'block'
    }
    else{
        Lockr.rm(IDCheckeado())
        actualizarTablaUsuarios()   
    }
})

botonDebugear.addEventListener('click', () =>{
    
    Lockr.set('usuarios', [{
        "ID": 100,
        "Fecha": "14/06/2020",
        "Avatar":"https://avatars.dicebear.com/v2/identicon/41666728asdqwe12.svg",
        "Nombre": "41666728",
        "Contraseña":"asdqwe12",
        "Activo": "Activo"
    },{
        
        "ID": 101,
        "Fecha": "01/03/2019",
        "Avatar":"https://avatars.dicebear.com/api/identicon/zxcvbn34.svg",
        "Nombre": "42435380",
        "Contraseña":"zxcvbn34",
        "Activo": "Activo"
    }])
    
    actualizarTablaUsuarios()
});


function actualizarTablaUsuarios() {
    var usuarios = Lockr.get('usuarios')
    
    tbody = document.querySelector('#tablaUsuarios tbody');
    tbody.innerHTML = '';

    for(var i = 0; i < usuarios.length; i++){

        var imagen = new Image()
        imagen.src = usuarios[i].Avatar;
        imagen.className = "avatar" 

        var fila = tbody.insertRow(i);
        var celdaAvatar = fila.insertCell(0),
        celdaUsername = fila.insertCell(1),
        celdaActivo = fila.insertCell(2),
        celdaCheckBox = fila.insertCell(3);


        celdaAvatar.innerHTML = imagen.outerHTML;
        celdaUsername.innerHTML = usuarios[i].Nombre;
        celdaActivo.innerHTML = usuarios[i].Activo;

        var checkBox = document.createElement('input')
        checkBox.type ='radio';
        checkBox.className = "checkBox info",
        checkBox.name = "boton";
        checkBox.value = usuarios[i].ID;

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

actualizarTablaUsuarios();