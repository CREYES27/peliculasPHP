// Example starter JavaScript for disabling form submissions if there are invalid fields
/*(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()*/

 /* function resetErrorMessages() {
    console.log("voy a limpiar los divs");
    let errorElements = document.querySelectorAll(".error-message");
    errorElements.forEach((element)=> {
        element.innerText = "";
    });
    console.log("ya limpie los divs");
}
function displayErrorMessage(elementId, message) {
    let errorElement = document.getElementById(elementId);
    errorElement.innerText = message;
}
function isValidEmail(email) {
    // Utilizamos una expresión regular para validar el formato del correo electrónico
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // estructura texto@texto.texto

    return emailPattern.test(email);
}

//------------------------------------------

document.addEventListener("DOMContentLoaded", ()=>{
    const form = document.getElementById("loginForm");
    console.log(form);
    form.addEventListener("submit", (event)=>{
        // Evitar que se envíe el formulario automáticamente
        event.preventDefault();

        // Resetear los mensajes de error
        resetErrorMessages();

        // Validar los campos
        let username = document.getElementById("username").value.trim();
        let email = document.getElementById("email").value.trim();
        let password = document.getElementById("password").value.trim();
        let isValid = true;

        if (username === "") {
            displayErrorMessage("usernameError", "Por favor ingrese un usuario.");
            isValid = false;
        }

        if (!isValidEmail(email)) {
            displayErrorMessage("emailError", "Por favor ingrese un correo electrónico válido.");
            isValid = false;
        }

        if (password.length < 8) {
            displayErrorMessage("passwordError", "La contraseña debe tener al menos 8 caracteres.");
            isValid = false;
        }

        if (isValid) {
            // Aquí puedes enviar el formulario si todos los campos son válidos
            alert("¡Formulario enviado correctamente!");
            // Por ejemplo:
            // document.getElementById("loginForm").submit();
        }
    });
} );
*/


//*************************************************** 

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
        alert("¡Bienbenido ha iniciado sesion correctamente!");
        sesionForm.reset();
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

/*document.getElementById("loginForm").addEventListener('submit', (e) => {
	e.preventDefault();

	const terminos = document.getElementById('terminos');
	if(terminos.checked ){
		//loginForm.reset();
        document.getElementById("terminos").classList.remove("is-invalid");
        document.getElementById("terminos").classList.add("is-valid");
		
	} else {
        //displayErrorMessage("paisError", "Seleccione su pais d origen.");
        alert("¡Debe aceptar los terminos y condiciones para el registro.!");
        document.getElementById("pais").classList.add("is-invalid");
	}
});
/* ---------------------------------------------------------

let signUp = document.getElementById("signUp");
let signIn = document.getElementById("signIn");
let nameInput = document.getElementById("nameInput");
let title = document.getElementById("titulo");
let pais = document.getElementById("pais");

signIn.onclick = function(){
    nameInput.style.maxHeight = "0";
    pais.style.maxHeight = "0";
    title.innerHTML = "Login";
    signUp.classList.add("disable");
    signIn.classList.remove("disable");
}

signUp.onclick = function(){
    nameInput.style.maxHeight = "60px";
    pais.style.maxHeight = "80";
    title.innerHTML = "Registro";
    signUp.classList.remove("disable");
    signIn.classList.add("disable");
}*/