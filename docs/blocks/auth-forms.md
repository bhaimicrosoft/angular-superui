# Auth Forms Block

Complete authentication forms block providing login, register, forgot password, and reset password functionality with dual-mode form support, advanced accessibility, and enhanced security features.

## Installation

Install the Auth Forms block via our CLI tool:

```bash
npx ngsui-cli add block auth-forms
```

## Features

- 🔐 **Multiple Form Types**: Login, Register, Forgot Password, Reset Password
- 🎯 **Dual Form Mode**: Both Reactive Forms and Template-Driven Forms support
- 🎨 **7 Form Variants**: Default, Minimal, Card, Glass, Modern, Split, Centered
- 📝 **5 Field Variants**: Default, Floating, Outlined, Filled, Underlined
- 🌐 **Social Authentication**: Built-in support for popular providers
- ✅ **Enhanced Password Validation**: 8-criteria strength validation with minimum "Good" requirement
- 🔒 **Advanced Security**: Strong password requirements, no common patterns, sequential chars protection
- 📱 **Responsive Design**: Mobile-first responsive layouts
- 🎯 **TypeScript Support**: Full type safety with interfaces
- ♿ **WCAG 2.1 AA Compliance**: Complete accessibility with ARIA attributes, keyboard navigation, screen reader support
- 🌙 **Dark Mode**: Complete dark mode support
- 🚀 **Performance**: Signals-based reactive updates, optimized validation

## Quick Start

### Reactive Forms Mode (Recommended)

```typescript
import { AuthForms, type AuthFormConfig } from '@ngsui/blocks';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  template: `
    <AuthForms
      [config]="loginConfig"
      mode="reactive"
      variant="default"
      fieldVariant="floating"
      (formSubmit)="onLogin($event)"
    />
  `,
  imports: [AuthForms, ReactiveFormsModule]
})
export class LoginComponent {
  loginConfig: AuthFormConfig = {
    type: 'login',
    title: 'Welcome back',
    subtitle: 'Sign in to your account',
    showRememberMe: true,
    showForgotPassword: true,
    fields: [
      {
        name: 'email',
        type: 'email',
        label: 'Email',
        required: true,
        icon: '📧'
      },
      {
        name: 'password',
        type: 'password',
        label: 'Password',
        required: true,
        minLength: 8,
        icon: '🔒'
      }
    ]
  };

  onLogin(event: AuthFormSubmitEvent) {
    console.log('Login data:', event.data);
    // Form automatically prevents submission for weak passwords
    // Only passwords with "Good" strength or better are allowed
  }
}
```

### Template-Driven Forms Mode

```typescript
import { AuthForms, type AuthFormConfig } from '@ngsui/blocks';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  template: `
    <AuthForms
      [config]="registerConfig"
      mode="template"
      variant="card"
      fieldVariant="floating"
      [(ngModel)]="formData"
      (formSubmit)="onRegister($event)"
    />
  `,
  imports: [AuthForms, FormsModule]
})
export class RegisterComponent {
  formData: any = {};

  registerConfig: AuthFormConfig = {
    type: 'register',
    title: 'Create Account',
    subtitle: 'Join our community today',
    showSocialLogin: true,
    showTermsAcceptance: true,
    fields: [
      {
        name: 'fullName',
        type: 'text',
        label: 'Full Name',
        required: true
      },
      {
        name: 'email',
        type: 'email',
        label: 'Email',
        required: true
      },
      {
        name: 'password',
        type: 'password',
        label: 'Password',
        required: true,
        minLength: 8
      },
      {
        name: 'confirmPassword',
        type: 'password',
        label: 'Confirm Password',
        required: true
      }
    ]
  };

  onRegister(event: AuthFormSubmitEvent) {
    console.log('Registration data:', event.data);
    console.log('Form data via ngModel:', this.formData);
  }
}
```

## Enhanced Password Security

The Auth Forms block now includes advanced password validation with 8 security criteria:

### Password Strength Requirements

```typescript
// Password must meet at least 6 out of 8 criteria for "Good" strength:
const passwordCriteria = {
  hasMinLength: 'At least 8 characters',
  hasMaxLength: 'Maximum 128 characters', 
  hasUpperCase: 'One uppercase letter',
  hasLowerCase: 'One lowercase letter',
  hasNumbers: 'One number',
  hasSpecialChar: 'One special character',
  noCommonPatterns: 'No repeated characters (e.g., aaa, 111)',
  noSequentialChars: 'No sequential characters (e.g., abc, 123)'
};

// Form automatically prevents submission for passwords below "Good" strength
// Visual strength indicator shows: Very Weak → Weak → Fair → Good → Strong
```

### Password Strength Visualization

