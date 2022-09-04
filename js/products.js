const URL = "https://japceibal.github.io/emercado-api/cats_products/"+ localStorage.getItem("catID") + ".json";

const BestSeller= document.getElementById("BestSellers");
const PriceLM= document.getElementById("PriceLM");
const PriceML= document.getElementById("PriceML");
const DesMin= document.getElementById("rangeFilterCountMin").value;
const DesMax= document.getElementById("rangeFilterCountMax").value;
const Filter= document.getElementById("Filter");
const ClearFilter= document.getElementById("ClearFilter");

/* contenido */
function getHTML(producto){
return `
  <div class="container shadow p-3 mb-5 bg-body rounded">
    <div class="card mb-3" style="max-width: 2000px;">
      <div class="row g-0">
        <div class="col-md-4">
          <img src="${producto.image}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${producto.name}</h5>
            <p class="card-text">${producto.description}</p>
            <p class="card-text"><small class="text-muted position-absolute bottom-0 end-1">Vendidos: ${producto.soldCount}</small></p>
            <p class="card-text"><small class="text-muted position-absolute bottom-0 end-0" style="padding-right:10px">${producto.currency} ${producto.cost}</small></p>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

};
/* ingresar contenido*/
document.addEventListener("DOMContentLoaded",async function(){
    const listado= document.getElementById("ListaProductos");
    const listaProductos= await getJSONData(URL);

    listaProductos.data.products.forEach(producto =>{
        listado.innerHTML += getHTML(producto);
    })
});
/* cambiar titulo*/
document.addEventListener("DOMContentLoaded", async () => {
  const titulo = document.getElementById("TituloProducto");
  const tituloProductos = await fetch(URL);
  const categoria = await tituloProductos.json();

  titulo.innerHTML += (categoria.catName);
});




