# # Prashanto Roy Portfolio

A modern, responsive portfolio website for Prashanto Roy, Urban Designer and Architect, featuring advanced interactive elements and modular architecture.

## Features

- **Responsive Design**: Optimized for all devices (mobile, tablet, desktop)
- **Advanced Interactions**: Balloon overlays, lazy loading, smooth animations
- **Modular Architecture**: Separated HTML, CSS, and JavaScript for easy maintenance
- **Performance Optimized**: Lazy loading images, hardware-accelerated animations
- **Accessible**: Semantic HTML, keyboard navigation, ARIA labels

## Project Structure

```
portfolio/
├── index.html
├── README.md
├── .gitignore
│
├── css/
│   ├── variables.css      # CSS custom properties
│   ├── base.css           # Reset and base styles
│   ├── layout.css         # Grid and layout systems
│   ├── components.css     # Reusable components
│   ├── pages.css          # Page-specific styles
│   ├── utilities.css      # Utility classes
│   └── responsive.css     # Media queries
│
├── js/
│   ├── config.js          # Configuration and data
│   ├── utils.js           # Utility functions
│   ├── main.js            # Main app controller
│   │
│   ├── components/        # Reusable components
│   │   ├── carousel.js
│   │   ├── overlay.js
│   │   ├── lazyload.js
│   │   └── sitePlan.js
│   │
│   └── pages/             # Page-specific scripts
│       ├── home.js
│       ├── works.js
│       └── project.js
│
├── images/
│   ├── logo.png
│   ├── placeholder.jpg
│   │
│   ├── profile/
│   │   └── prashanto-photo.jpg
│   │
│   ├── projects/
│   │   ├── sarojini-nagar/
│   │   │   ├── thumbnail.jpg
│   │   │   ├── satellite-view.jpg
│   │   │   ├── site-plan.jpg
│   │   │   ├── frame-17.jpg
│   │   │   └── details/
│   │   │       ├── boundary-1.jpg
│   │   │       └── boundary-2.jpg
│

## Setup Instructions

1. **Clone or download the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Add your images**
   - Replace placeholder images in the `images/` directory
   - Optimize images before uploading (use WebP format when possible)
   - Follow the folder structure for organization

3. **Update content**
   - Edit `js/config.js` to update site information
   - Modify portfolio data in `PORTFOLIO_DATA` object
   - Update contact information

4. **Customize styling**
   - Edit CSS variables in `css/variables.css` for colors, spacing, etc.
   - Add custom styles to appropriate CSS files

## Development

### Adding a New Project

1. Add project images to `images/projects/[category]/[project-name]/`
2. Update `PORTFOLIO_DATA.projects` in `config.js`
3. The system will automatically generate the project page

### Creating New Components

1. Create component JavaScript in `js/components/`
2. Add component styles to `css/components.css`
3. Import and initialize in `main.js`

### Modifying Styles

- **Global changes**: Edit variables in `variables.css`
- **Layout changes**: Modify `layout.css`
- **Component styles**: Update `components.css`
- **Responsive adjustments**: Edit `responsive.css`

## Deployment

### GitHub Pages

1. Push your code to GitHub
2. Go to Settings → Pages
3. Select source branch (main)
4. Your site will be available at: `https://[username].github.io/portfolio`

### Custom Domain

1. Add a `CNAME` file with your domain
2. Configure DNS settings with your domain provider
3. Enable HTTPS in GitHub Pages settings

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Performance Tips

1. **Image Optimization**
   - Use WebP format for better compression
   - Resize images to appropriate dimensions
   - Use lazy loading for all images

2. **Code Optimization**
   - Minify CSS and JavaScript for production
   - Enable gzip compression on server
   - Use CDN for static assets if needed

## Customization Guide

### Colors
Edit `css/variables.css`:
```css
:root {
    --primary-black: #000000;
    --accent-red: #FF0000;
    /* Add your colors */
}
```

### Typography
Modify font settings in `variables.css`:
```css
:root {
    --font-primary: 'EB Garamond', serif;
    --font-size-xl: 3.125rem;
    /* Adjust sizes */
}
```

### Layout
Adjust grid and spacing in `variables.css`:
```css
:root {
    --container-max-width: 1728px;
    --grid-gap: 4rem;
    /* Modify layout values */
}
```

## Troubleshooting

### Images not loading
- Check file paths in HTML/JavaScript
- Ensure images are in correct directories
- Verify image file names match references

### Overlays not working
- Check browser console for errors
- Ensure JavaScript files are loaded in correct order
- Verify overlay IDs match trigger data attributes

### Responsive issues
- Test on actual devices, not just browser DevTools
- Check media queries in `responsive.css`
- Ensure viewport meta tag is present

## License

This project is licensed under the MIT License.

## Contact

For questions or support, contact: prashanto@example.com