```typescript
@Component({
  template: `
    <AuthForms
      [config]="passwordConfig"
      mode="reactive"
      (formSubmit)="onSubmit($event)"
    />
  `
})
export class PasswordFormComponent {
  passwordConfig: AuthFormConfig = {
    type: 'register',
    title: 'Create Secure Password',
    fields: [
      {
        name: 'password',
        type: 'password',
        label: 'Password',
        required: true,
        minLength: 8,
        helpText: 'Password strength will be shown with visual indicators'
      }
    ]
  };

  onSubmit(event: AuthFormSubmitEvent) {
    // This will only be called if password meets minimum "Good" strength
    console.log('Strong password submitted:', event.data);
  }
}
```

## Accessibility Features (WCAG 2.1 AA Compliant)

### Built-in Accessibility

```typescript
// The component automatically provides:
// ✅ ARIA labels and descriptions
// ✅ Keyboard navigation support
// ✅ Screen reader announcements
// ✅ Focus management
// ✅ Live regions for dynamic content
// ✅ Semantic HTML structure

@Component({
  template: `
    <AuthForms
      [config]="accessibleConfig"
      mode="reactive"
      variant="default"
    />
  `
})
export class AccessibleFormComponent {
  accessibleConfig: AuthFormConfig = {
    type: 'login',
    title: 'Accessible Login Form',
    subtitle: 'Fully WCAG 2.1 AA compliant',
    fields: [
      {
        name: 'email',
        type: 'email',
        label: 'Email Address',
        required: true,
        helpText: 'Enter your registered email address',
        // Automatically gets: aria-required, aria-invalid, aria-describedby
      },
      {
        name: 'password',
        type: 'password',
        label: 'Password',
        required: true,
        helpText: 'Password strength requirements will be announced to screen readers',
        // Automatically gets: aria-required, aria-describedby, aria-live regions
      }
    ]
  };
}
```

### Keyboard Navigation

- **Tab/Shift+Tab**: Navigate between fields
- **Enter**: Submit form (only if valid)
- **Space**: Toggle checkboxes and buttons
- **Escape**: Clear focused field
- **Arrow keys**: Navigate within select dropdowns

### Screen Reader Support

```typescript
// Password requirements are announced with proper ARIA labels
const passwordWithA11y: AuthFormField = {
  name: 'password',
  type: 'password',
  label: 'Password',
  required: true,
  minLength: 8,
  helpText: 'Password requirements will be read aloud as you type'
  // Automatically provides:
  // - aria-describedby for password requirements
  // - aria-live regions for strength updates
  // - role="img" for requirement status icons
  // - descriptive aria-labels for each requirement
};
```

## Form Modes

### Reactive Forms Mode (Default)

```typescript
// Best for complex validation and dynamic forms
<AuthForms
  [config]="config"
  mode="reactive"
  [formGroup]="customFormGroup" // Optional: provide your own FormGroup
  (formSubmit)="onSubmit($event)"
/>
```

### Template-Driven Mode

```typescript
// Best for simple forms with two-way data binding
<AuthForms
  [config]="config"
  mode="template"
  [(ngModel)]="formData"
  (formSubmit)="onSubmit($event)"
  (valueChange)="onValueChange($event)"
/>
```

### Automatic Mode Detection

```typescript
// The component can automatically detect the mode based on inputs
<AuthForms
  [config]="config"
  [(ngModel)]="formData" // This will trigger template mode
  (formSubmit)="onSubmit($event)"
/>

<AuthForms
  [config]="config"
  [formGroup]="myForm" // This will trigger reactive mode
  (formSubmit)="onSubmit($event)"
/>
```

## API Reference

### AuthForms Component

#### Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `config` | `AuthFormConfig` | - | Form configuration object |
| `mode` | `'reactive' \| 'template' \| 'auto'` | `'auto'` | Form mode selection |
| `variant` | `AuthFormVariant` | `'default'` | Form styling variant |
| `fieldVariant` | `AuthFieldVariant` | `'floating'` | Field styling variant |
| `socialProviders` | `SocialProvider[]` | `[]` | Social authentication providers |
| `showValidation` | `boolean` | `true` | Show validation messages |
| `autoFocus` | `boolean` | `false` | Auto-focus first input |
| `formGroup` | `FormGroup` | - | Custom FormGroup (reactive mode) |
| `value` | `any` | - | Form value (template mode) |

#### Outputs

| Event | Type | Description |
|-------|------|-------------|
| `formSubmit` | `AuthFormSubmitEvent` | Emitted when form is submitted with valid data |
| `formSwitch` | `AuthFormType` | Emitted when switching form types |
| `forgotPassword` | `void` | Emitted when forgot password clicked |
| `socialLogin` | `SocialLoginEvent` | Emitted when social login clicked |
| `valueChange` | `any` | Emitted when form value changes (template mode) |
| `validationChange` | `boolean` | Emitted when form validation state changes |

### Enhanced Interfaces

#### AuthFormConfig Interface

