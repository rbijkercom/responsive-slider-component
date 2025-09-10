# Project Structure

## File Organization

```
/
├── index.html                    # Legacy demo with manual HTML structure
├── reusable-examples.html        # Modern data attribute examples
├── base-style.css               # Core styling and accessibility
├── slider-style.css             # Data attribute selectors and dynamic CSS
├── slider.js                    # ResponsiveSlider class with auto-init
├── README.md                    # Comprehensive documentation
└── test-*.html                  # Various test scenarios and edge cases
```

## File Responsibilities

### HTML Files

- **index.html** - Legacy demo with manual HTML structure for backward compatibility
- **reusable-examples.html** - Modern examples using data attribute system
- **test-\*.html** - Various test scenarios (navigation, data attributes, frameworks, etc.)
- Use semantic HTML5 with auto-generated ARIA attributes via JavaScript

### CSS Architecture

- **base-style.css** - Global styles, typography, accessibility, responsive design
- **slider-style.css** - Data attribute selectors, CSS custom properties, dynamic calculations
- Separation allows for modular usage and easier maintenance
- CSS custom properties enable runtime configuration

### JavaScript Architecture

- **slider.js** - ResponsiveSlider class with comprehensive functionality:
  - Auto-initialization system via `DOMContentLoaded`
  - Data source detection and content extraction
  - Dynamic slider generation with configuration
  - Navigation control creation and management
  - Accessibility feature auto-generation
  - Drag interaction enhancement

## Code Organization Patterns

### Data Attribute System

- `rb-slider-element="slider"` - Marks containers as sliders for auto-initialization
- `rb-slider-element` - Component identification ("slider", "list", "previous", "next")
- `rb-slider-instance` - Links data sources to slider targets
- `rb-slides-per-view-*` - Responsive configuration (desktop, tablet, mobile)
- `rb-slider-gap` - Spacing configuration

### CSS Structure

- CSS custom properties for dynamic configuration
- Data attribute selectors for component targeting
- Responsive breakpoints with custom property updates
- Accessibility styles integrated, not separate
- Dynamic width calculations using `calc()` and custom properties

### HTML Patterns

#### Modern Data Attribute Pattern

```html
<div
  rb-slider-element="slider"
  rb-slides-per-view="4"
  rb-slides-per-view-mobile="1"
>
  <div>Content 1</div>
  <div>Content 2</div>
</div>
```

#### Data Source Pattern

```html
<ul rb-slider-element="list" rb-slider-instance="products">
  <li>Product 1</li>
  <li>Product 2</li>
</ul>
<div rb-slider-element="slider" rb-slider-instance="products"></div>
```

#### Legacy Pattern (Still Supported)

```html
<div class="slider-container">
  <div class="slide"><div class="slide-content">...</div></div>
</div>
```

### Responsive Breakpoints

- Desktop: 1024px+ (uses `--slides-per-view-desktop`)
- Tablet: 768-1023px (uses `--slides-per-view-tablet`)
- Mobile: ≤767px (uses `--slides-per-view-mobile`)
- CSS custom properties update automatically via media queries

## Naming Conventions

- **Data Attributes**: `rb-` prefix with kebab-case (`rb-slider-element`, `rb-slides-per-view`)
- **CSS Custom Properties**: kebab-case with descriptive names (`--slides-per-view-desktop`)
- **CSS Classes**: kebab-case for legacy support (`.slider-container`, `.slide-content`)
- **IDs**: Auto-generated with timestamps for uniqueness
- **ARIA Labels**: Auto-generated and descriptive ("Slide 1 of 5", "Content slider with 4 slides")
- **File Names**: kebab-case for consistency

## Component Lifecycle

1. **Detection Phase**: Scan for `rb-slider-element="list"` and `rb-slider-element="slider"` attributes
2. **Configuration Phase**: Parse data attributes and apply CSS custom properties
3. **Generation Phase**: Create slider HTML structure and navigation controls
4. **Enhancement Phase**: Add accessibility features, drag interactions, and event handlers
5. **Runtime Phase**: Handle navigation, scroll events, and responsive updates
