'use strict';

//Detalles Pelicula
const detallePelicula = [
    {imagen: 'arca.jpg', titulo: 'El Arca de Noé', duracion: '1h 36min - Géneros: Animación, Fantasía, Comedia, Musical',
        sinopsis: 'La película sigue a dos ratones: Vini (un carismático poeta con un terrible miedo escénico) y Tom (un talentoso y encantador guitarrista). Cuando llega el diluvio, solo se permite que un macho y una hembra de cada especie suban a El Arca de Noé. Con la ayuda de una ingeniosa cucaracha y buena suerte, los roedores se cuelan en el arca y juntos intentarán evitar el enfrentamiento entre carnívoros y herbívoros. ¿Podrán estos talentosos polizones usar la música para romper la tensión y ayudar a todas las especies a convivir sin comerse unos a otros durante 40 días y 40 noches?',
        director: 'Sergio Machado', reparto: 'Rodrigo Santoro, Alice Braga, Marcelo Adnet', produccion: 'Producción: Gullane Entretenimiento'
    }
]

const sectionDetalle = document.getElementById('sectionDetalle');

function crearDetallePelicula(detalle){
    const card = document.createElement('div');
    card.classList.add('contenedorDetalle');

    const cardInner = document.createElement('div');
    cardInner.classList.add('imgDetalle');

    const cardImg = document.createElement('img');
    cardImg.classList.add('card-img-top');
    cardImg.src = `../assets/img/${detalle.imagen}`;
    cardImg.alt = detalle.titulo;
    
    const detalles = document.createElement('div');
    detalles.classList.add('textoDetalle');
    const titulo = document.createElement('h1');
    titulo.textContent = detalle.titulo;
    const duracion = document.createElement('p');
    duracion.textContent =  detalle.duracion;
    
    const cardBody = document.createElement('h2');
    cardBody.textContent = "Resumen";
    const sinopsis = document.createElement('p');
    sinopsis.textContent =  detalle.sinopsis;

    const creditos = document.createElement('div');
    creditos.classList.add('creditos');
    const direccion = document.createElement('div');
    const  director= document.createElement('h3');
    director.textContent =  detalle.director;
    const repart = document.createElement('div');
    const  reparto= document.createElement('h3');
    reparto.textContent =  detalle.reparto;
    const prod = document.createElement('div');
    const  produccion= document.createElement('h3');
    produccion.textContent =  detalle.produccion;

    //agrego los elementos al detalle de pelicula
    
    //detalle.appendChild(titulo, duracion, cardBody, sinopsis);
    detalles.appendChild(titulo);
    detalles.appendChild(duracion);
    detalles.appendChild(cardBody);
    detalles.appendChild(sinopsis);
    detalles.appendChild(creditos);

    creditos.appendChild(direccion);
    creditos.appendChild(repart);
    creditos.appendChild(prod);
    direccion.appendChild(director);
    repart.appendChild(reparto);
    prod.appendChild(produccion)

    cardInner.appendChild(cardImg)
    card.appendChild(cardInner);
    card.appendChild(detalles);

    return card;
}

//Agregar los detalles en el Dom
function agregarDetallePelicula(){
    detallePelicula.forEach(function(detalle){
        const detalleCard = crearDetallePelicula(detalle);
        sectionDetalle.appendChild(detalleCard);
    });
}


//Cuando el Dom este cargando, llama a la funcion para agregar el detalle
document.addEventListener("DOMContentLoaded", () =>{
    agregarDetallePelicula();
    addTable();
});



//crear y llenar tabla trailer (falta terminar de desarrollar)

function addTable() {
    let myTableDiv = document.getElementById("info")
    let table = document.createElement('TABLE')
    let tableBody = document.createElement('TBODY')
    
    //table.border = '1'
    table.appendChild(tableBody);
    
    let heading = new Array();
    heading[0] = "Info"
    heading[1] = ""
   
    let fila = new Array()
    fila[0] = new Array("Titulo Original", "Noah's Ark")
    fila[1] = new Array("Guión", "Sergio Machado")
    fila[2] = new Array("Pais", "Brasil")
    fila[3] = new Array("Fotografia", "Animación")
    
    //COLUMNAS DE LA TABLA
    let tr = document.createElement('TR');
    tableBody.appendChild(tr);
    for (let i = 0; i < heading.length; i++) {
        let th = document.createElement('TH')
        th.width = '75';
        th.appendChild(document.createTextNode(heading[i]));
        tr.appendChild(th);
    }
    
    //FILAS DE LA TABLA
    for (let i = 0; i < fila.length; i++) {
        let tr = document.createElement('TR');
        for (let j = 0; j < fila[i].length; j++) {
            let td = document.createElement('TD')
            td.appendChild(document.createTextNode(fila[i][j]));
            tr.appendChild(td)
        }
        tableBody.appendChild(tr);
    }  
    myTableDiv.appendChild(table)
};





