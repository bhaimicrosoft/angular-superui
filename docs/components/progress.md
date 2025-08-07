# Progress Component 📊

Beautiful, accessible progress indicators with Material Design animations and comprehensive customization options. Perfect for loading states, file uploads, and tracking task completion.

## Features

- 🎯 **12 Variants** - Default, Primary, Secondary, Success, Warning, Destructive, Info, Gradient variants
- 📏 **6 Sizes** - Extra Small to 2X Large with responsive design
- ⚡ **Indeterminate Animation** - Smooth Material Design loading animation with CSS
- 📱 **Responsive** - Mobile-first design that works on all screen sizes
- ♿ **Accessibility** - WCAG compliant with ARIA live regions and screen reader announcements
- 🎨 **Customizable** - Multiple text positions, custom formatters, additional info display
- 🔧 **TypeScript** - Full type safety with comprehensive interfaces
- ✨ **Animations** - Shimmer, pulse, bounce effects and smooth transitions

## Installation

Initialize Angular SuperUI in your project:

```bash
ngsui init
```

Add the Progress component:

```bash
ngsui add progress
```

## Usage

Import the Progress component in your Angular component:

```typescript
import { Component } from '@angular/core';
import { ProgressComponent } from 'angular-superui';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [ProgressComponent],
  template: `
    <ProgressComponent [value]="50" [max]="100" />
  `
})
export class ExampleComponent {}
```

## Examples

### Basic Progress

```typescript
@Component({
  template: `
    <ProgressComponent [value]="73" [max]="100" [showText]="true" />
  `
})
```

### Indeterminate Loading

```typescript
@Component({
  template: `
    <ProgressComponent 
      [indeterminate]="true" 
      variant="primary" 
      [showText]="true" 
      size="lg"
    />
  `
})
```

### Color Variants

```typescript
@Component({
  template: `
    <!-- Primary -->
    <ProgressComponent [value]="65" variant="primary" [showText]="true" />
    
    <!-- Success -->
    <ProgressComponent [value]="85" variant="success" [showText]="true" />
    
    <!-- Warning -->
    <ProgressComponent [value]="45" variant="warning" [showText]="true" />
    
    <!-- Destructive -->
    <ProgressComponent [value]="25" variant="destructive" [showText]="true" />
    
    <!-- Info -->
    <ProgressComponent [value]="60" variant="info" [showText]="true" />
  `
})
```

### Gradient Variants

```typescript
@Component({
  template: `
    <!-- Primary Gradient with Glow -->
    <ProgressComponent
      [value]="70"
      variant="gradient"
      [showText]="true"
      [glow]="true"
      size="lg"
    />
    
    <!-- Success Gradient with Animation -->
    <ProgressComponent
      [value]="85"
      variant="gradient-success"
      [showText]="true"
      animated="shimmer"
      size="lg"
    />
    
    <!-- Warning Gradient with Stripes -->
    <ProgressComponent
      [value]="55"
      variant="gradient-warning"
      [showText]="true"
      [striped]="true"
      size="lg"
    />
    
    <!-- Danger Gradient with Pulse -->
    <ProgressComponent
      [value]="30"
      variant="gradient-danger"
      [showText]="true"
      animated="pulse"
      size="lg"
    />
  `
})
```

### Size Variations

```typescript
@Component({
  template: `
    <!-- Extra Small -->
    <ProgressComponent [value]="60" size="xs" variant="primary" />
    
    <!-- Small -->
    <ProgressComponent [value]="70" size="sm" variant="primary" />
    
    <!-- Default -->
    <ProgressComponent [value]="80" size="default" variant="primary" [showText]="true" />
    
    <!-- Large -->
    <ProgressComponent [value]="90" size="lg" variant="primary" [showText]="true" />
    
    <!-- Extra Large with inside text -->
    <ProgressComponent
      [value]="95"
      size="xl"
      variant="gradient"
      [showText]="true"
      textPosition="inside"
    />
    
    <!-- 2X Large with maximum impact -->
    <ProgressComponent
      [value]="100"
      size="2xl"
      variant="gradient-success"
      [showText]="true"
      textPosition="inside"
      [glow]="true"
    />
  `
})
```

### Text Positioning

