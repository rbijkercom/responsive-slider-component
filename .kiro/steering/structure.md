# Project Structure

## File Organization

```
/
├── index.html              # Main demo page
├── base-style.css          # Core styling and accessibility
├── slider-style.css        # Slider-specific functionality
├── slider.js              # Optional drag enhancement
└── README.md              # Documentation
```

## File Responsibilities

### HTML Files

- **index.html** - Primary demo showcasing slider with sample content
- Use semantic HTML5 with proper ARIA attributes
- Always include `aria-label`, `role`, and `aria-describedby` for accessibility

### CSS Architecture

- **base-style.css** - Global styles, typography, accessibility, responsive design
- **slider-style.css** - Slider-specific layout and scroll behavior
- Separation allows for modular usage and easier maintenance

### JavaScript

- **slider.js** - Progressive enhancement for drag interactions
- Pure vanilla JS, no dependencies
- Optional - slider works without JavaScript

## Code Organization Patterns

### CSS Structure

- Reset and base styles first
- Component-specific styles grouped together
- Responsive breakpoints at component level
- Accessibility styles integrated, not separate

### HTML Patterns

- Semantic structure: `main` → `slider-container` → `slide` → `slide-content`
- Required ARIA attributes on all interactive elements
- Screen reader instructions via `sr-only` class

### Responsive Breakpoints

- Desktop: 1024px+
- Tablet: 768-1023px
- Mobile: 320-767px
- Always mobile-first approach

## Naming Conventions

- **CSS Classes**: kebab-case (`.slider-container`, `.slide-content`)
- **IDs**: kebab-case for accessibility references (`slider-instructions`)
- **ARIA Labels**: Descriptive and specific ("Slide 1 of 5", not just "Slide")
- **File Names**: kebab-case for consistency
