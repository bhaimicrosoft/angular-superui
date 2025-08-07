import { Component, signal, computed, ChangeDetectionStrategy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Popover } from '@lib/components/popover';

interface Example {
  title: string;
  description: string;
  code: string;
}

/**
 * Popover Demo Component
 * Showcases various Popover configurations and use cases
 */
@Component({
  selector: 'popover-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, Popover],
  template: `
    <div class="w-full max-w-6xl mx-auto p-6">
      <!-- Enhanced Hero Section -->
      <div class="relative text-center mb-16 py-12">
        <!-- Background decoration -->
        <div class="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-purple-950/20 rounded-3xl -z-10"></div>
        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-gray-900/40 rounded-3xl -z-10"></div>

        <!-- Floating decorative elements -->
        <div class="absolute top-4 left-8 w-20 h-20 bg-gradient-to-br from-blue-200 to-indigo-300 dark:from-blue-800 dark:to-indigo-700 rounded-full opacity-20 animate-pulse"></div>
        <div class="absolute bottom-8 right-12 w-16 h-16 bg-gradient-to-br from-purple-200 to-pink-300 dark:from-purple-800 dark:to-pink-700 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div class="absolute top-12 right-20 w-12 h-12 bg-gradient-to-br from-indigo-200 to-blue-300 dark:from-indigo-800 dark:to-blue-700 rounded-full opacity-20 animate-pulse delay-500"></div>

        <!-- Main content -->
        <div class="relative z-10">
          <div class="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-full shadow-lg">
            <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span class="text-sm font-medium text-gray-600 dark:text-gray-300">Live Demo Available</span>
          </div>

          <h1 class="text-5xl md:text-6xl font-bold mb-6">
            <span class="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent leading-tight">
              Popover
            </span>
            <br>
            <span class="text-3xl md:text-4xl font-semibold text-gray-700 dark:text-gray-300">
              Component
            </span>
          </h1>

          <p class="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            A versatile floating content container with
            <span class="font-semibold text-blue-600 dark:text-blue-400">intelligent positioning</span>,
            <span class="font-semibold text-purple-600 dark:text-purple-400">accessibility features</span>, and
            <span class="font-semibold text-indigo-600 dark:text-indigo-400">beautiful animations</span>.
          </p>

          <!-- Feature badges -->
          <div class="flex flex-wrap justify-center gap-3 mb-8">
            <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium border border-blue-200 dark:border-blue-700">
              ⚡ CDK Portal
            </span>
            <span class="px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium border border-purple-200 dark:border-purple-700">
              🎯 Smart Positioning
            </span>
            <span class="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium border border-indigo-200 dark:border-indigo-700">
              ♿ Accessible
            </span>
            <span class="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-medium border border-emerald-200 dark:border-emerald-700">
              ✨ Animated
            </span>
          </div>

          <!-- Static content instead of interactive demo -->
          <div class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/25">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
            Enterprise Popover Component
          </div>
        </div>
      </div>

      <!-- Basic Example -->
      <div class="mb-12">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Basic Usage</h2>
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <div class="flex flex-wrap items-center gap-4 mb-6">
            <button
              #basicTrigger
              (click)="basicOpen.set(!basicOpen())"
              class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {{ basicOpen() ? 'Close' : 'Open' }} Popover
            </button>
          </div>

          <Popover
            [isOpen]="basicOpen()"
            [triggerElement]="basicTrigger"
            (openChange)="basicOpen.set($event)"
            align="center"
          >
            <div class="space-y-2">
              <h3 class="font-semibold text-gray-900 dark:text-gray-100">Welcome!</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                This is a basic popover with default settings. It automatically positions itself to stay within the viewport.
              </p>
            </div>
          </Popover>
        </div>
      </div>

      <!-- Positioning Examples -->
      <div class="mb-12">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Intelligent Positioning</h2>
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-8">
          <p class="text-gray-600 dark:text-gray-400 mb-6 text-center">
            Try these buttons near the edges of the screen to see intelligent collision detection in action.
          </p>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">

            <!-- Top positioning -->
            <div class="text-center">
              <button
                #topTrigger
                (click)="topOpen.set(!topOpen())"
                class="px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors w-full shadow-md hover:shadow-lg"
              >
                Top Placement
              </button>
              <Popover
                [isOpen]="topOpen()"
                [triggerElement]="topTrigger"
                (openChange)="topOpen.set($event)"
                side="top"
                align="center"
                [avoidCollisions]="true"
              >
                <div class="text-center">
                  <p class="font-semibold text-gray-900 dark:text-gray-100 mb-2">Top Popover</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    Automatically flips to bottom if there's no space above.
                  </p>
                </div>
              </Popover>
            </div>

            <!-- Right positioning -->
            <div class="text-center">
              <button
                #rightTrigger
                (click)="rightOpen.set(!rightOpen())"
                class="px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors w-full shadow-md hover:shadow-lg"
              >
                Right Placement
              </button>
              <Popover
                [isOpen]="rightOpen()"
                [triggerElement]="rightTrigger"
                (openChange)="rightOpen.set($event)"
                side="right"
                align="center"
                [avoidCollisions]="true"
              >
                <div class="text-center">
                  <p class="font-semibold text-gray-900 dark:text-gray-100 mb-2">Right Popover</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    Automatically flips to left near screen edges.
                  </p>
                </div>
              </Popover>
            </div>

            <!-- Bottom positioning -->
            <div class="text-center">
              <button
                #bottomTrigger
                (click)="bottomOpen.set(!bottomOpen())"
                class="px-4 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors w-full shadow-md hover:shadow-lg"
              >
                Bottom Placement
              </button>
              <Popover
                [isOpen]="bottomOpen()"
                [triggerElement]="bottomTrigger"
                (openChange)="bottomOpen.set($event)"
                side="bottom"
                align="center"
                [avoidCollisions]="true"
              >
                <div class="text-center">
                  <p class="font-semibold text-gray-900 dark:text-gray-100 mb-2">Bottom Popover</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    Automatically flips to top if there's no space below.
                  </p>
                </div>
              </Popover>
            </div>

            <!-- Left positioning -->
            <div class="text-center">
              <button
                #leftTrigger
                (click)="leftOpen.set(!leftOpen())"
                class="px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors w-full shadow-md hover:shadow-lg"
              >
                Left Placement
              </button>
              <Popover
                [isOpen]="leftOpen()"
                [triggerElement]="leftTrigger"
                (openChange)="leftOpen.set($event)"
                side="left"
                align="center"
                [avoidCollisions]="true"
              >
                <div class="text-center">
                  <p class="font-semibold text-gray-900 dark:text-gray-100 mb-2">Left Popover</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    Automatically flips to right near screen edges.
                  </p>
                </div>
              </Popover>
            </div>
          </div>

          <!-- Edge case testing buttons -->
          <div class="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 text-center">
              Edge Case Testing
            </h3>
            <div class="flex justify-between items-center">
              <!-- Top-left corner -->
              <button
                #topLeftTrigger
                (click)="topLeftOpen.set(!topLeftOpen())"
                class="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded font-medium text-sm"
              >
                Top Left
              </button>
              <Popover
                [isOpen]="topLeftOpen()"
                [triggerElement]="topLeftTrigger"
                (openChange)="topLeftOpen.set($event)"
                side="bottom"
                align="start"
                [avoidCollisions]="true"
              >
                <div>
                  <p class="font-medium mb-2">Corner Test</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    Handles corner positioning gracefully.
                  </p>
                </div>
              </Popover>

              <!-- Top-right corner -->
              <button
                #topRightTrigger
                (click)="topRightOpen.set(!topRightOpen())"
                class="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded font-medium text-sm"
              >
                Top Right
              </button>
              <Popover
                [isOpen]="topRightOpen()"
                [triggerElement]="topRightTrigger"
                (openChange)="topRightOpen.set($event)"
                side="bottom"
                align="end"
                [avoidCollisions]="true"
              >
                <div>
                  <p class="font-medium mb-2">Corner Test</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    Adjusts alignment when near edges.
                  </p>
                </div>
              </Popover>
            </div>
          </div>
        </div>
      </div>

      <!-- Variants -->
      <div class="mb-12">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Color Variants</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-6">Choose from different color schemes for various contexts and use cases.</p>
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">

            <!-- Default variant -->
            <div class="text-center">
              <button
                #defaultTrigger
                (click)="defaultOpen.set(!defaultOpen())"
                class="w-full px-4 py-3 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white rounded-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                Default
              </button>
              <Popover
                [isOpen]="defaultOpen()"
                [triggerElement]="defaultTrigger"
                (openChange)="defaultOpen.set($event)"
                variant="default"
                size="default"
                align="center"
              >
                <div class="text-center">
                  <div class="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <svg class="w-4 h-4 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <h3 class="font-semibold mb-2">Default Popover</h3>
                  <p class="text-sm opacity-80">Standard styling with neutral colors perfect for general content.</p>
                </div>
              </Popover>
            </div>

            <!-- Success variant -->
            <div class="text-center">
              <button
                #successTrigger
                (click)="successOpen.set(!successOpen())"
                class="w-full px-4 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                Success
              </button>
              <Popover
                [isOpen]="successOpen()"
                [triggerElement]="successTrigger"
                (openChange)="successOpen.set($event)"
                variant="success"
                size="default"
                align="center"
              >
                <div class="text-center">
                  <div class="w-8 h-8 bg-emerald-100 dark:bg-emerald-800 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <svg class="w-4 h-4 text-emerald-600 dark:text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <h3 class="font-semibold mb-2">Success!</h3>
                  <p class="text-sm opacity-80">Operation completed successfully! Your changes have been saved.</p>
                </div>
              </Popover>
            </div>

            <!-- Warning variant -->
            <div class="text-center">
              <button
                #warningTrigger
                (click)="warningOpen.set(!warningOpen())"
                class="w-full px-4 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                Warning
              </button>
              <Popover
                [isOpen]="warningOpen()"
                [triggerElement]="warningTrigger"
                (openChange)="warningOpen.set($event)"
                variant="warning"
                size="default"
                align="center"
              >
                <div class="text-center">
                  <div class="w-8 h-8 bg-amber-100 dark:bg-amber-800 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <svg class="w-4 h-4 text-amber-600 dark:text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                    </svg>
                  </div>
                  <h3 class="font-semibold mb-2">Warning</h3>
                  <p class="text-sm opacity-80">Please review your changes before proceeding with this action.</p>
                </div>
              </Popover>
            </div>

            <!-- Error variant -->
            <div class="text-center">
              <button
                #errorTrigger
                (click)="errorOpen.set(!errorOpen())"
                class="w-full px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                Error
              </button>
              <Popover
                [isOpen]="errorOpen()"
                [triggerElement]="errorTrigger"
                (openChange)="errorOpen.set($event)"
                variant="error"
                size="default"
                align="center"
              >
                <div class="text-center">
                  <div class="w-8 h-8 bg-red-100 dark:bg-red-800 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <svg class="w-4 h-4 text-red-600 dark:text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </div>
                  <h3 class="font-semibold mb-2">Error</h3>
                  <p class="text-sm opacity-80">Something went wrong. Please try again or contact support.</p>
                </div>
              </Popover>
            </div>

            <!-- Info variant -->
            <div class="text-center">
              <button
                #infoTrigger
                (click)="infoOpen.set(!infoOpen())"
                class="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                Info
              </button>
              <Popover
                [isOpen]="infoOpen()"
                [triggerElement]="infoTrigger"
                (openChange)="infoOpen.set($event)"
                variant="info"
                size="default"
                align="center"
              >
                <div class="text-center">
                  <div class="w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <svg class="w-4 h-4 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <h3 class="font-semibold mb-2">Information</h3>
                  <p class="text-sm opacity-80">Here's some helpful information about this feature and how to use it.</p>
                </div>
              </Popover>
            </div>
          </div>

          <!-- Variant showcase note -->
          <div class="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-lg border border-blue-200 dark:border-blue-700">
            <div class="flex items-start gap-3">
              <div class="flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center mt-0.5">
                <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div>
                <h4 class="font-medium text-blue-900 dark:text-blue-100 mb-1">Enhanced Styling</h4>
                <p class="text-sm text-blue-700 dark:text-blue-300">All variants now feature improved contrast, backdrop blur effects, and better visibility in both light and dark modes.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sizes -->
      <div class="mb-12">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Sizes</h2>
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <div class="flex flex-wrap gap-4 mb-6">

            <!-- Small size -->
            <button
              #smallTrigger
              (click)="smallOpen.set(!smallOpen())"
              class="px-3 py-1.5 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded font-medium transition-colors"
            >
              Small
            </button>
            <Popover
              [isOpen]="smallOpen()"
              [triggerElement]="smallTrigger"
              (openChange)="smallOpen.set($event)"
              size="sm"
            >
              <div>
                <h4 class="font-medium mb-1">Small Popover</h4>
                <p class="text-xs">Compact size for brief messages.</p>
              </div>
            </Popover>

            <!-- Default size -->
            <button
              #defaultSizeTrigger
              (click)="defaultSizeOpen.set(!defaultSizeOpen())"
              class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
            >
              Default
            </button>
            <Popover
              [isOpen]="defaultSizeOpen()"
              [triggerElement]="defaultSizeTrigger"
              (openChange)="defaultSizeOpen.set($event)"
              size="default"
            >
              <div>
                <h4 class="font-medium mb-2">Default Size</h4>
                <p class="text-sm">Standard size for most use cases with balanced content space.</p>
              </div>
            </Popover>

            <!-- Large size -->
            <button
              #largeTrigger
              (click)="largeOpen.set(!largeOpen())"
              class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
            >
              Large
            </button>
            <Popover
              [isOpen]="largeOpen()"
              [triggerElement]="largeTrigger"
              (openChange)="largeOpen.set($event)"
              size="lg"
            >
              <div>
                <h4 class="font-medium mb-3">Large Popover</h4>
                <p class="text-sm mb-2">Larger size for more detailed content and complex layouts.</p>
                <p class="text-xs text-gray-600 dark:text-gray-400">Perfect for forms, detailed information, or rich content.</p>
              </div>
            </Popover>

            <!-- XL size -->
            <button
              #xlTrigger
              (click)="xlOpen.set(!xlOpen())"
              class="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
            >
              Extra Large
            </button>
            <Popover
              [isOpen]="xlOpen()"
              [triggerElement]="xlTrigger"
              (openChange)="xlOpen.set($event)"
              size="xl"
            >
              <div>
                <h4 class="font-medium mb-3">Extra Large Popover</h4>
                <p class="text-sm mb-3">Maximum size for extensive content, forms, or complex interfaces.</p>
                <div class="space-y-2">
                  <div class="flex items-center gap-2">
                    <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span class="text-xs">Feature one</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span class="text-xs">Feature two</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span class="text-xs">Feature three</span>
                  </div>
                </div>
              </div>
            </Popover>
          </div>
        </div>
      </div>

      <!-- Advanced Features -->
      <div class="mb-12">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Advanced Features</h2>
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

            <!-- With close button -->
            <div class="text-center">
              <button
                #closeButtonTrigger
                (click)="closeButtonOpen.set(!closeButtonOpen())"
                class="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium transition-colors w-full"
              >
                With Close Button
              </button>
              <Popover
                [isOpen]="closeButtonOpen()"
                [triggerElement]="closeButtonTrigger"
                (openChange)="closeButtonOpen.set($event)"
                [showCloseButton]="true"
              >
                <div>
                  <h4 class="font-medium mb-2">Dismissible Popover</h4>
                  <p class="text-sm">This popover has a close button in the top-right corner.</p>
                </div>
              </Popover>
            </div>

            <!-- Modal popover -->
            <div class="text-center">
              <button
                #modalTrigger
                (click)="modalOpen.set(!modalOpen())"
                class="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium transition-colors w-full"
              >
                Modal Style
              </button>
              <Popover
                [isOpen]="modalOpen()"
                [triggerElement]="modalTrigger"
                (openChange)="modalOpen.set($event)"
                [modal]="true"
                [showBackdrop]="true"
              >
                <div>
                  <h4 class="font-medium mb-2">Modal Popover</h4>
                  <p class="text-sm mb-3">This popover behaves like a modal with backdrop.</p>
                  <button
                    (click)="modalOpen.set(false)"
                    class="px-3 py-1 bg-violet-600 hover:bg-violet-700 text-white rounded text-xs font-medium transition-colors"
                  >
                    Close
                  </button>
                </div>
              </Popover>
            </div>
          </div>
        </div>
      </div>

      <!-- Interactive Example -->
      <div class="mb-12">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Interactive Example</h2>
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <div class="flex flex-wrap items-center gap-4 mb-6">
            <button
              #interactiveTrigger
              (click)="interactiveOpen.set(!interactiveOpen())"
              class="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all transform hover:scale-105"
            >
              User Profile
            </button>
          </div>

          <Popover
            [isOpen]="interactiveOpen()"
            [triggerElement]="interactiveTrigger"
            (openChange)="interactiveOpen.set($event)"
            size="lg"
          >
            <div class="space-y-4">
              <!-- User header -->
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                  JD
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-gray-100">John Doe</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">john.doe&#64;example.com</p>
                </div>
              </div>

              <!-- Stats -->
              <div class="grid grid-cols-3 gap-3 py-3 border-t border-b border-gray-200 dark:border-gray-600">
                <div class="text-center">
                  <div class="font-semibold text-blue-600 dark:text-blue-400">142</div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">Posts</div>
                </div>
                <div class="text-center">
                  <div class="font-semibold text-green-600 dark:text-green-400">1.2K</div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">Followers</div>
                </div>
                <div class="text-center">
                  <div class="font-semibold text-purple-600 dark:text-purple-400">532</div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">Following</div>
                </div>
              </div>

              <!-- Actions -->
              <div class="space-y-2">
                <button class="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                  View Profile
                </button>
                <button class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition-colors">
                  Send Message
                </button>
              </div>
            </div>
          </Popover>
        </div>
      </div>

      <!-- Form Example -->
      <div class="mb-12">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Form in Popover</h2>
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <div class="flex flex-wrap items-center gap-4 mb-6">
            <button
              #formTrigger
              (click)="formOpen.set(!formOpen())"
              class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
            >
              Quick Contact
            </button>
          </div>

          <Popover
            [isOpen]="formOpen()"
            [triggerElement]="formTrigger"
            (openChange)="formOpen.set($event)"
            size="lg"
            [showCloseButton]="true"
          >
            <form (ngSubmit)="handleFormSubmit()" class="space-y-4">
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-gray-100 mb-3">Send us a message</h4>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  [ngModel]="formName()"
                  (ngModelChange)="formName.set($event)"
                  name="name"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  placeholder="Your name"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  [ngModel]="formEmail()"
                  (ngModelChange)="formEmail.set($event)"
                  name="email"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  placeholder="your&#64;email.com"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Message
                </label>
                <textarea
                  [ngModel]="formMessage()"
                  (ngModelChange)="formMessage.set($event)"
                  name="message"
                  rows="3"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none"
                  placeholder="Your message..."
                ></textarea>
              </div>

              <div class="flex gap-2 pt-2">
                <button
                  type="submit"
                  class="flex-1 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Send
                </button>
                <button
                  type="button"
                  (click)="formOpen.set(false)"
                  class="px-3 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </Popover>
        </div>
      </div>

      <!-- Documentation Link -->
      <div class="mt-12 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl border border-blue-200 dark:border-blue-800">
        <div class="flex items-start gap-4">
          <div class="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
            <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
            </svg>
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
              Complete Documentation
            </h3>
            <p class="text-blue-700 dark:text-blue-300 mb-4">
              Explore the full documentation for detailed API reference, advanced examples, accessibility guidelines, and best practices.
            </p>
            <a
              href="https://github.com/bhaimicrosoft/angular-superui/tree/main/docs/components/popover.md"
              target="_blank"
              class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
              View Documentation
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }

    /* Custom scrollbar for form */
    textarea::-webkit-scrollbar {
      width: 4px;
    }

    textarea::-webkit-scrollbar-track {
      background: transparent;
    }

    textarea::-webkit-scrollbar-thumb {
      background: #d1d5db;
      border-radius: 2px;
    }

    textarea::-webkit-scrollbar-thumb:hover {
      background: #9ca3af;
    }

    /* Dark mode scrollbar */
    .dark textarea::-webkit-scrollbar-thumb {
      background: #4b5563;
    }

    .dark textarea::-webkit-scrollbar-thumb:hover {
      background: #6b7280;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopoverDemoComponent {
  // Basic example state
  readonly basicOpen = signal(false);

  // Positioning examples state
  readonly topOpen = signal(false);
  readonly rightOpen = signal(false);
  readonly bottomOpen = signal(false);
  readonly leftOpen = signal(false);
  readonly topLeftOpen = signal(false);
  readonly topRightOpen = signal(false);

  // Variant examples state
  readonly defaultOpen = signal(false);
  readonly successOpen = signal(false);
  readonly warningOpen = signal(false);
  readonly errorOpen = signal(false);
  readonly infoOpen = signal(false);

  // Size examples state
  readonly smallOpen = signal(false);
  readonly defaultSizeOpen = signal(false);
  readonly largeOpen = signal(false);
  readonly xlOpen = signal(false);

  // Advanced features state
  readonly closeButtonOpen = signal(false);
  readonly modalOpen = signal(false);

  // Interactive examples state
  readonly interactiveOpen = signal(false);
  readonly formOpen = signal(false);

  // Form data signals
  readonly formName = signal('');
  readonly formEmail = signal('');
  readonly formMessage = signal('');

  // Form data getter for compatibility
  readonly formData = computed(() => ({
    name: this.formName(),
    email: this.formEmail(),
    message: this.formMessage()
  }));

  // Examples for documentation
  readonly examples = computed<Example[]>(() => [
    {
      title: 'Basic Usage',
      description: 'Simple popover with default settings',
      code: `<button
  #trigger
  (click)="isOpen.set(!isOpen())"
>
  Toggle Popover
</button>

<Popover
  [isOpen]="isOpen()"
  [triggerElement]="trigger"
  (openChange)="isOpen.set($event)"
>
  <div>
    <h3>Welcome!</h3>
    <p>This is a basic popover.</p>
  </div>
</Popover>`
    },
    {
      title: 'Different Positions',
      description: 'Popover positioned on different sides',
      code: `<Popover
  [isOpen]="isOpen()"
  [triggerElement]="trigger"
  side="top"
  align="center"
>
  <div>Top positioned popover</div>
</Popover>`
    },
    {
      title: 'Variants and Sizes',
      description: 'Different visual styles and sizes',
      code: `<Popover
  [isOpen]="isOpen()"
  [triggerElement]="trigger"
  variant="success"
  size="lg"
>
  <div>Large success popover</div>
</Popover>`
    },
    {
      title: 'Advanced Features',
      description: 'Modal behavior with backdrop',
      code: `<Popover
  [isOpen]="isOpen()"
  [triggerElement]="trigger"
  [modal]="true"
  [showBackdrop]="true"
  [showCloseButton]="true"
>
  <div>Modal popover with backdrop</div>
</Popover>`
    }
  ]);

  handleFormSubmit(): void {
    console.log('Form submitted:', this.formData());
    // Reset form
    this.formName.set('');
    this.formEmail.set('');
    this.formMessage.set('');
    this.formOpen.set(false);
  }
}
