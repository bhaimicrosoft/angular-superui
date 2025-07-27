import { Component, signal, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from '../../../../lib/src/lib/button';
import { SEOService } from '../services/seo.service';
import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel
} from '../../../../lib/src/lib/alert-dialog';

@Component({
  selector: 'app-alert-dialog-demo',
  standalone: true,
  imports: [
    CommonModule,
    Button,
    AlertDialog,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogAction,
    AlertDialogCancel
  ],
  template: `
    <div
      class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900 py-12">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">

        <!-- Hero Header -->
        <div class="text-center mb-16">
          <div
            class="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium mb-6">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            AlertDialog Component
          </div>

          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
            Modal
            <span class="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
              Dialog System
            </span>
          </h1>

          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Interrupt users with important content that demands attention. Features full accessibility,
            focus management, and stunning animations.
          </p>
        </div>

        <!-- Interactive Demo Grid -->
        <div
          class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 mb-16">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            🚀 Interactive Dialog Examples
          </h2>

          <!-- Dialog Examples Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">

            <!-- Basic Alert Dialog -->
            <div
              class="group bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-2xl p-6 border-2 border-red-200 dark:border-red-800 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mr-3">
                  <svg class="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor"
                       viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-red-800 dark:text-red-200">Destructive Action</h3>
              </div>
              <p class="text-red-700 dark:text-red-300 text-sm mb-4">
                Confirm destructive actions with clear warnings and multiple confirmation steps.
              </p>
              <Button
                (click)="basicDialog.set(true)"
                customClasses="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
              >
                🗑️ Delete Account
              </Button>
            </div>

            <!-- Warning Dialog -->
            <div
              class="group bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-6 border-2 border-yellow-200 dark:border-yellow-800 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div class="flex items-center mb-4">
                <div
                  class="w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mr-3">
                  <svg class="w-5 h-5 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor"
                       viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-yellow-800 dark:text-yellow-200">Warning Alert</h3>
              </div>
              <p class="text-yellow-700 dark:text-yellow-300 text-sm mb-4">
                Warn users about potential data loss or important system changes.
              </p>
              <Button
                (click)="warningDialog.set(true)"
                customClasses="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-4 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
              >
                ⚠️ Unsaved Changes
              </Button>
            </div>

            <!-- Success Dialog -->
            <div
              class="group bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border-2 border-green-200 dark:border-green-800 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div class="flex items-center mb-4">
                <div
                  class="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-3">
                  <svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor"
                       viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-green-800 dark:text-green-200">Success Confirmation</h3>
              </div>
              <p class="text-green-700 dark:text-green-300 text-sm mb-4">
                Celebrate successful actions with positive feedback and next steps.
              </p>
              <Button
                (click)="successDialog.set(true)"
                customClasses="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-4 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
              >
                ✅ Complete Action
              </Button>
            </div>

            <!-- Custom Styled Dialog -->
            <div
              class="group bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border-2 border-purple-200 dark:border-purple-800 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div class="flex items-center mb-4">
                <div
                  class="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-3">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-purple-800 dark:text-purple-200">Premium Feature</h3>
              </div>
              <p class="text-purple-700 dark:text-purple-300 text-sm mb-4">
                Showcase premium features with custom gradients and advanced styling.
              </p>
              <Button
                (click)="customDialog.set(true)"
                customClasses="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
              >
                ✨ Upgrade Now
              </Button>
            </div>

            <!-- Critical System Dialog -->
            <div
              class="group bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border-2 border-blue-200 dark:border-blue-800 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3">
                  <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor"
                       viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-blue-800 dark:text-blue-200">Critical Update</h3>
              </div>
              <p class="text-blue-700 dark:text-blue-300 text-sm mb-4">
                Force user action for critical system updates that cannot be dismissed.
              </p>
              <Button
                (click)="noOverlayDialog.set(true)"
                customClasses="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-4 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
              >
                🚨 Force Action
              </Button>
            </div>

            <!-- Complex Content Dialog -->
            <div
              class="group bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-800/50 dark:to-slate-800/50 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mr-3">
                  <svg class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor"
                       viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Complex Data</h3>
              </div>
              <p class="text-gray-700 dark:text-gray-300 text-sm mb-4">
                Display complex information like reports, charts, and detailed analytics.
              </p>
              <Button
                (click)="complexDialog.set(true)"
                customClasses="w-full bg-gradient-to-r from-gray-600 to-slate-600 hover:from-gray-700 hover:to-slate-700 text-white px-4 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
              >
                📊 View Report
              </Button>
            </div>
          </div>
        </div>

        <!-- Features Section -->
        <div
          class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 mb-16">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            ✨ Key Features & Capabilities
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div class="text-center group">
              <div
                class="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Full Accessibility</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm">ARIA labels, screen reader support, and complete
                keyboard navigation</p>
            </div>

            <div class="text-center group">
              <div
                class="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Focus Management</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm">Automatic focus trapping, restoration, and intuitive
                tab navigation</p>
            </div>

            <div class="text-center group">
              <div
                class="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Flexible Design</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm">Composable layout with custom styling and responsive
                breakpoints</p>
            </div>

            <div class="text-center group">
              <div
                class="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">High Performance</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm">Optimized animations, lazy loading, and minimal bundle
                impact</p>
            </div>

            <div class="text-center group">
              <div
                class="w-16 h-16 bg-gradient-to-br from-red-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Customizable</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm">Extensive theming options, CSS variables, and style
                overrides</p>
            </div>

            <div class="text-center group">
              <div
                class="w-16 h-16 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">TypeScript Ready</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm">Full TypeScript support with comprehensive type
                definitions</p>
            </div>
          </div>
        </div>

        <!-- Documentation Link -->
        <div class="text-center">
          <div
            class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
            onclick="window.open('https://github.com/bhaimicrosoft/angular-superui/blob/main/docs/components/alert-dialog.md', '_blank')">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
            📚 View Full Documentation
          </div>
        </div>

      </div>
    </div>

    <!-- Basic Alert Dialog -->
    <AlertDialog
      [isOpen]="basicDialog()"
      (openChange)="basicDialog.set($event)"
      [accessibility]="{
        ariaLabel: 'Delete account confirmation',
        ariaLabelledBy: 'delete-title',
        ariaDescribedBy: 'delete-description'
      }"
    >
      <AlertDialogHeader>
        <AlertDialogTitle id="delete-title" class="text-red-600 dark:text-red-400">
          🗑️ Delete Account
        </AlertDialogTitle>
        <AlertDialogDescription id="delete-description">
          This action cannot be undone. This will permanently delete your account and remove your data from our servers.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel (cancelClick)="basicDialog.set(false)">
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction
          variant="destructive"
          (actionClick)="handleDeleteAccount()"
        >
          Delete Account
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialog>

    <!-- Warning Dialog -->
    <AlertDialog
      [isOpen]="warningDialog()"
      (openChange)="warningDialog.set($event)"
      [accessibility]="{
        ariaLabel: 'Important warning',
        ariaLive: 'assertive',
        announceText: 'Warning dialog opened - immediate attention required'
      }"
    >
      <AlertDialogHeader>
        <AlertDialogTitle class="text-yellow-600 dark:text-yellow-400">
          ⚠️ Warning: Unsaved Changes
        </AlertDialogTitle>
        <AlertDialogDescription>
          You have unsaved changes that will be lost if you continue. Are you sure you want to leave this page?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel (cancelClick)="warningDialog.set(false)">
          Stay on Page
        </AlertDialogCancel>
        <AlertDialogAction
          variant="destructive"
          (actionClick)="handleLeaveWithoutSaving()"
        >
          Leave Without Saving
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialog>

    <!-- Custom Styled Dialog -->
    <AlertDialog
      [isOpen]="customDialog()"
      (openChange)="customDialog.set($event)"
      [overlayClass]="'bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm'"
      [contentClass]="'bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-purple-900 border-purple-200 dark:border-purple-700 shadow-2xl shadow-purple-500/25'"
    >
      <AlertDialogHeader>
        <AlertDialogTitle class="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
          ✨ Premium Feature
        </AlertDialogTitle>
        <AlertDialogDescription>
          Unlock advanced customization options with our premium plan. Get access to custom themes, priority support,
          and exclusive features.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <div
        class="px-6 py-4 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 rounded-lg mx-6">
        <div class="flex items-center space-x-3">
          <div
            class="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
          </div>
          <div>
            <h4 class="font-semibold text-gray-900 dark:text-white">Premium Benefits</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">Advanced customization & priority support</p>
          </div>
        </div>
      </div>
      <AlertDialogFooter>
        <AlertDialogCancel (cancelClick)="customDialog.set(false)">
          Maybe Later
        </AlertDialogCancel>
        <AlertDialogAction
          class="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
          (actionClick)="handleUpgradeToPremium()"
        >
          Upgrade Now
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialog>

    <!-- Success Dialog -->
    <AlertDialog
      [isOpen]="successDialog()"
      (openChange)="successDialog.set($event)"
    >
      <AlertDialogHeader>
        <AlertDialogTitle class="text-green-600 dark:text-green-400">
          ✅ Action Completed Successfully
        </AlertDialogTitle>
        <AlertDialogDescription>
          Your changes have been saved successfully. The system has been updated and all affected users have been
          notified.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <div
        class="px-6 py-4 bg-green-50 dark:bg-green-900/20 rounded-lg mx-6 border border-green-200 dark:border-green-800">
        <div class="flex items-start space-x-3">
          <div
            class="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0">
            <svg class="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"></path>
            </svg>
          </div>
          <div>
            <h4 class="font-medium text-green-800 dark:text-green-200">Changes Applied</h4>
            <ul class="text-sm text-green-700 dark:text-green-300 mt-1 space-y-1">
              <li>• Database updated with new configuration</li>
              <li>• 3 users notified of changes</li>
              <li>• Backup created automatically</li>
            </ul>
          </div>
        </div>
      </div>
      <AlertDialogFooter>
        <AlertDialogAction
          class="bg-green-500 hover:bg-green-600 text-white border-0"
          (actionClick)="successDialog.set(false)"
        >
          Perfect!
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialog>

    <!-- No Overlay Close Dialog -->
    <AlertDialog
      [isOpen]="noOverlayDialog()"
      (openChange)="noOverlayDialog.set($event)"
      [preventCloseOnOverlayClick]="true"
      [preventCloseOnEscape]="true"
    >
      <AlertDialogHeader>
        <AlertDialogTitle class="text-red-600 dark:text-red-400">
          🚨 Critical System Update
        </AlertDialogTitle>
        <AlertDialogDescription>
          A critical security update is required and cannot be skipped. This will restart the application and may take a
          few minutes to complete.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <div class="px-6 py-4 bg-red-50 dark:bg-red-900/20 rounded-lg mx-6 border border-red-200 dark:border-red-800">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
            <svg class="w-4 h-4 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clip-rule="evenodd"></path>
            </svg>
          </div>
          <div>
            <h4 class="font-medium text-red-800 dark:text-red-200">Required Action</h4>
            <p class="text-sm text-red-700 dark:text-red-300">This dialog cannot be closed without taking action.</p>
          </div>
        </div>
      </div>
      <AlertDialogFooter>
        <AlertDialogAction
          variant="destructive"
          (actionClick)="handleCriticalUpdate()"
        >
          Install Update Now
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialog>

    <!-- Complex Dialog -->
    <AlertDialog
      [isOpen]="complexDialog()"
      (openChange)="complexDialog.set($event)"
      [contentClass]="'max-w-2xl'"
    >
      <AlertDialogHeader>
        <AlertDialogTitle>
          📊 System Performance Report
        </AlertDialogTitle>
        <AlertDialogDescription>
          Detailed analysis of your system performance over the last 30 days with actionable insights.
        </AlertDialogDescription>
      </AlertDialogHeader>

      <!-- Complex Content -->
      <div class="px-6 space-y-6">
        <!-- Performance Metrics -->
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">98.7%</div>
            <div class="text-sm text-blue-700 dark:text-blue-300">Uptime</div>
          </div>
          <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <div class="text-2xl font-bold text-green-600 dark:text-green-400">245ms</div>
            <div class="text-sm text-green-700 dark:text-green-300">Avg Response</div>
          </div>
        </div>

        <!-- Recommendations -->
        <div class="space-y-3">
          <h4 class="font-semibold text-gray-900 dark:text-white">Recommendations</h4>
          <div class="space-y-2">
            <div
              class="flex items-start space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <div
                class="w-5 h-5 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <div class="w-2 h-2 bg-yellow-600 dark:bg-yellow-400 rounded-full"></div>
              </div>
              <div>
                <h5 class="font-medium text-yellow-800 dark:text-yellow-200">Optimize Database Queries</h5>
                <p class="text-sm text-yellow-700 dark:text-yellow-300">Consider adding indexes to frequently queried
                  columns</p>
              </div>
            </div>
            <div
              class="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div
                class="w-5 h-5 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <div class="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
              </div>
              <div>
                <h5 class="font-medium text-blue-800 dark:text-blue-200">Enable Caching</h5>
                <p class="text-sm text-blue-700 dark:text-blue-300">Implement Redis caching for frequently accessed
                  data</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h4 class="font-semibold text-gray-900 dark:text-white mb-3">Quick Actions</h4>
          <div class="flex flex-wrap gap-2">
            <button
              class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-md text-sm hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
              View Detailed Report
            </button>
            <button
              class="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-md text-sm hover:bg-green-200 dark:hover:bg-green-800 transition-colors">
              Schedule Optimization
            </button>
            <button
              class="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-md text-sm hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors">
              Export Data
            </button>
          </div>
        </div>
      </div>

      <AlertDialogFooter>
        <AlertDialogCancel (cancelClick)="complexDialog.set(false)">
          Close Report
        </AlertDialogCancel>
        <AlertDialogAction (actionClick)="handleOptimizeSystem()">
          Apply Optimizations
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialog>
  `,
  styles: []
})
export class AlertDialogDemoComponent implements OnInit {
  private seoService = inject(SEOService);

