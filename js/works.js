// Works Page JavaScript - works.js

document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const categories = document.querySelectorAll('.component, .architecture-wrapper, .div-wrapper');
    const categoryOverlays = document.querySelectorAll('.category-overlay');
    const projectOverlays = document.querySelectorAll('.project-overlay');
    const subcategories = document.querySelectorAll('.subcategory');
    
    // Handle responsive scaling
    function handleResponsiveScaling() {
        const container = document.querySelector('.element-works .div');
        const viewportWidth = window.innerWidth;
        
        if (container && viewportWidth <= 1728) {
            const scale = getComputedStyle(container).transform;
            if (scale && scale !== 'none') {
                const scaleValue = parseFloat(scale.split('(')[1].split(',')[0]);
                container.style.minHeight = `${1117 * scaleValue}px`;
            }
        }
    }
    
    // Initial scaling
    handleResponsiveScaling();
    
    // Handle resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(handleResponsiveScaling, 250);
    });
    
    // Map category elements to their names
    const categoryMap = {
        'component': 'architecture',
        'architecture-wrapper': 'design',
        'div-wrapper': 'freehand'
    };
    
    // Category click handlers
    categories.forEach(category => {
        category.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Get category name from class
            let categoryName = '';
            for (const [className, name] of Object.entries(categoryMap)) {
                if (this.classList.contains(className)) {
                    categoryName = name;
                    break;
                }
            }
            
            // Close all overlays
            categoryOverlays.forEach(overlay => overlay.classList.remove('active'));
            projectOverlays.forEach(overlay => overlay.classList.remove('active'));
            
            // Open corresponding overlay
            const targetOverlay = document.getElementById(`${categoryName}-overlay`);
            if (targetOverlay) {
                targetOverlay.classList.add('active');
            }
            
            // Update active state
            categories.forEach(cat => {
                cat.classList.remove('active');
                const textWrapper = cat.querySelector('.text-wrapper');
                if (textWrapper) {
                    textWrapper.style.color = '#000000';
                }
            });
            
            const textWrapper = this.querySelector('.text-wrapper');
            if (textWrapper) {
                textWrapper.style.color = '#ff2e2e';
            }
            this.classList.add('active');
        });
    });
    
    // Subcategory click handlers
    subcategories.forEach(subcategory => {
        subcategory.addEventListener('click', function(e) {
            e.stopPropagation();
            const subcategoryName = this.dataset.subcategory;
            
            // Close category overlays and open project overlay
            categoryOverlays.forEach(overlay => overlay.classList.remove('active'));
            
            const targetOverlay = document.getElementById(`${subcategoryName}-overlay`);
            if (targetOverlay) {
                targetOverlay.classList.add('active');
            }
        });
    });
    
    // Freehand text items click handlers
    const freehandItems = document.querySelectorAll('.project-item-text');
    freehandItems.forEach(item => {
        item.addEventListener('click', function() {
            console.log('Freehand project:', this.textContent);
            // Add your freehand project detail view logic here
            // For example, you could show a modal with project details
            alert(`Viewing: ${this.textContent}`);
        });
    });
    
    // Close overlays when clicking outside
    document.addEventListener('click', function(e) {
        const isCategory = e.target.closest('.component, .architecture-wrapper, .div-wrapper');
        const isOverlay = e.target.closest('.category-overlay, .project-overlay');
        
        if (!isCategory && !isOverlay) {
            categoryOverlays.forEach(overlay => overlay.classList.remove('active'));
            projectOverlays.forEach(overlay => overlay.classList.remove('active'));
            categories.forEach(cat => {
                cat.classList.remove('active');
                const textWrapper = cat.querySelector('.text-wrapper');
                if (textWrapper) {
                    textWrapper.style.color = '#000000';
                }
            });
        }
    });
    
    // Project item click handlers
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(item => {
        item.addEventListener('click', function() {
            const projectName = this.querySelector('p').textContent;
            console.log('Project clicked:', projectName);
            // Add project detail view logic here
        });
    });
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });
});