```typescript
@Component({
  template: `
    <!-- Text on top -->
    <ProgressComponent
      [value]="60"
      [showText]="true"
      textPosition="top"
      textAlign="left"
    />
    
    <!-- Text on bottom (default) -->
    <ProgressComponent
      [value]="75"
      [showText]="true"
      textPosition="bottom"
      textAlign="center"
    />
    
    <!-- Text inside progress bar -->
    <ProgressComponent
      [value]="85"
      [showText]="true"
      textPosition="inside"
      size="xl"
    />
    
    <!-- Overlay text -->
    <ProgressComponent
      [value]="90"
      [showText]="true"
      textPosition="overlay"
      size="lg"
    />
  `
})
```

### Custom Text Formatting

```typescript
@Component({
  template: `
    <!-- Custom static text -->
    <ProgressComponent
      [value]="75"
      [showText]="true"
      [customText]="'Processing: 75 files'"
    />
    
    <!-- Custom formatter function -->
    <ProgressComponent
      [value]="uploadProgress"
      [showText]="true"
      [textFormat]="uploadTextFormatter"
    />
  `
})
export class CustomTextExample {
  uploadProgress = 65;
  
  uploadTextFormatter = (value: number, max: number): string => {
    const percentage = Math.round((value / max) * 100);
    const mbUploaded = Math.round((value / max) * 150); // Simulate 150MB file
    return `${mbUploaded} MB / 150 MB (${percentage}%)`;
  };
}
```

### Additional Information Display

```typescript
@Component({
  template: `
    <ProgressComponent
      [value]="progress"
      [showText]="true"
      [showAdditionalInfo]="true"
      [additionalInfoLeft]="progressStatus"
      [additionalInfoRight]="timeRemaining"
      size="lg"
      variant="gradient"
    />
  `
})
export class AdditionalInfoExample {
  progress = 65;
  progressStatus = 'In progress';
  timeRemaining = '2 min remaining';
}
```

### Animation Effects

```typescript
@Component({
  template: `
    <!-- Shimmer animation -->
    <ProgressComponent
      [value]="70"
      animated="shimmer"
      variant="gradient"
      [showText]="true"
    />
    
    <!-- Pulse animation -->
    <ProgressComponent
      [value]="80"
      animated="pulse"
      variant="success"
      [showText]="true"
    />
    
    <!-- Bounce animation -->
    <ProgressComponent
      [value]="90"
      animated="bounce"
      variant="primary"
      [showText]="true"
    />
    
    <!-- Striped with animation -->
    <ProgressComponent
      [value]="75"
      [striped]="true"
      variant="warning"
      [showText]="true"
    />
  `
})
```

### Special Features

```typescript
@Component({
  template: `
    <!-- Reversed direction -->
    <ProgressComponent
      [value]="60"
      variant="warning"
      [reversed]="true"
      [showText]="true"
      size="lg"
    />
    
    <!-- Custom value range -->
    <ProgressComponent
      [value]="50"
      [min]="20"
      [max]="80"
      variant="info"
      [showText]="true"
      size="lg"
    />
    
    <!-- Glow effect -->
    <ProgressComponent
      [value]="85"
      variant="gradient"
      [glow]="true"
      [showText]="true"
      size="lg"
    />
  `
})
```

### File Upload Simulation

