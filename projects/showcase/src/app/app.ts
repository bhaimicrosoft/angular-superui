import { Component, signal, OnInit, inject, afterNextRender, HostListener } from '@angular/core';
import { ThemeSwitcher, ThemeService } from '@lib/theme-switcher';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@lib/accordion';
import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel
} from '@lib/alert-dialog';
import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@lib/alert';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@lib/card';
import { Button } from '@lib/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ThemeSwitcher,
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
    AlertDialog,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogAction,
    AlertDialogCancel,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
    Button,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  title = 'Angular SuperUI Showcase';

  // Inject theme service to ensure it's initialized
  private themeService = inject(ThemeService);

  constructor() {
    // Force theme service initialization after render
    afterNextRender(() => {
      console.log('🎨 App render complete, theme state:', {
        theme: this.themeService.currentTheme(),
        isDark: this.themeService.isDarkMode(),
        systemTheme: this.themeService.systemTheme()
      });
    });
  }

  // Expose theme service for template
  get currentTheme() {
    return this.themeService.currentTheme();
  }

  get isDarkMode() {
    return this.themeService.isDarkMode();
  }

  ngOnInit() {
    console.log('🚀 App component initializing...');

    // Listen for theme changes
    window.addEventListener('theme-changed', (event: any) => {
      console.log('📡 App received theme change event:', event.detail);
    });

    // Check for pre-initialization data
    const preloadData = (window as any).__THEME_PRELOAD__;
    if (preloadData) {
      console.log('📥 Found theme preload data:', preloadData);
    }
  }

  // AlertDialog states
  isDeleteDialogOpen = signal(false);
  isLogoutDialogOpen = signal(false);
  isConfirmDialogOpen = signal(false);

  // Go to top button state
  showGoToTop = signal(false);

  // Listen for scroll events
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    // Show button only after scrolling past the hero section (typically full viewport height)
    const heroHeight = window.innerHeight;
    this.showGoToTop.set(scrollTop > heroHeight - 100); // Show when 100px before end of hero
  }

  // Scroll to top method
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // Theme change handler
  onThemeChange(theme: any) {
    console.log('🎨 Theme changed in component:', theme);
  }

  // AlertDialog methods
  openDeleteDialog() {
    this.isDeleteDialogOpen.set(true);
  }

  openLogoutDialog() {
    this.isLogoutDialogOpen.set(true);
  }

  openConfirmDialog() {
    this.isConfirmDialogOpen.set(true);
  }

  handleDelete() {
    console.log('Account deleted!');
    this.isDeleteDialogOpen.set(false);
  }

  handleLogout() {
    console.log('User logged out!');
    this.isLogoutDialogOpen.set(false);
  }

  handleConfirm() {
    console.log('Action confirmed!');
    this.isConfirmDialogOpen.set(false);
  }

  cancelDialog(type: 'delete' | 'logout' | 'confirm') {
    switch (type) {
      case 'delete':
        this.isDeleteDialogOpen.set(false);
        break;
      case 'logout':
        this.isLogoutDialogOpen.set(false);
        break;
      case 'confirm':
        this.isConfirmDialogOpen.set(false);
        break;
    }
  }
}
