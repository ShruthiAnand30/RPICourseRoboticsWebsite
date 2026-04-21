# Robotics Repository Website

A modern, responsive documentation website for RPI robotics kits built with pure HTML, CSS, and JavaScript.

## 🚀 Features

- **Modern UI Design**: Clean, professional interface with smooth animations
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Dynamic Search**: Real-time search across all documentation with filtering
- **Kit Documentation**: Detailed guides for 4 robotics kits (DOFBOT, ROSMASTER X3, Raspbot V2, Dogzilla)
- **Interactive Navigation**: Sidebar navigation with expandable sections
- **Hero Slideshow**: Automatic rotating background images
- **Scroll Effects**: Header hide/show and background fade on scroll
- **No Dependencies**: Pure HTML/CSS/JavaScript - no build tools required!

## 📁 Files Included

- `index.html` - Main HTML structure
- `styles.css` - All styling and animations
- `script.js` - Interactive functionality

## 🎨 Design Features

### Typography
- **Font Family**: Manrope (modern, clean sans-serif)
- **Monospace**: JetBrains Mono for code snippets

### Color Scheme
- **Primary**: Blue (#2563eb) - Professional and trustworthy
- **Background**: Light slate (#f8fafc)
- **Text**: Dark slate for excellent readability
- **Accent Colors**: Success (green), Warning (amber), Danger (red), Info (blue)

### Key UI Elements
1. **Sticky Header** - Hides on scroll down, shows on scroll up
2. **Hero Section** - Full-width with rotating background images
3. **Search Bar** - Instant search with filter options
4. **Kit Cards** - Hover effects with images and badges
5. **Documentation Sidebar** - Collapsible sections with active states
6. **Alert Components** - Color-coded for safety, warnings, info, and success
7. **Welcome Dialog** - First-time user guidance

## 🛠️ How to Use

### Option 1: Direct Usage
1. Simply open `index.html` in any modern web browser
2. No installation or setup required!

### Option 2: Local Development Server
For better performance (optional):

```bash
# Using Python 3
python3 -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit: `http://localhost:8000`

## 📝 Customization Guide

### Adding New Kits
Edit `script.js` and add to the `roboticsKits` array:

```javascript
{
    id: 'your-kit-id',
    name: 'Your Kit Name',
    description: 'Description here...',
    image: 'https://your-image-url.jpg',
    difficulty: 'Beginner', // or 'Intermediate', 'Advanced'
    tags: ['Tag1', 'Tag2', 'Tag3']
}
```

### Adding Documentation Sections
Edit the `documentationSections` object in `script.js`:

```javascript
'your-kit-id': [
    { id: 'section-id', title: 'Section Title' },
    { 
        id: 'parent-section', 
        title: 'Parent Section',
        subsections: [
            { id: 'sub-1', title: 'Subsection 1' },
            { id: 'sub-2', title: 'Subsection 2' }
        ]
    }
]
```

### Changing Colors
All colors are defined as CSS variables in `styles.css`:

```css
:root {
    --color-primary: #2563eb;        /* Change primary color */
    --color-background: #f8fafc;      /* Change background */
    --color-text-primary: #0f172a;    /* Change text color */
    /* ... more variables */
}
```

### Updating Hero Images
Change the background images in `index.html`:

```html
<div class="hero-slide active" style="background-image: url('YOUR-IMAGE-URL')"></div>
```

## 🎯 Features Breakdown

### Home Page
- Hero section with slideshow
- Search functionality with live results
- Filter by kit option
- Grid of available robotics kits
- Responsive card layout

### Kit Details Page
- Sidebar navigation with sections/subsections
- Mobile-friendly hamburger menu
- Welcome dialog on first visit
- Important safety notes
- Installation instructions
- Color-coded alerts

### Search System
- Real-time search across all documentation
- Filter results by specific kits
- Search through titles, content, and tags
- Visual breadcrumbs showing kit → section path

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Technical Details

### Performance
- Minimal DOM manipulation
- CSS-based animations (hardware accelerated)
- Lazy image loading support ready
- Optimized scroll handlers with requestAnimationFrame

### Accessibility
- Semantic HTML structure
- Keyboard navigation support
- ARIA labels where needed
- High contrast text
- Focus indicators

### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1023px
- Desktop: ≥ 1024px

## 💡 Tips for Development

1. **Adding Real Documentation**: Replace the placeholder content in `renderKitContent()` function with actual documentation
2. **GitHub Integration**: Update the "View on GitHub" buttons with actual repository links
3. **Images**: Replace Unsplash placeholder images with actual kit photos
4. **Analytics**: Add Google Analytics or similar by including the script in `index.html`
5. **SEO**: Add meta tags for better search engine optimization

## 📄 License

This template is free to use and modify for your robotics documentation needs.

## 🤝 Contributing

Feel free to customize and improve this template for your RPI robotics program!

---

**Built with ❤️ for RPI Robotics Students**
