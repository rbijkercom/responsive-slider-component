# Technology Stack

## Core Technologies

- **HTML5** - Semantic markup with ARIA attributes and data attribute system
- **CSS3** - Modern CSS with flexbox, scroll-snap, custom properties, and dynamic calculations
- **Vanilla JavaScript** - Component class with auto-initialization, drag interactions, and navigation controls

## Component Architecture

- **ResponsiveSlider Class** - Main component with auto-initialization system
- **Data Attribute API** - Configuration via HTML data attributes
- **CSS Custom Properties** - Dynamic responsive calculations
- **Event-driven Navigation** - Automatic button generation and keyboard support

## Build System

- **No build system required** - Direct file serving
- Static files can be served from any web server
- No compilation, bundling, or preprocessing needed
- Component auto-initializes on DOM ready

## Browser Support

- **Modern Browsers**: Full feature support (Chrome 69+, Firefox 68+, Safari 11+, Edge 79+)
- **Older Browsers**: Graceful degradation with basic scrolling

## Key CSS Features Used

- `scroll-snap-type` and `scroll-snap-align` for smooth navigation
- Flexbox with `calc()` for dynamic responsive layouts
- CSS custom properties for runtime configuration
- Media queries with custom property updates for responsive breakpoints
- Dynamic slide width calculations based on slides-per-view settings

## JavaScript Features

- **Auto-initialization** via `DOMContentLoaded` event
- **Data source detection** and content extraction
- **Dynamic ARIA generation** for accessibility
- **Navigation control creation** and event binding
- **Drag interaction enhancement** with scroll snap restoration
- **Responsive configuration** updates via CSS custom properties

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
- `slider-style.css` - Slider-specific functionality with data attribute selectors
- `slider.js` - ResponsiveSlider class with auto-initialization
- Load order: base-style.css → slider-style.css → slider.js

## Data Attribute System

- `rb-slider` - Auto-initialization trigger
- `rb-slider-element` - Component element identification
- `rb-slider-instance` - Data source linking
- `rb-slides-per-view-*` - Responsive configuration
- `rb-slider-gap` - Spacing configuration
