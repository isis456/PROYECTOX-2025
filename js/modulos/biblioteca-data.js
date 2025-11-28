/* ===========================
   BIBLIOTECA-DATA.JS - LEEP BOOKS
   Gestor completo de datos de libros
=========================== */

class GestorBiblioteca {
    constructor() {
        this.libros = this.inicializarDatosLibros();
        this.categorias = this.inicializarCategorias();
        this.autores = this.inicializarAutores();
        this.pedidos = this.cargarPedidosGuardados();
        console.log('📚 GestorBiblioteca inicializado con', this.libros.length, 'libros');
    }

    /* ===========================
       INICIALIZACIÓN DE CATEGORÍAS
    =========================== */
    inicializarCategorias() {
        return {
            TERROR: {
                id: "TERROR",
                nombre: "Terror",
                descripcion: "Libros de miedo y suspenso que harán palpitar tu corazón",
                icono: "👻",
                color: "#7b1fa2",
                totalLibros: 1245,
                destacada: true,
                tags: ["suspenso", "miedo", "paranormal", "thriller"]
            },
            ACCION: {
                id: "ACCION", 
                nombre: "Acción",
                descripcion: "Aventuras trepidantes y emociones fuertes",
                icono: "💥",
                color: "#d32f2f",
                totalLibros: 867,
                destacada: true,
                tags: ["aventura", "suspenso", "thriller", "policial"]
            },
            INFANTIL: {
                id: "INFANTIL",
                nombre: "Infantil",
                descripcion: "Divertidas historias para los más pequeños",
                icono: "🧸",
                color: "#1976d2",
                totalLibros: 1567,
                destacada: false,
                tags: ["niños", "educativo", "divertido", "aprendizaje"]
            },
            ROMANCE: {
                id: "ROMANCE",
                nombre: "Romance",
                descripcion: "Historias de amor inolvidables y apasionadas",
                icono: "💖",
                color: "#e91e63",
                totalLibros: 1892,
                destacada: true,
                tags: ["amor", "pasión", "drama", "relaciones"]
            },
            FANTASIA: {
                id: "FANTASIA",
                nombre: "Fantasía", 
                descripcion: "Mundos mágicos y aventuras épicas",
                icono: "🐉",
                color: "#ff9800",
                totalLibros: 2367,
                destacada: true,
                tags: ["magia", "aventura", "épico", "mitología"]
            },
            CIENCIA_FICCION: {
                id: "CIENCIA_FICCION",
                nombre: "Ciencia Ficción",
                descripcion: "Futuros posibles y universos alternativos",
                icono: "🚀",
                color: "#0097a7",
                totalLibros: 987,
                destacada: false,
                tags: ["futuro", "tecnología", "espacio", "distopía"]
            },
            BIOGRAFIAS: {
                id: "BIOGRAFIAS",
                nombre: "Biografías",
                descripcion: "Vidas reales llenas de inspiración",
                icono: "📖",
                color: "#5d4037",
                totalLibros: 654,
                destacada: false,
                tags: ["real", "inspirador", "histórico", "personal"]
            },
            MISTERIO: {
                id: "MISTERIO",
                nombre: "Misterio",
                descripcion: "Enigmas por resolver y casos intrigantes",
                icono: "🕵️",
                color: "#455a64",
                totalLibros: 723,
                destacada: false,
                tags: ["investigación", "crímenes", "enigmas", "suspenso"]
            },
            AUTOAYUDA: {
                id: "AUTOAYUDA",
                nombre: "Autoayuda",
                descripcion: "Desarrollo personal y superación",
                icono: "💪",
                color: "#388e3c",
                totalLibros: 543,
                destacada: false,
                tags: ["desarrollo", "motivación", "crecimiento", "personal"]
            }
        };
    }

