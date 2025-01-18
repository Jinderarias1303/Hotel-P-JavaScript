async function obtenerDatos() {
    const url ='http://localhost:3000/rooms';
    const response =await fetch(url);
    const datos = await response.json();
    pintarDatos(datos)
}

function pintarDatos(datos){
    const contenedor =document.getElementById("contenedor");
    
    datos.forEach(dato => {
        const div =document.createElement('div');
        div.innerHTML = `
            <div class="bg-gray-100 rounded-lg shadow-sm overflow-hidden w-full m-1 border-black border-2">
    <img src="${dato.imag}" alt="Hotel" class="w-full h-[300px] object-container" />
    <div class=" m-3 space-y-4">
        <h2 class="text-lg font-semibold text-gray-800">${dato.nombre}</h2>
        <p class="text-sm text-gray-600">ID: ${dato.id}</p>
        <p class="text-sm text-gray-600">Tipo de habitación: ${dato.nombre}</p>
        <p class="text-sm text-gray-600">Descripción: ${dato.descripcion}</p>
        <p class="text-sm text-gray-600">Servicios: ${dato.servicios}</p>
        <p class="text-sm text-gray-600">Máximo de huéspedes: ${dato.maximo_huespedes}</p>
        <p class="text-sm text-gray-600">Días disponibles: ${dato.fechas_disponibles}</p>
        <div class="flex justify-between items-center">
            <p class="text-xl font-bold text-gray-800">$${dato.precio_por_noche} por noche</p>
            <button class="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-400 text-sm">
                ${dato.estado}
            </button>
        </div>
    </div>
</div>

        `;
        contenedor.appendChild(div);
    });
}



// async function reserva() {
// await obtenerDatos()
// const boton_reserva = document.getElementById("Estado")


// boton_reserva.addEventListener("click", () =>{
//     alert("AAAA")
// })



//     if (boton_reserva === Disponible) {
        
//     }
    
    
    


// }
// reserva();
obtenerDatos();