  ngOnInit() {
    // Update SEO for alert-dialog component page
    this.seoService.updateSEO(this.seoService.getComponentSEO('alert-dialog'));
    this.seoService.addComponentStructuredData('alert-dialog');
  }

  // Dialog state signals
  basicDialog = signal(false);
  warningDialog = signal(false);
  customDialog = signal(false);
  successDialog = signal(false);
  noOverlayDialog = signal(false);
  complexDialog = signal(false);


  // Action handlers
  handleDeleteAccount(): void {
    console.log('Account deletion confirmed');
    this.basicDialog.set(false);
    // Simulate account deletion
    setTimeout(() => {
      alert('Account deleted successfully (demo)');
    }, 500);
  }

  handleLeaveWithoutSaving(): void {
    console.log('Leaving without saving');
    this.warningDialog.set(false);
    // Simulate navigation
    setTimeout(() => {
      alert('Navigated away without saving (demo)');
    }, 500);
  }

  handleUpgradeToPremium(): void {
    console.log('Upgrading to premium');
    this.customDialog.set(false);
    // Simulate upgrade process
    setTimeout(() => {
      alert('Premium upgrade initiated (demo)');
    }, 500);
  }

  handleCriticalUpdate(): void {
    console.log('Installing critical update');
    this.noOverlayDialog.set(false);
    // Simulate update process
    setTimeout(() => {
      alert('Critical update installed (demo)');
    }, 2000);
  }

  handleOptimizeSystem(): void {
    console.log('Optimizing system');
    this.complexDialog.set(false);
    // Simulate optimization
    setTimeout(() => {
      alert('System optimization completed (demo)');
    }, 1500);
  }
}
