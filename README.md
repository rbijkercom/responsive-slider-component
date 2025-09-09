# Responsive Slider Component

A fully accessible, CSS-only responsive slider component that displays exactly 3 slides at a time with smooth scroll-snap navigation.

## Features

- **Pure CSS Implementation**: No JavaScript dependencies
- **Responsive Design**: Adapts to all screen sizes using relative units
- **Accessibility First**: Full WCAG 2.1 compliance with comprehensive accessibility features
- **Flexible Content**: Supports any number of slides (minimum 3)
- **Smooth Navigation**: CSS scroll-snap for seamless user experience
- **Cross-Browser Compatible**: Works in all modern browsers with graceful degradation

## Accessibility Features

### Screen Reader Support

- Proper ARIA labels and roles for all slider components
- Semantic HTML structure with meaningful headings
- Screen reader instructions for navigation
- Live regions for dynamic content announcements

### Keyboard Navigation

- Full keyboard accessibility with Tab and Arrow key support
- Logical focus order through slider and interactive content
- Clear focus indicators meeting WCAG contrast requirements
- Support for keyboard-only users

### Visual Accessibility

- High contrast mode support
- Respects user's reduced motion preferences
- Scalable design that works at 200% zoom
- Clear visual focus indicators

### Assistive Technology

- Compatible with screen readers (NVDA, JAWS, VoiceOver)
- Proper semantic structure for assistive devices
- Alternative text for all images
- Form labels and fieldset legends where applicable

## Usage

### Basic HTML Structure

```html
<div
  class="slider-container"
  role="region"
  aria-label="Content slider with 5 slides, showing 3 at a time"
  aria-describedby="slider-instructions"
  tabindex="0"
>
  <div
    class="slide"
    role="group"
    aria-roledescription="slide"
    aria-label="Slide 1 of 5"
    tabindex="-1"
  >
    <div class="slide-content">
      <h3>Slide Title</h3>
      <p>Slide content goes here...</p>
    </div>
  </div>

  <!-- Additional slides... -->
</div>

<div id="slider-instructions" class="sr-only">
  Horizontal scrolling slider. Use Tab to focus on the slider, then use arrow
  keys or scroll horizontally to navigate between slides.
</div>
```

### Required CSS Classes

- `.slider-container`: Main wrapper with scroll behavior
- `.slide`: Individual slide container
- `.slide-content`: Content wrapper within each slide
- `.sr-only`: Screen reader only content

### ARIA Attributes

- `role="region"`: Identifies the slider as a landmark
- `aria-label`: Describes the slider and slide count
- `aria-describedby`: References instruction text
- `role="group"`: Groups slide content together
- `aria-roledescription="slide"`: Clarifies the element's purpose
- `aria-label` on slides: Provides position information

## Examples

### Minimal Example (3 slides)

```html
<!-- See index.html for complete example -->
```

### Product Showcase (6 slides)

```html
<!-- See index.html for product grid example -->
```

### Interactive Content

```html
<!-- See accessibility-demo.html for forms and interactive elements -->
```

## Browser Support

- **Modern Browsers**: Full support with all features

  - Chrome 69+
  - Firefox 68+
  - Safari 11+
  - Edge 79+

- **Older Browsers**: Graceful degradation
  - Basic horizontal scrolling without scroll-snap
  - All accessibility features maintained

## Responsive Breakpoints

- **Desktop (1400px+)**: Enhanced spacing and typography
- **Standard Desktop (1024-1399px)**: Standard layout
- **Tablet Landscape (769-1023px)**: Adjusted spacing
- **Tablet Portrait (481-768px)**: Compact layout
- **Mobile (320-480px)**: Minimal spacing, optimized for touch

## Accessibility Testing

### Screen Reader Testing

- [x] Slider announced as region with proper label
- [x] Each slide identified with position
- [x] Content read in logical order
- [x] Navigation instructions provided

### Keyboard Testing

- [x] Tab focuses slider container
- [x] Arrow keys scroll through slides
- [x] Tab accesses interactive elements
- [x] Focus indicators clearly visible

### Visual Testing

- [x] High contrast mode support
- [x] Focus indicators meet WCAG standards
- [x] Readable at 200% zoom
- [x] Reduced motion preferences respected

## Files

- `index.html`: Main demo with various content types
- `accessibility-demo.html`: Comprehensive accessibility demonstration
- `styles.css`: Complete CSS implementation
- `README.md`: Documentation and usage guide

## Implementation Notes

### CSS-Only Approach

This slider is implemented entirely with CSS, making it:

- Lightweight and fast-loading
- Dependency-free
- Accessible by default
- Easy to customize and maintain

### Scroll-Snap Behavior

The slider uses CSS scroll-snap for smooth navigation:

- `scroll-snap-type: x mandatory` on container
- `scroll-snap-align: start` on slides
- Smooth scrolling with `scroll-behavior: smooth`

### Responsive Design

Uses relative units throughout:

- `calc((100% - gaps) / 3)` for slide widths
- Flexible gaps that scale with screen size
- No fixed pixel values for core layout

## Customization

### Changing Slide Count

To display a different number of slides, modify the flex-basis calculation:

```css
.slide {
  flex: 0 0 calc((100% - gaps) / desired-count);
}
```

### Custom Styling

Override CSS custom properties or add your own styles:

```css
.slider-container {
  --slide-gap: 1rem;
  --slide-padding: 1.5rem;
}
```

### Content Types

The slider supports any HTML content:

- Text and images
- Forms and interactive elements
- Videos and media
- Custom components

## License

This component is provided as-is for educational and commercial use. Feel free to modify and distribute according to your needs.
