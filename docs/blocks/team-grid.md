# Team Grid Block

A comprehensive team showcase component that displays team members in a responsive grid layout with extensive customization options, custom social links, and flexible content projection.

## Features

- **Responsive Grid Layout**: Automatically adjusts columns based on screen size (1-6 columns)
- **Multiple Variants**: Choose from 7 grid variants and 7 member card variants
- **Enhanced Social Integration**: 12+ built-in social platforms plus unlimited custom platforms
- **Custom Properties System**: Add any custom fields with automatic formatting
- **Member Cards**: Detailed member information with avatars, roles, bios, and contact details
- **Skills Display**: Show member skills and expertise with customizable badges
- **Status Indicators**: Active/inactive status and join dates
- **Contact Information**: Email addresses, phone numbers, and location details
- **Join CTA**: Optional call-to-action section for team recruitment
- **Content Projection**: Header and footer slots for custom content
- **Hover Effects**: Smooth animations and interactive states
- **Department Filtering**: Organize team members by department
- **Flexible Layouts**: Vertical, horizontal, and overlay card orientations

## Basic Usage

```typescript
import { TeamGrid } from '@lib/blocks/team-grid';

@Component({
  imports: [TeamGrid],
  template: `
    <TeamGrid
      title="Our Team"
      description="Meet the amazing people behind our success"
      [members]="teamMembers"
      [columns]="3"
      variant="default"
    />
  `
})
export class MyComponent {
  teamMembers = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Software Engineer",
      department: "Engineering",
      bio: "Full-stack developer passionate about creating great user experiences.",
      avatar: "https://example.com/avatars/sarah.jpg",
      email: "sarah@company.com",
      location: "San Francisco, CA",
      socialLinks: {
        linkedin: "https://linkedin.com/in/sarahchen",
        github: "https://github.com/sarahchen",
        twitter: "https://twitter.com/sarahchen",
        dribbble: "https://dribbble.com/sarahchen", // NEW: Additional platforms
        medium: "https://medium.com/@sarahchen",
        customPlatform: "https://mysite.com/sarah" // NEW: Any custom platform
      },
      skills: ["TypeScript", "Angular", "Node.js"],
      isActive: true,
      customFields: { // NEW: Custom properties
        yearsExperience: "5 years",
        timezone: "PST (UTC-8)",
        specialization: "Frontend Architecture"
      }
    }
    // ... more members
  ];
}
```

## Props

### Main Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `title` | `string` | `undefined` | Grid section title |
| `description` | `string` | `undefined` | Grid section description |
| `badge` | `string` | `undefined` | Optional badge/category label |
| `members` | `TeamMember[]` | `[]` | Array of team member objects |
| `columns` | `number` | `3` | Number of columns in the grid |
| `variant` | `TeamGridVariant` | `'default'` | Overall grid styling variant |
| `memberVariant` | `TeamMemberVariant` | `'default'` | Individual member card variant |
| `memberSize` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of member cards |
| `memberLayout` | `'vertical' \| 'horizontal'` | `'vertical'` | Card layout orientation |
| `gap` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Space between grid items |

### Content Display Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `showBio` | `boolean` | `false` | Display member biography |
| `showContact` | `boolean` | `false` | Show email, phone, and location |
| `showSocialLinks` | `boolean` | `false` | Display social media links |
| `showSkills` | `boolean` | `false` | Show skills/expertise badges |
| `showDepartment` | `boolean` | `false` | Display department information |
| `showStatus` | `boolean` | `false` | Show active/inactive status |
| `showJoinDate` | `boolean` | `false` | Display join date |
| `showCustomFields` | `boolean` | `false` | **NEW:** Display custom properties |
| `maxSkills` | `number` | `5` | Maximum number of skills to display |

### Join CTA Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `showJoinCTA` | `boolean` | `false` | Show join team call-to-action |
| `joinCTATitle` | `string` | `'Join Our Team'` | CTA section title |
| `joinCTADescription` | `string` | `'We\'re hiring!'` | CTA description |
| `joinCTAButtonText` | `string` | `'View Open Positions'` | CTA button text |

