// Carousel Component
class Carousel {
    constructor() {
        this.currentSlide = 0;
        this.slides = [];
        this.dots = [];
        this.autoPlayInterval = null;
        this.init();
    }

    init() {
        this.setupCarousel();
        this.loadSlides();
        this.setupEventListeners();
        
        if (CONFIG.animations.carousel.autoPlay) {
            this.startAutoPlay();
        }
    }

    setupCarousel() {
        this.container = document.getElementById('works-carousel');
        if (!this.container) return;

        // Clear existing content
        this.container.innerHTML = '';
        
        // Get dots
        this.dots = document.querySelectorAll('.pagination-dots .dot');
    }

    loadSlides() {
        // Load slides from configuration
        PORTFOLIO_DATA.carousel.forEach((item, index) => {
            const slide = this.createSlide(item, index);
            this.container.appendChild(slide);
            this.slides.push(slide);
        });

        // Show first slide
        if (this.slides.length > 0) {
            this.showSlide(0);
        }
    }

    createSlide(data, index) {
        const div = document.createElement('div');
        div.className = 'carousel-item';
        div.innerHTML = `
            <h3 class="text-heading-md text-center mb-2">${data.title}</h3>
            <p class="text-body text-center">${data.description}</p>
        `;
        return div;
    }

    setupEventListeners() {
        // Dot navigation
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.stopAutoPlay();
                this.showSlide(index);
                this.startAutoPlay();
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.isCarouselVisible()) return;
            
            if (e.key === 'ArrowLeft') {
                this.stopAutoPlay();
                this.previousSlide();
                this.startAutoPlay();
            } else if (e.key === 'ArrowRight') {
                this.stopAutoPlay();
                this.nextSlide();
                this.startAutoPlay();
            }
        });

        // Pause on hover
        if (this.container) {
            this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
            this.container.addEventListener('mouseleave', () => this.startAutoPlay());
        }
    }

    showSlide(index) {
        // Validate index
        if (index < 0 || index >= this.slides.length) return;

        // Hide all slides
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.dots.forEach(dot => dot.classList.remove('active'));

        // Show selected slide
        this.slides[index].classList.add('active');
        if (this.dots[index]) {
            this.dots[index].classList.add('active');
        }

        this.currentSlide = index;

        // Emit event
        this.emitEvent('slideChange', { index });
    }

    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(nextIndex);
    }

    previousSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.showSlide(prevIndex);
    }

    startAutoPlay() {
        if (!CONFIG.animations.carousel.autoPlay) return;
        
        this.stopAutoPlay(); // Clear any existing interval
        
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, CONFIG.animations.carousel.interval);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    isCarouselVisible() {
        return this.container && this.container.offsetParent !== null;
    }

    emitEvent(eventName, data) {
        const event = new CustomEvent(eventName, { detail: data });
        document.dispatchEvent(event);
    }

    // Public methods
    pause() {
        this.stopAutoPlay();
    }

    play() {
        this.startAutoPlay();
    }

    goToSlide(index) {
        this.showSlide(index);
    }

    destroy() {
        this.stopAutoPlay();
        this.slides = [];
        this.dots = [];
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
}
