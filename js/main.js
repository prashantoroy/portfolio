// Landing Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Carousel
    const carousel = {
        currentSlide: 0,
        items: document.querySelectorAll('.carousel-item'),
        dots: document.querySelectorAll('.dot'),
        
        init() {
            // Dot clicks
            this.dots.forEach((dot, index) => {
                dot.addEventListener('click', () => this.showSlide(index));
            });
            
            // Auto-advance
            setInterval(() => this.nextSlide(), 5000);
        },
        
        showSlide(index) {
            this.items.forEach(item => item.classList.remove('active'));
            this.dots.forEach(dot => dot.classList.remove('active'));
            
            this.items[index].classList.add('active');
            this.dots[index].classList.add('active');
            this.currentSlide = index;
        },
        
        nextSlide() {
            const next = (this.currentSlide + 1) % this.items.length;
            this.showSlide(next);
        }
    };
    
    // Overlay System
    const overlays = {
        activeOverlay: null,
        
        init() {
            // Text highlight clicks
            document.querySelectorAll('.text-highlight[data-overlay]').forEach(trigger => {
                trigger.addEventListener('click', (e) => {
                    e.preventDefault();
                    const overlayId = trigger.dataset.overlay + '-overlay';
                    this.show(overlayId);
                });
            });
            
            // Close buttons
            document.querySelectorAll('.overlay-close').forEach(btn => {
                btn.addEventListener('click', () => this.hide());
            });
            
            // Click outside to close
            document.addEventListener('click', (e) => {
                if (this.activeOverlay && 
                    !e.target.closest('.overlay') && 
                    !e.target.closest('.text-highlight')) {
                    this.hide();
                }
            });
            
            // ESC key to close
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.activeOverlay) {
                    this.hide();
                }
            });
        },
        
        show(overlayId) {
            this.hide(); // Close any open overlay
            
            const overlay = document.getElementById(overlayId);
            if (overlay) {
                overlay.classList.add('active');
                this.activeOverlay = overlay;
            }
        },
        
        hide() {
            if (this.activeOverlay) {
                this.activeOverlay.classList.remove('active');
                this.activeOverlay = null;
            }
        }
    };
    
    // Initialize
    carousel.init();
    overlays.init();
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});
