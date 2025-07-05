// Lazy Loading Component
class LazyLoad {
    constructor() {
        this.loadedImages = new Set();
        this.imageObserver = null;
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            this.setupObserver();
            this.observeImages();
        } else {
            // Fallback for older browsers
            this.loadAllImages();
        }

        // Setup mutation observer for dynamically added content
        this.setupMutationObserver();
    }

    setupObserver() {
        const options = {
            root: null,
            rootMargin: CONFIG.lazyLoad.rootMargin || '50px',
            threshold: CONFIG.lazyLoad.threshold || 0.1
        };

        this.imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target);
                }
            });
        }, options);
    }

    observeImages() {
        // Find all lazy images
        const lazyImages = document.querySelectorAll('.lazy-image');
        lazyImages.forEach(container => {
            this.imageObserver.observe(container);
        });

        // Also observe images with data-src
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => {
            if (!img.closest('.lazy-image')) {
                this.imageObserver.observe(img);
            }
        });
    }

    loadImage(element) {
        let img;
        let container;

        // Determine if element is container or image
        if (element.classList.contains('lazy-image')) {
            container = element;
            img = container.querySelector('img');
        } else if (element.tagName === 'IMG') {
            img = element;
            container = img.closest('.lazy-image');
        }

        if (!img || !img.dataset.src) return;

        // Check if already loaded
        if (this.loadedImages.has(img.dataset.src)) {
            this.showImage(img, container);
            return;
        }

        // Create new image to preload
        const tempImg = new Image();
        
        tempImg.onload = () => {
            img.src = img.dataset.src;
            this.loadedImages.add(img.dataset.src);
            this.showImage(img, container);
            
            // Stop observing
            this.imageObserver.unobserve(element);
            
            // Emit event
            this.emitEvent('imageLoaded', { img, container });
        };

        tempImg.onerror = () => {
            console.error('Failed to load image:', img.dataset.src);
            
            // Add error class
            if (container) container.classList.add('error');
            
            // Stop observing
            this.imageObserver.unobserve(element);
            
            // Emit event
            this.emitEvent('imageError', { img, container });
        };

        // Start loading
        tempImg.src = img.dataset.src;
    }

    showImage(img, container) {
        if (container) {
            container.classList.add('loaded');
            container.classList.remove('skeleton');
        } else {
            img.classList.add('loaded');
        }
    }

    setupMutationObserver() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1) { // Element node
                        // Check if the node itself needs lazy loading
                        if (node.classList && node.classList.contains('lazy-image')) {
                            this.imageObserver.observe(node);
                        } else if (node.tagName === 'IMG' && node.dataset.src) {
                            this.imageObserver.observe(node);
                        }

                        // Check children
                        const lazyElements = node.querySelectorAll('.lazy-image, img[data-src]');
                        lazyElements.forEach(el => this.imageObserver.observe(el));
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    loadAllImages() {
        // Fallback for browsers without IntersectionObserver
        const images = document.querySelectorAll('.lazy-image img[data-src], img[data-src]');
        images.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
                const container = img.closest('.lazy-image');
                if (container) {
                    container.classList.add('loaded');
                }
            }
        });
    }

    emitEvent(eventName, data) {
        const event = new CustomEvent(`lazyload:${eventName}`, { detail: data });
        document.dispatchEvent(event);
    }

    // Public methods
    load(element) {
        if (typeof element === 'string') {
            element = document.querySelector(element);
        }
        if (element) {
            this.loadImage(element);
        }
    }

    refresh() {
        this.observeImages();
    }

    destroy() {
        if (this.imageObserver) {
            this.imageObserver.disconnect();
        }
        this.loadedImages.clear();
    }
}
