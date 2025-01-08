const idProduct = localStorage.getItem("catIDprod");
const url = "https://japceibal.github.io/emercado-api/products/" + idProduct + ".json";
const urlComents = "https://japceibal.github.io/emercado-api/products_comments/" + idProduct + ".json";
let ProductsInfoArray = [];
let ProductsComentsArray = [];
const submit = document.getElementById("btnComentar");

function setCatID(id) {
    localStorage.setItem("catIDprod", id);
    window.location = "product-info.html";
}

/* Datos, img y productos relacionados */
function showProductsInfoList() {
    ProductsInfo = `
    <h2 class="fw-bolder">${ProductsInfoArray.name}</h2>
    <hr>
    <h4 class="mb-0">Categoria</h4>
    <p>${ProductsInfoArray.category}</p>    
    <h4 class="mb-0">Descripción</h4>
    <p>${ProductsInfoArray.description}</p>
    <h4 class="mb-0">Precio</h4>
    <p>${ProductsInfoArray.currency} ${ProductsInfoArray.cost}</p>
    <h4 class="mb-0">Cantidad de vendidos</h4>
    <p>${ProductsInfoArray.soldCount}</p>`;

    document.getElementById("info-productos").innerHTML = ProductsInfo;

    /* Carrusel de imágenes del producto */
    let carouselIndicators = "";
    let carouselInner = "";

    for (let i = 0; i < ProductsInfoArray.images.length; i++) {
        carouselIndicators += `<button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="${i}" ${i === 0 ? 'class="active" aria-current="true"' : ''} aria-label="Slide ${i + 1}"></button>`;

        carouselInner += `<div class="carousel-item ${i === 0 ? 'active' : ''}" data-bs-interval="3000">
            <img src="${ProductsInfoArray.images[i]}" class="d-block w-100" object-fit: cover;" alt="Imagen del producto">
        </div>`;
    }

    const carouselHTML = `
    <div id="carouselExampleDark" class="carousel carousel-dark slide">
        <div class="carousel-indicators">
            ${carouselIndicators}
        </div>
        <div class="carousel-inner">
            ${carouselInner}
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>`;

    document.getElementById("img-productos").innerHTML = carouselHTML;

    /* Productos relacionados */
    let products = "";
    for (let i = 0; i < ProductsInfoArray.relatedProducts.length; i++) {
        let ProductsRel = ProductsInfoArray.relatedProducts[i];
        products += `<div class="col-md-4 crece">
            <div class="card mb-4 shadow p-2 custom-card cursor-active user-select-none" onclick="setCatID(${ProductsRel.id})">
                <img class="bd-placeholder-img card-img-top" src="${ProductsRel.image}" alt="Imagen representativa del producto">
                <h3 class="m-3">${ProductsRel.name}</h3>
            </div>
        </div>`;
    }
    document.getElementById("rela-productos").innerHTML = products;
}

/* URL productos */
document.addEventListener("DOMContentLoaded", function () {
    getJSONData(url).then(function (resultObj) {
        if (resultObj.status === "ok") {
            ProductsInfoArray = resultObj.data;
            showProductsInfoList();
        }
    });
});

/* Estrellas */
function puntuacion(puntuacion) {
    let htmlContentToAppend = "";
    for (let i = 1; i <= 5; i++) {
        htmlContentToAppend += `<span class="fa fa-star ${i <= puntuacion ? 'checked' : ''}"></span>`;
    }
    return htmlContentToAppend;
}

/* Comentarios productos */
function showProductsComents() {
    let ProductsComents = "";
    for (let i = 0; i < ProductsComentsArray.length; i++) {
        let coments = ProductsComentsArray[i];

        ProductsComents += `
        <li class="list-group-item border shadow-sm mb-2 rounded">
            <h6>${coments.user}:</h6>
            ${puntuacion(coments.score)}
            <p>${coments.description}</p>
            <p class="text-end fechacom fw-light">${coments.dateTime}</p>
        </li>`;
    }
    document.getElementById("comentarios").innerHTML = ProductsComents;
}

/* URL comentarios */
document.addEventListener("DOMContentLoaded", function () {
    getJSONData(urlComents).then(function (resultObj) {
        if (resultObj.status === "ok") {
            ProductsComentsArray = resultObj.data;
            showProductsComents();
        }
    });
});

/* Nuevo comentario */
submit.addEventListener("click", function () {
    let txtArea = document.getElementById("ComentarioNuevo").value;
    let estrellas = document.getElementById("estrellas").value;
    let email = localStorage.getItem("userEmail");
    let date = new Date();
    let fecha = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    htmlContentToAppend = `
    <li class="list-group-item border shadow-sm mb-2 rounded">
        <h6>${email}:</h6>
        ${puntuacion(estrellas)}
        <p>${txtArea}</p>
        <p class="text-end fechacom fw-light">${fecha}</p>
    </li>`;

    document.getElementById("comentarios").innerHTML += htmlContentToAppend;
});
