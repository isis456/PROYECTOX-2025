/*
 * LEEP BOOKS - LÓGICA PRINCIPAL (main.js)
 * Maneja: Carga Modular, Datos, Catálogo, Filtrado y Carrito.
 */

// ===========================
// DATOS INICIALES (12 Libros)
// ===========================

const libros = [
  // TERROR (3)
  { id: 1, titulo: "Pesadillas en la Oscuridad", autor: "H. Lovecraft", precio: 22.00, categoria: "terror", imagen: "../img/portadas/terror1.png" },
  { id: 2, titulo: "La Sombra del Miedo", autor: "S. King", precio: 28.50, categoria: "terror", imagen: "../img/portadas/terror2.png" },
  { id: 3, titulo: "El Ritual Prohibido", autor: "E. Allan Poe", precio: 19.00, categoria: "terror", imagen: "../img/portadas/terror3.png" },
  // ACCIÓN (3)
  { id: 4, titulo: "Misión: Rescate", autor: "J. Clancy", precio: 24.00, categoria: "accion", imagen: "../img/portadas/accion1.png" },
  { id: 5, titulo: "Fuego Cruzado", autor: "L. Child", precio: 31.00, categoria: "accion", imagen: "../img/portadas/accion2.png" },
  { id: 6, titulo: "Código Omega", autor: "R. Ludlum", precio: 26.50, categoria: "accion", imagen: "../img/portadas/accion3.png" },
  // FANTASÍA (3)
  { id: 7, titulo: "El Reino de Cristal", autor: "J.R.R. Tolkien", precio: 35.00, categoria: "fantasia", imagen: "../img/portadas/fantasia1.png" },
  { id: 8, titulo: "Magia y Leyendas", autor: "G. Martin", precio: 38.00, categoria: "fantasia", imagen: "../img/portadas/fantasia2.png" },
  { id: 9, titulo: "Los Dragones Dormidos", autor: "U. Le Guin", precio: 30.00, categoria: "fantasia", imagen: "../img/portadas/fantasia3.png" },
  // ROMANCE (3)
  { id: 10, titulo: "Bajo el Cielo de París", autor: "J. Austen", precio: 18.00, categoria: "romance", imagen: "../img/portadas/romance1.png" },
  { id: 11, titulo: "Un Amor de Verano", autor: "N. Sparks", precio: 21.00, categoria: "romance", imagen: "../img/portadas/romance2.png" },
  { id: 12, titulo: "Eternamente Tuya", autor: "C. Bronte", precio: 23.50, categoria: "romance", imagen: "../img/portadas/romance3.png" }
];

// Carrito inicializado (se podría usar localStorage para persistencia)
let carrito = [];

// ===========================
// MODULARIZACIÓN (Menú y Footer)
// ===========================

/** Carga un componente HTML (menu.html o footer.html) en un contenedor. */
async function cargarComponente(id, nombreArchivo) {
    const contenedor = document.getElementById(id);
    if (!contenedor) return;

    // Determina la ruta correcta basándose en si la página actual está en /page/
    const estaEnPage = window.location.pathname.includes("/page/");
    const ruta = estaEnPage ? `../${nombreArchivo}.html` : `${nombreArchivo}.html`;

    try {
        const respuesta = await fetch(ruta);
        contenedor.innerHTML = await respuesta.text();
    } catch (error) {
        console.error(`Error cargando ${nombreArchivo}:`, error);
    }
}

// Funciones de utilidad para cargar componentes
function cargarMenu() { return cargarComponente("menu-container", "menu"); }
function cargarFooter() { return cargarComponente("footer-container", "footer"); }

// ===================================
// LÓGICA DEL CATÁLOGO (CATALOGO.HTML)
// ===================================

/** Genera y muestra las tarjetas de libros en el catálogo, con opción de filtro. */
function mostrarCatalogo(filtroCategoria = 'todos') {
    const contenedor = document.getElementById("catalogo-libros");
    if (!contenedor) return; // Solo se ejecuta en catalogo.html

    let librosFiltrados = libros;
    if (filtroCategoria !== 'todos') {
        librosFiltrados = libros.filter(libro => libro.categoria === filtroCategoria);
    }

    let htmlCatalogo = '';

    librosFiltrados.forEach(libro => {
        // Estructura HTML que coincide con los estilos mejorados de tarjeta-libro
        htmlCatalogo += `
          <div class="tarjeta-libro">
            <img src="${libro.imagen}" alt="Portada de ${libro.titulo}" class="portada">
            <div class="info">
              <h3>${libro.titulo}</h3>
              <p class="autor">${libro.autor}</p>
              <p class="precio">$${libro.precio.toFixed(2)}</p>
              <button onclick="agregarAlCarrito(${libro.id})">
                Agregar a Carrito
              </button>
            </div>
          </div>
        `;
    });

    contenedor.innerHTML = htmlCatalogo;
}

