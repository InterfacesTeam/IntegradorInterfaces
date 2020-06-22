var botonGuardar = document.getElementById("botonGuardar");
var botonCancelar = document.getElementById("botonCancelar");
var botonSalir = document.getElementById("botonSalir");
var botonPaginaPrincipal = document.getElementById("botonPaginaPrincipal");
var botonUsuarios = document.getElementById("botonUsuarios");

var ningunDato = document.getElementById("errorNingunDato");
var datosErroneos = document.getElementById("errorDatosErroneos");
var errorFechaInvalida = document.getElementById("errorFechaInvalida");

var idUsuarioViejo = Lockr.get('nuevo')

var inputNombre = document.getElementById("nombre");
var inputContraseña = document.getElementById("contraseña");
var inputFecha = document.getElementById("inputFecha");
var inputActivo = document.getElementById("inputActivo");

var listaDeUsuarios = Lockr.get('usuarios');
var f = new Date();
const diaDeHoy = f.getFullYear()+"-"+("0" + (f.getMonth() + 1)).slice(-2) +"-"+("0" + (f.getDate())).slice(-2);

botonGuardar.addEventListener('click', () => {

    ningunDato.style.display = 'none'
    datosErroneos.style.display = 'none'
    errorFechaInvalida.style.display = 'none'

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

function validarIngresoDeDatos(){
    
    if(inputNombre.value == "" || inputContraseña.value == "" || inputActivo.value == "Estado"){
        errorNingunDato.style.display = 'block'
    }

    else if(! validarUsuario(nombre.value) || ! validarContraseña(contraseña.value)){
        errorDatosErroneos.style.display = 'block'
    }
    else if(inputFecha.value > diaDeHoy){
        errorFechaInvalida.style.display = 'block'
    }
    else{
        var nuevaID = listaDeUsuarios.length + 1,
        nuevoAvatar =  "https://avatars.dicebear.com/api/identicon/" + inputNombre.value + nuevaID + ".svg";

        if(idUsuarioViejo != null){
            nuevoAvatar = buscarUsuario(idUsuarioViejo).Avatar
            listaDeUsuarios = listaDeUsuarios.filter(usuario => usuario.ID != idUsuarioViejo)
            nuevaID = idUsuarioViejo
        }

        crearUsuario(nuevaID, convertirDateEnString(inputFecha.value), nuevoAvatar, inputNombre.value, inputContraseña.value, inputActivo.value)

        Lockr.rm('nuevo')
        location.href= "misUsuarios.html"
    }
}

function crearUsuario(nuevaID, nuevaFecha, nuevoAvatar, nuevoNombre,nuevaContraseña ,nuevoActivo){
   
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

function buscarUsuario(id){
    return listaDeUsuarios.find( usuarioViejo => usuarioViejo.ID == id)
}

if(idUsuarioViejo == null){
    inputNombre.placeholder="Ingrese el nombre";
    inputFecha.value = diaDeHoy
}
else{
    let usuarioViejo = buscarUsuario(idUsuarioViejo)

    inputNombre.value = usuarioViejo.Nombre
    inputFecha.value = convertirStringEnDate(usuarioViejo.Fecha)
    inputActivo.value = usuarioViejo.Activo
}

inputContraseña.placeholder = "Ingrese la contaseña"


function convertirDateEnString(string) {
    return string.split('-').reverse().join('/');
}

function convertirStringEnDate(string){
    return string.split('/').reverse().join('-');
}
