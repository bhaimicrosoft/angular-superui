import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  InputOTP,
  InputOTPSlot,
  InputOTPGroup,
  InputOTPSeparator
} from '@lib/components/input-otp';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-otp-demo',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    InputOTP,
    InputOTPSlot,
    InputOTPGroup,
    InputOTPSeparator,
    FormsModule
  ],
  styles: [`
    @keyframes pulse-otp {
      0%, 100% { transform: scale(1); box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
      50% { transform: scale(1.05); box-shadow: 0 0 30px rgba(59, 130, 246, 0.6); }
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-15px); }
    }

    @keyframes security-scan {
      0% { transform: scaleX(0); opacity: 0; }
      50% { transform: scaleX(1); opacity: 1; }
      100% { transform: scaleX(0); opacity: 0; }
    }

    .pulse-otp {
      animation: pulse-otp 2s ease-in-out infinite;
    }

    .float-animation {
      animation: float 4s ease-in-out infinite;
    }

    .security-scanner {
      animation: security-scan 3s ease-in-out infinite;
    }

    .otp-container {
      background: linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,0.2);
    }
  `],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-cyan-950 dark:to-blue-950">

      <!-- Hero Section with Security Theme -->
      <div class="relative overflow-hidden bg-gradient-to-br from-cyan-900 via-blue-900 to-indigo-900 dark:from-black dark:via-cyan-950 dark:to-blue-950">
        <!-- Animated Security Elements -->
        <div class="absolute inset-0">
          <div class="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-indigo-500/20"></div>

          <!-- Floating Security Icons -->
          <div class="absolute top-16 left-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div class="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div class="absolute bottom-16 left-1/3 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>

          <!-- Security Grid Animation -->
          <div class="absolute inset-0 opacity-10">
            <svg class="w-full h-full" viewBox="0 0 1200 800">
              <defs>
                <pattern id="security-grid" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                  <rect width="100" height="100" fill="none" stroke="currentColor" stroke-width="0.5" opacity="0.3"/>
                  <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" stroke-width="1" opacity="0.2">
                    <animate attributeName="r" values="15;25;15" dur="4s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0.1;0.4;0.1" dur="4s" repeatCount="indefinite"/>
                  </circle>
                  <rect x="40" y="40" width="20" height="20" fill="currentColor" opacity="0.1">
                    <animate attributeName="opacity" values="0.1;0.3;0.1" dur="3s" repeatCount="indefinite" begin="0.5s"/>
                  </rect>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#security-grid)"/>
            </svg>
          </div>
        </div>

        <!-- Hero Content -->
        <div class="relative z-10 px-6 py-16 sm:py-20 md:py-24 sm:px-8 lg:px-12">
          <div class="mx-auto max-w-4xl text-center">
            <!-- Floating Security Badge -->
            <div class="float-animation mb-6 sm:mb-8">
              <div class="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-white backdrop-blur-sm border border-white/20">
                <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 2L4 7v6c0 5.25 3.99 9.67 9 10 5.01-.33 9-4.75 9-10V7l-6-5z" clip-rule="evenodd"/>
                </svg>
                Secure Authentication
              </div>
            </div>

            <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white">
              Input <span class="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">OTP</span>
            </h1>
            <p class="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto px-2 sm:px-4">
              Secure one-time password input with advanced accessibility, copy-paste functionality, and customizable validation patterns
            </p>

            <!-- Interactive Hero OTP -->
            <div class="mt-8 sm:mt-10 md:mt-12 flex justify-center px-2">
              <div class="otp-container rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 w-full max-w-md">
                <p class="text-white/80 text-xs sm:text-sm mb-3 sm:mb-4">Try entering: 123456</p>
                <InputOTP
                  [maxLength]="6"
                  [allowCopyPaste]="true"
                  [(ngModel)]="heroOtpValue"
                  (complete)="onHeroComplete($event)"
                  class="flex justify-center"
                >
                  <InputOTPGroup>
                    <InputOTPSlot [index]="0" />
                    <InputOTPSlot [index]="1" />
                    <InputOTPSlot [index]="2" />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot [index]="3" />
                    <InputOTPSlot [index]="4" />
                    <InputOTPSlot [index]="5" />
                  </InputOTPGroup>
                </InputOTP>
                @if (heroOtpValue.length === 6) {
                  <div class="mt-3 sm:mt-4 text-green-400 text-xs sm:text-sm">
                    ✓ OTP Complete: {{ heroOtpValue }}
                  </div>
                }
              </div>
            </div>
          </div>
        </div>

        <!-- Security Scanner Effect -->
        <div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 security-scanner"></div>
      </div>

      <!-- Main Content -->
      <div class="relative z-10 px-6 py-12 sm:py-16 sm:px-8 lg:px-12">
        <div class="mx-auto max-w-6xl">
          <!-- Feature Highlights -->
          <div class="mb-16 sm:mb-20">
            <h2 class="text-2xl sm:text-3xl font-bold text-center text-gray-900 dark:text-white mb-8 sm:mb-12">
              Powerful OTP Features
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div class="text-center p-4 sm:p-6 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
                <div class="w-10 h-10 sm:w-12 sm:h-12 bg-cyan-500 rounded-lg mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                  <svg class="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">Accessibility First</h3>
                <p class="text-sm sm:text-base text-gray-600 dark:text-gray-300">Screen reader support, keyboard navigation, and ARIA compliance</p>
              </div>

              <div class="text-center p-4 sm:p-6 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
                <div class="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-lg mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                  <svg class="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                  </svg>
                </div>
                <h3 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">Copy & Paste</h3>
                <p class="text-sm sm:text-base text-gray-600 dark:text-gray-300">Smart paste functionality that validates and fills multiple slots</p>
              </div>

              <div class="text-center p-4 sm:p-6 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 sm:col-span-2 lg:col-span-1">
                <div class="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-500 rounded-lg mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                  <svg class="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <h3 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">Pattern Validation</h3>
                <p class="text-sm sm:text-base text-gray-600 dark:text-gray-300">Customizable regex patterns for digits, letters, or mixed input</p>
              </div>
            </div>
          </div>

          <!-- Examples Section -->
          <div class="space-y-12 sm:space-y-16">

            <!-- Basic Usage -->
            <section class="px-2 sm:px-0">
              <h3 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">Basic Usage</h3>
              <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
                <div class="space-y-4 sm:space-y-6">
                  <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-200/50 dark:border-gray-700/50">
                    <h4 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">6-Digit OTP</h4>
                    <p class="text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">Standard 6-digit verification code</p>
                    <div class="flex justify-center">
                      <InputOTP
                        [maxLength]="6"
                        [allowCopyPaste]="true"
                        [(ngModel)]="basicOtpValue"
                        (complete)="onBasicComplete($event)"
                      >
                        <InputOTPGroup>
                          <InputOTPSlot [index]="0" />
                          <InputOTPSlot [index]="1" />
                          <InputOTPSlot [index]="2" />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot [index]="3" />
                          <InputOTPSlot [index]="4" />
                          <InputOTPSlot [index]="5" />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                    @if (basicOtpValue) {
                      <div class="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-600 dark:text-gray-300 text-center">
                        Current value: <code class="bg-gray-100 dark:bg-gray-700 px-1 sm:px-2 py-1 rounded text-xs sm:text-sm">{{ basicOtpValue }}</code>
                      </div>
                    }
                  </div>
                </div>

                <div class="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
                  <h4 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">Code</h4>
                  <div class="overflow-x-auto">
                    <pre class="text-xs sm:text-sm text-gray-800 dark:text-gray-200"><code>&lt;InputOTP [maxLength]="6" [(ngModel)]="otpValue"&gt;
  &lt;InputOTPGroup&gt;
    &lt;InputOTPSlot [index]="0" /&gt;
    &lt;InputOTPSlot [index]="1" /&gt;
    &lt;InputOTPSlot [index]="2" /&gt;
  &lt;/InputOTPGroup&gt;
  &lt;InputOTPSeparator /&gt;
  &lt;InputOTPGroup&gt;
    &lt;InputOTPSlot [index]="3" /&gt;
    &lt;InputOTPSlot [index]="4" /&gt;
    &lt;InputOTPSlot [index]="5" /&gt;
  &lt;/InputOTPGroup&gt;
