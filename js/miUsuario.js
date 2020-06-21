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

var listaDeUsuarios = Lockr.get('usuarios');

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

function crearUsuario(nuevaID, nuevaFecha, nuevoAvatar, nuevoNombre,nuevaContraseña ,nuevoActivo ){
   
    listaDeUsuarios.push({
        "ID": nuevaID,
        "Fecha": nuevaFecha,
        "Avatar": nuevoAvatar,
        "Nombre": nuevoNombre,
        "Contraseña": nuevaContraseña,
        "Activo": nuevoActivo
    })
    
    Lockr.set('usuarios', listaDeUsuarios)
    
}


function validarIngresoDeDatos(){
    
    if(nombre.value == "" || contraseña.value == ""){
        ningunDato.style.display = 'block'
    }

    else if(! validarUsuario(nombre.value) || ! validarContraseña(contraseña.value)){
        datosErroneos.style.display = 'block'
    }
    else{
        if(idUsuarioViejo == 99){

            var f = new Date();
            var nuevaFecha = (f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear()),
            nuevaID = listaDeUsuarios.length + 1,
            nuevoAvatar =  "https://avatars.dicebear.com/api/identicon/" + nombre.value + nuevaID + ".svg";

            crearUsuario(nuevaID, nuevaFecha, nuevoAvatar, nombre.value, contraseña.value, "Activo")
        }
        else{
            var usuarioViejo = buscarSolicitud(idUsuarioViejo)
            
            listaDeUsuarios = listaDeUsuarios.filter(usuario => usuario.ID != idUsuarioViejo)

            crearUsuario(idUsuarioViejo, usuarioViejo.Fecha, usuarioViejo.Avatar, nombre.value, contraseña.value, usuarioViejo.Activo)

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

if(idUsuarioViejo == 99){
    nombre.placeholder = "Ingrese el nombre"
}
else{
    nombre.value = buscarSolicitud(idUsuarioViejo).Nombre
}

contraseña.placeholder = "Ingrese la contaseña"