    /* ===========================
       INICIALIZACIÓN DE AUTORES
    =========================== */
    inicializarAutores() {
        return {
            "STEPHEN_KING": {
                id: "STEPHEN_KING",
                nombre: "Stephen King",
                biografia: "Maestro del terror contemporáneo con más de 60 novelas publicadas. Conocido como el 'Rey del Terror', sus obras han vendido más de 350 millones de copias worldwide.",
                nacionalidad: "Estadounidense",
                fechaNacimiento: "1947-09-21",
                lugarNacimiento: "Portland, Maine, Estados Unidos",
                foto: "img/autores/stephen-king.jpg",
                totalLibros: 65,
                rating: 4.7,
                destacado: true,
                generos: ["Terror", "Suspenso", "Fantasía"],
                premios: ["Premio Bram Stoker", "Medalla Nacional de las Artes"],
                website: "https://stephenking.com"
            },
            "JK_ROWLING": {
                id: "JK_ROWLING", 
                nombre: "J.K. Rowling",
                biografia: "Creadora del mundo mágico de Harry Potter, la serie de libros más vendida de la historia. Sus obras han sido traducidas a 80 idiomas.",
                nacionalidad: "Británica",
                fechaNacimiento: "1965-07-31",
                lugarNacimiento: "Yate, Gloucestershire, Inglaterra",
                foto: "img/autores/jk-rowling.jpg",
                totalLibros: 12,
                rating: 4.9,
                destacado: true,
                generos: ["Fantasía", "Literatura infantil"],
                premios: ["Orden del Imperio Británico", "Premio Hans Christian Andersen"],
                website: "https://jkrowling.com"
            },
            "ISABEL_ALLENDE": {
                id: "ISABEL_ALLENDE",
                nombre: "Isabel Allende",
                biografia: "Reina del realismo mágico latinoamericano, conocida por sus conmovedoras historias familiares. Es la escritora en español más leída del mundo.",
                nacionalidad: "Chilena",
                fechaNacimiento: "1942-08-02",
                lugarNacimiento: "Lima, Perú",
                foto: "img/autores/isabel-allende.jpg",
                totalLibros: 24,
                rating: 4.5,
                destacado: true,
                generos: ["Realismo mágico", "Ficción literaria"],
                premios: ["Premio Nacional de Literatura de Chile", "Medalla Presidential de la Libertad"],
                website: "https://isabelallende.com"
            },
            "GABRIEL_GARCIA_MARQUEZ": {
                id: "GABRIEL_GARCIA_MARQUEZ",
                nombre: "Gabriel García Márquez",
                biografia: "Premio Nobel de Literatura y máximo exponente del realismo mágico. Su obra 'Cien años de soledad' es considerada una de las más importantes del siglo XX.",
                nacionalidad: "Colombiano",
                fechaNacimiento: "1927-03-06",
                lugarNacimiento: "Aracataca, Colombia",
                foto: "img/autores/gabriel-garcia-marquez.jpg",
                totalLibros: 18,
                rating: 4.8,
                destacado: true,
                generos: ["Realismo mágico", "Ficción literaria"],
                premios: ["Premio Nobel de Literatura", "Premio Rómulo Gallegos"],
                website: null
            },
            "JRR_TOLKIEN": {
                id: "JRR_TOLKIEN",
                nombre: "J.R.R. Tolkien",
                biografia: "Filólogo y escritor británico, autor de 'El Señor de los Anillos' y 'El Hobbit'. Considerado el padre de la literatura fantástica moderna.",
                nacionalidad: "Británico",
                fechaNacimiento: "1892-01-03",
                lugarNacimiento: "Bloemfontein, Estado Libre de Orange",
                foto: "img/autores/tolkien.jpg",
                totalLibros: 28,
                rating: 4.8,
                destacado: true,
                generos: ["Fantasía", "Alta fantasía"],
                premios: ["International Fantasy Award"],
                website: null
            }
        };
    }

