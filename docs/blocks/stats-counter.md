# Stats Counter Block

A powerful and flexible statistics display block for showcasing key metrics, achievements, or numerical data with smooth animations and customizable styling.

## Installation

Install the Stats Counter block via our CLI tool:

```bash
npx ngsui-cli add block stats-counter
```

## Features

- 🎯 **Multiple Variants**: 7 component variants and 7 stat variants for maximum flexibility
- 🎬 **Smooth Animations**: Built-in scroll-triggered animations with customizable timing
- 📊 **Trend Indicators**: Built-in support for trend arrows and percentage changes
- 🎨 **Customizable Styling**: Full theming support with CVA-based variants
- 📱 **Responsive Design**: Mobile-first responsive layout
- 🔧 **Content Projection**: Header and footer slots for additional content
- ♿ **Accessibility**: ARIA-compliant with screen reader support
- 🌙 **Dark Mode**: Full dark mode support

## Basic Usage

### Simple Stats Display

```typescript
import { StatsCounter } from '@ngsui/blocks';

@Component({
  selector: 'app-example',
  template: `
    <StatsCounter 
      [stats]="basicStats"
      variant="default">
    </StatsCounter>
  `,
  imports: [StatsCounter]
})
export class ExampleComponent {
  basicStats = [
    { value: 1200, label: 'Active Users', icon: '👥' },
    { value: 98, label: 'Success Rate', suffix: '%', icon: '✅' },
    { value: 24, label: 'Countries', suffix: '+', icon: '🌍' }
  ];
}
```

### With Animations

```typescript
<StatsCounter 
  [stats]="animatedStats"
  variant="card"
  [enableAnimation]="true"
  [animationDuration]="2000">
</StatsCounter>
```

### Advanced Usage with Trends

```typescript
@Component({
  template: `
    <StatsCounter 
      [stats]="trendStats"
      variant="gradient"
      [enableAnimation]="true"
      statVariant="highlighted">
    </StatsCounter>
  `
})
export class AdvancedExampleComponent {
  trendStats = [
    {
      value: 45678,
      label: 'Monthly Revenue',
      prefix: '$',
      icon: '💰',
      trend: { value: 12.5, type: 'increase' as const },
      description: 'vs last month'
    },
    {
      value: 2847,
      label: 'New Customers',
      icon: '👥',
      trend: { value: 8.2, type: 'increase' as const },
      description: 'this quarter'
    },
    {
      value: 99.9,
      label: 'Uptime',
      suffix: '%',
      icon: '⚡',
      trend: { value: 0.1, type: 'increase' as const },
      description: 'SLA compliance'
    }
  ];
}
      value: 2500,
      label: 'Projects Completed',
      suffix: '+',
      trend: { direction: 'up', value: 8 }
    }
    // ... more stats
  ];
}
```

## API Reference

### StatsCounter Component

#### Core Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `stats` | `StatItem[]` | `[]` | Array of statistics to display |
| `title` | `string` | `''` | Main header title |
| `description` | `string` | `''` | Header description text |
| `badge` | `string` | `''` | Badge text above title |
| `summaryText` | `string` | `''` | Footer summary message |

#### Grid Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `columns` | `number` | `4` | Number of columns (1-6) |
| `gap` | `'sm' \| 'default' \| 'lg'` | `'default'` | Grid gap size |

#### Display Options

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `showHeader` | `boolean` | `true` | Show header section |
| `showFooter` | `boolean` | `false` | Show footer section |
| `showIcons` | `boolean` | `true` | Display stat icons |
| `showDescriptions` | `boolean` | `true` | Show stat descriptions |
| `showTrends` | `boolean` | `true` | Display trend indicators |
| `showCustomFields` | `boolean` | `false` | Show custom properties |
| `showSummary` | `boolean` | `false` | Display summary section |

#### Animation Options

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `enableAnimation` | `boolean` | `true` | Enable count-up animations |
| `animationDuration` | `number` | `2000` | Animation duration (ms) |
| `animationDelay` | `number` | `100` | Delay between stat animations |
| `triggerOnScroll` | `boolean` | `true` | Animate when scrolled into view |

#### Variants

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `StatsCounterVariant` | `'default'` | Container visual style |
| `statVariant` | `StatItemVariant` | `'default'` | Individual stat style |
| `statLayout` | `'vertical' \| 'horizontal' \| 'overlay'` | `'vertical'` | Stat item layout |

#### Events

| Event | Type | Description |
|-------|------|-------------|
| `statClick` | `{stat: StatItem, index: number}` | Stat item clicked |
| `statHover` | `{stat: StatItem, index: number}` | Stat item hovered |
| `animationComplete` | `StatItem[]` | All animations completed |