```typescript
interface AuthFormConfig {
  type: AuthFormType;
  title?: string;
  subtitle?: string;
  submitText?: string;
  fields: AuthFormField[];
  showSocialLogin?: boolean;
  showRememberMe?: boolean;
  showForgotPassword?: boolean;
  showTermsAcceptance?: boolean;
  logo?: string;
  brandName?: string;
  // New accessibility options
  ariaLabel?: string;
  ariaDescribedBy?: string;
  // New validation options
  preventWeakPasswords?: boolean; // Default: true
  minPasswordStrength?: number; // Default: 6 (Good)
}
```

#### AuthFormField Interface

```typescript
interface AuthFormField {
  name: string;
  type: 'text' | 'email' | 'password' | 'tel' | 'checkbox' | 'select';
  label: string;
  placeholder?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  options?: { value: any; label: string }[];
  icon?: string;
  helpText?: string;
  // New accessibility properties
  ariaLabel?: string;
  ariaDescribedBy?: string;
  // New validation properties
  customValidator?: ValidatorFn;
  autocomplete?: string; // Automatically set based on field type
}
```

#### AuthFormSubmitEvent Interface

```typescript
interface AuthFormSubmitEvent {
  type: AuthFormType;
  data: AuthFormData;
  isValid: boolean;
  // New properties
  passwordStrength?: number; // For password fields
  mode: 'reactive' | 'template';
  timestamp: Date;
}
```

#### SocialLoginEvent Interface

```typescript
interface SocialLoginEvent {
  provider: string;
  action: () => void;
  timestamp: Date;
}
```

### Password Strength API

```typescript
// Access password strength information
@Component({
  template: `
    <AuthForms
      #authForm
      [config]="config"
      (formSubmit)="onSubmit($event)"
    />
    
    <!-- Display custom password strength info -->
    <div *ngIf="authForm.getPasswordStrengthScore() > 0">
      Strength: {{ authForm.getPasswordStrengthText() }}
      Score: {{ authForm.getPasswordStrengthScore() }}/8
    </div>
  `
})
export class PasswordStrengthComponent {
  // Available methods on AuthForms component:
  // - getPasswordStrengthScore(): number (0-8)
  // - getPasswordStrengthText(): string
  // - hasMinLength(): boolean
  // - hasUpperCase(): boolean
  // - hasLowerCase(): boolean
  // - hasNumbers(): boolean
  // - hasSpecialChar(): boolean
  // - noCommonPatterns(): boolean
}
```

## Advanced Examples

### Multi-Mode Form with Dynamic Switching

```typescript
@Component({
  template: `
    <div class="form-mode-selector mb-4">
      <button 
        (click)="switchMode('reactive')"
        [class.active]="currentMode() === 'reactive'"
      >
        Reactive Forms
      </button>
      <button 
        (click)="switchMode('template')"
        [class.active]="currentMode() === 'template'"
      >
        Template Forms
      </button>
    </div>

    <AuthForms
      [config]="formConfig"
      [mode]="currentMode()"
      [formGroup]="currentMode() === 'reactive' ? reactiveForm : undefined"
      [(ngModel)]="currentMode() === 'template' ? templateData : undefined"
      (formSubmit)="onSubmit($event)"
    />
  `
})
export class DynamicModeComponent {
  currentMode = signal<'reactive' | 'template'>('reactive');
  templateData = signal<any>({});
  
  reactiveForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  formConfig: AuthFormConfig = {
    type: 'login',
    title: 'Dynamic Form Mode',
    subtitle: 'Supports both reactive and template-driven forms',
    fields: [
      { name: 'email', type: 'email', label: 'Email', required: true },
      { name: 'password', type: 'password', label: 'Password', required: true, minLength: 8 }
    ]
  };

  switchMode(mode: 'reactive' | 'template') {
    this.currentMode.set(mode);
  }

  onSubmit(event: AuthFormSubmitEvent) {
    console.log(`Submitted via ${event.mode} mode:`, event.data);
  }
}
```

### Enhanced Security Registration

```typescript
@Component({
  template: `
    <AuthForms
      [config]="secureRegisterConfig"
      mode="reactive"
      variant="card"
      fieldVariant="floating"
      (formSubmit)="onSecureRegister($event)"
      (validationChange)="onValidationChange($event)"
    />
  `
})
export class SecureRegistrationComponent {
  secureRegisterConfig: AuthFormConfig = {
    type: 'register',
    title: 'Create Secure Account',
    subtitle: 'Enhanced security with strong password requirements',
    preventWeakPasswords: true,
    minPasswordStrength: 7, // Require "Strong" password
    fields: [
      {
        name: 'email',
        type: 'email',
        label: 'Email Address',
        required: true,
        helpText: 'We\'ll send a verification email to this address'
      },
      {
        name: 'password',
        type: 'password',
        label: 'Password',
        required: true,
        minLength: 12, // Higher minimum length
        helpText: 'Must be at least 12 characters with high complexity'
      },
      {
        name: 'confirmPassword',
        type: 'password',
        label: 'Confirm Password',
        required: true,
        helpText: 'Re-enter your password to confirm'
      },
      {
        name: 'termsAccepted',
        type: 'checkbox',
        label: 'I agree to the <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>',
        required: true
      }
    ]
  };

  onSecureRegister(event: AuthFormSubmitEvent) {
    // Only called for passwords with strength >= 7 (Strong)
    console.log('Secure registration with strong password:', {
      ...event.data,
      passwordStrength: event.passwordStrength
    });
  }

  onValidationChange(isValid: boolean) {
    console.log('Form validation state:', isValid);
  }
}
```

