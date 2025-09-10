# Product Overview

This is a **Responsive Slider Component** - a reusable component that transforms any HTML structure into an accessible slider with configurable slide counts and automatic initialization.

## Key Features

- **Auto-initialization** via `rb-slider-element="slider"` detection on DOM ready
- **Flexible data sources** with `rb-slider-element="list"` and `rb-slider-instance` system
- **Configurable slide count** (1-10+ slides per view) for desktop, tablet, and mobile
- **Automatic navigation controls** with previous/next buttons and keyboard support
- **CSS-only core** with JavaScript enhancement for drag interactions and navigation
- **Accessibility-first design** with full WCAG 2.1 compliance and auto-generated ARIA
- **Responsive layout** that adapts to all screen sizes with breakpoint-specific configurations
- **Cross-browser compatible** with graceful degradation
- **Multiple initialization methods** (auto, manual, or data-driven)

## Component Architecture

### Data Attribute System

- `rb-slider-element="slider"`: Marks containers as sliders for auto-initialization
- `rb-slides-per-view`: Desktop slide count (default: 3)
- `rb-slides-per-view-tablet`: Tablet slide count (≤768px)
- `rb-slides-per-view-mobile`: Mobile slide count (≤480px)
- `rb-slider-gap`: Space between slides (CSS length)

### Data Source System

- `rb-slider-element="list"`: Marks elements as data sources
- `rb-slider-instance`: Links data sources to slider targets
- `rb-slider-depth`: Controls content extraction depth

## Target Use Cases

- Product showcases and galleries with responsive layouts
- Content carousels for marketing sites with navigation controls
- Educational content presentation with accessibility features
- Any scenario requiring accessible horizontal content navigation
- Dynamic content sliders with multiple data sources

## Design Philosophy

- Lightweight and dependency-free
- Accessibility by default, not as an afterthought
- Progressive enhancement approach
- Mobile-first responsive design
- Auto-initialization for developer convenience
- Flexible content extraction and combination
