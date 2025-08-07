# Slider 🎚️

Interactive slider component for single values and ranges with smooth controls, full accessibility, and keyboard navigation.

## Features

- 🎯 **Single & Range Values** - Support for both single value and dual-thumb range selection
- 🎨 **6 Color Variants** - Default, Primary, Secondary, Success, Warning, Destructive
- 📏 **3 Sizes** - Small, Default, Large
- ⌨️ **Keyboard Navigation** - Full keyboard support with continuous movement
- ♿ **Accessibility** - ARIA compliant with screen reader support
- 📱 **Touch Support** - Optimized for mobile and touch interactions
- 🎭 **Custom Styling** - Tick marks, labels, and tooltips
- 🔧 **TypeScript** - Full type safety with Angular forms integration
- 🎛️ **Advanced Features** - Custom steps, inverted direction, and disabled states

## Installation

Initialize Angular SuperUI in your project:

```bash
ngsui init
```

Add the Slider component:

```bash
ngsui add slider
```

## Usage

Import the Slider component in your Angular component:

```typescript
import { Component, signal } from '@angular/core';
import { Slider } from '@lib/slider';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [Slider],
  template: `
    <Slider 
      [min]="0" 
      [max]="100" 
      [(ngModel)]="value" 
    />
  `
})
export class ExampleComponent {
  value = signal(50);
}
```

## Examples

### Basic Single Value Slider

```typescript
@Component({
  template: `
    <div class="flex flex-col gap-2">
      <label class="text-sm font-medium text-gray-700">
        Volume: {{singleValue()}}%
      </label>
      <Slider
        [min]="0"
        [max]="100"
        [step]="1"
        [(ngModel)]="singleValue"
        class="w-full"
        variant="primary"
      />
    </div>
  `
})
export class BasicSliderExample {
  singleValue = signal(50);
}
```

### Range Slider

```typescript
@Component({
  template: `
    <div class="flex flex-col gap-2">
      <label class="text-sm font-medium text-gray-700">
        Price Range: {{formatPriceRange()}}
      </label>
      <Slider
        [min]="0"
        [max]="1000"
        [step]="10"
        [range]="true"
        [(ngModel)]="rangeValue"
        class="w-full"
        variant="success"
      />
    </div>
  `
})
export class RangeSliderExample {
  rangeValue = signal([200, 800]);

  formatPriceRange(): string {
    const values = this.rangeValue();
    return `$${values[0]} - $${values[1]}`;
  }
}
```

### Color Variants

```typescript
@Component({
  template: `
    <div class="flex flex-col gap-4">
      <!-- Default -->
      <div class="flex flex-col gap-2">
        <span class="text-sm text-gray-600">Default</span>
        <Slider
          [min]="0"
          [max]="100"
          [value]="50"
          variant="default"
          class="w-full"
        />
      </div>

      <!-- Primary -->
      <div class="flex flex-col gap-2">
        <span class="text-sm text-gray-600">Primary</span>
        <Slider
          [min]="0"
          [max]="100"
          [value]="60"
          variant="primary"
          class="w-full"
        />
      </div>

      <!-- Success -->
      <div class="flex flex-col gap-2">
        <span class="text-sm text-gray-600">Success</span>
        <Slider
          [min]="0"
          [max]="100"
          [value]="70"
          variant="success"
          class="w-full"
        />
      </div>

      <!-- Warning -->
      <div class="flex flex-col gap-2">
        <span class="text-sm text-gray-600">Warning</span>
        <Slider
          [min]="0"
          [max]="100"
          [value]="80"
          variant="warning"
          class="w-full"
        />
      </div>

      <!-- Destructive -->
      <div class="flex flex-col gap-2">
        <span class="text-sm text-gray-600">Destructive</span>
        <Slider
          [min]="0"
          [max]="100"
          [value]="40"
          variant="destructive"
          class="w-full"
        />
      </div>
    </div>
  `
})
export class VariantsExample {}
```

### Size Variants

```typescript
@Component({
  template: `
    <div class="flex flex-col gap-6">
      <!-- Small -->
      <div class="flex flex-col gap-2">
        <span class="text-sm text-gray-600">Small</span>
        <Slider
          [min]="0"
          [max]="100"
          [value]="30"
          size="sm"
          variant="primary"
          class="w-full"
        />
      </div>

      <!-- Default -->
      <div class="flex flex-col gap-2">
        <span class="text-sm text-gray-600">Default</span>
        <Slider
          [min]="0"
          [max]="100"
          [value]="50"
          size="default"
          variant="primary"
          class="w-full"
        />
      </div>

      <!-- Large -->
      <div class="flex flex-col gap-2">
        <span class="text-sm text-gray-600">Large</span>
        <Slider
          [min]="0"
          [max]="100"
          [value]="70"
          size="lg"
          variant="primary"
          class="w-full"
        />
      </div>
    </div>
  `
})
export class SizesExample {}
```