### Interactive Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `hoverEffect` | `boolean` | `true` | Enable hover animations |
| `clickable` | `boolean` | `false` | Make member cards clickable |

## Events

| Event | Type | Description |
|-------|------|-------------|
| `memberClick` | `TeamMember` | Emitted when a member card is clicked |
| `joinCTAClick` | `void` | Emitted when join CTA button is clicked |

## TeamMember Interface

```typescript
interface TeamMember {
  id?: string | number;
  name: string;
  role: string;
  bio?: string;
  avatar: string;
  email?: string;
  phone?: string; // NEW: Phone number support
  location?: string;
  department?: string;
  socialLinks?: {
    // Built-in platforms with custom icons
    linkedin?: string;
    twitter?: string;
    github?: string;
    website?: string;
    instagram?: string; // NEW
    facebook?: string; // NEW
    youtube?: string; // NEW
    tiktok?: string; // NEW
    discord?: string; // NEW
    slack?: string; // NEW
    medium?: string; // NEW
    dribbble?: string; // NEW
    behance?: string; // NEW
    figma?: string; // NEW
    [key: string]: string | undefined; // Any custom platform
  };
  skills?: string[];
  achievements?: string[];
  joinDate?: string;
  isActive?: boolean;
  // NEW: Custom extensible properties
  customFields?: {
    [key: string]: any; // Completely flexible properties
  };
}
```

## 🔗 Social Platforms & Custom Links

### Built-in Social Platforms (with custom icons)

The component supports 14 built-in social platforms with custom icons and hover colors:

| Platform | Icon | Hover Color | Example |
|----------|------|-------------|---------|
| **LinkedIn** | LinkedIn icon | Blue | `linkedin: "https://linkedin.com/in/username"` |
| **Twitter** | Twitter icon | Light Blue | `twitter: "https://twitter.com/username"` |
| **GitHub** | GitHub icon | Gray/White | `github: "https://github.com/username"` |
| **Website** | Globe icon | Primary | `website: "https://mywebsite.com"` |
| **Instagram** | Instagram icon | Pink | `instagram: "https://instagram.com/username"` |
| **Facebook** | Facebook icon | Dark Blue | `facebook: "https://facebook.com/username"` |
| **YouTube** | YouTube icon | Red | `youtube: "https://youtube.com/@username"` |
| **TikTok** | TikTok icon | Black/White | `tiktok: "https://tiktok.com/@username"` |
| **Discord** | Discord icon | Indigo | `discord: "https://discord.com/users/userid"` |
| **Slack** | Slack icon | Purple | `slack: "https://workspace.slack.com/team/userid"` |
| **Medium** | Medium icon | Green | `medium: "https://medium.com/@username"` |
| **Dribbble** | Dribbble icon | Pink | `dribbble: "https://dribbble.com/username"` |
| **Behance** | Behance icon | Blue | `behance: "https://behance.net/username"` |
| **Figma** | Figma icon | Purple | `figma: "https://figma.com/@username"` |

### Custom Social Platforms

Add any custom platform using the extensible `[key: string]` property:

```typescript
const member = {
  socialLinks: {
    // Built-in platforms
    linkedin: "https://linkedin.com/in/username",
    github: "https://github.com/username",
    
    // Custom platforms (fallback icon will be used)
    companyBlog: "https://blog.company.com/author/username",
    personalPortfolio: "https://myportfolio.dev",
    customPlatform: "https://anyplatform.com/user"
  }
};
```

## 🛠️ Custom Fields System

### Flexible Properties

Add any custom information using the `customFields` property:

```typescript
const teamMember = {
  name: "Alex Kim",
  role: "Senior Engineer",
  // ... standard fields
  customFields: {
    // Experience & Skills
    yearsExperience: "8 years",
    specialization: "Frontend Architecture",
    certifications: "Google Cloud Professional",
    
    // Work Details
    timezone: "PST (UTC-8)",
    workingHours: "9 AM - 6 PM PST",
    languages: "English, Korean, Japanese",
    
    // Personal Info
    hobbies: "Photography, Hiking",
    favoriteTools: "VS Code, Figma, Notion",
    
    // Metrics (any data type)
    projectsCompleted: 150,
    teamMembersManaged: 8,
    satisfactionRating: 4.9
  }
};
```

