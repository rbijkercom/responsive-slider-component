# Technology Stack

## Core Technologies

- **HTML5** - Semantic markup with ARIA attributes
- **CSS3** - Modern CSS with flexbox, scroll-snap, and custom properties
- **Vanilla JavaScript** - Minimal enhancement for drag interactions only

## Build System

- **No build system required** - Direct file serving
- Static files can be served from any web server
- No compilation, bundling, or preprocessing needed

## Browser Support

- **Modern Browsers**: Full feature support (Chrome 69+, Firefox 68+, Safari 11+, Edge 79+)
- **Older Browsers**: Graceful degradation with basic scrolling

## Key CSS Features Used

- `scroll-snap-type` and `scroll-snap-align` for smooth navigation
- Flexbox with `calc()` for responsive 3-slide layout
- CSS custom properties for theming
- Media queries for responsive breakpoints

## Development Commands

Since this is a static project, no build commands are needed:

```bash
# Serve locally (any static server)
python -m http.server 8000
# or
npx serve .
# or
php -S localhost:8000
```

## File Dependencies

- `base-style.css` - Core styling and accessibility
- `slider-style.css` - Slider-specific functionality
- `slider.js` - Optional drag enhancement
- Load order: base-style.css → slider-style.css → slider.js