### Form Integration

```typescript
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  template: `
    <form [formGroup]="reactiveForm" class="flex flex-col gap-6">
      <div class="flex flex-col gap-3">
        <label class="text-sm font-medium text-gray-700">
          Budget: {{getBudgetValue()}}
        </label>
        <Slider
          [min]="0"
          [max]="10000"
          [step]="100"
          formControlName="budget"
          variant="success"
          class="w-full"
        />
      </div>

      <div class="flex flex-col gap-3">
        <label class="text-sm font-medium text-gray-700">
          Priority Level: {{getPriorityValue()}}
        </label>
        <Slider
          [min]="1"
          [max]="10"
          [step]="1"
          formControlName="priority"
          variant="primary"
          class="w-full"
        />
      </div>

      <div class="rounded-lg bg-green-50 p-3">
        <p class="text-sm text-green-700">
          <strong>Form Values:</strong><br>
          Budget: {{getBudgetValue()}}<br>
          Priority: {{getPriorityValue()}}/10<br>
          Valid: {{reactiveForm.valid ? 'Yes' : 'No'}}
        </p>
      </div>
    </form>
  `
})
export class FormIntegrationExample {
  reactiveForm = new FormGroup({
    budget: new FormControl(5000),
    priority: new FormControl(5)
  });

  getBudgetValue(): string {
    const value = this.reactiveForm.get('budget')?.value;
    return `$${value}`;
  }

  getPriorityValue(): number {
    return this.reactiveForm.get('priority')?.value || 0;
  }
}
```

### Advanced Features

```typescript
@Component({
  template: `
    <div class="flex flex-col gap-8">
      <!-- With Ticks and Labels -->
      <div class="flex flex-col gap-2">
        <label>Temperature with Ticks</label>
        <Slider
          [min]="-10"
          [max]="40"
          [step]="5"
          [showTicks]="true"
          [showLabels]="true"
          [ticks]="temperatureTicks"
          [(ngModel)]="temperature"
          variant="primary"
          class="w-full"
        />
      </div>

      <!-- Inverted Direction -->
      <div class="flex flex-col gap-2">
        <label>Inverted Slider</label>
        <Slider
          [min]="0"
          [max]="100"
          [inverted]="true"
          [(ngModel)]="invertedValue"
          variant="warning"
          class="w-full"
        />
      </div>

      <!-- Disabled State -->
      <div class="flex flex-col gap-2">
        <label>Disabled Slider</label>
        <Slider
          [min]="0"
          [max]="100"
          [value]="25"
          [disabled]="true"
          variant="secondary"
          class="w-full"
        />
      </div>

      <!-- Custom Step -->
      <div class="flex flex-col gap-2">
        <label>Custom Step (0.1)</label>
        <Slider
          [min]="0"
          [max]="5"
          [step]="0.1"
          [(ngModel)]="preciseValue"
          variant="success"
          class="w-full"
        />
      </div>
    </div>
  `
})
export class AdvancedExample {
  temperatureTicks = [-10, -5, 0, 10, 20, 30, 40];
  temperature = signal(20);
  invertedValue = signal(75);
  preciseValue = signal(2.5);
}
```

## API Reference

### Slider Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `min` | `number` | `0` | Minimum value of the slider |
| `max` | `number` | `100` | Maximum value of the slider |
| `step` | `number` | `1` | Step increment for value changes |
| `value` | `number \| number[]` | - | Current value(s) of the slider |
| `range` | `boolean` | `false` | Enable dual-thumb range selection |
| `size` | `'sm' \| 'default' \| 'lg'` | `'default'` | Size variant of the slider |
| `variant` | `'default' \| 'primary' \| 'secondary' \| 'success' \| 'warning' \| 'destructive'` | `'default'` | Color variant |
| `disabled` | `boolean` | `false` | Disable the slider |
| `showTicks` | `boolean` | `false` | Show tick marks on the slider |
| `showLabels` | `boolean` | `false` | Show labels on tick marks |
| `ticks` | `number[]` | `[]` | Custom positions for tick marks |
| `inverted` | `boolean` | `false` | Invert the slider direction |
| `ariaLabel` | `string` | `'Slider'` | ARIA label for accessibility |
| `class` | `string` | `''` | Additional CSS classes |

