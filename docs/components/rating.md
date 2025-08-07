# Rating Component ⭐

Interactive star rating component with half-star support, animations, keyboard navigation, and full accessibility features.

## Features

- ⭐ **Star Ratings** - Beautiful interactive star rating system
- 🌗 **Half-Star Support** - Precise ratings with 0.5 increments
- 🎯 **6 Variants** - Default, Success, Warning, Destructive, Info, Muted
- 📏 **4 Sizes** - Small, Default, Large, Extra Large
- ⌨️ **Keyboard Navigation** - Full keyboard support with arrow keys
- ♿ **Accessibility** - WCAG 2.1 AA compliant with ARIA attributes
- 🎨 **Animations** - Smooth hover and selection animations
- 📱 **Mobile Optimized** - Touch-friendly with responsive design
- 🔧 **Form Integration** - Full Angular ReactiveFormsModule support
- 🎭 **Custom Icons** - Support for custom star icons
- 🌙 **Dark Mode** - Built-in dark mode support

## Installation

Initialize Angular SuperUI in your project:

```bash
ngsui init
```

Add the Rating component:

```bash
ngsui add rating
```

## Usage

Import the Rating component in your Angular component:

```typescript
import { Component, signal } from '@angular/core';
import { Rating } from 'angular-superui';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [Rating],
  template: `
    <Rating
      [value]="rating()"
      (valueChange)="rating.set($event)"
    />
  `
})
export class ExampleComponent {
  rating = signal(0);
}
```

## Examples

### Basic Rating

```typescript
@Component({
  template: `
    <Rating
      [value]="rating()"
      (valueChange)="rating.set($event)"
    />
  `
})
export class BasicExample {
  rating = signal(3);
}
```

### With Value Display

```typescript
@Component({
  template: `
    <Rating
      [value]="rating()"
      (valueChange)="rating.set($event)"
      [showValue]="true"
    />
  `
})
export class ValueDisplayExample {
  rating = signal(4.5);
}
```

### Half-Star Support

```typescript
@Component({
  template: `
    <Rating
      [value]="rating()"
      (valueChange)="rating.set($event)"
      [allowHalf]="true"
      [showValue]="true"
    />
  `
})
export class HalfStarExample {
  rating = signal(3.5);
}
```

### Variants

#### Default (Amber)

```typescript
@Component({
  template: `
    <Rating
      [value]="4"
      variant="default"
    />
  `
})
```

#### Success (Green)

```typescript
@Component({
  template: `
    <Rating
      [value]="5"
      variant="success"
    />
  `
})
```

#### Warning (Yellow)

```typescript
@Component({
  template: `
    <Rating
      [value]="3"
      variant="warning"
    />
  `
})
```

#### Destructive (Red)

```typescript
@Component({
  template: `
    <Rating
      [value]="2"
      variant="destructive"
    />
  `
})
```

#### Info (Blue)

```typescript
@Component({
  template: `
    <Rating
      [value]="4"
      variant="info"
    />
  `
})
```

#### Muted (Gray)

```typescript
@Component({
  template: `
    <Rating
      [value]="3"
      variant="muted"
    />
  `
})
```

### Sizes

#### Small

```typescript
@Component({
  template: `
    <Rating
      [value]="4"
      size="sm"
    />
  `
})
```

#### Default

```typescript
@Component({
  template: `
    <Rating
      [value]="4"
      size="default"
    />
  `
})
```

#### Large

```typescript
@Component({
  template: `
    <Rating
      [value]="4"
      size="lg"
    />
  `
})
```

#### Extra Large

```typescript
@Component({
  template: `
    <Rating
      [value]="4"
      size="xl"
    />
  `
})
```

### Custom Maximum Stars

```typescript
@Component({
  template: `
    <Rating
      [value]="rating()"
      (valueChange)="rating.set($event)"
      [max]="10"
      [showValue]="true"
    />
  `
})
export class CustomMaxExample {
  rating = signal(7);
}
```

### Readonly Rating

```typescript
@Component({
  template: `
    <Rating
      [value]="4.5"
      [readonly]="true"
      [allowHalf]="true"
      [showValue]="true"
    />
  `
})
```

### Disabled Rating

```typescript
@Component({
  template: `
    <Rating
      [value]="3"
      [disabled]="true"
    />
  `
})
```

### With Description

```typescript
@Component({
  template: `
    <Rating
      [value]="rating()"
      (valueChange)="rating.set($event)"
      description="Rate your experience"
      ariaLabel="Experience rating"
    />
  `
})
export class DescriptionExample {
  rating = signal(0);
}
```

### Custom Clear Behavior

