Lockr.prefix = 'lockr_';    

solicitudes = [
    {
        "ID": 1,
        "Descripción": "Pedido de notebook",
        "Estado": "Abierta",
        "FechaSolicitud": "30/03/2020"
    },
    {   
        "ID": 2,
        "Descripción": "Cambio de horario",
        "Estado": "En progreso",
        "FechaSolicitud": "03/04/2020"
    },
    {   
        "ID": 3,
        "Descripción": "Pedido de una bicicleta para llegar a la universidad",
        "Estado": "Cerrada",
        "FechaSolicitud": "12/05/2020"
    }
]

Lockr.set('solicitudes', {
    "ID": 1,
    "Descripción": "Pedido de notebook",
    "Estado": "Abierta",
    "FechaSolicitud": "30/03/2020"
},
{   
    "ID": 2,
    "Descripción": "Cambio de horario",
    "Estado": "En progreso",
    "FechaSolicitud": "03/04/2020"
},
{   
    "ID": 3,
    "Descripción": "Pedido de una bicicleta para llegar a la universidad",
    "Estado": "Cerrada",
    "FechaSolicitud": "12/05/2020"
}

);
console.log(Lockr.getAll());