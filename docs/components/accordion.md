# Accordion

A vertically stacked set of interactive headings that each reveal an associated section of content.

## Features

- ✅ **Full Accessibility**: WAI-ARIA compliant with proper roles, states, and properties
- ✅ **Keyboard Navigation**: Arrow keys, Home/End, Enter/Space support
- ✅ **Screen Reader Support**: Proper labeling and announcements
- ✅ **Single Mode**: Only one item can be open at a time
- ✅ **Multiple Mode**: Multiple items can be open simultaneously
- ✅ **Collapsible**: Option to close the currently open item in single mode
- ✅ **Smooth Animations**: CSS transitions for expand/collapse
- ✅ **TypeScript**: Full type safety with CVA variants

## Installation

```bash
npx ngsui add accordion
```

This will install the Accordion component and all its dependencies.

## Usage

### Single Mode (Collapsible)

```html
<Accordion type="single" [collapsible]="true" class="w-full">
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern and supports keyboard navigation.
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-2">
    <AccordionTrigger>Is it styled?</AccordionTrigger>
    <AccordionContent>
      Yes. It comes with default styles that match the other components' aesthetic.
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-3">
    <AccordionTrigger>Is it animated?</AccordionTrigger>
    <AccordionContent>
      Yes. It's animated by default with smooth transitions when expanding and collapsing.
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

### Multi Mode

```html
<Accordion type="multiple" class="w-full">
  <AccordionItem value="multi-1">
    <AccordionTrigger>Can multiple items be open?</AccordionTrigger>
    <AccordionContent>
      Yes! In multiple mode, you can have multiple accordion items open at the same time.
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="multi-2">
    <AccordionTrigger>How does keyboard navigation work?</AccordionTrigger>
    <AccordionContent>
      Use Arrow keys to navigate between triggers, Home/End for first/last item, and Enter/Space to toggle.
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="multi-3">
    <AccordionTrigger>What about screen readers?</AccordionTrigger>
    <AccordionContent>
      Each trigger has proper ARIA attributes and the content regions are properly labeled for screen readers.
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

## Accessibility

### Keyboard Navigation

| Key | Description |
|-----|-------------|
| `Tab` | Moves focus to the next focusable element |
| `Shift + Tab` | Moves focus to the previous focusable element |
| `Enter` or `Space` | Toggles the accordion item |
| `Arrow Down` | Moves focus to the next accordion trigger |
| `Arrow Up` | Moves focus to the previous accordion trigger |
| `Home` | Moves focus to the first accordion trigger |
| `End` | Moves focus to the last accordion trigger |

### Screen Reader Support

- Each trigger button has `aria-expanded` to indicate the state
- Content regions have `role="region"` and are labeled by their trigger
- Proper semantic heading structure with `<h3>` elements
- Icons are marked as `aria-hidden="true"`

### ARIA Attributes

- `aria-expanded`: Indicates whether the accordion item is expanded
- `aria-controls`: Associates the trigger with its content region
- `aria-labelledby`: Associates the content region with its trigger
- `role="region"`: Identifies the content as a landmark region
- `id` attributes: Provide unique identifiers for proper associations

## API Reference

### Accordion Component

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'single' \| 'multiple'` | `'single'` | Determines if one or multiple items can be opened |
| `collapsible` | `boolean` | `false` | Allow closing the open item in single mode |
| `value` | `string \| string[]` | `''` | Controlled state for open items |
| `variant` | `'default'` | `'default'` | Visual variant |
| `className` | `string` | `undefined` | Additional CSS classes |

### AccordionItem Component

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `''` | Unique identifier for the item |
| `variant` | `'default'` | `'default'` | Visual variant |
| `className` | `string` | `undefined` | Additional CSS classes |

### AccordionTrigger Component

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default'` | `'default'` | Visual variant |
| `className` | `string` | `undefined` | Additional CSS classes |

### AccordionContent Component

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default'` | `'default'` | Visual variant |
| `className` | `string` | `undefined` | Additional CSS classes |
