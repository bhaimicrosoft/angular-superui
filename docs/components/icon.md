# Icon Component ⭐

Universal icon component that renders SVG/HTML strings, CSS class icons, Angular components, templates, and Lucide icon data with accessibility and security built in.

## Features

- 🔄 Multiple sources: HTML/SVG string, CSS class (Font Awesome etc.), Angular component, TemplateRef, LucideIconData
- 🧼 Secure by default: sanitized HTML/SVG and controlled rendering APIs
- ♿ Accessibility: ARIA labeling, keyboard support when interactive
- 🎛 Variants & sizes: CVA-based `variant` and `size` options
- ⚡ Fast: signal-based, OnPush change detection

## Installation

Use the CLI to add the Icon component to your project:

```bash
npx ngsui-cli add icon
```

This command installs angular-superui (if missing) and wires required styles.

## Import

```ts
import { Component } from '@angular/core';
import { Icon } from 'angular-superui';

@Component({
  standalone: true,
  imports: [Icon],
  template: `<Icon [icon]="'<svg>...</svg>'" />`
})
export class Example {}
```

## Examples

Below are working snippets taken from the showcase demo.

### Sizes & Variants

```html
<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-6">
  <div *ngFor="let s of ['xs','sm','md','lg','xl','2xl','3xl']" class="text-center">
    <Icon [icon]="svgCheck" [size]="s" ariaLabel="Check" />
  </div>
</div>

<div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 mt-6">
  <div *ngFor="let v of ['default','primary','secondary','muted','destructive','success','warning','info']" class="text-center">
    <Icon [icon]="'fa-regular fa-star'" [variant]="v" size="lg" ariaLabel="Star" />
  </div>
</div>
```

### Inline HTML/SVG

```ts
svgCheck = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`;
svgHeart = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41 1.01 4.22 2.61C12.09 5.01 13.76 4 15.5 4 18 4 20 6 20 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
```

```html
<Icon [icon]="svgCheck" size="xl" ariaLabel="Check" />
<Icon [icon]="svgHeart" size="xl" variant="destructive" ariaLabel="Heart" />
```

### CSS Class Icons (Font Awesome)

Install and add to styles (already handled in showcase):

```bash
npm i @fortawesome/fontawesome-free
```

angular.json

```json
{
  "styles": [
    "projects/showcase/src/styles.css",
    "node_modules/@fortawesome/fontawesome-free/css/all.min.css"
  ]
}
```

Usage

```html
<Icon icon="fa-solid fa-house" size="xl" ariaLabel="Home" />
<Icon icon="fa-solid fa-bell" size="xl" variant="warning" ariaLabel="Bell" />
<Icon icon="fa-regular fa-star" size="xl" variant="info" ariaLabel="Star" />
<Icon icon="fa-brands fa-github" size="xl" variant="muted" ariaLabel="GitHub" />
```

### Angular Component Icons

```ts
@Component({
  selector: 'demo-inline-check-icon',
  standalone: true,
  template: `<svg width="24" height="24" fill="none" stroke="currentColor"><path d="M20 6L9 17l-5-5"/></svg>`
})
export class DemoInlineCheckIcon {}

inlineCheckComponent = DemoInlineCheckIcon;
```

```html
<Icon [icon]="inlineCheckComponent" size="xl" variant="success" ariaLabel="Inline Check" />
```

### TemplateRef Icons

```html
<ng-template #starTpl>
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
</ng-template>

<Icon [icon]="starTemplate" size="xl" variant="warning" ariaLabel="Star" />
```

```ts
@ViewChild('starTpl', { static: true }) starTemplate!: TemplateRef<any>;
```

### Lucide Icon Data

```ts
lucideCheck: LucideIconData = [ ['polyline', { points: '20 6 9 17 4 12' }] ];
lucideHeart: LucideIconData = [ ['path', { d: 'M20.84 4.61...'}] ];
```

```html
<Icon [icon]="lucideCheck" size="xl" variant="success" ariaLabel="Lucide check" />
<Icon [icon]="lucideHeart" size="xl" variant="destructive" ariaLabel="Lucide heart" />
```

### Interactive Icons

```html
<Icon [icon]="svgHeart" size="xl" variant="primary" [interactive]="true" ariaLabel="Like" />
```

## API Reference

### Selector

- `Icon`

### Inputs

- `icon: string | Type<any> | TemplateRef<any> | LucideIconData` — Source of the icon
- `size: 'xs'|'sm'|'md'|'lg'|'xl'|'2xl'|'3xl' = 'md'` — Sizing
- `variant: 'default'|'primary'|'secondary'|'muted'|'destructive'|'success'|'warning'|'info' = 'default'`
- `interactive: boolean = false` — Enables keyboard/click interactions (adds tabindex)
- `loading: boolean = false` — Overlay spinner
- `ariaLabel: string` — Accessibility label (applies role="img")
- `customClass: string` — Additional classes

### Accessibility

- When `ariaLabel` is provided, component sets `role="img"`
- When `interactive` is true: supports Enter/Space to trigger click

### Security

- HTML/SVG strings are sanitized using Angular `DomSanitizer`
- LucideIconData converted to safe SVG before render

## Troubleshooting

- Font icons not visible? Ensure the CSS is loaded and classes are correct (`fa-solid`, `fa-regular`, `fa-brands`). Restart dev server after editing `angular.json`.
- Colors come from `variant` and inherit from text color. For font icons, color is applied via `color: currentColor` (default). Wrap with utility classes to override.

## Links

- Demo: /components/icon
- Source: projects/lib/src/lib/components/icon/index.ts
- Documentation updates welcome via PRs.
