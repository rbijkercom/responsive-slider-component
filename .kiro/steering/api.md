# Data Attribute API

## Auto-Initialization System

The ResponsiveSlider component uses a data attribute API for configuration and auto-initialization. Sliders automatically initialize when the DOM loads by detecting elements with `rb-slider-element="slider"`.

> **Migration Note**: The `rb-slider` attribute is no longer supported. Use `rb-slider-element="slider"` instead for auto-initialization.

## Core Attributes

### `rb-slides-per-view`

- **Purpose**: Sets number of slides visible on desktop (≥1024px)
- **Default**: 3
- **Range**: 1-10+ (any positive integer)
- **Usage**: `rb-slides-per-view="4"`

### `rb-slides-per-view-tablet`

- **Purpose**: Sets number of slides visible on tablet (768-1023px)
- **Default**: Same as desktop value
- **Range**: 1-10+ (any positive integer)
- **Usage**: `rb-slides-per-view-tablet="2"`

### `rb-slides-per-view-mobile`

- **Purpose**: Sets number of slides visible on mobile (≤767px)
- **Default**: 1
- **Range**: 1-10+ (any positive integer)
- **Usage**: `rb-slides-per-view-mobile="1"`

### `rb-slider-gap`

- **Purpose**: Sets spacing between slides
- **Default**: "1rem"
- **Format**: Any valid CSS length value
- **Usage**: `rb-slider-gap="1.5rem"` or `rb-slider-gap="20px"`

### `rb-slider-show-scrollbar`

- **Purpose**: Controls scrollbar visibility for the slider
- **Default**: false (hidden scrollbar)
- **Values**: `"true"` (show scrollbar), `"false"` (hide scrollbar)
- **Usage**: `rb-slider-show-scrollbar="true"` to show scrollbar
- **Behavior**: When set to `"false"` (default), hides scrollbar while maintaining scroll functionality

## Data Source System

### `rb-slider-element="list"`

- **Purpose**: Marks elements as data sources for content extraction
- **Usage**: `<ul rb-slider-element="list" rb-slider-instance="products">...</ul>`
- **Behavior**: Content is extracted and can be used by slider targets

### `rb-slider-element="slider"`

- **Purpose**: Marks containers as slider targets
- **Usage**: `<div rb-slider-element="slider" rb-slider-instance="products"></div>` (with data sources)
- **Usage**: `<div rb-slider-element="slider"><div>Slide 1</div><div>Slide 2</div></div>` (direct children)
- **Behavior**: Either populated with content from matching data sources or uses direct children as slides

### `rb-slider-instance`

- **Purpose**: Links data sources to slider targets
- **Usage**: `rb-slider-instance="products"`
- **Behavior**: Multiple elements can share the same instance name
- **Multiple Sources**: Use semicolon separation: `rb-slider-instance="products;testimonials"`

### `rb-slider-depth`

- **Purpose**: Controls content extraction depth from list elements
- **Default**: 1 (direct children)
- **Usage**: `rb-slider-depth="2"` (child of child)
- **Behavior**: Determines how deep to extract content from list items

## Navigation Control Attributes

### `rb-slider-element="previous"`

- **Purpose**: Marks elements as previous navigation controls
- **Usage**: `<button rb-slider-element="previous">‹</button>`
- **Auto-Creation**: Created automatically if not present

### `rb-slider-element="next"`

- **Purpose**: Marks elements as next navigation controls
- **Usage**: `<button rb-slider-element="next">›</button>`
- **Auto-Creation**: Created automatically if not present

### `rb-slider-navigation`

- **Purpose**: Controls navigation button auto-creation
- **Usage**: `rb-slider-navigation="false"` to disable
- **Default**: Navigation buttons are created automatically

## Wrapper Attributes

### `rb-slider-element="wrapper"`

- **Purpose**: Marks containers as navigation wrappers
- **Usage**: Auto-applied to parent containers when navigation is created
- **Behavior**: Provides relative positioning for navigation buttons

## Content Attributes

### `rb-slider-element="slide"`

- **Purpose**: Marks individual slide elements (auto-applied)
- **Usage**: Auto-generated during slider creation
- **Behavior**: Receives slide-specific styling and scroll-snap behavior

### `rb-slider-content`

- **Purpose**: Marks slide content containers (auto-applied)
- **Usage**: Auto-generated during slider creation
- **Behavior**: Provides content wrapper styling

## Configuration Examples

### Basic Direct Children Slider

```html
<div rb-slider-element="slider">
  <div>Slide 1</div>
  <div>Slide 2</div>
  <div>Slide 3</div>
</div>
```

### Responsive Configuration

```html
<div
  rb-slider-element="slider"
  rb-slides-per-view="4"
  rb-slides-per-view-tablet="3"
  rb-slides-per-view-mobile="1"
  rb-slider-gap="1.5rem"
  rb-slider-show-scrollbar="false"
>
  <!-- Content -->
</div>
```

### Data Source Pattern

```html
<!-- Data source -->
<ul rb-slider-element="list" rb-slider-instance="products">
  <li>Product 1</li>
  <li>Product 2</li>
</ul>

<!-- Slider target -->
<div
  rb-slider-element="slider"
  rb-slider-instance="products"
  rb-slides-per-view="3"
></div>
```

### Multiple Data Sources

```html
<!-- Multiple lists -->
<ul rb-slider-element="list" rb-slider-instance="content">
  <li>Item 1</li>
</ul>
<div rb-slider-element="list" rb-slider-instance="content">
  <div>Item 2</div>
</div>

<!-- Combined slider -->
<div rb-slider-element="slider" rb-slider-instance="content"></div>
```

## Manual Initialization

### Preventing Auto-Init

```html
<div rb-slider-element="slider" data-auto-init="false">
  <!-- Content -->
</div>
```

### Manual JavaScript Init

```javascript
// Initialize the slider system manually
const slider = new ResponsiveSlider();
slider.init();

// Or configure an element and initialize
const element = document.getElementById('my-slider');
element.setAttribute('rb-slider-element', 'slider');
element.setAttribute('rb-slides-per-view', '4');
new ResponsiveSlider().init();
```

### Scrollbar Control Examples

```html
<!-- Default behavior (hidden scrollbar) -->
<div rb-slider-element="slider">
  <div>Slide 1</div>
  <div>Slide 2</div>
</div>

<!-- Explicitly hide scrollbar (same as default) -->
<div rb-slider-element="slider" rb-slider-show-scrollbar="false">
  <div>Slide 1</div>
  <div>Slide 2</div>
</div>

<!-- Show scrollbar -->
<div rb-slider-element="slider" rb-slider-show-scrollbar="true">
  <div>Slide 1</div>
  <div>Slide 2</div>
</div>
```

## CSS Custom Properties Integration

The data attributes automatically set CSS custom properties:

- `--slides-per-view-desktop`: From `rb-slides-per-view`
- `--slides-per-view-tablet`: From `rb-slides-per-view-tablet`
- `--slides-per-view-mobile`: From `rb-slides-per-view-mobile`
- `--slide-gap`: From `rb-slider-gap`
- `--show-scrollbar`: From `rb-slider-show-scrollbar` (auto/hidden)
- `--current-slides-per-view`: Updated by media queries

These properties enable dynamic CSS calculations for responsive layouts.
