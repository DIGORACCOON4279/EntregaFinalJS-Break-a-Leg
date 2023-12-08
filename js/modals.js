

// PopUp SignIn

const formSignIn = document.querySelector(".formLogIn");

formSignIn.addEventListener('submit', (event) => {
    event.preventDefault();
    Swal.fire({
        title: "Good job!",
        text: "You have logged in successfully!",
        icon: "success",
    });
});

// PopUp CreateAccount

const formCreateAccount = document.querySelector(".formCreateAccount");

formCreateAccount.addEventListener('submit', (event) => {
    event.preventDefault();
    Swal.fire({
        title: "Good job!",
        text: "You have created your account successfully!",
        icon: "success",
    });
});


