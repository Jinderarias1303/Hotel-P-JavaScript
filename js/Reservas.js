
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
    } else {
        resultados.innerHTML = disponibles.map(habitacion => {
            return `
                <div class="p-4 bg-white rounded-lg shadow-md mb-4">
                    <img src="${habitacion.imag}" alt="Hotel" class="w-full h-[300px] object-container" />
                    <h3 class="text-lg font-bold text-blue-900">${habitacion.nombre}</h3>
                    <p class="text-gray-700">Precio por noche: $${habitacion.precio_por_noche}</p>
                    <p class="text-gray-700">Capacidad máxima: ${habitacion.maximo_huespedes} persona(s)</p>
                    <p class="text-gray-700">Total por ${(new Date(fechaFin) - new Date(fechaInicio)) / (1000 * 60 * 60 * 24)} noche(s): $${habitacion.precio_por_noche * ((new Date(fechaFin) - new Date(fechaInicio)) / (1000 * 60 * 60 * 24))}</p>
                </div>
            `;
        }).join("");
    }
});