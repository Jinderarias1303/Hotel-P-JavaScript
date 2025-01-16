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
        <div class=" bg-white border-gray-300 rounded-lg  p-1 w-96 my-4 shadow-lg w-full">
                        <img src="${dato.imag}" alt="Hotel" class="w-full h-48 rounded-t-lg object-cover" />
                        <div class="p-4">
                            <p class="text-sm text-gray-700 mt-1 ">
                                ID:${dato.id}
                            </p>
                            <p class="text-sm text-gray-700 mt-2">
                                Tipo de habitación: ${dato.nombre}
                            </p>
                            <p class="text-sm text-gray-700 mt-2">
                                Descripción:${dato.descripcion}
                            </p>
                            <p class="text-sm text-gray-700 mt-2">
                                Servicios: ${dato.servicios}
                            </p>
                            <p class="text-sm text-gray-700 mt-2">
                                Maximo de huespedes: ${dato.maximo_huespedes}
                            </p>
                            <p class="text-sm text-green-700 mt-2 text-3xl">
                                $ ${dato.precio_por_noche} Noche</p>
                            <div class="flex justify-between items-center mt-4">
                                <p class="text-green-600 font-bold text-lg" id="precio_noche"></p>
                                <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400 " id="">
                                    <p class="text-sm text-gray-900 mt-2 text-white">
                                    ${dato.estado}
                            </p>
                                </button>
                            </div>
                            <p class="text-sm text-gray-500 mt-2"></p>
                        </div>
                    </div>
        `;
        contenedor.appendChild(div);
    });
}

obtenerDatos();