```typescript
@Component({
  selector: 'app-upload-example',
  template: `
    <div class="space-y-4">
      <div class="flex gap-3">
        <button 
          (click)="startUpload()"
          [disabled]="isUploading || uploadProgress > 0"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Start Upload
        </button>
        <button 
          (click)="pauseUpload()"
          [disabled]="!isUploading || uploadPaused || uploadProgress >= 100"
          class="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 disabled:opacity-50"
        >
          Pause
        </button>
        <button 
          (click)="cancelUpload()"
          [disabled]="!isUploading && uploadProgress === 0"
          class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
        >
          Cancel
        </button>
      </div>

      <ProgressComponent
        [value]="uploadProgress"
        [max]="100"
        [variant]="uploadVariant"
        [showText]="true"
        [textFormat]="uploadTextFormatter"
        [showAdditionalInfo]="true"
        [additionalInfoLeft]="uploadSpeed"
        [additionalInfoRight]="uploadTimeRemaining"
        size="lg"
        [animated]="isUploading && !uploadPaused ? 'shimmer' : false"
      />
      
      <div class="text-sm text-gray-600">
        Status: {{ uploadStatus }}
      </div>
    </div>
  `
})
export class UploadExample {
  uploadProgress = 0;
  isUploading = false;
  uploadPaused = false;
  uploadSpeed = '';
  uploadTimeRemaining = '';
  uploadStatus = '';
  uploadVariant: 'primary' | 'success' | 'warning' | 'default' = 'default';
  private uploadInterval?: number;

  uploadTextFormatter = (value: number, max: number): string => {
    const percentage = Math.round((value / max) * 100);
    if (percentage === 100) return 'Upload Complete!';
    if (this.uploadPaused) return `Paused at ${percentage}%`;
    const mbUploaded = Math.round((value / max) * 150);
    return `${mbUploaded} MB / 150 MB (${percentage}%)`;
  };

  startUpload(): void {
    this.isUploading = true;
    this.uploadPaused = false;
    this.uploadProgress = 0;
    this.uploadVariant = 'primary';
    this.uploadStatus = 'Starting upload...';

    this.uploadInterval = window.setInterval(() => {
      if (!this.uploadPaused) {
        const current = this.uploadProgress;
        if (current >= 100) {
          this.completeUpload();
        } else {
          const increment = Math.random() * 3 + 1;
          this.uploadProgress = Math.min(current + increment, 100);
          
          const speed = (Math.random() * 5 + 2).toFixed(1);
          this.uploadSpeed = `${speed} MB/s`;
          
          const remaining = Math.ceil((100 - this.uploadProgress) / 2);
          this.uploadTimeRemaining = `${remaining}s remaining`;
          
          this.uploadStatus = `Uploading... ${Math.round(this.uploadProgress)}%`;
        }
      }
    }, 300);
  }

  pauseUpload(): void {
    this.uploadPaused = true;
    this.uploadVariant = 'warning';
    this.uploadStatus = 'Upload paused';
    this.uploadSpeed = '';
    this.uploadTimeRemaining = 'Paused';
  }

  cancelUpload(): void {
    this.isUploading = false;
    this.uploadPaused = false;
    this.uploadProgress = 0;
    this.uploadVariant = 'default';
    this.uploadStatus = 'Upload cancelled';
    this.uploadSpeed = '';
    this.uploadTimeRemaining = '';
    if (this.uploadInterval) {
      clearInterval(this.uploadInterval);
    }
  }

  private completeUpload(): void {
    this.isUploading = false;
    this.uploadVariant = 'success';
    this.uploadStatus = 'Upload completed successfully!';
    this.uploadSpeed = '';
    this.uploadTimeRemaining = 'Complete';
    if (this.uploadInterval) {
      clearInterval(this.uploadInterval);
    }
  }
}
```

### Multi-Step Process

```typescript
@Component({
  selector: 'app-multi-step-example',
  template: `
    <div class="space-y-6">
      <button 
        (click)="startProcess()"
        [disabled]="isProcessing || overallProgress > 0"
        class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
      >
        Start Process
      </button>

      <div class="space-y-3">
        <div *ngFor="let step of steps; track step.id" class="space-y-2">
          <div class="flex justify-between text-sm">
            <span [class]="step.completed ? 'text-green-600 font-medium' : step.active ? 'text-blue-600 font-medium' : 'text-gray-500'">
              {{ step.name }}
            </span>
            <span *ngIf="step.completed" class="text-green-600">✓</span>
          </div>
          <ProgressComponent
            [value]="step.progress"
            [max]="100"
            [variant]="step.completed ? 'success' : step.active ? 'primary' : 'default'"
            size="sm"
            [animated]="step.active ? 'shimmer' : false"
          />
        </div>
      </div>

      <ProgressComponent
        [value]="overallProgress"
        [max]="100"
        variant="gradient-success"
        [showText]="true"
        size="lg"
        [customText]="'Overall Progress: ' + Math.round(overallProgress) + '%'"
      />
    </div>
  `
})
export class MultiStepExample {
  Math = Math;
  isProcessing = false;
  
  steps = [
    { id: 1, name: 'Loading configuration', progress: 0, active: false, completed: false },
    { id: 2, name: 'Connecting to database', progress: 0, active: false, completed: false },
    { id: 3, name: 'Initializing services', progress: 0, active: false, completed: false },
    { id: 4, name: 'Loading user preferences', progress: 0, active: false, completed: false },
    { id: 5, name: 'Finalizing setup', progress: 0, active: false, completed: false },
  ];

  get overallProgress(): number {
    const totalSteps = this.steps.length;
    const completedSteps = this.steps.filter(step => step.completed).length;
    const activeStep = this.steps.find(step => step.active);

    if (activeStep) {
      return ((completedSteps * 100) + activeStep.progress) / totalSteps;
    }
    return (completedSteps / totalSteps) * 100;
  }

  startProcess(): void {
    this.isProcessing = true;
    this.steps.forEach(step => {
      step.progress = 0;
      step.active = false;
      step.completed = false;
    });
    this.processNextStep(0);
  }

  private processNextStep(stepIndex: number): void {
    if (stepIndex >= this.steps.length) {
      this.isProcessing = false;
      return;
    }

    const currentStep = this.steps[stepIndex];
    currentStep.active = true;

    const interval = setInterval(() => {
      if (currentStep.progress >= 100) {
        currentStep.progress = 100;
        currentStep.active = false;
        currentStep.completed = true;
        clearInterval(interval);
        setTimeout(() => this.processNextStep(stepIndex + 1), 500);
      } else {
        currentStep.progress += Math.random() * 15 + 5;
        currentStep.progress = Math.min(currentStep.progress, 100);
      }
    }, 200);
  }
}
```