### Accessibility-First Form

```typescript
@Component({
  template: `
    <AuthForms
      [config]="a11yConfig"
      mode="reactive"
      variant="minimal"
      fieldVariant="outlined"
      ariaLabel="Accessible login form"
      role="form"
      (formSubmit)="onSubmit($event)"
    />
  `
})
export class AccessibilityFirstComponent {
  a11yConfig: AuthFormConfig = {
    type: 'login',
    title: 'Accessible Login',
    subtitle: 'Designed for screen readers and keyboard navigation',
    ariaLabel: 'User authentication form',
    fields: [
      {
        name: 'email',
        type: 'email',
        label: 'Email Address',
        required: true,
        helpText: 'Enter the email address associated with your account',
        ariaLabel: 'Email address field',
        autocomplete: 'email'
      },
      {
        name: 'password',
        type: 'password',
        label: 'Password',
        required: true,
        helpText: 'Enter your account password. Password requirements will be announced as you type.',
        ariaLabel: 'Password field with strength requirements',
        autocomplete: 'current-password'
      }
    ]
  };

  onSubmit(event: AuthFormSubmitEvent) {
    // Screen readers will announce form submission
    this.announceToScreenReader('Form submitted successfully');
    console.log('Accessible form submitted:', event.data);
  }

  private announceToScreenReader(message: string) {
    // Custom screen reader announcement
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    setTimeout(() => document.body.removeChild(announcement), 1000);
  }
}
```

## Form Variants

### Glass Morphism with Enhanced Security

```typescript
@Component({
  template: `
    <div class="glass-container">
      <AuthForms
        [config]="glassConfig"
        variant="glass"
        fieldVariant="floating"
        mode="reactive"
        (formSubmit)="onGlassSubmit($event)"
      />
    </div>
  `,
  styles: [`
    .glass-container {
      background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
      backdrop-filter: blur(10px);
      border-radius: 20px;
      border: 1px solid rgba(255,255,255,0.18);
      padding: 2rem;
    }
  `]
})
export class GlassMorphismComponent {
  glassConfig: AuthFormConfig = {
    type: 'login',
    title: 'Glass Login',
    subtitle: 'Modern glassmorphism design with enhanced security',
    preventWeakPasswords: true,
    fields: [
      { name: 'email', type: 'email', label: 'Email', required: true },
      { name: 'password', type: 'password', label: 'Password', required: true, minLength: 8 }
    ]
  };
}
```

## Integration Examples

### With NgRx Store

```typescript
import { Store } from '@ngrx/store';
import { AuthActions } from './store/auth.actions';

@Component({
  template: `
    <AuthForms
      [config]="loginConfig"
      mode="reactive"
      (formSubmit)="onLogin($event)"
    />
  `
})
export class NgRxLoginComponent {
  constructor(private store: Store) {}

  loginConfig: AuthFormConfig = {
    type: 'login',
    title: 'Login with NgRx',
    fields: [
      { name: 'email', type: 'email', label: 'Email', required: true },
      { name: 'password', type: 'password', label: 'Password', required: true }
    ]
  };

  onLogin(event: AuthFormSubmitEvent) {
    // Dispatch login action with form data
    this.store.dispatch(AuthActions.login({
      credentials: event.data,
      timestamp: event.timestamp,
      mode: event.mode
    }));
  }
}
```

### With Custom Validation Service

```typescript
@Injectable()
export class CustomValidationService {
  validateEmail(email: string): Observable<boolean> {
    return this.http.get<boolean>(`/api/validate-email/${email}`);
  }

  checkPasswordStrength(password: string): PasswordStrengthResult {
    // Custom password validation logic
    return {
      score: this.calculateScore(password),
      feedback: this.generateFeedback(password)
    };
  }
}

@Component({
  template: `
    <AuthForms
      [config]="customValidationConfig"
      mode="reactive"
      [formGroup]="customForm"
      (formSubmit)="onSubmit($event)"
    />
  `
})
export class CustomValidationComponent {
  customForm = this.fb.group({
    email: ['', [Validators.required], [this.asyncEmailValidator.bind(this)]],
    password: ['', [Validators.required, this.customPasswordValidator.bind(this)]]
  });

  constructor(
    private fb: FormBuilder,
    private validationService: CustomValidationService
  ) {}

  asyncEmailValidator(control: AbstractControl) {
    if (!control.value) return of(null);
    
    return this.validationService.validateEmail(control.value).pipe(
      map(isValid => isValid ? null : { emailTaken: true }),
      catchError(() => of(null))
    );
  }

  customPasswordValidator(control: AbstractControl) {
    if (!control.value) return null;
    
    const result = this.validationService.checkPasswordStrength(control.value);
    return result.score >= 6 ? null : { weakPassword: result.feedback };
  }
}
```