### Slider Events

| Event | Type | Description |
|-------|------|-------------|
| `valueChange` | `EventEmitter<number \| number[]>` | Emitted when the slider value changes |
| `thumbFocus` | `EventEmitter<{index: number, value: number}>` | Emitted when a thumb receives focus |
| `thumbBlur` | `EventEmitter<{index: number, value: number}>` | Emitted when a thumb loses focus |

### Slider Methods

The slider component implements `ControlValueAccessor` and supports:

- `writeValue(value: number | number[]): void`
- `registerOnChange(fn: Function): void`
- `registerOnTouched(fn: Function): void`
- `setDisabledState(isDisabled: boolean): void`

## Keyboard Navigation

The slider component provides comprehensive keyboard support:

| Key | Action |
|-----|--------|
| `Tab/Shift+Tab` | Set focus on the slider |
| `←/→` | Adjust value |
| `Page Up/Down` | Large increments (10% of range) |
| `Home/End` | Jump to minimum/maximum values |
| `Escape` | Release focus from the slider |

### Continuous Navigation

- **Hold arrow keys** for continuous movement
- **Focus preservation** during rapid navigation
- **Smooth value updates** with proper throttling

## Accessibility Features

The slider component is built with accessibility in mind:

### ARIA Support

- `role="slider"` with proper ARIA attributes
- `aria-valuemin`, `aria-valuemax`, `aria-valuenow`
- `aria-label` and `aria-describedby` for context
- Live regions for value announcements

### Screen Reader Support

- **Value announcements** when slider values change
- **Navigation instructions** provided to screen readers
- **Range descriptions** for dual-thumb sliders
- **Throttled announcements** during rapid changes

### Visual Accessibility

- **High contrast mode** support
- **Focus indicators** with visible outlines
- **Keyboard focus management** with proper blur handling
- **Touch-friendly** sizing for mobile devices

### Example with Full Accessibility

```typescript
@Component({
  template: `
    <div class="flex flex-col gap-2">
      <label class="text-sm font-medium text-gray-700">
        Temperature Range: {{formatTemperatureRange()}}
      </label>
      <Slider
        [min]="0"
        [max]="200"
        [step]="2"
        [range]="true"
        [(ngModel)]="temperatureRange"
        class="w-full"
        variant="success"
        ariaLabel="Temperature range selector in Fahrenheit"
      />
      <p class="text-xs text-gray-500">
        Use Tab to focus, arrow keys to adjust, Page Up/Down for large steps
      </p>
    </div>
  `
})
export class AccessibilityExample {
  temperatureRange = signal([40, 160]);

  formatTemperatureRange(): string {
    const values = this.temperatureRange();
    return `${values[0]}°F - ${values[1]}°F`;
  }
}
```

## Working with Forms

The slider component seamlessly integrates with Angular forms:

### Template-Driven Forms

```typescript
@Component({
  template: `
    <form #form="ngForm">
      <Slider
        [(ngModel)]="volume"
        name="volume"
        [min]="0"
        [max]="100"
        required
      />
    </form>
  `
})
export class TemplateDrivenExample {
  volume = 50;
}
```

### Reactive Forms

```typescript
@Component({
  template: `
    <form [formGroup]="form">
      <Slider
        formControlName="brightness"
        [min]="0"
        [max]="100"
      />
    </form>
  `
})
export class ReactiveFormExample {
  form = new FormGroup({
    brightness: new FormControl(75, [Validators.required])
  });
}
```

### Validation

```typescript
@Component({
  template: `
    <form [formGroup]="form">
      <div class="flex flex-col gap-2">
        <Slider
          formControlName="score"
          [min]="0"
          [max]="100"
          variant="primary"
        />
        <div *ngIf="form.get('score')?.errors?.['min']" 
             class="text-red-500 text-sm">
          Score must be at least 10
        </div>
      </div>
    </form>
  `
})
export class ValidationExample {
  form = new FormGroup({
    score: new FormControl(5, [Validators.min(10)])
  });
}
```

## Styling and Customization

The slider component provides extensive customization options through CSS classes, custom properties, and Tailwind CSS utilities.

### Input Properties for Custom Classes

The component accepts dedicated CSS class inputs for different elements:

