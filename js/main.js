// Works Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const worksSystem = {
        activeCategory: null,
        activeSubcategory: null,
        hoverTimeout: null,
        
        init() {
            this.setupCategoryHovers();
            this.setupSubcategoryHovers();
            this.setupProjectClicks();
            this.setupClickHandlers();
        },
        
        // Category hover shows subcategories
        setupCategoryHovers() {
            const categories = document.querySelectorAll('.category');
            
            categories.forEach(category => {
                category.addEventListener('mouseenter', () => {
                    clearTimeout(this.hoverTimeout);
                    this.showCategoryOverlay(category.dataset.category);
                });
                
                category.addEventListener('mouseleave', () => {
                    this.hoverTimeout = setTimeout(() => {
                        this.hideCategoryOverlay();
                    }, 300);
                });
            });
            
            // Keep overlay open when hovering over it
            document.querySelectorAll('.category-overlay').forEach(overlay => {
                overlay.addEventListener('mouseenter', () => {
                    clearTimeout(this.hoverTimeout);
                });
                
                overlay.addEventListener('mouseleave', () => {
                    this.hoverTimeout = setTimeout(() => {
                        this.hideCategoryOverlay();
                        this.hideProjectOverlay();
                    }, 300);
                });
            });
        },
        
        // Subcategory hover shows projects
        setupSubcategoryHovers() {
            document.querySelectorAll('.subcategory').forEach(subcategory => {
                subcategory.addEventListener('mouseenter', () => {
                    clearTimeout(this.hoverTimeout);
                    this.showProjectOverlay(subcategory.dataset.subcategory);
                });
                
                subcategory.addEventListener('mouseleave', () => {
                    this.hoverTimeout = setTimeout(() => {
                        this.hideProjectOverlay();
                    }, 300);
                });
            });
            
            // Keep project overlay open when hovering
            document.querySelectorAll('.project-overlay').forEach(overlay => {
                overlay.addEventListener('mouseenter', () => {
                    clearTimeout(this.hoverTimeout);
                });
                
                overlay.addEventListener('mouseleave', () => {
                    this.hoverTimeout = setTimeout(() => {
                        this.hideProjectOverlay();
                    }, 300);
                });
            });
        },
        
        // Project clicks navigate to project page
        setupProjectClicks() {
            document.querySelectorAll('.project-item').forEach(item => {
                item.addEventListener('click', () => {
                    const project = item.dataset.project;
                    // Navigate to project page
                    window.location.href = `projects/${project}.html`;
                });
            });
        },
        
        // Category clicks (permanent selection)
        setupClickHandlers() {
            document.querySelectorAll('.category').forEach(category => {
                category.addEventListener('click', () => {
                    // Update active state
                    document.querySelectorAll('.category').forEach(c => c.classList.remove('active'));
                    category.classList.add('active');
                    
                    // Update view
                    const categoryName = category.dataset.category;
                    document.querySelectorAll('.category-view').forEach(view => {
                        view.classList.remove('active');
                    });
                    document.getElementById(`${categoryName}-view`).classList.add('active');
                });
            });
        },
        
        showCategoryOverlay(category) {
            // Hide all overlays first
            this.hideAllOverlays();
            
            // Show the category overlay
            const overlay = document.getElementById(`${category}-overlay`);
            if (overlay) {
                overlay.classList.add('active');
                this.activeCategory = category;
            }
        },
        
        hideCategoryOverlay() {
            document.querySelectorAll('.category-overlay').forEach(overlay => {
                overlay.classList.remove('active');
            });
            this.activeCategory = null;
        },
        
        showProjectOverlay(subcategory) {
            // Hide project overlays
            this.hideProjectOverlay();
            
            // Show the project overlay
            const overlay = document.getElementById(`${subcategory}-overlay`);
            if (overlay) {
                overlay.classList.add('active');
                this.activeSubcategory = subcategory;
            }
        },
        
        hideProjectOverlay() {
            document.querySelectorAll('.project-overlay').forEach(overlay => {
                overlay.classList.remove('active');
            });
            this.activeSubcategory = null;
        },
        
        hideAllOverlays() {
            this.hideCategoryOverlay();
            this.hideProjectOverlay();
        }
    };
    
    // Initialize the system
    worksSystem.init();
});
