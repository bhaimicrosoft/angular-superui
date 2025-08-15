import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileCard, ProfileCardConfig, ProfileCardEvent } from '@lib/blocks/profile-card';

@Component({
  selector: 'app-profile-card-demo',
  standalone: true,
  imports: [CommonModule, ProfileCard],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="text-center mb-16">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Profile Card Block
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Versatile profile cards for displaying user information, team members, author profiles, and social cards.
          </p>

        </div>

        <!-- Variant Selector -->
        <div class="flex flex-wrap justify-center gap-2 mb-8">
          <button
            *ngFor="let variant of variants"
            (click)="setVariant(variant)"
            class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            [class]="selectedVariant() === variant
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'"
          >
            {{ variant | titlecase }}
          </button>
        </div>

        <!-- Size Selector -->
        <div class="flex justify-center gap-2 mb-12">
          <button
            *ngFor="let size of sizes"
            (click)="setSize(size)"
            class="px-3 py-1 rounded-md text-xs font-medium transition-all duration-200"
            [class]="selectedSize() === size
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'"
          >
            {{ size.toUpperCase() }}
          </button>
        </div>

        <!-- Profile Cards Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <!-- Basic Profile -->
          <div class="flex flex-col items-center space-y-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white text-center">
              Basic Profile
            </h3>
            <ProfileCard
              [variant]="selectedVariant()"
              [size]="selectedSize()"
              [config]="basicProfileConfig"
              (profileAction)="onProfileAction($event, 'Basic Profile')"
            />
          </div>

          <!-- Team Member -->
          <div class="flex flex-col items-center space-y-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white text-center">
              Team Member
            </h3>
            <ProfileCard
              [variant]="selectedVariant()"
              [size]="selectedSize()"
              [config]="teamMemberConfig"
              (profileAction)="onProfileAction($event, 'Team Member')"
            />
          </div>

          <!-- Author Card -->
          <div class="flex flex-col items-center space-y-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white text-center">
              Author Card
            </h3>
            <ProfileCard
              [variant]="selectedVariant()"
              [size]="selectedSize()"
              [config]="authorCardConfig"
              (profileAction)="onProfileAction($event, 'Author Card')"
            />
          </div>
        </div>

        <!-- Extended Profile Cards -->
        <div class="grid md:grid-cols-2 gap-8 mb-16">
          <!-- Developer Profile -->
          <div class="flex flex-col items-center space-y-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white text-center">
              Developer Profile
            </h3>
            <ProfileCard
              [variant]="selectedVariant()"
              [size]="selectedSize()"
              [config]="developerProfileConfig"
              (profileAction)="onProfileAction($event, 'Developer Profile')"
            />
          </div>

          <!-- Social Profile -->
          <div class="flex flex-col items-center space-y-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white text-center">
              Social Profile
            </h3>
            <ProfileCard
              [variant]="selectedVariant()"
              [size]="selectedSize()"
              [config]="socialProfileConfig"
              (profileAction)="onProfileAction($event, 'Social Profile')"
            />
          </div>
        </div>

        <!-- Action Log -->
        <div *ngIf="actionLog().length > 0" class="mt-16">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
            Profile Actions Log
          </h3>
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div class="space-y-4">
              <div
                *ngFor="let action of actionLog(); let i = index"
                class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div class="flex items-center justify-between mb-2">
                  <span class="font-medium text-gray-900 dark:text-white">
                    {{ action.profileType }}
                  </span>
                  <span class="text-sm text-gray-500 dark:text-gray-400">
                    {{ action.timestamp | date:'medium' }}
                  </span>
                </div>
                <div class="text-sm text-gray-700 dark:text-gray-300">
                  Action: <span class="font-medium">{{ action.action }}</span>
                  <span *ngIf="action.data" class="ml-2">
                    - {{ action.data | json }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Features List -->
        <div class="mt-16 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Profile Card Features
          </h3>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="space-y-2">
              <h4 class="font-semibold text-gray-900 dark:text-white">Display Options</h4>
              <ul class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Avatar with fallback initials</li>
                <li>• Name and title display</li>
                <li>• Bio and description text</li>
                <li>• Location and contact info</li>
                <li>• Social media links</li>
              </ul>
            </div>
            <div class="space-y-2">
              <h4 class="font-semibold text-gray-900 dark:text-white">Interaction</h4>
              <ul class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Action buttons (Follow, Contact, etc.)</li>
                <li>• Social link integration</li>
                <li>• Status indicators</li>
                <li>• Hover animations</li>
                <li>• Click event handling</li>
              </ul>
            </div>
            <div class="space-y-2">
              <h4 class="font-semibold text-gray-900 dark:text-white">Customization</h4>
              <ul class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Multiple design variants</li>
                <li>• Size options (sm, md, lg)</li>
                <li>• Color themes</li>
                <li>• Layout configurations</li>
                <li>• Custom action buttons</li>
              </ul>
            </div>
            <div class="space-y-2">
              <h4 class="font-semibold text-gray-900 dark:text-white">Content Types</h4>
              <ul class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Team member profiles</li>
                <li>• Author bio cards</li>
                <li>• User account cards</li>
                <li>• Social media profiles</li>
                <li>• Developer portfolios</li>
              </ul>
            </div>
            <div class="space-y-2">
              <h4 class="font-semibold text-gray-900 dark:text-white">Technical</h4>
              <ul class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Angular 20 signals</li>
                <li>• TypeScript interfaces</li>
                <li>• Responsive design</li>
                <li>• Accessibility support</li>
                <li>• Dark mode compatibility</li>
              </ul>
            </div>
            <div class="space-y-2">
              <h4 class="font-semibold text-gray-900 dark:text-white">Use Cases</h4>
              <ul class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Team pages</li>
                <li>• About us sections</li>
                <li>• Author bylines</li>
                <li>• User directories</li>
                <li>• Contact cards</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Documentation Link -->
        <div class="mt-16 text-center">
          <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8 border border-gray-200 dark:border-gray-600">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              📚 Complete Documentation
            </h3>
            <p class="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Explore comprehensive examples, API reference, customization options, and integration guides for the Profile Card block.
            </p>
            <a
              href="https://github.com/bhaimicrosoft/angular-superui/blob/main/docs/blocks/profile-card.md"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
              View Documentation
              <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ProfileCardDemoComponent {
  // Variant and size options
  variants = ['default', 'compact', 'horizontal', 'minimal', 'detailed'];
  sizes = ['sm', 'md', 'lg'];

  // Selected variants
  selectedVariant = signal<'default' | 'compact' | 'horizontal' | 'minimal' | 'detailed'>('default');
  selectedSize = signal<'sm' | 'md' | 'lg'>('md');

  // Action log
  actionLog = signal<Array<{ profileType: string; action: string; data?: any; timestamp: Date }>>([]);

  // Profile configurations
  basicProfileConfig: ProfileCardConfig = {
    name: 'Sarah Johnson',
    title: 'Product Manager',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=150&q=80',
    description: 'Passionate about creating user-centered products that make a difference.',
    contact: {
      location: 'San Francisco, CA',
      email: 'sarah.johnson@company.com',
      website: 'https://sarahjohnson.design'
    },
    status: 'online',
    showContact: true,
    showSkills: true,
    showSocialLinks: true,
    showStats: true,
    showActions: true,
    socialLinks: [
      { platform: 'linkedin', url: 'https://linkedin.com/in/sarahjohnson', label: 'LinkedIn' },
      { platform: 'twitter', url: 'https://twitter.com/sarahpm', label: 'Twitter' }
    ],
    skills: [
      { name: 'Product Strategy', level: 95 },
      { name: 'User Research', level: 90 },
      { name: 'Agile/Scrum', level: 88 },
      { name: 'Data Analysis', level: 85 }
    ],
    stats: [
      { label: 'Products', value: '12' },
      { label: 'Teams Led', value: '5' },
      { label: 'Success Rate', value: '94%' }
    ],
    actions: [
      { label: 'Follow', action: 'follow', variant: 'primary' },
      { label: 'Message', action: 'message', variant: 'secondary' }
    ]
  };

  teamMemberConfig: ProfileCardConfig = {
    name: 'Alex Chen',
    title: 'Senior Software Engineer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
    description: 'Full-stack developer with 8+ years of experience building scalable web applications.',
    contact: {
      location: 'New York, NY',
      email: 'alex.chen@company.com',
      phone: '+1 (555) 123-4567'
    },
    status: 'busy',
    company: 'TechCorp Inc.',
    department: 'Engineering',
    showContact: true,
    showSkills: true,
    showSocialLinks: true,
    showStats: true,
    showActions: true,
    socialLinks: [
      { platform: 'github', url: 'https://github.com/alexchen', label: 'GitHub' },
      { platform: 'linkedin', url: 'https://linkedin.com/in/alexchen', label: 'LinkedIn' }
    ],
    skills: [
      { name: 'JavaScript', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'React', level: 88 },
      { name: 'Node.js', level: 85 }
    ],
    stats: [
      { label: 'Projects', value: '24' },
      { label: 'Commits', value: '1.2K' },
      { label: 'Reviews', value: '340' }
    ],
    actions: [
      { label: 'Contact', action: 'contact', variant: 'primary' },
      { label: 'View Profile', action: 'view', variant: 'secondary' }
    ]
  };

  authorCardConfig: ProfileCardConfig = {
    name: 'Emily Rodriguez',
    title: 'Technical Writer & Developer Advocate',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    description: 'Helping developers build better software through clear documentation and engaging content.',
    contact: {
      location: 'Austin, TX',
      website: 'https://emilyrodriguez.dev'
    },
    status: 'online',
    showContact: true,
    showSkills: true,
    showSocialLinks: true,
    showStats: true,
    showActions: true,
    socialLinks: [
      { platform: 'twitter', url: 'https://twitter.com/emilydev', label: 'Twitter' },
      { platform: 'github', url: 'https://github.com/emilyrodriguez', label: 'GitHub' },
      { platform: 'linkedin', url: 'https://linkedin.com/in/emilyrodriguez', label: 'LinkedIn' }
    ],
    skills: [
      { name: 'Technical Writing', level: 98 },
      { name: 'Developer Relations', level: 95 },
      { name: 'Content Strategy', level: 90 },
      { name: 'Community Building', level: 88 }
    ],
    stats: [
      { label: 'Articles', value: '127' },
      { label: 'Followers', value: '2.1K' },
      { label: 'Following', value: '485' }
    ],
    actions: [
      { label: 'Follow', action: 'follow', variant: 'primary' },
      { label: 'Read Articles', action: 'articles', variant: 'secondary' }
    ]
  };

  developerProfileConfig: ProfileCardConfig = {
    name: 'Marcus Thompson',
    title: 'Frontend Developer & UI/UX Designer',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    description: 'Creating beautiful and functional user interfaces with modern web technologies. Specialized in React, Angular, and design systems.',
    contact: {
      location: 'Seattle, WA',
      email: 'marcus@designdev.com',
      website: 'https://marcusthompson.design'
    },
    status: 'online',
    showContact: true,
    showSkills: true,
    showSocialLinks: true,
    showStats: true,
    showActions: true,
    socialLinks: [
      { platform: 'github', url: 'https://github.com/marcusthompson', label: 'GitHub' },
      { platform: 'dribbble', url: 'https://dribbble.com/marcusthompson', label: 'Dribbble' },
      { platform: 'twitter', url: 'https://twitter.com/marcusdev', label: 'Twitter' }
    ],
    skills: [
      { name: 'TypeScript', level: 95 },
      { name: 'Angular', level: 90 },
      { name: 'React', level: 85 },
      { name: 'Figma', level: 88 },
      { name: 'TailwindCSS', level: 92 }
    ],
    stats: [
      { label: 'Projects', value: '45' },
      { label: 'Stars', value: '1.2K' },
      { label: 'Contributions', value: '890' }
    ],
    actions: [
      { label: 'Hire Me', action: 'hire', variant: 'primary' },
      { label: 'View Portfolio', action: 'portfolio', variant: 'secondary' },
      { label: 'Download CV', action: 'download', variant: 'ghost' }
    ]
  };

  socialProfileConfig: ProfileCardConfig = {
    name: 'Jessica Park',
    title: 'Content Creator & Influencer',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    description: '🎨 Digital artist | 📸 Photography enthusiast | ✈️ Travel blogger | Sharing creativity and inspiration daily',
    contact: {
      location: 'Los Angeles, CA',
      website: 'https://jessicapark.com'
    },
    status: 'online',
    showContact: true,
    showSkills: true,
    showSocialLinks: true,
    showStats: true,
    showActions: true,
    socialLinks: [
      { platform: 'instagram', url: 'https://instagram.com/jessicapark', label: 'Instagram' },
      { platform: 'youtube', url: 'https://youtube.com/jessicapark', label: 'YouTube' },
      { platform: 'tiktok', url: 'https://tiktok.com/@jessicapark', label: 'TikTok' },
      { platform: 'twitter', url: 'https://twitter.com/jessicapark', label: 'Twitter' }
    ],
    skills: [
      { name: 'Content Creation', level: 95 },
      { name: 'Photography', level: 88 },
      { name: 'Video Editing', level: 90 },
      { name: 'Social Media', level: 98 }
    ],
    stats: [
      { label: 'Followers', value: '125K' },
      { label: 'Posts', value: '1.2K' },
      { label: 'Engagement', value: '8.4%' }
    ],
    actions: [
      { label: 'Follow', action: 'follow', variant: 'primary' },
      { label: 'Collaborate', action: 'collaborate', variant: 'secondary' }
    ]
  };

  setVariant(variant: any) {
    this.selectedVariant.set(variant);
  }

  setSize(size: any) {
    this.selectedSize.set(size);
  }

  onProfileAction(event: ProfileCardEvent, profileType: string) {
    console.log(`${profileType} action:`, event);

    // Add to action log
    this.actionLog.update(log => [
      {
        profileType,
        action: event.action,
        data: event.data,
        timestamp: new Date(),
      },
      ...log
    ]);
  }
}