    /* ===========================
       INICIALIZACIÓN DE LIBROS
    =========================== */
    inicializarDatosLibros() {
        return [
            // === TERROR ===
            {
                id: 1,
                titulo: "It",
                autor: "Stephen King",
                autorId: "STEPHEN_KING",
                precio: 22.90,
                precioOriginal: 28.90,
                descuento: 20,
                imagen: "img/libros/terror-it.jpg",
                categoria: "TERROR",
                descripcion: "En el pueblo de Derry, un malévolo payaso llamado Pennywise aterroriza a un grupo de niños que deben enfrentar sus peores miedos. Veintisiete años después, el monstruo regresa y los ahora adultos deben cumplir su promesa de eliminarlo para siempre.",
                paginas: 1138,
                isbn: "978-1501142970",
                rating: 4.5,
                reseñas: 1250,
                stock: 15,
                destacado: true,
                fechaPublicacion: "1986-09-15",
                editorial: "Viking Press",
                idioma: "Español",
                formato: "Tapa blanda",
                dimensiones: "13.97 x 4.45 x 21.08 cm",
                peso: "862g",
                tags: ["payaso", "terror psicológico", "amistad", "trauma"],
                relacionados: [2, 10]
            },
            {
                id: 2,
                titulo: "Drácula",
                autor: "Bram Stoker",
                precio: 18.50,
                imagen: "img/libros/terror-dracula.jpg",
                categoria: "TERROR",
                descripcion: "El clásico de vampiros que definió el género. La historia del conde Drácula y su llegada a Inglaterra, contada a través de cartas y diarios de los personajes.",
                paginas: 418,
                isbn: "978-0486411095",
                rating: 4.3,
                reseñas: 890,
                stock: 8,
                fechaPublicacion: "1897-05-26",
                editorial: "Archibald Constable and Company",
                idioma: "Español",
                formato: "Tapa dura",
                dimensiones: "14.61 x 2.74 x 21.59 cm",
                peso: "680g",
                tags: ["vampiros", "clásico", "gótico", "época victoriana"],
                relacionados: [1, 5]
            },

            // === ACCIÓN ===
            {
                id: 3,
                titulo: "Jack Reacher: Punto de Impacto",
                autor: "Lee Child",
                precio: 20.90,
                imagen: "img/libros/accion-reacher.jpg",
                categoria: "ACCION",
                descripcion: "Jack Reacher, un ex militar policía, llega a una pequeña ciudad donde se ve envuelto en una conspiración mortal que involucra asesinatos y corrupción.",
                paginas: 352,
                isbn: "978-8401338040",
                rating: 4.2,
                reseñas: 567,
                stock: 12,
                fechaPublicacion: "1997-03-17",
                editorial: "G.P. Putnam's Sons",
                idioma: "Español",
                formato: "Tapa blanda",
                dimensiones: "12.7 x 2.03 x 19.69 cm",
                peso: "318g",
                tags: ["thriller", "conspiración", "misterio", "acción"],
                relacionados: [8, 11]
            },

            // === INFANTIL ===
            {
                id: 4,
                titulo: "El Principito",
                autor: "Antoine de Saint-Exupéry",
                precio: 15.50,
                imagen: "img/libros/infantil-principito.jpg",
                categoria: "INFANTIL",
                descripcion: "Un cuento poético que sigue las aventuras de un pequeño príncipe que viaja por el universo aprendiendo sobre el amor, la amistad y la esencia de la vida.",
                paginas: 96,
                isbn: "978-0156012195",
                rating: 4.8,
                reseñas: 2300,
                stock: 25,
                destacado: true,
                fechaPublicacion: "1943-04-06",
                editorial: "Reynal & Hitchcock",
                idioma: "Español",
                formato: "Tapa dura ilustrada",
                dimensiones: "15.24 x 1.27 x 22.86 cm",
                peso: "340g",
                tags: ["filosofía", "amistad", "aventura", "infantil"],
                relacionados: [6, 9]
            },

            // === ROMANCE ===
            {
                id: 5,
                titulo: "Orgullo y Prejuicio",
                autor: "Jane Austen",
                precio: 17.90,
                precioOriginal: 21.90,
                descuento: 18,
                imagen: "img/libros/romance-orgullo.jpg",
                categoria: "ROMANCE",
                descripcion: "La historia de Elizabeth Bennet y el señor Darcy, dos personas de diferentes clases sociales que deben superar sus prejuicios para encontrar el amor verdadero.",
                paginas: 432,
                isbn: "978-0141439518",
                rating: 4.6,
                reseñas: 1780,
                stock: 18,
                fechaPublicacion: "1813-01-28",
                editorial: "T. Egerton",
                idioma: "Español",
                formato: "Tapa blanda",
                dimensiones: "12.9 x 2.4 x 19.8 cm",
                peso: "295g",
                tags: ["clásico", "amor", "sociedad", "prejuicios"],
                relacionados: [2, 7]
            },

            // === FANTASÍA ===
            {
                id: 6,
                titulo: "Harry Potter y la Piedra Filosofal",
                autor: "J.K. Rowling",
                autorId: "JK_ROWLING",
                precio: 24.90,
                imagen: "img/libros/fantasia-harrypotter.jpg",
                categoria: "FANTASIA",
                descripcion: "Harry Potter descubre que es un mago y comienza su educación en el Colegio Hogwarts de Magia y Hechicería, donde hará amigos y enfrentará misterios peligrosos.",
                paginas: 320,
                isbn: "978-8478884452",
                rating: 4.9,
                reseñas: 4500,
                stock: 30,
                destacado: true,
                fechaPublicacion: "1997-06-26",
                editorial: "Bloomsbury",
                idioma: "Español",
                formato: "Tapa dura",
                dimensiones: "14.61 x 2.79 x 22.23 cm",
                peso: "499g",
                tags: ["magia", "escuela", "amistad", "aventura"],
                relacionados: [7, 10]
            },
            {
                id: 7,
                titulo: "El Señor de los Anillos: La Comunidad del Anillo",
                autor: "J.R.R. Tolkien",
                autorId: "JRR_TOLKIEN",
                precio: 26.90,
                imagen: "img/libros/fantasia-senoranillos.jpg",
                categoria: "FANTASIA",
                descripcion: "Frodo Bolsón emprende un peligroso viaje para destruir el Anillo Único y evitar que caiga en manos del Señor Oscuro Sauron.",
                paginas: 480,
                isbn: "978-8445000660",
                rating: 4.7,
                reseñas: 3200,
                stock: 22,
                destacado: true,
                fechaPublicacion: "1954-07-29",
                editorial: "George Allen & Unwin",
                idioma: "Español",
                formato: "Tapa blanda",
                dimensiones: "10.8 x 3.8 x 17.8 cm",
                peso: "322g",
                tags: ["fantasía épica", "aventura", "amistad", "guerra"],
                relacionados: [6, 8]
            },

            // === CIENCIA FICCIÓN ===
            {
                id: 8,
                titulo: "Dune",
                autor: "Frank Herbert",
                precio: 23.50,
                imagen: "img/libros/ciencia-dune.jpg",
                categoria: "CIENCIA_FICCION",
                descripcion: "En el planeta desértico Arrakis, el joven Paul Atreides se convierte en el mesías de los fremen y lidera una revolución por el control de la especia melange.",
                paginas: 412,
                isbn: "978-0441172719",
                rating: 4.4,
                reseñas: 1560,
                stock: 14,
                fechaPublicacion: "1965-08-01",
                editorial: "Chilton Books",
                idioma: "Español",
                formato: "Tapa blanda",
                dimensiones: "10.67 x 2.79 x 17.15 cm",
                peso: "272g",
                tags: ["ciencia ficción", "política", "ecología", "mesías"],
                relacionados: [3, 7]
            },

            // === REALISMO MÁGICO ===
            {
                id: 9,
                titulo: "Cien Años de Soledad",
                autor: "Gabriel García Márquez",
                autorId: "GABRIEL_GARCIA_MARQUEZ",
                precio: 21.90,
                imagen: "img/libros/realismo-cien-anos.jpg",
                categoria: "REALISMO_MAGICO",
                descripcion: "La saga de la familia Buendía en el pueblo ficticio de Macondo, un relato mágico que abarca siete generaciones.",
                paginas: 471,
                isbn: "978-0307474728",
                rating: 4.7,
                reseñas: 2890,
                stock: 20,
                destacado: true,
                fechaPublicacion: "1967-05-30",
                editorial: "Editorial Sudamericana",
                idioma: "Español",
                formato: "Tapa blanda",
                dimensiones: "13.21 x 2.79 x 20.19 cm",
                peso: "408g",
                tags: ["realismo mágico", "familia", "América Latina", "saga familiar"],
                relacionados: [10, 11]
            },
            {
                id: 10,
                titulo: "La Casa de los Espíritus",
                autor: "Isabel Allende",
                autorId: "ISABEL_ALLENDE",
                precio: 19.90,
                precioOriginal: 24.90,
                descuento: 20,
                imagen: "img/libros/realismo-casa-espiritus.jpg",
                categoria: "REALISMO_MAGICO",
                descripcion: "La historia de la familia Trueba a lo largo de cuatro generaciones, marcada por el amor, la política y lo sobrenatural.",
                paginas: 481,
                isbn: "978-8401338041",
                rating: 4.5,
                reseñas: 1670,
                stock: 16,
                destacado: true,
                fechaPublicacion: "1982-01-01",
                editorial: "Plaza & Janés",
                idioma: "Español",
                formato: "Tapa blanda",
                dimensiones: "12.7 x 3.18 x 19.69 cm",
                peso: "385g",
                tags: ["realismo mágico", "familia", "política", "amor"],
                relacionados: [9, 1]
            },

            // === MÁS LIBROS PARA COMPLETAR CATEGORÍAS ===
            {
                id: 11,
                titulo: "El Código Da Vinci",
                autor: "Dan Brown",
                precio: 18.90,
                imagen: "img/libros/misterio-codigo-davinci.jpg",
                categoria: "MISTERIO",
                descripcion: "Un thriller que mezcla suspense, arte y religión en una búsqueda por descubrir un secreto milenario.",
                paginas: 454,
                isbn: "978-8401338042",
                rating: 4.2,
                reseñas: 1890,
                stock: 21,
                fechaPublicacion: "2003-03-18",
                editorial: "Doubleday",
                idioma: "Español",
                formato: "Tapa blanda",
                tags: ["misterio", "conspiración", "religión", "arte"],
                relacionados: [3, 8]
            },
            {
                id: 12,
                titulo: "Los 7 Hábitos de la Gente Altamente Efectiva",
                autor: "Stephen R. Covey",
                precio: 16.90,
                imagen: "img/libros/autoayuda-7habitos.jpg",
                categoria: "AUTOAYUDA",
                descripcion: "Un clásico de desarrollo personal que presenta siete principios para alcanzar la efectividad personal e interpersonal.",
                paginas: 381,
                isbn: "978-8401338043",
                rating: 4.4,
                reseñas: 2340,
                stock: 28,
                fechaPublicacion: "1989-08-15",
                editorial: "Free Press",
                idioma: "Español",
                formato: "Tapa blanda",
                tags: ["desarrollo personal", "liderazgo", "productividad", "hábitos"],
                relacionados: [9, 10]
            }
        ];
    }

