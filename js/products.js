const URL = "https://japceibal.github.io/emercado-api/cats_products/"+ localStorage.getItem("catID") + ".json";

const ORDER_ASC_BY_PRICE= "PriceLM";
const ORDER_DESC_BY_PRICE = "PriceML";
const ORDER_BY_PROD_REL = "BestSellers"
let ProductsArray = [];
let ProductsArrayP = ProductsArray.products;
let currentSortCriteriaProduct = undefined;
let minPrice = undefined;
let maxPrice = undefined;

/* cambiar titulo*/
document.addEventListener("DOMContentLoaded", async () => {
  const titulo = document.getElementById("TituloProducto");
  const tituloProductos = await fetch(URL);
  const categoria = await tituloProductos.json();

  titulo.innerHTML += (categoria.catName);
});
/* funciones para ordenar */
function sortProducts(criteria, array){
    let result = [];
     if (criteria === ORDER_ASC_BY_PRICE){ /*Ordena de manera ascendente de acuerdo al precio*/
        result = array.sort(function(a, b) {
            let aPrice = parseInt(a.cost);
            let bPrice = parseInt(b.cost);

            if ( aPrice < bPrice ){ return -1; }
            if ( aPrice > bPrice ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_PRICE){ /*Ordena de manera descendente de acuerdo al precio*/
        result = array.sort(function(a, b) {
            let aPrice = parseInt(a.cost);
            let bPrice = parseInt(b.cost);

            if ( aPrice > bPrice ){ return -1; }
            if ( aPrice < bPrice ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_REL){ /*Ordena de manera descendente de acuerdo a cantidad vendidos*/
        result = array.sort(function(a, b) {
            let aPrice = parseInt(a.soldCount);
            let bPrice = parseInt(b.soldCount);

            if ( aPrice > bPrice ){ return -1; }
            if ( aPrice < bPrice ){ return 1; }
            return 0;
        });
    }
    return result;
}
/* productos */
function showProductsList() {
    let htmlContentToAppend = "";
    for (let i = 0; i < ProductsArray.products.length; i++) {
        let product = ProductsArray.products[i];

        if (((minPrice == undefined) || (minPrice != undefined && parseInt(product.cost) >= minPrice)) &&
            ((maxPrice == undefined) || (maxPrice != undefined && parseInt(product.cost) <= maxPrice))){

        htmlContentToAppend += `
        <div onclick="setCatID(${product.id})" class="tarjet crece shadow  mb-2 list-group-item list-group-item-action cursor-active rounded ">
                <div class="row">
                    <div class="col-3">
                        <img src="${product.image}" alt="${product.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${product.name}</h4>
                            <small class="text-muted"> Vendidos: ${product.soldCount}</small>
                        </div>
                        <p class="descat mb-1">${product.description}</p>
                        <h5 class="card-text"><small class="text-muted position-absolute bottom-0 end-0" style="padding:10px">${product.currency} ${product.cost}</small></h5>
                    </div>
                </div>
            </div>
`;

/* <div class="container shadow p-3 mb-5 bg-body rounded">
    <div class="card mb-3" style="max-width: 2000px;">
      <div class="row g-0">
        <div class="col-md-4">
          <img src="${product.image}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.description}</p>
            <p class="card-text"><small class="text-muted position-absolute bottom-0 end-1">Vendidos: ${product.soldCount}</small></p>
            <p class="card-text"><small class="text-muted position-absolute bottom-0 end-0" style="padding-right:10px">${product.currency} ${product.cost}</small></p>
          </div>
        </div>
      </div>
    </div>
  </div> */

        }
        document.getElementById("ListaProductos").innerHTML = htmlContentToAppend;
    }
}
/* ordena y muestras los produtos */
function sortAndShowProducts(sortCriteria, productsArray){
  currentSortCriteriaProduct = sortCriteria;

  if(productsArray != undefined){
      ProductsArrayP = productsArray;
  }

  ProductsArrayP = sortProducts(currentSortCriteriaProduct, ProductsArrayP);

  showProductsList();
}
/* utilizando las funciones para ordenar los productos */
document.addEventListener("DOMContentLoaded", function (e) {

  getJSONData(URL).then(function (resultObj) {
      if (resultObj.status === "ok") {
          ProductsArray = resultObj.data;
          showProductsList()
          sortAndShowProducts(ORDER_ASC_BY_PRICE, resultObj.data.products);
      }
  });

  document.getElementById("PriceLM").addEventListener("click", function(){
      sortAndShowProducts(ORDER_ASC_BY_PRICE);
  });

  document.getElementById("PriceML").addEventListener("click", function(){
      sortAndShowProducts(ORDER_DESC_BY_PRICE);
  });

  document.getElementById("BestSellers").addEventListener("click", function(){
      sortAndShowProducts(ORDER_BY_PROD_REL);
  });

  document.getElementById("clearRangeFilter").addEventListener("click", function(){
      document.getElementById("rangeFilterPriceMin").value = "";
      document.getElementById("rangeFilterPriceMax").value = "";

      minPrice = undefined;
      maxPrice = undefined;

      showProductsList();
  });

  document.getElementById("rangeFilterPrice").addEventListener("click", function(){

      minPrice = document.getElementById("rangeFilterPriceMin").value;
      maxPrice = document.getElementById("rangeFilterPriceMax").value;

      if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0){
          minPrice = parseInt(minPrice);
      }
      else{
          minPrice = undefined;
      }

      if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0){
          maxPrice = parseInt(maxPrice);
      }
      else{
          maxPrice = undefined;
      }

      showProductsList();
  });
});
