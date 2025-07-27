import {
  ChangeDetectionStrategy,
  Component,
  computed,
  EventEmitter,
  Input,
  Output,
  signal,
  TemplateRef,
  ViewChild,
  WritableSignal,
  effect,
  OnDestroy,
  ContentChildren,
  QueryList,
  AfterContentInit,
  Directive,
  HostBinding,
  inject,
  ElementRef,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../utils/cn';

// Step interface for configuration
export interface StepConfig {
  /** Unique identifier for the step */
  id: string;
  /** Display label for the step */
  label: string;
  /** Optional description for the step */
  description?: string;
  /** Whether this step is optional */
  optional?: boolean;
  /** Whether this step can be skipped */
  skippable?: boolean;
  /** Custom icon for the step */
  icon?: string;
  /** Whether this step is disabled */
  disabled?: boolean;
  /** Validation function for the step */
  validator?: () => boolean | Promise<boolean>;
}

// Step status enumeration
export type StepStatus = 'upcoming' | 'current' | 'completed' | 'error' | 'skipped';

// Validation status enumeration
export type ValidationStatus = 'idle' | 'pending' | 'valid' | 'invalid';

// Stepper orientation
export type StepperOrientation = 'horizontal' | 'vertical';

// Stepper variant
export type StepperVariant = 'default' | 'minimal' | 'filled' | 'outlined';

// Step size
export type StepperSize = 'sm' | 'default' | 'lg';

// Step directive for content projection
@Directive({
  selector: '[stepContent]',
  standalone: true
})
export class StepContent {
  @Input() stepId!: string;

  constructor(public templateRef: TemplateRef<any>) {}
}

// Individual step component
@Component({
  selector: 'Step',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-content></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Step {
  @Input() id!: string;
  @Input() label!: string;
  @Input() description?: string;
  @Input() optional = false;
  @Input() skippable = false;
  @Input() icon?: string;
  @Input() disabled = false;
  @Input() validator?: () => boolean | Promise<boolean>;

  // Internal status managed by stepper
  status: WritableSignal<StepStatus> = signal('upcoming');

  getStepConfig(): StepConfig {
    return {
      id: this.id,
      label: this.label,
      description: this.description,
      optional: this.optional,
      skippable: this.skippable,
      icon: this.icon,
      disabled: this.disabled,
      validator: this.validator
    };
  }
}

// Main stepper component
@Component({
  selector: 'Stepper',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      [class]="getStepperClasses()"
      [attr.aria-label]="ariaLabel"
      role="tablist"
      [attr.aria-orientation]="orientation"
      (keydown)="handleStepperKeyDown($event)">

      <!-- Progress bar (for horizontal stepper) -->
      <div
        *ngIf="showProgress && orientation === 'horizontal'"
        [class]="getProgressBarClasses()">
        <div
          [class]="getProgressFillClasses()"
          [style.width.%]="progressPercentage()">
        </div>
      </div>

      <!-- Steps container -->
      <div [class]="getStepsContainerClasses()">
        <div
          *ngFor="let step of steps; let i = index; trackBy: trackByStepId"
          [class]="getStepClasses(step, i)"
          [attr.data-step-id]="step.id"
          [attr.data-step-status]="stepStatuses()[step.id]"
          [attr.data-step-index]="i">

          <!-- Step connector (line between steps) -->
          <div
            *ngIf="i < steps.length - 1"
            [class]="getConnectorClasses(step, i)">
          </div>

          <!-- Step header (icon + label) -->
          <div
            #stepHeader
            [class]="getStepHeaderClasses(step, i)"
            [attr.tabindex]="getStepTabIndex(step, i)"
            [attr.role]="'tab'"
            [attr.aria-selected]="currentStepIndex() === i"
            [attr.aria-disabled]="step.disabled"
            [attr.aria-current]="currentStepIndex() === i ? 'step' : null"
            [attr.aria-describedby]="'step-description-' + step.id"
            [attr.aria-controls]="'step-content-' + step.id"
            [attr.aria-expanded]="currentStepIndex() === i"
            [attr.id]="'step-header-' + step.id"
            (click)="navigateToStep(i)"
            (keydown)="handleStepKeyDown($event, i)"
            (touchstart)="handleStepTouchStart($event, i)"
            (touchend)="handleStepTouchEnd($event, i)">

            <!-- Step indicator (number/icon/status) -->
            <div [class]="getStepIndicatorClasses(step, i)" 
                 [attr.aria-hidden]="true">
              <!-- Custom icon -->
              <span
                *ngIf="step.icon && !isStepCompleted(step.id)"
                [class]="getStepIconClasses(step, i)"
                [innerHTML]="step.icon"
                [attr.aria-hidden]="true">
              </span>

              <!-- Completed checkmark -->
              <svg
                *ngIf="isStepCompleted(step.id) && !step.icon"
                [class]="getCheckmarkClasses(step, i)"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                [attr.aria-hidden]="true"
                role="img"
                [attr.aria-label]="'Step completed'">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>

              <!-- Error icon -->
              <svg
                *ngIf="stepStatuses()[step.id] === 'error'"
                [class]="getErrorIconClasses(step, i)"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                [attr.aria-hidden]="true"
                role="img"
                [attr.aria-label]="'Step has error'">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>

              <!-- Step number -->
              <span
                *ngIf="!step.icon && !isStepCompleted(step.id) && stepStatuses()[step.id] !== 'error'"
                [class]="getStepNumberClasses(step, i)"
                [attr.aria-hidden]="true">
                {{ i + 1 }}
              </span>
            </div>

            <!-- Step label and description -->
            <div [class]="getStepLabelContainerClasses()">
              <div [class]="getStepLabelClasses(step, i)">
                {{ step.label }}
                <span
                  *ngIf="step.optional"
                  [class]="getOptionalLabelClasses()"
                  [attr.aria-label]="'Optional step'">
                  (Optional)
                </span>
              </div>
              <div
                *ngIf="step.description"
                [class]="getStepDescriptionClasses(step, i)"
                [id]="'step-description-' + step.id">
                {{ step.description }}
              </div>
            </div>
          </div>

          <!-- Step content -->
          <div
            *ngIf="orientation === 'vertical' && currentStepIndex() === i"
            [class]="getStepContentClasses()"
            role="tabpanel"
            [attr.aria-labelledby]="'step-header-' + step.id"
            [attr.id]="'step-content-' + step.id"
            [attr.aria-live]="'polite'"
            (keydown)="handleContentKeyDown($event, i)">
            <div *ngIf="contentTemplates.get(step.id); else defaultVerticalContent">
              <ng-container
                *ngTemplateOutlet="contentTemplates.get(step.id)">
              </ng-container>
            </div>
            <ng-template #defaultVerticalContent>
              <div class="default-step-content">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  {{ step.label }}
                </h3>
                <p class="text-gray-600 dark:text-gray-300">
                  {{ step.description || 'Step ' + (i + 1) + ' content' }}
                </p>
              </div>
            </ng-template>
          </div>
        </div>
      </div>

      <!-- Horizontal step content -->
      <div
        *ngIf="orientation === 'horizontal'"
        [class]="getHorizontalContentClasses()"
        role="tabpanel"
        [attr.aria-labelledby]="'step-header-' + getCurrentStep()?.id"
        [attr.id]="'step-content-' + getCurrentStep()?.id"
        [attr.aria-live]="'polite'"
        (keydown)="handleContentKeyDown($event, currentStepIndex())">
        <div *ngIf="getCurrentStepTemplate(); else defaultHorizontalContent">
          <ng-container
            *ngTemplateOutlet="getCurrentStepTemplate()">
          </ng-container>
        </div>
        <ng-template #defaultHorizontalContent>
          <div class="default-step-content">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {{ getCurrentStep()?.label }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              {{ getCurrentStep()?.description || 'Step ' + (currentStepIndex() + 1) + ' content' }}
            </p>
          </div>
        </ng-template>
      </div>

      <!-- Navigation buttons -->
      <div
        *ngIf="showNavigation"
        [class]="getNavigationClasses()">
        <button
          type="button"
          [class]="getBackButtonClasses()"
          [disabled]="!canGoBack()"
          (click)="goBack()"
          [attr.aria-label]="'Go to previous step'">
          <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          {{ backLabel }}
        </button>

        <div class="flex gap-2">
          <button
            *ngIf="getCurrentStep()?.skippable"
            type="button"
            [class]="getSkipButtonClasses()"
            (click)="skipStep()"
            [attr.aria-label]="'Skip current step'">
            {{ skipLabel }}
          </button>

          <button
            type="button"
            [class]="getNextButtonClasses()"
            [disabled]="!canGoNext() || validationStatus() === 'pending'"
            (click)="goNext()"
            [attr.aria-label]="isLastStep() ? 'Complete' : 'Go to next step'">
            <span *ngIf="validationStatus() === 'pending'" class="inline-flex items-center">
              <svg class="w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Validating...
            </span>
            <span *ngIf="validationStatus() !== 'pending'" class="inline-flex items-center">
              {{ isLastStep() ? completeLabel : nextLabel }}
              <svg *ngIf="!isLastStep()" class="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </button>
        </div>
      </div>

      <!-- Screen reader announcements -->
      <div
        id="stepper-live-region"
        aria-live="polite"
        aria-atomic="true"
        class="sr-only">
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }

    .stepper {
      position: relative;
    }

    .stepper-horizontal {
      display: flex;
      flex-direction: column;
    }

    .stepper-vertical {
      display: flex;
      flex-direction: column;
    }

    .progress-bar {
      position: relative;
      height: 2px;
      background: rgb(229 231 235);
      border-radius: 1px;
      margin-bottom: 2rem;
      overflow: hidden;
    }

    .dark .progress-bar {
      background: rgb(75 85 99);
    }

    .progress-fill {
      height: 100%;
      background: rgb(59 130 246);
      border-radius: inherit;
      transition: width 0.3s ease;
    }

    .dark .progress-fill {
      background: rgb(96 165 250);
    }

    .steps-container-horizontal {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      position: relative;
      margin-bottom: 2rem;
      width: 100%;
    }

    .steps-container-vertical {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .step {
      position: relative;
      display: flex;
      align-items: flex-start;
    }

    .step-horizontal {
      flex-direction: column;
      text-align: center;
      align-items: center;
      flex: 1;
      position: relative;
    }

    .step-horizontal:not(:last-child)::after {
      content: '';
      position: absolute;
      top: 1.5rem; /* Adjusted for visual centering with step indicators */
      left: calc(50% + 1rem); /* Start from right edge of indicator */
      width: calc(100% - 2rem); /* Connect to next step */
      height: 2px;
      background: rgb(229 231 235);
      transform: translateY(-50%);
      z-index: 0;
    }

    .dark .step-horizontal:not(:last-child)::after {
      background: rgb(55 65 81);
    }

    /* Completed connector */
    .step-horizontal[data-step-status="completed"]:not(:last-child)::after {
      background: rgb(34 197 94);
    }

    .dark .step-horizontal[data-step-status="completed"]:not(:last-child)::after {
      background: rgb(74 222 128);
    }

    /* Size-specific positioning */
    .stepper-sm .step-horizontal:not(:last-child)::after {
      top: 1.125rem; /* Adjusted for visual centering with small indicators */
      left: calc(50% + 0.75rem);
      width: calc(100% - 1.5rem);
    }

    .stepper-lg .step-horizontal:not(:last-child)::after {
      top: 1.875rem; /* Adjusted for visual centering with large indicators */
      left: calc(50% + 1.25rem);
      width: calc(100% - 2.5rem);
    }

    .step-vertical {
      flex-direction: row;
      text-align: left;
    }

    .step-connector {
      position: absolute;
      background: rgb(229 231 235);
      transition: background-color 0.3s ease;
      z-index: 0;
      display: none; /* Hide div connectors, using CSS pseudo-elements instead */
    }

    .dark .step-connector {
      background: rgb(55 65 81);
    }

    /* Keep vertical connectors using div approach */
    .step-connector-vertical {
      display: block;
      width: 2px;
      left: 1.5rem;
      top: 3rem;
      height: calc(100% + 1rem);
      transform: translateX(-50%);
    }

    /* Size-specific vertical connector positioning */
    .stepper-sm .step-connector-vertical {
      left: 0.75rem;
      top: 2.5rem;
    }

    .stepper-lg .step-connector-vertical {
      left: 1.25rem;
      top: 3.5rem;
    }

    .step-connector-completed {
      background: rgb(34 197 94);
    }

    .dark .step-connector-completed {
      background: rgb(74 222 128);
    }

    .step-header {
      display: flex;
      align-items: center;
      cursor: pointer;
      border-radius: 0.5rem;
      padding: 0.5rem;
      transition: all 0.2s ease;
      outline: none;
    }

    .step-header:hover {
      background: rgb(249 250 251);
    }

    .dark .step-header:hover {
      background: rgb(31 41 55);
    }

    .step-header:focus-visible {
      outline: 2px solid rgb(59 130 246);
      outline-offset: 2px;
    }

    .step-header-horizontal {
      flex-direction: column;
      gap: 0.5rem;
      align-items: center;
    }

    .step-header-vertical {
      flex-direction: row;
      gap: 0.75rem;
    }

    .step-indicator {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      border: 2px solid;
      transition: all 0.3s ease;
      flex-shrink: 0;
      position: relative;
      z-index: 1;
    }

    .step-indicator span,
    .step-indicator svg {
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
    }

    .step-indicator-sm {
      width: 1.5rem;
      height: 1.5rem;
      font-size: 0.75rem;
    }

    .step-indicator-default {
      width: 2rem;
      height: 2rem;
      font-size: 0.875rem;
    }

    .step-indicator-lg {
      width: 2.5rem;
      height: 2.5rem;
      font-size: 1rem;
    }

    .step-indicator-upcoming {
      border-color: rgb(209 213 219);
      background: white;
      color: rgb(107 114 128);
    }

    .dark .step-indicator-upcoming {
      border-color: rgb(75 85 99);
      background: rgb(17 24 39);
      color: rgb(156 163 175);
    }

    .step-indicator-current {
      border-color: rgb(59 130 246);
      background: rgb(59 130 246);
      color: white;
    }

    .step-indicator-completed {
      border-color: rgb(34 197 94);
      background: rgb(34 197 94);
      color: white;
    }

    .step-indicator-error {
      border-color: rgb(239 68 68);
      background: rgb(239 68 68);
      color: white;
    }

    .step-indicator-skipped {
      border-color: rgb(156 163 175);
      background: rgb(156 163 175);
      color: white;
    }

    .step-label-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .step-label-container-vertical {
      align-items: flex-start;
      text-align: left;
    }

    .step-label {
      font-weight: 500;
      transition: color 0.3s ease;
    }

    .step-label-sm {
      font-size: 0.75rem;
    }

    .step-label-default {
      font-size: 0.875rem;
    }

    .step-label-lg {
      font-size: 1rem;
    }

    .step-label-upcoming {
      color: rgb(107 114 128);
    }

    .dark .step-label-upcoming {
      color: rgb(156 163 175);
    }

    .step-label-current {
      color: rgb(59 130 246);
      font-weight: 600;
    }

    .step-label-completed {
      color: rgb(34 197 94);
    }

    .step-label-error {
      color: rgb(239 68 68);
    }

    .step-description {
      margin-top: 0.25rem;
      color: rgb(107 114 128);
      line-height: 1.4;
    }

    .dark .step-description {
      color: rgb(156 163 175);
    }

    .step-description-sm {
      font-size: 0.625rem;
    }

    .step-description-default {
      font-size: 0.75rem;
    }

    .step-description-lg {
      font-size: 0.875rem;
    }

    .optional-label {
      font-size: 0.75rem;
      color: rgb(156 163 175);
      font-weight: 400;
      margin-left: 0.25rem;
    }

    .step-content {
      margin-top: 1rem;
      margin-left: 2.5rem;
      padding: 1rem;
      border: 1px solid rgb(229 231 235);
      border-radius: 0.5rem;
      background: rgb(255 255 255);
      color: rgb(17 24 39);
    }

    .dark .step-content {
      border-color: rgb(75 85 99);
      background: rgb(31 41 55);
      color: rgb(243 244 246);
    }

    .horizontal-content {
      margin-top: 2rem;
      padding: 1.5rem;
      border: 1px solid rgb(229 231 235);
      border-radius: 0.5rem;
      background: rgb(255 255 255);
      color: rgb(17 24 39);
      min-height: 200px;
    }

    .dark .horizontal-content {
      border-color: rgb(75 85 99);
      background: rgb(31 41 55);
      color: rgb(243 244 246);
    }

    .navigation {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 2rem;
      padding-top: 1rem;
      border-top: 1px solid rgb(229 231 235);
    }

    .dark .navigation {
      border-color: rgb(75 85 99);
    }

    .navigation-button {
      display: inline-flex;
      align-items: center;
      padding: 0.5rem 1rem;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      font-weight: 500;
      transition: all 0.2s ease;
      border: 1px solid;
      cursor: pointer;
    }

    .navigation-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .back-button {
      border-color: rgb(209 213 219);
      background: white;
      color: rgb(107 114 128);
    }

    .back-button:hover:not(:disabled) {
      background: rgb(249 250 251);
      border-color: rgb(156 163 175);
    }

    .dark .back-button {
      border-color: rgb(75 85 99);
      background: rgb(17 24 39);
      color: rgb(156 163 175);
    }

    .dark .back-button:hover:not(:disabled) {
      background: rgb(31 41 55);
      border-color: rgb(107 114 128);
    }

    .next-button {
      border-color: rgb(59 130 246);
      background: rgb(59 130 246);
      color: white;
    }

    .next-button:hover:not(:disabled) {
      background: rgb(37 99 235);
      border-color: rgb(37 99 235);
    }

    .skip-button {
      border-color: rgb(156 163 175);
      background: transparent;
      color: rgb(107 114 128);
    }

    .skip-button:hover:not(:disabled) {
      background: rgb(249 250 251);
      border-color: rgb(107 114 128);
    }

    .dark .skip-button {
      border-color: rgb(107 114 128);
      color: rgb(156 163 175);
    }

    .dark .skip-button:hover:not(:disabled) {
      background: rgb(31 41 55);
      border-color: rgb(156 163 175);
    }

    /* Variant styles */
    .stepper-minimal .step-indicator {
      border: none;
      background: transparent;
    }

    .stepper-minimal .step-indicator-current {
      background: rgb(59 130 246);
      color: white;
    }

    .stepper-filled .step-indicator-upcoming {
      background: rgb(229 231 235);
      border-color: rgb(229 231 235);
    }

    .dark .stepper-filled .step-indicator-upcoming {
      background: rgb(75 85 99);
      border-color: rgb(75 85 99);
    }

    .stepper-outlined .step-indicator {
      background: transparent;
    }

    .stepper-outlined .step-indicator-current {
      background: transparent;
      color: rgb(59 130 246);
    }

    /* Screen reader only content */
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }

    /* Default step content */
    .default-step-content {
      padding: 1.5rem;
      background: rgb(249 250 251);
      border-radius: 0.5rem;
      border: 1px dashed rgb(209 213 219);
      text-align: center;
    }

    .dark .default-step-content {
      background: rgb(17 24 39);
      border-color: rgb(75 85 99);
    }

    .default-step-content h3 {
      margin-bottom: 0.5rem;
      font-size: 1.125rem;
      font-weight: 600;
      color: rgb(17 24 39);
    }

    .dark .default-step-content h3 {
      color: rgb(243 244 246);
    }

    .default-step-content p {
      color: rgb(107 114 128);
      font-size: 0.875rem;
    }

    .dark .default-step-content p {
      color: rgb(156 163 175);
    }

    /* Focus management */
    .step-header:focus {
      outline: 2px solid rgb(59 130 246);
      outline-offset: 2px;
      border-radius: 0.375rem;
    }

    .dark .step-header:focus {
      outline-color: rgb(96 165 250);
    }

    /* Touch feedback */
    .step-header:active {
      transform: scale(0.98);
    }

    .navigation-button:active {
      transform: scale(0.98);
    }

    /* High contrast mode support */
    @media (prefers-contrast: high) {
      .step-header {
        border: 2px solid;
      }
      
      .step-indicator {
        border: 2px solid;
      }
      
      .connector {
        height: 3px;
      }
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .step-header,
      .navigation-button {
        transition: none;
      }
      
      .step-header:active,
      .navigation-button:active {
        transform: none;
      }
    }

    /* Animation */
    @media (prefers-reduced-motion: no-preference) {
      .step-indicator,
      .step-label,
      .step-connector,
      .progress-fill {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
    }

    /* Spinner animation */
    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    .animate-spin {
      animation: spin 1s linear infinite;
    }

    /* High contrast mode support */
    @media (prefers-contrast: high) {
      .step-indicator {
        border-width: 3px;
      }

      .step-connector {
        height: 3px;
        width: 3px;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class Stepper implements AfterContentInit, OnDestroy {
  @ContentChildren(Step) stepComponents!: QueryList<Step>;
  @ContentChildren(StepContent) contentDirectives!: QueryList<StepContent>;
  @ViewChildren('stepHeader') stepHeaderElements!: QueryList<ElementRef<HTMLElement>>;

  // Input properties
  @Input() steps: StepConfig[] = [];
  @Input() currentStep = 0;
  @Input() orientation: StepperOrientation = 'horizontal';
  @Input() variant: StepperVariant = 'default';
  @Input() size: StepperSize = 'default';
  @Input() linear = true;
  @Input() showProgress = true;
  @Input() showNavigation = true;
  @Input() allowStepClick = true;
  @Input() validateOnNext = true;
  @Input() class = '';
  @Input() ariaLabel = 'Step navigation';

  // Button labels
  @Input() nextLabel = 'Next';
  @Input() backLabel = 'Back';
  @Input() skipLabel = 'Skip';
  @Input() completeLabel = 'Complete';
  @Input() nextButtonText = 'Next';
  @Input() backButtonText = 'Back';
  @Input() finishButtonText = 'Finish';

  // Navigation options
  @Input() hideBackButton = false;
  @Input() hideNextButton = false;
  @Input() showFinishButton = true;
  @Input() autoAdvanceOnComplete = true; // Auto advance when step content is complete
  @Input() focusContentOnActivate = true; // Focus content area when step needs completion

  // Output events
  @Output() stepChange = new EventEmitter<{ from: number; to: number; step: StepConfig }>();
  @Output() stepComplete = new EventEmitter<{ step: StepConfig; index: number }>();
  @Output() stepSkip = new EventEmitter<{ step: StepConfig; index: number }>();
  @Output() stepError = new EventEmitter<{ step: StepConfig; index: number; error: any }>();
  @Output() stepContentFocused = new EventEmitter<{ step: StepConfig; index: number }>();
  @Output() completed = new EventEmitter<void>();

  // Internal state
  private _currentStepIndex = signal(0);
  private _stepStatuses = signal<Record<string, StepStatus>>({});
  private _validationStatus = signal<ValidationStatus>('idle');
  private announceTimeout: any = null;
  public contentTemplates = new Map<string, TemplateRef<any>>();

  constructor() {
    // Initialize step statuses when steps change
    effect(() => {
      const steps = this.steps;
      const statuses: Record<string, StepStatus> = {};

      steps.forEach((step, index) => {
        if (index < this._currentStepIndex()) {
          statuses[step.id] = 'completed';
        } else if (index === this._currentStepIndex()) {
          statuses[step.id] = 'current';
        } else {
          statuses[step.id] = 'upcoming';
        }
      });

      this._stepStatuses.set(statuses);
    });

    // Sync with external currentStep input
    effect(() => {
      if (this.currentStep !== this._currentStepIndex()) {
        this._currentStepIndex.set(Math.max(0, Math.min(this.currentStep, this.steps.length - 1)));
      }
    });

    // Update tab indices when current step changes
    effect(() => {
      const currentIndex = this._currentStepIndex();
      // Use setTimeout to ensure DOM is updated
      setTimeout(() => {
        this.ensureProperTabIndex();
      }, 0);
    });
  }

  ngAfterContentInit(): void {
    // Initialize steps from content children if not provided via input
    if (this.steps.length === 0 && this.stepComponents) {
      this.steps = this.stepComponents.map(step => step.getStepConfig());
    }

    // Populate content templates from StepContent directives
    if (this.contentDirectives) {
      this.contentDirectives.forEach(directive => {
        this.contentTemplates.set(directive.stepId, directive.templateRef);
      });
    }

    // Update step components status
    this.updateStepComponentStatuses();

    // Ensure current step is focusable after view init
    setTimeout(() => {
      this.ensureProperTabIndex();
    }, 0);
  }

  private ensureProperTabIndex(): void {
    // Make sure at least one step is focusable
    const currentIndex = this._currentStepIndex();
    const stepHeaderElements = this.stepHeaderElements?.toArray();
    
    if (stepHeaderElements) {
      stepHeaderElements.forEach((element, index) => {
        const step = this.steps[index];
        if (!step) return;
        
        if (this.isStepFocusable(index)) {
          // Allow programmatic focus but only current step is in tab order
          const tabIndex = index === currentIndex ? 0 : -1;
          element.nativeElement.setAttribute('tabindex', tabIndex.toString());
        } else {
          // Disabled or non-focusable steps
          element.nativeElement.setAttribute('tabindex', '-1');
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.announceTimeout) {
      clearTimeout(this.announceTimeout);
    }
  }

  // Computed properties
  currentStepIndex = computed(() => this._currentStepIndex());
  stepStatuses = computed(() => this._stepStatuses());
  validationStatus = computed(() => this._validationStatus());

  progressPercentage = computed(() => {
    if (this.steps.length <= 1) return 0;
    return (this._currentStepIndex() / (this.steps.length - 1)) * 100;
  });

  // Helper methods
  getCurrentStep(): StepConfig | undefined {
    return this.steps[this._currentStepIndex()];
  }

  getCurrentStepTemplate(): TemplateRef<any> | undefined {
    const currentStep = this.getCurrentStep();
    return currentStep ? this.contentTemplates.get(currentStep.id) : undefined;
  }

  isStepCompleted(stepId: string): boolean {
    return this._stepStatuses()[stepId] === 'completed';
  }

  isLastStep(): boolean {
    return this._currentStepIndex() >= this.steps.length - 1;
  }

  canGoBack(): boolean {
    return this._currentStepIndex() > 0;
  }

  canGoNext(): boolean {
    const currentStep = this.getCurrentStep();
    if (!currentStep) return false;

    if (currentStep.disabled) return false;

    // Don't check validation here - it will be handled in goNext()
    // This allows the button to be enabled, but validation happens on click
    return true;
  }

  getStepTabIndex(step: StepConfig, index: number): number {
    if (step.disabled) return -1;
    if (!this.allowStepClick) return -1;
    if (this.linear && index > this._currentStepIndex()) return -1;
    
    // For keyboard navigation, we need to allow focus on all valid steps
    // but only the current step should be in the initial tab order
    return index === this._currentStepIndex() ? 0 : -1;
  }

  isCurrentStepInvalid(): boolean {
    const currentStep = this.getCurrentStep();
    if (!currentStep) return false;
    return this._stepStatuses()[currentStep.id] === 'error';
  }

  isNavigating(): boolean {
    return this._validationStatus() === 'pending';
  }

  trackByStepId(index: number, step: StepConfig): string {
    return step.id;
  }

  // Navigation methods
  async navigateToStep(index: number): Promise<void> {
    if (!this.canNavigateToStep(index)) return;

    const fromIndex = this._currentStepIndex();
    const toStep = this.steps[index];

    // Validate current step if moving forward
    if (index > fromIndex && this.validateOnNext) {
      const currentStep = this.getCurrentStep();
      if (currentStep?.validator) {
        try {
          this._validationStatus.set('pending');
          const result = await currentStep.validator();

          if (!result) {
            this._validationStatus.set('invalid');
            this.setStepStatus(currentStep.id, 'error');
            this.stepError.emit({ step: currentStep, index: fromIndex, error: 'Validation failed' });
            return;
          }

          this._validationStatus.set('valid');
        } catch (error) {
          this._validationStatus.set('invalid');
          this.setStepStatus(currentStep.id, 'error');
          this.stepError.emit({ step: currentStep, index: fromIndex, error });
          return;
        }
      }
    }

    // Mark previous steps as completed when moving forward
    if (index > fromIndex) {
      for (let i = fromIndex; i < index; i++) {
        this.setStepStatus(this.steps[i].id, 'completed');
        this.stepComplete.emit({ step: this.steps[i], index: i });
      }
    }

    this._currentStepIndex.set(index);
    this.setStepStatus(toStep.id, 'current');
    this._validationStatus.set('idle'); // Reset validation status after successful navigation

    this.stepChange.emit({ from: fromIndex, to: index, step: toStep });
    this.announceStepChange(toStep, index);
    this.updateStepComponentStatuses();
    
    // Update tab indices after navigation
    setTimeout(() => {
      this.ensureProperTabIndex();
    }, 0);

    // Do NOT emit completed here - only when explicitly completing via goNext()
  }

  async goNext(): Promise<void> {
    if (this.isLastStep()) {
      // Handle completion
      const currentStep = this.getCurrentStep();
      if (currentStep) {
        this.setStepStatus(currentStep.id, 'completed');
        this.stepComplete.emit({ step: currentStep, index: this._currentStepIndex() });
      }
      this.completed.emit();
      return;
    }

    const nextIndex = this._currentStepIndex() + 1;
    if (nextIndex < this.steps.length) {
      await this.navigateToStep(nextIndex);
    }
  }

  async goBack(): Promise<void> {
    const prevIndex = this._currentStepIndex() - 1;
    if (prevIndex >= 0) {
      await this.navigateToStep(prevIndex);
    }
  }

  async nextStep(): Promise<void> {
    await this.goNext();
  }

  async previousStep(): Promise<void> {
    await this.goBack();
  }

  skipStep(): void {
    const currentStep = this.getCurrentStep();
    if (currentStep?.skippable) {
      this.setStepStatus(currentStep.id, 'skipped');
      this.stepSkip.emit({ step: currentStep, index: this._currentStepIndex() });
      this.goNext();
    }
  }

  // Keyboard navigation
  handleStepperKeyDown(event: KeyboardEvent): void {
    // Handle stepper-level keyboard events
    const { key } = event;
    
    // If focus is not on a step header, handle general navigation
    if (!event.target || !(event.target as HTMLElement).hasAttribute('aria-controls')) {
      switch (key) {
        case 'ArrowRight':
        case 'ArrowDown':
          event.preventDefault();
          this.focusCurrentStep();
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          event.preventDefault();
          this.focusCurrentStep();
          break;
        case 'Home':
          event.preventDefault();
          this.focusFirstStep();
          break;
        case 'End':
          event.preventDefault();
          this.focusLastStep();
          break;
      }
    }
  }

  private focusCurrentStep(): void {
    const currentIndex = this._currentStepIndex();
    if (this.isStepFocusable(currentIndex)) {
      this.updateFocusToStep(currentIndex);
    } else {
      // Find the first focusable step
      const firstFocusable = this.findNextFocusableStep(-1);
      if (firstFocusable !== -1) {
        this.updateFocusToStep(firstFocusable);
      }
    }
  }

  handleStepKeyDown(event: KeyboardEvent, index: number): void {
    const { key } = event;
    
    // Debug logging
    console.log('Key pressed:', key, 'on step:', index, 'current step:', this._currentStepIndex());
    
    switch (key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        event.stopPropagation();
        console.log('Activating step:', index);
        
        // If this is the current step, check if we should focus content or advance
        if (index === this._currentStepIndex()) {
          if (this.focusContentOnActivate && this.shouldFocusStepContent(index)) {
            console.log('Focusing step content for completion');
            this.focusStepContent(index);
          } else if (this.autoAdvanceOnComplete) {
            console.log('Step is complete, advancing to next step');
            
            // Check if this is the last step before advancing
            const isLastStep = index === this.steps.length - 1;
            
            if (isLastStep) {
              // For the last step, advance only if not already completed
              // Then check if it should be marked as completed and remove focus
              this.goNext();
              
              setTimeout(() => {
                const currentStep = this.steps[index];
                if (this.isStepCompleted(currentStep.id)) {
                  console.log('Last step is now completed, removing focus');
                  this.removeFocus();
                } else {
                  // Keep focus on last step until user explicitly completes it
                  console.log('Last step reached but not completed, keeping focus');
                  this.focusStep(index);
                }
              }, 50);
            } else {
              // For non-last steps, advance and focus the next step
              this.goNext();
              setTimeout(() => {
                const newStepIndex = this._currentStepIndex();
                this.focusStep(newStepIndex);
              }, 50);
            }
          }
        } else if (this.canNavigateToStep(index)) {
          // Navigate to a different step
          this.navigateToStep(index);
        }
        break;
        
      case 'Tab':
        // If this is the current step and has content that needs focus, focus it
        if (index === this._currentStepIndex() && 
            this.focusContentOnActivate && 
            this.shouldFocusStepContent(index)) {
          event.preventDefault();
          event.stopPropagation();
          console.log('Tab pressed, focusing step content');
          this.focusStepContent(index);
        }
        // Otherwise, allow default tab behavior
        break;
        
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        event.stopPropagation();
        console.log('Moving to next step from:', index);
        this.focusNextStep(index);
        break;
        
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        event.stopPropagation();
        console.log('Moving to previous step from:', index);
        this.focusPrevStep(index);
        break;
        
      case 'Home':
        event.preventDefault();
        event.stopPropagation();
        console.log('Moving to first step');
        this.focusFirstStep();
        break;
        
      case 'End':
        event.preventDefault();
        event.stopPropagation();
        console.log('Moving to last step');
        this.focusLastStep();
        break;
        
      default:
        // Allow other keys to pass through
        break;
    }
  }

  // Touch navigation
  private touchStartTime: number = 0;
  private touchStartPosition: { x: number, y: number } = { x: 0, y: 0 };

  handleStepTouchStart(event: TouchEvent, index: number): void {
    this.touchStartTime = Date.now();
    const touch = event.touches[0];
    this.touchStartPosition = { x: touch.clientX, y: touch.clientY };
  }

  handleStepTouchEnd(event: TouchEvent, index: number): void {
    event.preventDefault();
    const touchEndTime = Date.now();
    const touchDuration = touchEndTime - this.touchStartTime;
    
    // Consider it a tap if touch duration is less than 300ms
    if (touchDuration < 300) {
      const touch = event.changedTouches[0];
      const deltaX = Math.abs(touch.clientX - this.touchStartPosition.x);
      const deltaY = Math.abs(touch.clientY - this.touchStartPosition.y);
      
      // Consider it a tap if movement is less than 10px
      if (deltaX < 10 && deltaY < 10) {
        this.navigateToStep(index);
      }
    }
  }

  handleNavigationTouchStart(event: TouchEvent, action: 'previous' | 'next' | 'finish'): void {
    this.touchStartTime = Date.now();
    const touch = event.touches[0];
    this.touchStartPosition = { x: touch.clientX, y: touch.clientY };
  }

  handleNavigationTouchEnd(event: TouchEvent, action: 'previous' | 'next' | 'finish'): void {
    event.preventDefault();
    const touchEndTime = Date.now();
    const touchDuration = touchEndTime - this.touchStartTime;
    
    // Consider it a tap if touch duration is less than 300ms
    if (touchDuration < 300) {
      const touch = event.changedTouches[0];
      const deltaX = Math.abs(touch.clientX - this.touchStartPosition.x);
      const deltaY = Math.abs(touch.clientY - this.touchStartPosition.y);
      
      // Consider it a tap if movement is less than 10px
      if (deltaX < 10 && deltaY < 10) {
        switch (action) {
          case 'previous':
            this.goBack();
            break;
          case 'next':
            this.goNext();
            break;
          case 'finish':
            this.finishStepper();
            break;
        }
      }
    }
  }

  finishStepper(): void {
    const currentStep = this.getCurrentStep();
    if (currentStep) {
      this.setStepStatus(currentStep.id, 'completed');
      this.stepComplete.emit({ step: currentStep, index: this._currentStepIndex() });
    }
    this.completed.emit();
  }

  private focusNextStep(currentIndex: number): void {
    const nextIndex = this.findNextFocusableStep(currentIndex);
    console.log('Next focusable step from', currentIndex, 'is:', nextIndex);
    if (nextIndex !== -1) {
      this.updateFocusToStep(nextIndex);
      this.announceStepFocus(nextIndex);
    }
  }

  private focusPrevStep(currentIndex: number): void {
    const prevIndex = this.findPrevFocusableStep(currentIndex);
    console.log('Previous focusable step from', currentIndex, 'is:', prevIndex);
    if (prevIndex !== -1) {
      this.updateFocusToStep(prevIndex);
      this.announceStepFocus(prevIndex);
    }
  }

  private focusFirstStep(): void {
    const firstIndex = this.findNextFocusableStep(-1);
    if (firstIndex !== -1) {
      this.updateFocusToStep(firstIndex);
      this.announceStepFocus(firstIndex);
    }
  }

  private focusLastStep(): void {
    const lastIndex = this.findPrevFocusableStep(this.steps.length);
    if (lastIndex !== -1) {
      this.updateFocusToStep(lastIndex);
      this.announceStepFocus(lastIndex);
    }
  }

  private updateFocusToStep(index: number): void {
    // Update tab indices: current step gets tabindex="0", others get tabindex="-1"
    // But allow programmatic focus on all focusable steps
    const stepHeaderElements = this.stepHeaderElements?.toArray();
    if (stepHeaderElements) {
      stepHeaderElements.forEach((element, i) => {
        const step = this.steps[i];
        if (step && this.isStepFocusable(i)) {
          // Allow programmatic focus but only current step is in tab order
          const tabIndex = i === index ? 0 : -1;
          element.nativeElement.setAttribute('tabindex', tabIndex.toString());
        } else {
          // Disabled or non-focusable steps
          element.nativeElement.setAttribute('tabindex', '-1');
        }
      });
    }
    
    // Focus the step
    this.focusStep(index);
  }

  private focusStep(index: number): void {
    // Use a timeout to ensure proper focus management
    setTimeout(() => {
      // First try using ViewChildren
      const stepHeaderElements = this.stepHeaderElements?.toArray();
      if (stepHeaderElements && stepHeaderElements[index]) {
        stepHeaderElements[index].nativeElement.focus();
        return;
      }
      
      // Fallback to DOM query
      const stepElement = document.querySelector(`#step-header-${this.steps[index].id}`) as HTMLElement;
      if (stepElement) {
        stepElement.focus();
      }
    }, 0);
  }

  /**
   * Removes focus from the stepper component
   */
  private removeFocus(): void {
    // Use a timeout to ensure proper focus management
    setTimeout(() => {
      // First try using ViewChildren to blur current focused step
      const stepHeaderElements = this.stepHeaderElements?.toArray();
      if (stepHeaderElements) {
        stepHeaderElements.forEach(element => {
          if (element.nativeElement === document.activeElement) {
            element.nativeElement.blur();
          }
        });
      }
      
      // Also blur any focused step buttons via DOM query
      const focusedStep = document.activeElement as HTMLElement;
      if (focusedStep && focusedStep.closest('.step-header')) {
        focusedStep.blur();
      }
    }, 0);
  }

  /**
   * Determines if the current step has content that needs to be completed
   * before advancing to the next step
   */
  private shouldFocusStepContent(index: number): boolean {
    const step = this.steps[index];
    if (!step) return false;

    // If the step is not the current step, don't focus content
    if (index !== this._currentStepIndex()) return false;

    // Get the step content area
    const contentId = `step-content-${step.id}`;
    const contentElement = document.getElementById(contentId);
    
    if (!contentElement) return false;

    // Check if there are any incomplete form elements
    const formElements = contentElement.querySelectorAll('input, select, textarea, [contenteditable="true"]');
    
    for (const element of Array.from(formElements)) {
      const htmlElement = element as HTMLElement;
      
      // Skip disabled or readonly elements
      if (htmlElement.hasAttribute('disabled') || htmlElement.hasAttribute('readonly')) {
        continue;
      }

      // Check if element is required and empty
      if (htmlElement.hasAttribute('required')) {
        const inputElement = htmlElement as HTMLInputElement;
        
        if (inputElement.type === 'checkbox' || inputElement.type === 'radio') {
          if (!inputElement.checked) return true;
        } else if (!inputElement.value || inputElement.value.trim() === '') {
          return true;
        }
      }

      // Check for validation errors
      if (htmlElement.classList.contains('invalid') || 
          htmlElement.classList.contains('error') ||
          htmlElement.getAttribute('aria-invalid') === 'true') {
        return true;
      }
    }

    // Check if there are any buttons that suggest action is needed
    const actionButtons = contentElement.querySelectorAll('button[data-action], [data-required-action]');
    if (actionButtons.length > 0) {
      return true;
    }

    // Check if step has a validator and hasn't been validated yet
    if (step.validator && this._stepStatuses()[step.id] !== 'completed') {
      return true;
    }

    return false;
  }

  /**
   * Focuses the first interactive element in the step's content area
   */
  private focusStepContent(index: number): void {
    const step = this.steps[index];
    if (!step) return;

    const contentId = `step-content-${step.id}`;
    const contentElement = document.getElementById(contentId);
    
    if (!contentElement) return;

    // Emit event that content is being focused
    this.stepContentFocused.emit({ step, index });

    // Find the first focusable element in priority order
    const focusableSelectors = [
      'input:not([disabled]):not([readonly])[required]', // Required inputs first
      'select:not([disabled])[required]',
      'textarea:not([disabled]):not([readonly])[required]',
      'input:not([disabled]):not([readonly])', // Then other inputs
      'select:not([disabled])',
      'textarea:not([disabled]):not([readonly])',
      'button:not([disabled])',
      '[contenteditable="true"]',
      '[tabindex]:not([tabindex="-1"])'
    ];

    for (const selector of focusableSelectors) {
      const element = contentElement.querySelector(selector) as HTMLElement;
      if (element) {
        setTimeout(() => {
          element.focus();
          
          // If it's an input, select its content for easy replacement
          if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            (element as HTMLInputElement).select();
          }
          
          // Announce to screen readers
          this.announceToScreenReader(`Focused on ${element.getAttribute('aria-label') || element.getAttribute('placeholder') || 'form field'} in step ${index + 1}`);
        }, 100);
        return;
      }
    }

    // If no focusable elements found, announce that the step content is ready
    this.announceToScreenReader(`Step ${index + 1} content is ready. Press Escape to return to step navigation.`);
  }

  /**
   * Handle keyboard events within step content areas
   */
  handleContentKeyDown(event: KeyboardEvent, stepIndex: number): void {
    const { key } = event;
    
    switch (key) {
      case 'Escape':
        event.preventDefault();
        event.stopPropagation();
        // Return focus to the step header
        this.focusStep(stepIndex);
        this.announceToScreenReader(`Returned to step ${stepIndex + 1} navigation`);
        break;
        
      case 'Enter':
        // Check if we're on a form element that should handle Enter naturally
        const target = event.target as HTMLElement;
        if (target.tagName === 'TEXTAREA' || 
            (target.tagName === 'INPUT' && target.getAttribute('type') !== 'submit') ||
            target.hasAttribute('contenteditable')) {
          // Let the form element handle Enter naturally
          return;
        }
        
        // If Enter is pressed on a button or other element, try to advance step
        if (target.tagName === 'BUTTON' || target.getAttribute('role') === 'button') {
          // Let the button handle its click first, then potentially advance
          setTimeout(() => {
            if (this.autoAdvanceOnComplete && !this.shouldFocusStepContent(stepIndex)) {
              this.goNext();
            }
          }, 100);
        }
        break;
        
      case 'Tab':
        // Check if we've tabbed out of the content area
        setTimeout(() => {
          const activeElement = document.activeElement as HTMLElement;
          const contentElement = document.getElementById(`step-content-${this.steps[stepIndex].id}`);
          
          if (contentElement && !contentElement.contains(activeElement)) {
            // Focus has left the content area, check if step is complete
            if (this.autoAdvanceOnComplete && !this.shouldFocusStepContent(stepIndex)) {
              // Step appears complete, focus the next step or navigation
              if (!this.isLastStep()) {
                this.focusNextStep(stepIndex);
              } else {
                // Focus the navigation buttons
                const nextButton = document.querySelector('.next-button, .navigation-button') as HTMLElement;
                if (nextButton) {
                  nextButton.focus();
                }
              }
            }
          }
        }, 50);
        break;
    }
  }

  private announceStepFocus(index: number): void {
    const step = this.steps[index];
    if (step) {
      // Create announcement for screen readers
      const announcement = `Step ${index + 1} of ${this.steps.length}: ${step.label}${step.description ? '. ' + step.description : ''}`;
      this.announceToScreenReader(announcement);
    }
  }

  private announceToScreenReader(message: string): void {
    // Create a temporary element for screen reader announcements
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }

  private findNextFocusableStep(startIndex: number): number {
    console.log('Finding next focusable step from:', startIndex);
    for (let i = startIndex + 1; i < this.steps.length; i++) {
      console.log('Checking step', i, 'focusable:', this.isStepFocusable(i));
      if (this.isStepFocusable(i)) {
        return i;
      }
    }
    return -1;
  }

  private findPrevFocusableStep(startIndex: number): number {
    console.log('Finding previous focusable step from:', startIndex);
    for (let i = startIndex - 1; i >= 0; i--) {
      console.log('Checking step', i, 'focusable:', this.isStepFocusable(i));
      if (this.isStepFocusable(i)) {
        return i;
      }
    }
    return -1;
  }

  private isStepFocusable(index: number): boolean {
    const step = this.steps[index];
    if (!step || step.disabled) return false;
    if (!this.allowStepClick) return false;
    if (this.linear && index > this._currentStepIndex()) return false;
    return true;
  }

  private canNavigateToStep(index: number): boolean {
    const step = this.steps[index];
    if (!step || step.disabled) return false;
    if (!this.allowStepClick && index !== this._currentStepIndex()) return false;
    if (this.linear && index > this._currentStepIndex() + 1) return false;
    return true;
  }

  private setStepStatus(stepId: string, status: StepStatus): void {
    const currentStatuses = { ...this._stepStatuses() };
    currentStatuses[stepId] = status;
    this._stepStatuses.set(currentStatuses);
  }

  private updateStepComponentStatuses(): void {
    if (this.stepComponents) {
      this.stepComponents.forEach((stepComponent, index) => {
        const status = this._stepStatuses()[stepComponent.id] || 'upcoming';
        stepComponent.status.set(status);
      });
    }
  }

  private announceStepChange(step: StepConfig, index: number): void {
    const status = this._stepStatuses()[step.id] || 'current';
    const statusText = status === 'completed' ? 'completed' : 
                     status === 'error' ? 'has error' : 
                     status === 'current' ? 'current' : '';
    
    const announcement = `Step ${index + 1} of ${this.steps.length}: ${step.label}${statusText ? '. ' + statusText : ''}${step.description ? '. ' + step.description : ''}`;
    
    this.announceToScreenReader(announcement);
  }

  // CSS class generators
  getStepperClasses(): string {
    return cn(
      'stepper',
      `stepper-${this.orientation}`,
      `stepper-${this.variant}`,
      `stepper-${this.size}`,
      this.class
    );
  }

  getProgressBarClasses(): string {
    return cn(
      'progress-bar',
      'w-full'
    );
  }

  getProgressFillClasses(): string {
    return cn(
      'progress-fill',
      'h-full'
    );
  }

  getStepsContainerClasses(): string {
    return cn(
      'steps-container',
      `steps-container-${this.orientation}`
    );
  }

  getStepClasses(step: StepConfig, index: number): string {
    return cn(
      'step',
      `step-${this.orientation}`,
      step.disabled && 'opacity-50 cursor-not-allowed'
    );
  }

  getConnectorClasses(step: StepConfig, index: number): string {
    const nextStep = this.steps[index + 1];
    const isCompleted = this.isStepCompleted(step.id) &&
      (this.isStepCompleted(nextStep?.id) || this._currentStepIndex() > index);

    return cn(
      'step-connector',
      `step-connector-${this.orientation}`,
      isCompleted && 'step-connector-completed'
    );
  }

  getStepHeaderClasses(step: StepConfig, index: number): string {
    return cn(
      'step-header',
      `step-header-${this.orientation}`,
      step.disabled && 'cursor-not-allowed',
      !step.disabled && this.allowStepClick && 'cursor-pointer'
    );
  }

  getStepIndicatorClasses(step: StepConfig, index: number): string {
    const status = this._stepStatuses()[step.id] || 'upcoming';

    return cn(
      'step-indicator',
      `step-indicator-${this.size}`,
      `step-indicator-${status}`
    );
  }

  getStepIconClasses(step: StepConfig, index: number): string {
    const baseClasses = 'flex items-center justify-center';
    
    switch (this.size) {
      case 'sm':
        return cn(baseClasses, 'w-3 h-3');
      case 'lg':
        return cn(baseClasses, 'w-5 h-5');
      default:
        return cn(baseClasses, 'w-4 h-4');
    }
  }

  getCheckmarkClasses(step: StepConfig, index: number): string {
    switch (this.size) {
      case 'sm':
        return cn('w-3 h-3');
      case 'lg':
        return cn('w-5 h-5');
      default:
        return cn('w-4 h-4');
    }
  }

  getErrorIconClasses(step: StepConfig, index: number): string {
    switch (this.size) {
      case 'sm':
        return cn('w-3 h-3');
      case 'lg':
        return cn('w-5 h-5');
      default:
        return cn('w-4 h-4');
    }
  }

  getStepNumberClasses(step: StepConfig, index: number): string {
    return cn(
      'font-medium'
    );
  }

  getStepLabelContainerClasses(): string {
    return cn(
      'step-label-container',
      this.orientation === 'vertical' && 'step-label-container-vertical'
    );
  }

  getStepLabelClasses(step: StepConfig, index: number): string {
    const status = this._stepStatuses()[step.id] || 'upcoming';

    return cn(
      'step-label',
      `step-label-${this.size}`,
      `step-label-${status}`
    );
  }

  getOptionalLabelClasses(): string {
    return cn(
      'optional-label'
    );
  }

  getStepDescriptionClasses(step: StepConfig, index: number): string {
    return cn(
      'step-description',
      `step-description-${this.size}`
    );
  }

  getStepContentClasses(): string {
    return cn(
      'step-content'
    );
  }

  getHorizontalContentClasses(): string {
    return cn(
      'horizontal-content'
    );
  }

  getNavigationClasses(): string {
    return cn(
      'navigation'
    );
  }

  getNavigationButtonsClasses(): string {
    return cn(
      'navigation',
      'flex justify-between items-center gap-4 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700'
    );
  }

  getBackButtonClasses(): string {
    return cn(
      'navigation-button',
      'back-button'
    );
  }

  getNextButtonClasses(): string {
    return cn(
      'navigation-button',
      'next-button'
    );
  }

  getFinishButtonClasses(): string {
    return cn(
      'navigation-button',
      'next-button', // Use same styling as next button
      'bg-green-600 hover:bg-green-700 border-green-600 hover:border-green-700'
    );
  }

  getSkipButtonClasses(): string {
    return cn(
      'navigation-button',
      'skip-button'
    );
  }
}
