/*Boostrap*/
(function () {
  var forms = document.querySelectorAll(".needs-validation");
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
/* Producto precargado*/
const url =
  "https://japceibal.github.io/emercado-api/user_cart/" + 25801 + ".json";

const urlasync = async (url) => {
  const fetchProm = await fetch(url);
  if (fetchProm.ok) {
    fetchResp = await fetchProm.json();
    return fetchResp;
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  const prod25801 = await urlasync(url);
  let { name, currency, unitCost, count, image } = prod25801.articles[0];
  function getCartPreloadedProducts() {
    return `
    <div class="container tarjet rounded-3 p-4">
    <table class="table  text-center justify-content-between ">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Nombre</th>
          <th scope="col">Costo</th>
          <th scope="col">Cantidad</th>
          <th scope="col">Subtotal</th>
        </tr>
      </thead>
      <tbody class="text-center">
        <tr id="items-body">
          <td><img src="${image}" class="img-fluid img rounded-3 img-thumbnail imgCarrito" ;"></td>
          <td class="pt-5">${name}</td>
          <td class="pt-5">${currency} ${unitCost}</td>
          <td class="pt-5">
          <input id="cantidad" class="form-control" type="number"  min="1" value="${count}" required></td>
          <td class="pt-5" id="costoTotal"> ${currency} ${
      unitCost * count
    } </td>
        </tr>
      </tbody>
    </table>
  </div>
`;
  }
  document.getElementById("escribir").innerHTML += getCartPreloadedProducts();

  /* Cuenta 
     Escribe SubTotal
  */
  let cantidad = document.getElementById("cantidad");
  let Total = document.getElementById("costoTotal");
  document.getElementById("SubTotalCosto").innerHTML = Total.textContent;

  cantidad.addEventListener("change", () => {
    if (cantidad.value > 1) {
      let currentTotal = cantidad.value * prod25801.articles[0].unitCost;
      return (Total.innerHTML = currency + " " + currentTotal)(
        (document.getElementById("SubTotalCosto").innerHTML =
          currency + " " + currentTotal)
      );
    } else {
      cantidad.value = 1;
      return (Total.innerHTML = currency + " " + unitCost)(
        (document.getElementById("SubTotalCosto").innerHTML =
          currency + " " + unitCost)
      );
    }
  });
});

//modal
nroTarjeta = document.getElementById("validationTooltip015");
nroCuenta = document.getElementById("validationTooltip014");
codSeguridad = document.getElementById("validationTooltip016");
vencTarjeta = document.getElementById("validationTooltip017");

document.getElementById("radioTarjeta").addEventListener("click", function (e) {
  nroTarjeta.disabled = false;
  codSeguridad.disabled = false;
  vencTarjeta.disabled = false;
  nroCuenta.disabled = true;
});
document.getElementById("radioBancaria").addEventListener("click", function (e) {
    nroCuenta.disabled = false;
    nroTarjeta.disabled = true;
    codSeguridad.disabled = true;
    vencTarjeta.disabled = true;
  });

const radioModal = document.querySelectorAll('input[name="radio-stacked2"]');
const alertaPago = document.getElementById("alertaPago");

document.getElementById("submit").addEventListener("click", function (e) {
  if (
    (radioModal.checked && vencTarjeta.value == "") ||(codSeguridad.value == "" && nroTarjeta.value == "" && nroCuenta.value == "")
  ) {
    alertaPago.innerHTML = ` <p class="text-danger">Debe ingresar un método de pago </p>`;
  } else {
    alertaPago.innerHTML = ``;
  }
});