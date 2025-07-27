# Slider Customization Guide

The Angular SuperUI Slider component provides multiple ways to customize the appearance of tracks, thumbs, and other elements using custom CSS classes, Tailwind CSS utilities, and CSS custom properties.

## Customization Methods

### 1. Input Properties for CSS Classes

The slider component accepts dedicated CSS class inputs for different elements:

```typescript
// Component inputs for styling
@Input() class = '';           // Overall container styling
@Input() trackClass = '';      // Custom track styling
@Input() thumbClass = '';      // Custom thumb styling  
@Input() rangeClass = '';      // Custom range fill styling
```

### 2. CSS Custom Properties (CSS Variables)

The component uses CSS custom properties that can be overridden:

```css
:host {
  /* Track styling */
  --slider-track-bg: rgb(226 232 240);
  --slider-track-height: 6px;
  --slider-track-radius: 3px;
  
  /* Thumb styling */
  --slider-thumb-size: 20px;
  --slider-thumb-bg: white;
  --slider-thumb-border: 2px solid #3b82f6;
  --slider-thumb-radius: 50%;
  --slider-thumb-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  --slider-thumb-shadow-focus: 0 0 0 2px rgb(59 130 246 / 0.5);
  --slider-thumb-shadow-hover: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  
  /* Range fill styling */
  --slider-range-bg: #3b82f6;
  
  /* Tick marks styling */
  --slider-tick-size: 3px;
  --slider-tick-bg: rgb(148 163 184);
}
```

## Usage Examples

### Basic Customization with Tailwind CSS

```html
<Slider 
  [value]="50"
  class="mb-4"
  trackClass="bg-gray-300 dark:bg-gray-600"
  thumbClass="border-purple-500 focus:ring-purple-300"
  rangeClass="bg-purple-500" />
```

### Advanced Customization with CSS Custom Properties

```html
<!-- Component template -->
<Slider 
  [value]="75"
  class="custom-slider"
  trackClass="thick-track"
  thumbClass="square-thumb" />
```

```css
/* Component styles */
.custom-slider {
  /* Override CSS custom properties */
  --slider-track-height: 8px;
  --slider-track-bg: linear-gradient(90deg, #fbbf24, #f59e0b, #d97706);
  --slider-track-radius: 4px;
  
  --slider-thumb-size: 24px;
  --slider-thumb-bg: #fbbf24;
  --slider-thumb-border: 3px solid #d97706;
  --slider-thumb-radius: 4px;
  --slider-thumb-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.3);
  
  --slider-range-bg: #f59e0b;
}

/* Additional custom styling */
.thick-track {
  height: 8px !important;
}

.square-thumb {
  /* Custom thumb pseudo-element styling */
}

.custom-slider .slider-input::-webkit-slider-thumb {
  border-radius: 4px !important;
  background: linear-gradient(135deg, #fbbf24, #f59e0b) !important;
}

.custom-slider .slider-input::-moz-range-thumb {
  border-radius: 4px !important;
  background: linear-gradient(135deg, #fbbf24, #f59e0b) !important;
}
```

### Material Design Style

```html
<Slider 
  [value]="60"
  class="material-slider"
  variant="primary" />
```

```css
.material-slider {
  --slider-track-height: 2px;
  --slider-track-bg: #e0e0e0;
  
  --slider-thumb-size: 18px;
  --slider-thumb-bg: #1976d2;
  --slider-thumb-border: none;
  --slider-thumb-shadow: 0 2px 4px 0 rgb(0 0 0 / 0.2);
  --slider-thumb-shadow-hover: 0 4px 8px 0 rgb(0 0 0 / 0.3);
  --slider-thumb-shadow-focus: 0 0 0 8px rgb(25 118 210 / 0.2);
  
  --slider-range-bg: #1976d2;
}
```

### iOS Style

```html
<Slider 
  [value]="40"
  class="ios-slider" />
```

```css
.ios-slider {
  --slider-track-height: 4px;
  --slider-track-bg: #e5e5ea;
  --slider-track-radius: 2px;
  
  --slider-thumb-size: 28px;
  --slider-thumb-bg: white;
  --slider-thumb-border: none;
  --slider-thumb-shadow: 0 2px 8px 0 rgb(0 0 0 / 0.15);
  --slider-thumb-shadow-hover: 0 4px 12px 0 rgb(0 0 0 / 0.2);
  
  --slider-range-bg: #007aff;
}
```

### Dark Theme Customization

```html
<Slider 
  [value]="80"
  class="dark-slider" />
```

```css
.dark-slider {
  --slider-track-bg: #374151;
  --slider-thumb-bg: #1f2937;
  --slider-thumb-border: 2px solid #60a5fa;
  --slider-range-bg: #60a5fa;
  --slider-tick-bg: #6b7280;
}
```

