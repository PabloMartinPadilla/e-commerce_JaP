let url = "https://japceibal.github.io/emercado-api/products/"+ localStorage.getItem("catIDprod") + ".json";

console.log(URL)
let ProductsInfoArray = [];
let ProductsComentsArray = [];



function showProductsInfoList() {
    let img = "";
    htmlContentToAppend = 
    `<h2 class="fw-bolder ">${ProductsInfoArray.name}</h2>
    <hr>
    <h4 class="mb-0">Categoria</h4>
    <p>${ProductsInfoArray.category}</p>    
    <h4 class="mb-0">Descrición</h4>
    <p>${ProductsInfoArray.description}</p>
    <h4 class="mb-0" >Precio</h4>
    <p > ${ProductsInfoArray.currency} ${ProductsInfoArray.cost}</p>

    <h4 class="mb-0">Cantidad de vendidos</h4>
    <p>${ProductsInfoArray.soldCount}</p>
  </div>`

    document.getElementById("info-productos").innerHTML = htmlContentToAppend;
    
    for (let i = 0; i < ProductsInfoArray.images.length; i++) {
        img += `<div class="">
                    <div>
                        <img src="${ProductsInfoArray.images[i]}"  width="300" class="float-start border" alt="...">
                    </div>
                </div>`
        document.getElementById("img-productos").innerHTML = img;
    }

}
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(url).then(function (resultObj) {
        if (resultObj.status === "ok") {
            ProductsInfoArray = resultObj.data;
            showProductsInfoList()
        }
    });
});

function puntuacion(puntuacion){
    if(puntuacion == 5){
        htmlContentToAppend = `                                
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>`
    }
    if(puntuacion == 4){
        htmlContentToAppend = `                                
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star "></span>`
    }
    if(puntuacion == 3){
        htmlContentToAppend = `                                
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>`
    }
    if(puntuacion == 2){
        htmlContentToAppend = `                                
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>`
    }
    if(puntuacion == 1){
        htmlContentToAppend = `                                
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>`
    }
    if(puntuacion == 0){
        htmlContentToAppend = `                                
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>`
    }
    return htmlContentToAppend;
}

function showProductsComents(){

    let htmlContentToAppend = "";
    for(let i = 0; i < ProductsComentsArray.length; i++){
        let coments = ProductsComentsArray[i];

            htmlContentToAppend += `
  <li class="list-group-item border shadow-sm  mb-2  rounded"><h6>${coments.user}:</h6>${puntuacion(coments.score)} <p>${coments.description}</p><p class="text-end fechacom fw-light">${coments.dateTime}</p></li>

        `
        document.getElementById("comentarios").innerHTML = htmlContentToAppend;
    }
}


document.addEventListener("DOMContentLoaded", function (e) {

    let idProduct = localStorage.getItem("catIDprod");
    let urlComents = PRODUCT_INFO_COMMENTS_URL + idProduct + EXT_TYPE;
    
    getJSONData(urlComents).then(function (resultObj) {
        if (resultObj.status === "ok") {
            ProductsComentsArray = resultObj.data;
            showProductsComents()
        }
    });
});
