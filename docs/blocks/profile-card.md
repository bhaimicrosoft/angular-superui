# Profile Card Block

A comprehensive profile display component designed to showcase user information with customizable layouts, social integration, and interactive features.

## Features

- 🎨 **5 Visual Variants**: Default, compact, horizontal, minimal, and detailed layouts
- 📱 **Responsive Design**: Optimized for all screen sizes with mobile-first approach
- 🎯 **Action System**: Configurable buttons for user interactions
- ✅ **Status Indicators**: Online/offline status with visual cues
- 🏆 **Verification Badges**: Premium and verified user indicators
- 🔗 **Social Integration**: Support for social media links
- 🌙 **Dark Mode**: Full dark mode support with seamless transitions
- ⚡ **Angular Signals**: Modern reactive state management
- 🎪 **Rich Content**: Support for skills, contact info, and custom metadata

## Installation

```bash
ng add @bhaimicrosoft/angular-superui
```

## Basic Usage

```typescript
import { ProfileCard, ProfileCardConfig } from '@bhaimicrosoft/angular-superui/blocks';

@Component({
  template: `
    <ProfileCard 
      [config]="profileConfig"
      [variant]="'default'"
      [size]="'md'"
      (profileAction)="handleAction($event)"
    />
  `
})
export class MyComponent {
  profileConfig: ProfileCardConfig = {
    name: 'Sarah Johnson',
    title: 'Senior Product Manager',
    company: 'TechCorp Inc.',
    description: 'Passionate about creating user-centered products.',
    avatar: '/assets/avatars/sarah.jpg',
    status: 'online',
    verified: true,
    showActions: true,
    actions: [
      { label: 'Message', action: 'message', variant: 'primary' },
      { label: 'Connect', action: 'connect', variant: 'secondary' }
    ]
  };

  handleAction(event: ProfileCardEvent) {
    console.log('Action:', event.action);
  }
}
```

## Variants

### Default

Standard profile card with avatar, basic info, and actions.

```typescript
<ProfileCard [config]="config" variant="default" />
```

### Compact

Condensed layout optimized for space-constrained environments.

```typescript
<ProfileCard [config]="config" variant="compact" />
```

### Horizontal

Side-by-side layout with avatar and content.

```typescript
<ProfileCard [config]="config" variant="horizontal" />
```

### Minimal

Clean, minimalist design with essential information only.

```typescript
<ProfileCard [config]="config" variant="minimal" />
```

### Detailed

Comprehensive layout with all available features and extended content.

```typescript
<ProfileCard [config]="config" variant="detailed" />
```

## Configuration

### ProfileCardConfig Interface

```typescript
interface ProfileCardConfig {
  // Basic Information
  name: string;
  title?: string;
  company?: string;
  description?: string;
  avatar?: string;
  
  // Status & Badges
  status?: 'online' | 'offline' | 'away' | 'busy';
  verified?: boolean;
  premium?: boolean;
  
  // Actions
  showActions?: boolean;
  actions?: ProfileAction[];
  
  // Extended Content (for detailed variant)
  skills?: string[];
  socialLinks?: SocialLink[];
  contactInfo?: ContactInfo;
  customFields?: Record<string, any>;
}
```

### ProfileAction Interface

```typescript
interface ProfileAction {
  label: string;
  action: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  icon?: string;
  disabled?: boolean;
}
```

### Extended Interfaces