### Size Variants with Custom Styling

```html
<!-- Small variant -->
<Slider 
  [value]="30"
  size="sm"
  class="custom-small" />

<!-- Large variant -->
<Slider 
  [value]="70"
  size="lg"
  class="custom-large" />
```

```css
.custom-small {
  --slider-track-height: 3px;
  --slider-thumb-size: 14px;
}

.custom-large {
  --slider-track-height: 10px;
  --slider-thumb-size: 28px;
  --slider-thumb-border: 3px solid #3b82f6;
}
```

### Vertical Slider Customization

```html
<Slider 
  [value]="50"
  orientation="vertical"
  class="vertical-custom"
  [style.height.px]="250" />
```

```css
.vertical-custom {
  --slider-track-height: 8px; /* This becomes width in vertical mode */
  --slider-track-bg: linear-gradient(180deg, #ef4444, #f59e0b, #10b981);
  
  --slider-thumb-size: 24px;
  --slider-thumb-bg: white;
  --slider-thumb-border: 2px solid #6b7280;
}
```

### Range Slider Customization

```html
<Slider 
  [value]="[20, 80]"
  [range]="true"
  class="range-custom" />
```

```css
.range-custom {
  --slider-range-bg: linear-gradient(90deg, #8b5cf6, #a855f7);
  
  --slider-thumb-bg: #8b5cf6;
  --slider-thumb-border: 2px solid #7c3aed;
  --slider-thumb-shadow-focus: 0 0 0 3px rgb(139 92 246 / 0.3);
}

/* Style individual thumbs differently */
.range-custom .slider-input:nth-child(1)::-webkit-slider-thumb {
  background: #8b5cf6 !important;
}

.range-custom .slider-input:nth-child(2)::-webkit-slider-thumb {
  background: #a855f7 !important;
}
```

## Responsive Customization

```css
/* Mobile-specific styling */
@media (max-width: 768px) {
  .responsive-slider {
    --slider-thumb-size: 32px;
    --slider-track-height: 8px;
  }
}

/* Touch device optimization */
@media (hover: none) and (pointer: coarse) {
  .responsive-slider {
    --slider-thumb-size: 36px;
    --slider-thumb-shadow: 0 4px 8px 0 rgb(0 0 0 / 0.2);
  }
}
```

## Animation Customization

```css
.animated-slider {
  --slider-thumb-size: 20px;
}

.animated-slider .slider-input::-webkit-slider-thumb {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

.animated-slider .slider-input::-moz-range-thumb {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

.animated-slider .slider-input:hover::-webkit-slider-thumb {
  transform: scale(1.2) !important;
}

.animated-slider .slider-input:hover::-moz-range-thumb {
  transform: scale(1.2) !important;
}
```

## Best Practices

1. **Use CSS Custom Properties**: Prefer CSS custom properties for consistent theming across your application.

2. **Leverage Tailwind Classes**: Use `trackClass`, `thumbClass`, and `rangeClass` inputs with Tailwind utilities for rapid prototyping.

3. **Respect Accessibility**: Ensure sufficient contrast and focus indicators when customizing colors.

4. **Test Cross-Browser**: Thumb styling uses different pseudo-elements (`-webkit-slider-thumb` vs `-moz-range-thumb`), so test in different browsers.

5. **Mobile Considerations**: Increase thumb size for touch devices to improve usability.

6. **Performance**: Avoid complex animations or gradients if performance is critical.

7. **Consistency**: Use design tokens or CSS custom properties to maintain consistent styling across components.

## Advanced Techniques

### Using CSS-in-JS Libraries

```typescript
// With styled-components or similar
const StyledSlider = styled(Slider)`
  --slider-thumb-bg: ${props => props.theme.primary};
  --slider-range-bg: ${props => props.theme.primary};
  --slider-track-bg: ${props => props.theme.gray200};
`;
```

### Dynamic Theming

```typescript
@Component({
  template: `
    <Slider 
      [value]="value"
      [style]="getSliderStyles()"
      class="dynamic-slider" />
  `
})
export class MyComponent {
  theme = 'blue'; // or 'red', 'green', etc.
  
  getSliderStyles() {
    const themes = {
      blue: {
        '--slider-thumb-bg': '#3b82f6',
        '--slider-range-bg': '#3b82f6',
      },
      red: {
        '--slider-thumb-bg': '#ef4444',
        '--slider-range-bg': '#ef4444',
      },
      green: {
        '--slider-thumb-bg': '#10b981',
        '--slider-range-bg': '#10b981',
      }
    };
    
    return themes[this.theme] || themes.blue;
  }
}
```

This customization system provides maximum flexibility while maintaining good performance and accessibility standards.
