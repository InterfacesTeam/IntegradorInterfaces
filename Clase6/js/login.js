function redireccionar(){
    document.getElementById("carga").style.display="block";
    setTimeout('validarLogin()', 3000);
}


function validarLogin(){
    numeroUsuario = document.getElementById("usuario").value;
    contraseñaUsuario = document.getElementById("contraseña").value


    if(validarUsuario(numeroUsuario) && validarContraseña(contraseñaUsuario)){
        location.href="paginaPrincipal.html"
    }
    else{
        document.getElementById("error").style.display = "block"
        document.getElementById("carga").style.display="none";
    }
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