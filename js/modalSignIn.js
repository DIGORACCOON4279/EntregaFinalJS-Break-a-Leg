
// Modal SignIn

document.addEventListener('DOMContentLoaded', function () {
  const formSignIn = document.querySelector('.formLogIn');

  if (formSignIn) {
    formSignIn.addEventListener('submit', function (event) {
      event.preventDefault();

      // Mostrar el toast de SweetAlert
      let Toast = Swal.mixin({
        toast: true,
        position: "top-right",
        showConfirmButton: false,
        iconColor: '#bc2327',
        timer: 3500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
        didOpen: () => {
          const title = document.querySelector('.swal2-title');
          if (title) {
            title.style.color = '#6b6b6b';
            title.style.fontSize = '1rem';
          }
        },
      });

      Toast.fire({
        icon: "success",
        title: "Signed in successfully!",
      });

    });
  } else {
    console.error("Elemento con clase 'formSignIn' no encontrado en el DOM.");
  }
});
