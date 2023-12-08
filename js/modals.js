

// Modal SignIn

const formSignIn = document.querySelector(".formLogIn");

formSignIn.addEventListener('submit', (event) => {
    event.preventDefault();
    Swal.fire({
        title: "Well done!",
        text: "You have logged in successfully!",
        icon: "success",
    });
});

// Modal CreateAccount

const formCreateAccount = document.querySelector(".formCreateAccount");

formCreateAccount.addEventListener('submit', (event) => {
    event.preventDefault();
    Swal.fire({
        title: "Great work!",
        text: "You have created your account successfully!",
        icon: "success",
    });
});


