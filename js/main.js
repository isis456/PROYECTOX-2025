/* ===================================================
   SLEEPBOOK - LÓGICA PRINCIPAL
   =================================================== */

// Base de datos de libros
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

// Persistencia del Carrito en localStorage
let carrito = JSON.parse(localStorage.getItem("carrito_sleepbook")) || [];

function guardarCarrito() {
  localStorage.setItem("carrito_sleepbook", JSON.stringify(carrito));
}

// Carga Modular de Menú y Footer
async function cargarComponente(id, nombreArchivo) {
  const contenedor = document.getElementById(id);
  if (!contenedor) return;

  const estaEnPage = window.location.pathname.includes("/page/");
  const ruta = estaEnPage ? `../${nombreArchivo}.html` : `${nombreArchivo}.html`;

  try {
    const respuesta = await fetch(ruta);
    if (!respuesta.ok) throw new Error(`HTTP Error ${respuesta.status}`);
    
    let htmlContent = await respuesta.text();

    // Si la vista está en /page/, ajustamos las rutas del menú dinámicamente
    if (estaEnPage && nombreArchivo === 'menu') {
      htmlContent = htmlContent
        .replace(/href="index\.html"/g, 'href="../index.html"')
        .replace(/href="page\/catalogo\.html"/g, 'href="catalogo.html"')
        .replace(/href="page\/carrito\.html"/g, 'href="carrito.html"')
        .replace(/src="img\/iconos\/buscar\.png"/g, 'src="../img/iconos/buscar.png"');
    }

    contenedor.innerHTML = htmlContent;
    actualizarBadgeMenu();
    activarBuscador();
  } catch (error) {
    console.error(`Error cargando ${nombreArchivo}:`, error);
  }
}

function cargarMenu() { return cargarComponente("menu-container", "menu"); }
function cargarFooter() { return cargarComponente("footer-container", "footer"); }

function actualizarBadgeMenu() {
  const contadorEl = document.getElementById("carrito-contador");
  if (contadorEl) {
    contadorEl.textContent = carrito.length;
  }
}

// Renderizado del Catálogo
function mostrarCatalogo(filtroCategoria = 'todos', terminoBusqueda = '') {
  const contenedor = document.getElementById("catalogo-libros");
  if (!contenedor) return;

  let resultado = libros;

  // Filtrar por categoría
  if (filtroCategoria !== 'todos') {
    resultado = resultado.filter(l => l.categoria === filtroCategoria);
  }

  // Filtrar por término de búsqueda
  if (terminoBusqueda.trim() !== '') {
    const query = terminoBusqueda.toLowerCase();
    resultado = resultado.filter(l => l.titulo.toLowerCase().includes(query) || l.autor.toLowerCase().includes(query));
  }

  if (resultado.length === 0) {
    contenedor.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #8c8c8c; padding: 30px;">No se encontraron libros que coincidan.</p>';
    return;
  }

  const estaEnPage = window.location.pathname.includes("/page/");

  let htmlCatalogo = '';
  resultado.forEach(libro => {
    const rutaImagen = estaEnPage ? libro.imagen : libro.imagen.replace('../', '');
    htmlCatalogo += `
      <div class="tarjeta-libro">
        <img src="${rutaImagen}" alt="Portada de ${libro.titulo}" class="portada">
        <div class="info">
          <h3>${libro.titulo}</h3>
          <p class="autor">${libro.autor}</p>
          <p class="precio">$${libro.precio.toFixed(2)}</p>
          <button onclick="agregarAlCarrito(${libro.id})">
            Agregar al Carrito
          </button>
        </div>
      </div>
    `;
  });

  contenedor.innerHTML = htmlCatalogo;
}

function configurarFiltroCatalogo() {
  const menuLateral = document.querySelector('.menu-lateral');
  if (menuLateral) {
    menuLateral.addEventListener('click', (event) => {
      const enlace = event.target.closest('a');
      if (!enlace) return;

      const categoria = enlace.getAttribute('data-categoria');
      if (categoria) {
        event.preventDefault();
        document.querySelectorAll('.menu-lateral a').forEach(a => a.classList.remove('active'));
        enlace.classList.add('active');
        mostrarCatalogo(categoria);
      }
    });
  }
}

// Buscador en tiempo real
function activarBuscador() {
  const inputBuscar = document.querySelector('.buscador input');
  if (inputBuscar) {
    inputBuscar.addEventListener('input', (e) => {
      const query = e.target.value;
      if (document.getElementById("catalogo-libros")) {
        const catActiva = document.querySelector('.menu-lateral a.active')?.getAttribute('data-categoria') || 'todos';
        mostrarCatalogo(catActiva, query);
      }
    });
  }
}

// Lógica del Carrito de Compras
function agregarAlCarrito(libroId) {
  const libroSeleccionado = libros.find(l => l.id === libroId);
  if (libroSeleccionado) {
    carrito.push({ ...libroSeleccionado });
    guardarCarrito();
    actualizarBadgeMenu();
    alert(`¡"${libroSeleccionado.titulo}" fue añadido al carrito!`);
    
    if (document.getElementById("items-carrito")) {
      actualizarCarritoVisual();
    }
  }
}

