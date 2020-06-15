var nombre = document.getElementById("nombre");
var contraseña = document.getElementById("contraseña");
var botonGuardar = document.getElementById("botonGuardar");
var botonCancelar = document.getElementById("botonCancelar");
var botonSalir = document.getElementById("botonSalir");
var botonPaginaPrincipal = document.getElementById("botonPaginaPrincipal");
var botonUsuarios = document.getElementById("botonUsuarios");
var error = document.getElementById("error");
var idUsuarioViejo = Lockr.get('nuevo')
var cantidadDeUsuarios = Lockr.getAll().filter( usuario => usuario.ID >= 100).length;



botonGuardar.addEventListener('click', () => {

    if(nombre.value == "" || contraseña.value == ""){
        error.style.display = 'block'
    }
    else{
        if(idUsuarioViejo.ID == 99){
            crearUsuario()
        }
        else{
            var usuarioViejo = Lockr.get(idUsuarioViejo)

            var fechaVieja = usuarioViejo.Fecha,
            activoViejo = usuarioViejo.Activo,
            avatarViejo = usuarioViejo.Avatar,
            nuevoNombre = nombre.value,
            nuevaContraseña = contraseña.value;
               
            Lockr.set(idUsuarioViejo, {
                "ID": idUsuarioViejo,
                "Fecha": fechaVieja,
                "Avatar": avatarViejo,
                "Nombre": nuevoNombre,
                "Cotraseña": nuevaContraseña,
                "Activo": activoViejo
            })
        }
        Lockr.rm('nuevo')
        location.href= "misUsuarios.html"
    }
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
    nuevaID = cantidadDeUsuarios + 100,
    nuevoNombre = nombre.value,
    nuevaContraseña = contraseña.value,
    nuevoAvatar =  "https://avatars.dicebear.com/api/identicon/" + nombre.value + nuevaID + ".svg";

    nuevoUsuario = {
        "ID": nuevaID,
        "Fecha": nuevaFecha,
        "Avatar": nuevoAvatar,
        "Nombre": nuevoNombre,
        "Contraseña": nuevaContraseña,
        "Activo": "Activo"
    }

    Lockr.set(nuevaID, nuevoUsuario);

    
}

if(idUsuarioViejo.ID){

}

if(idUsuarioViejo.ID == 99){
    nombre.placeholder = "Ingrese el nombre"
}
else{
    nombre.placeholder = Lockr.get(idUsuarioViejo).Nombre
}

contraseña.placeholder = "Ingrese la contaseña"