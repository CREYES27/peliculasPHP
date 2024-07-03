
//Cuando el Dom este cargando, llama a la funcion para agregar el detalle
document.addEventListener("DOMContentLoaded", async () => {
    const formulario = document.getElementById('admiForm');
    const tbody = document.getElementById('bodyTablePeliculas');

    const peliculas = await getPeliculas();
    peliculas.forEach(pelicula => {
        const tr = document.createElement('tr');
        const tdTitle = document.createElement('td');
        tdTitle.textContent = pelicula.titulo;
        const tdDuration = document.createElement('td');
        tdDuration.textContent = pelicula.duracion;
        const tdGenres = document.createElement('td');
        tdGenres.textContent = pelicula.genero;
        const tdImage = document.createElement('td');
        
        const img = document.createElement('img');
        img.src = "../assets/img/" + pelicula.imagen;
        img.width = '150';
        img.alt = pelicula.titulo;
        tdImage.appendChild(img);
        img.classList.add('img-fluid');
        img.classList.add('img-thumbnail');

        const tdBtn = document.createElement('td');
        const btnEditar = document.createElement('button');
        btnEditar.click(editarPelicula(pelicula.id));
        tdBtn.appendChild(btnEditar);
        
        const btnEliminar = document.createElement('button');
        btnEliminar.click(borrarPelicula(pelicula.id));
        tdBtn.appendChild(btnEliminar);

        tr.appendChild(tdTitle);
        tr.appendChild(tdDuration);
        tr.appendChild(tdGenres);
        tr.appendChild(tdImage);
        tr.appendChild(tdBtn);

        tbody.appendChild(tr);
    });

    formulario.addEventListener("submit", async (event) => {
        event.preventDefault();
        validarCampos();

        const data = new FormData(formulario);
        const dataPelicula = {
            titulo: data.get('titulo'),
            genero: data.get('id_genero_pelicula'),
            fechaEstreno: data.get('emision'),
            duracion: data.get('duracion'),
            director: data.get('direccion'),
            sinopsis: data.get('sinopsis'),
            imagen: data.get('imagen'),
        }
        const imageName = dataPelicula.imagen.name;

        const nuevaPelicula = await postPelicula(dataPelicula);
        console.log('Pelicula añadida: ', nuevaPelicula);

        const updatedPeliculas = await getPeliculas();
        mostrarPeliculas(updatedPeliculas);

        formulario.reset();
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

// Función para editar película
async function editarPelicula(movieId) {
    const pelicula = await getPeliculaPorID(movieId);
    
    const data = new FormData();
    data.append('titulo', pelicula.titulo);
    data.append('id_genero_pelicula', pelicula.id_genero_pelicula);
    data.append('emision', pelicula.emision);
    data.append('duracion', pelicula.duracion);
    data.append('direccion', pelicula.direccion);
    data.append('sinopsis', pelicula.sinopsis);
    
    $('#titulo').val(data.get('titulo'));
    $('#id_genero_pelicula').val(data.get('id_genero_pelicula'));
    $('#emision').val(data.get('emision'));
    $('#duracion').val(data.get('duracion'));
    $('#direccion').val(data.get('direccion'));
    $('#sinopsis').val(data.get('sinopsis'));
    
    formulario.removeEventListener('submit', handleSubmit);
    formulario.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        const editedMovieData = {
            titulo: $('#titulo').val(),
            id_genero_pelicula: $('#id_genero_pelicula').val(),
            emision: $('#emision').val(),
            duracion: $('#duracion').val(),
            direccion: $('#direccion').val(),
            sinopsis: $('#sinopsis').val(),
        };
        
        const updatedPelicula = await patchPelicula(movieId, editedMovieData);
        console.log('Película actualizada:', updatedPelicula);
        
        // Actualizar la lista de películas
        const updatedPeliculas = await getPeliculas();
        mostrarPeliculas(updatedPeliculas);
        
        // Limpiar el formulario y volver a la configuración original del submit handler
        movieForm.reset();
        movieForm.removeEventListener('submit', handleSubmit);
        movieForm.addEventListener('submit', handleSubmit);
    });
}

// Función para borrar película
async function borrarPelicula(movieId) {
    const resultado = await deletePelicula(movieId);
    console.log('Película borrada:', resultado);
    
    // Actualizar la lista de películas
    const updatedPeliculas = await getPeliculas();
    mostrarPeliculas(updatedPeliculas);
}

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
