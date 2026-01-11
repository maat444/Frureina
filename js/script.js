// Actualizar automáticamente el año del copyright
document.getElementById('current-year').textContent = new Date().getFullYear();

// Navegación suave para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });

            // Cerrar menú móvil si está abierto
            const navbarCollapse = document.getElementById('navbarNav');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        }
    });
});

// Cambiar estilo de navbar al hacer scroll
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.padding = '10px 0';
        navbar.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
    } else {
        navbar.style.padding = '15px 0';
        navbar.style.boxShadow = 'none';
    }
});

// ... código anterior ...

// Función para pre-cargar imágenes importantes
function preloadImages() {
    const imagesToPreload = [
        'images/frurein.webp',
        'images/limón logo.webp',
        'images/favicon.ico'
    ];

    imagesToPreload.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    console.log('Imágenes pre-cargadas para mejor rendimiento');
}

function checkImagesLoaded() {
    const importantImages = document.querySelectorAll('img[src*="images/"]');

    importantImages.forEach(img => {
        img.onerror = function () {
            console.error(`Error al cargar la imagen: ${this.src}`);
            // Reemplazar con una imagen de respaldo si es necesario
            if (this.src.includes('frurein.png')) {
                this.style.display = 'none';
                // Mostrar un color de fondo alternativo
                document.querySelector('.hero-section').style.background = 'var(--verde-medio)';
            }
        };

        img.onload = function () {
            console.log(`Imagen cargada correctamente: ${this.src}`);
        };
    });
}

// Llamar a las funciones cuando la página cargue
window.addEventListener('DOMContentLoaded', function () {
    preloadImages();
    checkImagesLoaded();
});

// Simulación: Agregar al carrito (DESACTIVADA - Comentada)
// Función original reemplazada por funcionalidad de modal
/* 
document.querySelectorAll('.btn-outline-frureina').forEach(button => {
    button.addEventListener('click', function () {
        const originalText = this.textContent;
        const productName = this.closest('.card-body').querySelector('.card-title').textContent;

        this.textContent = '¡Agregado!';
        this.classList.remove('btn-outline-frureina');
        this.classList.add('btn-frureina');

        // Mostrar notificación
        showNotification(`¡${productName} agregado al carrito!`);

        setTimeout(() => {
            this.textContent = originalText;
            this.classList.remove('btn-frureina');
            this.classList.add('btn-outline-frureina');
        }, 2000);
    });
});
*/

// ============= NUEVA FUNCIONALIDAD: MODAL DE LISTADO DE PRODUCTOS =============

