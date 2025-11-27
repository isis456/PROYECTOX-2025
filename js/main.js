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
   DATOS DE LIBROS POR CATEGORÍA
=========================== */
const librosPorCategoria = {
    TERROR: [
        { id: 1, titulo: "It", autor: "Stephen King", precio: 22.90, imagen: "img/libros/terror1.jpg", categoria: "TERROR" },
        { id: 2, titulo: "Drácula", autor: "Bram Stoker", precio: 18.50, imagen: "img/libros/terror2.jpg", categoria: "TERROR" }
    ],
    ACCION: [
        { id: 3, titulo: "Jack Reacher", autor: "Lee Child", precio: 20.90, imagen: "img/libros/accion1.jpg", categoria: "ACCION" },
        { id: 4, titulo: "Jason Bourne", autor: "Robert Ludlum", precio: 19.90, imagen: "img/libros/accion2.jpg", categoria: "ACCION" }
    ],
    INFANTIL: [
        { id: 5, titulo: "El Principito", autor: "Antoine de Saint-Exupéry", precio: 15.50, imagen: "img/libros/infantil1.jpg", categoria: "INFANTIL" },
        { id: 6, titulo: "Donde viven los monstruos", autor: "Maurice Sendak", precio: 16.90, imagen: "img/libros/infantil2.jpg", categoria: "INFANTIL" }
    ],
    ROMANCE: [
        { id: 7, titulo: "Orgullo y Prejuicio", autor: "Jane Austen", precio: 17.90, imagen: "img/libros/romance1.jpg", categoria: "ROMANCE" },
        { id: 8, titulo: "Cumbres Borrascosas", autor: "Emily Brontë", precio: 18.50, imagen: "img/libros/romance2.jpg", categoria: "ROMANCE" }
    ],
    FANTASIA: [
        { id: 9, titulo: "Harry Potter", autor: "J.K. Rowling", precio: 24.90, imagen: "img/libros/fantasia1.jpg", categoria: "FANTASIA" },
        { id: 10, titulo: "El Señor de los Anillos", autor: "J.R.R. Tolkien", precio: 26.90, imagen: "img/libros/fantasia2.jpg", categoria: "FANTASIA" }
    ]
};

/* ===========================
   CARGAR LIBROS DESTACADOS
=========================== */
function cargarLibrosDestacados() {
    const contenedor = document.getElementById('libros-destacados');
    if (!contenedor) return;

    // Combinar libros de diferentes categorías
    const librosDestacados = [];
    for (const categoria in librosPorCategoria) {
        librosDestacados.push(...librosPorCategoria[categoria].slice(0, 2));
    }

    contenedor.innerHTML = librosDestacados.map(libro => `
        <div class="libro-card">
            <img src="${libro.imagen}" alt="${libro.titulo}" onerror="this.src='https://via.placeholder.com/120x180/d7ccc8/5d4037?text=Libro'">
            <h4>${libro.titulo}</h4>
            <p class="autor">${libro.autor}</p>
            <p class="precio">$${libro.precio}</p>
            <button class="btn-comprar" onclick="comprarLibro(${libro.id})">COMPRAR</button>
        </div>
    `).join('');
}

/* ===========================
   FUNCIONES DE COMPRA
=========================== */
function comprarLibro(idLibro) {
    let libroEncontrado = null;
    for (const categoria in librosPorCategoria) {
        const libro = librosPorCategoria[categoria].find(l => l.id === idLibro);
        if (libro) {
            libroEncontrado = libro;
            break;
        }
    }
    
    if (libroEncontrado) {
        alert(`¡Libro añadido al carrito!\n\n"${libroEncontrado.titulo}"\nAutor: ${libroEncontrado.autor}\nPrecio: $${libroEncontrado.precio}`);
    }
}

/* ===========================
   BÚSQUEDA Y NAVEGACIÓN
=========================== */
function buscarLibros() {
    const termino = document.getElementById('buscador-libros').value.toLowerCase();
    if (termino.trim() === '') {
        alert('Por favor, ingresa un término de búsqueda');
        return;
    }
    
    const resultados = [];
    for (const categoria in librosPorCategoria) {
        const librosCategoria = librosPorCategoria[categoria].filter(libro => 
            libro.titulo.toLowerCase().includes(termino) ||
            libro.autor.toLowerCase().includes(termino)
        );
        resultados.push(...librosCategoria);
    }
    
    if (resultados.length > 0) {
        alert(`Encontramos ${resultados.length} libros para "${termino}"`);
        // Aquí podrías mostrar los resultados en una nueva página
    } else {
        alert(`No encontramos libros para "${termino}"`);
    }
}

function irACategoria(categoria) {
    window.location.href = `page/catalogo.html?categoria=${categoria}`;
}

/* ===========================
   CONFIGURACIÓN DE NAVEGACIÓN
=========================== */
function configurarNavegacion() {
    // Configurar botón de salida
    const salida = document.querySelector('.nav-link.salida');
    if (salida) {
        salida.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('¿Estás seguro de que quieres salir?')) {
                alert('¡Hasta pronto!');
                // Aquí puedes redirigir al login o cerrar sesión
            }
        });
    }
}

// Cargar todo cuando la página esté lista
document.addEventListener('DOMContentLoaded', function() {
    cargarLibrosDestacados();
    configurarNavegacion();
});

/* ===========================
   FUNCIONES DE FORMULARIOS
=========================== */
function guardarLibro(event) {
    event.preventDefault();
    const titulo = document.getElementById("titulo").value;
    const autor = document.getElementById("autor").value;
    const precio = document.getElementById("precio").value;
    const genero = document.getElementById("genero").value;

    alert(`Libro guardado exitosamente:\n\nTítulo: ${titulo}\nAutor: ${autor}\nPrecio: $${precio}\nGénero: ${genero}`);
}

function enviarMensaje(event) {
    event.preventDefault();
    const nombre = document.getElementById("nombreC").value;
    const correo = document.getElementById("correoC").value;
    const mensaje = document.getElementById("mensajeC").value;

    alert(`Mensaje enviado:\n\nNombre: ${nombre}\nCorreo: ${correo}\nMensaje: ${mensaje}`);
}