function eliminarDelCarrito(index) {
  if (confirm(`¿Deseas quitar "${carrito[index].titulo}" del carrito?`)) {
    carrito.splice(index, 1);
    guardarCarrito();
    actualizarBadgeMenu();
    actualizarCarritoVisual();
  }
}

function actualizarCarritoVisual() {
  const contenedor = document.getElementById("items-carrito");
  const subtotalValor = document.getElementById("subtotal-valor");
  const totalValor = document.getElementById("total-valor");
  
  if (!contenedor || !totalValor) return;

  let total = 0;
  const estaEnPage = window.location.pathname.includes("/page/");

  if (carrito.length === 0) {
    contenedor.innerHTML = '<p class="carrito-vacio-mensaje">Tu carrito está vacío. ¡Explora nuestro catálogo!</p>';
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
      const rutaImg = estaEnPage ? libro.imagen : libro.imagen.replace('../', '');
      
      htmlTabla += `
        <tr>
          <td>
            <img src="${rutaImg}" class="carrito-portada" alt="Portada">
            ${libro.titulo}
          </td>
          <td>$${libro.precio.toFixed(2)}</td>
          <td><button onclick="eliminarDelCarrito(${index})" style="background: #a83232; padding: 6px 12px;">Eliminar</button></td>
        </tr>
      `;
    });
    
    htmlTabla += '</tbody></table>';
    contenedor.innerHTML = htmlTabla;
  }
  
  if (subtotalValor) subtotalValor.textContent = `$${total.toFixed(2)}`;
  if (totalValor) totalValor.textContent = `$${total.toFixed(2)}`;
}

function finalizarCompra() {
  if (carrito.length === 0) {
    alert("El carrito está vacío.");
    return;
  }
  
  const total = carrito.reduce((sum, item) => sum + item.precio, 0);
  alert(`¡Gracias por tu compra en Sleepbook!\nTu pedido fue procesado con éxito. Total: $${total.toFixed(2)}`);
  
  carrito = [];
  guardarCarrito();
  actualizarBadgeMenu();
  actualizarCarritoVisual();
}

// Inicialización general al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
  cargarMenu();
  cargarFooter();
  
  if (document.getElementById("catalogo-libros")) {
    mostrarCatalogo(); 
    configurarFiltroCatalogo();
  }
  
  if (document.getElementById("items-carrito")) {
    actualizarCarritoVisual(); 
  }
});
// Notificación Toast Flotante
function mostrarToast(mensaje) {
  let toast = document.getElementById("toast-sleepbook");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast-sleepbook";
    toast.className = "toast-notificacion";
    document.body.appendChild(toast);
  }
  
  toast.textContent = mensaje;
  toast.classList.add("show");
  
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// Modal Personalizado de Confirmación de Compra
function mostrarModalCompra(total) {
  let modal = document.getElementById("modal-compra-sleepbook");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "modal-compra-sleepbook";
    modal.className = "modal-overlay";
    modal.innerHTML = `
      <div class="modal-contenido">
        <h3>¡Gracias por tu compra!</h3>
        <p id="modal-mensaje-texto"></p>
        <button onclick="cerrarModalCompra()">Aceptar</button>
      </div>
    `;
    document.body.appendChild(modal);
  }

  const textoEl = document.getElementById("modal-mensaje-texto");
  if (textoEl) {
    textoEl.innerHTML = `Tu pedido fue procesado con éxito en <strong>Sleepbook</strong>.<br>Total pagado: <strong style="color: #a83232;">$${total.toFixed(2)}</strong>`;
  }

  modal.classList.add("active");
}

function cerrarModalCompra() {
  const modal = document.getElementById("modal-compra-sleepbook");
  if (modal) {
    modal.classList.remove("active");
  }
}

// Lógica del Carrito con Notificaciones Elegantes
function agregarAlCarrito(libroId) {
  const libroSeleccionado = libros.find(l => l.id === libroId);
  if (libroSeleccionado) {
    carrito.push({ ...libroSeleccionado });
    guardarCarrito();
    actualizarBadgeMenu();
    
    // Reemplaza el alert nativo por el Toast
    mostrarToast(`¡"${libroSeleccionado.titulo}" fue añadido al carrito!`);
    
    if (document.getElementById("items-carrito")) {
      actualizarCarritoVisual();
    }
  }
}

function finalizarCompra() {
  if (carrito.length === 0) {
    mostrarToast("Tu carrito está vacío.");
    return;
  }
  
  const total = carrito.reduce((sum, item) => sum + item.precio, 0);
  
  // Reemplaza el alert por el modal estilizado
  mostrarModalCompra(total);
  
  carrito = [];
  guardarCarrito();
  actualizarBadgeMenu();
  actualizarCarritoVisual();
}