// Definición de productos por categoría
const productosPorCategoria = {
    'Verduras': [
        'Ahuyama',
        'Tomate Milano',
        'Pimentón',
        'Mazorca Arriero',
        'Mazorca Desgranada',
        'Fríjol Desgranado',
        'Arveja Desgranada',
        'Tomate Chonto',
        'Tomate Larga Vida',
        'Arveja Cáscara',
        'Habichuela',
        'Pepino Guiso',
        'Cohombro',
        'Zanahoria',
        'Remolacha',
        'Fríjol Cáscara',
        'Haba',
        'Papa Criolla',
        'Arracacha',
        'Yuca',
        'Papa Sabanera',
        'Papa Pastusa',
        'Cubios',
        'Chuguas',
        'Cebolla Roja',
        'Cebolla Blanca',
        'Cebolla Blanca',
        'Cebolla Larga',
        'Repollo Rojo',
        'Repollo Blanco',
        'Ajo Nacional',
        'Guatila',
        'Calabaza',
        'Calabacín',
        'Zapallo',
        'Plátano Colicero',
        'Plátano Maduro',
        'Plátano Verde',
        'Berenjena',
        'Zukini Amarillo',
        'Zukini Verde'
    ],
    'Frutas': [
        'Arándanos',
        'Papayuela',
        'Cocos',
        'Mango Tomi',
        'Manzanas en Agua',
        'Pera Nacional',
        'Banano Urabá',
        'Banano Criolla',
        'Naranja Valencia',
        'Naranja Tangelo',
        'Limón Tahili',
        'Papaya Maradol',
        'Maracuyá',
        'Melón',
        'Granadilla',
        'Manzana Roja',
        'Manzana Verde',
        'Manzana Royal',
        'Manzana Golden',
        'Bandeja Manzana Gale',
        'Bandeja Manzana Verde',
        'Bandeja Manzana Mixta',
        'Uva Roja',
        'Uva Verde',
        'Uva Chilena',
        'Uva Isabella',
        'Ciruela Chilena',
        'Kiwi',
        'Pera Chilena',
        'Durazno Chileno',
        'Cereza',
        'Pitaya',
        'Borojó',
        'Higo',
        'Tomate Árbol Común',
        'Curuba',
        'Mango Azúcar',
        'Mango Común',
        'Mango Yolima',
        'Feijóa',
        'Ciruela Nacional',
        'Yacón',
        'Mangostino',
        'Pitalla Común',
        'Uchuba',
        'Mandarina',
        'Ciruela Bandeja',
        'Mamoncillo'
    ],
    'Hortalizas': [
        'Acelgas',
        'Apio',
        'Brócoli',
        'Cilantro',
        'Coliflor',
        'Espinaca',
        'Espárragos',
        'Cebollín',
        'Guizantes',
        'Habichuela',  
        'Lechuga Crespa',
        'Ñame',
        'Batata',
        'Guasca',
        'Perejil Liso',
        'Perejil Crespo',
        'Rábano',
        'Tallos',
        'Tomillo-Laurel',
        'Aromática',
        'Caléndula',
        'Alcachofa',
        'Cebolla Puerro',
        'Nabo',
        'Jengibre',
        'Agraz',
        'Semilla Chía',
        'Quinúa',
        'Sábila'
    ],
    'Otros Productos': [
        'Aguacate Hass',
        'Cebolla Cabezona',
        'Ciruela Nacional',
        'Curuba',
        'Durazno Nacional',
        'Feijóa',
        'Fresa',
        'Guayaba',
        'Granadilla',
        'Gulupa',
        'Lulo',
        'Mandarina',
        'Mango',
        'Manzana Agua',
        'Manzana Roja',
        'Manzana Royal',
        'Manzana Verde',
        'Manzana Agua',
        'Manzana Roja',
        'Manzana Royal',
        'Manzana Verde',
        'Maracuyá',
        'Papa Criolla',
        'Papa Pastusa',
        'Papa Sabanera',
        'Papa Hawaiana',
        'Pepino Cohombro',
        'Pera Chilena',
        'Pera Nacional',
        'Plátano Maduro',
        'Plátano Verde',
        'Remolacha',
        'Tomate Árbol Rojo',
        'Tomate Común',
        'Tomate Pollo',
        'Tomate Guiso',
        'Yuca',
        'Zanahoria',
        'Pimentón',
        'Zapallo',
        'Limón',
        'Pitaya',
        'Arracacha',
        'Raíz China',
        'Picados',
        'Ensaladas',
        'Laso',
        'Ensaladas',
        'Laso'
    ]
};

// Obtener el índice de la categoría basado en la posición de la card
function obtenerIndiceCard(button) {
    const cards = document.querySelectorAll('.card-producto');
    const buttonCard = button.closest('.card-producto');
    
    for (let i = 0; i < cards.length; i++) {
        if (cards[i] === buttonCard) {
            return i;
        }
    }
    return 0;
}

// Mapa de categorías por posición de card
const categoriasCards = ['Verduras', 'Frutas', 'Hortalizas', 'Otros Productos'];