### Auto-formatting Features

The component automatically formats custom field keys:

- `yearsExperience` → "Years Experience"
- `timezone` → "Timezone"  
- `working_hours` → "Working Hours"
- `favoriteTools` → "Favorite Tools"

Complex values (objects, arrays) are automatically stringified.

## Variants

### Grid Variants

- **default**: Clean, modern styling with subtle shadows
- **minimal**: Clean layout with minimal styling
- **card**: Prominent card-based design
- **outlined**: Outlined cards with borders
- **filled**: Solid background cards
- **glass**: Glassmorphism effect
- **gradient**: Gradient backgrounds

### Member Card Variants

- **default**: Standard card styling
- **minimal**: Clean, minimal design
- **card**: Enhanced card appearance
- **outlined**: Bordered cards
- **filled**: Solid background cards
- **glass**: Glassmorphism effect
- **gradient**: Gradient styling

## Examples

### Executive Team Layout

```typescript
<TeamGrid
  title="Executive Team"
  description="Meet our leadership"
  badge="Leadership"
  [members]="executives"
  [columns]="2"
  memberSize="lg"
  [showBio]="true"
  [showContact]="true"
  [showSocialLinks]="true"
  variant="card"
  memberVariant="gradient"
/>
```

### Engineering Team with Skills & Custom Fields

```typescript
<TeamGrid
  title="Engineering Team"
  [members]="engineers"
  [columns]="3"
  [showSkills]="true"
  [showSocialLinks]="true"
  [showCustomFields]="true"
  [maxSkills]="4"
  variant="default"
  memberVariant="card"
/>
```

### Compact Support Team

```typescript
<TeamGrid
  title="Support Team"
  [members]="supportTeam"
  [columns]="4"
  memberSize="sm"
  memberLayout="horizontal"
  [showContact]="true"
  [showBio]="false"
  variant="minimal"
/>
```

### Team with Join CTA & Custom Social Links

```typescript
<TeamGrid
  title="Design Team"
  [members]="designers"
  [showJoinCTA]="true"
  [showSocialLinks]="true"
  joinCTATitle="Join Our Design Team"
  joinCTADescription="We're looking for talented designers"
  joinCTAButtonText="View Design Jobs"
  (joinCTAClick)="openCareersPage()"
/>
```

## 🔌 Content Projection

### Header Slot

Add custom content to the header section:

```html
<TeamGrid [members]="teamMembers">
  <div slot="header">
    <!-- Custom filter controls -->
    <div class="flex gap-4 justify-center mb-6">
      <button class="filter-btn" (click)="filterByDepartment('engineering')">
        Engineering
      </button>
      <button class="filter-btn" (click)="filterByDepartment('design')">
        Design
      </button>
      <button class="filter-btn" (click)="filterByDepartment('product')">
        Product
      </button>
    </div>
    
    <!-- Search bar -->
    <div class="max-w-md mx-auto">
      <input 
        type="text" 
        placeholder="Search team members..."
        (input)="searchMembers($event)"
        class="w-full px-4 py-2 border rounded-lg"
      />
    </div>
  </div>
</TeamGrid>
```

### Footer Slot

Add custom content to the footer section:

```html
<TeamGrid [members]="teamMembers" [showFooter]="true">
  <div slot="footer">
    <!-- Team statistics -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
      <div class="space-y-2">
        <div class="text-3xl font-bold text-primary">50+</div>
        <div class="text-muted-foreground">Team Members</div>
      </div>
      <div class="space-y-2">
        <div class="text-3xl font-bold text-primary">15</div>
        <div class="text-muted-foreground">Countries</div>
      </div>
      <div class="space-y-2">
        <div class="text-3xl font-bold text-primary">24/7</div>
        <div class="text-muted-foreground">Global Coverage</div>
      </div>
    </div>
    
    <!-- Team achievements -->
    <div class="mt-8 p-6 bg-muted/50 rounded-xl">
      <h3 class="text-xl font-semibold mb-4">Team Achievements 🏆</h3>
      <ul class="space-y-2 text-muted-foreground">
        <li>✅ 99.9% uptime across all services</li>
        <li>✅ 50% faster deployment pipeline this year</li>
        <li>✅ Industry-leading code quality metrics</li>
        <li>✅ Zero security incidents in 18 months</li>
      </ul>
    </div>
  </div>
</TeamGrid>
```

