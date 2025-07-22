# Input Component 📝

Accessible and customizable input field component with validation, different variants, and comprehensive form integration.

## Features

- 🎯 **5 Variants** - Default, Filled, Outline, Underline, Ghost
- 📏 **4 Sizes** - Small, Default, Large, Extra Large
- ✅ **Form Integration** - Seamless Angular Forms support with NgControl
- ♿ **Accessibility** - WCAG 2.1 AA compliant with ARIA support
- 🎨 **Customizable** - Easy styling with Tailwind CSS and CVA variants
- 🔧 **TypeScript** - Full type safety with comprehensive interfaces
- 📱 **Mobile Optimized** - Support for different input modes
- ⚡ **Performance** - Debouncing and OnPush change detection
- 🎭 **States** - Error, disabled, loading, and focus states
- 🔍 **Validation** - Built-in error handling and help text

## Installation

Initialize Angular SuperUI in your project:

```bash
ngsui-cli init
```

Add the Input component:

```bash
ngsui-cli add input
```

## Usage

Import the Input component in your Angular component:

```typescript
import { Component } from '@angular/core';
import { InputComponent } from 'angular-superui';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [InputComponent],
  template: `
    <InputComponent placeholder="Enter your name" />
  `
})
export class ExampleComponent {}
```

## Examples

### Default

```typescript
@Component({
  template: `
    <InputComponent placeholder="Default input" />
  `
})
```

### Variants

```typescript
@Component({
  template: `
    <div class="space-y-4">
      <InputComponent variant="default" placeholder="Default variant" />
      <InputComponent variant="filled" placeholder="Filled variant" />
      <InputComponent variant="outline" placeholder="Outline variant" />
      <InputComponent variant="underline" placeholder="Underline variant" />
      <InputComponent variant="ghost" placeholder="Ghost variant" />
    </div>
  `
})
```

### Sizes

```typescript
@Component({
  template: `
    <div class="space-y-4">
      <InputComponent size="sm" placeholder="Small input" />
      <InputComponent size="default" placeholder="Default input" />
      <InputComponent size="lg" placeholder="Large input" />
      <InputComponent size="xl" placeholder="Extra large input" />
    </div>
  `
})
```

### With Labels and Help Text

```typescript
@Component({
  template: `
    <div class="space-y-4">
      <InputComponent 
        label="Email Address"
        placeholder="Enter your email"
        helpText="We'll never share your email with anyone else."
        type="email"
      />
      
      <InputComponent 
        label="Password"
        placeholder="Enter your password"
        type="password"
        helpText="Must be at least 8 characters long."
      />
    </div>
  `
})
```

### Form Integration

```typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from 'angular-superui';

@Component({
  selector: 'app-form-example',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div class="space-y-4">
        <InputComponent 
          formControlName="firstName"
          label="First Name"
          placeholder="Enter your first name"
          [required]="true"
        />
        
        <InputComponent 
          formControlName="email"
          label="Email"
          placeholder="Enter your email"
          type="email"
          [required]="true"
        />
        
        <InputComponent 
          formControlName="phone"
          label="Phone Number"
          placeholder="Enter your phone number"
          type="tel"
          inputMode="tel"
        />
        
        <button type="submit" [disabled]="form.invalid">
          Submit
        </button>
      </div>
    </form>
  `
})
export class FormExampleComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern(/^\d{10}$/)]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
    }
  }
}
```

### Input Types and Modes

```typescript
@Component({
  template: `
    <div class="space-y-4">
      <!-- Text inputs -->
      <InputComponent type="text" placeholder="Text input" />
      <InputComponent type="email" placeholder="Email input" inputMode="email" />
      <InputComponent type="password" placeholder="Password input" />
      <InputComponent type="search" placeholder="Search input" />
      
      <!-- Number inputs -->
      <InputComponent type="number" placeholder="Number input" inputMode="numeric" />
      <InputComponent type="tel" placeholder="Phone number" inputMode="tel" />
      
      <!-- Date inputs -->
      <InputComponent type="date" label="Date" />
      <InputComponent type="time" label="Time" />
      <InputComponent type="datetime-local" label="Date and Time" />
      
      <!-- Other types -->
      <InputComponent type="url" placeholder="Website URL" inputMode="url" />
      <InputComponent type="file" label="Choose file" />
    </div>
  `
})
```

### States and Validation

```typescript
@Component({
  template: `
    <div class="space-y-4">
      <!-- Success state -->
      <InputComponent 
        placeholder="Valid input"
        [isValid]="true"
        helpText="Looks good!"
      />
      
      <!-- Error state -->
      <InputComponent 
        placeholder="Invalid input"
        [isInvalid]="true"
        errorText="This field is required"
      />
      
      <!-- Disabled state -->
      <InputComponent 
        placeholder="Disabled input"
        [disabled]="true"
      />
      
      <!-- Loading state -->
      <InputComponent 
        placeholder="Loading..."
        [loading]="true"
      />
    </div>
  `
})
```

### Event Handling

```typescript
@Component({
  template: `
    <InputComponent 
      placeholder="Type something..."
      [debounceTime]="300"
      (valueChange)="onValueChange($event)"
      (inputFocus)="onFocus($event)"
      (inputBlur)="onBlur($event)"
      (keyDown)="onKeyDown($event)"
      (keyUp)="onKeyUp($event)"
      (paste)="onPaste($event)"
    />
  `
})
export class EventHandlingExample {
  onValueChange(value: string) {
    console.log('Value changed:', value);
  }

