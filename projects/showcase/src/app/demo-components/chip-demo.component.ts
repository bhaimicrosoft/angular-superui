import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChipComponent, ChipSetComponent, ChipClickEvent, ChipRemoveEvent } from '@lib/components/chip';
import { Button } from '@lib/components/button';
import { InputComponent } from '@lib/components/input';

interface Tag {
  id: string;
  label: string;
  color: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
  removable: boolean;
  avatar?: string;
}

interface User {
  id: string;
  name: string;
  avatar: string;
  role: string;
  online: boolean;
}

@Component({
  selector: 'app-chip-demo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ChipComponent,
    ChipSetComponent,
    Button,
    InputComponent
  ],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950 p-8">
      <!-- Header Section -->
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">Chip Components Demo</h1>
          <p class="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Showcase of versatile chip/tag components with overflow handling and accessibility features
          </p>

          <!-- Header Demo Chips -->
          <ChipSet [spacing]="'sm'" class="justify-center">
            <Chip variant="filled" color="info" [clickable]="false">
              🚀 Interactive
            </Chip>
            <Chip variant="outlined" color="success" [clickable]="false">
              ✅ Accessible
            </Chip>
            <Chip variant="ghost" color="warning" [clickable]="false">
              💡 Versatile
            </Chip>
          </ChipSet>
        </div>

        <!-- Main Demo Sections -->
        <div class="space-y-12">

          <!-- Basic Chips Section -->
          <div class="bg-white/90 backdrop-blur-sm dark:bg-gray-800/90 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 shadow-lg">
            <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Basic Chips</h2>

            <div class="space-y-6">
              <!-- Selected Tags -->
              <div>
                <h3 class="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">Selected Technologies</h3>
                <ChipSet [spacing]="'sm'">
                  @for (tag of selectedTags(); track tag.id) {
                    <Chip
                      [variant]="'filled'"
                      [color]="tag.color"
                      [removable]="tag.removable"
                      (onRemove)="removeTag(tag.id)"
                      (onClick)="handleChipClick($event)"
                    >
                      {{ tag.label }}
                    </Chip>
                  }
                </ChipSet>
              </div>

              <!-- Controls -->
              <div class="flex gap-3">
                <Button
                  size="sm"
                  variant="outline"
                  (click)="addRandomTag()"
                >
                  Add Random Tag
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  (click)="clearAllTags()"
                >
                  Clear All
                </Button>
              </div>
            </div>
          </div>

          <!-- Team Members Section -->
          <div class="bg-white/90 backdrop-blur-sm dark:bg-gray-800/90 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 shadow-lg">
            <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Team Members</h2>

            <div class="space-y-6">
              <!-- Online Members -->
              <div>
                <h3 class="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">Online Members ({{ onlineMembers().length }})</h3>
                <ChipSet [spacing]="'sm'">
                  @for (member of onlineMembers(); track member.id) {
                    <Chip
                      variant="outlined"
                      color="success"
                      [avatar]="member.avatar"
                      [avatarAlt]="member.name"
                      [removable]="true"
                      (onClick)="selectMember(member)"
                      (onRemove)="removeMember(member.id)"
                    >
                      {{ member.name }}
                    </Chip>
                  }
                </ChipSet>
              </div>

              <!-- Offline Members -->
              <div>
                <h3 class="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">Offline Members ({{ offlineMembers().length }})</h3>
                <ChipSet [spacing]="'sm'">
                  @for (member of offlineMembers(); track member.id) {
                    <Chip
                      variant="ghost"
                      color="secondary"
                      [avatar]="member.avatar"
                      [avatarAlt]="member.name"
                      [removable]="true"
                      (onClick)="selectMember(member)"
                      (onRemove)="removeMember(member.id)"
                    >
                      {{ member.name }}
                    </Chip>
                  }
                </ChipSet>
              </div>

              <!-- Add Member -->
              <div class="flex gap-3 items-end">
                <div class="flex-1">
                  <InputComponent
                    [value]="newMemberName"
                    (valueChange)="newMemberName = $event"
                    placeholder="Enter member name"
                    (keydown.enter)="addTeamMember()"
                  />
                </div>
                <Button
                  size="lg"
                  variant="outline"
                  (click)="addTeamMember()"
                >
                  Add Member
                </Button>
              </div>
            </div>
          </div>

          <!-- Overflow Management Section -->
          <div class="bg-white/90 backdrop-blur-sm dark:bg-gray-800/90 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-4 sm:p-6 lg:p-8 shadow-lg">
            <h2 class="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
              <span class="w-3 h-3 bg-blue-500 rounded-full inline-block mr-2"></span>
              Overflow Management
            </h2>

            <div class="space-y-4 sm:space-y-6">
              <!-- Count-based overflow demo -->
              <div>
                <h3 class="text-base sm:text-lg font-medium text-gray-700 dark:text-gray-300 mb-2 sm:mb-3">Count-Based Overflow (Max 5 Visible)</h3>
                <div class="border-2 border-dashed border-blue-300 dark:border-blue-600 p-3 sm:p-4 lg:p-6 rounded-lg bg-blue-50/50 dark:bg-blue-950/20 overflow-x-auto">
                  <ChipSet [wrap]="false" [maxVisible]="5" [showOverflow]="true" [spacing]="'sm'" class="min-w-max">
                    @for (tag of selectedTags(); track tag.id) {
                      <Chip
                        [variant]="'filled'"
                        [color]="tag.color"
                        [removable]="tag.removable"
                        (onRemove)="removeTag(tag.id)"
                      >
                        {{ tag.label }}
                      </Chip>
                    }
                    @for (member of teamMembers().slice(0, 3); track member.id) {
                      <Chip
                        variant="outlined"
                        color="secondary"
                        [avatar]="member.avatar"
                        [avatarAlt]="member.name"
                      >
                        {{ member.name }}
                      </Chip>
                    }
                  </ChipSet>
                </div>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Only 5 chips are visible, remaining are shown as "+N more" with tooltip showing hidden items
                </p>
              </div>

              <!-- Width-based overflow demo for mobile -->
              <div>
                <h3 class="text-base sm:text-lg font-medium text-gray-700 dark:text-gray-300 mb-2 sm:mb-3">Mobile-Optimized Overflow</h3>
                <div class="border-2 border-dashed border-green-300 dark:border-green-600 p-3 sm:p-4 lg:p-6 rounded-lg bg-green-50/50 dark:bg-green-950/20">
                  <!-- Mobile: Max 2 visible, Tablet: Max 3, Desktop: Max 4 -->
                  <div class="block sm:hidden">
                    <ChipSet [wrap]="false" [showOverflow]="true" [spacing]="'sm'" [maxVisible]="2">
                      @for (tag of selectedTags(); track tag.id) {
                        <Chip
                          [variant]="'filled'"
                          [color]="tag.color"
                          [removable]="false"
                          [size]="'sm'"
                        >
                          {{ tag.label }}
                        </Chip>
                      }
                    </ChipSet>
                  </div>
                  <div class="hidden sm:block lg:hidden">
                    <ChipSet [wrap]="false" [showOverflow]="true" [spacing]="'sm'" [maxVisible]="3">
                      @for (tag of selectedTags(); track tag.id) {
                        <Chip
                          [variant]="'filled'"
                          [color]="tag.color"
                          [removable]="false"
                        >
                          {{ tag.label }}
                        </Chip>
                      }
                    </ChipSet>
                  </div>
                  <div class="hidden lg:block">
                    <ChipSet [wrap]="false" [showOverflow]="true" [spacing]="'sm'" [maxVisible]="4">
                      @for (tag of selectedTags(); track tag.id) {
                        <Chip
                          [variant]="'filled'"
                          [color]="tag.color"
                          [removable]="false"
                        >
                          {{ tag.label }}
                        </Chip>
                      }
                    </ChipSet>
                  </div>
                </div>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Responsive overflow: Mobile (2 max), Tablet (3 max), Desktop (4 max). Hover overflow indicator to see hidden items.
                </p>
              </div>
            </div>
          </div>

          <!-- Wrapping Demo -->
          <div class="bg-white/90 backdrop-blur-sm dark:bg-gray-800/90 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 shadow-lg">
            <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              <span class="w-3 h-3 bg-green-500 rounded-full inline-block mr-2"></span>
              Responsive Wrapping
            </h2>

            <div class="space-y-6">
              <!-- Available filters -->
              <div>
                <h3 class="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">Available Filters</h3>
                <div class="border-2 border-dashed border-gray-300 dark:border-gray-600 p-4 rounded-lg">
                  <ChipSet [wrap]="true" [spacing]="'sm'">
                    @for (filter of availableFilters().slice(0, 8); track filter.id) {
                      <Chip
                        [variant]="'ghost'"
                        [color]="filter.color"
                        [clickable]="true"
                        (onClick)="addFilter(filter)"
                      >
                        {{ filter.label }}
                      </Chip>
                    }
                  </ChipSet>
                </div>
              </div>

              <!-- Active filters -->
              @if (activeFilters().length > 0) {
                <div>
                  <h3 class="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">Active Filters</h3>
                  <ChipSet [spacing]="'xs'">
                    @for (filter of activeFilters(); track filter.id) {
                      <Chip
                        [variant]="'filled'"
                        [color]="filter.color"
                        [removable]="true"
                        [size]="'sm'"
                        (onRemove)="removeFilter(filter.id)"
                      >
                        {{ filter.label }}
                      </Chip>
                    }
                  </ChipSet>
                </div>
              }

              <!-- Filter Controls -->
              <div class="flex gap-3">
                <Button
                  size="sm"
                  variant="outline"
                  (click)="addRandomFilter()"
                >
                  Add Random Filter
                </Button>
                @if (activeFilters().length > 0) {
                  <Button
                    size="sm"
                    variant="outline"
                    (click)="clearAllFilters()"
                  >
                    Clear Filters
                  </Button>
                }
              </div>
            </div>
          </div>

          <!-- Loading States Demo -->
          <div class="bg-white/90 backdrop-blur-sm dark:bg-gray-800/90 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 shadow-lg">
            <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Loading States</h2>

            <div class="space-y-6">
              <ChipSet [spacing]="'md'">
                <Chip
                  variant="filled"
                  color="primary"
                  [loading]="loadingStates.processing()"
                  [clickable]="true"
                  (onClick)="toggleProcessing()"
                >
                  @if (loadingStates.processing()) {
                    Processing...
                  } @else {
                    Start Processing
                  }
                </Chip>

                <Chip
                  variant="outlined"
                  color="success"
                  [loading]="loadingStates.saving()"
                  [clickable]="true"
                  (onClick)="toggleSaving()"
                >
                  @if (loadingStates.saving()) {
                    Saving...
                  } @else {
                    Save Data
                  }
                </Chip>

                <Chip
                  variant="ghost"
                  color="warning"
                  [disabled]="true"
                  [clickable]="false"
                >
                  Disabled Chip
                </Chip>
              </ChipSet>
            </div>
          </div>
        </div>

        <!-- Stats Summary -->
        <div class="mt-16 pt-12 border-t border-gray-200 dark:border-gray-800">
          <div class="text-center">
            <div class="inline-flex items-center gap-6 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border border-blue-200 dark:border-blue-800">
              <div class="text-center">
                <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ totalChips() }}</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">Total Chips</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-green-600 dark:text-green-400">{{ onlineMembers().length }}</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">Online</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">{{ activeFilters().length }}</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">Active Filters</div>
              </div>
            </div>
          </div>

          <!-- Documentation Link Section -->
          <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-2xl border border-blue-200/50 dark:border-blue-700/50 p-6 sm:p-8 shadow-lg text-center mt-8">
            <div class="flex flex-col items-center space-y-4">
              <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Complete Documentation
                </h3>
                <p class="text-gray-600 dark:text-gray-300 mb-4 max-w-md">
                  Explore detailed API documentation, examples, and implementation guides for the Chip component.
                </p>
                <a 
                  href="https://github.com/bhaimicrosoft/angular-superui/blob/main/docs/components/chip.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
                >
                  <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clip-rule="evenodd"></path>
                  </svg>
                  View Documentation
                  <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Toast Messages -->
      @if (showToast()) {
        <div class="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-2">
          <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 max-w-sm">
            <p class="text-sm text-gray-900 dark:text-white">{{ toastMessage() }}</p>
          </div>
        </div>
      }
    </div>
  `
})
export class ChipDemoComponent {
  // Toast system
  toastMessage = signal<string>('');
  showToast = signal<boolean>(false);

  // Interactive state
  newMemberName = '';

  // Selected tags
  selectedTags = signal<Tag[]>([
    { id: '1', label: 'Angular', color: 'primary', removable: true },
    { id: '2', label: 'TypeScript', color: 'info', removable: true },
    { id: '3', label: 'Tailwind CSS', color: 'success', removable: true },
    { id: '4', label: 'Signals', color: 'warning', removable: true },
  ]);

  // Loading states
  loadingStates = {
    processing: signal(false),
    saving: signal(false),
    loading: signal(false)
  };

  // Team members
  teamMembers = signal<User[]>([
    {
      id: '1',
      name: 'Alice Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616c4b00b87?w=150&h=150&fit=crop&crop=face',
      role: 'Frontend Developer',
      online: true
    },
    {
      id: '2',
      name: 'Bob Smith',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      role: 'Backend Developer',
      online: true
    },
    {
      id: '3',
      name: 'Carol Davis',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      role: 'UI/UX Designer',
      online: false
    },
    {
      id: '4',
      name: 'David Wilson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      role: 'DevOps Engineer',
      online: true
    },
    {
      id: '5',
      name: 'Eva Brown',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      role: 'Product Manager',
      online: false
    }
  ]);

  // Filter system
  activeFilters = signal<Tag[]>([]);

  readonly allAvailableFilters: Tag[] = [
    { id: 'f1', label: 'Frontend', color: 'primary', removable: true },
    { id: 'f2', label: 'Backend', color: 'secondary', removable: true },
    { id: 'f3', label: 'React', color: 'info', removable: true },
    { id: 'f4', label: 'Vue.js', color: 'success', removable: true },
    { id: 'f5', label: 'Angular', color: 'warning', removable: true },
    { id: 'f6', label: 'Node.js', color: 'danger', removable: true },
    { id: 'f7', label: 'TypeScript', color: 'primary', removable: true },
    { id: 'f8', label: 'JavaScript', color: 'secondary', removable: true },
    { id: 'f9', label: 'CSS', color: 'info', removable: true },
    { id: 'f10', label: 'HTML', color: 'success', removable: true }
  ];

  // Computed properties
  totalChips = computed(() => {
    return this.selectedTags().length +
           this.teamMembers().length +
           this.activeFilters().length;
  });

  onlineMembers = computed(() => {
    return this.teamMembers().filter(member => member.online);
  });

  offlineMembers = computed(() => {
    return this.teamMembers().filter(member => !member.online);
  });

  availableFilters = computed(() => {
    const activeIds = this.activeFilters().map(f => f.id);
    return this.allAvailableFilters.filter(f => !activeIds.includes(f.id));
  });

  // Event handlers
  handleChipClick(event: ChipClickEvent) {
    this.showToastMessage('Chip clicked: ' + (event.chip.label() || 'Unknown'));
  }

  removeTag(tagId: string) {
    this.selectedTags.update(tags => tags.filter(tag => tag.id !== tagId));
    this.showToastMessage('Tag removed successfully');
  }

  addRandomTag() {
    const colors: Array<'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'> =
      ['default', 'primary', 'secondary', 'success', 'warning', 'danger', 'info'];

    const labels = ['React', 'Vue', 'Svelte', 'Next.js', 'Nuxt', 'SvelteKit', 'Remix', 'Astro'];
    const availableLabels = labels.filter(label =>
      !this.selectedTags().some(tag => tag.label === label)
    );

    if (availableLabels.length === 0) {
      this.showToastMessage('No more tags to add');
      return;
    }

    const randomLabel = availableLabels[Math.floor(Math.random() * availableLabels.length)];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newTag: Tag = {
      id: Date.now().toString(),
      label: randomLabel,
      color: randomColor,
      removable: true
    };

    this.selectedTags.update(tags => [...tags, newTag]);
    this.showToastMessage(`Added ${randomLabel} tag`);
  }

  clearAllTags() {
    this.selectedTags.set([]);
    this.showToastMessage('All tags cleared');
  }

  toggleProcessing() {
    this.loadingStates.processing.update(state => !state);
    if (this.loadingStates.processing()) {
      setTimeout(() => this.loadingStates.processing.set(false), 3000);
    }
  }

  toggleSaving() {
    this.loadingStates.saving.update(state => !state);
    if (this.loadingStates.saving()) {
      setTimeout(() => this.loadingStates.saving.set(false), 2000);
    }
  }

  selectMember(member: User) {
    this.showToastMessage(`Selected ${member.name} (${member.role})`);
  }

  removeMember(memberId: string) {
    this.teamMembers.update(members => members.filter(member => member.id !== memberId));
    this.showToastMessage('Team member removed');
  }

  addTeamMember() {
    if (!this.newMemberName.trim()) {
      this.showToastMessage('Please enter a member name');
      return;
    }

    const avatarUrls = [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face'
    ];

    const roles = ['Developer', 'Designer', 'Manager', 'Engineer', 'Analyst'];

    const newMember: User = {
      id: Date.now().toString(),
      name: this.newMemberName.trim(),
      avatar: avatarUrls[Math.floor(Math.random() * avatarUrls.length)],
      role: roles[Math.floor(Math.random() * roles.length)],
      online: Math.random() > 0.5
    };

    this.teamMembers.update(members => [...members, newMember]);
    this.showToastMessage(`Added ${newMember.name} to the team`);
    this.newMemberName = '';
  }

  addFilter(filter: Tag) {
    this.activeFilters.update(filters => [...filters, filter]);
    this.showToastMessage(`Applied ${filter.label} filter`);
  }

  removeFilter(filterId: string) {
    this.activeFilters.update(filters => filters.filter(filter => filter.id !== filterId));
    this.showToastMessage('Filter removed');
  }

  clearAllFilters() {
    this.activeFilters.set([]);
    this.showToastMessage('All filters cleared');
  }

  addRandomFilter() {
    const available = this.availableFilters();
    if (available.length === 0) {
      this.showToastMessage('No more filters available');
      return;
    }

    const randomFilter = available[Math.floor(Math.random() * available.length)];
    this.addFilter(randomFilter);
  }

  private showToastMessage(message: string) {
    this.toastMessage.set(message);
    this.showToast.set(true);
    setTimeout(() => {
      this.showToast.set(false);
      setTimeout(() => {
        this.toastMessage.set('');
      }, 300);
    }, 3000);
  }
}
