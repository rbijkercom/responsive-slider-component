document.querySelectorAll('.slider-container').forEach((slider) => {
  let isDown = false;
  let startX, scrollLeft;

  const handleMouseDown = (e) => {
    isDown = true;
    slider.classList.add('dragging');
    startX = e.pageX;
    scrollLeft = slider.scrollLeft;
    slider.style.scrollSnapType = 'none';
    slider.style.scrollBehavior = 'auto';
  };

  const handleMouseUp = () => {
    if (!isDown) return;
    isDown = false;
    slider.classList.remove('dragging');
    restoreScrollSnap();
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const walk = e.pageX - startX;
    slider.scrollLeft = scrollLeft - walk;
  };

  const restoreScrollSnap = () => {
    const slideWidth = slider.querySelector('.slide').offsetWidth;
    const gap = parseInt(getComputedStyle(slider).gap) || 16;
    const slideStep = slideWidth + gap;
    const nearestIndex = Math.round(slider.scrollLeft / slideStep);
    const targetScroll = nearestIndex * slideStep;

    const startScroll = slider.scrollLeft;
    const distance = targetScroll - startScroll;
    const startTime = performance.now();

    const animateScroll = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / 300, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);

      slider.scrollLeft = startScroll + distance * easeOut;

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        slider.style.scrollSnapType = 'x mandatory';
        slider.style.scrollBehavior = 'smooth';
      }
    };

    requestAnimationFrame(animateScroll);
  };

  slider.addEventListener('mousedown', handleMouseDown);
  slider.addEventListener('mouseleave', handleMouseUp);
  slider.addEventListener('mouseup', handleMouseUp);
  slider.addEventListener('mousemove', handleMouseMove);
});
