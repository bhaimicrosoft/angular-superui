import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Checkbox, CheckboxState } from '@lib/components/checkbox';
import { SEOService } from '../services/seo.service';

@Component({
  selector: 'app-checkbox-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, Checkbox],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <!-- Hero Section -->
        <div class="text-center mb-16">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full mb-6">
            <svg class="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Checkbox Component
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Elegant checkbox controls with support for multiple states, variants, and comprehensive accessibility features.
            Perfect for forms, settings, and interactive lists.
          </p>
        </div>

        <!-- Quick Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700 hover:shadow-xl transition-shadow duration-300">
            <div class="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">4</div>
            <div class="text-sm text-gray-600 dark:text-gray-300">Variants</div>
          </div>
          <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700 hover:shadow-xl transition-shadow duration-300">
            <div class="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">4</div>
            <div class="text-sm text-gray-600 dark:text-gray-300">Sizes</div>
          </div>
          <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700 hover:shadow-xl transition-shadow duration-300">
            <div class="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">3</div>
            <div class="text-sm text-gray-600 dark:text-gray-300">States</div>
          </div>
          <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700 hover:shadow-xl transition-shadow duration-300">
            <div class="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-2">100%</div>
            <div class="text-sm text-gray-600 dark:text-gray-300">Accessible</div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Basic Usage -->
          <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700 overflow-hidden">
            <div class="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
              <h2 class="text-2xl font-bold text-white mb-2">Basic Usage</h2>
              <p class="text-blue-100">Simple checkbox implementation with clean styling</p>
            </div>
            <div class="p-8">
              <div class="space-y-6">
                <div class="flex items-center space-x-3 p-4 rounded-lg bg-gray-50 dark:bg-slate-700/50 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors duration-200">
                  <Checkbox [(ngModel)]="basicStates.terms" />
                  <label class="text-sm font-medium text-gray-900 dark:text-white cursor-pointer select-none">
                    I accept the terms and conditions
                  </label>
                </div>
                <div class="flex items-center space-x-3 p-4 rounded-lg bg-gray-50 dark:bg-slate-700/50 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors duration-200">
                  <Checkbox [(ngModel)]="basicStates.newsletter" />
                  <label class="text-sm font-medium text-gray-900 dark:text-white cursor-pointer select-none">
                    Subscribe to newsletter
                  </label>
                </div>
                <div class="flex items-center space-x-3 p-4 rounded-lg bg-gray-50 dark:bg-slate-700/50 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors duration-200">
                  <Checkbox [(ngModel)]="basicStates.updates" />
                  <label class="text-sm font-medium text-gray-900 dark:text-white cursor-pointer select-none">
                    Receive product updates
                  </label>
                </div>
              </div>
              <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <p class="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Current values:</strong>
                  Terms: {{ basicStates.terms ? '✓' : '✗' }},
                  Newsletter: {{ basicStates.newsletter ? '✓' : '✗' }},
                  Updates: {{ basicStates.updates ? '✓' : '✗' }}
                </p>
              </div>
            </div>
          </div>

          <!-- Size Variants -->
          <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700 overflow-hidden">
            <div class="bg-gradient-to-r from-green-500 to-teal-600 p-6">
              <h2 class="text-2xl font-bold text-white mb-2">Size Variants</h2>
              <p class="text-green-100">Four different sizes to fit your design needs</p>
            </div>
            <div class="p-8">
              <div class="space-y-6">
                <div class="flex items-center space-x-4 p-4 rounded-lg bg-gray-50 dark:bg-slate-700/50 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors duration-200">
                  <Checkbox size="sm" [(ngModel)]="sizeStates.small" />
                  <div>
                    <label class="text-sm font-medium text-gray-900 dark:text-white cursor-pointer">Small (sm)</label>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Compact size for dense layouts</p>
                  </div>
                </div>
                <div class="flex items-center space-x-4 p-4 rounded-lg bg-gray-50 dark:bg-slate-700/50 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors duration-200">
                  <Checkbox size="default" [(ngModel)]="sizeStates.default" />
                  <div>
                    <label class="text-sm font-medium text-gray-900 dark:text-white cursor-pointer">Default</label>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Standard size for most use cases</p>
                  </div>
                </div>
                <div class="flex items-center space-x-4 p-4 rounded-lg bg-gray-50 dark:bg-slate-700/50 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors duration-200">
                  <Checkbox size="lg" [(ngModel)]="sizeStates.large" />
                  <div>
                    <label class="text-sm font-medium text-gray-900 dark:text-white cursor-pointer">Large (lg)</label>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Larger size for better accessibility</p>
                  </div>
                </div>
                <div class="flex items-center space-x-4 p-4 rounded-lg bg-gray-50 dark:bg-slate-700/50 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors duration-200">
                  <Checkbox size="xl" [(ngModel)]="sizeStates.extraLarge" />
                  <div>
                    <label class="text-sm font-medium text-gray-900 dark:text-white cursor-pointer">Extra Large (xl)</label>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Maximum size for prominence</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Color Variants -->
          <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700 overflow-hidden">
            <div class="bg-gradient-to-r from-purple-500 to-pink-600 p-6">
              <h2 class="text-2xl font-bold text-white mb-2">Color Variants</h2>
              <p class="text-purple-100">Semantic colors for different contexts and states</p>
            </div>
            <div class="p-8">
              <div class="space-y-6">
                <div class="flex items-center space-x-4 p-4 rounded-lg bg-gray-50 dark:bg-slate-700/50 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors duration-200">
                  <Checkbox variant="default" [(ngModel)]="variantStates.default" />
                  <div>
                    <label class="text-sm font-medium text-gray-900 dark:text-white cursor-pointer">Default</label>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Standard blue accent color</p>
                  </div>
                </div>
                <div class="flex items-center space-x-4 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors duration-200 border border-red-200 dark:border-red-800">
                  <Checkbox variant="destructive" [(ngModel)]="variantStates.destructive" />
                  <div>
                    <label class="text-sm font-medium text-red-900 dark:text-red-100 cursor-pointer">Destructive</label>
                    <p class="text-xs text-red-600 dark:text-red-400">For dangerous or delete actions</p>
                  </div>
                </div>
                <div class="flex items-center space-x-4 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors duration-200 border border-green-200 dark:border-green-800">
                  <Checkbox variant="success" [(ngModel)]="variantStates.success" />
                  <div>
                    <label class="text-sm font-medium text-green-900 dark:text-green-100 cursor-pointer">Success</label>
                    <p class="text-xs text-green-600 dark:text-green-400">For positive confirmations</p>
                  </div>
                </div>
                <div class="flex items-center space-x-4 p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors duration-200 border border-yellow-200 dark:border-yellow-800">
                  <Checkbox variant="warning" [(ngModel)]="variantStates.warning" />
                  <div>
                    <label class="text-sm font-medium text-yellow-900 dark:text-yellow-100 cursor-pointer">Warning</label>
                    <p class="text-xs text-yellow-600 dark:text-yellow-400">For caution or attention needed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- States Demo -->
          <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700 overflow-hidden">
            <div class="bg-gradient-to-r from-orange-500 to-red-600 p-6">
              <h2 class="text-2xl font-bold text-white mb-2">Checkbox States</h2>
              <p class="text-orange-100">Checked, unchecked, indeterminate, and disabled states</p>
            </div>
            <div class="p-8">
              <div class="space-y-6">
                <div class="flex items-center space-x-4 p-4 rounded-lg bg-gray-50 dark:bg-slate-700/50">
                  <Checkbox [(ngModel)]="stateStates.unchecked" />
                  <div>
                    <label class="text-sm font-medium text-gray-900 dark:text-white cursor-pointer">Unchecked State</label>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Default unchecked state</p>
                  </div>
                </div>
                <div class="flex items-center space-x-4 p-4 rounded-lg bg-gray-50 dark:bg-slate-700/50">
                  <Checkbox [(ngModel)]="stateStates.checked" />
                  <div>
                    <label class="text-sm font-medium text-gray-900 dark:text-white cursor-pointer">Checked State</label>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Selected and active</p>
                  </div>
                </div>
                <div class="flex items-center space-x-4 p-4 rounded-lg bg-gray-50 dark:bg-slate-700/50">
                  <Checkbox [indeterminate]="true" />
                  <div>
                    <label class="text-sm font-medium text-gray-900 dark:text-white">Indeterminate State</label>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Partially selected (mixed state)</p>
                  </div>
                </div>
                <div class="flex items-center space-x-4 p-4 rounded-lg bg-gray-50 dark:bg-slate-700/50 opacity-60">
                  <Checkbox [disabled]="true" [(ngModel)]="stateStates.disabledUnchecked" />
                  <div>
                    <label class="text-sm font-medium text-gray-500 dark:text-gray-400">Disabled Unchecked</label>
                    <p class="text-xs text-gray-400 dark:text-gray-500">Cannot be interacted with</p>
                  </div>
                </div>
                <div class="flex items-center space-x-4 p-4 rounded-lg bg-gray-50 dark:bg-slate-700/50 opacity-60">
                  <Checkbox [disabled]="true" [(ngModel)]="stateStates.disabledChecked" />
                  <div>
                    <label class="text-sm font-medium text-gray-500 dark:text-gray-400">Disabled Checked</label>
                    <p class="text-xs text-gray-400 dark:text-gray-500">Checked but disabled</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Form Integration Examples -->
        <div class="mt-8 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700 overflow-hidden">
          <div class="bg-gradient-to-r from-indigo-500 to-blue-600 p-6">
            <h2 class="text-2xl font-bold text-white mb-2">Form Integration</h2>
            <p class="text-indigo-100">Reactive forms with validation and accessibility features</p>
          </div>
          <div class="p-8">
            <form [formGroup]="checkboxForm" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Required Fields -->
                <div class="space-y-4">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Required Agreements</h3>
                  <div class="space-y-4">
                    <div class="p-4 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
                      <div class="flex items-start space-x-3">
                        <Checkbox
                          formControlName="termsAccepted"
                          [accessibility]="{
                            ariaRequired: true,
                            ariaInvalid: isFieldInvalid('termsAccepted')
                          }"
                          class="mt-0.5" />
                        <div class="flex-1">
                          <label class="text-sm font-medium text-gray-900 dark:text-white cursor-pointer">
                            I accept the Terms and Conditions *
                          </label>
                          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Please read our terms carefully before accepting
                          </p>
                        </div>
                      </div>
                      <div
                        *ngIf="isFieldInvalid('termsAccepted')"
                        class="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center space-x-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span>You must accept the terms and conditions to continue</span>
                      </div>
                    </div>

                    <div class="p-4 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
                      <div class="flex items-start space-x-3">
                        <Checkbox
                          formControlName="privacyAccepted"
                          [accessibility]="{
                            ariaRequired: true,
                            ariaInvalid: isFieldInvalid('privacyAccepted')
                          }"
                          class="mt-0.5" />
                        <div class="flex-1">
                          <label class="text-sm font-medium text-gray-900 dark:text-white cursor-pointer">
                            I agree to the Privacy Policy *
                          </label>
                          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Your data privacy is important to us
                          </p>
                        </div>
                      </div>
                      <div
                        *ngIf="isFieldInvalid('privacyAccepted')"
                        class="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center space-x-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span>Privacy policy acceptance is required</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Optional Preferences -->
                <div class="space-y-4">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Communication Preferences</h3>
                  <div class="space-y-4">
                    <div class="flex items-center space-x-3 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-200">
                      <Checkbox formControlName="emailNotifications" variant="default" />
                      <div>
                        <label class="text-sm font-medium text-blue-900 dark:text-blue-100 cursor-pointer">Email Notifications</label>
                        <p class="text-xs text-blue-600 dark:text-blue-400">Receive updates via email</p>
                      </div>
                    </div>
                    <div class="flex items-center space-x-3 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors duration-200">
                      <Checkbox formControlName="smsNotifications" variant="success" />
                      <div>
                        <label class="text-sm font-medium text-green-900 dark:text-green-100 cursor-pointer">SMS Notifications</label>
                        <p class="text-xs text-green-600 dark:text-green-400">Get text message alerts</p>
                      </div>
                    </div>
                    <div class="flex items-center space-x-3 p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors duration-200">
                      <Checkbox formControlName="marketingEmails" />
                      <div>
                        <label class="text-sm font-medium text-purple-900 dark:text-purple-100 cursor-pointer">Marketing Emails</label>
                        <p class="text-xs text-purple-600 dark:text-purple-400">Promotional content and offers</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Form Actions -->
              <div class="pt-6 border-t border-gray-200 dark:border-slate-600">
                <div class="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                  <div class="text-sm text-gray-600 dark:text-gray-400">
                    Form valid:
                    <span class="font-medium" [class]="checkboxForm.valid ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
                      {{ checkboxForm.valid ? '✓ Valid' : '✗ Invalid' }}
                    </span>
                  </div>
                  <div class="flex space-x-3">
                    <button
                      type="button"
                      (click)="resetForm()"
                      class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
                      Reset Form
                    </button>
                    <button
                      type="submit"
                      [disabled]="!checkboxForm.valid"
                      class="px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
                      Submit Form
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <!-- Checked Property Test -->
        <div class="mt-8 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700 overflow-hidden">
          <div class="bg-gradient-to-r from-cyan-500 to-blue-600 p-6">
            <h2 class="text-2xl font-bold text-white mb-2">Checked Property Control</h2>
            <p class="text-cyan-100">Testing the new checked property for programmatic control</p>
          </div>
          <div class="p-8">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <!-- Controlled Checkbox -->
              <div class="space-y-4">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Controlled via Checked Property</h3>
                <div class="p-4 rounded-lg bg-gray-50 dark:bg-slate-700/50">
                  <div class="flex items-center space-x-3 mb-4">
                    <Checkbox [checked]="checkedPropertyTest.controlled" />
                    <label class="text-sm font-medium text-gray-900 dark:text-white">
                      Controlled checkbox (read-only)
                    </label>
                  </div>
                  <button
                    type="button"
                    (click)="toggleCheckedProperty()"
                    class="w-full px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-colors duration-200">
                    Toggle Checked: {{ checkedPropertyTest.controlled ? 'ON' : 'OFF' }}
                  </button>
                </div>
              </div>

              <!-- Dynamic Control -->
              <div class="space-y-4">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Dynamic Control</h3>
                <div class="p-4 rounded-lg bg-gray-50 dark:bg-slate-700/50">
                  <div class="flex items-center space-x-3 mb-4">
                    <Checkbox [checked]="checkedPropertyTest.dynamic" />
                    <label class="text-sm font-medium text-gray-900 dark:text-white">
                      Dynamic checkbox
                    </label>
                  </div>
                  <div class="space-y-2">
                    <button
                      type="button"
                      (click)="setCheckedTrue()"
                      class="w-full px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200">
                      Set Checked True
                    </button>
                    <button
                      type="button"
                      (click)="setCheckedFalse()"
                      class="w-full px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200">
                      Set Checked False
                    </button>
                  </div>
                </div>
              </div>

              <!-- Two-way Binding -->
              <div class="space-y-4">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Two-way Binding</h3>
                <div class="p-4 rounded-lg bg-gray-50 dark:bg-slate-700/50">
                  <div class="flex items-center space-x-3 mb-4">
                    <Checkbox [(ngModel)]="checkedPropertyTest.uncontrolled" />
                    <label class="text-sm font-medium text-gray-900 dark:text-white">
                      Two-way bound checkbox
                    </label>
                  </div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">
                    <p><strong>Current value:</strong> {{ checkedPropertyTest.uncontrolled ? 'Checked' : 'Unchecked' }}</p>
                    <p class="text-xs mt-1">Click checkbox to change value</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Summary -->
            <div class="mt-6 p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg border border-cyan-200 dark:border-cyan-800">
              <h4 class="font-medium text-cyan-900 dark:text-cyan-100 mb-2">Property Values Summary:</h4>
              <div class="text-sm text-cyan-800 dark:text-cyan-200 space-y-1">
                <p><strong>Controlled:</strong> {{ checkedPropertyTest.controlled ? '✓ Checked' : '✗ Unchecked' }}</p>
                <p><strong>Dynamic:</strong> {{ checkedPropertyTest.dynamic ? '✓ Checked' : '✗ Unchecked' }}</p>
                <p><strong>Two-way bound:</strong> {{ checkedPropertyTest.uncontrolled ? '✓ Checked' : '✗ Unchecked' }}</p>
              </div>
            </div>
          </div>
        </div>


        <!-- Accessibility Features -->
        <div class="mt-8 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700 overflow-hidden">
          <div class="bg-gradient-to-r from-emerald-500 to-green-600 p-6">
            <h2 class="text-2xl font-bold text-white mb-2">Accessibility Features</h2>
            <p class="text-emerald-100">WCAG 2.1 AA compliant with comprehensive screen reader support</p>
          </div>
          <div class="p-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Keyboard Navigation</h3>
                <div class="space-y-3">
                  <div class="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-slate-700">
                    <kbd class="px-2 py-1 text-xs font-semibold text-gray-800 dark:text-gray-200 bg-gray-200 dark:bg-slate-600 rounded">Tab</kbd>
                    <span class="text-sm text-gray-600 dark:text-gray-300">Navigate to checkbox</span>
                  </div>
                  <div class="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-slate-700">
                    <kbd class="px-2 py-1 text-xs font-semibold text-gray-800 dark:text-gray-200 bg-gray-200 dark:bg-slate-600 rounded">Space</kbd>
                    <span class="text-sm text-gray-600 dark:text-gray-300">Toggle checkbox state</span>
                  </div>
                  <div class="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-slate-700">
                    <kbd class="px-2 py-1 text-xs font-semibold text-gray-800 dark:text-gray-200 bg-gray-200 dark:bg-slate-600 rounded">Enter</kbd>
                    <span class="text-sm text-gray-600 dark:text-gray-300">Alternative toggle</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Screen Reader Support</h3>
                <div class="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                  <div class="flex items-start space-x-2">
                    <div class="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Proper ARIA labels and descriptions</span>
                  </div>
                  <div class="flex items-start space-x-2">
                    <div class="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>State announcements (checked/unchecked/mixed)</span>
                  </div>
                  <div class="flex items-start space-x-2">
                    <div class="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Form validation error announcements</span>
                  </div>
                  <div class="flex items-start space-x-2">
                    <div class="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Focus management and indicators</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Accessibility Demo -->
            <div class="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
              <h4 class="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">Accessibility Demo</h4>
              <div class="space-y-4">
                <div class="flex items-center space-x-3">
                  <Checkbox
                    [(ngModel)]="accessibilityDemo.hasLabel"
                    [accessibility]="{
                      ariaLabel: 'Enable newsletter subscription',
                      ariaDescription: 'You will receive weekly updates about our products and services'
                    }" />
                  <label class="text-sm font-medium text-blue-900 dark:text-blue-100">
                    Checkbox with ARIA label and description
                  </label>
                </div>
                <div class="flex items-center space-x-3">
                  <Checkbox
                    [(ngModel)]="accessibilityDemo.isRequired"
                    [accessibility]="{
                      ariaRequired: true,
                      ariaInvalid: !accessibilityDemo.isRequired
                    }" />
                  <label class="text-sm font-medium text-blue-900 dark:text-blue-100">
                    Required checkbox with validation
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="mt-16 text-center">
          <div class="flex flex-col items-center space-y-4">
            <div class="inline-flex items-center space-x-2 text-gray-500 dark:text-gray-400">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              <span class="text-sm">Built with Angular SuperUI</span>
            </div>
            <a
              href="https://github.com/bhaimicrosoft/angular-superui/tree/main/docs/components/checkbox.md"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
              <span>View Full Documentation</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CheckboxDemoComponent implements OnInit {
  // Basic usage states
  basicStates = {
    terms: false,
    newsletter: false,
    updates: true
  };

  // Size variants
  sizeStates = {
    small: true,
    default: false,
    large: true,
    extraLarge: false
  };

  // Color variants
  variantStates = {
    default: true,
    destructive: false,
    success: true,
    warning: false
  };

  // Checkbox states
  stateStates = {
    unchecked: false,
    checked: true,
    disabledUnchecked: false,
    disabledChecked: true
  };

  // Test checked property
  checkedPropertyTest = {
    controlled: true,
    uncontrolled: false,
    dynamic: false
  };

  // Interactive demo - using signals for better reactivity
  interactiveDemo = signal({
    size: 'default' as 'sm' | 'default' | 'lg' | 'xl',
    variant: 'default' as 'default' | 'destructive' | 'success' | 'warning'
  });

  // Simple string properties to test
  demoSize: 'sm' | 'default' | 'lg' | 'xl' = 'default';
  demoVariant: 'default' | 'destructive' | 'success' | 'warning' = 'default';

  // Computed values to ensure reactivity
  currentSize = computed(() => this.interactiveDemo().size);
  currentVariant = computed(() => this.interactiveDemo().variant);

  // Force re-render key
  checkboxKey = signal(0);

  // Separate properties for two-way binding
  interactiveDemoChecked = false;
  interactiveDemoDisabled = false;

  // Accessibility demo
  accessibilityDemo = {
    hasLabel: false,
    isRequired: false
  };

  // Event log
  eventLog: Array<{id: number, timestamp: string, type: string, data: string}> = [];
  private eventId = 0;

  // Form
  checkboxForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private seo: SEOService
  ) {
    this.checkboxForm = this.fb.group({
      termsAccepted: [false, Validators.requiredTrue],
      privacyAccepted: [false, Validators.requiredTrue],
      emailNotifications: [true],
      smsNotifications: [false],
      marketingEmails: [false]
    });
  }

  ngOnInit() {
    this.seo.updateSEO({
      title: 'Checkbox Component - Angular SuperUI | Interactive Form Controls',
      description: 'Discover our flexible Checkbox component with multiple variants, sizes, and states. Features comprehensive accessibility support, form integration, and beautiful animations built with Tailwind CSS.',
      keywords: 'Angular checkbox, form controls, UI components, accessible checkboxes, form validation, Angular forms, interactive controls, checkbox variants'
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.checkboxForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  // Test methods for checked property
  toggleCheckedProperty() {
    this.checkedPropertyTest.controlled = !this.checkedPropertyTest.controlled;
  }

  setCheckedTrue() {
    this.checkedPropertyTest.dynamic = true;
  }

  setCheckedFalse() {
    this.checkedPropertyTest.dynamic = false;
  }

  resetForm() {
    this.checkboxForm.reset({
      termsAccepted: false,
      privacyAccepted: false,
      emailNotifications: true,
      smsNotifications: false,
      marketingEmails: false
    });
    this.checkboxForm.markAsPristine();
    this.checkboxForm.markAsUntouched();
  }

  onCheckedChange(checked: boolean) {
    this.addEvent('checkedChange', `Checkbox ${checked ? 'checked' : 'unchecked'}`);
  }

  onStateChange(state: CheckboxState) {
    this.addEvent('stateChange', `State changed to: ${state}`);
  }

  onFocus() {
    this.addEvent('focused', 'Checkbox received focus');
  }

  onBlur() {
    this.addEvent('blurred', 'Checkbox lost focus');
  }

  onInteractiveSizeChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const size = target.value as 'sm' | 'default' | 'lg' | 'xl';
    this.demoSize = size;
    console.log(size)
    this.interactiveDemo.update(current => ({ ...current, size }));
    this.checkboxKey.update(key => key + 1); // Force re-render
    this.addEvent('sizeChange', `Size changed to: ${size}`);
  }

  onInteractiveVariantChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const variant = target.value as 'default' | 'destructive' | 'success' | 'warning';
    this.demoVariant = variant;
    console.log(variant)
    this.interactiveDemo.update(current => ({ ...current, variant }));
    this.checkboxKey.update(key => key + 1); // Force re-render
    this.addEvent('variantChange', `Variant changed to: ${variant}`);
  }

  onInteractiveCheckedChange(checked: boolean) {
    this.interactiveDemoChecked = checked;
    this.addEvent('checkedChange', `Interactive checkbox ${checked ? 'checked' : 'unchecked'}`);
  }

  onInteractiveDisabledChange(disabled: boolean) {
    this.interactiveDemoDisabled = disabled;
    this.addEvent('disabledChange', `Disabled changed to: ${disabled}`);
  }

  private addEvent(type: string, data: string) {
    const timestamp = new Date().toLocaleTimeString();
    this.eventLog.unshift({
      id: ++this.eventId,
      timestamp,
      type,
      data
    });

    // Keep only last 10 events
    if (this.eventLog.length > 10) {
      this.eventLog = this.eventLog.slice(0, 10);
    }
  }

  clearEventLog() {
    this.eventLog = [];
    this.eventId = 0;
  }

  trackByEvent(index: number, event: any): number {
    return event.id;
  }
}
