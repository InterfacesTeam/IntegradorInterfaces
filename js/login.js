var noPuedoIniciarSesion = document.getElementById("noPuedoIniciarSesion");
var crearCuenta = document.getElementById("crearCuenta");
var iniciarSesion = document.getElementById("iniciarSesion");
var login = document.getElementById("login");
var register = document.getElementById("register");
var ruedita = document.getElementById("rueditaLogin");

var errorUsuario = document.getElementById("errorUsuario");
var errorContraseña = document.getElementById("errorContraseña");
var errorNoIngresaUsuario = document.getElementById("errorNoIngresaUsuario");
var errorNoIngresaContraseña = document.getElementById("errorNoIngresaContraseña");
var inputUsuario = document.getElementById("usuarioLogin");
var inputContraseña = document.getElementById("contraseñaLogin");


iniciarSesion.addEventListener('click', () => {    

    errorNoIngresaUsuario.style.display = 'none'
    errorNoIngresaContraseña.style.display = 'none'
    errorContraseña.style.display = 'none'
    errorUsuario.style.display = 'none'
    marcarCasillaDeError(false,false)
    
    ruedita.style.display="block";
    setTimeout('validarLogin()', 3000);
})

function validarLogin(){
    
    ruedita.style.display="none";

    if(inputUsuario.value == "" && inputContraseña.value == ""){
        errorNoIngresaUsuario.style.display = 'block'
        errorNoIngresaContraseña.style.display = 'block'
        marcarCasillaDeError(true,true)
    }
    else if(inputUsuario.value == ""){
        errorNoIngresaUsuario.style.display = 'block'
        marcarCasillaDeError(true,false)
    }

    else if(inputContraseña.value == ""){
        errorNoIngresaContraseña.style.display = 'block'
        marcarCasillaDeError(false,true)
    }

    else if(! comprobarUsuarioSiExiste(inputUsuario.value)){
        errorUsuario.style.display = "block"
        marcarCasillaDeError(true,false)
    }

    else if(! comprobarContraseña(inputUsuario.value, inputContraseña.value)){
        errorContraseña.style.display = "block"
        marcarCasillaDeError(false,true)
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


function marcarCasillaDeError(boolUsuario, boolContraseña){
    if(boolUsuario){
        inputUsuario.style.border = '2px solid'
        inputUsuario.style.borderColor = 'red'
    }
    else{
        inputUsuario.style.border = ''
    }

    if(boolContraseña){
        inputContraseña.style.border = '2px solid'
        inputContraseña.style.borderColor = 'red'
    }
    else{
        inputContraseña.style.border = ''
    }
}