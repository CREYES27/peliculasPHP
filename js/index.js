
//viene del Header
let std = `
<nav class="navbar navbar-expand-lg navbar-dark bg-dark>
    <div class="container-fluid">
        <a class="navbar-brand fs-4 anclaLogo" href="#">
           <i class="fas fa-film" aria-hidden="true"></i>
           <span>CodoFilms</span>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" id="admiMenu">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="listaNav navbar-nav me-auto mb-2 mb-lg-0 w-100 justify-content-end">
              <li class="nav-item">
              <a class="Estrenos nav-link active fs-5" aria-current="page" href="#tendencias">Estrenos</a></li>
              <li class="nav-item">
              <a class="Series nav-link fs-5" href="#tendencias">Series</a></li>
              <li class="nav-item">
              <a class="registro nav-link fs-5" href="./pages/Registro.html">Registrarse</a></li>
              <li class="nav-item">
              <a class="iniciarSesion nav-link fs-5" href="./pages/iniciosesion.html">Iniciar Sesión</a></li>
            </ul>
        </div>
    </div>
</nav>
`
document.getElementById("header_std").innerHTML=std;

//viene del footer
let foot = `
<nav class="navegacion">
    <ul class="listaFooter">
        <li><a href="">Términos y condiciones</a></li>
        <li><a href="">Preguntas frecuentes</a></li>
        <li><a href="">Ayuda</a></li>
        <li><a class="administradorPeliculas" href="./pages/admi.html" onclick="adminMenu()">Administrador Peliculas</a></li>
    </ul>
</nav>
<a class="arriba" href="#main">
    <img class="flechaArriba" src="./assets/img/Flecha-up.png" alt="ir arriba flecha">
</a>
`
document.getElementById("footer_std").innerHTML=foot;


//cambia el link del nav segun la pagina
document.addEventListener("DOMContentLoaded", () =>{
   let ancla = document.querySelector('.anclaLogo');
   let flecha = document.querySelector('.flechaArriba');
   let arriba = document.querySelector('.arriba');
   let enlace1 = document.querySelector('.Estrenos');
   let enlace2 = document.querySelector('.Series');
   let enlace3 = document.querySelector('.registro');
   let enlace4 = document.querySelector('.iniciarSesion');
   let admon = document.querySelector('.administradorPeliculas');
   const menu = document.getElementById('admiMenu');

    if (document.getElementById("titulo_detalle")!=null) {
        ancla.href = "../index.html";
        arriba.href = "#main";
        flecha.src = "../assets/img/Flecha-up.png"
        enlace1.href = "../index.html#tendencias";
        enlace2.href = "../index.html#tendencias";
        enlace3.href = "./Registro.html";
        enlace4.href = "./iniciosesion.html";
        admon.href = "./admi.html";
        menu.style.display = 'none';
    }else if (document.getElementById("titulo_Adm")!=null) {
        ancla.href = "../index.html";
        arriba.href = "#mainAdm";
        flecha.src = "../assets/img/Flecha-up.png";
        enlace1.href = "../index.html#tendencias";
        enlace2.href = "../index.html#tendencias";
        enlace3.href = "./Registro.html";
        enlace4.href = "./iniciosesion.html";
        admon.href = "./admi.html";
    } else {
        menu.style.display = 'none';
        agregarTarjetasPeliculas();
        agregarTarjetasValoradas();
        const cargarPeliculasButton = document.getElementById('button');
        cargarPeliculasButton.addEventListener('click', ()=> {
            console.log('cargando peliculas...!');
            cargarPeliculas(1);
        });
    }

});

//Galeria Estrenos y Series
const imagenEstrenos = [
    {imagen: 'Elduro.jpg', titulo: 'El Duro'},
    {imagen: 'inmaculada.jpg', titulo: 'Inmaculada'},
    {imagen: 'arca.jpg', titulo: 'El Arca de Noé'},
    {imagen: 'Kunfupanda4.jpg', titulo: 'Kung Fu Panda 4'},
    {imagen: 'Nell.jpg', titulo: 'Nell la Renegada'},
    {imagen: 'parasyte.jpg', titulo: 'Parasyte los Grises'},
    {imagen: '3cuerpos.jpg', titulo: '3 Body Problem'},
    {imagen: 'fallout.jpg', titulo: 'Fallout'},
]

const sectionEstrenos = document.getElementById('sectionEstrenos');

