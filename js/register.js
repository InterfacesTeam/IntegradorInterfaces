var botonRegistro = document.getElementById("botonRegistro");

var usuarioRegistro = document.getElementById("usuarioRegistro");
var contraseñaRegistro = document.getElementById("contraseñaRegistro");
var confirmacionContraseña = document.getElementById("confirmacionContraseña");

var errorNoIngresaNada = document.getElementById("errorNoIngresaNada")
var errorContraseñasDistintas = document.getElementById("errorContraseñasDistintas");
var errorIngresarDatos = document.getElementById("errorIngresarDatos");
var errorUsuarioExistente = document.getElementById("errorUsuarioExistente");
var ruedaDeCarga = document.getElementById("rueditaRegistro");

const listaDeUsuarios = Lockr.get('usuariosRegistrados');



botonRegistro.addEventListener('click', () => {
    errorNoIngresaNada.style.display = "none"
    errorContraseñasDistintas.style.display = "none"
    errorIngresarDatos.style.display = "none"
    errorUsuarioExistente.style.display = "none"
    ruedaDeCarga.style.display="block"

    setTimeout('comprobarRegistro()', 2000);
    
});

function comprobarRegistro(){

    
    ruedaDeCarga.style.display="none"

    if(usuarioRegistro.value == "" && contraseñaRegistro.value == ""){
        errorNoIngresaNada.style.display = "block"
    }
    else if(contraseñaRegistro.value != confirmacionContraseña.value){
        errorContraseñasDistintas.style.display = "block"
    }
    else if(! validarUsuario(usuarioRegistro.value) || ! validarContraseña(contraseñaRegistro.value)){
        errorIngresarDatos.style.display = "block"
    }
    else if(comprobarUsuarioSiExiste(usuarioRegistro.value)){
        errorUsuarioExistente.style.display = "block"
    }
    else{

        listaDeUsuarios.push({
            "DNI": usuarioRegistro.value,
            "Contraseña": contraseñaRegistro.value
        })
        Lockr.set('usuariosRegistrados', listaDeUsuarios)
        
        register.style.display = "none"
        login.style.display = "block"

    }
    
}

function comprobarUsuarioSiExiste(usuarioNuevo){
    
    return listaDeUsuarios.some( usuarioViejo => usuarioViejo.DNI == usuarioNuevo)

}

function validarUsuario(usuario){
    return /^\d{8}$/.test(usuario)
}

function validarContraseña(contraseñaUsuario){
    tieneLetra = false
    tieneNumero = false
    caracterIncorrecto = false

    if(contraseñaUsuario.length >= 6){
        for(var i = 0;i<contraseñaUsuario.length;i++){

            valorIndividual = contraseñaUsuario.charCodeAt(i)
            
            if(between(valorIndividual, 65, 90) || between(valorIndividual,97,122)){
                tieneLetra = true;   
            }
            else if(between(valorIndividual,48, 57))
			{
				tieneNumero = true;
            }
            else{
                tieneAlgoMal = true;
            }

        }

    }
    return ! caracterIncorrecto && tieneLetra && tieneNumero

}


function between(n, a, b){
    return (n >= a) && (n <= b)
}