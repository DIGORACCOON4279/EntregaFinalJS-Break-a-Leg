
console.log("Script loaded: filter.js");

// Filter

// Obtiene elementos del filtro

const inStockCheckbox = document.getElementById("inStock");
const newArrivalsCheckbox = document.getElementById("newArrivals");
const soldOutCheckbox = document.getElementById("soldOut");

const priceOneCheckbox = document.getElementById("priceOne");
const priceTwoCheckbox = document.getElementById("priceTwo");
const priceThreeCheckbox = document.getElementById("priceThree");

// Controladores de eventos para checkboxes
inStockCheckbox.addEventListener("change", applyFilter);
newArrivalsCheckbox.addEventListener("change", applyFilter);
soldOutCheckbox.addEventListener("change", applyFilter);

priceOneCheckbox.addEventListener("change", applyFilter);
priceTwoCheckbox.addEventListener("change", applyFilter);
priceThreeCheckbox.addEventListener("change", applyFilter);


// Funcion aplicar filtros
function applyFilter() {
    const filteredProducts = outfits.filter(product => {
        const isInStock = inStockCheckbox.checked ? product.stock > 0 : true;
        const isNewArrival = newArrivalsCheckbox.checked ? product.availability === "New Arrivals" : true;
        const isSoldOut = soldOutCheckbox.checked ? product.availability === "Sold-out" : true;

        const isPriceOne = priceOneCheckbox.checked ? product.pricing === 499 : true;
        const isPriceTwo = priceTwoCheckbox.checked ? product.pricing === 599 : true;
        const isPriceThree = priceThreeCheckbox.checked ? product.pricing === 999 : true;

        return isInStock && isNewArrival && isSoldOut && isPriceOne && isPriceTwo && isPriceThree;
    });

    clearProducts();

    renderProducts(filteredProducts);
}

document.addEventListener("DOMContentLoaded", () => {

    clearProducts();

    renderProducts(outfits);
});


// Función para reiniciar el filtro
function resetFilter() {

    // Reinicia los checkboxes

    inStockCheckbox.checked = true;
    newArrivalsCheckbox.checked = true;
    soldOutCheckbox.checked = true;

    priceOneCheckbox.checked = true;
    priceTwoCheckbox.checked = true;
    priceThreeCheckbox.checked = true;

    clearProducts();

    renderProducts(outfits);
}

// Función para limpiar la sección de productos
function clearProducts() {
    const sectionCard = document.querySelector(".sectionCard");
    sectionCard.innerHTML = "";
}

// Inicializa la página con todos los productos
document.addEventListener("DOMContentLoaded", () => {

    clearProducts();

    renderProducts(outfits);
});