    /* ===========================
       MÉTODOS PRINCIPALES - LIBROS
    =========================== */

    // Obtener todos los libros
    obtenerTodosLosLibros() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([...this.libros]);
            }, 300);
        });
    }

    // Obtener libros por categoría
    obtenerLibrosPorCategoria(categoria) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const librosFiltrados = this.libros.filter(libro => 
                    libro.categoria === categoria.toUpperCase()
                );
                resolve(librosFiltrados);
            }, 200);
        });
    }

    // Obtener libros destacados
    obtenerLibrosDestacados() {
        return new Promise((resolve) => {
            setTimeout(() => {
                const destacados = this.libros.filter(libro => libro.destacado);
                resolve(destacados);
            }, 250);
        });
    }

    // Obtener un libro por ID
    obtenerLibroPorId(id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const libro = this.libros.find(l => l.id === parseInt(id));
                if (libro) {
                    resolve(libro);
                } else {
                    reject(new Error(`Libro con ID ${id} no encontrado`));
                }
            }, 200);
        });
    }

    // Buscar libros por término
    buscarLibros(termino) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const terminoLower = termino.toLowerCase();
                const resultados = this.libros.filter(libro =>
                    libro.titulo.toLowerCase().includes(terminoLower) ||
                    libro.autor.toLowerCase().includes(terminoLower) ||
                    libro.categoria.toLowerCase().includes(terminoLower) ||
                    (libro.descripcion && libro.descripcion.toLowerCase().includes(terminoLower)) ||
                    (libro.tags && libro.tags.some(tag => tag.toLowerCase().includes(terminoLower)))
                );
                resolve(resultados);
            }, 300);
        });
    }

    // Obtener libros en oferta
    obtenerLibrosEnOferta() {
        return new Promise((resolve) => {
            setTimeout(() => {
                const ofertas = this.libros.filter(libro => libro.descuento);
                resolve(ofertas);
            }, 200);
        });
    }

    // Obtener libros relacionados
    obtenerLibrosRelacionados(libroId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const libro = this.libros.find(l => l.id === libroId);
                if (libro && libro.relacionados) {
                    const relacionados = this.libros.filter(l => 
                        libro.relacionados.includes(l.id)
                    );
                    resolve(relacionados);
                } else {
                    resolve([]);
                }
            }, 150);
        });
    }

    /* ===========================
       MÉTODOS - CATEGORÍAS
    =========================== */

    // Obtener todas las categorías
    obtenerTodasLasCategorias() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({...this.categorias});
            }, 100);
        });
    }

    // Obtener categorías destacadas
    obtenerCategoriasDestacadas() {
        return new Promise((resolve) => {
            setTimeout(() => {
                const destacadas = Object.values(this.categorias).filter(cat => cat.destacada);
                resolve(destacadas);
            }, 150);
        });
    }

    // Obtener información de una categoría
    obtenerCategoriaPorId(categoriaId) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const categoria = this.categorias[categoriaId.toUpperCase()];
                if (categoria) {
                    resolve(categoria);
                } else {
                    reject(new Error(`Categoría ${categoriaId} no encontrada`));
                }
            }, 100);
        });
    }

    /* ===========================
       MÉTODOS - AUTORES
    =========================== */

    // Obtener todos los autores
    obtenerTodosLosAutores() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({...this.autores});
            }, 200);
        });
    }

    // Obtener autores destacados
    obtenerAutoresDestacados() {
        return new Promise((resolve) => {
            setTimeout(() => {
                const destacados = Object.values(this.autores).filter(autor => autor.destacado);
                resolve(destacados);
            }, 150);
        });
    }

    // Obtener autor por ID
    obtenerAutorPorId(autorId) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const autor = this.autores[autorId.toUpperCase()];
                if (autor) {
                    resolve(autor);
                } else {
                    reject(new Error(`Autor ${autorId} no encontrado`));
                }
            }, 100);
        });
    }

    // Obtener libros por autor
    obtenerLibrosPorAutor(autorNombre) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const librosAutor = this.libros.filter(libro =>
                    libro.autor.toLowerCase().includes(autorNombre.toLowerCase())
                );
                resolve(librosAutor);
            }, 250);
        });
    }

    // Obtener autores por categoría
    obtenerAutoresPorCategoria(categoria) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const librosCategoria = this.libros.filter(libro => libro.categoria === categoria);
                const autoresIds = [...new Set(librosCategoria.map(libro => libro.autorId).filter(Boolean))];
                const autores = autoresIds.map(autorId => this.autores[autorId]).filter(Boolean);
                resolve(autores);
            }, 200);
        });
    }

    /* ===========================
       MÉTODOS DE GESTIÓN
    =========================== */

    // Actualizar stock
    actualizarStock(idLibro, nuevaCantidad) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const libro = this.libros.find(l => l.id === idLibro);
                if (libro) {
                    const stockAnterior = libro.stock;
                    libro.stock = nuevaCantidad;
                    resolve({ 
                        success: true, 
                        libro: libro.titulo, 
                        stockAnterior,
                        stockNuevo: nuevaCantidad,
                        mensaje: `Stock actualizado de ${stockAnterior} a ${nuevaCantidad}`
                    });
                } else {
                    resolve({ 
                        success: false, 
                        error: "Libro no encontrado" 
                    });
                }
            }, 200);
        });
    }

    // Agregar nuevo libro
    agregarNuevoLibro(libroData) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const nuevoId = Math.max(...this.libros.map(l => l.id)) + 1;
                const nuevoLibro = {
                    id: nuevoId,
                    ...libroData,
                    fechaAgregado: new Date().toISOString(),
                    stock: libroData.stock || 10,
                    rating: libroData.rating || 4.0,
                    reseñas: libroData.reseñas || 0,
                    destacado: libroData.destacado || false
                };
                this.libros.push(nuevoLibro);
                resolve({ 
                    success: true, 
                    mensaje: "Libro agregado exitosamente",
                    libro: nuevoLibro 
                });
            }, 400);
        });
    }

    // Registrar venta
    registrarVenta(libroId, cantidad = 1) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const libro = this.libros.find(l => l.id === libroId);
                if (libro && libro.stock >= cantidad) {
                    libro.stock -= cantidad;
                    libro.reseñas += 1; // Simular aumento en popularidad
                    
                    // Guardar en historial de pedidos
                    this.guardarPedido({
                        id: Date.now(),
                        libroId: libro.id,
                        titulo: libro.titulo,
                        cantidad: cantidad,
                        precio: libro.precio,
                        fecha: new Date().toISOString(),
                        total: libro.precio * cantidad
                    });
                    
                    resolve({
                        success: true,
                        mensaje: `Venta registrada: ${cantidad} x ${libro.titulo}`,
                        stockRestante: libro.stock
                    });
                } else {
                    resolve({
                        success: false,
                        error: "Stock insuficiente o libro no encontrado"
                    });
                }
            }, 300);
        });
    }

    /* ===========================
       MÉTODOS DE PEDIDOS
    =========================== */
    cargarPedidosGuardados() {
        try {
            const pedidosGuardados = localStorage.getItem('leepBooks_pedidos');
            return pedidosGuardados ? JSON.parse(pedidosGuardados) : [];
        } catch (error) {
            console.error('Error cargando pedidos:', error);
            return [];
        }
    }

    guardarPedido(pedido) {
        this.pedidos.push(pedido);
        try {
            localStorage.setItem('leepBooks_pedidos', JSON.stringify(this.pedidos));
        } catch (error) {
            console.error('Error guardando pedido:', error);
        }
    }

    obtenerHistorialPedidos() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([...this.pedidos].reverse()); // Más recientes primero
            }, 200);
        });
    }

    /* ===========================
       MÉTODOS DE ESTADÍSTICAS
    =========================== */

    obtenerEstadisticasGenerales() {
        return new Promise((resolve) => {
            setTimeout(() => {
                const stats = {
                    totalLibros: this.libros.length,
                    totalCategorias: Object.keys(this.categorias).length,
                    totalAutores: new Set(this.libros.map(l => l.autor)).size,
                    librosEnOferta: this.libros.filter(l => l.descuento).length,
                    librosDestacados: this.libros.filter(l => l.destacado).length,
                    stockTotal: this.libros.reduce((sum, libro) => sum + libro.stock, 0),
                    precioPromedio: (this.libros.reduce((sum, libro) => sum + libro.precio, 0) / this.libros.length).toFixed(2),
                    ratingPromedio: (this.libros.reduce((sum, libro) => sum + libro.rating, 0) / this.libros.length).toFixed(1),
                    totalPedidos: this.pedidos.length,
                    ingresosTotales: this.pedidos.reduce((sum, pedido) => sum + pedido.total, 0).toFixed(2)
                };
                resolve(stats);
            }, 300);
        });
    }

    obtenerLibrosMasVendidos() {
        return new Promise((resolve) => {
            setTimeout(() => {
                const masVendidos = [...this.libros]
                    .sort((a, b) => b.reseñas - a.reseñas)
                    .slice(0, 5);
                resolve(masVendidos);
            }, 200);
        });
    }

    obtenerNovedades() {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Simular libros nuevos (los últimos 3 agregados)
                const novedades = this.libros.slice(-3).reverse();
                resolve(novedades);
            }, 150);
        });
    }

    obtenerEstadisticasCategorias() {
        return new Promise((resolve) => {
            setTimeout(() => {
                const statsCategorias = Object.keys(this.categorias).map(categoriaId => {
                    const librosCategoria = this.libros.filter(l => l.categoria === categoriaId);
                    return {
                        categoria: this.categorias[categoriaId].nombre,
                        totalLibros: librosCategoria.length,
                        stockTotal: librosCategoria.reduce((sum, libro) => sum + libro.stock, 0),
                        precioPromedio: (librosCategoria.reduce((sum, libro) => sum + libro.precio, 0) / librosCategoria.length || 0).toFixed(2),
                        ratingPromedio: (librosCategoria.reduce((sum, libro) => sum + libro.rating, 0) / librosCategoria.length || 0).toFixed(1)
                    };
                });
                resolve(statsCategorias);
            }, 250);
        });
    }

    /* ===========================
       MÉTODOS DE BÚSQUEDA AVANZADA
    =========================== */

    buscarAvanzado(filtros) {
        return new Promise((resolve) => {
            setTimeout(() => {
                let resultados = [...this.libros];

                // Aplicar filtros
                if (filtros.categoria) {
                    resultados = resultados.filter(libro => libro.categoria === filtros.categoria.toUpperCase());
                }

                if (filtros.precioMin) {
                    resultados = resultados.filter(libro => libro.precio >= parseFloat(filtros.precioMin