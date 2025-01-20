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
    interval = setInterval(goToNextSlide, 2000); // Cambia cada 2 segundos
}

function stopAutoSlide() {
    clearInterval(interval);
}

// Inicia el carrusel automático
startAutoSlide();

carousel.parentElement.addEventListener('mouseenter', stopAutoSlide);
carousel.parentElement.addEventListener('mouseleave', startAutoSlide);

