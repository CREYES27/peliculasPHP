
//Cuando el Dom este cargando, llama a la funcion para agregar el detalle
document.addEventListener("DOMContentLoaded", () =>{
    addTable();
    document.getElementById("admiForm").addEventListener("submit", (event) => {
        event.preventDefault();
        validarCampos();
    });

    document.querySelectorAll(".form-input").forEach((input) => {
        input.addEventListener("keydown", (event) => {
            if (event.key === "Tab" || event.key === "Enter") {
                event.preventDefault();
                validarCampos();
            }
        });
    });

});

const validarCampos = () => {
    resetErrorMessages();
    const titulo = document.getElementById("titulo").value.trim();
    const emision = document.getElementById("emision").value.trim();
    const duracion = document.getElementById("duracion").value.trim();
    const director = document.getElementById("direccion").value.trim();
    const sinopsis = document.getElementById("sinopsis").value.trim();
    const imagen = document.getElementById("imagen").value.trim();
    let isValid = true;

    if (titulo === "") {
        displayErrorMessage("tituloError", "Ingrese un nombre del Films.");
        document.getElementById("titulo").classList.add("is-invalid");
        isValid = false;
    } else {
        document.getElementById("titulo").classList.remove("is-invalid");
        document.getElementById("titulo").classList.add("is-valid");
    }

    if (emision === "") {
        displayErrorMessage("emisionError", "Ingrese la fecha de emisión del Films.");
        document.getElementById("emision").classList.add("is-invalid");
        isValid = false;
    } else {
        document.getElementById("emision").classList.remove("is-invalid");
        document.getElementById("emision").classList.add("is-valid");
    }

    if (duracion === "") {
        displayErrorMessage("duracionError", "Indique la uracion del Films.");
        document.getElementById("duracion").classList.add("is-invalid");
        isValid = false;
    } else {
        document.getElementById("duracion").classList.remove("is-invalid");
        document.getElementById("duracion").classList.add("is-valid");
    }

    if (director === "") {
        displayErrorMessage("direccionError", "Indique el director del Films.");
        document.getElementById("direccion").classList.add("is-invalid");
        isValid = false;
    } else {
        document.getElementById("direccion").classList.remove("is-invalid");
        document.getElementById("direccion").classList.add("is-valid");
    }

    if (sinopsis === "") {
        displayErrorMessage("sinopsisError", "Agregue una descripcion del Films.");
        document.getElementById("sinopsis").classList.add("is-invalid");
        isValid = false;
    } else {
        document.getElementById("sinopsis").classList.remove("is-invalid");
        document.getElementById("sinopsis").classList.add("is-valid");
    }

    if (imagen === "") {
        displayErrorMessage("imagenError", "Agregue una imagen del Films.");
        document.getElementById("imagen").classList.add("is-invalid");
        isValid = false;
    } else {
        document.getElementById("imagen").classList.remove("is-invalid");
        document.getElementById("imagen").classList.add("is-valid");
    }

};

//reseteo mensaje error
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
