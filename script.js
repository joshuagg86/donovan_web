// PANTALLA DE CARGA
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 500); // Pequeño delay para mejor transición
});

// FUNCIONALIDAD DE ANIMACIONES FADE IN
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

// FUNCIONALIDAD DEL BOTÓN VOLVER ARRIBA
const backToTopButton = document.getElementById('back-to-top');

// Mostrar/ocultar botón según scroll
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

// Hacer scroll hacia arriba al hacer clic
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// FUNCIONALIDAD DEL HAMBURGER MENU
document.addEventListener('DOMContentLoaded', function() {
    // Observar todas las secciones con fade-in
    const fadeInSections = document.querySelectorAll('.fade-in-section');
    fadeInSections.forEach(section => {
        fadeInObserver.observe(section);
    });

    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Cerrar menú al hacer clic en un enlace
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // FUNCIONALIDAD DEL CARRUSEL
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

    function showSlide(n) {
        // Remover clase active de todos los slides y dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Asegurar que n esté dentro del rango
        if (n >= slides.length) {
            currentSlide = 0;
        } else if (n < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = n;
        }

        // Activar el slide y dot actual
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    // Event listeners para los dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });

    // Auto-avanzar el carrusel cada 5 segundos
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);

    // FUNCIONALIDAD DEL ACORDEÓN FAQ
    const accordionQuestions = document.querySelectorAll('.accordion-question');

    accordionQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const accordionItem = question.parentElement;
            const isActive = accordionItem.classList.contains('active');

            // Cerrar todos los items
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
            });

            // Si el item no estaba activo, abrirlo
            if (!isActive) {
                accordionItem.classList.add('active');
            }
        });
    });
});
// FUNCIONALIDAD DE NAVEGACIÓN ACTIVA (INDICADOR SUBRAYADO)
const navOptions = {
    threshold: 0.6 // Se activa cuando el 60% de la sección es visible
};

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Obtenemos el ID de la sección visible
            const id = entry.target.getAttribute('id');
            
            // Removemos 'active' de todos los links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                // Si el href coincide con el ID, le ponemos la clase active
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, navOptions);

// Aplicar el observador a todas las secciones que tienen un ID y están en el menú
document.querySelectorAll('section[id]').forEach(section => {
    navObserver.observe(section);
});
