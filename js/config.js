// Portfolio Configuration and Data
const CONFIG = {
    // Site settings
    site: {
        name: 'Prashanto Roy Portfolio',
        description: 'Urban Designer and Architect',
        email: 'prashanto@example.com',
        linkedin: 'https://linkedin.com/in/prashanto-roy'
    },

    // Animation settings
    animations: {
        duration: 300,
        easing: 'ease',
        carousel: {
            autoPlay: true,
            interval: 5000
        }
    },

    // Image paths
    images: {
        logo: 'images/logo.png',
        placeholder: 'images/placeholder.jpg',
        projects: {
            sarojiniNagar: {
                thumbnail: 'images/projects/sarojini-nagar/thumbnail.jpg',
                satellite: 'images/projects/sarojini-nagar/satellite-view.jpg',
                sitePlan: 'images/projects/sarojini-nagar/site-plan.jpg',
                frame17: 'images/projects/sarojini-nagar/frame-17.jpg'
            }
        }
    },

    // Lazy loading settings
    lazyLoad: {
        rootMargin: '50px',
        threshold: 0.1
    }
};

// Portfolio Data
const PORTFOLIO_DATA = {
    // Carousel items
    carousel: [
        {
            title: 'Architecture',
            description: 'Sustainable design solutions for modern living'
        },
        {
            title: 'Design', 
            description: 'Innovative spatial experiences'
        },
        {
            title: 'Freehand',
            description: 'Artistic explorations and sketches'
        }
        // Remove the Urban Design slide
    ],

    // Overlay content
    overlays: {
        introduce: {
            title: 'About Prashanto Roy',
            content: `
                <p class="text-body-lg mb-2">
                    Urban Designer and Architect with expertise in sustainable development, 
                    specializing in large-scale redevelopment projects and community-centered design solutions.
                </p>
                <div class="text-body">
                    <h4 class="text-body-lg mb-1">Education</h4>
                    <ul>
                        <li>Master of Urban Design - School of Planning and Architecture, Delhi</li>
                        <li>Bachelor of Architecture - [Institution]</li>
                    </ul>
                    
                    <h4 class="text-body-lg mb-1 mt-2">Focus Areas</h4>
                    <ul>
                        <li>Sustainable Urban Development</li>
                        <li>Community-Centered Design</li>
                        <li>Public Space Revitalization</li>
                        <li>Housing and Mixed-Use Projects</li>
                    </ul>
                </div>
            `
        },
    },

    // Works categories
    works: {
        categories: [
            {
                id: 'architecture',
                title: 'Architecture',
                subcategories: ['Academic Projects', 'Professional Work', 'Competitions']
            },
            {
                id: 'urban-design',
                title: 'Urban Design',
                subcategories: ['Sarojini Nagar GPRA', 'Other Projects']
            },
            {
                id: 'design',
                title: 'Design',
                subcategories: ['Interior Projects', 'Product Design']
            },
            {
                id: 'freehand',
                title: 'Freehand',
                subcategories: ['Sketches', 'Conceptual Art']
            }
        ]
    },
};