### Accessibility Features

```typescript
@Component({
  template: `
    <!-- Basic accessibility -->
    <ProgressComponent
      [value]="progress"
      [ariaLabel]="'File upload progress'"
      [showText]="true"
    />
    
    <!-- Enhanced accessibility with announcements -->
    <ProgressComponent
      [value]="progress"
      [accessibility]="{
        announceChanges: true,
        announceThreshold: 25,
        liveRegionPoliteness: 'assertive',
        ariaLabel: 'System backup progress',
        ariaDescription: 'Backing up your files to cloud storage'
      }"
      [showText]="true"
    />
    
    <!-- Custom announcement format -->
    <ProgressComponent
      [value]="progress"
      [accessibility]="{
        announceChanges: true,
        announceFormat: customAnnounceFormat
      }"
      [showText]="true"
    />
  `
})
export class AccessibilityExample {
  progress = 45;
  
  customAnnounceFormat = (value: number, max: number): string => {
    const percentage = Math.round((value / max) * 100);
    return `Backup progress: ${percentage} percent complete`;
  };
}
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | `0` | Current progress value |
| `max` | `number` | `100` | Maximum progress value |
| `min` | `number` | `0` | Minimum progress value |
| `size` | `'xs' \| 'sm' \| 'default' \| 'lg' \| 'xl' \| '2xl'` | `'default'` | Size of the progress bar |
| `variant` | `ProgressIndicatorVariant['variant']` | `'default'` | Visual style variant |
| `containerVariant` | `ProgressVariant['variant']` | `'default'` | Container background variant |
| `animated` | `'shimmer' \| 'pulse' \| 'bounce' \| false` | `false` | Animation effect |
| `striped` | `boolean` | `false` | Enable striped pattern |
| `glow` | `boolean` | `false` | Enable glow effect |
| `className` | `string` | `''` | Additional CSS classes |
| `showText` | `boolean` | `false` | Show progress text |
| `textPosition` | `'top' \| 'bottom' \| 'inside' \| 'overlay'` | `'bottom'` | Position of progress text |
| `textAlign` | `'left' \| 'center' \| 'right'` | `'center'` | Text alignment |
| `textFormat` | `(value: number, max: number) => string` | `undefined` | Custom text formatter function |
| `customText` | `string` | `''` | Static custom text |
| `showAdditionalInfo` | `boolean` | `false` | Show additional info row |
| `additionalInfoLeft` | `string` | `''` | Left additional info text |
| `additionalInfoRight` | `string` | `''` | Right additional info text |
| `indeterminate` | `boolean` | `false` | Enable indeterminate loading animation |
| `reversed` | `boolean` | `false` | Reverse progress direction |
| `accessibility` | `ProgressAccessibility` | `{}` | Accessibility configuration |
| `ariaLabel` | `string` | `''` | ARIA label for screen readers |
| `animationConfig` | `ProgressAnimationConfig` | Default config | Animation timing configuration |

### Variant Types

#### ProgressIndicatorVariant

```typescript
type ProgressIndicatorVariant = {
  variant: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' | 'info' | 'purple' | 'pink' | 'gradient' | 'gradient-success' | 'gradient-warning' | 'gradient-danger';
  animated: 'shimmer' | 'pulse' | 'bounce' | false;
  striped: boolean;
  glow: boolean;
}
```

#### ProgressVariant

```typescript
type ProgressVariant = {
  size: 'xs' | 'sm' | 'default' | 'lg' | 'xl' | '2xl';
  variant: 'default' | 'secondary' | 'muted';
}
```

### Interfaces

#### ProgressAccessibility

```typescript
interface ProgressAccessibility {
  /** Custom ARIA label */
  ariaLabel?: string;
  /** Element ID that labels this progress */
  ariaLabelledBy?: string;
  /** Element ID that describes this progress */
  ariaDescribedBy?: string;
  /** Announce progress changes to screen readers */
  announceChanges?: boolean;
  /** Minimum change threshold for announcements */
  announceThreshold?: number;
  /** Live region politeness setting */
  liveRegionPoliteness?: 'polite' | 'assertive';
  /** Atomic announcements */
  atomicAnnouncements?: boolean;
  /** Custom live region ID */
  liveRegionId?: string;
  /** Custom announcement format function */
  announceFormat?: (value: number, max: number) => string;
}
```

#### ProgressAnimationConfig

```typescript
interface ProgressAnimationConfig {
  /** Enable smooth transitions */
  smooth?: boolean;
  /** Animation duration in milliseconds */
  duration?: number;
  /** CSS easing function */
  easing?: string;
  /** Enable entrance animation */
  entrance?: boolean;
  /** Enable value change animation */
  valueAnimation?: boolean;
}
```

### Utility Functions

#### createProgressAccessibility

```typescript
function createProgressAccessibility(
  options: Partial<ProgressAccessibility> = {}
): ProgressAccessibility
```

Creates a progress accessibility configuration with sensible defaults.

#### createAnimationConfig

```typescript
function createAnimationConfig(
  options: Partial<ProgressAnimationConfig> = {}
): ProgressAnimationConfig
```

Creates an animation configuration with sensible defaults.

#### formatProgressText

```typescript
function formatProgressText(
  value: number,
  max: number,
  format?: 'percentage' | 'fraction' | 'custom'
): string
```

Utility function for formatting progress text in different formats.

## Styling

The Progress component uses Tailwind CSS classes and CSS custom properties for styling. You can customize the appearance by:

### Custom Classes

```typescript
@Component({
  template: `
    <ProgressComponent 
      [value]="75" 
      className="shadow-lg border border-gray-200 rounded-lg"
    />
  `
})
```

### CSS Custom Properties

The component respects these CSS custom properties:

- `--primary` / `--primary-foreground`
- `--secondary` / `--secondary-foreground`
- `--success` / `--success-foreground`
- `--warning` / `--warning-foreground`
- `--destructive` / `--destructive-foreground`
- `--info` / `--info-foreground`
- `--background` / `--foreground`
- `--muted` / `--muted-foreground`
- `--border` / `--ring`

### Custom Animations

You can override the indeterminate animation with custom CSS:

```css
.progress-indeterminate::before {
  animation: custom-indeterminate 2s linear infinite;
}