## Migration Guide

### From Previous Version

```typescript
// Before (v1.x)
<AuthForms
  [config]="config"
  (formSubmit)="onSubmit($event)"
/>

// After (v2.x) - Enhanced with dual-mode support
<AuthForms
  [config]="config"
  mode="reactive" // or "template" or "auto"
  fieldVariant="floating" // Enhanced floating labels
  (formSubmit)="onSubmit($event)"
  (validationChange)="onValidationChange($event)" // New event
/>
```

### Breaking Changes

1. **autoFocus default changed**: Now defaults to `false` instead of `true`
2. **Password validation enhanced**: Minimum "Good" strength required by default
3. **Floating labels improved**: Better UX with placeholder visibility
4. **New required imports**: Need either `ReactiveFormsModule` or `FormsModule`

```typescript
// Update your imports
import { ReactiveFormsModule } from '@angular/forms'; // For reactive mode
// OR
import { FormsModule } from '@angular/forms'; // For template mode

@Component({
  imports: [AuthForms, ReactiveFormsModule] // or FormsModule
})
```

## Performance Optimizations

### Lazy Loading Validation

```typescript
@Component({
  template: `
    <AuthForms
      [config]="lazyConfig"
      mode="reactive"
      [showValidation]="showValidation()"
      (formSubmit)="onSubmit($event)"
    />
  `
})
export class LazyValidationComponent {
  showValidation = signal(false);

  // Only show validation after first interaction
  ngOnInit() {
    // Enable validation after user starts typing
    setTimeout(() => this.showValidation.set(true), 1000);
  }
}
```

### Memory Efficient Updates

```typescript
// The component uses Angular Signals for efficient updates
// Only changed fields trigger re-renders, not the entire form
@Component({
  template: `
    <AuthForms
      [config]="efficientConfig"
      mode="reactive"
      (formSubmit)="onSubmit($event)"
    />
  `
})
export class EfficientComponent {
  // Use computed for derived state
  efficientConfig = computed(() => ({
    type: 'login' as const,
    title: this.title(),
    fields: this.fields()
  }));

  private title = signal('Dynamic Title');
  private fields = signal([
    { name: 'email', type: 'email' as const, label: 'Email', required: true }
  ]);
}
```

## Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+
- **Mobile Safari**: 14+
- **Chrome Mobile**: 90+

## Bundle Size

- **Core**: ~12KB gzipped
- **With Reactive Forms**: ~15KB gzipped  
- **With Template Forms**: ~13KB gzipped
- **Full Features**: ~18KB gzipped

## Support