  onFocus(event: FocusEvent) {
    console.log('Input focused:', event);
  }

  onBlur(event: FocusEvent) {
    console.log('Input blurred:', event);
  }

  onKeyDown(event: KeyboardEvent) {
    console.log('Key down:', event.key);
  }

  onKeyUp(event: KeyboardEvent) {
    console.log('Key up:', event.key);
  }

  onPaste(event: ClipboardEvent) {
    console.log('Paste event:', event);
  }
}
```

### Accessibility Features

```typescript
@Component({
  template: `
    <div class="space-y-4">
      <!-- Custom ARIA labels -->
      <InputComponent 
        placeholder="Username"
        ariaLabel="Enter your username for login"
        ariaDescription="Username must be 3-20 characters long"
      />
      
      <!-- Screen reader announcements -->
      <InputComponent 
        placeholder="Search products"
        ariaLabel="Search for products"
        role="searchbox"
        [ariaLive]="'polite'"
      />
      
      <!-- Required field -->
      <InputComponent 
        label="Email Address"
        placeholder="Enter your email"
        [required]="true"
        ariaLabel="Email address (required)"
      />
    </div>
  `
})
```

### Advanced Usage

```typescript
@Component({
  template: `
    <div class="space-y-4">
      <!-- Custom validation with debouncing -->
      <InputComponent 
        placeholder="Username (checking availability...)"
        [debounceTime]="500"
        (valueChange)="checkUsernameAvailability($event)"
        [loading]="isCheckingUsername"
        [errorText]="usernameError"
      />
      
      <!-- Prefix and suffix -->
      <InputComponent 
        placeholder="0.00"
        type="number"
        inputMode="decimal"
        class="pl-8"
        style="background-image: url('data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' fill=\'currentColor\' viewBox=\'0 0 16 16\'><path d=\'M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z\'/></svg>');"
      />
    </div>
  `
})
export class AdvancedUsageExample {
  isCheckingUsername = false;
  usernameError = '';

  async checkUsernameAvailability(username: string) {
    if (username.length < 3) return;
    
    this.isCheckingUsername = true;
    this.usernameError = '';
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate username check
      if (username === 'admin') {
        this.usernameError = 'Username is already taken';
      }
    } catch (error) {
      this.usernameError = 'Error checking username availability';
    } finally {
      this.isCheckingUsername = false;
    }
  }
}
```

## API Reference

### Input Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'default' \| 'filled' \| 'outline' \| 'underline' \| 'ghost'` | `'default'` | Visual style variant |
| `size` | `'sm' \| 'default' \| 'lg' \| 'xl'` | `'default'` | Size of the input |
| `type` | `string` | `'text'` | HTML input type |
| `placeholder` | `string` | `undefined` | Placeholder text |
| `value` | `string` | `''` | Input value (two-way binding) |
| `label` | `string` | `undefined` | Label text |
| `helpText` | `string` | `undefined` | Help text below input |
| `errorText` | `string` | `undefined` | Error message text |
| `required` | `boolean` | `false` | Whether the field is required |
| `disabled` | `boolean` | `false` | Whether the input is disabled |
| `readonly` | `boolean` | `false` | Whether the input is read-only |
| `loading` | `boolean` | `false` | Show loading state |
| `isValid` | `boolean` | `undefined` | Force valid state |
| `isInvalid` | `boolean` | `undefined` | Force invalid state |
| `inputMode` | `string` | `undefined` | HTML inputmode attribute |
| `ariaLabel` | `string` | `undefined` | ARIA label for accessibility |
| `ariaDescription` | `string` | `undefined` | ARIA description |
| `ariaLive` | `'off' \| 'polite' \| 'assertive'` | `'off'` | ARIA live region |
| `role` | `string` | `undefined` | ARIA role |
| `debounceTime` | `number` | `0` | Debounce time for value changes (ms) |
| `autocomplete` | `string` | `undefined` | HTML autocomplete attribute |
| `maxlength` | `number` | `undefined` | Maximum character length |
| `minlength` | `number` | `undefined` | Minimum character length |
| `pattern` | `string` | `undefined` | HTML pattern attribute |
| `step` | `number \| string` | `undefined` | HTML step attribute for number inputs |
| `min` | `number \| string` | `undefined` | HTML min attribute |
| `max` | `number \| string` | `undefined` | HTML max attribute |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `valueChange` | `EventEmitter<string>` | Emitted when input value changes |
| `inputFocus` | `EventEmitter<FocusEvent>` | Emitted when input receives focus |
| `inputBlur` | `EventEmitter<FocusEvent>` | Emitted when input loses focus |
| `keyDown` | `EventEmitter<KeyboardEvent>` | Emitted on keydown |
| `keyUp` | `EventEmitter<KeyboardEvent>` | Emitted on keyup |
| `paste` | `EventEmitter<ClipboardEvent>` | Emitted on paste |