// Función para abrir el modal con los productos correspondientes
function abrirModalProductos(button) {
    const indiceCard = obtenerIndiceCard(button);
    const categoria = categoriasCards[indiceCard] || 'Verduras';
    
    const productos = productosPorCategoria[categoria] || [];
    
    // Actualizar el título del modal
    const modalTitle = document.getElementById('productListModalLabel');
    const modalHeader = document.getElementById('modalHeader');
    
    modalTitle.textContent = categoria;
    
    // Cambiar color del header según categoría
    const coloresCategoria = {
        'Verduras': 'var(--verde-medio)',
        'Frutas': 'var(--verde-claro)',
        'Hortalizas': 'var(--texto-oscuro)',
        'Otros Productos': 'var(--verde-oscuro)'
    };
    
    modalHeader.style.backgroundColor = coloresCategoria[categoria] || 'var(--verde-medio)';
    
    // Llenar la lista de productos
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    
    productos.forEach(producto => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.textContent = '✓ ' + producto;
        productList.appendChild(li);
    });
    
    // Mostrar el modal y manejar el focus correctamente
    const modalElement = document.getElementById('productListModal');
    const modal = new bootstrap.Modal(modalElement);
    
    // Guardar el botón que abrió el modal para devolver el focus después
    modalElement.setAttribute('data-focus-button', button);
    
    // Devolver el focus al botón cuando se cierre el modal
    modalElement.addEventListener('hidden.bs.modal', function handleModalHidden() {
        const focusButton = this.getAttribute('data-focus-button');
        if (focusButton) {
            button.focus();
        }
        // Remover el listener para evitar duplicados
        modalElement.removeEventListener('hidden.bs.modal', handleModalHidden);
    }, { once: true });
    
    modal.show();
}

// Agregar evento click a todos los botones "Ver Listado"
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.btn-outline-frureina').forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            abrirModalProductos(this);
        });
    });
});

// ============= FIN NUEVA FUNCIONALIDAD =============

// Función para mostrar notificaciones
function showNotification(message) {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = 'notification alert alert-success';
    notification.textContent = message;

    // Estilos para la notificación
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.zIndex = '9999';
    notification.style.padding = '15px 20px';
    notification.style.borderRadius = '8px';
    notification.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    notification.style.animation = 'slideIn 0.3s ease';

    // Agregar al documento
    document.body.appendChild(notification);

    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Estilos CSS para animaciones de notificación
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Manejo del formulario de newsletter (Protegido: solo si existe)
const newsletterButton = document.querySelector('.btn-frureina[type="button"]');
if (newsletterButton) {
    newsletterButton.addEventListener('click', function () {
        const emailInput = document.querySelector('input[type="email"]');
        if (emailInput) {
            const email = emailInput.value.trim();
            if (email && validateEmail(email)) {
                // Simular envío del formulario
                emailInput.value = '';
                showNotification('¡Gracias por suscribirte a nuestro newsletter!');
            } else {
                showNotification('Por favor, introduce un correo electrónico válido.', 'error');
            }
        }
    });
}

// Validar email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Añadir clase active al elemento de navegación actual
function setActiveNavItem() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    let currentSectionId = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSectionId = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('active');
        }
    });
}

// Ejecutar al cargar y al hacer scroll
window.addEventListener('scroll', setActiveNavItem);
window.addEventListener('load', setActiveNavItem);

// ============= EFECTO AUTOMÁTICO HERO PARA DISPOSITIVOS TÁCTILES =============

// Detectar si es un dispositivo táctil
function isTouchDevice() {
    return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
}

// Activar efecto automático en hero image para dispositivos táctiles
function initHeroImageAutoEffect() {
    // Solo aplicar en dispositivos táctiles (móviles/tablets)
    if (!isTouchDevice()) {
        return; // En desktop se mantiene el hover normal
    }

    const heroImageContainer = document.querySelector('.hero-image-container');
    
    if (!heroImageContainer) {
        return;
    }

    // Configurar Intersection Observer para detectar cuando la imagen está visible
    const observerOptions = {
        root: null, // Viewport como root
        rootMargin: '0px',
        threshold: 0.3 // Activar cuando el 30% de la imagen está visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // La imagen está visible, agregar clase para activar el efecto
                entry.target.classList.add('is-visible');
            } else {
                // La imagen sale del viewport, remover el efecto
                entry.target.classList.remove('is-visible');
            }
        });
    }, observerOptions);

    // Observar el contenedor de la imagen
    observer.observe(heroImageContainer);
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initHeroImageAutoEffect();
});