```typescript
<Slider 
  [value]="50"
  class="mb-4"                    // Overall container styling
  trackClass="bg-gray-300"        // Custom track styling
  thumbClass="border-purple-500"  // Custom thumb styling  
  rangeClass="bg-purple-500"      // Custom range fill styling
/>
```

### CSS Custom Properties

The slider component supports CSS custom properties for advanced styling:

```css
.custom-slider {
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

### Comprehensive Customization Guide

For detailed examples and advanced customization techniques, see the [Slider Customization Guide](./slider-customization.md).

### Quick Examples

#### Material Design Style

```html
<Slider 
  [value]="60"
  class="material-slider"
  variant="primary" />
```

```css
.material-slider {
  --slider-track-height: 2px;
  --slider-thumb-size: 18px;
  --slider-thumb-bg: #1976d2;
  --slider-thumb-border: none;
  --slider-range-bg: #1976d2;
}
```

#### iOS Style

```html
<Slider 
  [value]="40"
  class="ios-slider" />
```

```css
.ios-slider {
  --slider-track-height: 4px;
  --slider-thumb-size: 28px;
  --slider-thumb-bg: white;
  --slider-thumb-border: none;
  --slider-thumb-shadow: 0 2px 8px 0 rgb(0 0 0 / 0.15);
  --slider-range-bg: #007aff;
}
```

### Size Customization

```typescript
@Component({
  template: `
    <!-- Custom width for horizontal sliders -->
    <Slider
      class="w-96"
      variant="success"
    />
  `
})
export class CustomSizeExample {}
```

### Dark Mode Support

The slider automatically adapts to dark mode when using Tailwind CSS dark mode classes:

```typescript
@Component({
  template: `
    <div class="dark">
      <Slider
        [min]="0"
        [max]="100"
        [(ngModel)]="value"
        variant="primary"
      />
    </div>
  `
})
export class DarkModeExample {
  value = signal(50);
}
```

## Performance Considerations

### Optimizations

- **Signal-based state management** for efficient updates
- **Throttled value announcements** for screen readers
- **Optimized rendering** with OnPush change detection
- **Minimal DOM manipulation** during drag operations

### Best Practices

1. **Use appropriate step values** to prevent excessive updates
2. **Throttle external value updates** when binding to frequently changing data
3. **Avoid complex calculations** in value formatters
4. **Use OnPush** change detection for parent components

## Migration Guide

### From Other Slider Libraries

```typescript
// Before (other library)
<input type="range" 
       min="0" 
       max="100" 
       [(ngModel)]="value">

// After (Angular SuperUI)
<Slider
  [min]="0"
  [max]="100"
  [(ngModel)]="value"
  variant="primary"
/>
```

### Upgrading Versions

When upgrading the slider component:

1. Update your imports:

```typescript
// Old import
import { Slider } from 'angular-superui/slider';

// New import
import { Slider } from '@lib/slider';
```

1. Check for breaking changes in the API

1. Update any custom CSS to use new class names

1. Test accessibility features with screen readers

## Troubleshooting

### Common Issues

**Q: Slider doesn't respond to keyboard input**
A: Ensure the slider has focus by clicking on it or using Tab navigation.

**Q: Range slider thumbs cross over each other**
A: This is prevented automatically. The component ensures thumbs maintain proper order.

**Q: Values not updating in forms**
A: Verify that you're using proper form binding (`[(ngModel)]` or `formControlName`).

**Q: Accessibility announcements not working**
A: Ensure screen readers are enabled and the component has proper ARIA labels.

### Debug Mode

Enable debug mode for development:

```typescript
@Component({
  template: `
    <Slider
      [min]="0"
      [max]="100"
      [(ngModel)]="value"
      (valueChange)="onValueChange($event)"
      (thumbFocus)="onThumbFocus($event)"
      (thumbBlur)="onThumbBlur($event)"
    />
  `
})
export class DebugExample {
  value = signal(50);

  onValueChange(value: number | number[]) {
    console.log('Value changed:', value);
  }

  onThumbFocus(event: {index: number, value: number}) {
    console.log('Thumb focused:', event);
  }

  onThumbBlur(event: {index: number, value: number}) {
    console.log('Thumb blurred:', event);
  }
}
```

## Examples Repository

Find more examples and advanced use cases in our [examples repository](https://github.com/angular-superui/examples/tree/main/slider).

## Contributing

We welcome contributions! Please see our [contributing guide](../../CONTRIBUTING.md) for details on how to submit improvements to the slider component.

## License

This component is part of Angular SuperUI and is licensed under the MIT License.
