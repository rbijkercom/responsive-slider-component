# Contributing to Responsive Slider Component

Thank you for your interest in contributing! This project welcomes contributions from everyone.

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Create a new branch for your feature or bug fix
4. Make your changes
5. Test your changes thoroughly
6. Submit a pull request

## Development Setup

This is a vanilla JavaScript project with no build system required:

```bash
# Clone the repository
git clone https://github.com/rbijkercom/responsive-slider-component.git
cd responsive-slider-component

# Serve locally (choose one)
python -m http.server 8000
# or
npx serve .
# or
php -S localhost:8000
```

## File Structure

- `slider.js` - Main component class
- `slider-style.css` - Component-specific styles
- `base-style.css` - Base styles and accessibility
- `test-*.html` - Test files for different scenarios
- `reusable-examples.html` - Modern usage examples

## Testing

Before submitting changes, please test:

1. **Functionality**: Test all examples in `reusable-examples.html`
2. **Accessibility**: Use screen readers and keyboard navigation
3. **Responsive**: Test on different screen sizes
4. **Browser Compatibility**: Test in Chrome, Firefox, Safari, Edge

### Accessibility Testing

- Use NVDA, JAWS, or VoiceOver to test screen reader compatibility
- Test keyboard navigation (Tab, Arrow keys, Home/End)
- Verify focus indicators are visible
- Check color contrast ratios

## Code Style

- Use semantic HTML5 elements
- Follow existing CSS naming conventions
- Use data attributes with `rb-` prefix
- Include comprehensive comments
- Maintain accessibility features

## Pull Request Process

1. Update documentation if needed
2. Add test cases for new features
3. Ensure all existing tests pass
4. Update README.md if adding new features
5. Follow the existing code style

## Reporting Issues

When reporting issues, please include:

- Browser and version
- Steps to reproduce
- Expected vs actual behavior
- Configuration used (data attributes)
- Screenshots if applicable

## Feature Requests

We welcome feature requests! Please:

- Check existing issues first
- Describe the use case clearly
- Consider backward compatibility
- Think about accessibility implications

## Code of Conduct

Be respectful and inclusive. This project is for everyone.
