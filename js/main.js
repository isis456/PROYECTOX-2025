/* ===========================
   HOME.JS - Funcionalidades específicas del index
=========================== */

class HomeManager {
    constructor() {
        this.librosDestacados = [];
        this.categoriasDestacadas = [];
        this.autoresDestacados = [];
        
        // Inicializar cuando el DOM esté listo
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.inicializar());
        } else {
            this.inicializar();
        }
    }

    async inicializar() {
        console.log('Inicializando HomeManager...');
        
        // Solo ejecutar en la página principal
        if (!this.esPaginaPrincipal()) return;
        
        await this.cargarDatosIniciales();
        this.renderizarContenido();
        this.configurarEventListenersEspecificos();
    }

    esPaginaPrincipal() {
        return window.location.pathname.endsWith('index.html') || 
               window.location.pathname === '/' || 
               window.location.pathname.endsWith('/');
    }

    async cargarDatosIniciales() {
        try {
            if (window.bibliotecaData) {
                const [libros, categorias, autores] = await Promise.all([
                    bibliotecaData.obtenerLibrosDestacados(),
                    bibliotecaData.obtenerCategoriasDestacadas(),
                    bibliotecaData.obtenerAutoresDestacados()
                ]);
                
                this.librosDestacados = libros;
                this.categoriasDestacadas = categorias;
                this.autoresDestacados = autores;
                
                console.log('Datos cargados:', {
                    libros: libros.length,
                    categorias: categorias.length,
                    autores: autores.length
                });
            } else {
                console.warn('bibliotecaData no disponible');
            }
        } catch (error) {
            console.error('Error cargando datos iniciales:', error);
        }
    }

    renderizarContenido() {
        this.renderizarCategorias();
        this.renderizarLibrosDestacados();
        this.renderizarAutoresDestacados();
    }

    renderizarCategorias() {
        const contenedor = document.getElementById('categorias-destacadas');
        if (!contenedor) return;

        if (this.categoriasDestacadas.length === 0) {
            contenedor.innerHTML = '<p class="texto-centro">No hay categorías disponibles</p>';
            return;
        }

        const categoriasHTML = this.categoriasDestacadas.map(categoria => `
            <div class="categoria-card" onclick="irACategoria('${categoria.id}')">
                <div class="categoria-icono">${categoria.icono}</div>
                <h3>${categoria.nombre}</h3>
                <p>${categoria.descripcion}</p>
                <span class="categoria-contador">${categoria.totalLibros} libros</span>
            </div>
        `).join('');

        contenedor.innerHTML = categoriasHTML;
    }

    renderizarLibrosDestacados() {
        const contenedor = document.getElementById('libros-vendidos');
        if (!contenedor) return;

        if (this.librosDestacados.length === 0) {
            contenedor.innerHTML = '<p class="texto-centro">No hay libros destacados disponibles</p>';
            return;
        }

        const librosHTML = this.librosDestacados.map(libro => `
            <div class="libro-card">
                ${libro.descuento ? `<span class="libro-descuento">-${libro.descuento}%</span>` : ''}
                <img src="${libro.imagen}" alt="${libro.titulo}" class="libro-imagen" 
                     onerror="this.src='https://via.placeholder.com/140x200/d7ccc8/5d4037?text=Libro'">
                <h4 class="libro-titulo">${libro.titulo}</h4>
                <p class="libro-autor">${libro.autor}</p>
                <div class="libro-precio">
                    ${libro.precioOriginal ? `<span class="libro-precio-original">$${libro.precioOriginal}</span>` : ''}
                    $${libro.precio}
                </div>
                <div class="libro-acciones">
                    <button class="btn-primario btn-comprar-global" data-libro-id="${libro.id}">Comprar</button>
                    <button class="btn-outline" onclick="toggleFavoritoLibro(${libro.id})">❤️</button>
                </div>
            </div>
        `).join('');

        contenedor.innerHTML = librosHTML;
    }

    renderizarAutoresDestacados() {
        const contenedor = document.getElementById('autores-destacados');
        if (!contenedor) return;

        if (this.autoresDestacados.length === 0) {
            contenedor.innerHTML = '<p class="texto-centro">No hay autores destacados disponibles</p>';
            return;
        }

        const autoresHTML = this.autoresDestacados.map(autor => `
            <div class="autor-card" onclick="verAutor('${autor.id}')">
                <img src="${autor.foto}" alt="${autor.nombre}" class="autor-foto"
                     onerror="this.src='https://via.placeholder.com/100x100/d7ccc8/5d4037?text=Autor'">
                <h3 class="autor-nombre">${autor.nombre}</h3>
                <p class="autor-biografia">${autor.biografia.substring(0, 100)}...</p>
                <span class="autor-contador">${autor.totalLibros} libros</span>
            </div>
        `).join('');

        contenedor.innerHTML = autoresHTML;
    }

    configurarEventListenersEspecificos() {
        // Búsqueda en el hero
        const buscadorHero = document.getElementById('buscador-hero');
        if (buscadorHero) {
            buscadorHero.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    buscarDesdeHero();
                }
            });
        }

        // Newsletter específico del home
        const newsletterHome = document.querySelector('.newsletter-home .newsletter-form');
        if (newsletterHome) {
            newsletterHome.addEventListener('submit', (e) => {
                e.preventDefault();
                this.manejarNewsletterHome(e.target);
            });
        }
    }

    async manejarNewsletterHome(formulario) {
        const emailInput = formulario.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (!validarEmail(email)) {
            mostrarNotificacion('Por favor, ingresa un email válido', 'advertencia');
            emailInput.focus();
            return;
        }
        
        try {
            // Simular envío específico para home
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            mostrarNotificacion('¡Bienvenido a Leep Books! Recibirás nuestras mejores ofertas.', 'exito');
            formulario.reset();
            
        } catch (error) {
            console.error('Error en suscripción home:', error);
            mostrarNotificacion('Error al procesar la suscripción', 'error');
        }
    }
}

// Funciones globales específicas del home
function verAutor(autorId) {
    window.location.href = `page/autores.html?autor=${encodeURIComponent(autorId)}`;
}

function suscribirNewsletter(event) {
    event.preventDefault();
    const formulario = event.target;
    const email = formulario.querySelector('input[type="email"]').value;
    
    if (validarEmail(email)) {
        mostrarNotificacion('¡Gracias por suscribirte!', 'exito');
        formulario.reset();
    } else {
        mostrarNotificacion('Por favor, ingresa un email válido', 'advertencia');
    }
}

// Inicializar HomeManager cuando se cargue el script
const homeManager = new HomeManager();