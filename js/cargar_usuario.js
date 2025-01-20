// Verificar si el usuario está logueado al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const sesionBtn = document.getElementById("sesion");

    // Si el usuario está logueado, cambiar el texto y color del botón
    if (usuario) {
        sesionBtn.textContent = "Cerrar sesión";
        sesionBtn.style.backgroundColor = "red";
        //pintar usuario actual
        const pintarUsuario = document.getElementById("usuario_actual");
        const div = document.createElement('div');
        div.innerHTML = `
    <p> ${usuario.nombre}</p>
    
`;
        pintarUsuario.appendChild(div);
    } else {
        sesionBtn.textContent = "Iniciar sesión";
        sesionBtn.style.backgroundColor = "";
    }
});

// Evento para cerrar sesión
const botonCerrarSesion = document.getElementById("sesion");

botonCerrarSesion.addEventListener("click", () => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (usuario) {
        // Si el usuario está logueado, cerrar sesión
        localStorage.removeItem("usuario"); // Eliminar los datos del usuario en localStorage
        document.getElementById("sesion").textContent = "Iniciar sesión"; // Cambiar el texto del botón
        document.getElementById("sesion").style.backgroundColor = ""; // Restablecer el color del botón

        // Redirigir a la página de inicio de sesión o a cualquier página deseada
        window.location.href = "index.html"; // Cambia a la URL que desees
    } else {
        // Si no hay usuario, redirigir a la página de inicio de sesión
        window.location.href = "index.html";
    }
});



