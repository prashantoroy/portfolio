// Works Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const worksSystem = {
        activeCategory: null,
        activeSubcategory: null,
        hoverTimeout: null,
        
        init() {
            this.setupCategoryInteractions();
            this.setupSubcategoryInteractions();
            this.setupProjectClicks();
            this.setupClickHandlers();
        },
        
        // Category hover/click shows subcategories or projects
        setupCategoryInteractions() {
            const categories = document.querySelectorAll('.category');
            
            categories.forEach(category => {
                // Hover interactions
                category.addEventListener('mouseenter', () => {
                    clearTimeout(this.hoverTimeout);
                    const categoryName = category.dataset.category;
                    
                    // Freehand shows projects directly, others show subcategories
                    if (categoryName === 'freehand') {
                        this.showFreehandProjects();
                    } else {
                        this.showCategoryOverlay(categoryName);
                    }
                });
                
                category.addEventListener('mouseleave', () => {
                    this.hoverTimeout = setTimeout(() => {
                        this.hideAllOverlays();
                    }, 300);
                });
                
                // Click for permanent selection
                category.addEventListener('click', () => {
                    // Update active state
                    document.querySelectorAll('.category').forEach(c => c.classList.remove('active'));
                    category.classList.add('active');
                    
                    // Show overlay on click too
                    const categoryName = category.dataset.category;
                    if (categoryName === 'freehand') {
                        this.showFreehandProjects();
                    } else {
                        this.showCategoryOverlay(categoryName);
                    }
                });
            });
            
            // Keep overlays open when hovering
            this.setupOverlayHovers('.category-overlay');
        },
        
        // Subcategory hover shows projects
        setupSubcategoryInteractions() {
            // Use event delegation for dynamically shown subcategories
            document.addEventListener('mouseenter', (e) => {
                if (e.target.classList.contains('subcategory')) {
                    clearTimeout(this.hoverTimeout);
                    this.showProjectOverlay(e.target.dataset.subcategory);
                }
            }, true);
            
            document.addEventListener('mouseleave', (e) => {
                if (e.target.classList.contains('subcategory')) {
                    this.hoverTimeout = setTimeout(() => {
                        this.hideProjectOverlay();
                    }, 300);
                }
            }, true);
            
            // Click on subcategory to keep it active
            document.addEventListener('click', (e) => {
                if (e.target.classList.contains('subcategory')) {
                    // Update active state
                    document.querySelectorAll('.subcategory').forEach(s => s.classList.remove('active'));
                    e.target.classList.add('active');
                    
                    // Show projects
                    this.showProjectOverlay(e.target.dataset.subcategory);
                }
            });
        },
        
        // Keep overlays open when hovering over them
        setupOverlayHovers(selector) {
            document.querySelectorAll(selector).forEach(overlay => {
                overlay.addEventListener('mouseenter', () => {
                    clearTimeout(this.hoverTimeout);
                });
                
                overlay.addEventListener('mouseleave', () => {
                    this.hoverTimeout = setTimeout(() => {
                        this.hideAllOverlays();
                    }, 300);
                });
            });
            
            // Also for project overlays
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
            document.addEventListener('click', (e) => {
                if (e.target.closest('.project-item')) {
                    const projectItem = e.target.closest('.project-item');
                    const project = projectItem.dataset.project;
                    // Navigate to project page
                    window.location.href = `projects/${project}.html`;
                }
            });
        },
        
        // Category click handlers for permanent selection
        setupClickHandlers() {
            // Already handled in setupCategoryInteractions
        },
        
        showCategoryOverlay(category) {
            // Hide all overlays first
            this.hideAllOverlays();
            
            // Show the category overlay with subcategories
            const overlay = document.getElementById(`${category}-overlay`);
            if (overlay) {
                overlay.classList.add('active');
                this.activeCategory = category;
            }
        },
        
        showFreehandProjects() {
            // Hide all overlays first
            this.hideAllOverlays();
            
            // Freehand shows projects directly in the same overlay style
            const overlay = document.getElementById('freehand-overlay');
            if (overlay) {
                overlay.classList.add('active');
                this.activeCategory = 'freehand';
            }
        },
        
        showProjectOverlay(subcategory) {
            // Hide other project overlays
            this.hideProjectOverlay();
            
            // Show the project overlay
            const overlay = document.getElementById(`${subcategory}-overlay`);
            if (overlay) {
                overlay.classList.add('active');
                this.activeSubcategory = subcategory;
            }
        },
        
        hideCategoryOverlay() {
            document.querySelectorAll('.category-overlay').forEach(overlay => {
                overlay.classList.remove('active');
            });
            this.activeCategory = null;
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
