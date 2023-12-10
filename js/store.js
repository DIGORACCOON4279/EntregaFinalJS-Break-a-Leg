
console.log("Script loaded: store.js");

// Store

let cartProducts;
let cartProductsLS = localStorage.getItem("cartProducts")

// Verificar si cartProductsLS es un array antes de parsearlo
if (cartProductsLS) {
    try {
        cartProducts = JSON.parse(cartProductsLS);
        // Verificar si cartProducts es un array
        if (!Array.isArray(cartProducts)) {
            cartProducts = [];
        }
    } catch (error) {
        console.error("Error al analizar el carrito desde el almacenamiento local:", error);
        cartProducts = [];
    }
} else {
    cartProducts = [];
}

let addButton = document.querySelectorAll(".linkStore");
let sectionCard = document.querySelector(".sectionCard");

// Funcion para renderizar productos
function renderProducts(outfitsArray) {
    outfitsArray.forEach(outfit => {

        if (!outfit.id) {
            console.error("El producto no tiene un ID válido:", outfit);
            return;
        }

        const cart = document.createElement("article");
        cart.classList.add("cardProducts");

        const outfitId = outfit.id;
        const availabilityClass = outfit.availability === "Sold-out" || outfit.stock === 0 ? "Sold-out" : "";

        cart.innerHTML =
        `
                        <div class="article ${availabilityClass}">
                            ${outfit.availability === "Sold-out" || outfit.stock === 0 ? '<p class="soldOutLabel">Sold Out</p>' : ''}
                            <img class="outFit" src="${outfit.image}" alt="Outfit Image">
                            <div class="info">
                                <img class="heartIcon" src="../img/wishlist_Icon.svg" alt="Wishlist icon" >
                                <p class="price">${outfit.category}.......... $${outfit.pricing}</p>
                                <button class="linkStore" type="button" id="${outfitId}"> Add to cart </button>
                            </div>
                        </div>
        `;

        sectionCard.appendChild(cart);

    });

    addToCartButton();

}

renderProducts(outfits);

// Funcion agregar al carrito
function addToCartButton() {
    addButton = document.querySelectorAll(".linkStore");
    addButton.forEach(button => {
        button.onclick = async (e) => {
            const outfitId = e.currentTarget.id;
            const selectedOutfit = outfits.find(outfit => outfit.id == outfitId);

            if (selectedOutfit.stock === 0 || selectedOutfit.availability === "Sold-out") {

                const messageSection = document.createElement("section");
                messageSection.setAttribute("id", "out-of-stock-message");

                const bodyElement = document.body;
                if (bodyElement) {

                    const messageParagraph = document.createElement("div");
                    messageParagraph.innerHTML = `<p class="soldOutProduct">"¡This product is out of stock or there are no units available 🔕!"</p>`;

                    messageSection.appendChild(messageParagraph);

                    bodyElement.appendChild(messageSection);

                    e.currentTarget.classList.add("sold-out-button");

                    await new Promise(resolve => setTimeout(resolve, 2250));

                    messageSection.remove();

                    // Elimina la clase 'sold-out-button' después del tiempo de espera
                    // e.currentTarget.classList.remove("sold-out-button");
                }

                return;
            }

            agregarAlCarrito(selectedOutfit);
        };
    });

    const heartIcons = document.querySelectorAll(".heartIcon");
    heartIcons.forEach(icon => {
        icon.addEventListener('click', (e) => {
            console.log("Clic en el icono de corazón");

            const linkStoreElement = e.currentTarget.parentElement.querySelector(".linkStore");

            if (linkStoreElement && linkStoreElement.id) {
                const outfitId = linkStoreElement.id;
                console.log("ID del producto:", outfitId);

                const selectedOutfit = outfits.find(outfit => outfit.id == outfitId);
                console.log("Producto seleccionado:", selectedOutfit);

                agregarAWishlist(selectedOutfit);
            } else {
                console.error("No se pudo obtener el ID del producto.");
            }
        });
    });
}


// Funcion agregar al carrito

function agregarAlCarrito(selectedOutfit) {
    const existingCartItem = cartProducts.find(item => item.id == selectedOutfit.id);

    if (existingCartItem) {

        if (existingCartItem.quantity < 5) {
            existingCartItem.quantity++;
        } else {

            const messageProduct = document.createElement("div");
            messageProduct.classList.add("messageProduct");
            messageProduct.innerHTML = `<p class="stockProduct">"You cannot add more than 5 units of a product 🚀"</p>`;

            const messageContainer = document.getElementById('messageNewProduct'); // Reemplaza con el ID real de tu contenedor
            messageContainer.appendChild(messageProduct);

            setTimeout(() => {
                messageProduct.remove();
            }, 2250);
            return;
        }
    } else {

        selectedOutfit.quantity = 1;
        cartProducts.push(selectedOutfit);
    }

    console.log(cartProducts);
    renderCart(cartProducts);

    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
}











