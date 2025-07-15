# Angular SuperUI

A modern Angular UI component library built with Tailwind CSS and TypeScript.

## 🚀 Installation

```bash
npm install angular-superui
```

## 📦 Peer Dependencies

Make sure you have these installed in your project:

```bash
npm install @angular/common @angular/core class-variance-authority clsx tailwind-merge
```

## 🎨 Setup

1. **Import the components** in your Angular module or standalone component:

```typescript
import { Alert, Button, Input } from 'angular-superui';

@Component({
  standalone: true,
  imports: [Alert, Button, Input],
  // ...
})
```

2. **Add Tailwind CSS** to your project if you haven't already.

## 📚 Components

### Alert
Display contextual feedback messages.

```html
<lib-alert variant="success">
  <svg><!-- icon --></svg>
  <h5>Success!</h5>
  <div>Your action was completed successfully.</div>
</lib-alert>
```

**Variants:** `default` | `success` | `warning` | `destructive`

### Button
Interactive button component with multiple variants.

```html
<lib-button variant="primary" size="lg">Click me</lib-button>
```

**Variants:** `default` | `secondary` | `destructive` | `outline` | `ghost` | `link`
**Sizes:** `default` | `sm` | `lg` | `icon`

### Input
Form input component with built-in styling.

```html
<lib-input type="text" placeholder="Enter text..."></lib-input>
```

## 🎨 Styling

This library uses Tailwind CSS for styling. Make sure your project has Tailwind configured.

## 📄 License

MIT License - see LICENSE file for details.
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the library, run:

```bash
ng build lib
```

This command will compile your project, and the build artifacts will be placed in the `dist/` directory.

### Publishing the Library

Once the project is built, you can publish your library by following these steps:

1. Navigate to the `dist` directory:
   ```bash
   cd dist/lib
   ```

2. Run the `npm publish` command to publish your library to the npm registry:
   ```bash
   npm publish
   ```

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
