# Auth Forms - Template-Driven Support Enhancement

## Current State
- ✅ **Reactive Forms**: Fully supported
- ❌ **Template-Driven Forms**: Not supported

## Enhancement Plan: Dual Mode Support

### 1. Enhanced Interface
```typescript
export interface AuthFormConfig {
  mode?: 'reactive' | 'template'; // NEW: Form mode selector
  type: AuthFormType;
  // ... existing properties
}
```

### 2. Template-Driven Input Properties
```typescript
@Component({...})
export class AuthForms {
  // EXISTING: Reactive mode
  config = input.required<AuthFormConfig>();
  
  // NEW: Template-driven mode
  formModel = input<any>({}); // Two-way binding model
  formModelChange = output<any>(); // Two-way binding output
}
```

### 3. Hybrid Template Structure
```html
<!-- REACTIVE MODE (Current) -->
<form *ngIf="config().mode === 'reactive'" [formGroup]="authForm()" (ngSubmit)="onSubmit()">
  <input [formControlName]="field.name">
</form>

<!-- TEMPLATE-DRIVEN MODE (New) -->
<form *ngIf="config().mode === 'template'" #templateForm="ngForm" (ngSubmit)="onTemplateSubmit(templateForm)">
  <input 
    [name]="field.name"
    [(ngModel)]="formModel()[field.name]"
    [required]="field.required"
    [minlength]="field.minLength"
    [pattern]="field.pattern"
    #fieldRef="ngModel"
  >
  
  <!-- Template-driven validation -->
  <div *ngIf="fieldRef.invalid && fieldRef.touched">
    <p *ngIf="fieldRef.errors?.['required']">{{ field.label }} is required</p>
  </div>
</form>
```

### 4. Usage Examples

#### Reactive Forms (Current)
```typescript
// Component
loginConfig = {
  mode: 'reactive',
  type: 'login',
  fields: [...]
};

// Template
<AuthForms 
  [config]="loginConfig"
  (formSubmit)="handleSubmit($event)"
/>
```

#### Template-Driven Forms (New)
```typescript
// Component
loginData = {
  email: '',
  password: '',
  rememberMe: false
};

loginConfig = {
  mode: 'template',
  type: 'login',
  fields: [...]
};

// Template
<AuthForms 
  [config]="loginConfig"
  [(formModel)]="loginData"
  (formSubmit)="handleSubmit($event)"
/>
```

## Implementation Effort
- **Complexity**: Medium
- **Breaking Changes**: None (backward compatible)
- **New Features**: Template-driven support, two-way binding
- **Files to Modify**: 1 (auth-forms/index.ts)
- **Estimated Time**: 4-6 hours

## Benefits
- ✅ **Backward Compatible**: Existing reactive forms continue to work
- ✅ **Flexibility**: Developers can choose their preferred approach
- ✅ **Migration Path**: Easy to migrate from template-driven to reactive
- ✅ **Learning Curve**: Familiar ngModel syntax for beginners
