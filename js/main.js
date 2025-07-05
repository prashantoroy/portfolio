// Main Portfolio Application
class PortfolioApp {
    constructor() {
        this.currentPage = 'home';
        this.modules = {};
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initialize());
        } else {
            this.initialize();
        }
    }

    initialize() {
        // Initialize modules
        this.modules.carousel = new Carousel();
        this.modules.overlay = new OverlayManager();
        this.modules.lazyLoad = new LazyLoad();
        this.modules.navigation = new Navigation(this);

        // Initialize page-specific modules
        this.initializePages();

        // Setup global event listeners
        this.setupEventListeners();

        // Add loading animation
        this.animatePageLoad();

        // Initialize router
        this.initRouter();
    }

    initializePages() {
        // Initialize home page
        if (document.getElementById('home-page')) {
            this.modules.homePage = new HomePage();
        }
    }

    setupEventListeners() {
        // Navigation clicks
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => this.handleNavigation(e));
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.modules.overlay?.hideAll();
            }
        });

        // Handle back/forward browser buttons
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.page) {
                this.showPage(e.state.page, false);
            }
        });
    }

    handleNavigation(event) {
        const link = event.target;
        const page = link.dataset.page;

        if (page) {
            event.preventDefault();
            this.showPage(page);
        } else if (link.href.includes('#')) {
            event.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }

    showPage(page, updateHistory = true) {
        // Hide all pages
        document.querySelectorAll('[id$="-page"]').forEach(p => {
            p.classList.add('hidden');
        });

        // Show requested page
        const pageElement = document.getElementById(`${page}-page`);
        if (pageElement) {
            pageElement.classList.remove('hidden');
            this.currentPage = page;

            // Update browser history
            if (updateHistory) {
                const url = page === 'home' ? '/' : `/${page}`;
                window.history.pushState({ page }, '', url);
            }

            // Update active nav
            this.updateActiveNav(page);

            // Scroll to top
            window.scrollTo(0, 0);

            // Load page-specific content
            this.loadPageContent(page);
        }
    }

    updateActiveNav(page) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.toggle('active', link.dataset.page === page);
        });
    }

    loadPageContent(page) {
        switch(page) {
            case 'works':
                if (!this.modules.worksPage) {
                    this.modules.worksPage = new WorksPage();
                }
                this.modules.worksPage.load();
                break;
            case 'project':
                if (!this.modules.projectPage) {
                    this.modules.projectPage = new ProjectPage();
                }
                break;
        }
    }

    animatePageLoad() {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.6s ease';
            document.body.style.opacity = '1';
        }, 100);
    }

    initRouter() {
        // Handle initial route
        const path = window.location.pathname;
        if (path.includes('works')) {
            this.showPage('works', false);
        } else if (path.includes('project')) {
            this.showPage('project', false);
        }
    }
}

// Navigation Handler
class Navigation {
    constructor(app) {
        this.app = app;
        this.setupSmoothScroll();
    }

    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    const offset = 100; // Account for fixed header
                    const targetPosition = target.offsetTop - offset;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Performance monitoring
class PerformanceMonitor {
    static logMetrics() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                const perfData = window.performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log('Performance Metrics:', {
                    pageLoad: pageLoadTime + 'ms',
                    domReady: perfData.domContentLoadedEventEnd - perfData.navigationStart + 'ms',
                    resources: performance.getEntriesByType('resource').length
                });
            });
        }
    }
}

// Initialize app
const portfolioApp = new PortfolioApp();

// Export for global access if needed
window.PortfolioApp = portfolioApp;

// Log performance metrics in development
if (window.location.hostname === 'localhost') {
    PerformanceMonitor.logMetrics();
}
