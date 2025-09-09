class ResponsiveSlider {
  constructor() {
    this.dataSources = new Map(); // Store list instances
    this.sliderConfigs = []; // Store slider configurations
  }

  // Initialize the slider system by detecting and processing data attributes
  init() {
    this.detectDataSources();
    this.detectSliderTargets();
    this.generateSliders();
  }

  // Detect and parse rb-slider-element="list" elements
  detectDataSources() {
    const listElements = document.querySelectorAll(
      '[rb-slider-element="list"]',
    );

    listElements.forEach((listElement) => {
      const listInstance = listElement.getAttribute('rb-slider-instance');

      if (!listInstance) {
        console.warn(
          'List element missing rb-slider-instance attribute:',
          listElement,
        );
        return;
      }

      // Extract content from the list
      const items = this.extractListItems(listElement);

      // Store the data source
      this.dataSources.set(listInstance, {
        element: listElement,
        items: items,
      });
    });
  }

  // Extract items from a list element
  extractListItems(listElement) {
    const items = [];
    const children = Array.from(listElement.children);

    children.forEach((child) => {
      // Clone the element to preserve original structure
      const clonedItem = child.cloneNode(true);
      items.push(clonedItem);
    });

    return items;
  }

  // Detect and parse slider target containers
  detectSliderTargets() {
    const sliderElements = document.querySelectorAll(
      '[rb-slider-element="slider"]',
    );

    sliderElements.forEach((sliderElement) => {
      const config = this.parseSliderConfiguration(sliderElement);

      if (config) {
        this.sliderConfigs.push(config);
      }
    });
  }

  // Parse slider configuration from data attributes
  parseSliderConfiguration(sliderElement) {
    const listInstancesAttr = sliderElement.getAttribute('rb-slider-instance');

    if (!listInstancesAttr) {
      console.warn(
        'Slider element missing rb-slider-instance attribute:',
        sliderElement,
      );
      return null;
    }

    // Support multiple list instances (semicolon-separated values)
    const listInstances = listInstancesAttr
      .split(';')
      .map((instance) => instance.trim());

    // Parse configuration with defaults
    const config = {
      element: sliderElement,
      listInstances: listInstances,
      slidesPerView:
        parseInt(sliderElement.getAttribute('rb-slides-per-view')) || 4,
      slidesPerViewTablet:
        parseInt(sliderElement.getAttribute('rb-slides-per-view-tablet')) || 3,
      slidesPerViewMobile:
        parseInt(sliderElement.getAttribute('rb-slides-per-view-mobile')) || 1,
      gap: sliderElement.getAttribute('rb-slider-gap') || '1.5rem',
    };

    return config;
  }

  // Generate sliders from configurations
  generateSliders() {
    this.sliderConfigs.forEach((config) => {
      this.createSlider(config);
    });
  }

  // Create a single slider from configuration
  createSlider(config) {
    const {
      element,
      listInstances,
      slidesPerView,
      slidesPerViewTablet,
      slidesPerViewMobile,
      gap,
    } = config;

    // Collect items from all specified list instances
    const allItems = [];

    listInstances.forEach((instanceName) => {
      const dataSource = this.dataSources.get(instanceName);

      if (!dataSource) {
        console.warn(
          `List instance "${instanceName}" not found for slider:`,
          element,
        );
        return;
      }

      // Add items from this data source
      allItems.push(...dataSource.items);
    });

    if (allItems.length === 0) {
      console.warn('No items found for slider:', element);
      return;
    }

    // Apply CSS custom properties for dynamic configuration
    this.applySliderConfiguration(element, {
      slidesPerView,
      slidesPerViewTablet,
      slidesPerViewMobile,
      gap,
    });

    // Generate slider content
    this.generateSliderContent(element, allItems);

    // Setup additional functionality
    this.setupAccessibility(element, allItems.length);
    this.setupDragInteraction(element);
  }

  // Setup accessibility features for a slider
  setupAccessibility(container, totalSlides) {
    // Get configuration from CSS custom properties
    const slidesPerViewDesktop =
      parseInt(container.style.getPropertyValue('--slides-per-view-desktop')) ||
      4;
    const slidesPerViewTablet =
      parseInt(container.style.getPropertyValue('--slides-per-view-tablet')) ||
      3;
    const slidesPerViewMobile =
      parseInt(container.style.getPropertyValue('--slides-per-view-mobile')) ||
      1;

    // Update container ARIA attributes
    container.setAttribute('role', 'region');
    container.setAttribute('tabindex', '0');

    // Create unique ID for instructions if container doesn't have one
    if (!container.id) {
      container.id = `slider-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 11)}`;
    }

    // Create or update instructions
    let instructions = document.getElementById(`${container.id}-instructions`);
    if (!instructions) {
      instructions = document.createElement('div');
      instructions.id = `${container.id}-instructions`;
      instructions.setAttribute('data-sr-only', '');
      instructions.textContent =
        'Horizontal scrolling slider. Use Tab to focus on the slider, then use arrow keys or scroll horizontally to navigate between slides.';
      container.parentNode.insertBefore(instructions, container.nextSibling);
    }

    container.setAttribute('aria-describedby', instructions.id);

    // Setup responsive ARIA label updates
    const updateAriaLabel = () => {
      let currentSlidesPerView = slidesPerViewDesktop;

      if (window.matchMedia('(max-width: 480px)').matches) {
        currentSlidesPerView = slidesPerViewMobile;
      } else if (window.matchMedia('(max-width: 768px)').matches) {
        currentSlidesPerView = slidesPerViewTablet;
      }

      container.setAttribute(
        'aria-label',
        `Content slider with ${totalSlides} slides, showing ${currentSlidesPerView} at a time`,
      );
    };

    // Initial update and resize listener
    updateAriaLabel();
    window.addEventListener('resize', updateAriaLabel);
  }

  // Apply configuration via CSS custom properties
  applySliderConfiguration(element, config) {
    element.style.setProperty(
      '--slides-per-view-desktop',
      config.slidesPerView,
    );
    element.style.setProperty(
      '--slides-per-view-tablet',
      config.slidesPerViewTablet,
    );
    element.style.setProperty(
      '--slides-per-view-mobile',
      config.slidesPerViewMobile,
    );
    element.style.setProperty('--slide-gap', config.gap);
  }

  // Generate slider content from items
  generateSliderContent(container, items) {
    // Clear existing content
    container.innerHTML = '';

    items.forEach((item, index) => {
      // Create slide wrapper with data attribute
      const slide = document.createElement('div');
      slide.setAttribute('rb-slide', '');
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-roledescription', 'slide');
      slide.setAttribute('aria-label', `Slide ${index + 1} of ${items.length}`);
      slide.setAttribute('tabindex', '-1');

      // Create slide content wrapper with data attribute
      const slideContent = document.createElement('div');
      slideContent.setAttribute('rb-slider-content', '');

      // Clone and append the original item content
      const clonedItem = item.cloneNode(true);
      slideContent.appendChild(clonedItem);

      slide.appendChild(slideContent);
      container.appendChild(slide);
    });
  }

  // Setup drag interaction for a slider
  setupDragInteraction(container) {
    let isDown = false;
    let startX, scrollLeft;

    const handleMouseDown = (e) => {
      isDown = true;
      container.setAttribute('data-dragging', '');
      startX = e.pageX;
      scrollLeft = container.scrollLeft;
      container.style.scrollSnapType = 'none';
      container.style.scrollBehavior = 'auto';
    };

    const handleMouseUp = () => {
      if (!isDown) return;
      isDown = false;
      container.removeAttribute('data-dragging');
      this.restoreScrollSnap(container);
    };

    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const walk = e.pageX - startX;
      container.scrollLeft = scrollLeft - walk;
    };

    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mouseleave', handleMouseUp);
    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mousemove', handleMouseMove);
  }

  // Restore scroll snap behavior after drag interaction
  restoreScrollSnap(container) {
    const slideWidth = container.querySelector('[rb-slide]').offsetWidth;
    const gap = parseInt(getComputedStyle(container).gap) || 16;
    const slideStep = slideWidth + gap;
    const nearestIndex = Math.round(container.scrollLeft / slideStep);
    const targetScroll = nearestIndex * slideStep;

    const startScroll = container.scrollLeft;
    const distance = targetScroll - startScroll;
    const startTime = performance.now();

    const animateScroll = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / 300, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);

      container.scrollLeft = startScroll + distance * easeOut;

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        container.style.scrollSnapType = 'x mandatory';
        container.style.scrollBehavior = 'smooth';
      }
    };

    requestAnimationFrame(animateScroll);
  }
}

// Initialize the slider system when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const sliderSystem = new ResponsiveSlider();
  sliderSystem.init();
});

// Export for manual initialization
window.ResponsiveSlider = ResponsiveSlider;
