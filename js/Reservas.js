async function obtenerDatos() {
    const url = 'http://localhost:3000/rooms';
    try {
        const response = await fetch(url);
        const datos = await response.json();
        return datos;
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        return [];
    }
}

// Función para filtrar las habitaciones disponibles
function filtrarHabitaciones(habitaciones, fechaInicio, fechaFin, personas) {
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);

    return habitaciones.filter(habitacion => {
        const capacidadOk = habitacion.maximo_huespedes >= personas;
        const fechasDisponiblesOk = habitacion.fechas_disponibles.some(fecha => {
            const fechaActual = new Date(fecha);
            return fechaActual >= inicio && fechaActual <= fin;
        });
        return capacidadOk && fechasDisponiblesOk;
    });
}

// Manejo del formulario
document.getElementById("consulta-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const fechaInicio = document.getElementById("fecha-inicio").value;
    const fechaFin = document.getElementById("fecha-fin").value;
    const personas = parseInt(document.getElementById("personas").value);
    const resultados = document.getElementById("resultados");
    const contenedor = document.getElementById("contenedor");

    // Validaciones básicas
    if (!fechaInicio || !fechaFin || !personas) {
        alert("Por favor, complete todos los campos.");
        return;
    }
    if (new Date(fechaInicio) >= new Date(fechaFin)) {
        alert("La fecha de inicio debe ser anterior a la fecha de fin.");
        return;
    }

    const habitaciones = await obtenerDatos();
    const disponibles = filtrarHabitaciones(habitaciones, fechaInicio, fechaFin, personas);

    if (disponibles.length === 0) {
        resultados.innerHTML = `<p class="text-red-500">No se encontraron habitaciones disponibles.</p>`;
        contenedor.innerHTML = ""; // Limpia las habitaciones mostradas previamente
    } else {
        contenedor.innerHTML = disponibles.map(habitacion => {
            return `
                <div class="p-4 bg-white rounded-lg shadow-md mb-4 " id="habitacion-${habitacion.id}">
                    <img src="${habitacion.imag}" alt="Hotel" class="w-full h-[300px] object-contain" />
                    <h3 class="text-lg font-bold text-blue-900">${habitacion.nombre}</h3>
                    <p id="precio-${habitacion.id}" class="text-gray-700">Precio por noche: $${habitacion.precio_por_noche}</p>
                    <p id="habitacion-id-${habitacion.id}" class="text-gray-900">Id habitacion: ${habitacion.id}</p>
                    <p class="text-gray-700">Capacidad máxima: ${habitacion.maximo_huespedes} persona(s)</p>
                    <p id="total" class="text-gray-800 ">Total por ${(new Date(fechaFin) - new Date(fechaInicio)) / (1000 * 60 * 60 * 24)} noche(s): $${habitacion.precio_por_noche * ((new Date(fechaFin) - new Date(fechaInicio)) / (1000 * 60 * 60 * 24))}</p>
                    <button class="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-400 text-sm reservar-btn">Reservar</button>
                </div>
            `;
        }).join("");
        const id_usuario = JSON.parse(localStorage.getItem('usuario'));
        const id_us = id_usuario.id;
        console.log(id_us);
        // Agrega el evento a todos los botones de reservar
        document.querySelectorAll(".reservar-btn").forEach(boton => {
            boton.addEventListener("click", async (e) => {
                const habitacionSeleccionada = e.target.closest("div");

                // Usamos el id único para acceder al contenido de la habitación
                const id_habitacion = habitacionSeleccionada.querySelector(`#habitacion-id-${habitacionSeleccionada.id.split('-')[1]}`).textContent.split(':')[1].trim();
                console.log(id_habitacion);
                const fecha_entrada = document.getElementById("fecha-inicio").value;
                console.log(fecha_entrada);
                const fecha_salida = document.getElementById("fecha-fin").value;
                console.log(fecha_salida);
                const estado = "Reservado";
                try {
                    const url = 'http://localhost:3000/Reservas';
                    const response = await fetch(url, {
                        method: 'POST',
                        body: JSON.stringify({ id_us, id_habitacion, fecha_entrada, fecha_salida, estado }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    console.log(response);
                    console.log("subida?");
                    if (!response.ok) {
                        throw new Error('Error al registrar el usuario');
                    }
                } catch (error) {
                    console.log(error);
                }
            });
        });
    }
});
