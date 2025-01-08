document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("login");
    const alert = document.getElementById("alert");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    form.addEventListener("submit", (evento) => {
        evento.preventDefault();
        const email = document.querySelector("#email").value.trim();
        const password = document.querySelector("#contrasena").value.trim();

        // Reset alert
        alert.style.display = "none";
        alert.innerText = "";

        // Validación
        if (!email || !password) {
            alert.innerText = "Por favor, completa todos los campos.";
            alert.style.display = "block";
            return;
        }

        if (!emailRegex.test(email)) {
            alert.innerText = "Por favor, ingresa un correo electrónico válido.";
            alert.style.display = "block";
            return;
        }

        // Si pasa las validaciones
        localStorage.setItem("userEmail", email);
        window.location.href = "inicio.html";
    });

    // Función para esconder alerta
    form.addEventListener("input", () => {
        alert.style.display = "none";
    });
});
