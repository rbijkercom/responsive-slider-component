class ResponsiveSlider {
  constructor(element) {
    this.container = element;
    this.slidesPerView = parseInt(element.dataset.slidesPerView) || 3;
    this.slidesPerViewTablet =
      parseInt(element.dataset.slidesPerViewTablet) || this.slidesPerView;
    this.slidesPerViewMobile =
      parseInt(element.dataset.slidesPerViewMobile) ||
      Math.min(this.slidesPerViewTablet, 2);
    this.gap = element.dataset.gap || '1rem';
    this.autoInit = element.dataset.autoInit !== 'false';

    if (this.autoInit) {
      this.init();
    }
  }

  init() {
    this.setupSlider();
    this.setupResponsiveBreakpoints();
    this.setupDragInteraction();
    this.setupAccessibility();
  }

  setupSlider() {
    // Apply CSS custom properties for dynamic configuration
    this.container.style.setProperty(
      '--slides-per-view-desktop',
      this.slidesPerView,
    );
    this.container.style.setProperty(
      '--slides-per-view-tablet',
      this.slidesPerViewTablet,
    );
    this.container.style.setProperty(
      '--slides-per-view-mobile',
      this.slidesPerViewMobile,
    );
    this.container.style.setProperty('--slide-gap', this.gap);

    // Convert existing list items to slides if needed
    this.convertListToSlides();

    // Add slider classes
    this.container.classList.add('responsive-slider');

    // Setup CSS for dynamic slide width
    const slides = this.container.querySelectorAll('.slide, [data-slide]');
    slides.forEach((slide) => {
      slide.classList.add('slide');
      if (!slide.querySelector('.slide-content')) {
        slide.innerHTML = `<div class="slide-content">${slide.innerHTML}</div>`;
      }
    });
  }

  convertListToSlides() {
    // Handle various list structures
    const listItems = this.container.querySelectorAll(
      'li, .item, [data-slide-item]',
    );
    if (listItems.length > 0) {
      listItems.forEach((item, index) => {
        item.classList.add('slide');
        item.setAttribute('role', 'group');
        item.setAttribute('aria-roledescription', 'slide');
        item.setAttribute(
          'aria-label',
          `Slide ${index + 1} of ${listItems.length}`,
        );
        item.setAttribute('tabindex', '-1');

        if (!item.querySelector('.slide-content')) {
          item.innerHTML = `<div class="slide-content">${item.innerHTML}</div>`;
        }
      });
    }
  }

  setupResponsiveBreakpoints() {
    // Update ARIA label based on current viewport
    const updateAriaLabel = () => {
      const slides = this.container.querySelectorAll('.slide');
      const totalSlides = slides.length;
      let currentSlidesPerView = this.slidesPerView;

      if (window.matchMedia('(max-width: 480px)').matches) {
        currentSlidesPerView = this.slidesPerViewMobile;
      } else if (window.matchMedia('(max-width: 768px)').matches) {
        currentSlidesPerView = this.slidesPerViewTablet;
      }

      this.container.setAttribute(
        'aria-label',
        `Content slider with ${totalSlides} slides, showing ${currentSlidesPerView} at a time`,
      );
    };

    // Initial update
    updateAriaLabel();

    // Listen for resize events
    window.addEventListener('resize', updateAriaLabel);
  }

  setupAccessibility() {
    const slides = this.container.querySelectorAll('.slide');
    const totalSlides = slides.length;

    // Update container ARIA attributes
    this.container.setAttribute('role', 'region');
    this.container.setAttribute(
      'aria-label',
      `Content slider with ${totalSlides} slides, showing ${this.slidesPerView} at a time`,
    );
    this.container.setAttribute('tabindex', '0');

    // Create or update instructions
    let instructions = document.getElementById(
      `${this.container.id}-instructions`,
    );
    if (!instructions) {
      instructions = document.createElement('div');
      instructions.id =
        `${this.container.id}-instructions` || 'slider-instructions';
      instructions.className = 'sr-only';
      instructions.textContent =
        'Horizontal scrolling slider. Use Tab to focus on the slider, then use arrow keys or scroll horizontally to navigate between slides.';
      this.container.parentNode.insertBefore(
        instructions,
        this.container.nextSibling,
      );
    }

    this.container.setAttribute('aria-describedby', instructions.id);
  }

  setupDragInteraction() {
    let isDown = false;
    let startX, scrollLeft;

    const handleMouseDown = (e) => {
      isDown = true;
      this.container.classList.add('dragging');
      startX = e.pageX;
      scrollLeft = this.container.scrollLeft;
      this.container.style.scrollSnapType = 'none';
      this.container.style.scrollBehavior = 'auto';
    };

    const handleMouseUp = () => {
      if (!isDown) return;
      isDown = false;
      this.container.classList.remove('dragging');
      this.restoreScrollSnap();
    };

    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const walk = e.pageX - startX;
      this.container.scrollLeft = scrollLeft - walk;
    };

    this.container.addEventListener('mousedown', handleMouseDown);
    this.container.addEventListener('mouseleave', handleMouseUp);
    this.container.addEventListener('mouseup', handleMouseUp);
    this.container.addEventListener('mousemove', handleMouseMove);
  }

  restoreScrollSnap() {
    const slideWidth = this.container.querySelector('.slide').offsetWidth;
    const gap = parseInt(getComputedStyle(this.container).gap) || 16;
    const slideStep = slideWidth + gap;
    const nearestIndex = Math.round(this.container.scrollLeft / slideStep);
    const targetScroll = nearestIndex * slideStep;

    const startScroll = this.container.scrollLeft;
    const distance = targetScroll - startScroll;
    const startTime = performance.now();

    const animateScroll = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / 300, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);

      this.container.scrollLeft = startScroll + distance * easeOut;

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        this.container.style.scrollSnapType = 'x mandatory';
        this.container.style.scrollBehavior = 'smooth';
      }
    };

    requestAnimationFrame(animateScroll);
  }
}

// Auto-initialize sliders with data-slider attribute
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-slider]').forEach((element) => {
    new ResponsiveSlider(element);
  });

  // Backward compatibility - initialize existing .slider-container elements
  document
    .querySelectorAll('.slider-container:not([data-slider])')
    .forEach((element) => {
      element.setAttribute('data-slider', '');
      new ResponsiveSlider(element);
    });
});

// Export for manual initialization
window.ResponsiveSlider = ResponsiveSlider;
