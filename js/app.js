// TODO: cambiar por url de la api de nuestro proyecto
const APIURL = 'http://localhost/PHP/CodoFilms/Api';


document.addEventListener("DOMContentLoaded", async () => {
    //Agrega peliculas en la tabla
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
   const response = await fetch(`${APIURL}/peliculas`, options);
    const data = await response.json();
    console.log(data);
    console.log(data.response);
    const movies = data;
    const tbody = document.getElementById('bodyTablePeliculas');
    movies.forEach(movie => {

        const tr = document.createElement('tr');
        const tdId = document.createElement('td');
        tdId.textContent = movie.id_pelicula;
        const tdTitle = document.createElement('td');
        tdTitle.textContent = movie.titulo;
        const tdDuration = document.createElement('td');
        tdDuration.textContent = movie.duracion;
        const tdGenero = document.createElement('td');
        tdGenero.textContent = movie.genero;
        const tdImage = document.createElement('td');
        const img = document.createElement('img');
        img.src = "../assets/img/" + movie.imagen;
        img.width = '150';
        img.alt = movie.titulo;
        tdImage.appendChild(img);
        img.classList.add('img-fluid');
        img.classList.add('img-thumbnail');

        // Botones de mantenimiento
        const tdOpciones = document.createElement('td');
        const btnBorrar = document.createElement('button');
        btnBorrar.type="button";
        btnBorrar.click="";
        btnBorrar.classList.add('btnBorrar');
        btnBorrar.textContent = "Borrar";
        tdOpciones.appendChild(btnBorrar);
        const btnEditar = document.createElement('button');
        btnEditar.type="button";
        btnEditar.classList.add('btnEditar');
        btnEditar.click="";
        btnEditar.textContent = 'Editar';
        tdOpciones.appendChild(btnEditar);

        tr.appendChild(tdId);
        tr.appendChild(tdImage);
        tr.appendChild(tdTitle);
        tr.appendChild(tdGenero);
        tr.appendChild(tdDuration);
        tr.appendChild(tdOpciones);
        tbody.appendChild(tr);
    });


    //*******Actualiza (edita o Modifica) ****************************

    console.log(document.querySelectorAll('.btnEditar'));
    // Agregar eventos después de crear los botones
    document.querySelectorAll('.btnEditar').forEach(button => {
      
        button.addEventListener('click', async (event) => {
            console.log("hizo click");
            console.log(event);
            console.log(event.target);// etiqueta de html del button que presiono 
            const row = event.target.closest('tr');
            console.log(row);
            const peliculaId = row.querySelector('td:first-child').innerText.trim();// de la fila levanto el id de la pelicula por su clase, por un selector de hijo primero
            console.log(peliculaId);
    try {
        const response = await fetch(`http://localhost/PHP/CodoFilms/Api/peliculas.php?id=${peliculaId}`);
        if (!response.ok) {
            // lanzo una excepcion en caso de que no funcione el fetch, esto se ve en la consola
            throw new Error('Error al obtener los datos de la película');
        }
        const data = await response.json();

        const movieUnica = data[0];
                console.log(data);
                // son los id del formulario, como son unicos e irrepetibles dentro del html, sabe a quien insertarles los valores
                document.getElementById('id').value = movieUnica.id_pelicula;
                document.getElementById('titulo').value = movieUnica.titulo;
                document.getElementById('id_genero_pelicula').value = movieUnica.genero;
                document.getElementById('duracion').value = movieUnica.duracion;
                document.getElementById('emision').value = movieUnica.emision;
                document.getElementById('direccion').value = movieUnica.direccion;
                document.getElementById('sinopsis').value = movieUnica.sinopsis;
                window.scrollTo(0, 0)
        //return data;
    } catch (error) {
        console.error('Error updating data:', error);
    }

        });
    });


    //****************BORRAR************/
    document.querySelectorAll('.btnBorrar').forEach(button => {
        button.addEventListener('click', async (event) => {
            const row = event.target.closest('tr');
            const peliculaId = row.querySelector('td:first-child').innerText.trim();
            try {
                const response = await fetch(`${APIURL}/peliculas.php/${peliculaId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    alert('Error al Borrar la película');
                    throw new Error('Error Borrando película');
                }
                const data = await response.json();
                alert('Pelicula Borrada correctamente');
                console.log(data);
                location.reload();
               
            } catch (error) {
                console.error('Error:', error);
            }
        });
    });

});