- **Documentation**: [https://angular-superui.dev/docs](https://angular-superui.dev/docs)
- **GitHub Issues**: [Report bugs](https://github.com/bhaimicrosoft/angular-superui/issues)
- **Discord**: [Join our community](https://discord.gg/angular-superui)
- **Examples**: [CodeSandbox demos](https://codesandbox.io/examples/angular-superui-auth-forms)

---

Built with ❤️ by the Angular SuperUI team
      {
        name: 'email',
        type: 'email',
        label: 'Email',
        required: true,
        icon: '📧'
      },
      {
        name: 'password',
        type: 'password',
        label: 'Password',
        required: true,
        minLength: 6,
        icon: '🔒'
      }
    ]
  };

  onLogin(event: AuthFormSubmitEvent) {
    console.log('Login data:', event.data);
    // Handle authentication
  }
}
```

### Registration Form

```typescript
registerConfig: AuthFormConfig = {
  type: 'register',
  title: 'Create Account',
  subtitle: 'Join our community today',
  showSocialLogin: true,
  showTermsAcceptance: true,
  fields: [
    {
      name: 'fullName',
      type: 'text',
      label: 'Full Name',
      required: true
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      required: true
    },
    {
      name: 'password',
      type: 'password',
      label: 'Password',
      required: true,
      minLength: 8
    },
    {
      name: 'confirmPassword',
      type: 'password',
      label: 'Confirm Password',
      required: true
    },
    {
      name: 'termsAccepted',
      type: 'checkbox',
      label: 'I agree to the Terms of Service',
      required: true
    }
  ]
};
```

## Form Variants

### Available Variants

- **default**: Clean card design with shadow
- **minimal**: Ultra-minimal with subtle styling
- **card**: Elevated card with enhanced shadows
- **glass**: Glassmorphism effect with backdrop blur
- **modern**: Gradient backgrounds with rounded corners
- **split**: Full-height split layout design
- **centered**: Center-aligned with compact spacing

### Field Variants

- **default**: Standard input styling
- **floating**: Floating label animation
- **outlined**: Bordered input fields
- **filled**: Filled background styling
- **underlined**: Bottom border only

## Social Authentication

### Setup Social Providers

```typescript
import { SocialProvider } from '@ngsui/blocks';

socialProviders: SocialProvider[] = [
  {
    name: 'Google',
    icon: '<svg>...</svg>', // Google icon SVG
    color: '#4285f4',
    action: () => this.signInWithGoogle()
  },
  {
    name: 'GitHub',
    icon: '<svg>...</svg>', // GitHub icon SVG
    color: '#24292e',
    action: () => this.signInWithGitHub()
  },
  {
    name: 'Microsoft',
    icon: '<svg>...</svg>', // Microsoft icon SVG
    color: '#0078d4',
    action: () => this.signInWithMicrosoft()
  }
];
```

### Implementation

```typescript
<AuthForms
  [config]="loginConfig"
  [socialProviders]="socialProviders"
  variant="glass"
  (formSubmit)="onFormSubmit($event)"
  (socialLogin)="onSocialLogin($event)"
/>
```

## API Reference

### AuthForms Component

#### Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `config` | `AuthFormConfig` | - | Form configuration object |
| `variant` | `AuthFormVariant` | `'default'` | Form styling variant |
| `fieldVariant` | `AuthFieldVariant` | `'default'` | Field styling variant |
| `socialProviders` | `SocialProvider[]` | `[]` | Social authentication providers |
| `showValidation` | `boolean` | `true` | Show validation messages |
| `autoFocus` | `boolean` | `true` | Auto-focus first input |

#### Outputs

| Event | Type | Description |
|-------|------|-------------|
| `formSubmit` | `AuthFormSubmitEvent` | Emitted when form is submitted |
| `formSwitch` | `AuthFormType` | Emitted when switching form types |
| `forgotPassword` | `void` | Emitted when forgot password clicked |
| `socialLogin` | `string` | Emitted when social login clicked |

### AuthFormConfig Interface

```typescript
interface AuthFormConfig {
  type: AuthFormType;
  title?: string;
  subtitle?: string;
  submitText?: string;
  fields: AuthFormField[];
  showSocialLogin?: boolean;
  showRememberMe?: boolean;
  showForgotPassword?: boolean;
  showTermsAcceptance?: boolean;
  logo?: string;
  brandName?: string;
}
```

### AuthFormField Interface

```typescript
interface AuthFormField {
  name: string;
  type: 'text' | 'email' | 'password' | 'tel' | 'checkbox' | 'select';
  label: string;
  placeholder?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  options?: { value: any; label: string }[];
  icon?: string;
  helpText?: string;
}
```

### AuthFormSubmitEvent Interface

```typescript
interface AuthFormSubmitEvent {
  type: AuthFormType;
  data: AuthFormData;
  isValid: boolean;
}
```

## Advanced Examples

### Custom Validation

```typescript
import { 
  emailValidator, 
  passwordStrengthValidator, 
  confirmPasswordValidator 
} from '@ngsui/blocks';

// Custom email validation
customEmailField: AuthFormField = {
  name: 'email',
  type: 'email',
  label: 'Email Address',
  required: true,
  pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
  helpText: 'Please enter a valid email address'
};

// Password with strength validation
passwordField: AuthFormField = {
  name: 'password',
  type: 'password',
  label: 'Password',
  required: true,
  minLength: 8,
  helpText: 'Must contain uppercase, lowercase, numbers, and symbols'
};
```

### Multi-Step Registration

```typescript
@Component({
  template: `
    <AuthForms
      [config]="currentStepConfig()"
      variant="modern"
      fieldVariant="floating"
      (formSubmit)="onStepSubmit($event)"
    />
  `
})
export class MultiStepRegisterComponent {
  currentStep = signal(1);
  
  currentStepConfig = computed(() => {
    switch (this.currentStep()) {
      case 1: return this.personalInfoConfig;
      case 2: return this.accountDetailsConfig;
      case 3: return this.preferencesConfig;
      default: return this.personalInfoConfig;
    }
  });

  personalInfoConfig: AuthFormConfig = {
    type: 'register',
    title: 'Personal Information',
    subtitle: 'Step 1 of 3',
    fields: [
      { name: 'firstName', type: 'text', label: 'First Name', required: true },
      { name: 'lastName', type: 'text', label: 'Last Name', required: true },
      { name: 'dateOfBirth', type: 'date', label: 'Date of Birth' }
    ]
  };

  onStepSubmit(event: AuthFormSubmitEvent) {
    // Save step data and proceed to next step
    this.saveStepData(this.currentStep(), event.data);
    this.currentStep.update(step => step + 1);
  }
}
```

### Conditional Fields

```typescript
@Component({
  template: `
    <AuthForms
      [config]="dynamicConfig()"
      (formSubmit)="onSubmit($event)"
    />
  `
})
export class ConditionalFormComponent {
  userType = signal<'individual' | 'business'>('individual');
  
  dynamicConfig = computed(() => ({
    type: 'register' as const,
    title: 'Create Account',
    fields: [
      {
        name: 'userType',
        type: 'select' as const,
        label: 'Account Type',
        required: true,
        options: [
          { value: 'individual', label: 'Individual' },
          { value: 'business', label: 'Business' }
        ]
      },
      // Conditional fields based on user type
      ...(this.userType() === 'business' ? [
        {
          name: 'companyName',
          type: 'text' as const,
          label: 'Company Name',
          required: true
        },
        {
          name: 'taxId',
          type: 'text' as const,
          label: 'Tax ID',
          required: true
        }
      ] : [])
    ]
  }));
}
```

## Password Recovery Flow

### Forgot Password

```typescript
forgotPasswordConfig: AuthFormConfig = {
  type: 'forgot-password',
  title: 'Reset Password',
  subtitle: 'Enter your email to receive reset instructions',
  fields: [
    {
      name: 'email',
      type: 'email',
      label: 'Email Address',
      required: true,
      helpText: 'We\'ll send reset instructions to this email'
    }
  ]
};
```

### Reset Password

```typescript
resetPasswordConfig: AuthFormConfig = {
  type: 'reset-password',
  title: 'New Password',
  subtitle: 'Create a strong new password',
  fields: [
    {
      name: 'password',
      type: 'password',
      label: 'New Password',
      required: true,
      minLength: 8
    },
    {
      name: 'confirmPassword',
      type: 'password',
      label: 'Confirm Password',
      required: true
    }
  ]
};
```

## Integration Examples

### With Angular Forms

```typescript
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  template: `
    <AuthForms
      [config]="loginConfig"
      (formSubmit)="onLogin($event)"
    />
  `
})
export class IntegratedLoginComponent {
  constructor(private fb: FormBuilder) {}