### StatItem Interface

```typescript
interface StatItem {
  id?: string | number;
  value: number;                    // The numeric value to display
  label: string;                   // Primary label
  description?: string;            // Optional description
  icon?: string;                   // HTML string for icon
  prefix?: string;                 // Text before value (e.g., "$")
  suffix?: string;                 // Text after value (e.g., "%", "+")
  color?: string;                  // Custom color for value
  trend?: {                        // Trend indicator
    direction: 'up' | 'down' | 'neutral';
    value: number;
    period?: string;
  };
  formatter?: (value: number) => string;  // Custom value formatter
  animationDelay?: number;         // Custom animation delay
  customFields?: {                 // Additional properties
    [key: string]: any;
  };
}
```

## Style Variants

### Container Variants

#### Container Default

Standard layout with subtle shadows and borders.

```html
<StatsCounter variant="default" [stats]="stats" />
```

#### Container Minimal

Clean, borderless design with minimal spacing.

```html
<StatsCounter variant="minimal" [stats]="stats" />
```

#### Container Card

Elevated card design with enhanced shadows and padding.

```html
<StatsCounter variant="card" [stats]="stats" />
```

#### Container Outlined

Prominent border with no background fill.

```html
<StatsCounter variant="outlined" [stats]="stats" />
```

#### Container Filled

Subtle background fill with light border.

```html
<StatsCounter variant="filled" [stats]="stats" />
```

#### Container Gradient

Gradient background from light to dark.

```html
<StatsCounter variant="gradient" [stats]="stats" />
```

#### Container Glass

Glassmorphism effect with backdrop blur.

```html
<StatsCounter variant="glass" [stats]="stats" />
```

#### Container Hero

Large, prominent design for hero sections.

```html
<StatsCounter variant="hero" [stats]="stats" />
```

### Stat Item Variants

#### Stat Default

Standard stat card with border and shadow.

#### Stat Minimal

Clean stat without borders or background.

#### Stat Card

Enhanced stat card with hover animations.

#### Stat Outlined

Stat with prominent border, no fill.

#### Stat Filled

Stat with background fill and border.

#### Stat Glass

Glassmorphism stat item effect.

#### Stat Gradient

Gradient background stat item.

#### Stat Icon

Icon-focused layout with minimal borders.

## Advanced Examples

### Animated Counter with Custom Formatting

```typescript
export class AdvancedStatsComponent {
  salesStats: StatItem[] = [
    {
      value: 2500000,
      label: 'Total Revenue',
      prefix: '$',
      formatter: (value) => `${(value / 1000000).toFixed(1)}M`,
      trend: { direction: 'up', value: 18, period: 'vs last quarter' },
      animationDelay: 0
    },
    {
      value: 450000,
      label: 'Monthly Recurring Revenue',
      prefix: '$',
      formatter: (value) => `${(value / 1000).toFixed(0)}K`,
      trend: { direction: 'up', value: 12, period: 'MoM' },
      animationDelay: 200
    }
  ];
}
```

```html
<StatsCounter
  [stats]="salesStats"
  title="Sales Performance"
  [enableAnimation]="true"
  [animationDuration]="3000"
  variant="card"
  statVariant="gradient"
/>
```

### Stats with Custom Icons

```typescript
export class IconStatsComponent {
  performanceStats: StatItem[] = [
    {
      value: 2500000,
      label: 'Downloads',
      icon: `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"/>
      </svg>`,
      color: '#3B82F6'
    }
  ];
}
```

### Interactive Stats with Click Handlers

```typescript
export class InteractiveStatsComponent {
  onStatClick(event: {stat: StatItem, index: number}): void {
    // Navigate to detailed view
    this.router.navigate(['/stats', event.stat.id]);
  }
}
```

```html
<StatsCounter
  [stats]="stats"
  [clickable]="true"
  (statClick)="onStatClick($event)"
/>
```

### Custom Fields and Properties

```typescript
export class DetailedStatsComponent {
  analyticsStats: StatItem[] = [
    {
      value: 95.8,
      label: 'Performance Score',
      suffix: '%',
      customFields: {
        lastUpdated: '2024-01-15',
        dataSource: 'Real-time Analytics',
        accuracy: '99.2%',
        refreshRate: '5 minutes'
      }
    }
  ];
}
```

```html
<StatsCounter
  [stats]="analyticsStats"
  [showCustomFields]="true"
/>
```

### Content Projection