```typescript
@Component({
  template: `
    <Rating
      [value]="rating()"
      (valueChange)="rating.set($event)"
      [allowClear]="true"
      [clearOnReclick]="true"
    />
  `
})
export class ClearExample {
  rating = signal(3);
}
```

### With Error State

```typescript
@Component({
  template: `
    <Rating
      [value]="rating()"
      (valueChange)="rating.set($event)"
      [error]="rating() === 0 ? 'Please provide a rating' : ''"
      [required]="true"
    />
  `
})
export class ErrorExample {
  rating = signal(0);
}
```

## Form Integration

### Reactive Forms

```typescript
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Rating } from 'angular-superui';

@Component({
  selector: 'app-form-example',
  standalone: true,
  imports: [ReactiveFormsModule, Rating],
  template: `
    <form [formGroup]="reviewForm" (ngSubmit)="onSubmit()">
      <div class="space-y-6">
        <!-- Overall Rating -->
        <div>
          <label class="block text-sm font-medium mb-2">
            Overall Rating
          </label>
          <Rating
            formControlName="overall"
            [showValue]="true"
            [required]="true"
            ariaLabel="Overall rating"
            description="Rate your overall experience"
          />
        </div>

        <!-- Quality Rating -->
        <div>
          <label class="block text-sm font-medium mb-2">
            Quality
          </label>
          <Rating
            formControlName="quality"
            [showValue]="true"
            [allowHalf]="true"
            variant="success"
            ariaLabel="Quality rating"
            description="Rate the quality of the product/service"
          />
        </div>

        <!-- Service Rating -->
        <div>
          <label class="block text-sm font-medium mb-2">
            Customer Service
          </label>
          <Rating
            formControlName="service"
            [showValue]="true"
            variant="info"
            ariaLabel="Service rating"
            description="Rate the customer service experience"
          />
        </div>

        <!-- Value Rating -->
        <div>
          <label class="block text-sm font-medium mb-2">
            Value for Money
          </label>
          <Rating
            formControlName="value"
            [showValue]="true"
            variant="warning"
            ariaLabel="Value rating"
            description="Rate the value for money"
          />
        </div>

        <button
          type="submit"
          [disabled]="reviewForm.invalid"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          Submit Review
        </button>
      </div>
    </form>

    <!-- Form Values Debug -->
    <div class="mt-8 p-4 bg-gray-50 rounded-lg">
      <h4 class="text-sm font-medium mb-2">Form Values:</h4>
      <pre class="text-xs text-gray-600">{{ reviewForm.value | json }}</pre>
    </div>
  `
})
export class FormExampleComponent {
  private fb = inject(FormBuilder);

  reviewForm: FormGroup = this.fb.group({
    overall: [0, [Validators.required, Validators.min(1)]],
    quality: [0],
    service: [0],
    value: [0]
  });

  onSubmit() {
    if (this.reviewForm.valid) {
      console.log('Form submitted:', this.reviewForm.value);
    }
  }
}
```

### Template-Driven Forms

```typescript
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Rating } from 'angular-superui';

@Component({
  selector: 'app-template-form',
  standalone: true,
  imports: [FormsModule, Rating],
  template: `
    <form #form="ngForm" (ngSubmit)="onSubmit()">
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-2">
            Rating
          </label>
          <Rating
            [(ngModel)]="rating"
            name="rating"
            #ratingControl="ngModel"
            [required]="true"
            [showValue]="true"
          />
          <div *ngIf="ratingControl.invalid && ratingControl.touched" 
               class="text-red-500 text-sm mt-1">
            Rating is required
          </div>
        </div>

        <button
          type="submit"
          [disabled]="form.invalid"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Submit
        </button>
      </div>
    </form>
  `
})
export class TemplateFormComponent {
  rating = 0;

  onSubmit() {
    console.log('Rating:', this.rating);
  }
}
```

## Events

### Change Events

```typescript
import { Component, signal } from '@angular/core';
import { Rating, type RatingChangeEvent } from 'angular-superui';

@Component({
  selector: 'app-events-example',
  standalone: true,
  imports: [Rating],
  template: `
    <div class="space-y-4">
      <Rating
        [value]="rating()"
        (valueChange)="rating.set($event)"
        (change)="onRatingChange($event)"
        (hover)="onRatingHover($event)"
        (focus)="onRatingFocus($event)"
        (blur)="onRatingBlur()"
        (clear)="onRatingClear()"
        [showValue]="true"
        [allowClear]="true"
      />

      <div class="text-sm text-gray-600">
        <div>Current Rating: {{ rating() }}</div>
        <div>Last Event: {{ lastEvent() }}</div>
      </div>
    </div>
  `
})
export class EventsExampleComponent {
  rating = signal(0);
  lastEvent = signal('');

  onRatingChange(event: RatingChangeEvent) {
    this.lastEvent.set(`Changed from ${event.previousValue} to ${event.value}`);
    console.log('Rating changed:', event);
  }

  onRatingHover(value: number) {
    this.lastEvent.set(`Hovering over ${value} stars`);
  }

  onRatingFocus(value: number) {
    this.lastEvent.set(`Focused on ${value} stars`);
  }

  onRatingBlur() {
    this.lastEvent.set('Rating lost focus');
  }

  onRatingClear() {
    this.lastEvent.set('Rating cleared');
  }
}
```