  onLogin(event: AuthFormSubmitEvent) {
    const { email, password, rememberMe } = event.data;
    
    // Use with your authentication service
    this.authService.login({
      email,
      password,
      rememberMe
    }).subscribe({
      next: (response) => {
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.handleLoginError(error);
      }
    });
  }
}
```

### With State Management

```typescript
// Using NgRx
@Component({
  template: `
    <AuthForms
      [config]="loginConfig"
      (formSubmit)="onLogin($event)"
    />
  `
})
export class LoginWithNgrxComponent {
  constructor(private store: Store) {}

  onLogin(event: AuthFormSubmitEvent) {
    this.store.dispatch(AuthActions.login({
      credentials: event.data
    }));
  }
}
```

### Error Handling

```typescript
@Component({
  template: `
    <AuthForms
      [config]="configWithErrors()"
      (formSubmit)="onSubmit($event)"
    />
  `
})
export class ErrorHandlingComponent {
  authErrors = signal<{ [key: string]: string }>({});

  configWithErrors = computed(() => ({
    ...this.baseConfig,
    fields: this.baseConfig.fields.map(field => ({
      ...field,
      helpText: this.authErrors()[field.name] || field.helpText
    }))
  }));

  onSubmit(event: AuthFormSubmitEvent) {
    this.authService.login(event.data).subscribe({
      error: (error) => {
        // Map server errors to field errors
        this.authErrors.set({
          email: error.field === 'email' ? error.message : '',
          password: error.field === 'password' ? error.message : ''
        });
      }
    });
  }
}
```

## Styling & Theming

### CSS Custom Properties

```css
.auth-form {
  /* Layout */
  --auth-form-width: 400px;
  --auth-form-padding: 2rem;
  --auth-form-gap: 1.5rem;
  
  /* Colors */
  --auth-form-bg: rgb(255 255 255);
  --auth-form-border: rgb(229 231 235);
  --auth-form-text: rgb(17 24 39);
  --auth-form-accent: rgb(99 102 241);
  
  /* Input styling */
  --auth-input-height: 48px;
  --auth-input-padding: 12px 16px;
  --auth-input-border-radius: 8px;
  
  /* Button styling */
  --auth-button-height: 48px;
  --auth-button-padding: 12px 24px;
  --auth-button-border-radius: 8px;
}
```

### Dark Mode

```css
@media (prefers-color-scheme: dark) {
  .auth-form {
    --auth-form-bg: rgb(31 41 55);
    --auth-form-border: rgb(75 85 99);
    --auth-form-text: rgb(243 244 246);
  }
}
```

### Custom Styling

```typescript
<AuthForms
  [config]="config"
  variant="custom"
  class="my-custom-auth-form"
/>

<style>
.my-custom-auth-form {
  max-width: 500px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 3rem;
}

.my-custom-auth-form .form-field input {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
}

.my-custom-auth-form .form-field input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}
</style>
```

## Validation Rules

### Built-in Validators

```typescript
import { 
  emailValidator, 
  passwordStrengthValidator, 
  confirmPasswordValidator 
} from '@ngsui/blocks';