```typescript
interface SocialLink {
  platform: 'github' | 'linkedin' | 'twitter' | 'website' | 'custom';
  url: string;
  label?: string;
}

interface ContactInfo {
  email?: string;
  phone?: string;
  location?: string;
  website?: string;
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `config` | `ProfileCardConfig` | - | Profile configuration object |
| `variant` | `'default' \| 'compact' \| 'horizontal' \| 'minimal' \| 'detailed'` | `'default'` | Visual variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Component size |
| `className` | `string` | - | Additional CSS classes |

## Events

### ProfileCardEvent

```typescript
interface ProfileCardEvent {
  action: string;
  config: ProfileCardConfig;
  timestamp: Date;
}
```

The component emits `profileAction` events when users interact with action buttons.

## Examples

### Team Member Profile

```typescript
const teamMemberConfig: ProfileCardConfig = {
  name: 'Alex Chen',
  title: 'Full Stack Developer',
  company: 'TechStartup',
  description: 'Building scalable web applications with modern technologies.',
  avatar: '/assets/team/alex.jpg',
  status: 'online',
  verified: true,
  skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
  socialLinks: [
    { platform: 'github', url: 'https://github.com/alexchen' },
    { platform: 'linkedin', url: 'https://linkedin.com/in/alexchen' }
  ],
  actions: [
    { label: 'Contact', action: 'contact', variant: 'primary' },
    { label: 'View Profile', action: 'profile', variant: 'secondary' }
  ]
};
```

### Customer Profile

```typescript
const customerConfig: ProfileCardConfig = {
  name: 'Maya Patel',
  title: 'Design Director',
  company: 'CreativeAgency',
  description: 'Award-winning designer creating beautiful user experiences.',
  avatar: '/assets/customers/maya.jpg',
  status: 'away',
  premium: true,
  contactInfo: {
    email: 'maya@creativeagency.com',
    location: 'San Francisco, CA',
    website: 'https://mayapatel.design'
  },
  actions: [
    { label: 'Message', action: 'message', variant: 'primary' },
    { label: 'Schedule Call', action: 'schedule', variant: 'secondary' }
  ]
};
```

### Minimal Contact Card

```typescript
const contactConfig: ProfileCardConfig = {
  name: 'John Smith',
  title: 'Product Manager',
  avatar: '/assets/contacts/john.jpg',
  status: 'online',
  showActions: false
};
```

## Customization

### CSS Custom Properties

```css
.profile-card {
  --profile-bg: theme('colors.white');
  --profile-border: theme('colors.gray.200');
  --profile-text: theme('colors.gray.900');
  --profile-text-muted: theme('colors.gray.600');
  --profile-avatar-size: 4rem;
  --profile-padding: 1.5rem;
  --profile-radius: 0.75rem;
}

.dark .profile-card {
  --profile-bg: theme('colors.gray.800');
  --profile-border: theme('colors.gray.700');
  --profile-text: theme('colors.white');
  --profile-text-muted: theme('colors.gray.300');
}
```

### Styling Variants

Override component styles using CSS classes:

```css
.profile-card-custom {
  @apply bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900;
  @apply border-2 border-blue-200 dark:border-blue-700;
}

.profile-card-compact {
  @apply max-w-xs;
}

.profile-card-wide {
  @apply max-w-2xl;
}
```

## Accessibility

The Profile Card component is built with accessibility in mind:

- **Semantic HTML**: Uses proper heading hierarchy and semantic elements
- **Keyboard Navigation**: Full keyboard support for interactive elements
- **Screen Readers**: Descriptive labels and ARIA attributes
- **Focus Management**: Clear focus indicators and logical tab order
- **Color Contrast**: WCAG 2.1 AA compliant color combinations
- **Alternative Text**: Avatar images include descriptive alt text

## Best Practices

### Performance

- Use avatar image optimization for better loading times
- Implement lazy loading for profile images in lists
- Consider virtual scrolling for large profile directories

### UX Guidelines

- Keep descriptions concise and meaningful
- Use consistent action labels across your application
- Provide visual feedback for user interactions
- Consider offline state handling

### Design Consistency

- Maintain consistent avatar sizes across variants
- Use your design system's color palette
- Follow your brand guidelines for action button styling

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Related Components

- [Avatar Component](../components/avatar.md) - For standalone avatar displays
- [Badge Component](../components/badge.md) - For status and verification indicators
- [Button Component](../components/button.md) - For action buttons
- [Card Component](../components/card.md) - For basic card layouts

## Contributing

Found a bug or want to contribute? Check out our [contributing guidelines](../../CONTRIBUTING.md).

## License

MIT License - see [LICENSE](../../LICENSE) for details.