## Keyboard Navigation

The Rating component supports full keyboard navigation:

- **Arrow Keys** (←→↑↓): Navigate between stars
- **Enter/Space**: Select current rating
- **Home**: Move to first star
- **End**: Move to last star
- **Delete/Backspace**: Clear rating (if `allowClear` is enabled)

```typescript
@Component({
  template: `
    <div class="space-y-4">
      <div class="text-sm text-gray-600 space-y-1">
        <div><kbd class="bg-gray-200 px-2 py-1 rounded text-xs">←→</kbd> Navigate stars</div>
        <div><kbd class="bg-gray-200 px-2 py-1 rounded text-xs">Enter/Space</kbd> Select rating</div>
        <div><kbd class="bg-gray-200 px-2 py-1 rounded text-xs">Home/End</kbd> First/Last star</div>
        <div><kbd class="bg-gray-200 px-2 py-1 rounded text-xs">Delete</kbd> Clear rating</div>
      </div>
      
      <Rating
        [value]="rating()"
        (valueChange)="rating.set($event)"
        [allowClear]="true"
        [showValue]="true"
        description="Focus and try keyboard navigation"
      />
    </div>
  `
})
export class KeyboardExampleComponent {
  rating = signal(0);
}
```

## Animations

### Disable Animations

```typescript
@Component({
  template: `
    <Rating
      [value]="4"
      [animateOnChange]="false"
      [showGlow]="false"
    />
  `
})
```

### Custom Animation States

The component includes several built-in animations:

- **Hover scaling** for interactive feedback
- **Fill animations** when rating changes  
- **Glow effects** for filled stars
- **Smooth transitions** between states

## Accessibility

### ARIA Attributes

```typescript
@Component({
  template: `
    <Rating
      [value]="rating()"
      (valueChange)="rating.set($event)"
      ariaLabel="Product rating"
      ariaLabelledBy="product-rating-label"
      ariaDescribedBy="rating-help"
      description="Rate this product from 1 to 5 stars"
    />
  `
})
export class AccessibilityExample {
  rating = signal(0);
}
```

### Screen Reader Support

The component provides comprehensive screen reader support:

- Proper ARIA roles and properties
- Descriptive labels for each star
- Current value announcements
- State change notifications

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | `0` | Current rating value |
| `max` | `number` | `5` | Maximum number of stars |
| `precision` | `number` | `1` | Precision for rating values (1 = whole numbers, 0.5 = half stars) |
| `allowHalf` | `boolean` | `false` | Enable half-star ratings |
| `readonly` | `boolean` | `false` | Make rating non-interactive |
| `disabled` | `boolean` | `false` | Disable the rating component |
| `required` | `boolean` | `false` | Mark as required for form validation |
| `variant` | `'default' \| 'success' \| 'warning' \| 'destructive' \| 'info' \| 'muted'` | `'default'` | Visual variant |
| `size` | `'sm' \| 'default' \| 'lg' \| 'xl'` | `'default'` | Size variant |
| `showValue` | `boolean` | `false` | Display numeric value next to stars |
| `showGlow` | `boolean` | `true` | Enable glow effect on filled stars |
| `allowClear` | `boolean` | `false` | Allow clearing the rating |
| `clearOnReclick` | `boolean` | `true` | Clear rating when clicking the same star |
| `highlightSelectedOnly` | `boolean` | `false` | Only highlight selected stars, not trailing ones |
| `reverseDirection` | `boolean` | `false` | Reverse star display direction (RTL support) |
| `animateOnChange` | `boolean` | `true` | Enable change animations |
| `customIcon` | `string` | `''` | Custom HTML icon to use instead of stars |
| `name` | `string` | `''` | Name attribute for form integration |
| `id` | `string` | auto-generated | Unique identifier |
| `ariaLabel` | `string` | `''` | Accessible label |
| `ariaLabelledBy` | `string` | `''` | ID of element that labels the rating |
| `ariaDescribedBy` | `string` | `''` | ID of element that describes the rating |
| `description` | `string` | `''` | Helper text displayed below the rating |
| `error` | `string` | `''` | Error message |
| `customClass` | `string` | `''` | Additional CSS classes |