// Email validation
const emailField: AuthFormField = {
  name: 'email',
  type: 'email',
  label: 'Email',
  required: true
  // Automatically applies email validation
};

// Password strength validation
const passwordField: AuthFormField = {
  name: 'password',
  type: 'password',
  label: 'Password',
  required: true,
  minLength: 8
  // Automatically applies password strength validation
};
```

### Custom Validators

```typescript
// Custom phone number validator
function phoneValidator(control: AbstractControl) {
  const phone = control.value;
  if (!phone) return null;
  
  const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
  return phoneRegex.test(phone) ? null : { invalidPhone: true };
}

// Custom username validator
function usernameValidator(control: AbstractControl) {
  const username = control.value;
  if (!username) return null;
  
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username) ? null : { invalidUsername: true };
}
```

## Security Best Practices

### Input Sanitization

```typescript
// The component automatically sanitizes inputs
// But you can add additional validation

onFormSubmit(event: AuthFormSubmitEvent) {
  // Sanitize email
  const email = event.data.email?.toLowerCase().trim();
  
  // Validate password complexity
  if (!this.isPasswordSecure(event.data.password)) {
    this.showPasswordWarning();
    return;
  }
  
  // Proceed with authentication
  this.authenticate({ ...event.data, email });
}
```

### CSRF Protection

```typescript
// Add CSRF token to form data
onFormSubmit(event: AuthFormSubmitEvent) {
  const formData = {
    ...event.data,
    _token: this.csrfToken
  };
  
  this.authService.login(formData);
}
```

### Rate Limiting

```typescript
@Component({
  template: `
    <AuthForms
      [config]="loginConfig"
      [disabled]="isRateLimited()"
      (formSubmit)="onLogin($event)"
    />
  `
})
export class SecureLoginComponent {
  loginAttempts = signal(0);
  lastAttempt = signal<Date | null>(null);
  
  isRateLimited = computed(() => {
    if (this.loginAttempts() >= 3) {
      const timeSinceLastAttempt = Date.now() - (this.lastAttempt()?.getTime() || 0);
      return timeSinceLastAttempt < 300000; // 5 minutes
    }
    return false;
  });

  onLogin(event: AuthFormSubmitEvent) {
    if (this.isRateLimited()) {
      this.showRateLimitMessage();
      return;
    }

    this.authService.login(event.data).subscribe({
      next: () => {
        this.loginAttempts.set(0);
      },
      error: () => {
        this.loginAttempts.update(count => count + 1);
        this.lastAttempt.set(new Date());
      }
    });
  }
}
```

## Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

## Accessibility

### ARIA Compliance

```typescript
// The component automatically includes:
// - aria-describedby for help text
// - aria-invalid for validation states
// - aria-required for required fields
// - role attributes for proper semantics

<AuthForms
  [config]="config"
  ariaLabel="Login form"
  role="form"
/>
```

### Keyboard Navigation

- **Tab**: Navigate between fields
- **Enter**: Submit form
- **Space**: Toggle checkboxes
- **Escape**: Clear focused field

### Screen Reader Support

```typescript
// Provide descriptive labels and help text
const accessibleField: AuthFormField = {
  name: 'password',
  type: 'password',
  label: 'Password',
  required: true,
  helpText: 'Password must be at least 8 characters long and contain uppercase, lowercase, numbers, and special characters',
  // Screen reader will announce: "Password, required, edit text, Password must be at least..."
};
```

## Performance

- **Bundle Size**: ~15KB gzipped
- **Tree Shaking**: Only used validators and components are included
- **Lazy Loading**: Form validation runs only when needed
- **Memory Efficient**: Signals-based reactive updates

## Migration Guide

### From Angular Material

```typescript
// Before (Angular Material)
<mat-form-field>
  <mat-label>Email</mat-label>
  <input matInput type="email" formControlName="email">
  <mat-error>Please enter a valid email</mat-error>
</mat-form-field>

// After (Angular SuperUI)
{
  name: 'email',
  type: 'email',
  label: 'Email',
  required: true
}
```

### From Reactive Forms

```typescript
// Before (Manual Reactive Forms)
ngOnInit() {
  this.loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
}

// After (Auth Forms Block)
loginConfig: AuthFormConfig = {
  type: 'login',
  fields: [
    { name: 'email', type: 'email', label: 'Email', required: true },
    { name: 'password', type: 'password', label: 'Password', required: true, minLength: 6 }
  ]
};
```

## Examples Repository

Find more examples and templates in our [GitHub repository](https://github.com/bhaimicrosoft/angular-superui/tree/main/examples/auth-forms).

## Support

- **Documentation**: [https://angular-superui.dev/docs](https://angular-superui.dev/docs)
- **GitHub Issues**: [Report bugs](https://github.com/bhaimicrosoft/angular-superui/issues)
- **Discord**: [Join our community](https://discord.gg/angular-superui)

---

Built with ❤️ by the Angular SuperUI team