```html
<StatsCounter [stats]="stats" [showHeader]="true" [showFooter]="true">
  <!-- Custom Header -->
  <div slot="header" class="text-center space-y-4">
    <div class="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full">
      🚀 Live Dashboard
    </div>
    <h2 class="text-4xl font-bold">Real-time Performance</h2>
    <p class="text-xl text-muted-foreground">
      Monitor your KPIs with live updates
    </p>
  </div>

  <!-- Custom Footer -->
  <div slot="footer" class="text-center space-y-6">
    <div class="flex justify-center space-x-4">
      <button class="btn btn-primary">View Report</button>
      <button class="btn btn-outline">Export Data</button>
    </div>
    <p class="text-sm text-muted-foreground">
      Last updated: {{ lastUpdated }}
    </p>
  </div>
</StatsCounter>
```

### Horizontal Layout for Financial Data

```html
<StatsCounter
  [stats]="financialStats"
  [columns]="2"
  statLayout="horizontal"
  variant="outlined"
  statVariant="filled"
/>
```

## Responsive Behavior

The Stats Counter automatically adapts to different screen sizes:

- **Mobile (< 768px)**: Single column layout
- **Tablet (768px - 1024px)**: 2-column layout (max)
- **Desktop (1024px - 1280px)**: Up to 3-4 columns
- **Large (> 1280px)**: Full column count as specified

## Customization

### CSS Custom Properties

```css
.stats-counter {
  --stats-border-radius: 0.75rem;
  --stats-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  --stats-hover-transform: translateY(-2px);
  --stats-animation-duration: 2s;
  --stats-animation-timing: cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Custom Formatters

```typescript
// Currency formatter
const currencyFormatter = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

// Percentage formatter
const percentFormatter = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

// Large number formatter
const largeNumberFormatter = (value: number): string => {
  if (value >= 1000000000) {
    return `${(value / 1000000000).toFixed(1)}B`;
  } else if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toString();
};

// Usage
const stats: StatItem[] = [
  {
    value: 2500000,
    label: 'Revenue',
    formatter: currencyFormatter
  },
  {
    value: 98.5,
    label: 'Success Rate',
    formatter: percentFormatter
  },
  {
    value: 1500000,
    label: 'Users',
    formatter: largeNumberFormatter
  }
];
```

## Accessibility

The Stats Counter includes built-in accessibility features:

- **ARIA Labels**: Proper labeling for screen readers
- **Keyboard Navigation**: Tab through interactive elements
- **High Contrast**: Supports system color preferences
- **Reduced Motion**: Respects `prefers-reduced-motion`
- **Semantic HTML**: Proper heading hierarchy and structure

### Screen Reader Support

```html
<StatsCounter
  [stats]="stats"
  [attr.aria-label]="'Company performance statistics'"
  role="region"
/>
```

## Performance

### Optimization Features

- **OnPush Change Detection**: Efficient rendering
- **Intersection Observer**: Animate only when visible
- **RequestAnimationFrame**: Smooth 60fps animations
- **Lazy Loading**: Optional for large datasets

### Best Practices

1. **Limit Stat Count**: Keep to 6-8 stats maximum for optimal UX
2. **Use Meaningful Delays**: Stagger animations (100-200ms apart)
3. **Optimize Icons**: Use SVG for crisp, scalable icons
4. **Cache Formatters**: Create formatter functions once, reuse
5. **Progressive Enhancement**: Provide fallbacks for reduced motion

## Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **CSS Features**: CSS Grid, Flexbox, Custom Properties
- **JavaScript**: ES2020, Intersection Observer, RequestAnimationFrame
- **Graceful Degradation**: Fallbacks for older browsers

## Migration Guide

### From v1.x to v2.x

```typescript
// v1.x (deprecated)
<StatsCounter
  [data]="stats"          // ❌ Changed to [stats]
  [showAnimation]="true"  // ❌ Changed to [enableAnimation]
  [style]="'card'"        // ❌ Changed to [variant]
/>

// v2.x (current)
<StatsCounter
  [stats]="stats"           // ✅ New property name
  [enableAnimation]="true"  // ✅ Clearer naming
  [variant]="'card'"        // ✅ Consistent with design system
/>
```

### Property Mapping

| v1.x | v2.x | Notes |
|------|------|-------|
| `data` | `stats` | More descriptive name |
| `showAnimation` | `enableAnimation` | Clearer intent |
| `style` | `variant` | Consistent with other components |
| `layout` | `statLayout` | More specific scope |

## Examples Repository

Find more examples and use cases in our [GitHub repository](https://github.com/your-org/angular-superui/tree/main/examples/stats-counter).

## Contributing

We welcome contributions! Please see our [Contributing Guide](../CONTRIBUTING.md) for details.

## License

MIT License - see [LICENSE](../LICENSE) for details.
