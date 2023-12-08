
// Modal PlaceOnOrder

const placeOnOrder = document.getElementById("unionOrder");

placeOnOrder.addEventListener('submit', (event) => {
    console.log("Formulario enviado");  // Asegúrate de que se imprima en la consola del navegador
    event.preventDefault();
    Swal.fire({
        title: "Payment successful!",
        text: "Purchase order number is 526896-589, and we've sent a confirmation to your email.",
        icon: "success",
    });
});