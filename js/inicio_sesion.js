async function obtenerDatos() {
    const url = 'http://localhost:3000/users';
    const response = await fetch(url);
    const datos = await response.json();
    return datos;
}

    // Verificar si el usuario está logueado al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const sesionBtn = document.getElementById("sesion");

    // Si el usuario está logueado, cambiar el texto y color del botón
    if (usuario) {
        sesionBtn.textContent = "Cerrar sesión";
        sesionBtn.style.backgroundColor = "red";
    } else {
        sesionBtn.textContent = "Iniciar sesión";
        sesionBtn.style.backgroundColor = "";
    }
});

// Evento de iniciar sesión
const botonIniciar = document.getElementById("IniciarSesion");

botonIniciar.addEventListener("click", async () => {
    const email = document.getElementById("email");
    const contra = document.getElementById("contraseña");

    const datos = await obtenerDatos();
    const usuario = datos.find(user => user.correo === email.value && user.contraseña === contra.value);

    if (usuario) {
        localStorage.setItem("usuario", JSON.stringify(usuario)); // Guardar usuario en localStorage
        document.getElementById("sesion").textContent = "Cerrar sesión"; // Cambiar texto del botón
        document.getElementById("sesion").style.backgroundColor = "red"; // Cambiar color del botón

        // Redirigir o actualizar la página si es necesario
        window.location.href = "Disponibilidad.html"; // O puedes eliminar esta línea si no deseas redirigir
    } else {
        alert("Usuario o contraseña incorrectos");
    }
});



