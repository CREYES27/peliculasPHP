document.addEventListener('DOMContentLoaded', async () => {
    
    //obtengo el formulario de Inicio Sesion
    newsesion = document.getElementById('sesionForm');

    newsesion.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(newsesion);
        const email = formData.get('email');
        const clave = formData.get('clave');
        

            if (email === '' || clave === '') {
                alert('Todos los campos son obligatorios');
                return;
            }

        const update = {
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
        const response = await fetch('http://localhost/PHP/Login/PROJECT/api/login.php', options);
        const data = await response.json();
        console.log(data);

        const sesion = data;

        

        if (response.status === 200) {
            sesion.forEach(sesion => {
                if (sesion.id_usuario == 1){
                    alert('Bienvenido Administrador');
                    location.href = "./admi.html";
                }else{
                    alert('Bienvenido ' + sesion.nombre);
                    location.href = "../index.html";
                }
            });
        } else {
            alert('Error el usuario o password no es valido');
            location.reload();
        }

    });
});