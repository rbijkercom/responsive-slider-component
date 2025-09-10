# Responsive Slider Component

A reusable, accessible slider component that transforms any list of items into a configurable slider with data attributes. Features CSS-only core functionality with optional JavaScript enhancement for drag interactions.

## Features

- **Reusable Component**: Transform any list into a slider using data attributes
- **Configurable Layout**: Set slides per view (1-10+) for different screen sizes
- **CSS-Only Core**: Works without JavaScript, enhanced with optional JS
- **Accessibility First**: Full WCAG 2.1 compliance with comprehensive accessibility features
- **Error Handling**: Robust error handling with fallback content display
- **Cross-Browser Compatible**: Works in all modern browsers with graceful degradation
- **Responsive Design**: Adapts to all screen sizes with configurable breakpoints

## Accessibility Features

### Screen Reader Support

- Auto-generated ARIA labels and roles for all slider components
- Comprehensive screen reader instructions with keyboard shortcuts
- Live regions for scroll position announcements
- Proper semantic structure with slide position information

### Keyboard Navigation

- Full keyboard navigation: Arrow keys, Home/End, Page Up/Down
- Tab focus management with clear focus indicators
- Keyboard shortcuts announced to screen readers
- Support for keyboard-only users with visual feedback

### Error Handling & Fallback

- Graceful degradation when data sources are missing
- Error messages with proper ARIA alerts
- Original list content preserved as fallback
- Validation of configuration values with warnings

### Visual Accessibility

- High contrast mode support with enhanced focus indicators
- Respects user's reduced motion preferences
- Scalable design that works at 200% zoom
- Clear visual focus indicators meeting WCAG contrast requirements

## Usage

### Quick Start

Transform any list into a configurable slider using data attributes:

```html
<!-- 1. Define your data source -->
<ul rb-slider-element="list" rb-slider-instance="products">
  <li><strong>Product A</strong><br />Great product description</li>
  <li><strong>Product B</strong><br />Another amazing product</li>
  <li><strong>Product C</strong><br />Third fantastic product</li>
  <li><strong>Product D</strong><br />Fourth incredible product</li>
</ul>

<!-- 2. Create slider with configuration -->
<div
  rb-slider-element="slider"
  rb-slides-per-view="3"
  rb-slides-per-view-tablet="2"
  rb-slides-per-view-mobile="1"
  rb-slider-gap="1.5rem"
  rb-slider-instance="products"
></div>

<!-- 3. Include CSS and JS -->
<link rel="stylesheet" href="base-style.css" />
<link rel="stylesheet" href="slider-style.css" />
<script src="slider.js"></script>
```

### Configuration Options

- `rb-slides-per-view`: Desktop slides (1-10+, default: 4)
- `rb-slides-per-view-tablet`: Tablet slides (1-10+, default: 3)
- `rb-slides-per-view-mobile`: Mobile slides (1-10+, default: 1)
- `rb-slider-gap`: Space between slides (CSS length, default: 1.5rem)
- `rb-slider-instance`: Reference to data source (required)

### Direct Children Slider

Create sliders directly from container children:

```html
<!-- Responsive product showcase: 4 desktop, 3 tablet, 2 mobile -->
<div
  rb-slider-element="slider"
  rb-slides-per-view="4"
  rb-slides-per-view-tablet="3"
  rb-slides-per-view-mobile="2"
  rb-slider-gap="1.5rem"
>
  <div>Product 1 content...</div>
  <div>Product 2 content...</div>
  <div>Product 3 content...</div>
  <!-- More items... -->
</div>

<!-- Multiple data sources combined -->
<ul rb-slider-element="list" rb-slider-instance="content">
  <li>Item 1</li>
  <li>Item 2</li>
</ul>
<div rb-slider-element="list" rb-slider-instance="content">
  <div>Item 3</div>
  <div>Item 4</div>
</div>
<div
  rb-slider-element="slider"
  rb-slider-instance="content"
  rb-slides-per-view="2"
></div>
```

### Data Attributes

**Core Attributes:**

- `rb-slider-element="slider"`: Marks container as slider (enables auto-initialization)
- `rb-slider-element="list"`: Marks elements as data sources
- `rb-slider-instance`: Links data sources to sliders (required for data source pattern)

> **Migration Note**: The `rb-slider` attribute is no longer supported. Use `rb-slider-element="slider"` instead.

**Configuration Attributes:**

- `rb-slides-per-view`: Number of slides visible on desktop (default: 3)
- `rb-slides-per-view-tablet`: Number of slides on tablet ≤768px (default: same as desktop)
- `rb-slides-per-view-mobile`: Number of slides on mobile ≤480px (default: 1)
- `rb-slider-gap`: Gap between slides (default: 1rem)
- `rb-slider-show-scrollbar`: Show/hide scrollbar ("true"/"false", default: "false")
- `rb-slider-navigation`: Enable/disable navigation buttons ("true"/"false", default: "true")
- `data-auto-init`: Set to "false" to prevent auto-initialization

### Manual Initialization

```javascript
// Initialize the slider system manually
const slider = new ResponsiveSlider();
slider.init();

// Or configure an element and initialize
const element = document.getElementById('my-slider');
element.setAttribute('rb-slider-element', 'slider');
element.setAttribute('rb-slides-per-view', '4');
element.setAttribute('rb-slider-gap', '2rem');
new ResponsiveSlider().init();
```

### Legacy HTML Structure (Still Supported)

```html
<div class="slider-container" role="region" aria-label="Content slider">
  <div class="slide" role="group" aria-roledescription="slide">
    <div class="slide-content">
      <h3>Slide Title</h3>
      <p>Slide content goes here...</p>
    </div>
  </div>
  <!-- Additional slides... -->
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

- `index.html`: Original demo with manual HTML structure
- `reusable-examples.html`: Examples of the reusable component with data attributes
- `base-style.css`: Core styling and accessibility features
- `slider-style.css`: Slider-specific functionality and layout
- `slider.js`: Reusable component class with auto-initialization
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
