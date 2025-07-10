// Portfolio JavaScript - main.js

document.addEventListener('DOMContentLoaded', function() {
    // Handle responsive scaling
    function handleResponsiveScaling() {
        const container = document.querySelector('.container');
        const viewportWidth = window.innerWidth;
        
        // Show/hide mobile message
        const mobileMessage = document.querySelector('.mobile-message');
        if (viewportWidth < 768 && mobileMessage) {
            mobileMessage.style.display = 'block';
        } else if (mobileMessage) {
            mobileMessage.style.display = 'none';
        }
    }
    
    // Initial scaling
    handleResponsiveScaling();
    
    // Handle resize
    window.addEventListener('resize', handleResponsiveScaling);
    
    // Page elements
    const homePage = document.getElementById('home-page');
    const worksPage = document.getElementById('works-page');
    const navLinks = document.querySelectorAll('.nav-link');

    // Page navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.dataset.page) {
                e.preventDefault();
                
                // Update active states
                navLinks.forEach(nav => nav.classList.remove('active'));
                
                if (this.dataset.page === 'home') {
                    homePage.classList.add('active');
                    worksPage.classList.remove('active');
                    document.querySelector('.home-page .nav-link.about').classList.add('active');
                } else if (this.dataset.page === 'works') {
                    homePage.classList.remove('active');
                    worksPage.classList.add('active');
                    document.querySelector('.works-page .nav-link.works').classList.add('active');
                }
            }
        });
    });

    // Carousel functionality
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-item');
    const dots = document.querySelectorAll('.dot');
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        if (slides[index]) {
            slides[index].classList.add('active');
        }
        if (dots[index]) {
            dots[index].classList.add('active');
        }
    }

    // Auto advance carousel every 5 seconds
    if (slides.length > 0) {
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5000);
    }

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // Introduce overlay
    const highlight = document.querySelector('.highlight');
    const introduceOverlay = document.getElementById('introduce-overlay');
    const closeBtn = document.querySelector('.overlay-close');
    
    if (highlight) {
        highlight.addEventListener('click', () => {
            introduceOverlay.classList.add('active');
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            introduceOverlay.classList.remove('active');
        });
    }

    // Works page functionality
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
        if (worksPage.classList.contains('active')) {
            const isCategory = e.target.closest('.category');
            const isOverlay = e.target.closest('.category-overlay, .project-overlay');
            
            if (!isCategory && !isOverlay) {
                categoryOverlays.forEach(overlay => overlay.classList.remove('active'));
                projectOverlays.forEach(overlay => overlay.classList.remove('active'));
                categories.forEach(cat => cat.classList.remove('active'));
            }
        }
    });

    // Project item click handlers (you can expand this for individual project pages)
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(item => {
        item.addEventListener('click', function() {
            // Add your project detail view logic here
            console.log('Project clicked:', this.querySelector('p').textContent);
        });
    });

    // Smooth scroll for connect link
    const connectLinks = document.querySelectorAll('.nav-link.connect');
    connectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (!this.dataset.page) {
                e.preventDefault();
                // If on works page, go back to home first
                if (worksPage && worksPage.classList.contains('active')) {
                    homePage.classList.add('active');
                    worksPage.classList.remove('active');
                    // Update nav states
                    document.querySelector('.home-page .nav-link.about').classList.add('active');
                    document.querySelector('.works-page .nav-link.works').classList.remove('active');
                }
                // Then scroll to connect section
                setTimeout(() => {
                    const connectSection = document.getElementById('connect');
                    if (connectSection) {
                        connectSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 100);
            }
        });
    });
});
