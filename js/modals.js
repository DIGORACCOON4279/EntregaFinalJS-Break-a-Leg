
// Modal CreateAccount library SweetAlert

document.addEventListener('DOMContentLoaded', function () {

    const formCreateAccount = document.querySelector(".formCreateAccount");

    if (formCreateAccount) {
        formCreateAccount.addEventListener('submit', function (event) {
            event.preventDefault();
            Swal.fire({
                title: "Great work!",
                text: "You have created your account successfully!",
                icon: "success",
                iconColor: '#bc2327',
            });
        });
    } else {
        console.error("Elemento con class 'formCreateAccount' no encontrado en el DOM.");
    }
});
