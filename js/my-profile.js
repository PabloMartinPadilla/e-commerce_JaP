// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

let Nombre = document.getElementById("validationTooltip01");
let Nombre2 = document.getElementById("validationTooltip02");
let Apellido = document.getElementById("validationTooltip03");
let Apellido2 = document.getElementById("validationTooltip04");
let Telefono = document.getElementById("validationTooltip06");

let submit = document.getElementById("submit");
submit.addEventListener("click", () => {
  let NombreV = Nombre;
  let Nombre2V = Nombre2;
  let ApellidoV = Apellido;
  let Apellido2V = Apellido2;
  let TelefonoV = Telefono;

  localStorage.setItem("Nombre", NombreV.value);
  localStorage.setItem("Nombre2", Nombre2V.value);
  localStorage.setItem("Apellido", ApellidoV.value);
  localStorage.setItem("Apellido2", Apellido2V.value);
  localStorage.setItem("Telefono", TelefonoV.value);
});

document.addEventListener("DOMContentLoaded", function () {
  let email = localStorage.getItem("userEmail");
  if (email !== null) {
    document.getElementById("validationTooltip05").value = email;
    Nombre.value = localStorage.getItem("Nombre");
    Nombre2.value = localStorage.getItem("Nombre2");
    Apellido.value = localStorage.getItem("Apellido");
    Apellido2.value = localStorage.getItem("Apellido2");
    Telefono.value = localStorage.getItem("Telefono");
  }
});
