var biblioteca = document.getElementById("biblioteca");
var botonSalir = document.getElementById("botonSalir");
var botonSolicitudes = document.getElementById("botonSolicitudes");
var botonUsuarios = document.getElementById("botonUsuarios");

biblioteca.addEventListener('click', () => {
    location.href = "http://biblioteca.unahur.edu.ar/"
});

botonSalir.addEventListener('click' , () => {
    location.href = "index.html"
});

botonSolicitudes.addEventListener('click', () => {
    location.href = "misSolicitudes.html"
})

botonUsuarios.addEventListener('click', () => {
    
})
