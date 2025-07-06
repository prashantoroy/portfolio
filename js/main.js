// Simple main.js for landing page
document.addEventListener('DOMContentLoaded', function() {
    // Carousel
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-item');
    const dots = document.querySelectorAll('.dot');
    
    // Auto advance every 5 seconds
    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }, 5000);
    
    // Introduce overlay
    const highlight = document.querySelector('.text-highlight');
    const overlay = document.getElementById('introduce-overlay');
    const closeBtn = document.querySelector('.overlay-close');
    
    if (highlight) {
        highlight.addEventListener('click', () => {
            overlay.classList.add('active');
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            overlay.classList.remove('active');
        });
    }
});
