// TODO: cambiar por url de la api de nuestro proyecto
const APIURL = '';

// Obtener todas las películas
async function getPeliculas(){
    try {
        const response = await fetch(`${APIURL}/peliculas`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
        console.log(data.response);
        return data.response;
    } catch (error) {
        console.error('Error reading data:', error);
    }
}

// Obtener película según ID
async function getPeliculaPorID(id){
    try {
        const response = await fetch(`${APIURL}/peliculas/${id}`, {
            method: 'GET', //Metodo de la peticion (GET)
            headers: {
                'Content-Type': 'application/json'
            }
        }); //URL de la API
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error reading data:', error);
    }
}

// Agregar película
async function postPelicula(movie){
    try {
        const response = await fetch(`${APIURL}/peliculas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movie)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating data:', error);
    }
}

// Actualizar película
async function patchPelicula(id, peliculaActualizada){
    try {
        const response = await fetch(`${APIURL}/peliculas/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(peliculaActualizada)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating data:', error);
    }
}

// Eliminar película
async function deletePelicula(id){
    try {
        const response = await fetch(`${APIURL}/peliculas/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        return response.status === 204;
    } catch (error) {
        console.error('Error deleting data:', error);
    }
}