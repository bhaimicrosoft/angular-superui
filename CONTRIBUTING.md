# Contributing to Angular SuperUI

Thank you for your interest in contributing to Angular SuperUI! This guide will help you get started with contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Component Guidelines](#component-guidelines)
- [Documentation](#documentation)

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please read it before contributing.

### Our Standards

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Respect different viewpoints and experiences
- Show empathy towards other community members

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher
- Angular CLI 20 or higher
- Git

### Repository Setup

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/yourusername/angular-superui.git
   cd angular-superui
   ```

3. Add the upstream repository:
   ```bash
   git remote add upstream https://github.com/originalowner/angular-superui.git
   ```

4. Install dependencies:
   ```bash
   npm install
   ```

## Development Setup

### Project Structure

```
angular-superui/
├── projects/
│   ├── lib/                 # Main library code
│   │   ├── src/lib/         # Components
│   │   └── schematics/      # ng-add automation
│   └── showcase/            # Demo application
├── docs/                    # Documentation
└── dist/                    # Built library
```

### Development Commands

```bash
# Start development server
npm start

# Build the library
npm run build

# Run tests
npm test

# Lint code
npm run lint

# Build documentation
npm run build:docs
```

### Environment Setup

1. Start the development server:
   ```bash
   npm start
   ```

2. Open your browser to `http://localhost:4200`

3. The showcase app will reload automatically as you make changes

## Making Changes

### Branch Naming

Use descriptive branch names:
- `feat/component-name` - New features
- `fix/issue-description` - Bug fixes
- `docs/update-readme` - Documentation updates
- `refactor/component-cleanup` - Code refactoring

### Commit Messages

Follow conventional commit format:
```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:
```
feat(button): add size variants
fix(alert): resolve SVG positioning issue
docs(readme): update installation instructions
```

### Code Style

We use ESLint and Prettier for code formatting:

```bash
# Check linting
npm run lint

# Fix auto-fixable issues
npm run lint:fix

# Format code
npm run format
```

#### Key Guidelines

- Use TypeScript for all new code
- Follow Angular style guide
- Use meaningful variable and function names
- Add JSDoc comments for public APIs
- Prefer composition over inheritance
- Keep components focused and single-purpose

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Guidelines

1. **Unit Tests**: Test component logic, inputs, outputs
2. **Integration Tests**: Test component interactions
3. **Accessibility Tests**: Ensure WCAG compliance

#### Example Test Structure

```typescript
describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply correct variant class', () => {
    component.variant = 'destructive';
    fixture.detectChanges();
    
    const element = fixture.nativeElement;
    expect(element).toHaveClass('destructive');
  });

  it('should emit close event', () => {
    spyOn(component.onClose, 'emit');
    
    component.close();
    
    expect(component.onClose.emit).toHaveBeenCalled();
  });
});
```

## Submitting Changes

### Pull Request Process

1. **Update your fork**:
   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

2. **Create a feature branch**:
   ```bash
   git checkout -b feat/your-feature
   ```

3. **Make your changes** and commit them

4. **Push to your fork**:
   ```bash
   git push origin feat/your-feature
   ```

5. **Create a Pull Request** on GitHub

### Pull Request Guidelines

- Fill out the PR template completely
- Include screenshots for UI changes
- Reference related issues
- Ensure all tests pass
- Update documentation if needed

#### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Manual testing completed
- [ ] Accessibility testing done

## Screenshots
Include screenshots for UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Tests added/updated
```

## Component Guidelines

### Creating New Components

1. **Use the component generator**:
   ```bash
   ng generate component new-component --project=lib
   ```

2. **Follow the component structure**:
   ```typescript
   @Component({
     selector: 'lib-component-name',
     standalone: true,
     imports: [CommonModule],
     template: './component.html',
     styleUrls: ['./component.scss']
   })
   export class ComponentNameComponent {
     // Implementation
   }
   ```

3. **Add to public API**:
   ```typescript
   // projects/lib/src/public-api.ts
   export * from './lib/component-name/component-name.component';
   ```

### Component Standards

#### Inputs and Outputs

```typescript
export class ComponentNameComponent {
  @Input() variant: 'default' | 'primary' = 'default';
  @Input() disabled = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  
  @Output() onClick = new EventEmitter<MouseEvent>();
  @Output() onFocus = new EventEmitter<FocusEvent>();
}
```

#### Styling

- Use CSS custom properties for theming
- Follow BEM methodology for CSS classes
- Use class-variance-authority for variants
- Ensure responsive design

```scss
.lib-component {
  // Base styles
  display: inline-flex;
  align-items: center;
  
  // CSS custom properties
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
  border: 1px solid hsl(var(--border));
  
  // Variants handled by CVA
  &.variant-primary {
    background-color: hsl(var(--primary));
    color: hsl(var(--primary-foreground));
  }
}
```

#### Accessibility

- Include ARIA attributes
- Support keyboard navigation
- Provide screen reader text
- Test with assistive technologies

```typescript
@Component({
  template: `
    <button
      [attr.aria-pressed]="pressed"
      [attr.aria-disabled]="disabled"
      [attr.aria-label]="ariaLabel"
      (click)="handleClick()"
      (keydown)="handleKeydown($event)">
      <ng-content></ng-content>
    </button>
  `
})
```

### Documentation Requirements

Each component must include:

1. **API Documentation**: Input/output properties
2. **Usage Examples**: Basic and advanced use cases
3. **Accessibility Notes**: WCAG compliance details
4. **Styling Guide**: CSS custom properties

## Documentation

### Writing Documentation

- Use clear, concise language
- Include code examples
- Add screenshots for visual components
- Link to related concepts

### Documentation Structure

```markdown
# Component Name

Brief description of the component.

## Installation

```bash
ng add angular-superui
```

## Usage

### Basic Example

```typescript
// Component code
```

### API Reference

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| variant  | string | 'default' | Visual variant |

### Accessibility

- Supports ARIA attributes
- Keyboard navigation included
- Screen reader compatible
```

## Release Process

### Versioning

We follow [Semantic Versioning](https://semver.org/):
- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes

### Release Checklist

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Build and test the library
4. Create a release tag
5. Publish to npm
6. Update documentation

## Getting Help

### Community Support

- [GitHub Discussions](https://github.com/originalowner/angular-superui/discussions) - General questions
- [Issues](https://github.com/originalowner/angular-superui/issues) - Bug reports and feature requests

### Development Questions

- Check existing issues and discussions
- Join our Discord server (link coming soon)
- Ask questions in GitHub Discussions

## Recognition

We appreciate all contributions! Contributors will be:
- Listed in the README
- Mentioned in release notes
- Given credit in the changelog

Thank you for contributing to Angular SuperUI! 🎉
