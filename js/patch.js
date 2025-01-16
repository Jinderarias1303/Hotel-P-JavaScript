const actualizar =document.getElementById("boton_actualizar")

async function patchData(url, partialData) {
    const response = await fetch(url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(partialData),
    });
    return await response.json();
}

// Cambia la URL y los datos que quieres actualizar:
patchData('http://localhost:3000/rooms/101',
    {
        "id": 101,
        "nombre": "Suite",
        "descripcion": "Habitación con cama king size, minibar, jacuzzi y vista al mar.",
        "precio_por_noche": 150.000,
        "maximo_huespedes": 2,
        "fechas_disponibles": [
            "2025-01-15",
            "2025-01-16",
            "2025-01-17"
        ],
        "servicios": [
            "Internet",
            "Minibar",
            "Jacuzzi"
        ],
        "estado": "disponible"
    })
    .then(result => console.log(result))
    .catch(error => console.error(error));


// crear algo dentro de 
    // const data = {
    //     title: 'Nuevo post',
    //     content: 'Contenido del nuevo post'
    //     };
    //     fetch("https://api.example.com/posts", {
    //     method: "POST",
    //     headers: {
    //     "Content-Type": "application/json"
    //     ,
        
    //     },
    //     body: JSON.stringify(data),
    //     })
    //     .then((response) => response.json())
    //     .then((data) => {
    //     console.log(data);
    //     })
    //     .catch((error) => {
    //     console.error(error);
    //     });