&lt;/InputOTP&gt;</code></pre>
                  </div>
                </div>
              </div>
            </section>

            <!-- Simple Examples -->
            <section class="px-2 sm:px-0">
              <h3 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">Simple Examples</h3>
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">

                <!-- 4-Digit PIN -->
                <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-200/50 dark:border-gray-700/50">
                  <h4 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">4-Digit PIN</h4>
                  <p class="text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 text-sm">Try copying and pasting: 1234</p>
                  <div class="flex justify-center">
                    <InputOTP
                      [maxLength]="4"
                      [allowCopyPaste]="true"
                      [(ngModel)]="pin4Value"
                    >
                      <InputOTPGroup>
                        <InputOTPSlot [index]="0" />
                        <InputOTPSlot [index]="1" />
                        <InputOTPSlot [index]="2" />
                        <InputOTPSlot [index]="3" />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  @if (pin4Value) {
                    <div class="mt-3 text-xs text-gray-600 dark:text-gray-300 text-center">
                      Value: <code class="bg-gray-100 dark:bg-gray-700 px-1 rounded text-xs">{{ pin4Value }}</code>
                    </div>
                  }
                  <div class="mt-3 sm:mt-4 p-2 sm:p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-xs sm:text-sm">
                    <div class="text-blue-700 dark:text-blue-300">
                      <strong>Copy-paste test:</strong> Click the input, then press Ctrl+V to paste "1234"
                    </div>
                  </div>
                </div>

                <!-- 8-Character Code -->
                <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-200/50 dark:border-gray-700/50">
                  <h4 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">8-Character Code</h4>
                  <p class="text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 text-sm">Try copying and pasting: ABCD1234</p>
                  <div class="flex justify-center">
                    <InputOTP
                      [maxLength]="8"
                      [allowCopyPaste]="true"
                      [(ngModel)]="code8Value"
                    >
                      <InputOTPGroup>
                        <InputOTPSlot [index]="0" />
                        <InputOTPSlot [index]="1" />
                        <InputOTPSlot [index]="2" />
                        <InputOTPSlot [index]="3" />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot [index]="4" />
                        <InputOTPSlot [index]="5" />
                        <InputOTPSlot [index]="6" />
                        <InputOTPSlot [index]="7" />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  @if (code8Value) {
                    <div class="mt-3 text-xs text-gray-600 dark:text-gray-300 text-center">
                      Value: <code class="bg-gray-100 dark:bg-gray-700 px-1 rounded text-xs">{{ code8Value }}</code>
                    </div>
                  }
                  <div class="mt-3 sm:mt-4 p-2 sm:p-3 bg-green-50 dark:bg-green-900/20 rounded-lg text-xs sm:text-sm">
                    <div class="text-green-700 dark:text-green-300">
                      <strong>Copy-paste test:</strong> Click the input, then press Ctrl+V to paste "ABCD1234"
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <!-- Copy & Paste Demo -->
            <section class="px-2 sm:px-0">
              <h3 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">Copy & Paste Demo</h3>
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">

                <!-- Copy-Paste Enabled -->
                <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-200/50 dark:border-gray-700/50">
                  <div class="flex flex-col sm:flex-row sm:items-center gap-2 mb-3 sm:mb-4">
                    <h4 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Copy-Paste Enabled</h4>
                    <div class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 w-fit">
                      ✓ ON
                    </div>
                  </div>
                  <p class="text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 text-sm">
                    Try pasting: <code class="bg-gray-100 dark:bg-gray-700 px-1 rounded text-xs">567890</code> using Ctrl+V
                  </p>
                  <div class="flex justify-center">
                    <InputOTP
                      [maxLength]="6"
                      [allowCopyPaste]="true"
                      [(ngModel)]="copyPasteOnValue"
                    >
                      <InputOTPGroup>
                        <InputOTPSlot [index]="0" />
                        <InputOTPSlot [index]="1" />
                        <InputOTPSlot [index]="2" />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot [index]="3" />
                        <InputOTPSlot [index]="4" />
                        <InputOTPSlot [index]="5" />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  @if (copyPasteOnValue) {
                    <div class="mt-3 text-xs text-gray-600 dark:text-gray-300 text-center">
                      Value: <code class="bg-gray-100 dark:bg-gray-700 px-1 rounded text-xs">{{ copyPasteOnValue }}</code>
                    </div>
                  }

                  <!-- Copy-Paste Instructions -->
                  <div class="mt-3 sm:mt-4 p-2 sm:p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-xs sm:text-sm">
                    <div class="font-medium text-blue-800 dark:text-blue-200 mb-1 sm:mb-2">Try these actions:</div>
                    <div class="space-y-1 text-blue-700 dark:text-blue-300">
                      <div>• <kbd class="px-1 bg-blue-100 dark:bg-blue-800 rounded text-xs">Ctrl+V</kbd> - Paste "567890"</div>
                      <div>• <kbd class="px-1 bg-blue-100 dark:bg-blue-800 rounded text-xs">Ctrl+C</kbd> - Copy current value</div>
                      <div>• <kbd class="px-1 bg-blue-100 dark:bg-blue-800 rounded text-xs">Ctrl+X</kbd> - Cut current value</div>
                    </div>
                  </div>
                </div>

                <!-- Copy-Paste Disabled -->
                <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-200/50 dark:border-gray-700/50">
                  <div class="flex flex-col sm:flex-row sm:items-center gap-2 mb-3 sm:mb-4">
                    <h4 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Copy-Paste Disabled</h4>
                    <div class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 w-fit">
                      ✗ OFF
                    </div>
                  </div>
                  <p class="text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 text-sm">
                    Manual entry only - copy/paste shortcuts are disabled for enhanced security
                  </p>
                  <div class="flex justify-center">
                    <InputOTP
                      [maxLength]="6"
                      [allowCopyPaste]="false"
                      [(ngModel)]="copyPasteOffValue"
                    >
                      <InputOTPGroup>
                        <InputOTPSlot [index]="0" />
                        <InputOTPSlot [index]="1" />
                        <InputOTPSlot [index]="2" />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot [index]="3" />
                        <InputOTPSlot [index]="4" />
                        <InputOTPSlot [index]="5" />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  @if (copyPasteOffValue) {
                    <div class="mt-3 text-xs text-gray-600 dark:text-gray-300 text-center">
                      Value: <code class="bg-gray-100 dark:bg-gray-700 px-1 rounded text-xs">{{ copyPasteOffValue }}</code>
                    </div>
                  }

                  <!-- Security Note -->
                  <div class="mt-3 sm:mt-4 p-2 sm:p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg text-xs sm:text-sm">
                    <div class="font-medium text-amber-800 dark:text-amber-200 mb-1 sm:mb-2">Security Mode:</div>
                    <div class="text-amber-700 dark:text-amber-300">
                      Copy-paste functionality is disabled to prevent clipboard-based attacks.
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <!-- Quick Test Section -->
            <section class="px-2 sm:px-0">
              <h3 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">Quick Test Section</h3>
              <div class="bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-gray-800/90 dark:to-gray-900/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-200/50 dark:border-gray-700/50">
                <h4 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">Test Copy-Paste Here</h4>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                  <!-- Quick Test OTP -->
                  <div class="space-y-3 sm:space-y-4">
                    <p class="text-gray-600 dark:text-gray-300 text-sm">
                      Copy this code: <strong>999888</strong> and paste it below with Ctrl+V
                    </p>
                    <div class="flex justify-center">
                      <InputOTP
                        [maxLength]="6"
                        [allowCopyPaste]="true"
                        [(ngModel)]="quickTestValue"
                      >
                        <InputOTPGroup>
                          <InputOTPSlot [index]="0" />
                          <InputOTPSlot [index]="1" />
                          <InputOTPSlot [index]="2" />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot [index]="3" />
                          <InputOTPSlot [index]="4" />
                          <InputOTPSlot [index]="5" />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                    @if (quickTestValue) {
                      <div class="text-center text-sm">
                        <span class="text-gray-600 dark:text-gray-300">Value: </span>
                        <code class="bg-gray-100 dark:bg-gray-700 px-1 sm:px-2 py-1 rounded text-xs sm:text-sm">{{ quickTestValue }}</code>
                      </div>
                    }
                    @if (quickTestValue === '999888') {
                      <div class="text-center text-green-600 dark:text-green-400 font-semibold text-sm sm:text-base">
                        ✅ Copy-Paste Working!
                      </div>
                    }
                  </div>

                  <!-- Instructions -->
                  <div class="space-y-3 sm:space-y-4">
                    <h5 class="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">How to test:</h5>
                    <ol class="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                      <li>1. Click on the OTP input to focus it</li>
                      <li>2. Copy the code "999888" (select and Ctrl+C)</li>
                      <li>3. Press Ctrl+V to paste</li>
                      <li>4. The code should fill all slots instantly</li>
                    </ol>

                    <div class="mt-3 sm:mt-4 p-2 sm:p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div class="text-xs sm:text-sm text-blue-700 dark:text-blue-300">
                        <strong>Tip:</strong> Make sure to click on the OTP component first to focus the hidden input field before pasting.
                      </div>
                    </div>

                    <button
                      (click)="clearQuickTest()"
                      class="w-full px-3 sm:px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm sm:text-base"
                    >
                      Clear Test
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <!-- API Reference -->
            <section class="px-2 sm:px-0">
              <h3 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">API Reference</h3>
              <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 md:p-8 border border-gray-200/50 dark:border-gray-700/50">
                <div class="overflow-x-auto">
                  <table class="w-full text-xs sm:text-sm">
                    <thead>
                      <tr class="border-b border-gray-200 dark:border-gray-700">
                        <th class="text-left py-2 sm:py-3 px-2 sm:px-4 font-semibold text-gray-900 dark:text-white">Property</th>
                        <th class="text-left py-2 sm:py-3 px-2 sm:px-4 font-semibold text-gray-900 dark:text-white">Type</th>
                        <th class="text-left py-2 sm:py-3 px-2 sm:px-4 font-semibold text-gray-900 dark:text-white">Default</th>
                        <th class="text-left py-2 sm:py-3 px-2 sm:px-4 font-semibold text-gray-900 dark:text-white">Description</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                      <tr>
                        <td class="py-2 sm:py-3 px-2 sm:px-4 font-mono text-blue-600 dark:text-blue-400">maxLength</td>
                        <td class="py-2 sm:py-3 px-2 sm:px-4 text-gray-600 dark:text-gray-300">number</td>
                        <td class="py-2 sm:py-3 px-2 sm:px-4 text-gray-600 dark:text-gray-300">6</td>
                        <td class="py-2 sm:py-3 px-2 sm:px-4 text-gray-600 dark:text-gray-300">Maximum number of characters</td>
                      </tr>
                      <tr>
                        <td class="py-2 sm:py-3 px-2 sm:px-4 font-mono text-blue-600 dark:text-blue-400">pattern</td>
                        <td class="py-2 sm:py-3 px-2 sm:px-4 text-gray-600 dark:text-gray-300">string</td>
                        <td class="py-2 sm:py-3 px-2 sm:px-4 text-gray-600 dark:text-gray-300">''</td>
                        <td class="py-2 sm:py-3 px-2 sm:px-4 text-gray-600 dark:text-gray-300">RegExp pattern for validation</td>
                      </tr>
                      <tr>
                        <td class="py-2 sm:py-3 px-2 sm:px-4 font-mono text-blue-600 dark:text-blue-400">disabled</td>
                        <td class="py-2 sm:py-3 px-2 sm:px-4 text-gray-600 dark:text-gray-300">boolean</td>
                        <td class="py-2 sm:py-3 px-2 sm:px-4 text-gray-600 dark:text-gray-300">false</td>
                        <td class="py-2 sm:py-3 px-2 sm:px-4 text-gray-600 dark:text-gray-300">Disable the input</td>
                      </tr>
                      <tr>
                        <td class="py-2 sm:py-3 px-2 sm:px-4 font-mono text-blue-600 dark:text-blue-400">autocomplete</td>
                        <td class="py-2 sm:py-3 px-2 sm:px-4 text-gray-600 dark:text-gray-300">string</td>
                        <td class="py-2 sm:py-3 px-2 sm:px-4 text-gray-600 dark:text-gray-300">'one-time-code'</td>
                        <td class="py-2 sm:py-3 px-2 sm:px-4 text-gray-600 dark:text-gray-300">Autocomplete attribute</td>
                      </tr>
                      <tr>
                        <td class="py-2 sm:py-3 px-2 sm:px-4 font-mono text-blue-600 dark:text-blue-400">inputMode</td>
                        <td class="py-2 sm:py-3 px-2 sm:px-4 text-gray-600 dark:text-gray-300">string</td>
                        <td class="py-2 sm:py-3 px-2 sm:px-4 text-gray-600 dark:text-gray-300">'numeric'</td>
                        <td class="py-2 sm:py-3 px-2 sm:px-4 text-gray-600 dark:text-gray-300">Virtual keyboard type</td>
                      </tr>
                      <tr>
                        <td class="py-2 sm:py-3 px-2 sm:px-4 font-mono text-blue-600 dark:text-blue-400">allowCopyPaste</td>
                        <td class="py-2 sm:py-3 px-2 sm:px-4 text-gray-600 dark:text-gray-300">boolean</td>
                        <td class="py-2 sm:py-3 px-2 sm:px-4 text-gray-600 dark:text-gray-300">true</td>
                        <td class="py-2 sm:py-3 px-2 sm:px-4 text-gray-600 dark:text-gray-300">Enable/disable copy-paste functionality</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class InputOTPDemoComponent {
  // Hero OTP
  heroOtpValue = '';

  // Basic examples
  basicOtpValue = '';

  // Simple examples
  pin4Value = '';
  code8Value = '';

  // Copy-paste demo
  copyPasteOnValue = '';
  copyPasteOffValue = '';

  // Quick test
  quickTestValue = '';

  // Event handlers
  onHeroComplete(value: string) {
    console.log('Hero OTP completed:', value);
  }

  onBasicComplete(value: string) {
    console.log('Basic OTP completed:', value);
  }

  // Quick test controls
  clearQuickTest() {
    this.quickTestValue = '';
  }
}