/** Configura los Event Listeners para el menú lateral y el filtrado. */
function configurarFiltroCatalogo() {
    const menuLateral = document.querySelector('.menu-lateral');
    if (menuLateral) {
        menuLateral.addEventListener('click', (event) => {
            const enlace = event.target.closest('a');
            if (!enlace) return;

            const categoria = enlace.getAttribute('data-categoria');
            
            // Filtra solo si es una categoría válida (no 'ajustes' ni 'salir')
            if (categoria && categoria !== 'ajustes' && categoria !== 'salir') {
                event.preventDefault();
                
                // 1. Elimina 'active' de todos los enlaces
                document.querySelectorAll('.menu-lateral a').forEach(a => {
                    a.classList.remove('active');
                });
                
                // 2. Agrega 'active' solo al enlace clickeado
                enlace.classList.add('active');
                
                // 3. Muestra el catálogo filtrado
                mostrarCatalogo(categoria);
            }
        });
    }
}

// ===================================
// LÓGICA DEL CARRITO (CARRITO.HTML)
// ===================================

/** Agrega un libro al array del carrito y muestra una alerta. */
function agregarAlCarrito(libroId) {
    const libroSeleccionado = libros.find(libro => libro.id === libroId);
    if (libroSeleccionado) {
        // Usamos una copia del objeto para no modificar el original si fuera necesario
        carrito.push({...libroSeleccionado}); 
        alert(`¡"${libroSeleccionado.titulo}" agregado a tu carrito!`);
        
        // Si el usuario está en la página del carrito, actualizamos la vista
        actualizarCarritoVisual(); 
    }
}

/** Elimina un libro del carrito por su índice. */
function eliminarDelCarrito(index) {
    if (confirm(`¿Estás seguro de que quieres eliminar "${carrito[index].titulo}" del carrito?`)) {
        carrito.splice(index, 1);
        actualizarCarritoVisual();
    }
}

/** Renderiza la tabla de productos y actualiza los totales en carrito.html. */
function actualizarCarritoVisual() {
    const contenedor = document.getElementById("items-carrito");
    const subtotalValor = document.getElementById("subtotal-valor");
    const totalValor = document.getElementById("total-valor");
    
    if (!contenedor || !totalValor) return; // Solo se ejecuta en carrito.html

    let total = 0;

    if (carrito.length === 0) {
        contenedor.innerHTML = '<p class="carrito-vacio-mensaje">Tu carrito está vacío. ¡Añade algunos libros!</p>';
    } else {
        let htmlTabla = `
            <table class="tabla-carrito">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        carrito.forEach((libro, index) => {
            total += libro.precio;
            
            htmlTabla += `
                <tr>
                    <td>
                        <img src="${libro.imagen}" class="carrito-portada" alt="Portada">
                        ${libro.titulo}
                    </td>
                    <td>$${libro.precio.toFixed(2)}</td>
                    <td><button onclick="eliminarDelCarrito(${index})" class="boton-eliminar">Eliminar</button></td>
                </tr>
            `;
        });
        
        htmlTabla += '</tbody></table>';
        contenedor.innerHTML = htmlTabla;
    }
    
    // Actualizar totales
    if (subtotalValor) subtotalValor.textContent = `$${total.toFixed(2)}`;
    if (totalValor) totalValor.textContent = `$${total.toFixed(2)}`;
}

/** Lógica para el botón de compra final. */
function finalizarCompra() {
    if (carrito.length === 0) {
        alert("El carrito está vacío. No puedes finalizar la compra.");
        return;
    }
    
    const total = carrito.reduce((sum, item) => sum + item.precio, 0);
    alert(`¡Compra finalizada con éxito! Gracias por elegir Leep Books. Total: $${total.toFixed(2)}`);
    
    carrito = []; // Vacía el carrito
    actualizarCarritoVisual();
}


// ===========================
// INICIALIZACIÓN DE LA PÁGINA
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    // 1. Cargar componentes modulares
    cargarMenu();
    cargarFooter();
    
    // 2. Ejecutar lógica específica por página
    
    // Si estamos en la página del Catálogo
    if (document.getElementById("catalogo-libros")) {
        mostrarCatalogo(); 
        configurarFiltroCatalogo();
    }
    
    // Si estamos en la página del Carrito
    if (document.getElementById("items-carrito")) {
        actualizarCarritoVisual(); 
    }
});

// Nota: Las funciones 'agregarAlCarrito', 'eliminarDelCarrito' y 'finalizarCompra'
// deben ser globales (definidas sin const/let/var) para ser accesibles desde
// los atributos 'onclick' del HTML.