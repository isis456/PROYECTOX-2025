/* ===================================================
   SLEEPBOOK - LÓGICA PRINCIPAL (24 LIBROS EN TOTAL)
   =================================================== */

// Base de datos completa con los libros antiguos + los libros nuevos (6 por categoría)
const libros = [
  // TERROR (6)
  { id: 1, titulo: "Pesadillas en la Oscuridad", autor: "H. Lovecraft", precio: 22.00, categoria: "terror", imagen: "../img/portadas/terror1.png" },
  { id: 2, titulo: "La Sombra del Miedo", autor: "S. King", precio: 28.50, categoria: "terror", imagen: "../img/portadas/terror2.png" },
  { id: 3, titulo: "El Ritual Prohibido", autor: "E. Allan Poe", precio: 19.00, categoria: "terror", imagen: "../img/portadas/terror3.png" },
  { id: 4, titulo: "Drácula", autor: "Bram Stoker", precio: 22.00, categoria: "terror", imagen: "../img/portadas/terror4.png" },
  { id: 5, titulo: "Coraline", autor: "Neil Gaiman", precio: 18.50, categoria: "terror", imagen: "../img/portadas/terror5.png" },
  { id: 6, titulo: "Cadáver exquisito", autor: "Agustina Bazterrica", precio: 21.00, categoria: "terror", imagen: "../img/portadas/terror6.png" },

  // ACCIÓN (6)
  { id: 7, titulo: "Misión: Rescate", autor: "J. Clancy", precio: 24.00, categoria: "accion", imagen: "../img/portadas/accion1.png" },
  { id: 8, titulo: "Fuego Cruzado", autor: "L. Child", precio: 31.00, categoria: "accion", imagen: "../img/portadas/accion2.png" },
  { id: 9, titulo: "Código Omega", autor: "R. Ludlum", precio: 26.50, categoria: "accion", imagen: "../img/portadas/accion3.png" },
  { id: 10, titulo: "El código Da Vinci", autor: "Dan Brown", precio: 26.00, categoria: "accion", imagen: "../img/portadas/accion4.png" },
  { id: 11, titulo: "Cicatriz", autor: "Juan Gómez-Jurado", precio: 24.50, categoria: "accion", imagen: "../img/portadas/accion5.png" },
  { id: 12, titulo: "La caza del Octubre Rojo", autor: "Tom Clancy", precio: 28.00, categoria: "accion", imagen: "../img/portadas/accion6.png" },

  // FANTASÍA (6)
  { id: 13, titulo: "El Reino de Cristal", autor: "J.R.R. Tolkien", precio: 35.00, categoria: "fantasia", imagen: "../img/portadas/fantasia1.png" },
  { id: 14, titulo: "Magia y Leyendas", autor: "G. Martin", precio: 38.00, categoria: "fantasia", imagen: "../img/portadas/fantasia2.png" },
  { id: 15, titulo: "Los Dragones Dormidos", autor: "U. Le Guin", precio: 30.00, categoria: "fantasia", imagen: "../img/portadas/fantasia3.png" },
  { id: 16, titulo: "El Señor de los Anillos", autor: "J.R.R. Tolkien", precio: 35.00, categoria: "fantasia", imagen: "../img/portadas/fantasia4.png" },
  { id: 17, titulo: "Juego de Tronos", autor: "George R.R. Martin", precio: 32.00, categoria: "fantasia", imagen: "../img/portadas/fantasia5.png" },
  { id: 18, titulo: "Harry Potter", autor: "J.K. Rowling", precio: 29.50, categoria: "fantasia", imagen: "../img/portadas/fantasia6.png" },

  // ROMANCE (6)
  { id: 19, titulo: "Bajo el Cielo de París", autor: "J. Austen", precio: 18.00, categoria: "romance", imagen: "../img/portadas/romance1.png" },
  { id: 20, titulo: "Un Amor de Verano", autor: "N. Sparks", precio: 21.00, categoria: "romance", imagen: "../img/portadas/romance2.png" },
  { id: 21, titulo: "Eternamente Tuya", autor: "C. Bronte", precio: 23.50, categoria: "romance", imagen: "../img/portadas/romance3.png" },
  { id: 22, titulo: "Orgullo y prejuicio", autor: "Jane Austen", precio: 19.00, categoria: "romance", imagen: "../img/portadas/romance4.png" },
  { id: 23, titulo: "Cumbres borrascosas", autor: "Emily Brontë", precio: 20.50, categoria: "romance", imagen: "../img/portadas/romance5.png" },
  { id: 24, titulo: "Alas de sangre", autor: "Rebecca Yarros", precio: 30.00, categoria: "romance", imagen: "../img/portadas/romance6.png" }
];

