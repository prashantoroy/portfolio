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
            title: 'Urban Design',
            description: 'Community-centered redevelopment projects'
        },
        {
            title: 'Design',
            description: 'Innovative spatial experiences'
        },
        {
            title: 'Freehand',
            description: 'Artistic explorations and sketches'
        }
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
        sarojini: {
            title: 'Sarojini Nagar',
            content: `
                <div class="lazy-image skeleton" style="height: 300px;">
                    <img src="" alt="Sarojini Nagar aerial view" data-src="${CONFIG.images.projects.sarojiniNagar.satellite}">
                </div>
                <p class="text-body mt-2">
                    A vibrant market and residential area in South West Delhi, known for:
                </p>
                <ul class="text-body">
                    <li>Popular clothing markets</li>
                    <li>Government housing colonies</li>
                    <li>246.167 acres of prime urban land</li>
                    <li>Strategic location near central Delhi</li>
                </ul>
            `
        },
        need: {
            title: 'Critical Needs Analysis',
            content: `
                <div class="text-body">
                    <h4 class="text-body-lg mb-1">1. Housing Crisis</h4>
                    <p>Delhi's population growth demands increased housing density while maintaining livability.</p>
                    
                    <h4 class="text-body-lg mb-1 mt-2">2. Infrastructure Aging</h4>
                    <p>60+ year old structures require urgent upgradation for safety and modern amenities.</p>
                    
                    <h4 class="text-body-lg mb-1 mt-2">3. Commercial Integration</h4>
                    <p>Preserving the vibrant market ecosystem while modernizing facilities.</p>
                    
                    <h4 class="text-body-lg mb-1 mt-2">4. Green Space Deficit</h4>
                    <p>Current layout lacks adequate public spaces and green areas for residents.</p>
                    
                    <h4 class="text-body-lg mb-1 mt-2">5. Traffic Management</h4>
                    <p>Pedestrian-vehicle conflicts need resolution through better planning.</p>
                </div>
            `
        },
        newdesign: {
            title: 'Design Approach',
            content: `
                <div class="text-body">
                    <h4 class="text-body-lg mb-1">Mixed-Use Development</h4>
                    <p>Integrating residential, commercial, and public spaces in vertical configurations.</p>
                    
                    <h4 class="text-body-lg mb-1 mt-2">Transit-Oriented Design</h4>
                    <p>Maximizing connectivity to metro stations and public transport networks.</p>
                    
                    <h4 class="text-body-lg mb-1 mt-2">Green Building Standards</h4>
                    <p>Following GRIHA guidelines for sustainable construction and operations.</p>
                    
                    <h4 class="text-body-lg mb-1 mt-2">Phased Implementation</h4>
                    <p>Ensuring minimal disruption to existing residents during construction.</p>
                </div>
            `
        },
        see: {
            title: 'SEE Impact Framework',
            content: `
                <div class="text-body">
                    <h4 class="text-body-lg mb-1">Society</h4>
                    <ul>
                        <li>Improved quality of life for 50,000+ residents</li>
                        <li>Community spaces for social interaction</li>
                        <li>Inclusive design for all age groups</li>
                    </ul>
                    
                    <h4 class="text-body-lg mb-1 mt-2">Economy</h4>
                    <ul>
                        <li>Preservation of market economy</li>
                        <li>Job creation during construction</li>
                        <li>Increased property values</li>
                    </ul>
                    
                    <h4 class="text-body-lg mb-1 mt-2">Environment</h4>
                    <ul>
                        <li>40% green cover target</li>
                        <li>Rainwater harvesting systems</li>
                        <li>Solar energy integration</li>
                        <li>Reduced carbon footprint</li>
                    </ul>
                </div>
            `
        }
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

    // Projects data
    projects: {
        sarojiniNagar: {
            id: 'sarojini-nagar',
            title: 'Sarojini Nagar Urban Design',
            subtitle: 'GPRA Redevelopment Project | Academic Thesis 2023',
            category: 'urban-design',
            sections: [
                {
                    id: 'brief',
                    title: 'Brief & Approach',
                    content: 'Full content here...'
                },
                {
                    id: 'analysis',
                    title: 'Site Analysis',
                    content: 'Analysis content...'
                },
                {
                    id: 'design',
                    title: 'Design Strategy',
                    content: 'Design content...'
                },
                {
                    id: 'impact',
                    title: 'Impact (SEE)',
                    content: 'Impact assessment...'
                }
            ]
        }
    }
};