### Advanced Example with Custom Fields

```html
<TeamGrid
  [members]="engineeringTeam"
  [showCustomFields]="true"
  [showSocialLinks]="true"
  variant="gradient"
  memberVariant="glass"
  (memberClick)="viewProfile($event)"
>
  <div slot="header">
    <div class="text-center mb-8">
      <h2 class="text-4xl font-bold mb-4">Engineering Excellence</h2>
      <p class="text-xl text-muted-foreground">
        Building the future with cutting-edge technology
      </p>
    </div>
  </div>
  
  <div slot="footer">
    <div class="mt-12 text-center">
      <h3 class="text-2xl font-bold mb-6">Want to Join Us?</h3>
      <div class="space-y-4">
        <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
          We're always looking for talented engineers who share our passion 
          for innovation and excellence.
        </p>
        <div class="flex gap-4 justify-center">
          <button class="btn-primary">View Open Positions</button>
          <button class="btn-secondary">Learn About Our Culture</button>
        </div>
      </div>
    </div>
  </div>
</TeamGrid>
```

## Responsive Behavior

- **Mobile (< 640px)**: 1 column
- **Tablet (640px - 1024px)**: 2 columns (adjusts based on `columns` prop)
- **Desktop (> 1024px)**: Full columns as specified

## Accessibility

- **Keyboard Navigation**: Full keyboard support for interactive elements
- **Screen Readers**: Proper ARIA labels and semantic HTML
- **Focus Management**: Clear focus indicators
- **High Contrast**: Supports high contrast mode
- **Responsive Text**: Scales appropriately for readability

## Styling Customization

The component uses CSS custom properties for easy theming:

```css
.team-grid {
  --team-grid-gap: 1.5rem;
  --team-card-padding: 1.5rem;
  --team-card-radius: 0.75rem;
  --team-avatar-size: 4rem;
  --team-skill-gap: 0.5rem;
}
```

## Performance Notes

- **Lazy Loading**: Avatars support lazy loading for better performance
- **Optimized Rendering**: Uses OnPush change detection strategy
- **Image Optimization**: Supports responsive images and WebP format
- **Dynamic Social Icons**: Icons are rendered efficiently with SVG
- **Custom Fields Caching**: Custom field formatting is optimized
- **Large Team Support**: Handles teams of 100+ members efficiently

## Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile Browsers**: iOS Safari 14+, Chrome Mobile 90+, Samsung Internet 14+
- **Legacy Support**: IE11+ (with polyfills for modern features)
- **Accessibility**: WCAG 2.1 AA compliant across all supported browsers

## Dependencies

- **Angular**: 17+ (with signals support)
- **TypeScript**: 5.0+
- **Tailwind CSS**: 3.3+
- **Class Variance Authority (CVA)**: For variant management
- **Modern ES Features**: ES2022+ support required

## Migration from v1.x

If you're upgrading from an earlier version:

```typescript
// v1.x (deprecated)
<TeamGrid [teamMembers]="members" />

// v2.x (current)
<TeamGrid [members]="members" />
```

New features in v2.x:
- ✅ Custom social links (14+ platforms)
- ✅ Custom fields system
- ✅ Content projection slots
- ✅ Enhanced accessibility
- ✅ Better TypeScript support

## Related Components

- [Header Block](./header.md) - For page headers and navigation
- [Feature Grid](./feature-grid.md) - For feature showcases and product highlights
- [Testimonial Block](./testimonial.md) - For customer testimonials and reviews
- [Feature Card](./feature-card.md) - For individual feature highlights
