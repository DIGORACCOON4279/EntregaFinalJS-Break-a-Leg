
// Wishlist y localStorage

console.log("Script loaded: wishlist.js");

// Obtiene la sección de wishlist

const wishlistContainer = document.querySelector('.sectionWishlist .containerWishlist');

// Storage
let wishlistProducts;
let wishlistProductsLS = localStorage.getItem("wishlistProducts");
if(wishlistProductsLS) {
    wishlistProducts = JSON.parse(wishlistProductsLS);
} else {
    wishlistProducts = [];
}

// Función para renderizar wishlist
function renderWishlist(wishlistItems) {
    wishlistContainer.innerHTML = "";

    // Determinar la ruta base en función de la ubicación del script
    const isIndexPage = window.location.pathname.endsWith('index.html');
    const basePath = isIndexPage ? '' : '../';

    wishlistItems.forEach(wishlistItem => {
        if (wishlistItem) {
            const wishlistProduct = document.createElement("article");
            wishlistProduct.classList.add("wishlist");
            wishlistProduct.setAttribute("data-product-id", wishlistItem.id);

            wishlistProduct.innerHTML = `
                <div class="blockProduct">
                    <img class="itemProduct" src="${wishlistItem.image}" alt="Product pic">
                    <div class="description">
                        <p class="wishPrice">$${wishlistItem.pricing}</p>
                        <div class="icons">
                            <img class="delete" src="${basePath}img/trash_Icon.svg" alt="Trash icon">
                            <img class="edit" src="${basePath}img/edit_Icon.svg" alt="Edit icon">
                        </div>
                    </div>
                    <img class="itemWishlist" src="${basePath}img/wishlist_Icon.svg" alt="Wishlist icon">
                </div>
            `;

            wishlistProduct.querySelector('.delete').addEventListener('click', () => {
                eliminarDeWishlist(wishlistItem.id);
            });

            wishlistProduct.querySelector('.edit').addEventListener('click', () => {
                // Redirigir a la página de error404 con la ruta base
                window.location.href = `${basePath}views/error404.html`;
            });

            wishlistContainer.appendChild(wishlistProduct);
        }
    });
}

// Función para agregar wishlist
function agregarAWishlist(selectedOutfit) {

    if (!selectedOutfit || !selectedOutfit.id) {
        console.error("El producto seleccionado no tiene un ID válido:", selectedOutfit);
        return;
    }

    const existingWishlistItem = wishlistProducts.find(item => item && item.id === selectedOutfit.id);

    if (existingWishlistItem) {

        // Mensaje de alerta
        const message = document.createElement('div');
        message.innerHTML = `<p class='messageWishlist'>"This product is already added to your wishlist ⚡!!!"</p>`;

        // Inserta el mensaje
        const messageContainer = document.getElementById('messageContainer');
        messageContainer.appendChild(message);

        setTimeout(() => {
            message.remove();
        }, 2250);

        return;
    }

    wishlistProducts.push(selectedOutfit);

    localStorage.setItem("wishlistProducts", JSON.stringify(wishlistProducts));

    renderWishlist(wishlistProducts);

    console.log("Producto agregado a la wishlist:", selectedOutfit);
}


// Función para eliminar desde wishlist
function eliminarDeWishlist(productId) {

    const index = wishlistProducts.findIndex(product => product && product.id == productId);

    if (index !== -1) {
        wishlistProducts.splice(index, 1);
        console.log("Producto eliminado de la wishlist:", productId);

        localStorage.setItem("wishlistProducts", JSON.stringify(wishlistProducts));

        renderWishlist(wishlistProducts);
    } else {
        console.log("Producto no encontrado en la wishlist:", productId);
    }
}

renderWishlist(wishlistProducts);






