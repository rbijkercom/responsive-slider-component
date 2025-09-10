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

      // Get depth configuration (default is 2 - child of child)
      const depth = parseInt(listElement.getAttribute('rb-slider-depth')) || 1;

      // Extract content from the list
      const items = this.extractListItems(listElement, depth);

      // Check if we already have data for this instance
      if (this.dataSources.has(listInstance)) {
        // Append items to existing instance
        const existingData = this.dataSources.get(listInstance);
        existingData.items.push(...items);
        existingData.elements = existingData.elements || [];
        existingData.elements.push(listElement);
      } else {
        // Create new instance data
        this.dataSources.set(listInstance, {
          elements: [listElement],
          items: items,
        });
      }
    });
  }

  // Extract items from a list element
  extractListItems(listElement, depth = 1) {
    const items = [];
    const children = Array.from(listElement.children);

    children.forEach((child) => {
      // Extract content at the specified depth
      const extractedContent = this.extractContentAtDepth(child, depth);
      if (extractedContent) {
        items.push(extractedContent);
      }
    });

    return items;
  }

  // Extract content at specified depth from an element
  extractContentAtDepth(element, depth) {
    let currentElement = element;

    // Navigate down the specified number of levels
    for (let i = 0; i < depth; i++) {
      if (
        !currentElement ||
        !currentElement.children ||
        currentElement.children.length === 0
      ) {
        // If we can't go deeper, return what we have
        break;
      }
      // Take the first child at each level
      currentElement = currentElement.children[0];
    }

    // Clone the element at the target depth
    return currentElement
      ? currentElement.cloneNode(true)
      : element.cloneNode(true);
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
        parseInt(sliderElement.getAttribute('rb-slides-per-view')) || 3,
      slidesPerViewTablet:
        parseInt(sliderElement.getAttribute('rb-slides-per-view-tablet')) || 2,
      slidesPerViewMobile:
        parseInt(sliderElement.getAttribute('rb-slides-per-view-mobile')) || 1,
      gap: sliderElement.getAttribute('rb-slider-gap') || '1rem',
      depth: parseInt(sliderElement.getAttribute('rb-slider-depth')) || 1,
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
      depth,
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

      console.log(
        `Instance "${instanceName}" has ${dataSource.items.length} items from ${dataSource.elements.length} list(s)`,
      );

      // If slider has its own depth setting, re-extract items with that depth
      if (depth !== null) {
        const reExtractedItems = [];
        dataSource.elements.forEach((listElement) => {
          const items = this.extractListItems(listElement, depth);
          reExtractedItems.push(...items);
        });
        allItems.push(...reExtractedItems);
      } else {
        // Use items as originally extracted with list-level depth
        allItems.push(...dataSource.items);
      }
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
    this.setupNavigationControls(element);
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

      // Clone the original item content and add rb-slider-content directly to it
      const clonedItem = item.cloneNode(true);
      clonedItem.setAttribute('rb-slider-content', '');

      slide.appendChild(clonedItem);
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
        // Update navigation states after scroll snap restoration
        this.updateNavigationStates(container);
      }
    };

    requestAnimationFrame(animateScroll);
  }

  // Setup navigation controls for a slider container
  setupNavigationControls(sliderContainer) {
    // Check if navigation is disabled
    if (this.isNavigationDisabled(sliderContainer)) {
      return;
    }

    // Move any existing navigation controls from slider to wrapper
    this.moveNavigationControlsToWrapper(sliderContainer);

    // Detect existing navigation controls
    const navigationControls = this.detectNavigationControls(sliderContainer);

    // Create default navigation if none exist
    if (
      navigationControls.previous.length === 0 &&
      navigationControls.next.length === 0
    ) {
      this.createDefaultNavigationControls(sliderContainer);
      // Re-detect after creating defaults
      const updatedControls = this.detectNavigationControls(sliderContainer);
      this.bindNavigationControls(sliderContainer, updatedControls);
    } else {
      this.bindNavigationControls(sliderContainer, navigationControls);
    }

    // Setup accessibility for navigation controls
    this.setupNavigationAccessibility(sliderContainer);

    // Initial state update
    this.updateNavigationStates(sliderContainer);

    // Add scroll listener to update navigation states
    sliderContainer.addEventListener('scroll', () => {
      this.updateNavigationStates(sliderContainer);
    });
  }

  // Detect navigation controls within a slider container and its wrapper
  detectNavigationControls(sliderContainer) {
    // Look for controls in both the slider container and its wrapper
    const wrapper = sliderContainer.parentElement;
    const searchContainer =
      wrapper && wrapper.hasAttribute('rb-slider-wrapper')
        ? wrapper
        : sliderContainer;

    const previousControls = searchContainer.querySelectorAll(
      '[rb-slider-element="previous"]',
    );
    const nextControls = searchContainer.querySelectorAll(
      '[rb-slider-element="next"]',
    );

    return {
      previous: Array.from(previousControls),
      next: Array.from(nextControls),
    };
  }

  // Move existing navigation controls from slider container to wrapper
  moveNavigationControlsToWrapper(sliderContainer) {
    // Find existing navigation controls in the slider container
    const existingPrevious = sliderContainer.querySelectorAll(
      '[rb-slider-element="previous"]',
    );
    const existingNext = sliderContainer.querySelectorAll(
      '[rb-slider-element="next"]',
    );

    if (existingPrevious.length > 0 || existingNext.length > 0) {
      // Create wrapper if it doesn't exist
      let sliderWrapper = sliderContainer.parentElement;

      if (!sliderWrapper.hasAttribute('rb-slider-wrapper')) {
        sliderWrapper = document.createElement('div');
        sliderWrapper.setAttribute('rb-slider-wrapper', '');
        sliderWrapper.style.position = 'relative';

        sliderContainer.parentNode.insertBefore(sliderWrapper, sliderContainer);
        sliderWrapper.appendChild(sliderContainer);
      }

      // Move existing controls to wrapper
      [...existingPrevious, ...existingNext].forEach((control) => {
        sliderWrapper.appendChild(control);
      });
    }
  }

  // Create default navigation controls if none exist
  createDefaultNavigationControls(sliderContainer) {
    // Create a wrapper for the slider if it doesn't already have one
    let sliderWrapper = sliderContainer.parentElement;

    // Check if the parent is already a navigation wrapper
    if (!sliderWrapper.hasAttribute('rb-slider-wrapper')) {
      // Create a new wrapper
      sliderWrapper = document.createElement('div');
      sliderWrapper.setAttribute('rb-slider-wrapper', '');
      sliderWrapper.style.position = 'relative';

      // Insert wrapper before slider and move slider into wrapper
      sliderContainer.parentNode.insertBefore(sliderWrapper, sliderContainer);
      sliderWrapper.appendChild(sliderContainer);

      console.log('Created navigation wrapper for slider:', sliderContainer);
    }

    // Create previous button
    const prevButton = document.createElement('button');
    prevButton.setAttribute('rb-slider-element', 'previous');
    prevButton.setAttribute('type', 'button');
    prevButton.setAttribute('aria-label', 'Previous slides');
    prevButton.textContent = '‹';

    // Create next button
    const nextButton = document.createElement('button');
    nextButton.setAttribute('rb-slider-element', 'next');
    nextButton.setAttribute('type', 'button');
    nextButton.setAttribute('aria-label', 'Next slides');
    nextButton.textContent = '›';

    // Append buttons to the wrapper, not the slider container
    sliderWrapper.appendChild(prevButton);
    sliderWrapper.appendChild(nextButton);

    console.log('Added navigation buttons to wrapper:', sliderWrapper);
  }

  // Bind event handlers to navigation controls
  bindNavigationControls(sliderContainer, navigationControls) {
    // Bind previous controls
    navigationControls.previous.forEach((control) => {
      control.addEventListener('click', (e) => {
        e.preventDefault();
        this.handlePreviousNavigation(sliderContainer);
      });
    });

    // Bind next controls
    navigationControls.next.forEach((control) => {
      control.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleNextNavigation(sliderContainer);
      });
    });
  }

  // Calculate scroll distance for single slide navigation
  calculateScrollDistance(sliderContainer) {
    const slides = sliderContainer.querySelectorAll('[rb-slide]');
    if (slides.length === 0) return 0;

    const slideWidth = slides[0].offsetWidth;
    const gap = parseInt(getComputedStyle(sliderContainer).gap) || 16;

    // Always scroll one slide at a time regardless of slides-per-view
    return slideWidth + gap;
  }

  // Handle previous navigation action
  handlePreviousNavigation(sliderContainer) {
    const scrollDistance = this.calculateScrollDistance(sliderContainer);
    const currentScroll = sliderContainer.scrollLeft;
    const targetScroll = Math.max(0, currentScroll - scrollDistance);

    // Use smooth scrolling
    sliderContainer.style.scrollBehavior = 'smooth';
    sliderContainer.scrollLeft = targetScroll;

    // Update navigation states after a brief delay to allow scroll to complete
    setTimeout(() => {
      this.updateNavigationStates(sliderContainer);
    }, 100);
  }

  // Handle next navigation action
  handleNextNavigation(sliderContainer) {
    const scrollDistance = this.calculateScrollDistance(sliderContainer);
    const currentScroll = sliderContainer.scrollLeft;
    const maxScroll = sliderContainer.scrollWidth - sliderContainer.clientWidth;
    const targetScroll = Math.min(maxScroll, currentScroll + scrollDistance);

    // Use smooth scrolling
    sliderContainer.style.scrollBehavior = 'smooth';
    sliderContainer.scrollLeft = targetScroll;

    // Update navigation states after a brief delay to allow scroll to complete
    setTimeout(() => {
      this.updateNavigationStates(sliderContainer);
    }, 100);
  }

  // Update navigation control states (enabled/disabled)
  updateNavigationStates(sliderContainer) {
    const navigationControls = this.detectNavigationControls(sliderContainer);
    const currentScroll = sliderContainer.scrollLeft;
    const maxScroll = sliderContainer.scrollWidth - sliderContainer.clientWidth;

    // Update previous controls
    navigationControls.previous.forEach((control) => {
      const isAtStart = currentScroll <= 0;
      control.disabled = isAtStart;
      control.setAttribute('aria-disabled', isAtStart.toString());
    });

    // Update next controls
    navigationControls.next.forEach((control) => {
      const isAtEnd = currentScroll >= maxScroll - 1; // Allow for small rounding errors
      control.disabled = isAtEnd;
      control.setAttribute('aria-disabled', isAtEnd.toString());
    });
  }

  // Setup navigation accessibility features
  setupNavigationAccessibility(sliderContainer) {
    const navigationControls = this.detectNavigationControls(sliderContainer);

    // Ensure navigation controls are keyboard focusable and have proper ARIA attributes
    [...navigationControls.previous, ...navigationControls.next].forEach(
      (control) => {
        if (!control.hasAttribute('tabindex')) {
          control.setAttribute('tabindex', '0');
        }

        // Add keyboard support
        control.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            control.click();
          }
        });
      },
    );

    // Update slider instructions to mention navigation buttons
    const sliderId = sliderContainer.id;
    if (sliderId) {
      const instructions = document.getElementById(`${sliderId}-instructions`);
      if (instructions) {
        instructions.textContent =
          'Horizontal scrolling slider with navigation buttons. Use Tab to focus on the slider or navigation buttons, then use arrow keys, scroll horizontally, or click navigation buttons to navigate between slides.';
      }
    }
  }

  // Check if navigation is disabled for a slider
  isNavigationDisabled(sliderContainer) {
    const navigationAttr = sliderContainer.getAttribute('rb-slider-navigation');
    return navigationAttr === 'false';
  }
}

// Initialize the slider system when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const sliderSystem = new ResponsiveSlider();
  sliderSystem.init();
});

// Export for manual initialization
window.ResponsiveSlider = ResponsiveSlider;
