// Works Page JavaScript - works.js

document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const categories = document.querySelectorAll('.category');
    const categoryOverlays = document.querySelectorAll('.category-overlay');
    const projectOverlays = document.querySelectorAll('.project-overlay');
    const subcategories = document.querySelectorAll('.subcategory');

    // Category click handlers
    categories.forEach(category => {
        category.addEventListener('click', function(e) {
            e.stopPropagation();
            const categoryName = this.dataset.category;
            
            // Close all overlays
            categoryOverlays.forEach(overlay => overlay.classList.remove('active'));
            projectOverlays.forEach(overlay => overlay.classList.remove('active'));
            
            // Open corresponding overlay
            const targetOverlay = document.getElementById(`${categoryName}-overlay`);
            if (targetOverlay) {
                targetOverlay.classList.add('active');
            }
            
            // Update active state
            categories.forEach(cat => cat.classList.remove('active'));
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

    // Close overlays when clicking outside
    document.addEventListener('click', function(e) {
        const isCategory = e.target.closest('.category');
        const isOverlay = e.target.closest('.category-overlay, .project-overlay');
        
        if (!isCategory && !isOverlay) {
            categoryOverlays.forEach(overlay => overlay.classList.remove('active'));
            projectOverlays.forEach(overlay => overlay.classList.remove('active'));
            categories.forEach(cat => cat.classList.remove('active'));
        }
    });

    // Project item click handlers
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(item => {
        item.addEventListener('click', function() {
            // Add your project detail view logic here
            console.log('Project clicked:', this.querySelector('p').textContent);
            // You can redirect to individual project pages or open a modal
        });
    });
});
