function cargarDatosLockr(){
    
    if(Lockr.get('usuariosRegistrados') == undefined){
        Lockr.set('usuariosRegistrados', [{
            "DNI": "admin",
            "Contraseña": "admin"
        }])

        Lockr.set('solicitudes', [{
            "ID": 1,
            "Descripción": "Pedido de notebook",
            "Estado": "Abierta",
            "FechaSolicitud": "30/03/2020"
        },{
            "ID": 2,
            "Descripción": "Cambio de horario",
            "Estado": "En progreso",
            "FechaSolicitud": "03/04/2020"
        },{
            "ID": 3,
            "Descripción": "Pedido de una bicicleta para llegar a la universidad",
            "Estado": "Cerrada",
            "FechaSolicitud": "12/05/2020"
        }])
        
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

    }
}






/*


Lockr.set(1 , {
    "ID": 1,
    "Descripción": "Pedido de notebook",
    "Estado": "Abierta",
    "FechaSolicitud": "30/03/2020"
});

Lockr.set(2 , {
    "ID": 2,
    "Descripción": "Cambio de horario",
    "Estado": "En progreso",
    "FechaSolicitud": "03/04/2020"
});

Lockr.set(3 , {
    "ID": 3,
    "Descripción": "Pedido de una bicicleta para llegar a la universidad",
    "Estado": "Cerrada",
    "FechaSolicitud": "12/05/2020"
});

*/