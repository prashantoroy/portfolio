// Works Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    let activeCategory = null;
    let activeSubcategory = null;
    let hoverTimeout = null;

    // Get all categories
    const categories = document.querySelectorAll('.category');
    
    // Category hover/click
    categories.forEach(category => {
        // Hover to show overlay
        category.addEventListener('mouseenter', function() {
            clearTimeout(hoverTimeout);
            const categoryName = this.dataset.category;
            hideAllOverlays();
            
            // Show the appropriate overlay
            const overlay = document.getElementById(categoryName + '-overlay');
            if (overlay) {
                overlay.classList.add('active');
                activeCategory = categoryName;
            }
        });

        // Leave category
        category.addEventListener('mouseleave', function() {
            hoverTimeout = setTimeout(() => {
                hideAllOverlays();
            }, 300);
        });

        // Click to make permanent
        category.addEventListener('click', function() {
            // Remove active from all
            categories.forEach(c => c.classList.remove('active'));
            // Add active to clicked
            this.classList.add('active');
        });
    });

    // Keep overlay open when hovering on it
    const overlays = document.querySelectorAll('.category-overlay, .project-overlay');
    overlays.forEach(overlay => {
        overlay.addEventListener('mouseenter', function() {
            clearTimeout(hoverTimeout);
        });

        overlay.addEventListener('mouseleave', function() {
            hoverTimeout = setTimeout(() => {
                hideAllOverlays();
            }, 300);
        });
    });

    // Subcategory hover
    document.addEventListener('mouseenter', function(e) {
        if (e.target.classList.contains('subcategory')) {
            clearTimeout(hoverTimeout);
            const subcategory = e.target.dataset.subcategory;
            
            // Hide other project overlays
            document.querySelectorAll('.project-overlay').forEach(p => {
                p.classList.remove('active');
            });
            
            // Show the project overlay
            const projectOverlay = document.getElementById(subcategory + '-overlay');
            if (projectOverlay) {
                projectOverlay.classList.add('active');
                activeSubcategory = subcategory;
            }
        }
    }, true);

    document.addEventListener('mouseleave', function(e) {
        if (e.target.classList.contains('subcategory')) {
            hoverTimeout = setTimeout(() => {
                document.querySelectorAll('.project-overlay').forEach(p => {
                    p.classList.remove('active');
                });
            }, 300);
        }
    }, true);

    // Project click
    document.addEventListener('click', function(e) {
        if (e.target.closest('.project-item')) {
            console.log('Project clicked');
            // Navigate to project page
            // window.location.href = 'project-page.html';
        }
    });

    // Hide all overlays function
    function hideAllOverlays() {
        document.querySelectorAll('.category-overlay, .project-overlay').forEach(overlay => {
            overlay.classList.remove('active');
        });
        activeCategory = null;
        activeSubcategory = null;
    }
});
