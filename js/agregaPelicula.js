
document.addEventListener('DOMContentLoaded', async () => {
    const formulario = document.getElementById('admiForm');

    formulario.addEventListener('submit', async (event) => {
        event.preventDefault();

        const idPelicula = document.getElementById('id').value;
        const titulo = document.getElementById('titulo').value;
        const genero = document.getElementById('id_genero_pelicula').value;
        const duracion = document.getElementById('duracion').value;
        const emision = document.getElementById('emision').value;
        const direccion = document.getElementById('direccion').value;
        const sinopsis = document.getElementById('sinopsis').value;
        const imagen = document.getElementById('imagen').files[0] || document.getElementById('imagen').getAttribute('data-current-image');

        if (titulo === '' || genero === '' || duracion === '' || emision === '' || direccion === '' || sinopsis === '' || !imagen) {
            alert('Todos los campos son obligatorios');
            return;
        }

        let url = 'http://localhost/PHP/CodoFilms/Api/pelicula.php';
        let method = 'POST';

        const movieData = {
            titulo: titulo,
            genero: genero,
            emision: emision,
            direccion: direccion,
            sinopsis: sinopsis,
            duracion: duracion,
            imagen: imagen.name 
        };

        if (idPelicula) {
            movieData.idPelicula = idPelicula;
            method = 'PUT';
        }
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movieData)
        };

        try {
            const APIURL = 'http://localhost/PHP/CodoFilms/Api';
            const response = await fetch(`${APIURL}/peliculas`, options);
            if (!response.ok) {
                throw new Error('Error al guardar la película');
            }

            const responseData = await response.json();
            if (method === 'POST') {
                if (response.status !== 201) {
                    alert('Error al guardar la película');
                    throw new Error('Error al guardar la película');
                    
                }
                alert('Película agregada correctamente');
            } else {
                if (response.status !== 200) {
                    alert('Error al modificar la película');
                    throw new Error('Error al modificar la película');
                }
                alert('Película modificada correctamente');
            }

            formulario.reset();
            location.reload();
        } catch (error) {
            console.error('Error:', error);
            alert('Error al guardar la película');
        }
    });
});