// Persistencia del Carrito en localStorage
let carrito = JSON.parse(localStorage.getItem("carrito_sleepbook")) || [];

function guardarCarrito() {
  localStorage.setItem("carrito_sleepbook", JSON.stringify(carrito));
}

// ---------------------------------------------------
// NOTIFICACIONES Y MODALES PERSONALIZADOS
// ---------------------------------------------------

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

// ---------------------------------------------------
// CARGA MODULAR DE COMPONENTES (MENÚ Y FOOTER)
// ---------------------------------------------------

async function cargarComponente(id, nombreArchivo) {
  const contenedor = document.getElementById(id);
  if (!contenedor) return;

  const estaEnPage = window.location.pathname.includes("/page/");
  const ruta = estaEnPage ? `../${nombreArchivo}.html` : `${nombreArchivo}.html`;

  try {
    const respuesta = await fetch(ruta);
    if (!respuesta.ok) throw new Error(`HTTP Error ${respuesta.status}`);
    
    let htmlContent = await respuesta.text();

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
    const cantidad = carrito.length;
    contadorEl.textContent = cantidad;
    
    if (cantidad === 0) {
      contadorEl.style.display = "none";
    } else {
      contadorEl.style.display = "inline-block";
    }
  }
}

// ---------------------------------------------------
// RENDERIZADO DEL CATÁLOGO Y FILTROS
// ---------------------------------------------------

function mostrarCatalogo(filtroCategoria = 'todos', terminoBusqueda = '') {
  const contenedor = document.getElementById("catalogo-libros");
  if (!contenedor) return;

  let resultado = libros;

  if (filtroCategoria !== 'todos') {
    resultado = resultado.filter(l => l.categoria === filtroCategoria);
  }

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

// ---------------------------------------------------
// LÓGICA DEL CARRITO DE COMPRAS
// ---------------------------------------------------

function agregarAlCarrito(libroId) {
  const libroSeleccionado = libros.find(l => l.id === libroId);
  if (libroSeleccionado) {
    carrito.push({ ...libroSeleccionado });
    guardarCarrito();
    actualizarBadgeMenu();
    
    mostrarToast(`¡"${libroSeleccionado.titulo}" fue añadido al carrito!`);
    
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
  const resumenBox = document.getElementById("resumen-carrito");
  
  if (!contenedor || !totalValor) return;

  let total = 0;
  const estaEnPage = window.location.pathname.includes("/page/");

  if (carrito.length === 0) {
    contenedor.innerHTML = `
      <div class="carrito-vacio-card">
        <div class="icono-vacio">🛒</div>
        <h3>Tu carrito está vacío</h3>
        <p>Parece que aún no has añadido ningún libro a tu lista.</p>
        <a href="${estaEnPage ? 'catalogo.html' : 'page/catalogo.html'}" class="boton-comprar" style="margin-top: 15px; text-decoration: none; display: inline-block;">
          Explorar Catálogo
        </a>
      </div>
    `;
    if (resumenBox) resumenBox.style.display = "none";
  } else {
    if (resumenBox) resumenBox.style.display = "block";
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
            <div class="prod-info-carrito">
              <img src="${rutaImg}" class="carrito-portada" alt="Portada">
              <span>${libro.titulo}</span>
            </div>
          </td>
          <td class="precio-col">$${libro.precio.toFixed(2)}</td>
          <td>
            <button onclick="eliminarDelCarrito(${index})" class="btn-eliminar">
              Eliminar
            </button>
          </td>
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
    mostrarToast("Tu carrito está vacío.");
    return;
  }
  
  const total = carrito.reduce((sum, item) => sum + item.precio, 0);
  mostrarModalCompra(total);
  
  carrito = [];
  guardarCarrito();
  actualizarBadgeMenu();
  actualizarCarritoVisual();
}

// ---------------------------------------------------
// INICIALIZACIÓN DE LA APLICACIÓN
// ---------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  cargarMenu();
  cargarFooter();
  
  if (document.getElementById("catalogo-libros")) {
    const urlParams = new URLSearchParams(window.location.search);
    const categoriaURL = urlParams.get('cat') || 'todos';

    const enlaceCategoria = document.querySelector(`.menu-lateral a[data-categoria="${categoriaURL}"]`);
    
    if (enlaceCategoria) {
      document.querySelectorAll('.menu-lateral a').forEach(a => a.classList.remove('active'));
      enlaceCategoria.classList.add('active');
    }

    mostrarCatalogo(categoriaURL); 
    configurarFiltroCatalogo();
  }
  
  if (document.getElementById("items-carrito")) {
    actualizarCarritoVisual(); 
  }
});