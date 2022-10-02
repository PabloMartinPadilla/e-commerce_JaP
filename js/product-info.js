const idProduct=  localStorage.getItem("catIDprod");
const url = "https://japceibal.github.io/emercado-api/products/"+ idProduct + ".json";
const urlComents = "https://japceibal.github.io/emercado-api/products_comments/" + idProduct + ".json";
let ProductsInfoArray = [];
let ProductsComentsArray = [];
const submit = document.getElementById("btnComentar");

function setCatID(id) {
    localStorage.setItem("catIDprod", id);
    window.location = "product-info.html"
}


/*  Datos e img producto    */
function showProductsInfoList() {
    ProductsInfo = 
    `<h2 class="fw-bolder ">${ProductsInfoArray.name}</h2>
    <hr>
    <h4 class="mb-0">Categoria</h4>
    <p>${ProductsInfoArray.category}</p>    
    <h4 class="mb-0">Descrición</h4>
    <p>${ProductsInfoArray.description}</p>
    <h4 class="mb-0" >Precio</h4>
    <p > ${ProductsInfoArray.currency} ${ProductsInfoArray.cost}</p>

    <h4 class="mb-0">Cantidad de vendidos</h4>
    <p>${ProductsInfoArray.soldCount}</p>`

    document.getElementById("info-productos").innerHTML = ProductsInfo;
   
    /* imagenes productos */
    let ProductsImag = "";
    for (let i = 0; i < ProductsInfoArray.images.length; i++) {
        ProductsImag += `<div class=" ">
                    <div>
                        <img src="${ProductsInfoArray.images[i]}"  width="300" class="float-start border" alt="...">
                    </div>
                </div>`
        document.getElementById("img-productos").innerHTML = ProductsImag;
    }
    /*  productos relacionados   */
    let products="";
    for (let i=0; i<ProductsInfoArray.relatedProducts.length; i++){
        let item = ProductsInfoArray.relatedProducts[i]
        products +=`<div class="col-md-4 crece">
            <div class="card mb-4 shadow p-2 custom-card cursor-active user-select-none" onclick="setCatID(${item.id})">
              <img class="bd-placeholder-img card-img-top" src="${item.image}"
                alt="Imgagen representativa del producto">
              <h3 class="m-3">${item.name}</h3>
            </div>
          </div>
        `           
        document.getElementById("rela-productos").innerHTML = products;}

}
/* url productos */ 
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(url).then(function (resultObj) {
        if (resultObj.status === "ok") {
            ProductsInfoArray = resultObj.data;
            showProductsInfoList();
        }
    });
});
/* estrellas */
function puntuacion(puntuacion){    
    if(puntuacion == 0){
        htmlContentToAppend = `                                
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
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
    if(puntuacion == 2){
        htmlContentToAppend = `                                
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>`
    }
    if(puntuacion == 3){
        htmlContentToAppend = `                                
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>`
    }
    if(puntuacion == 4){
        htmlContentToAppend = `                                
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star "></span>`
    }
    if(puntuacion == 5){
        htmlContentToAppend = `                                
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>`
    }
    return htmlContentToAppend;
}
/* comentarios productos */
function showProductsComents(){

    let ProductsComents = "";
    for(let i = 0; i < ProductsComentsArray.length; i++){
        let coments = ProductsComentsArray[i];

    ProductsComents += `
    <li class="list-group-item border shadow-sm  mb-2  rounded"><h6>${coments.user}:</h6>${puntuacion(coments.score)} <p>${coments.description}</p><p class="text-end fechacom fw-light">${coments.dateTime}</p></li>

        `
        document.getElementById("comentarios").innerHTML = ProductsComents;
    }
}
/* url comentarios */
document.addEventListener("DOMContentLoaded", function (e) {    
    getJSONData(urlComents).then(function (resultObj) {
        if (resultObj.status === "ok") {
            ProductsComentsArray = resultObj.data;
            showProductsComents()
        }
    });
});
/*nuevo comentario*/
submit.addEventListener("click", function(){
    let txtArea = document.getElementById("ComentarioNuevo").value;
    let estrellas = document.getElementById("estrellas").value;
    let email = localStorage.getItem("userEmail");
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let fecha = year + "-" + month + "-" + day + " "+ hours+ ":"+minutes+":"+seconds;
    htmlContentToAppend = `
    <li class="list-group-item border shadow-sm  mb-2  rounded"><h6>${email}:</h6>${puntuacion(estrellas)} <p>${txtArea}</p><p class="text-end fechacom fw-light">${fecha}</p></li>`      
    document.getElementById("comentarios").innerHTML += htmlContentToAppend;
    

});

