import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@lib/utils/cn';

// Team Grid Variants
const teamGridVariants = cva(
  'w-full',
  {
    variants: {
      variant: {
        default: 'space-y-8',
        minimal: 'space-y-4',
        card: 'space-y-8 p-6 bg-card border border-border rounded-xl shadow-sm',
        outlined: 'space-y-8 p-6 border-2 border-border rounded-xl',
        filled: 'space-y-8 p-6 bg-muted/50 rounded-xl',
        gradient: 'space-y-8 p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl',
        glass: 'space-y-8 p-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl',
        custom: ''
      },
      size: {
        sm: 'max-w-4xl',
        default: 'max-w-6xl',
        lg: 'max-w-7xl',
        xl: 'max-w-full',
        full: 'w-full',
        custom: ''
      },
      spacing: {
        none: 'space-y-0',
        sm: 'space-y-4',
        default: 'space-y-8',
        lg: 'space-y-12',
        xl: 'space-y-16',
        custom: ''
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      spacing: 'default'
    }
  }
);

// Team Member Card Variants
const teamMemberVariants = cva(
  'group relative transition-all duration-300 bg-card rounded-xl overflow-hidden',
  {
    variants: {
      variant: {
        default: 'border border-border shadow-sm hover:shadow-lg',
        minimal: 'bg-transparent border-none shadow-none',
        card: 'border border-border shadow-md hover:shadow-xl transform hover:-translate-y-2',
        outlined: 'border-2 border-border hover:border-primary/50',
        filled: 'bg-primary/5 border border-primary/20',
        glass: 'bg-white/10 backdrop-blur-sm border border-white/20 shadow-xl',
        gradient: 'bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-border shadow-lg',
        custom: ''
      },
      size: {
        sm: 'p-4',
        default: 'p-6',
        lg: 'p-8',
        xl: 'p-10',
        custom: ''
      },
      layout: {
        vertical: 'text-center',
        horizontal: 'flex items-center space-x-4 text-left',
        overlay: 'relative',
        custom: ''
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      layout: 'vertical'
    }
  }
);

// Header Section Variants
const teamHeaderVariants = cva(
  'text-center mb-12',
  {
    variants: {
      alignment: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right'
      },
      spacing: {
        none: 'mb-0',
        sm: 'mb-6',
        default: 'mb-12',
        lg: 'mb-16',
        xl: 'mb-20'
      }
    },
    defaultVariants: {
      alignment: 'center',
      spacing: 'default'
    }
  }
);

export type TeamGridVariant = VariantProps<typeof teamGridVariants>;
export type TeamMemberVariant = VariantProps<typeof teamMemberVariants>;
export type TeamHeaderVariant = VariantProps<typeof teamHeaderVariants>;

export interface TeamMember {
  id?: string | number;
  name: string;
  role: string;
  bio?: string;
  avatar: string;
  email?: string;
  phone?: string;
  location?: string;
  department?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
    instagram?: string;
    facebook?: string;
    youtube?: string;
    tiktok?: string;
    discord?: string;
    slack?: string;
    medium?: string;
    dribbble?: string;
    behance?: string;
    figma?: string;
    [key: string]: string | undefined; // Allows ANY custom social platform
  };
  skills?: string[];
  achievements?: string[];
  joinDate?: string;
  isActive?: boolean;
  // Custom extensible properties
  customFields?: {
    [key: string]: any; // Allows completely custom properties
  };
}

