# Textarea Component - Quick Reference

## Quick Start

### Using ngsui (Recommended)

```bash
npx ngsui add textarea
```

### Manual Installation

```bash
npm install angular-superui
```

## CLI Commands

```bash
# Add textarea component to your project
npx ngsui add textarea

# List all available components
npx ngsui list

# Initialize SuperUI in your project
npx ngsui init
```

```typescript
import { TextareaComponent } from 'angular-superui';

@Component({
  template: `
    <TextareaComponent
      [(value)]="text"
      placeholder="Start typing..."
      label="Your Message"
    />
  `
})
export class MyComponent {
  text = signal('');
}
```

## Common Patterns

### Auto-Resizing Tweet Box
```typescript
<TextareaComponent
  [(value)]="tweet"
  placeholder="What's happening?"
  [maxLength]="280"
  [showCharacterCount]="true"
  [autoResize]="true"
  [minRows]="2"
  [maxRows]="6"
/>
```

### Form Field with Validation
```typescript
<TextareaComponent
  formControlName="description"
  label="Description"
  [required]="true"
  [maxLength]="500"
  [showCharacterCount]="true"
  helpText="Please provide a detailed description"
/>
```

### Custom Styled Textarea
```typescript
<TextareaComponent
  variant="unstyled"
  className="border-2 border-dashed border-purple-300 rounded-lg p-4 bg-purple-50"
  placeholder="Custom design..."
/>
```

## Variants & Sizes

| Variant | Usage |
|---------|-------|
| `default` | Standard bordered textarea |
| `filled` | Background-filled style |
| `flushed` | Bottom-border only |
| `unstyled` | No default styling |

| Size | Height | Use Case |
|------|--------|----------|
| `sm` | 60px | Compact forms |
| `md` | 80px | Standard forms |
| `lg` | 100px | Spacious forms |
| `xl` | 120px | Large content areas |

## Essential Props

```typescript
// Basic
placeholder="..."
label="..."
helpText="..."

// Behavior
[autoResize]="true"
[showCharacterCount]="true"
[maxLength]="500"

// Validation
[required]="true"
[customValidator]="myValidator"
state="error"
errorMessage="Field is required"

// Styling
variant="filled"
size="lg"
className="my-custom-class"
```

## Form Integration

```typescript
// Reactive Forms
<TextareaComponent formControlName="field" />

// Template-driven Forms
<TextareaComponent [(ngModel)]="value" />

// Signal-based (recommended)
<TextareaComponent [(value)]="signal" />
```

## Events

```typescript
<TextareaComponent
  (valueChange)="onValueChange($event)"
  (textareaFocus)="onFocus($event)"
  (textareaBlur)="onBlur($event)"
  (validationChange)="onValidationChange($event)"
/>
```

## Accessibility Ready

✅ ARIA attributes auto-managed  
✅ Keyboard navigation support  
✅ Screen reader compatible  
✅ Focus management  
✅ Error announcements  

## Performance Tips

- Use `OnPush` change detection strategy
- Implement custom validators efficiently
- Use `autoResize` sparingly for large lists
- Leverage signal-based architecture

## Common Use Cases

### Comment Box
```typescript
<TextareaComponent
  placeholder="Add a comment..."
  [autoResize]="true"
  [maxLength]="1000"
  [showCharacterCount]="true"
  size="sm"
/>
```

### Rich Content Editor
```typescript
<TextareaComponent
  variant="filled"
  size="xl"
  [autoResize]="true"
  [minRows]="8"
  [maxRows]="20"
  placeholder="Start writing your article..."
/>
```

### Settings Description
```typescript
<TextareaComponent
  variant="flushed"
  [readonly]="!editMode"
  placeholder="Describe your settings..."
  helpText="This description will be visible to other users"
/>
```

### Feedback Form
```typescript
<TextareaComponent
  [required]="true"
  [minLength]="10"
  [maxLength]="2000"
  [showCharacterCount]="true"
  [validateOnBlur]="true"
  placeholder="Please share your feedback..."
  helpText="Minimum 10 characters required"
/>
```

## Troubleshooting

**Auto-resize not working?**
- Ensure `[autoResize]="true"`
- Check `minRows` and `maxRows` values
- Verify ResizeObserver support

**Validation not showing?**
- Set `[validateOnChange]="true"` or `[validateOnBlur]="true"`
- Ensure form control has validators
- Check error message configuration

**Styling issues?**
- Use `variant="unstyled"` for complete control
- Apply custom classes via `className`
- Override CSS custom properties

**Form integration problems?**
- Use `formControlName` for reactive forms
- Use `[(ngModel)]` for template-driven forms
- Use `[(value)]` with signals (recommended)

For complete documentation, visit: [/docs/components/textarea](../textarea.md)
