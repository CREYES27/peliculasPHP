
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("loginForm")===null){
        document.getElementById("sesionForm").addEventListener("submit", (event) => {
            event.preventDefault();
            validaSesion();
        });
    }else {
        document.getElementById("loginForm").addEventListener("submit", (event) => {
            event.preventDefault();
            validarCampos();
        });
    }

    document.querySelectorAll(".form-input").forEach((input) => {
        input.addEventListener("keydown", (event) => {
            if (event.key === "Tab" || event.key === "Enter") {
                event.preventDefault();
                if (document.getElementById("loginForm")===null){
                    validaSesion();
                }else{
                    validarCampos();
                }
            }
        });
    });

    
});

const validarCampos = () => {
    resetErrorMessages();
    const username = document.getElementById("user").value.trim();
    const email = document.getElementById("email_input").value.trim();
    const password = document.getElementById("password").value.trim();
    const pais = document.getElementById("pais").value.trim();
    let isValid = true;

    if (username === "") {
        displayErrorMessage("usernameError", "Ingrese un nombre de usuario.");
        document.getElementById("user").classList.add("is-invalid");
        isValid = false;
    } else {
        document.getElementById("user").classList.remove("is-invalid");
        document.getElementById("user").classList.add("is-valid");
    }

    if (!isValidEmail(email)) {
        displayErrorMessage("emailError", "Ingrese un correo electronico válido.");
        document.getElementById("email_input").classList.add("is-invalid");
        isValid = false;
    } else {
        document.getElementById("email_input").classList.remove("is-invalid");
        document.getElementById("email_input").classList.add("is-valid");
    }

    if (password.length < 8) {
        displayErrorMessage("passwordError", "La contraseña debe tener al menos 8 caracteres.");
        document.getElementById("password").classList.add("is-invalid");
        isValid = false;
    } else {
        document.getElementById("password").classList.remove("is-invalid");
        document.getElementById("password").classList.add("is-valid");
    }

    if (pais === "") {
        displayErrorMessage("paisError", "Seleccione su pais d origen.");
        document.getElementById("pais").classList.add("is-invalid");
        isValid = false;
    } else {
        document.getElementById("pais").classList.remove("is-invalid");
        document.getElementById("pais").classList.add("is-valid");
    }

    const terminos = document.getElementById('terminos');
	if(terminos.checked ){
        document.getElementById("terminos").classList.remove("is-invalid");
        document.getElementById("terminos").classList.add("is-valid");
		if (isValid) {
            alert("¡El Formulario fue enviado correctamente!");
            loginForm.reset();
        }
	} else {
        alert("¡Debe aceptar los terminos y condiciones para el registro.!");
        document.getElementById("pais").classList.add("is-invalid");
	}
};

//sesion
const validaSesion = () => {
    resetErrorMessages();
    const email = document.getElementById("email_input").value.trim();
    const password = document.getElementById("password").value.trim();
    const admin = document.querySelector('.administradorPeliculas');
    let isValid = true;

    if (!isValidEmail(email)) {
        displayErrorMessage("emailError", "Ingrese un correo electronico válido.");
        document.getElementById("email_input").classList.add("is-invalid");
        isValid = false;
    } else {
        document.getElementById("email_input").classList.remove("is-invalid");
        document.getElementById("email_input").classList.add("is-valid");
    }

    if (password.length < 8) {
        displayErrorMessage("passwordError", "La contraseña debe tener al menos 8 caracteres.");
        document.getElementById("password").classList.add("is-invalid");
        isValid = false;
    } else {
        document.getElementById("password").classList.remove("is-invalid");
        document.getElementById("password").classList.add("is-valid");
    }
    if (isValid) {
        alert("¡Bienvenido ha iniciado sesion correctamente!");
        sesionForm.reset();
        window.location.href = "../index.html";
    }
}

//reseteo mensaje error
const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
};

const displayErrorMessage = (elementId, message) => {
    const errorElement = document.getElementById(elementId);
    errorElement.innerText = message;
};

const resetErrorMessages = () => {
    const errorElements = document.querySelectorAll(".error-message");
    errorElements.forEach((element) => {
        element.innerText = "";
     
    });
};