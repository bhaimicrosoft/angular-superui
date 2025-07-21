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
      console.log(this.computedClassSignal());
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
    if (this.currentPage() > 1) {
      this.currentPage.update(page => page - 1);
      this.showToastMessage(`📄 Page ${this.currentPage()} loaded`);
    }
  }

  goToNextPage() {
    if (this.currentPage() < this.totalPages()) {
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
