// Overlay Manager Component
class OverlayManager {
    constructor() {
        this.activeOverlay = null;
        this.overlays = new Map();
        this.container = null;
        this.init();
    }

    init() {
        this.setupContainer();
        this.loadOverlays();
        this.setupEventListeners();
    }

    setupContainer() {
        this.container = document.getElementById('overlays-container');
        if (!this.container) {
            // Create container if it doesn't exist
            this.container = document.createElement('div');
            this.container.id = 'overlays-container';
            document.body.appendChild(this.container);
        }
    }

    loadOverlays() {
        // Load overlays from configuration
        Object.entries(PORTFOLIO_DATA.overlays).forEach(([id, data]) => {
            this.createOverlay(id, data);
        });
    }

    createOverlay(id, data) {
        const overlayId = `${id}-overlay`;
        
        // Check if overlay already exists
        if (this.overlays.has(overlayId)) return;

        // Create overlay element
        const overlay = document.createElement('div');
        overlay.id = overlayId;
        overlay.className = 'balloon-overlay';
        overlay.innerHTML = `
            <button class="overlay-close" aria-label="Close overlay">&times;</button>
            <h3 class="text-heading-md mb-2">${data.title}</h3>
            <div class="overlay-content">${data.content}</div>
        `;

        // Add to container
        this.container.appendChild(overlay);
        
        // Store reference
        this.overlays.set(overlayId, {
            element: overlay,
            data: data
        });

        // Setup close button
        const closeBtn = overlay.querySelector('.overlay-close');
        closeBtn.addEventListener('click', () => this.hideOverlay());
    }

    setupEventListeners() {
        // Setup triggers
        document.addEventListener('DOMContentLoaded', () => {
            this.setupTriggers();
        });

        // Click outside to close
        document.addEventListener('click', (e) => {
            if (this.activeOverlay && 
                !e.target.closest('.balloon-overlay') && 
                !e.target.closest('.text-highlight')) {
                this.hideOverlay();
            }
        });

        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.activeOverlay) {
                this.hideOverlay();
            }
        });

        // Window resize
        window.addEventListener('resize', () => {
            if (this.activeOverlay) {
                this.positionOverlay(this.activeOverlay);
            }
        });
    }

    setupTriggers() {
        // Find all text highlights
        document.querySelectorAll('.text-highlight[data-overlay]').forEach(trigger => {
            const overlayId = trigger.dataset.overlay;
            
            // Hover events
            trigger.addEventListener('mouseenter', (e) => {
                this.showOverlay(overlayId, e.target, false);
            });

            trigger.addEventListener('mouseleave', () => {
                if (!this.isPinned) {
                    this.hideOverlay();
                }
            });

            // Click event
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.showOverlay(overlayId, e.target, true);
            });
        });
    }

    showOverlay(overlayId, trigger, isPinned = false) {
        const fullOverlayId = `${overlayId}-overlay`;
        const overlayData = this.overlays.get(fullOverlayId);
        
        if (!overlayData) return;

        // Hide any active overlay
        this.hideOverlay();

        // Set active overlay
        this.activeOverlay = overlayData.element;
        this.isPinned = isPinned;
        this.currentTrigger = trigger;

        // Show overlay
        this.activeOverlay.classList.add('active');

        // Position overlay
        if (!isPinned && window.innerWidth > 768) {
            this.positionOverlay(this.activeOverlay, trigger);
        } else {
            this.centerOverlay(this.activeOverlay);
        }

        // Load lazy images
        this.loadOverlayImages(this.activeOverlay);

        // Emit event
        this.emitEvent('overlayShow', { overlayId, trigger });
    }

    hideOverlay() {
        if (!this.activeOverlay) return;

        this.activeOverlay.classList.remove('active');
        
        // Emit event
        this.emitEvent('overlayHide', { 
            overlayId: this.activeOverlay.id 
        });

        this.activeOverlay = null;
        this.isPinned = false;
        this.currentTrigger = null;
    }

    hideAll() {
        this.overlays.forEach(({ element }) => {
            element.classList.remove('active');
        });
        this.activeOverlay = null;
        this.isPinned = false;
    }

    positionOverlay(overlay, trigger) {
        const rect = trigger.getBoundingClientRect();
        const overlayRect = overlay.getBoundingClientRect();
        
        let left = rect.left + rect.width / 2;
        let top = rect.bottom + 10;

        // Adjust if would go off screen
        if (left + overlayRect.width / 2 > window.innerWidth) {
            left = window.innerWidth - overlayRect.width / 2 - 20;
        }
        if (left - overlayRect.width / 2 < 0) {
            left = overlayRect.width / 2 + 20;
        }
        if (top + overlayRect.height > window.innerHeight) {
            top = rect.top - overlayRect.height - 10;
        }

        overlay.style.left = left + 'px';
        overlay.style.top = top + 'px';
        overlay.style.transform = 'translateX(-50%)';
    }

    centerOverlay(overlay) {
        overlay.style.left = '50%';
        overlay.style.top = '50%';
        overlay.style.transform = 'translate(-50%, -50%)';
    }

    loadOverlayImages(overlay) {
        const lazyImages = overlay.querySelectorAll('.lazy-image');
        lazyImages.forEach(container => {
            const img = container.querySelector('img');
            if (img && img.dataset.src && !img.src) {
                img.src = img.dataset.src;
                img.onload = () => {
                    container.classList.add('loaded');
                };
                img.onerror = () => {
                    console.error('Failed to load image:', img.dataset.src);
                };
            }
        });
    }

    emitEvent(eventName, data) {
        const event = new CustomEvent(`overlay:${eventName}`, { detail: data });
        document.dispatchEvent(event);
    }

    // Public methods
    show(overlayId, trigger) {
        this.showOverlay(overlayId, trigger, true);
    }

    hide() {
        this.hideOverlay();
    }

    toggle(overlayId, trigger) {
        if (this.activeOverlay && this.activeOverlay.id === `${overlayId}-overlay`) {
            this.hideOverlay();
        } else {
            this.showOverlay(overlayId, trigger, true);
        }
    }

    createDynamicOverlay(id, title, content) {
        const data = { title, content };
        this.createOverlay(id, data);
        return `${id}-overlay`;
    }

    destroy() {
        this.hideAll();
        this.overlays.clear();
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
}
