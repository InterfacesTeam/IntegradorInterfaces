var nombre = document.getElementById("nombre");
var contraseña = document.getElementById("contraseña");
var botonGuardar = document.getElementById("botonGuardar");
var botonCancelar = document.getElementById("botonCancelar");
var botonSalir = document.getElementById("botonSalir");
var botonPaginaPrincipal = document.getElementById("botonPaginaPrincipal");
var botonUsuarios = document.getElementById("botonUsuarios");
var ningunDato = document.getElementById("ningunDato");
var datosErroneos = document.getElementById("datosErroneos");
var idUsuarioViejo = Lockr.get('nuevo').ID

const listaDeUsuarios = Lockr.get('usuarios');

botonGuardar.addEventListener('click', () => {

    ningunDato.style.display = 'none'
    datosErroneos.style.display = 'none'

    setTimeout('validarIngresoDeDatos()', 1000);

});

botonCancelar.addEventListener('click', () => {
    Lockr.rm('nuevo')
    location.href = "misUsuarios.html"
});

botonSalir.addEventListener('click', () => {
    Lockr.rm('nuevo')
    location.href = "index.html"
})

botonPaginaPrincipal.addEventListener('click', () => {
    Lockr.rm('nuevo')
    location.href = "paginaPrincipal.html"
})

botonUsuarios.addEventListener('click', () => {
    Lockr.rm('nuevo')
    location.href = "misUsuarios.html"
})

function crearUsuario(){
    var f = new Date();
    var nuevaFecha = (f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear()),
    nuevaID = listaDeUsuarios.length + 1,
    nuevoNombre = nombre.value,
    nuevaContraseña = contraseña.value,
    nuevoAvatar =  "https://avatars.dicebear.com/api/identicon/" + nuevoNombre + nuevaID + ".svg";
    

    listaDeUsuarios.push({
        "ID": nuevaID,
        "Fecha": nuevaFecha,
        "Avatar": nuevoAvatar,
        "Nombre": nuevoNombre,
        "Contraseña": nuevaContraseña,
        "Activo": "Activo"
    })
    
    Lockr.set('usuarios', listaDeUsuarios)
    
    

    
}



if(idUsuarioViejo == 99){
    nombre.placeholder = "Ingrese el nombre"
}
else{
    nombre.value = buscarSolicitud(idUsuarioViejo).Nombre
}

contraseña.placeholder = "Ingrese la contaseña"



function validarIngresoDeDatos(){
    
    if(nombre.value == "" || contraseña.value == ""){
        ningunDato.style.display = 'block'
    }

    else if(! validarUsuario(nombre.value) || ! validarContraseña(contraseña.value)){
        datosErroneos.style.display = 'block'
    }
    else{
        if(idUsuarioViejo == 99){
            crearUsuario()
        }
        else{
            var usuarioViejo = buscarSolicitud(idUsuarioViejo)

            var fechaVieja = usuarioViejo.Fecha,
            activoViejo = usuarioViejo.Activo,
            avatarViejo = usuarioViejo.Avatar,
            nuevoNombre = nombre.value,
            nuevaContraseña = contraseña.value;
            
            const nuevaLista = listaDeUsuarios.filter(usuario => usuario.ID != idUsuarioViejo)

            nuevaLista.push({
                "ID": idUsuarioViejo,
                "Fecha": fechaVieja,
                "Avatar": avatarViejo,
                "Nombre": nuevoNombre,
                "Cotraseña": nuevaContraseña,
                "Activo": activoViejo
            })

            Lockr.set('usuarios', nuevaLista)
        }
        Lockr.rm('nuevo')
        location.href= "misUsuarios.html"
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

function buscarSolicitud(id){
    return listaDeUsuarios.find( usuarioViejo => usuarioViejo.ID == id)
}