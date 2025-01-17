async function obtenerDatos() {
    const url = 'http://localhost:3000/users';
    const response = await fetch(url);
    const datos = await response.json();
    return datos;
}

    const botonIniciar = document.getElementById("IniciarSesion");

    botonIniciar.addEventListener("click", async () => {
        const email = document.getElementById("email");
        const contra = document.getElementById("contraseña");


        const datos = await obtenerDatos();
        console.log(datos);
        const usuario = datos.find(user => user.correo === email.value && user.contraseña === contra.value);


        if (usuario) {

            window.location.href = "index.html";
        } else {
            alert("Usuario o contraseña incorrectos");
        }
    });

    