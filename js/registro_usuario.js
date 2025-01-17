//registro de usuarios.
const formulario = document.getElementById("RegistrarFormulario");

formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const nombre = document.getElementById("Nombre").value;
    const correo = document.getElementById("registroEmail").value;
    const contraseña = document.getElementById("registroContraseña").value;
    const telefono = document.getElementById("telefono").value;
    const reservas = [];

    try {
        const url = 'http://localhost:3000/users';
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({ nombre, correo, contraseña, telefono, reservas }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error al registrar el usuario');
        }
    } catch (error) {
        console.log(error);
    }
});