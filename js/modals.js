
// Modal CreateAccount library SweetAlert

const formCreateAccount = document.querySelector(".formCreateAccount");

formCreateAccount.addEventListener('submit', (event) => {
    event.preventDefault();
    Swal.fire({
        title: "Great work!",
        text: "You have created your account successfully!",
        icon: "success",
        iconColor: '#bc2327',
    });
});



