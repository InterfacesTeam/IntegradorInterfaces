var noPuedoIniciarSesion = document.getElementById("noPuedoIniciarSesion");
var crearCuenta = document.getElementById("crearCuenta");
var iniciarSesion = document.getElementById("iniciarSesion");
var login = document.getElementById("login");
var register = document.getElementById("register");

var errorIngresoUsuario = document.getElementById("errorIngresoUsuario");
var errorContraseña = document.getElementById("errorContraseña");


iniciarSesion.addEventListener('click', () => {    

    errorContraseña.style.display = "none"
    errorIngresoUsuario.style.display = "none"
    document.getElementById("rueditaLogin").style.display="block";
    setTimeout('validarLogin()', 3000);
})

function validarLogin(){
    numeroUsuario = document.getElementById("usuarioLogin").value;
    contraseñaUsuario = document.getElementById("contraseñaLogin").value

    document.getElementById("rueditaLogin").style.display="none";

    if(! comprobarUsuarioSiExiste(numeroUsuario)){
        errorIngresoUsuario.style.display = "block"
    }

    else if(! comprobarContraseña(numeroUsuario, contraseñaUsuario)){
        errorContraseña.style.display = "block"
    }

    else{
        location.href = "paginaPrincipal.html"
    }
}


noPuedoIniciarSesion.addEventListener('click', () => {
    alert('Todavia no está hecho')
})

crearCuenta.addEventListener('click', () => {
    setTimeout( () => {
        login.style.display = "none"
        register.style.display = "block"
    }, 1000)
})


function comprobarContraseña(usuario, contraseña){
    const listaDeUsuarios = Lockr.get('usuariosRegistrados');
    const usuarioRegistrado = listaDeUsuarios.find( usuarioRegistrado => usuarioRegistrado.DNI == usuario) 
    
    return usuarioRegistrado.Contraseña == contraseña
    
}