@Component({
  selector: 'TeamGrid',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section [class]="containerClasses()">
      <!-- Header Section -->
      @if (showHeader()) {
        <div [class]="headerClasses()">
          <!-- Badge -->
          @if (badge()) {
            <div class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-4" 
                 [class]="badgeClasses()">
              {{ badge() }}
            </div>
          }
          
          <!-- Title -->
          @if (title()) {
            <h2 [class]="titleClasses()">{{ title() }}</h2>
          }
          
          <!-- Description -->
          @if (description()) {
            <p [class]="descriptionClasses()">{{ description() }}</p>
          }
          
          <!-- Custom Header Content -->
          <ng-content select="[slot=header]"></ng-content>
        </div>
      }

      <!-- Team Grid -->
      <div [class]="gridClasses()">
        @for (member of members(); track member.id || $index) {
          <div [class]="memberCardClasses()" 
               (click)="onMemberClick(member, $index)"
               [attr.data-member-id]="member.id">
            
            <!-- Avatar Section -->
            <div [class]="avatarSectionClasses()">
              <div class="relative">
                <!-- Avatar Image -->
                <img 
                  [src]="member.avatar" 
                  [alt]="member.name"
                  [class]="avatarClasses()"
                  loading="lazy"
                />
                
                <!-- Status Badge -->
                @if (showStatus() && member.isActive !== undefined) {
                  <div class="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center"
                       [class]="member.isActive ? 'bg-green-500' : 'bg-gray-400'">
                    <div class="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                }
              </div>
            </div>

            <!-- Content Section -->
            <div [class]="contentSectionClasses()">
              <!-- Name & Role -->
              <div class="space-y-1">
                <h3 [class]="nameClasses()">{{ member.name }}</h3>
                <p [class]="roleClasses()">{{ member.role }}</p>
                
                <!-- Department -->
                @if (member.department && showDepartment()) {
                  <p [class]="departmentClasses()">{{ member.department }}</p>
                }
              </div>
              
              <!-- Bio -->
              @if (member.bio && showBio()) {
                <p [class]="bioClasses()">{{ member.bio }}</p>
              }
              
              <!-- Contact Info -->
              @if (showContact() && (member.email || member.phone || member.location)) {
                <div class="space-y-1 text-sm text-muted-foreground">
                  @if (member.email) {
                    <div class="flex items-center gap-2">
                      <span class="text-primary">✉</span>
                      <a [href]="'mailto:' + member.email" class="hover:text-primary transition-colors">
                        {{ member.email }}
                      </a>
                    </div>
                  }
                  @if (member.phone) {
                    <div class="flex items-center gap-2">
                      <span class="text-primary">📞</span>
                      <a [href]="'tel:' + member.phone" class="hover:text-primary transition-colors">
                        {{ member.phone }}
                      </a>
                    </div>
                  }
                  @if (member.location) {
                    <div class="flex items-center gap-2">
                      <span class="text-primary">📍</span>
                      <span>{{ member.location }}</span>
                    </div>
                  }
                </div>
              }
              
              <!-- Skills -->
              @if (member.skills && member.skills.length > 0 && showSkills()) {
                <div class="flex flex-wrap gap-1">
                  @for (skill of member.skills.slice(0, maxSkills()); track skill) {
                    <span class="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                      {{ skill }}
                    </span>
                  }
                  @if (member.skills.length > maxSkills()) {
                    <span class="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground">
                      +{{ member.skills.length - maxSkills() }} more
                    </span>
                  }
                </div>
              }
              
              <!-- Social Links -->
              @if (member.socialLinks && showSocialLinks()) {
                <div class="flex justify-center gap-3 pt-2 flex-wrap">
                  @for (socialLink of getSocialLinksArray(member.socialLinks); track socialLink.platform) {
                    <a [href]="socialLink.url" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       [class]="socialLink.hoverColor"
                       [title]="socialLink.platform | titlecase">
                      <span class="sr-only">{{ socialLink.platform | titlecase }}</span>
                      @if (socialLink.icon) {
                        <div [innerHTML]="socialLink.icon"></div>
                      } @else {
                        <!-- Fallback icon for custom platforms -->
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                        </svg>
                      }
                    </a>
                  }
                </div>
              }
              
              <!-- Custom Fields -->
              @if (member.customFields && showCustomFields() && hasCustomFields(member.customFields)) {
                <div class="space-y-2">
                  @for (field of getCustomFieldsArray(member.customFields); track field.key) {
                    <div class="text-sm">
                      <span class="font-medium text-foreground">{{ field.label }}:</span>
                      <span class="ml-2 text-muted-foreground">{{ field.value }}</span>
                    </div>
                  }
                </div>
              }
              
              <!-- Join Date -->
              @if (member.joinDate && showJoinDate()) {
                <div class="text-xs text-muted-foreground">
                  Joined {{ member.joinDate }}
                </div>
              }
            </div>

            <!-- Hover Overlay Effect -->
            @if (hoverEffect()) {
              <div class="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
            }
          </div>
        }
      </div>

      <!-- Footer Section -->
      @if (showFooter()) {
        <div [class]="footerClasses()">
          <ng-content select="[slot=footer]"></ng-content>
          
          <!-- Join Team CTA -->
          @if (showJoinCTA()) {
            <div class="mt-12 text-center p-8 rounded-xl bg-muted/50 border-2 border-dashed border-border">
              <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
              </div>
              <h3 class="text-lg font-semibold mb-2">{{ joinCTATitle() }}</h3>
              <p class="text-muted-foreground mb-4">{{ joinCTADescription() }}</p>
              @if (joinCTAButtonText()) {
                <button 
                  class="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  (click)="onJoinCTAClick()">
                  {{ joinCTAButtonText() }}
                </button>
              }
            </div>
          }
        </div>
      }
    </section>
  `
})
export class TeamGrid {
  // Core Content
  members = input<TeamMember[]>([]);
  title = input<string>('');
  description = input<string>('');
  badge = input<string>('');

  // Grid Configuration
  columns = input<number>(3);
  gap = input<'sm' | 'default' | 'lg'>('default');
  
  // Display Options
  showHeader = input<boolean>(true);
  showFooter = input<boolean>(false);
  showBio = input<boolean>(true);
  showContact = input<boolean>(false);
  showSkills = input<boolean>(true);
  showSocialLinks = input<boolean>(true);
  showStatus = input<boolean>(false);
  showDepartment = input<boolean>(false);
  showJoinDate = input<boolean>(false);
  showJoinCTA = input<boolean>(false);
  showCustomFields = input<boolean>(false);
  
  // Interaction Options
  hoverEffect = input<boolean>(true);
  clickable = input<boolean>(true);
  
  // Limits
  maxSkills = input<number>(3);
  
  // Join CTA Configuration
  joinCTATitle = input<string>('Join Our Team');
  joinCTADescription = input<string>('We\'re always looking for talented individuals to join our growing team.');
  joinCTAButtonText = input<string>('View Open Positions');

  // Variants
  variant = input<TeamGridVariant['variant']>('default');
  size = input<TeamGridVariant['size']>('default');
  spacing = input<TeamGridVariant['spacing']>('default');
  
  // Member Card Variants
  memberVariant = input<TeamMemberVariant['variant']>('default');
  memberSize = input<TeamMemberVariant['size']>('default');
  memberLayout = input<TeamMemberVariant['layout']>('vertical');
  
  // Header Variants
  headerAlignment = input<TeamHeaderVariant['alignment']>('center');
  headerSpacing = input<TeamHeaderVariant['spacing']>('default');

  // Custom Classes
  class = input<string>('');
  headerClass = input<string>('');
  titleClass = input<string>('');
  descriptionClass = input<string>('');
  badgeClass = input<string>('');
  gridClass = input<string>('');
  memberClass = input<string>('');
  footerClass = input<string>('');

  // Events
  memberClick = output<{member: TeamMember, index: number}>();
  memberHover = output<{member: TeamMember, index: number}>();
  joinCTAClick = output<void>();

  // Computed CSS Classes
  containerClasses = computed(() => cn(
    teamGridVariants({
      variant: this.variant(),
      size: this.size(),
      spacing: this.spacing()
    }),
    this.class()
  ));

  headerClasses = computed(() => cn(
    teamHeaderVariants({
      alignment: this.headerAlignment(),
      spacing: this.headerSpacing()
    }),
    this.headerClass()
  ));

  titleClasses = computed(() => cn(
    'text-3xl md:text-4xl font-bold text-foreground mb-4',
    this.titleClass()
  ));

  descriptionClasses = computed(() => cn(
    'text-lg text-muted-foreground max-w-3xl mx-auto',
    this.descriptionClass()
  ));

  badgeClasses = computed(() => cn(
    'bg-primary/10 text-primary border border-primary/20',
    this.badgeClass()
  ));

  gridClasses = computed(() => {
    const baseClasses = 'grid gap-6';
    const gapClasses = {
      sm: 'gap-4',
      default: 'gap-6',
      lg: 'gap-8'
    };
    const columnClasses = {
      1: 'grid-cols-1',
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
      5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
      6: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'
    };
    
    return cn(
      baseClasses,
      gapClasses[this.gap()],
      columnClasses[Math.min(this.columns(), 6) as keyof typeof columnClasses],
      this.gridClass()
    );
  });

  memberCardClasses = computed(() => cn(
    teamMemberVariants({
      variant: this.memberVariant(),
      size: this.memberSize(),
      layout: this.memberLayout()
    }),
    this.clickable() ? 'cursor-pointer' : '',
    this.memberClass()
  ));

  avatarSectionClasses = computed(() => cn(
    this.memberLayout() === 'horizontal' ? 'flex-shrink-0' : 'flex justify-center mb-4'
  ));

  avatarClasses = computed(() => cn(
    'object-cover rounded-full border-4 border-white dark:border-gray-800 shadow-lg',
    this.memberLayout() === 'horizontal' ? 'w-16 h-16' : 'w-24 h-24 md:w-32 md:h-32'
  ));

  contentSectionClasses = computed(() => cn(
    'space-y-3',
    this.memberLayout() === 'horizontal' ? 'flex-1' : ''
  ));

  nameClasses = computed(() => cn(
    'font-semibold text-foreground',
    this.memberSize() === 'sm' ? 'text-base' : 'text-lg'
  ));

  roleClasses = computed(() => cn(
    'text-primary font-medium',
    this.memberSize() === 'sm' ? 'text-sm' : 'text-base'
  ));

  departmentClasses = computed(() => cn(
    'text-xs text-muted-foreground uppercase tracking-wide'
  ));

  bioClasses = computed(() => cn(
    'text-sm text-muted-foreground line-clamp-3'
  ));

  footerClasses = computed(() => cn(
    'mt-12',
    this.footerClass()
  ));

  // Helper Methods
  onMemberClick(member: TeamMember, index: number): void {
    if (this.clickable()) {
      this.memberClick.emit({ member, index });
    }
  }

  onMemberHover(member: TeamMember, index: number): void {
    this.memberHover.emit({ member, index });
  }

  onJoinCTAClick(): void {
    this.joinCTAClick.emit();
  }

  // Social platform configurations
  private socialPlatforms: Record<string, { icon: string; hoverColor: string }> = {
    linkedin: {
      icon: '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
      hoverColor: 'text-muted-foreground hover:text-blue-600 transition-colors'
    },
    twitter: {
      icon: '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>',
      hoverColor: 'text-muted-foreground hover:text-blue-400 transition-colors'
    },
    github: {
      icon: '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>',
      hoverColor: 'text-muted-foreground hover:text-gray-900 dark:hover:text-white transition-colors'
    },
    website: {
      icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>',
      hoverColor: 'text-muted-foreground hover:text-primary transition-colors'
    },
    instagram: {
      icon: '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>',
      hoverColor: 'text-muted-foreground hover:text-pink-600 transition-colors'
    },
    facebook: {
      icon: '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
      hoverColor: 'text-muted-foreground hover:text-blue-700 transition-colors'
    },
    youtube: {
      icon: '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
      hoverColor: 'text-muted-foreground hover:text-red-600 transition-colors'
    },
    tiktok: {
      icon: '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>',
      hoverColor: 'text-muted-foreground hover:text-black dark:hover:text-white transition-colors'
    },
    discord: {
      icon: '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0002 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/></svg>',
      hoverColor: 'text-muted-foreground hover:text-indigo-600 transition-colors'
    },
    slack: {
      icon: '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/></svg>',
      hoverColor: 'text-muted-foreground hover:text-purple-600 transition-colors'
    },
    medium: {
      icon: '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg>',
      hoverColor: 'text-muted-foreground hover:text-green-600 transition-colors'
    },
    dribbble: {
      icon: '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.816zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z"/></svg>',
      hoverColor: 'text-muted-foreground hover:text-pink-500 transition-colors'
    },
    behance: {
      icon: '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M7.003 5.324v3.498c.766-.856 1.744-1.284 2.934-1.284 1.19 0 2.34.396 3.018 1.284V5.324H7.003zm7.706 1.284c.96 0 1.83.57 2.096 1.553h-4.192c.266-.984 1.136-1.553 2.096-1.553zm-2.936 5.07c-.36 0-.72.072-1.08.216v1.554c.36-.144.72-.216 1.08-.216.72 0 1.296.576 1.296 1.284 0 .708-.576 1.284-1.296 1.284-.36 0-.72-.072-1.08-.216v1.554c.36.144.72.216 1.08.216 1.548 0 2.808-1.26 2.808-2.808s-1.26-2.808-2.808-2.808zm5.268-2.07h4.608V7.324h-4.608v2.284zm0 3.354c0-.72.576-1.296 1.296-1.296.72 0 1.296.576 1.296 1.296v.216h-2.592zm1.296 3.354c-.72 0-1.296-.576-1.296-1.296h2.592c0 .72-.576 1.296-1.296 1.296z"/></svg>',
      hoverColor: 'text-muted-foreground hover:text-blue-500 transition-colors'
    },
    figma: {
      icon: '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.354-3.019-3.019-3.019h-3.117v6.038zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.019 3.019 3.019h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.505-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148z"/></svg>',
      hoverColor: 'text-muted-foreground hover:text-purple-500 transition-colors'
    }
  };

  getSocialLinksArray(socialLinks: TeamMember['socialLinks']): Array<{platform: string, url: string, icon: string | null, hoverColor: string}> {
    if (!socialLinks) return [];
    
    return Object.entries(socialLinks)
      .filter(([_, url]) => url) // Only include links with URLs
      .map(([platform, url]) => ({
        platform,
        url: url!,
        icon: this.socialPlatforms[platform]?.icon || null,
        hoverColor: this.socialPlatforms[platform]?.hoverColor || 'text-muted-foreground hover:text-primary transition-colors'
      }));
  }

  getCustomFieldsArray(customFields: TeamMember['customFields']): Array<{key: string, label: string, value: any}> {
    if (!customFields) return [];
    
    return Object.entries(customFields)
      .map(([key, value]) => ({
        key,
        label: this.formatLabel(key),
        value: this.formatValue(value)
      }));
  }

  hasCustomFields(customFields: TeamMember['customFields']): boolean {
    return customFields ? Object.keys(customFields).length > 0 : false;
  }

  private formatLabel(key: string): string {
    // Convert camelCase/snake_case to Title Case
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/_/g, ' ')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  }

  private formatValue(value: any): string {
    if (typeof value === 'object' && value !== null) {
      return JSON.stringify(value);
    }
    return String(value);
  }
}
