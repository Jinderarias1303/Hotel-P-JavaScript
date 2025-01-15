const carousel = document.getElementById('carousel');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const slides = carousel.children;
const totalSlides = slides.length;
let currentIndex = 0;
let interval;

function updateCarousel() {
    const offset = -currentIndex * 100; // Calcula el desplazamiento
    carousel.style.transform = `translateX(${offset}%)`;
}

function goToNextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides; // Avanza con bucle
    updateCarousel();
}

function goToPrevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides; // Retrocede con bucle
    updateCarousel();
}

function startAutoSlide() {
    interval = setInterval(goToNextSlide, 3000); // Cambia cada 3 segundos
}

function stopAutoSlide() {
    clearInterval(interval);
}

// Inicia el carrusel automático
startAutoSlide();

// // Botones manuales
// prev.addEventListener('click', () => {
//     stopAutoSlide();
//     goToPrevSlide();
//     startAutoSlide();
// });

// next.addEventListener('click', () => {
//     stopAutoSlide();
//     goToNextSlide();
//     startAutoSlide();
// });

// Pausar al pasar el ratón sobre el carrusel
carousel.parentElement.addEventListener('mouseenter', stopAutoSlide);
carousel.parentElement.addEventListener('mouseleave', startAutoSlide);