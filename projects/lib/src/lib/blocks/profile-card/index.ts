/**
 * Profile Card Component
 *
 * A comprehensive profile card component that supports:
 * - Multiple layout styles: default, compact, horizontal, minimal, detailed
 * - Various display modes: personal, professional, social, team member
 * - Social links and contact information
 * - Skills and achievements display
 * - Customizable actions and buttons
 * - Avatar with status indicators
 * - Dark mode support
 * - Animation and hover effects
 * - Accessibility features
 * - Responsive design
 */

import {
  Component,
  computed,
  input,
  output,
  signal,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { cva } from 'class-variance-authority';

// Profile card types and interfaces
export type ProfileCardVariant = 'default' | 'compact' | 'horizontal' | 'minimal' | 'detailed';
export type ProfileCardSize = 'sm' | 'md' | 'lg';
export type ProfileCardType = 'personal' | 'professional' | 'social' | 'team';

export interface ProfileSocialLink {
  platform: string;
  url: string;
  icon?: string;
  label?: string;
}

export interface ProfileContactInfo {
  email?: string;
  phone?: string;
  website?: string;
  location?: string;
}

export interface ProfileSkill {
  name: string;
  level?: number; // 1-5 or 1-100
  category?: string;
}

export interface ProfileAchievement {
  title: string;
  description?: string;
  date?: string;
  icon?: string;
}

export interface ProfileAction {
  label: string;
  action: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  icon?: string;
}

export interface ProfileCardConfig {
  // Basic Info
  name: string;
  title?: string;
  subtitle?: string;
  description?: string;
  avatar?: string;
  coverImage?: string;
  
  // Status & Indicators
  status?: 'online' | 'offline' | 'away' | 'busy';
  verified?: boolean;
  premium?: boolean;
  
  // Contact Information
  contact?: ProfileContactInfo;
  
  // Social Links
  socialLinks?: ProfileSocialLink[];
  
  // Professional Info
  company?: string;
  department?: string;
  experience?: string;
  skills?: ProfileSkill[];
  achievements?: ProfileAchievement[];
  
  // Statistics
  stats?: Array<{
    label: string;
    value: string | number;
    icon?: string;
  }>;
  
  // Actions
  actions?: ProfileAction[];
  
  // Display Options
  showContact?: boolean;
  showSocialLinks?: boolean;
  showSkills?: boolean;
  showStats?: boolean;
  showActions?: boolean;
}

export interface ProfileCardEvent {
  action: string;
  data?: any;
}

// Profile card variants
const profileCardVariants = cva(
  'profile-card bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300',
  {
    variants: {
      variant: {
        default: 'p-6',
        compact: 'p-4',
        horizontal: 'p-6 flex items-center space-x-6',
        minimal: 'p-4 border-0 shadow-none',
        detailed: 'p-8',
      },
      size: {
        sm: 'max-w-xs',
        md: 'max-w-sm',
        lg: 'max-w-md',
      },
      type: {
        personal: 'hover:shadow-md',
        professional: 'hover:shadow-lg border-l-4 border-l-blue-500',
        social: 'hover:shadow-lg hover:scale-105',
        team: 'hover:shadow-md',
      },
      interactive: {
        true: 'cursor-pointer hover:shadow-lg transform hover:-translate-y-1',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      type: 'personal',
      interactive: false,
    },
  }
);

const avatarVariants = cva(
  'relative rounded-full overflow-hidden flex-shrink-0',
  {
    variants: {
      size: {
        sm: 'w-12 h-12',
        md: 'w-16 h-16',
        lg: 'w-24 h-24',
        xl: 'w-32 h-32',
      },
      variant: {
        default: 'ring-2 ring-gray-200 dark:ring-gray-700',
        compact: 'ring-1 ring-gray-200 dark:ring-gray-700',
        minimal: '',
        horizontal: 'ring-2 ring-gray-200 dark:ring-gray-700',
        detailed: 'ring-2 ring-gray-200 dark:ring-gray-700',
      },
    },
    defaultVariants: {
      size: 'lg',
      variant: 'default',
    },
  }
);

const statusVariants = cva(
  'absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white dark:border-gray-800 z-10',
  {
    variants: {
      status: {
        online: 'bg-green-500',
        offline: 'bg-gray-400',
        away: 'bg-yellow-500',
        busy: 'bg-red-500',
      },
    },
    defaultVariants: {
      status: 'offline',
    },
  }
);

const buttonVariants = cva(
  'px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer',
  {
    variants: {
      variant: {
        primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
        secondary: 'bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500',
        outline: 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:ring-gray-500',
        ghost: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-gray-500',
      },
      size: {
        sm: 'px-3 py-1 text-sm',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'sm',
    },
  }
);

@Component({
  selector: 'ProfileCard',
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('slideInUp', [
      state('in', style({ transform: 'translateY(0)', opacity: 1 })),
      transition('void => *', [
        style({ transform: 'translateY(20px)', opacity: 0 }),
        animate('300ms ease-out')
      ])
    ]),
    trigger('fadeIn', [
      state('in', style({ opacity: 1 })),
      transition('void => *', [
        style({ opacity: 0 }),
        animate('200ms ease-in')
      ])
    ]),
    trigger('scaleIn', [
      state('in', style({ transform: 'scale(1)', opacity: 1 })),
      transition('void => *', [
        style({ transform: 'scale(0.95)', opacity: 0 }),
        animate('200ms ease-out')
      ])
    ]),
  ],
  template: `
    <div 
      [class]="getProfileCardVariants()({ 
        variant: variant(), 
        size: size(), 
        type: type(),
        interactive: interactive()
      })"
      [@slideInUp]="'in'"
      (click)="onCardClick()"
    >
      <!-- Cover Image -->
      <div *ngIf="config().coverImage && variant() !== 'horizontal'" 
           class="w-full h-32 bg-gradient-to-r from-blue-500 to-purple-600 -m-6 mb-4 md:-m-8 md:mb-6"
           [style.background-image]="'url(' + config().coverImage + ')'"
           [style.background-size]="'cover'"
           [style.background-position]="'center'">
      </div>

      <!-- Horizontal Layout -->
      <div *ngIf="variant() === 'horizontal'" class="flex items-center space-x-6 w-full">
        <!-- Avatar Section -->
        <div class="flex-shrink-0 relative">
          <div [class]="getAvatarVariants()({ size: getAvatarSize(), variant: variant() })">
            <img 
              *ngIf="config().avatar" 
              [src]="config().avatar" 
              [alt]="config().name + ' avatar'"
              class="w-full h-full object-cover"
              loading="lazy"
            />
            <div *ngIf="!config().avatar" 
                 class="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-lg">
              {{ getInitials(config().name) }}
            </div>
            
            <!-- Status Indicator -->
            <div *ngIf="config().status" 
                 [class]="getStatusVariants()({ status: config().status })">
            </div>
          </div>
        </div>

        <!-- Content Section -->
        <div class="flex-1 min-w-0">
          <div class="flex items-start justify-between">
            <div class="min-w-0 flex-1">
              <!-- Name and Title -->
              <div class="flex items-center space-x-2">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white truncate">
                  {{ config().name }}
                </h3>
                
                <!-- Verification Badge -->
                <svg *ngIf="config().verified" 
                     class="w-5 h-5 text-blue-500" 
                     fill="currentColor" 
                     viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>

                <!-- Premium Badge -->
                <span *ngIf="config().premium" 
                      class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                  <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  Premium
                </span>
              </div>
              
              <p *ngIf="config().title" class="text-sm text-gray-600 dark:text-gray-300 truncate">
                {{ config().title }}
              </p>
              
              <p *ngIf="config().subtitle" class="text-xs text-gray-500 dark:text-gray-400 truncate">
                {{ config().subtitle }}
              </p>
            </div>

            <!-- Actions for Horizontal Layout -->
            <div *ngIf="config().showActions && config().actions" class="flex space-x-2 ml-4">
              <button 
                *ngFor="let action of config().actions?.slice(0, 2)"
                (click)="onAction(action, $event)"
                [class]="getButtonVariants()({ variant: action.variant || 'outline', size: 'sm' })"
              >
                <svg *ngIf="action.icon" class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" [attr.d]="getIconPath(action.icon)"/>
                </svg>
                {{ action.label }}
              </button>
            </div>
          </div>

          <!-- Description for Horizontal -->
          <p *ngIf="config().description" 
             class="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
            {{ config().description }}
          </p>

          <!-- Contact Info for Horizontal -->
          <div *ngIf="config().showContact && config().contact" class="mt-3 flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400">
            <span *ngIf="config().contact?.location" class="flex items-center">
              <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              {{ config().contact?.location }}
            </span>
            <span *ngIf="config().contact?.email" class="flex items-center">
              <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              {{ config().contact?.email }}
            </span>
          </div>
        </div>
      </div>

      <!-- Vertical Layouts -->
      <div *ngIf="variant() !== 'horizontal'" class="text-center">
        <!-- Avatar Section -->
        <div class="flex justify-center mb-4 relative" [@fadeIn]="'in'">
          <div [class]="getAvatarVariants()({ size: getAvatarSize(), variant: variant() })">
            <img 
              *ngIf="config().avatar" 
              [src]="config().avatar" 
              [alt]="config().name + ' avatar'"
              class="w-full h-full object-cover"
              loading="lazy"
            />
            <div *ngIf="!config().avatar" 
                 class="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-xl">
              {{ getInitials(config().name) }}
            </div>
            
            <!-- Status Indicator -->
            <div *ngIf="config().status" 
                 [class]="getStatusVariants()({ status: config().status })">
            </div>
          </div>
        </div>

        <!-- Name and Title -->
        <div class="mb-4" [@fadeIn]="'in'">
          <div class="flex items-center justify-center space-x-2 mb-1">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">
              {{ config().name }}
            </h3>
            
            <!-- Verification Badge -->
            <svg *ngIf="config().verified" 
                 class="w-5 h-5 text-blue-500" 
                 fill="currentColor" 
                 viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>

            <!-- Premium Badge -->
            <span *ngIf="config().premium" 
                  class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
              <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              Premium
            </span>
          </div>
          
          <p *ngIf="config().title" class="text-lg text-gray-600 dark:text-gray-300 font-medium">
            {{ config().title }}
          </p>
          
          <p *ngIf="config().subtitle" class="text-sm text-gray-500 dark:text-gray-400">
            {{ config().subtitle }}
          </p>
          
          <p *ngIf="config().company" class="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {{ config().company }}
            <span *ngIf="config().department"> • {{ config().department }}</span>
          </p>
        </div>

        <!-- Description -->
        <p *ngIf="config().description" 
           class="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed"
           [@fadeIn]="'in'">
          {{ config().description }}
        </p>

        <!-- Stats -->
        <div *ngIf="config().showStats && config().stats && config().stats!.length > 0" 
             class="grid grid-cols-3 gap-4 py-4 border-t border-b border-gray-200 dark:border-gray-700 mb-4"
             [@scaleIn]="'in'">
          <div *ngFor="let stat of config().stats" class="text-center">
            <div class="text-xl font-bold text-gray-900 dark:text-white">
              {{ stat.value }}
            </div>
            <div class="text-xs text-gray-500 dark:text-gray-400">
              {{ stat.label }}
            </div>
          </div>
        </div>

        <!-- Skills -->
        <div *ngIf="config().showSkills && config().skills && config().skills!.length > 0" 
             class="mb-4"
             [@fadeIn]="'in'">
          <h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-2">Skills</h4>
          <div class="flex flex-wrap gap-2">
            <span *ngFor="let skill of config().skills?.slice(0, 6)" 
                  class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              {{ skill.name }}
              <span *ngIf="skill.level" class="ml-1 text-blue-600 dark:text-blue-300">
                {{ skill.level }}/5
              </span>
            </span>
          </div>
        </div>

        <!-- Contact Information -->
        <div *ngIf="config().showContact && config().contact" 
             class="space-y-2 mb-4 text-sm text-gray-600 dark:text-gray-300"
             [@fadeIn]="'in'">
          <div *ngIf="config().contact?.location" class="flex items-center justify-center space-x-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            <span>{{ config().contact?.location }}</span>
          </div>
          
          <div *ngIf="config().contact?.email" class="flex items-center justify-center space-x-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            <span>{{ config().contact?.email }}</span>
          </div>
          
          <div *ngIf="config().contact?.phone" class="flex items-center justify-center space-x-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
            <span>{{ config().contact?.phone }}</span>
          </div>
        </div>

        <!-- Social Links -->
        <div *ngIf="config().showSocialLinks && config().socialLinks && config().socialLinks!.length > 0" 
             class="flex justify-center space-x-3 mb-4"
             [@scaleIn]="'in'">
          <a *ngFor="let social of config().socialLinks" 
             [href]="social.url"
             target="_blank"
             rel="noopener noreferrer"
             class="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 cursor-pointer"
             [attr.aria-label]="social.label || social.platform">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path [attr.d]="getSocialIconPath(social.platform)"/>
            </svg>
          </a>
        </div>

        <!-- Actions -->
        <div *ngIf="config().showActions && config().actions && config().actions!.length > 0" 
             class="flex justify-center space-x-2"
             [@scaleIn]="'in'">
          <button 
            *ngFor="let action of config().actions"
            (click)="onAction(action, $event)"
            [class]="getButtonVariants()({ variant: action.variant || 'primary', size: size() === 'sm' ? 'sm' : 'md' })"
          >
            <svg *ngIf="action.icon" class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" [attr.d]="getIconPath(action.icon)"/>
            </svg>
            {{ action.label }}
          </button>
        </div>
      </div>
    </div>
  `,
})
export class ProfileCard {
  // Input signals
  variant = input<ProfileCardVariant>('default');
  size = input<ProfileCardSize>('md');
  type = input<ProfileCardType>('personal');
  config = input.required<ProfileCardConfig>();
  interactive = input<boolean>(false);
  
  // Output signals
  profileAction = output<ProfileCardEvent>();
  profileClick = output<ProfileCardEvent>();
  
  // Computed variant functions
  getProfileCardVariants = computed(() => profileCardVariants);
  getAvatarVariants = computed(() => avatarVariants);
  getStatusVariants = computed(() => statusVariants);
  getButtonVariants = computed(() => buttonVariants);

  getAvatarSize(): 'sm' | 'md' | 'lg' | 'xl' {
    if (this.variant() === 'compact') return 'sm';
    if (this.variant() === 'horizontal') return 'md';
    if (this.variant() === 'minimal') return 'md';
    if (this.size() === 'sm') return 'md';
    if (this.size() === 'lg') return 'xl';
    return 'lg';
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }

  onCardClick() {
    if (this.interactive()) {
      this.profileClick.emit({
        action: 'card_click',
        data: this.config(),
      });
    }
  }

  onAction(action: ProfileAction, event: Event) {
    event.stopPropagation();
    this.profileAction.emit({
      action: action.action,
      data: { action, profile: this.config() },
    });
  }

  getIconPath(icon: string): string {
    const icons: Record<string, string> = {
      message: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
      phone: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
      email: 'M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      follow: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z',
      connect: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1',
      hire: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0H8m8 0v6a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0V4a2 2 0 00-2-2H10a2 2 0 00-2 2v2',
      website: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9',
    };
    return icons[icon] || icons['message'];
  }

  getSocialIconPath(platform: string): string {
    const socialIcons: Record<string, string> = {
      twitter: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z',
      linkedin: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
      github: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
      instagram: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
      facebook: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
      youtube: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
      dribbble: 'M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.816zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z',
    };
    return socialIcons[platform] || socialIcons['twitter'];
  }
}