@keyframes custom-indeterminate {
  0% { left: -50%; right: 100%; }
  50% { left: 0%; right: 50%; }
  100% { left: 100%; right: -50%; }
}
```

## Accessibility

The Progress component is built with accessibility in mind:

- **ARIA Compliance**: Proper `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, and `aria-valuemax`
- **Screen Reader Support**: Live region announcements for progress changes
- **Indeterminate State**: Proper handling with `aria-valuenow="null"` for loading states
- **Keyboard Navigation**: Focus management and keyboard interaction support
- **High Contrast**: Visible focus indicators and sufficient color contrast
- **Customizable Announcements**: Configure announcement frequency and format

### WCAG Guidelines

The component follows WCAG 2.1 guidelines:

- **Level A**: Basic functionality and keyboard access
- **Level AA**: Color contrast ratios and text alternatives
- **Level AAA**: Enhanced accessibility features and announcements

## Best Practices

1. **Use appropriate variants** - Match colors to semantic meaning (success for completion, warning for issues)
2. **Provide meaningful text** - Always include descriptive text for screen readers
3. **Set reasonable thresholds** - Don't announce every small change to avoid overwhelming users
4. **Use indeterminate wisely** - Only for truly unknown progress, not as a loading spinner
5. **Consider context** - Match size and styling to your application's design system
6. **Test with assistive technology** - Ensure announcements work properly with screen readers

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- iOS Safari 14+
- Chrome Android 90+

## Related Components

- [Button](./button.md) - For triggering progress-related actions
- [Alert](./alert.md) - For displaying progress-related messages
- [Card](./card.md) - For containing progress indicators
- [Badge](./badge.md) - For showing progress status

---

*Built with ❤️ using Angular 17+ and Tailwind CSS*
