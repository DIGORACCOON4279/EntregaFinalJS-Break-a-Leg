

const btnAlertSignIn = document.querySelector(".btnSignIn");

btnAlertSignIn.addEventListener('click', () => {
    Swal.fire({
        title: "Good job!",
        text: "You have logged in successfully!",
        icon: "success",
    });
})

const btnAlertCreateAccount = document.querySelector(".btnCreateAccount");

btnAlertCreateAccount.addEventListener('click', () => {
    Swal.fire({
        title: "Good job!",
        text: "You have created your account successfully!",
        icon: "success",
    });
})
