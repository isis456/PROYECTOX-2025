/* ===========================
   CARGAR MENÚ Y FOOTER
=========================== */
async function cargarMenu() {
    const contenedor = document.getElementById("menu-container");
    if (!contenedor) return;

    const estaEnPage = window.location.pathname.includes("/page/");
    const rutaMenu = estaEnPage ? "../menu.html" : "menu.html";

    try {
        const respuesta = await fetch(rutaMenu);
        contenedor.innerHTML = await respuesta.text();
    } catch (error) {
        console.error("Error cargando menú:", error);
    }
}

async function cargarFooter() {
    const contenedor = document.getElementById("footer-container");
    if (!contenedor) return;

    const estaEnPage = window.location.pathname.includes("/page/");
    const rutaFooter = estaEnPage ? "../footer.html" : "footer.html";

    try {
        const respuesta = await fetch(rutaFooter);
        contenedor.innerHTML = await respuesta.text();
    } catch (error) {
        console.error("Error cargando footer:", error);
    }
}

cargarMenu();
cargarFooter();

/* ===========================
   DATOS DE LIBROS (simulados)
=========================== */
const libros = [
    {
        id: 1,
        titulo: "Cien Años de Soledad",
        autor: "Gabriel García Márquez",
        precio: 25.90,
        imagen: "img/libro1.jpg",
        genero: "Realismo Mágico"
    },
    {
        id: 2,
        titulo: "1984",
        autor: "George Orwell",
        precio: 19.90,
        imagen: "img/libro2.jpg",
        genero: "Ciencia Ficción"
    },
    {
        id: 3,
        titulo: "El Principito",
        autor: "Antoine de Saint-Exupéry",
        precio: 15.50,
        imagen: "img/libro3.jpg",
        genero: "Fábula"
    },
    {
        id: 4,
        titulo: "Harry Potter",
        autor: "J.K. Rowling",
        precio: 29.90,
        imagen: "img/libro4.jpg",
        genero: "Fantasía"
    }
];

/* ===========================
   FUNCIONES PARA LIBROS
=========================== */
function cargarLibrosDestacados() {
    const contenedor = document.getElementById('libros-destacados');
    if (!contenedor) return;

    contenedor.innerHTML = libros.map(libro => `
        <div class="libro-card">
            <img src="${libro.imagen}" alt="${libro.titulo}">
            <h3>${libro.titulo}</h3>
            <p class="autor">${libro.autor}</p>
            <p class="genero">${libro.genero}</p>
            <p class="precio">$${libro.precio}</p>
            <button onclick="agregarAlCarrito(${libro.id})">Agregar al Carrito</button>
        </div>
    `).join('');
}

function agregarAlCarrito(idLibro) {
    const libro = libros.find(l => l.id === idLibro);
    if (libro) {
        alert(`"${libro.titulo}" agregado al carrito!`);
        // Aquí puedes agregar lógica para el carrito real
    }
}

function buscarLibros() {
    const termino = document.getElementById('buscador-libros').value.toLowerCase();
    const resultados = libros.filter(libro => 
        libro.titulo.toLowerCase().includes(termino) ||
        libro.autor.toLowerCase().includes(termino) ||
        libro.genero.toLowerCase().includes(termino)
    );
    
    if (resultados.length > 0) {
        alert(`Encontramos ${resultados.length} libros para "${termino}"`);
    } else {
        alert(`No encontramos libros para "${termino}"`);
    }
}

function irAlCatalogo() {
    window.location.href = 'page/catalogo.html';
}

// Cargar libros cuando la página esté lista
document.addEventListener('DOMContentLoaded', function() {
    cargarLibrosDestacados();
});

/* ===========================
   FORMULARIOS (actualizados para libros)
=========================== */
function guardarLibro(event) {
    event.preventDefault();
    const titulo = document.getElementById("titulo").value;
    const autor = document.getElementById("autor").value;
    const precio = document.getElementById("precio").value;
    const genero = document.getElementById("genero").value;

    alert(`Libro guardado:
Título: ${titulo}
Autor: ${autor}
Precio: $${precio}
Género: ${genero}`);
}

function enviarMensaje(event) {
    event.preventDefault();
    const nombre = document.getElementById("nombreC").value;
    const correo = document.getElementById("correoC").value;
    const mensaje = document.getElementById("mensajeC").value;

    alert(`Mensaje enviado:
Nombre: ${nombre}
Correo: ${correo}
Mensaje: ${mensaje}`);
}