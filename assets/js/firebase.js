

export function firebase() {
  const loggedOutLinks = document.querySelectorAll(".logged-out");
    const loggedInLinks = document.querySelectorAll(".logged-in");

    const loginCheck = (user) => {

        if (user ) {
            loggedInLinks.forEach((link) => (link.style.display = "block"));
            loggedOutLinks.forEach((link) => (link.style.display = "none"));

        } else {
            loggedInLinks.forEach((link) => (link.style.display = "none"));
            loggedOutLinks.forEach((link) => (link.style.display = "block"));

        }
    };

    // ingreso
    const signInForm = document.querySelector("#login-form");
    signInForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = signInForm["login-email"].value;
        const password = signInForm["login-password"].value;

        // autentificacion usuario para imprimir cards

        auth.signInWithEmailAndPassword(email, password)

        .then((userCredential) => { //
                // clear the form
                signInForm.reset();
                // cerrar el modal
                $("#signinModal").modal("hide");
                document.location.reload()
            })
            .catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                //alert(errorCode);
                let errorIngresoHtml = document.getElementById('mensaje-error-ingreso');
                errorIngresoHtml.innerHTML = `   <p>${errorMessage}</p>  `

            })

    });

    // eventos
    //lista para cambios de estado de autenticación
    auth.onAuthStateChanged((user) => { //desde auth voy a usar un metodo onauth que se dispara 
        if (user) { // cada vez que cambia la autenticacion y obtiene el objeto user, si user existe
            console.log("signin");
            loginCheck(user);
            console.log(user.email);
        }
        else {
            console.log("signout");
            loginCheck(user);


        }
    });
    
    auth.onAuthStateChanged(function(user) {
        if (user) {
            let name, email, photoUrl, uid, emailVerified;

            user.providerData.forEach(function(profile) {

                name = user.displayName;
                email = profile.email;
                photoUrl = user.photoURL;
                emailVerified = user.emailVerified;
                uid = user.uid;

                let nameHtml = document.getElementById('perfilEmail');
                nameHtml.innerHTML = `   ${email}  `

             

            });

        }
    });

    // salida
    const logout = document.querySelector("#logout");
    logout.addEventListener("click", (e) => {
        e.preventDefault();
        auth.signOut()
            .then(() => { //si el cierre de la sesion fue correcto quiero que hagas luego
                console.log("signup out");
                document.location.reload()
            })
            .catch(function(error) {
                console.log('Error occurred:', error);
            })
    });



}

firebase()