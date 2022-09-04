const URL = "https://japceibal.github.io/emercado-api/cats_products/"+ localStorage.getItem("catID") + ".json"
const CATEGORIES = "https://japceibal.github.io/emercado-api/cats/cat.json";
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

}

document.addEventListener("DOMContentLoaded",async function(){
    const listado= document.querySelector(".product-list");
    const listaProductos= await getJSONData(URL);
/*    const datos= listaAutos.data.products;
    console.log(listaAutos);
    console.log(datos); */
    listaProductos.data.products.forEach(producto =>{
        listado.innerHTML += getHTML(producto)
    })
});

document.addEventListener("DOMContentLoaded", async () => {
  const titulo = document.getElementById("TituloProducto")
  const tituloProductos = await fetch(URL);
  const categoria = await tituloProductos.json();

  titulo.innerHTML += (categoria.catName)
});