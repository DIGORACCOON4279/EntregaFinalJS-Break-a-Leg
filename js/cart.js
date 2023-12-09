
console.log("Script loaded: cart.js");

// Carrito y localStorage

let cartStorage = localStorage.getItem("cartProducts");
cartStorage = JSON.parse(cartStorage);

let cartContainer = document.querySelector(".containerArticles");

// Funcion para renderizar el carrito
function renderCart(cartItems) {
    cartContainer.innerHTML = "";

    // Determinar la ruta base en función de la ubicación del script
    const isIndexPage = window.location.pathname.endsWith('index.html');
    const basePath = isIndexPage ? '' : '../';

    if (!Array.isArray(cartItems)) {
        cartItems = [];
    }

    cartItems.forEach(cartItem => {
        const cart = document.createElement("article");
        cart.classList.add("cartList");
        cart.setAttribute("data-product-id", cartItem.id);
        cart.innerHTML = `
            <img class="itemProduct" src="${cartItem.image}" alt="Product pic">
            <div class="description">
                <p class="price"> $${cartItem.pricing} </p>
                <div class="icons">
                    <img src="${basePath}img/trash_Icon.svg" alt="Trash icon" class="delete-icon">
                    <img src="${basePath}img/edit_Icon.svg" alt="Edit icon" class="edit-icon">
                </div>
            </div>
            <div class="itemNumber">
                <div class="counter">
                    <button class="minusBtn">-</button>
                    <span class="counterValue">${cartItem.quantity}</span>
                    <button class="plusBtn">+</button>
                </div>
            </div>
            <p class="total">$${cartItem.pricing * cartItem.quantity}</p>
        `;

        cartContainer.appendChild(cart);

        const counterValue = cart.querySelector(".counterValue");
        const plusButton = cart.querySelector(".plusBtn");
        const minusButton = cart.querySelector(".minusBtn");

        plusButton.addEventListener('click', () => {
            actualizarContador(cartItem, counterValue, 1);
        });

        minusButton.addEventListener('click', () => {
            actualizarContador(cartItem, counterValue, -1);
        });

        const deleteIcon = cart.querySelector(".delete-icon");
        deleteIcon.addEventListener('click', () => {
            eliminarDelCarrito(cartItem.id);
        });

        const editIcon = cart.querySelector(".edit-icon");
        editIcon.addEventListener('click', () => {
            // Redirigir a la página de error404 con la ruta base
            window.location.href = `${basePath}views/error404.html`;
        });
    });

    actualizarTotalCarrito();
}

renderCart(cartStorage);

// Función para eliminar un producto del carrito por su ID
function eliminarDelCarrito(productId) {
    const index = cartProducts.findIndex(product => product.id == productId);

    if (index !== -1) {
        const precioProductoEliminado = cartProducts[index].pricing * cartProducts[index].quantity;
        const totalCarritoElement = document.getElementById('cartTotal');

        if (totalCarritoElement) {
            const totalCarrito = calcularTotalCarrito(cartProducts) - precioProductoEliminado;
            totalCarritoElement.textContent = `Total: $${totalCarrito}`;
        }

        cartProducts.splice(index, 1);
        console.log("Producto eliminado del carrito:", productId);

        localStorage.setItem("cartProducts", JSON.stringify(cartProducts));

        renderCart(cartProducts);
    } else {
        console.log("Producto no encontrado en el carrito:", productId);
    }
}

// Función para calcular el total del carrito
function calcularTotalCarrito(carrito) {
    let total = 0;

    carrito.forEach(item => {
        total += item.pricing * item.quantity;
    });

    return total;
}

// Función para renderizar y actualizar el total del carrito en el HTML
function renderizarTotalCarrito(carrito) {
    const totalCarrito = calcularTotalCarrito(cartProducts);
    const totalCarritoElement = document.getElementById('cartTotal');

    if (totalCarritoElement) {
        totalCarritoElement.textContent = `Total: $${totalCarrito}`;
    }

    renderCart(cartProducts);
}

// Funcion para actuzalizar contador
function actualizarContador(cartItem, counterElement, incremento) {
    let contador = parseInt(counterElement.innerHTML);

    function crearModal(message) {
        const messageProduct = document.createElement("div");
        messageProduct.classList.add("messageProduct");
        messageProduct.innerHTML = `<p class="stockProduct">${message}</p>`;

        const messageContainer = document.getElementById('messageNewProduct'); // Reemplaza con el ID real de tu contenedor
        messageContainer.appendChild(messageProduct);

        setTimeout(() => {
            messageProduct.remove();
        }, message === "You cannot add more than 5 units of a product 🚀" ? 3000 : 2250);
    }

    if ((contador + incremento) > 5 || (contador + incremento) < 1) {
        if (contador + incremento > 5) {
            crearModal("You cannot add more than 5 units of a product 🚀");
        } else {
            crearModal("The minimum allowed quantity is 1 unit 👍");
        }
        return;
    }

    contador += incremento;
    counterElement.innerHTML = contador;
    const index = cartProducts.findIndex(product => product.id == cartItem.id);

    if (index !== -1) {
        cartProducts[index].quantity = contador;

        localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    }

    const totalElement = counterElement.closest(".cartList").querySelector(".total");
    totalElement.innerHTML = `$${cartItem.pricing * contador}`;

    actualizarTotalCarrito();
}

// Funcion para actualizar total del carrito
function actualizarTotalCarrito() {
    const totalCarrito = calcularTotalCarrito(cartProducts);
    const totalCarritoElement = document.getElementById('cartTotal');

    if (totalCarritoElement) {
        totalCarritoElement.textContent = `Total.................................  $${totalCarrito}`;
    }
}





