document.addEventListener('DOMContentLoaded', async () => {
    newregistro = document.getElementById('loginForm');

    newregistro.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(newregistro);
        const nombre = formData.get('nombre');
        const email = formData.get('email');
        const clave = formData.get('clave');
        const pais = formData.get('pais');
        const terminos = document.getElementById('terminos');
	    

            if (nombre === '' || email === '' || clave === '' || pais === '') {
                alert('Todos los campos son obligatorios');
                return;
            }
            if(terminos.checked ){
            } else {
                alert("¡Debe aceptar los terminos y condiciones para el registro.!");
                return;
            }

        const update = {
            nombre: nombre,
            email: email,
            clave: clave,
            };
        const options = {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(update),
        };
        const response = await fetch('http://localhost/PHP/Login/PROJECT/api/create_user.php', options);
        const data = await response.json();
        console.log(data);

        const sesion = data;

        

        if (response.status === 201) {
            alert('Usuario registrado exitosamente!');
            location.href = "../index.html";
        } else {
            alert('Error al registrar el usuario');
            location.reload();
        }

    });
});