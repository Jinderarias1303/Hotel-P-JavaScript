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
            <div class="bg-white border-gray-300 rounded-lg p-1 w-full mr-1 ">
    <img src="${dato.imag}" alt="Hotel" class="w-full h-48 rounded-t-lg object-cover " />
    <div class="p-4 flex flex-col justify-between">
        <div>
        
            <p class="text-sm text-black mt-1">ID: ${dato.id}</p>
            <p class="text-sm text-black mt-2">Tipo de habitación: ${dato.nombre}</p>
            <p class="text-sm text-black mt-2">Descripción: ${dato.descripcion}</p>
            <p class="text-sm text-black mt-2">Servicios: ${dato.servicios}</p>
            <p class="text-2x1 text-black mt-2">Máximo de huéspedes: ${dato.maximo_huespedes}</p>
            <p class="text-black text-2xl mt-2">Días disponibles: ${dato.fechas_disponibles}<br></p>
            <p class="text-green-700 text-3xl mt-2">$${dato.precio_por_noche} por noche</p>
        </div>
        <div class="flex justify-center items-center mt-4 space-x-4">
            <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400" id="Estado">
                <span class="text-white">${dato.estado}</span>
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