function crearTarjetaPelicula(pelicula){
    const card = document.createElement('div');
    card.classList.add('col-md4', 'pelicula-card');

    const cardInner = document.createElement('div');
    cardInner.classList.add('card');

    const cardImg = document.createElement('img');
    cardImg.classList.add('card-img-top');
    cardImg.src = `assets/img/${pelicula.imagen}`; 
    cardImg.alt = pelicula.titulo;

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = pelicula.titulo;
    
    const cardRef = document.createElement('a');
    cardRef.classList.add('#detalle');
    cardRef.href = `./pages/detalles.html`;

    //agrego los elementos a la tarjeta pelicula
    
    cardBody.appendChild(cardTitle);
    cardInner.appendChild(cardImg);
    cardInner.appendChild(cardBody);
    cardRef.appendChild(cardInner);
    card.appendChild(cardRef);

    return card;
};
//---------------------------------------------- aqui bloque de la API
function crearTarjetaApi(pelicula){
    const card = document.createElement('div');
    card.classList.add('col-md4', 'pelicula-card');
    const cardInner = document.createElement('div');
    cardInner.classList.add('card');

    const cardImg = document.createElement('img');
    cardImg.classList.add('card-img-top');
    cardImg.src = `https://image.tmdb.org/t/p/w500/${pelicula.poster_path}`; 
    cardImg.alt = pelicula.title
    cardImg.loading = 'lazy';

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = pelicula.title;
    const cardRef = document.createElement('a');
    cardRef.classList.add('#detalle');
    cardRef.href = `./pages/detalles.html`;

    //agrego los elementos a la tarjeta pelicula
    cardBody.appendChild(cardTitle);
    cardInner.appendChild(cardImg);
    cardInner.appendChild(cardBody);
    cardRef.appendChild(cardInner);
    card.appendChild(cardRef);

    return card;
};
//datos de la API
const API_SERVER = 'https://api.themoviedb.org/3';
const options = {
    method: 'GET', //Metodo de la peticion (GET)
    headers: {
        accept: 'application/json', //tipo de respuesta esperada (JSON)
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTJjYTAwZDYxZWIzOTEyYjZlNzc4MDA4YWQ3ZmNjOCIsInN1YiI6IjYyODJmNmYwMTQ5NTY1MDA2NmI1NjlhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4MJSPDJhhpbHHJyNYBtH_uCZh4o0e3xGhZpcBIDy-Y8' //token
    }
};
//funcion para cargar peliculas en el index seccion API
const cargarPeliculas = async (page = 1) => {
    try {
        //realiza peticion fech a la API para optener las peliculas populares
        const response = await fetch(`${API_SERVER}/movie/popular?page=${page}`, options);
        const data = await response.json(); //convierte la respuesta en JSON
        const movies = data.results; // extrae las peliculas de la respuesta
        console.log(movies);  //ocultar
        const sectionPeliculasApi = document.getElementById('galeriaApi');
        sectionPeliculasApi.innerHTML = '' //limpia el contenido del contenedor
        movies.forEach(movie =>{
            const peliculaCard = crearTarjetaApi(movie); 
            sectionPeliculasApi.appendChild(peliculaCard); //añadimos las tarjetas de las peliculas
        });
    }catch(error) {
        console.error(error);
    } 
};
//-------------fin Api

//Agregar todas las tarjetas en el Dom
function agregarTarjetasPeliculas(){
    imagenEstrenos.forEach(function(pelicula){
        const peliculaCard = crearTarjetaPelicula(pelicula);
        sectionEstrenos.appendChild(peliculaCard);
    });
};

//Galeria Valoradas
const imagenValoradas = [
    {imagen: 'valoradas_9.jpg'},
    {imagen: 'valoradas_12.jpg'},
    {imagen: 'doctorhouse.jpg'},
    {imagen: 'BlueLigth.jpg'},
    {imagen: 'Reinalagrima.jpg'},
    {imagen: 'valoradas_10.jpg'},
    {imagen: 'valoradas_11.jpg'},
    {imagen: 'valoradas_1.jpg'},
]

const sectionValoradas = document.getElementById('sectionValoradas');

//Agregar todas las tarjetas en el Dom
function agregarTarjetasValoradas(){
    imagenValoradas.forEach(function(pelicula){
        const peliculaCard = crearTarjetaPelicula(pelicula);
        sectionValoradas.appendChild(peliculaCard);
    });
};
