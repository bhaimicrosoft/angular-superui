import {Component, computed, effect, signal, OnInit, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from '@lib/button';
import { SEOService } from '../services/seo.service';

@Component({
  selector: 'app-button-demo',
  standalone: true,
  imports: [CommonModule, Button],
  templateUrl: './button-demo.component.html'
})
export class ButtonDemoComponent implements OnInit {
  private seoService = inject(SEOService);

  ngOnInit() {
    // Update SEO for button component page
    this.seoService.updateSEO(this.seoService.getComponentSEO('button'));
    this.seoService.addComponentStructuredData('button');
  }
  // Loading states for interactive demos
  loadingStates = signal({
    primary: false,
    download: false,
    save: false,
    delete: false,
    submit: false,
    upload: false
  });

  // Interactive counters and states
  clickCount = signal(0);
  likeCount = signal(256);
  shareCount = signal(89);
  downloadCount = signal(1234);
  bookmarkCount = signal(45);

  // Toggle states
  isLiked = signal(false);
  isBookmarked = signal(false);
  isSubscribed = signal(false);

  // Button group states
  boldActive = signal(false);
  italicActive = signal(false);
  underlineActive = signal(false);
  currentAlignment = signal<'left' | 'center' | 'right' | 'justify'>('left');

  // Filter and navigation states
  activeFilter = signal<'all' | 'active' | 'pending' | 'completed'>('all');
  currentPage = signal(1);
  totalPages = signal(5);

  // Theme and preferences
  currentTheme = signal<'light' | 'dark' | 'auto'>('auto');
  currentView = signal<'grid' | 'list' | 'card'>('grid');
  sortBy = signal<'name' | 'date' | 'popularity' | 'size'>('name');

  // Toast notification system
  toastMessage = signal<string | null>(null);
  showToast = signal(false);

  // Animation states
  animationStates = signal({
    bounce: false,
    pulse: false,
    shake: false,
    spin: false,
    wobble: false,
    flip: false,
    rubberBand: false
  });

  constructor() {
    effect(() => {
      console.log('computedClassSignal changed:', this.computedClassSignal());
    });

    // Debug effects for button states
    effect(() => {
      console.log('boldActive changed:', this.boldActive());
    });

    effect(() => {
      console.log('activeFilter changed:', this.activeFilter());
    });

    effect(() => {
      console.log('currentPage changed:', this.currentPage());
    });

    effect(() => {
      console.log('isPreviousDisabled:', this.isPreviousDisabled());
    });

    effect(() => {
      console.log('isNextDisabled:', this.isNextDisabled());
    });
  }

  // Methods for interactive actions
  handlePrimaryAction() {
    this.setLoading('primary', true);
    this.showToastMessage('🚀 Primary action initiated!');
    setTimeout(() => {
      this.setLoading('primary', false);
      this.showToastMessage('✅ Action completed successfully!');
    }, 2000);
  }

  handleDownload() {
    this.setLoading('download', true);
    this.downloadCount.update(count => count + 1);
    this.showToastMessage('📥 Download started...');
    setTimeout(() => {
      this.setLoading('download', false);
      this.showToastMessage('✅ Download completed!');
    }, 3000);
  }

  handleSave() {
    this.setLoading('save', true);
    this.showToastMessage('💾 Saving changes...');
    setTimeout(() => {
      this.setLoading('save', false);
      this.showToastMessage('✅ Changes saved successfully!');
    }, 1500);
  }

  handleDelete() {
    this.setLoading('delete', true);
    this.showToastMessage('🗑️ Deleting item...');
    setTimeout(() => {
      this.setLoading('delete', false);
      this.showToastMessage('✅ Item deleted successfully!');
    }, 2000);
  }

  handleSubmit() {
    this.setLoading('submit', true);
    this.showToastMessage('📤 Submitting form...');
    setTimeout(() => {
      this.setLoading('submit', false);
      this.showToastMessage('✅ Form submitted successfully!');
    }, 2500);
  }

  handleUpload() {
    this.setLoading('upload', true);
    this.showToastMessage('☁️ Uploading files...');
    setTimeout(() => {
      this.setLoading('upload', false);
      this.showToastMessage('✅ Upload completed!');
    }, 3500);
  }

  // Toggle actions
  toggleLike() {
    const newLiked = !this.isLiked();
    this.isLiked.set(newLiked);
    this.likeCount.update(count => newLiked ? count + 1 : count - 1);
    this.showToastMessage(newLiked ? '❤️ Liked!' : '💔 Unliked!');
  }

  toggleBookmark() {
    const newBookmarked = !this.isBookmarked();
    this.isBookmarked.set(newBookmarked);
    this.bookmarkCount.update(count => newBookmarked ? count + 1 : count - 1);
    this.showToastMessage(newBookmarked ? '🔖 Bookmarked!' : '📄 Bookmark removed!');
  }

  toggleSubscribe() {
    const newSubscribed = !this.isSubscribed();
    this.isSubscribed.set(newSubscribed);
    this.showToastMessage(newSubscribed ? '🔔 Subscribed!' : '🔕 Unsubscribed!');
  }

  // Formatting actions
  toggleBold() {
    this.boldActive.update(active => !active);
    this.showToastMessage(this.boldActive() ? '🔥 Bold enabled!' : '📝 Bold disabled!');
  }

  toggleItalic() {
    this.italicActive.update(active => !active);
    this.showToastMessage(this.italicActive() ? '✨ Italic enabled!' : '📝 Italic disabled!');
  }

  toggleUnderline() {
    this.underlineActive.update(active => !active);
    this.showToastMessage(this.underlineActive() ? '📏 Underline enabled!' : '📝 Underline disabled!');
  }

  setAlignment(alignment: 'left' | 'center' | 'right' | 'justify') {
    this.currentAlignment.set(alignment);
    this.showToastMessage(`📐 Text aligned ${alignment}!`);
  }

  // Filter and navigation actions
  setFilter(filter: 'all' | 'active' | 'pending' | 'completed') {
    this.activeFilter.set(filter);
    this.showToastMessage(`🔍 Filter: ${filter} items`);
  }

  goToPage(page: number) {
    this.currentPage.set(page);
    this.showToastMessage(`📄 Page ${page} loaded`);
  }

  goToPreviousPage() {
    if (!this.isPreviousDisabled() && this.currentPage() > 1) {
      this.currentPage.update(page => page - 1);
      this.showToastMessage(`📄 Page ${this.currentPage()} loaded`);
    }
  }

  goToNextPage() {
    if (!this.isNextDisabled() && this.currentPage() < this.totalPages()) {
      this.currentPage.update(page => page + 1);
      this.showToastMessage(`📄 Page ${this.currentPage()} loaded`);
    }
  }

  computedClassSignal = computed(() => {
    if(this.sortBy() === 'date') {
      return `bg-indigo-600 text-white border-indigo-600 shadow-lg scale-105`;
    }

    if(this.sortBy() === 'name') {
      return `bg-pink-600 text-white border-pink-600 shadow-lg scale-105`;
    }

    if(this.sortBy() === 'popularity') {
      return `bg-orange-600 text-white border-orange-600 shadow-lg scale-105`
    }

    return "";
  })

  // Computed signals for button classes with updated colors
  boldButtonClasses = computed(() => 
    this.boldActive() 
      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white border-2 border-blue-500 shadow-xl scale-110 ring-4 ring-blue-200 dark:ring-blue-800 transition-all duration-300 hover:scale-105 font-bold rounded-lg px-4 py-2 transform' 
      : 'border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 transition-all duration-300 hover:scale-105 font-bold rounded-lg px-4 py-2'
  );

  italicButtonClasses = computed(() => 
    this.italicActive() 
      ? 'bg-gradient-to-r from-emerald-600 to-green-700 text-white border-2 border-emerald-500 shadow-xl scale-110 ring-4 ring-emerald-200 dark:ring-emerald-800 transition-all duration-300 hover:scale-105 italic rounded-lg px-4 py-2 transform' 
      : 'border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:border-emerald-300 transition-all duration-300 hover:scale-105 italic rounded-lg px-4 py-2'
  );

  underlineButtonClasses = computed(() => 
    this.underlineActive() 
      ? 'bg-gradient-to-r from-purple-600 to-violet-700 text-white border-2 border-purple-500 shadow-xl scale-110 ring-4 ring-purple-200 dark:ring-purple-800 transition-all duration-300 hover:scale-105 underline rounded-lg px-4 py-2 transform' 
      : 'border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 transition-all duration-300 hover:scale-105 underline rounded-lg px-4 py-2'
  );

  alignLeftClasses = computed(() => 
    this.currentAlignment() === 'left' 
      ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white border-2 border-orange-500 shadow-xl scale-110 ring-4 ring-orange-200 dark:ring-orange-800 transition-all duration-300 hover:scale-105 rounded-lg px-4 py-2 transform' 
      : 'border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:border-orange-300 transition-all duration-300 hover:scale-105 rounded-lg px-4 py-2'
  );

  alignCenterClasses = computed(() => 
    this.currentAlignment() === 'center' 
      ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white border-2 border-orange-500 shadow-xl scale-110 ring-4 ring-orange-200 dark:ring-orange-800 transition-all duration-300 hover:scale-105 rounded-lg px-4 py-2 transform' 
      : 'border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:border-orange-300 transition-all duration-300 hover:scale-105 rounded-lg px-4 py-2'
  );

  alignRightClasses = computed(() => 
    this.currentAlignment() === 'right' 
      ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white border-2 border-orange-500 shadow-xl scale-110 ring-4 ring-orange-200 dark:ring-orange-800 transition-all duration-300 hover:scale-105 rounded-lg px-4 py-2 transform' 
      : 'border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:border-orange-300 transition-all duration-300 hover:scale-105 rounded-lg px-4 py-2'
  );

  alignJustifyClasses = computed(() => 
    this.currentAlignment() === 'justify' 
      ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white border-2 border-orange-500 shadow-xl scale-110 ring-4 ring-orange-200 dark:ring-orange-800 transition-all duration-300 hover:scale-105 rounded-lg px-4 py-2 transform' 
      : 'border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:border-orange-300 transition-all duration-300 hover:scale-105 rounded-lg px-4 py-2'
  );

  // Filter button classes with updated colors
  filterAllClasses = computed(() => 
    this.activeFilter() === 'all' 
      ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-xl scale-110 ring-4 ring-gray-400 dark:ring-gray-600 transition-all duration-300 hover:scale-105 rounded-lg px-4 py-2 transform font-semibold' 
      : 'bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-500 hover:scale-105 transition-all duration-300 rounded-lg px-4 py-2'
  );

  filterActiveClasses = computed(() => 
    this.activeFilter() === 'active' 
      ? 'bg-gradient-to-r from-green-600 to-emerald-700 text-white border-2 border-green-500 shadow-xl scale-110 ring-4 ring-green-200 dark:ring-green-800 transition-all duration-300 hover:scale-105 rounded-lg px-4 py-2 transform font-semibold' 
      : 'border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-green-50 dark:hover:bg-green-900/20 hover:border-green-300 transition-all duration-300 hover:scale-105 rounded-lg px-4 py-2'
  );

  filterPendingClasses = computed(() => 
    this.activeFilter() === 'pending' 
      ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-white border-2 border-amber-400 shadow-xl scale-110 ring-4 ring-amber-200 dark:ring-amber-800 transition-all duration-300 hover:scale-105 rounded-lg px-4 py-2 transform font-semibold' 
      : 'border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:border-amber-300 transition-all duration-300 hover:scale-105 rounded-lg px-4 py-2'
  );

  filterCompletedClasses = computed(() => 
    this.activeFilter() === 'completed' 
      ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white border-2 border-emerald-500 shadow-xl scale-110 ring-4 ring-emerald-200 dark:ring-emerald-800 transition-all duration-300 hover:scale-105 rounded-lg px-4 py-2 transform font-semibold' 
      : 'border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:border-emerald-300 transition-all duration-300 hover:scale-105 rounded-lg px-4 py-2'
  );

  // Pagination disabled states - using computed signals
  isPreviousDisabled = computed(() => this.currentPage() === 1);
  isNextDisabled = computed(() => this.currentPage() === this.totalPages());

  // Previous/Next button classes with enhanced disabled styling
  previousButtonClasses = computed(() => 
    this.isPreviousDisabled() 
      ? 'opacity-40 cursor-not-allowed bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 border-2 border-gray-200 dark:border-gray-600 transition-all duration-300 pointer-events-none rounded-lg px-4 py-2' 
      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:border-indigo-300 dark:hover:border-indigo-600 hover:text-indigo-700 dark:hover:text-indigo-300 hover:scale-105 transition-all duration-300 cursor-pointer rounded-lg px-4 py-2'
  );

  nextButtonClasses = computed(() => 
    this.isNextDisabled() 
      ? 'opacity-40 cursor-not-allowed bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 border-2 border-gray-200 dark:border-gray-600 transition-all duration-300 pointer-events-none rounded-lg px-4 py-2' 
      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:border-indigo-300 dark:hover:border-indigo-600 hover:text-indigo-700 dark:hover:text-indigo-300 hover:scale-105 transition-all duration-300 cursor-pointer rounded-lg px-4 py-2'
  );

  // Pagination button classes - improved colors and styling
  getPageClasses(page: number): string {
    return this.currentPage() === page 
      ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-2xl scale-125 ring-4 ring-indigo-300 dark:ring-indigo-700 transition-all duration-500 min-w-[48px] hover:scale-110 rounded-xl px-4 py-3 transform font-bold text-lg border-2 border-indigo-400' 
      : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-900/30 dark:hover:to-purple-900/30 hover:text-indigo-700 dark:hover:text-indigo-300 hover:scale-110 transition-all duration-300 min-w-[48px] rounded-xl px-4 py-3 border-2 border-gray-200 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-lg font-semibold';
  }

  //
/*  computeClasses(sortName: string): string {
    if(this.sortBy() === sortName) {
      return `bg-indigo-600! text-white border-indigo-600 shadow-lg scale-105`;
    }

    if(this.sortBy() === sortName) {
      return `bg-pink-600! text-white border-pink-600 shadow-lg scale-105`;
    }

    if(this.sortBy() === sortName) {
      return `bg-orange-600! text-white border-orange-600 shadow-lg scale-105`
    }

    return "";
  }*/

  // Preference actions
  setTheme(theme: 'light' | 'dark' | 'auto') {
    this.currentTheme.set(theme);
    this.showToastMessage(`🎨 Theme: ${theme} mode`);
  }

  setView(view: 'grid' | 'list' | 'card') {
    this.currentView.set(view);
    this.showToastMessage(`👁️ View: ${view} layout`);
  }

  setSortBy(sort: 'name' | 'date' | 'popularity' | 'size') {
    this.sortBy.set(sort);
    console.log(this.sortBy());
    this.showToastMessage(`🔄 Sorted by ${sort}`);
  }

  // Animation triggers
  triggerAnimation(animation: 'bounce' | 'pulse' | 'shake' | 'spin' | 'wobble' | 'flip' | 'rubberBand') {
    this.animationStates.update(states => ({
      ...states,
      [animation]: true
    }));

    setTimeout(() => {
      this.animationStates.update(states => ({
        ...states,
        [animation]: false
      }));
    }, 1000);

    this.showToastMessage(`✨ ${animation} animation triggered!`);
  }

  triggerRandomAnimation() {
    const animations: ('bounce' | 'pulse' | 'shake' | 'spin' | 'wobble' | 'flip' | 'rubberBand')[] =
      ['bounce', 'pulse', 'shake', 'spin', 'wobble', 'flip', 'rubberBand'];
    const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
    this.triggerAnimation(randomAnimation);
  }

  // Utility methods
  incrementClick() {
    this.clickCount.update(count => count + 1);
    this.showToastMessage(`🖱️ Click count: ${this.clickCount()}`);
  }

  shareContent() {
    this.shareCount.update(count => count + 1);
    this.showToastMessage('🚀 Content shared!');
  }

  private setLoading(action: string, loading: boolean) {
    this.loadingStates.update(states => ({
      ...states,
      [action]: loading
    }));
  }

  private showToastMessage(message: string) {
    this.toastMessage.set(message);
    this.showToast.set(true);
    setTimeout(() => {
      this.showToast.set(false);
    }, 3000);
  }
}