### API Events

| Event | Type | Description |
|-------|------|-------------|
| `valueChange` | `number` | Emitted when rating value changes |
| `change` | `RatingChangeEvent` | Emitted with previous and current values |
| `hover` | `number` | Emitted when hovering over stars |
| `focus` | `number` | Emitted when focusing on a star |
| `blur` | `void` | Emitted when rating loses focus |
| `clear` | `void` | Emitted when rating is cleared |

### Types

```typescript
export interface RatingChangeEvent {
  value: number;
  previousValue: number;
}

export interface Star {
  index: number;
  value: number;
  filled: boolean;
  half: boolean;
  hovered: boolean;
  focused: boolean;
  animationState: 'filled' | 'empty';
}
```

## Styling

### CSS Variables

The component uses Tailwind CSS classes and can be customized using CSS variables:

```css
.rating-component {
  --rating-star-size: 1.25rem;
  --rating-star-gap: 0.25rem;
  --rating-color-default: rgb(245 158 11); /* amber-500 */
  --rating-color-success: rgb(34 197 94); /* green-500 */
  --rating-color-warning: rgb(234 179 8); /* yellow-500 */
  --rating-color-destructive: rgb(239 68 68); /* red-500 */
  --rating-color-info: rgb(59 130 246); /* blue-500 */
  --rating-color-muted: rgb(107 114 128); /* gray-500 */
}
```

### Custom Styling

```typescript
@Component({
  template: `
    <Rating
      [value]="4"
      customClass="my-custom-rating"
    />
  `,
  styles: [`
    :host ::ng-deep .my-custom-rating {
      /* Custom rating styles */
      .rating-star {
        transition: all 0.3s ease;
      }
      
      .rating-star:hover {
        transform: scale(1.2);
      }
    }
  `]
})
```

## Best Practices

### 1. Meaningful Labels

Always provide descriptive labels for accessibility:

```typescript
@Component({
  template: `
    <Rating
      [value]="rating()"
      (valueChange)="rating.set($event)"
      ariaLabel="Rate the quality of this product"
      description="Your rating helps other customers"
    />
  `
})
```

### 2. Form Validation

Use proper validation for required ratings:

```typescript
@Component({
  template: `
    <Rating
      formControlName="rating"
      [required]="true"
      [error]="getErrorMessage()"
    />
  `
})
export class ValidatedRatingComponent {
  getErrorMessage(): string {
    const control = this.form.get('rating');
    if (control?.errors?.['required'] && control.touched) {
      return 'Please provide a rating';
    }
    if (control?.errors?.['min'] && control.touched) {
      return 'Rating must be at least 1 star';
    }
    return '';
  }
}
```

### 3. Responsive Design

Consider different sizes for different screen sizes:

```typescript
@Component({
  template: `
    <Rating
      [value]="rating()"
      (valueChange)="rating.set($event)"
      [size]="isMobile ? 'sm' : 'default'"
    />
  `
})
```

### 4. Loading States

Handle loading states appropriately:

```typescript
@Component({
  template: `
    <Rating
      [value]="rating()"
      (valueChange)="onRatingChange($event)"
      [disabled]="isLoading()"
    />
  `
})
export class LoadingRatingComponent {
  isLoading = signal(false);
  rating = signal(0);

  async onRatingChange(value: number) {
    this.isLoading.set(true);
    try {
      await this.saveRating(value);
      this.rating.set(value);
    } catch (error) {
      // Handle error
    } finally {
      this.isLoading.set(false);
    }
  }
}
```

## Common Issues

### Issue: Half-stars not displaying correctly

**Solution**: Ensure `allowHalf` is set to `true` and the value is a valid half-star value:

```typescript
// ✅ Correct
<Rating [value]="4.5" [allowHalf]="true" />

// ❌ Incorrect - allowHalf not enabled
<Rating [value]="4.5" />
```

### Issue: Form validation not working

**Solution**: Ensure proper form control setup:

```typescript
// ✅ Correct
this.form = this.fb.group({
  rating: [0, [Validators.required, Validators.min(1)]]
});

// ❌ Incorrect - missing validation
this.form = this.fb.group({
  rating: [0]
});
```

### Issue: Keyboard navigation not working

**Solution**: Ensure the component can receive focus:

```typescript
// ✅ Correct
<Rating [value]="rating()" (valueChange)="rating.set($event)" />

// ❌ Incorrect - disabled or readonly
<Rating [value]="rating()" [disabled]="true" />
```


## Support

For issues, questions, or contributions, please visit our [GitHub repository](https://github.com/bhaimicrosoft/angular-superui).

---

Built with ❤️ by the Angular SuperUI team.
