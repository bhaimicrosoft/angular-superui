# Input

A form input component with built-in styling and validation support.

## Import

```typescript
import { Input } from 'angular-superui';
```

## Usage

### Basic Input

```html
<input type="text" placeholder="Enter your name"></input>
```

### Input Types

```html
<!-- Text input -->
<input type="text" placeholder="Enter text"></input>

<!-- Email input -->
<input type="email" placeholder="Enter your email"></input>

<!-- Password input -->
<input type="password" placeholder="Enter your password"></input>

<!-- Number input -->
<input type="number" placeholder="Enter a number"></input>

<!-- Search input -->
<input type="search" placeholder="Search..."></input>

<!-- URL input -->
<input type="url" placeholder="Enter URL"></input>

<!-- Tel input -->
<input type="tel" placeholder="Enter phone number"></input>
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `string` | `'text'` | The input type (text, email, password, number, etc.) |
| `placeholder` | `string` | `''` | Placeholder text |
| `class` | `string` | `''` | Additional CSS classes |

**Note:** Standard HTML input attributes and events can be used through Angular's built-in property and event binding. For example:
- `[disabled]="true"` for disabled state
- `[readonly]="true"` for readonly state  
- `[required]="true"` for required validation
- `(input)="handleInput($event)"` for input events
- `(focus)="handleFocus($event)"` for focus events

## Examples

### Input with Label

```html
<div class="space-y-2">
  <label for="username" class="text-sm font-medium leading-none">
    Username
  </label>
  <input 
    id="username"
    type="text" 
    placeholder="Enter your username"
    required>
  </input>
</div>
```

### Input with Error State

```html
<div class="space-y-2">
  <label for="email" class="text-sm font-medium leading-none">
    Email
  </label>
  <input 
    id="email"
    type="email" 
    placeholder="Enter your email"
    class="border-red-500 focus:border-red-500"
    [class.border-red-500]="hasError">
  </input>
  <p *ngIf="hasError" class="text-sm text-red-600">
    Please enter a valid email address.
  </p>
</div>
```

### Disabled Input

```html
<input 
  type="text" 
  placeholder="This input is disabled"
  disabled>
</input>
```

### Input with Icon

```html
<div class="relative">
  <input 
    type="search" 
    placeholder="Search..."
    class="pl-10">
  </input>
  <svg class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" 
       viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <circle cx="11" cy="11" r="8"/>
    <path d="M21 21l-4.35-4.35"/>
  </svg>
</div>
```

### Form with Validation

```typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Input } from 'angular-superui';

@Component({
  standalone: true,
  imports: [Input, ReactiveFormsModule],
  template: `
    <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
      <div class="space-y-4">
        <div class="space-y-2">
          <label for="name" class="text-sm font-medium">Name</label>
          <input 
            id="name"
            type="text" 
            placeholder="Enter your name"
            formControlName="name"
            [class.border-red-500]="isFieldInvalid('name')">
          </input>
          <p *ngIf="isFieldInvalid('name')" class="text-sm text-red-600">
            Name is required.
          </p>
        </div>
        
        <div class="space-y-2">
          <label for="email" class="text-sm font-medium">Email</label>
          <input 
            id="email"
            type="email" 
            placeholder="Enter your email"
            formControlName="email"
            [class.border-red-500]="isFieldInvalid('email')">
          </input>
          <p *ngIf="isFieldInvalid('email')" class="text-sm text-red-600">
            Please enter a valid email address.
          </p>
        </div>
        
        <button type="submit" [disabled]="userForm.invalid">
          Submit
        </button>
      </div>
    </form>
  `
})
export class UserFormComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.userForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
    }
  }
}
```

## Styling

The input component uses standard HTML input styling enhanced with Tailwind CSS classes:

```css
/* Base input styles */
.input-base {
  @apply flex h-10 w-full rounded-md border border-input bg-background px-3 py-2;
  @apply text-sm ring-offset-background file:border-0 file:bg-transparent;
  @apply file:text-sm file:font-medium placeholder:text-muted-foreground;
  @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring;
  @apply focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50;
}
```

## Accessibility

- Semantic HTML `<input>` element
- Proper labeling support with `id` and `for` attributes
- Keyboard navigation support
- Screen reader compatible
- Focus management with visible focus indicators
- Support for `aria-*` attributes

## Best Practices

1. **Always use labels** - Associate inputs with descriptive labels
2. **Provide helpful placeholders** - Use clear, actionable placeholder text
3. **Validate appropriately** - Use proper input types and validation
4. **Handle errors gracefully** - Show clear error messages
5. **Consider accessibility** - Ensure proper contrast and keyboard navigation

## Custom Styling

Extend the input with additional classes:

```html
<input 
  type="text" 
  placeholder="Custom styled input"
  class="border-2 border-blue-300 focus:border-blue-500 bg-blue-50">
</input>
```