### CSS Classes

The Input component uses these CSS classes that you can customize:

```css
/* Base input styles */
.input-base {
  /* Base input styling */
}

/* Variant classes */
.input-default {
  /* Default variant styling */
}

.input-filled {
  /* Filled variant styling */
}

.input-outline {
  /* Outline variant styling */
}

.input-underline {
  /* Underline variant styling */
}

.input-ghost {
  /* Ghost variant styling */
}

/* Size classes */
.input-sm {
  /* Small size styling */
}

.input-lg {
  /* Large size styling */
}

.input-xl {
  /* Extra large size styling */
}

/* State classes */
.input-valid {
  /* Valid state styling */
}

.input-invalid {
  /* Invalid state styling */
}

.input-disabled {
  /* Disabled state styling */
}

.input-loading {
  /* Loading state styling */
}
```

### Interfaces

#### InputVariant

```typescript
type InputVariant = 'default' | 'filled' | 'outline' | 'underline' | 'ghost';
```

#### InputSize

```typescript
type InputSize = 'sm' | 'default' | 'lg' | 'xl';
```

#### InputType

```typescript
type InputType = 
  | 'text'
  | 'email'
  | 'password'
  | 'search'
  | 'tel'
  | 'url'
  | 'number'
  | 'date'
  | 'time'
  | 'datetime-local'
  | 'month'
  | 'week'
  | 'file'
  | 'color'
  | 'range';
```

## Styling

The Input component uses Tailwind CSS classes and follows the design system patterns. You can customize the appearance by:

### Custom Classes

```typescript
@Component({
  template: `
    <InputComponent 
      class="w-full max-w-md mx-auto"
      placeholder="Custom styled input"
    />
  `
})
```

### CSS Custom Properties

The input respects CSS custom properties for theming:

```css
:root {
  --input-bg: theme(colors.white);
  --input-border: theme(colors.gray.300);
  --input-border-focus: theme(colors.blue.500);
  --input-text: theme(colors.gray.900);
  --input-placeholder: theme(colors.gray.500);
  --input-radius: theme(borderRadius.md);
}

[data-theme="dark"] {
  --input-bg: theme(colors.gray.900);
  --input-border: theme(colors.gray.600);
  --input-border-focus: theme(colors.blue.400);
  --input-text: theme(colors.gray.100);
  --input-placeholder: theme(colors.gray.400);
}
```

## Best Practices

### Accessibility

1. **Always provide labels** for form inputs
2. **Use appropriate input types** and inputMode for mobile optimization
3. **Provide clear error messages** and help text
4. **Use ARIA attributes** for screen reader support
5. **Ensure proper focus management** and keyboard navigation

### Performance

1. **Use debouncing** for expensive operations like API calls
2. **Leverage OnPush change detection** for better performance
3. **Use reactive forms** for complex validation scenarios
4. **Avoid unnecessary re-renders** with proper value tracking

### UX Guidelines

1. **Provide immediate feedback** for validation errors
2. **Use appropriate input modes** for mobile keyboards
3. **Show loading states** for async operations
4. **Keep help text concise** and helpful
5. **Use consistent sizing** throughout your application

## Examples in Production

### Login Form

```typescript
@Component({
  selector: 'app-login',
  template: `
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-6">
      <div>
        <InputComponent 
          formControlName="email"
          type="email"
          label="Email"
          placeholder="Enter your email"
          inputMode="email"
          autocomplete="email"
          [required]="true"
          size="lg"
        />
      </div>
      
      <div>
        <InputComponent 
          formControlName="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
          autocomplete="current-password"
          [required]="true"
          size="lg"
        />
      </div>
      
      <button 
        type="submit" 
        [disabled]="loginForm.invalid || isLoading"
        class="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
      >
        {{ isLoading ? 'Signing in...' : 'Sign In' }}
      </button>
    </form>
  `
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  constructor(private fb: FormBuilder) {}
}
```

### Search Input

```typescript
@Component({
  selector: 'app-search',
  template: `
    <InputComponent 
      placeholder="Search products..."
      type="search"
      size="lg"
      variant="outline"
      ariaLabel="Search for products"
      role="searchbox"
      [debounceTime]="300"
      (valueChange)="onSearch($event)"
      class="w-full max-w-2xl"
    />
  `
})
export class SearchComponent {
  onSearch(query: string) {
    if (query.length >= 2) {
      // Perform search
      this.searchService.search(query);
    }
  }
}
```

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Related Components

- [Button](./button.md) - For form submission
- [Checkbox](./checkbox.md) - For boolean selection
- [Form](./form.md) - For form layout and validation
- [Label](./label.md) - For input labeling

---

Built with ❤️ by the Angular SuperUI team. Need help? Check out our [GitHub repository](https://github.com/angular-superui/angular-superui) or [join our Discord](https://discord.gg/angular-superui).
