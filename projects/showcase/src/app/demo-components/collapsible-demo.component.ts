import {Component, inject, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@lib/collapsible';
import { SEOService } from '../services/seo.service';
import {
  LucideAngularModule,
  ChevronDownIcon,
  SettingsIcon,
  HelpCircleIcon,
  UserIcon,
  BellIcon,
  ShieldIcon,
  CreditCardIcon,
  FileTextIcon,
  CodeIcon,
  SparklesIcon,
  HeartIcon
} from 'lucide-angular';

@Component({
  selector: 'app-collapsible-demo',
  standalone: true,
  imports: [CommonModule, Collapsible, CollapsibleTrigger, CollapsibleContent, LucideAngularModule],
  template: `
    <!-- Elegant Collapsible Gallery -->
    <div class="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950 relative overflow-hidden">

      <!-- Animated Background Elements -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-20 left-10 w-20 h-20 opacity-10">
          <div class="w-full h-full border-4 border-blue-400 rounded-full animate-ping"></div>
        </div>
        <div class="absolute top-40 right-20 w-16 h-16 opacity-10">
          <div class="w-full h-full bg-gradient-to-br from-indigo-400 to-purple-400 transform rotate-45 animate-pulse"></div>
        </div>
        <div class="absolute bottom-32 left-1/4 w-12 h-12 opacity-10">
          <div class="w-full h-full border-3 border-purple-400 transform rotate-12 animate-bounce"></div>
        </div>
      </div>

      <div class="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">

        <!-- Header Section -->
        <div class="text-center mb-20">
          <div class="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-100/80 to-indigo-100/80 dark:from-blue-900/40 dark:to-indigo-900/40 border-2 border-blue-200/60 dark:border-blue-700/60 text-blue-800 dark:text-blue-200 text-sm font-medium mb-8 backdrop-blur-sm shadow-lg">
            <lucide-angular [img]="SparklesIcon" class="w-5 h-5 mr-3"></lucide-angular>
            ✨ Interactive Content Panels ✨
          </div>

          <h1 class="text-6xl sm:text-7xl lg:text-8xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
            <span class="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
              Collapsible
            </span>
            <br>
            <span class="text-4xl sm:text-5xl lg:text-6xl text-slate-700 dark:text-slate-300 font-serif italic">
              Showcase
            </span>
          </h1>

          <p class="text-xl sm:text-2xl text-gray-700 dark:text-gray-300 max-w-5xl mx-auto leading-relaxed mb-16 font-light">
            "The best way to find out if you can trust somebody is to trust them" — Ernest Hemingway
            <br>
            <span class="text-lg text-blue-700 dark:text-blue-300 font-medium">
              Discover elegant expandable content with smooth animations
            </span>
          </p>

          <!-- Feature Stats -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
            <div class="group bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-6 border-2 border-blue-200/60 dark:border-blue-700/60 hover:scale-105 hover:shadow-xl transition-all duration-500 cursor-pointer">
              <div class="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparentdark:text-white mb-2">∞</div>
              <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">Infinite Content</div>
              <div class="w-8 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mt-3 group-hover:w-12 transition-all duration-300"></div>
            </div>

            <div class="group bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-6 border-2 border-indigo-200/60 dark:border-indigo-700/60 hover:scale-105 hover:shadow-xl transition-all duration-500 cursor-pointer">
              <div class="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-white mb-2">⚡</div>
              <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">Smooth Animations</div>
              <div class="w-8 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mt-3 group-hover:w-12 transition-all duration-300"></div>
            </div>

            <div class="group bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-6 border-2 border-purple-200/60 dark:border-purple-700/60 hover:scale-105 hover:shadow-xl transition-all duration-500 cursor-pointer">
              <div class="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-white mb-2">♿</div>
              <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">Accessible</div>
              <div class="w-8 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-3 group-hover:w-12 transition-all duration-300"></div>
            </div>

            <div class="group bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-6 border-2 border-pink-200/60 dark:border-pink-700/60 hover:scale-105 hover:shadow-xl transition-all duration-500 cursor-pointer">
              <div class="text-4xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-white mb-2">🎨</div>
              <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">Customizable</div>
              <div class="w-8 h-1 bg-gradient-to-r from-pink-500 to-red-500 rounded-full mt-3 group-hover:w-12 transition-all duration-300"></div>
            </div>
          </div>
        </div>

        <!-- Demo Sections -->
        <div class="space-y-16">

          <!-- Basic Examples Section -->
          <section>
            <div class="text-center mb-12">
              <h2 class="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6 font-serif">
                🚀 Getting Started
              </h2>
              <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-light">
                Simple, elegant collapsible panels for any content
              </p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <!-- Basic Collapsible -->
              <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl p-8 border border-slate-200/50 dark:border-slate-700/50 shadow-xl">
                <div class="flex items-center mb-6">
                  <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                    <lucide-angular [img]="FileTextIcon" class="w-6 h-6 text-white"></lucide-angular>
                  </div>
                  <div>
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white">Simple Content</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Basic expandable text</p>
                  </div>
                </div>

                <Collapsible #basicCollapsible>
                  <CollapsibleTrigger>
                    <div class="flex items-center justify-between w-full px-6 py-4 text-left text-lg font-semibold text-gray-900 dark:text-white bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/40 dark:to-indigo-900/40 rounded-xl hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-900/50 dark:hover:to-indigo-900/50 transition-all duration-300 border border-blue-200/50 dark:border-blue-600/50 group">
                      <span>📚 Learn More About This Topic</span>
                      <lucide-angular [img]="ChevronDownIcon"
                                      class="w-5 h-5 text-blue-600 dark:text-blue-400 transform transition-transform duration-300 group-hover:scale-110"
                                      [class.rotate-180]="basicCollapsible.service.isOpen()"></lucide-angular>
                    </div>
                  </CollapsibleTrigger>                  <CollapsibleContent>
                    <div class="mt-4 p-6 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800/60 dark:to-blue-900/30 rounded-xl border border-slate-200/50 dark:border-slate-600/50">
                      <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                        This is a beautifully designed collapsible content area. It supports rich content,
                        smooth animations, and works perfectly across all screen sizes.
                      </p>
                      <div class="flex flex-wrap gap-2">
                        <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">Responsive</span>
                        <span class="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-200 rounded-full text-sm font-medium">Accessible</span>
                        <span class="px-3 py-1 bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium">Animated</span>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>

              <!-- Interactive Form -->
              <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl p-8 border border-slate-200/50 dark:border-slate-700/50 shadow-xl">
                <div class="flex items-center mb-6">
                  <div class="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                    <lucide-angular [img]="SettingsIcon" class="w-6 h-6 text-white"></lucide-angular>
                  </div>
                  <div>
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white">Interactive Form</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Advanced content example</p>
                  </div>
                </div>

                <Collapsible #interactiveForm>
                  <CollapsibleTrigger>
                    <div class="flex items-center justify-between w-full px-6 py-4 text-left text-lg font-semibold text-gray-900 dark:text-white bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/30 rounded-xl hover:from-emerald-100 hover:to-green-100 dark:hover:from-emerald-900/40 dark:hover:to-green-900/40 transition-all duration-300 border border-emerald-200/50 dark:border-emerald-600/50 group">
                      <span>⚙️ Configuration Settings</span>
                      <lucide-angular [img]="ChevronDownIcon"
                                      class="w-5 h-5 text-emerald-600 dark:text-emerald-400 transform transition-transform duration-300 group-hover:scale-110"
                                      [class.rotate-180]="interactiveForm.service.isOpen()"></lucide-angular>
                    </div>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <div class="mt-4 p-6 bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-800/60 dark:to-emerald-900/30 rounded-xl border border-slate-200/50 dark:border-slate-600/50 space-y-4">
                      <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-3">
                          <lucide-angular [img]="BellIcon" class="w-5 h-5 text-gray-600 dark:text-gray-400"></lucide-angular>
                          <span class="text-gray-700 dark:text-gray-300 font-medium">Enable notifications</span>
                        </div>
                        <label class="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" class="sr-only peer">
                          <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-600"></div>
                        </label>
                      </div>
                      <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-3">
                          <lucide-angular [img]="ShieldIcon" class="w-5 h-5 text-gray-600 dark:text-gray-400"></lucide-angular>
                          <span class="text-gray-700 dark:text-gray-300 font-medium">Two-factor authentication</span>
                        </div>
                        <label class="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" class="sr-only peer" checked>
                          <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-600"></div>
                        </label>
                      </div>
                      <button class="w-full mt-4 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                        Save Settings
                      </button>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </div>
          </section>

          <!-- FAQ Section -->
          <section>
            <div class="text-center mb-12">
              <h2 class="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6 font-serif">
                ❓ Frequently Asked Questions
              </h2>
              <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-light">
                Common questions about the Collapsible component
              </p>
            </div>

            <div class="max-w-4xl mx-auto space-y-4">
              <!-- FAQ Item 1 -->
              <div class="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-600/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <Collapsible>
                  <CollapsibleTrigger>
                    <div class="flex items-center justify-between w-full px-8 py-6 text-left group">
                      <div class="flex items-center space-x-4">
                        <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                          <lucide-angular [img]="HelpCircleIcon" class="w-5 h-5 text-white"></lucide-angular>
                        </div>
                        <span class="text-lg font-semibold text-gray-900 dark:text-white">How does the Collapsible component work?</span>
                      </div>
                      <lucide-angular [img]="ChevronDownIcon" class="w-5 h-5 text-purple-600 dark:text-purple-400 transform transition-transform duration-300 group-hover:scale-110"></lucide-angular>
                    </div>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <div class="px-8 pb-8">
                      <div class="pl-14 text-gray-700 dark:text-gray-300 leading-relaxed">
                        <p class="mb-4">
                          The Collapsible component uses Angular signals for reactive state management. It consists of three parts:
                        </p>
                        <ul class="space-y-2 list-disc pl-6">
                          <li><strong>Collapsible:</strong> The root component that provides context and state</li>
                          <li><strong>CollapsibleTrigger:</strong> The clickable button that toggles the state</li>
                          <li><strong>CollapsibleContent:</strong> The content area that shows/hides with animations</li>
                        </ul>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>

              <!-- FAQ Item 2 -->
              <div class="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-600/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <Collapsible>
                  <CollapsibleTrigger>
                    <div class="flex items-center justify-between w-full px-8 py-6 text-left group">
                      <div class="flex items-center space-x-4">
                        <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                          <lucide-angular [img]="CodeIcon" class="w-5 h-5 text-white"></lucide-angular>
                        </div>
                        <span class="text-lg font-semibold text-gray-900 dark:text-white">Is it accessible and keyboard friendly?</span>
                      </div>
                      <lucide-angular [img]="ChevronDownIcon" class="w-5 h-5 text-blue-600 dark:text-blue-400 transform transition-transform duration-300 group-hover:scale-110"></lucide-angular>
                    </div>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <div class="px-8 pb-8">
                      <div class="pl-14 text-gray-700 dark:text-gray-300 leading-relaxed">
                        <p class="mb-4">
                          Yes! The component includes comprehensive accessibility features:
                        </p>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                            <h4 class="font-semibold text-green-800 dark:text-green-200 mb-2">✅ ARIA Support</h4>
                            <p class="text-sm text-green-700 dark:text-green-300">Proper aria-expanded attributes</p>
                          </div>
                          <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                            <h4 class="font-semibold text-blue-800 dark:text-blue-200 mb-2">⌨️ Keyboard Navigation</h4>
                            <p class="text-sm text-blue-700 dark:text-blue-300">Space and Enter key support</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>

              <!-- FAQ Item 3 -->
              <div class="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-600/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <Collapsible>
                  <CollapsibleTrigger>
                    <div class="flex items-center justify-between w-full px-8 py-6 text-left group">
                      <div class="flex items-center space-x-4">
                        <div class="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center">
                          <lucide-angular [img]="SparklesIcon" class="w-5 h-5 text-white"></lucide-angular>
                        </div>
                        <span class="text-lg font-semibold text-gray-900 dark:text-white">Can I customize the styling and animations?</span>
                      </div>
                      <lucide-angular [img]="ChevronDownIcon" class="w-5 h-5 text-emerald-600 dark:text-emerald-400 transform transition-transform duration-300 group-hover:scale-110"></lucide-angular>
                    </div>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <div class="px-8 pb-8">
                      <div class="pl-14 text-gray-700 dark:text-gray-300 leading-relaxed">
                        <p class="mb-4">
                          Absolutely! The component is built with Tailwind CSS and provides multiple customization options:
                        </p>
                        <div class="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-lg p-6">
                          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <h5 class="font-semibold text-indigo-800 dark:text-indigo-200 mb-2">🎨 Styling</h5>
                              <p class="text-indigo-700 dark:text-indigo-300">Override Tailwind classes</p>
                            </div>
                            <div>
                              <h5 class="font-semibold text-purple-800 dark:text-purple-200 mb-2">⚡ Animations</h5>
                              <p class="text-purple-700 dark:text-purple-300">CSS transitions & keyframes</p>
                            </div>
                            <div>
                              <h5 class="font-semibold text-pink-800 dark:text-pink-200 mb-2">🔧 Structure</h5>
                              <p class="text-pink-700 dark:text-pink-300">Modify component templates</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </div>
          </section>

          <!-- Advanced Examples Section -->
          <section>
            <div class="text-center mb-12">
              <h2 class="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6 font-serif">
                🎨 Advanced Examples
              </h2>
              <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-light">
                Complex layouts and creative implementations
              </p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <!-- User Profile Card -->
              <div class="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 backdrop-blur-sm rounded-3xl p-8 border border-slate-200/50 dark:border-slate-700/50 shadow-2xl">
                <div class="flex items-center mb-6">
                  <div class="w-16 h-16 bg-gradient-to-br from-pink-500 to-red-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <lucide-angular [img]="UserIcon" class="w-8 h-8 text-white"></lucide-angular>
                  </div>
                  <div>
                    <h3 class="text-2xl font-bold text-gray-900 dark:text-white">User Profile</h3>
                    <p class="text-gray-600 dark:text-gray-400">Expandable profile information</p>
                  </div>
                </div>

                <Collapsible>
                  <CollapsibleTrigger>
                    <div class="flex items-center justify-between w-full p-6 text-left bg-gradient-to-r from-pink-50 to-red-50 dark:from-pink-900/30 dark:to-red-900/30 rounded-2xl hover:from-pink-100 hover:to-red-100 dark:hover:from-pink-900/40 dark:hover:to-red-900/40 transition-all duration-300 border border-pink-200/50 dark:border-pink-600/50 group">
                      <div class="flex items-center space-x-4">
                        <div class="w-12 h-12 bg-gradient-to-br from-pink-400 to-red-500 rounded-full"></div>
                        <div>
                          <h4 class="font-semibold text-gray-900 dark:text-white">Sarah Johnson</h4>
                          <p class="text-sm text-gray-600 dark:text-gray-400">Senior Developer</p>
                        </div>
                      </div>
                      <lucide-angular [img]="ChevronDownIcon" class="w-5 h-5 text-pink-600 dark:text-pink-400 transform transition-transform duration-300 group-hover:scale-110"></lucide-angular>
                    </div>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <div class="mt-6 p-6 bg-gradient-to-br from-slate-50 to-pink-50 dark:from-slate-800/60 dark:to-pink-900/30 rounded-2xl border border-slate-200/50 dark:border-slate-600/50">
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h5 class="font-semibold text-gray-900 dark:text-white mb-3">Contact Information</h5>
                          <div class="space-y-2 text-sm">
                            <p class="text-gray-700 dark:text-gray-300">📧 sarah.johnson&#64;example.com</p>
                            <p class="text-gray-700 dark:text-gray-300">📱 +1 (555) 123-4567</p>
                            <p class="text-gray-700 dark:text-gray-300">🌍 San Francisco, CA</p>
                          </div>
                        </div>
                        <div>
                          <h5 class="font-semibold text-gray-900 dark:text-white mb-3">Skills</h5>
                          <div class="flex flex-wrap gap-2">
                            <span class="px-2 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 rounded-lg text-xs">Angular</span>
                            <span class="px-2 py-1 bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-200 rounded-lg text-xs">TypeScript</span>
                            <span class="px-2 py-1 bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-200 rounded-lg text-xs">RxJS</span>
                            <span class="px-2 py-1 bg-pink-100 dark:bg-pink-900/40 text-pink-800 dark:text-pink-200 rounded-lg text-xs">TailwindCSS</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>

              <!-- Payment Methods -->
              <div class="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 backdrop-blur-sm rounded-3xl p-8 border border-slate-200/50 dark:border-slate-700/50 shadow-2xl">
                <div class="flex items-center mb-6">
                  <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <lucide-angular [img]="CreditCardIcon" class="w-8 h-8 text-white"></lucide-angular>
                  </div>
                  <div>
                    <h3 class="text-2xl font-bold text-gray-900 dark:text-white">Payment Methods</h3>
                    <p class="text-gray-600 dark:text-gray-400">Manage billing information</p>
                  </div>
                </div>

                <div class="flex flex-col gap-6">
                  <!-- Credit Card -->
                  <Collapsible>
                    <CollapsibleTrigger>
                      <div class="flex items-center justify-between w-full p-4 text-left bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-900/40 dark:hover:to-emerald-900/40 transition-all duration-300 border border-green-200/50 dark:border-green-600/50 group">
                        <div class="flex items-center space-x-3">
                          <div class="w-10 h-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-md flex items-center justify-center">
                            <span class="text-white text-xs font-bold">VISA</span>
                          </div>
                          <div>
                            <p class="font-medium text-gray-900 dark:text-white">•••• •••• •••• 4242</p>
                            <p class="text-sm text-gray-600 dark:text-gray-400">Expires 12/25</p>
                          </div>
                        </div>
                        <div class="flex items-center space-x-3">
                          <span class="px-3 py-1 bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-200 rounded-full text-xs font-medium">Primary</span>
                          <lucide-angular [img]="ChevronDownIcon" class="w-4 h-4 text-green-600 dark:text-green-400 transform transition-transform duration-300 group-hover:scale-110"></lucide-angular>
                        </div>
                      </div>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <div class="mt-2 p-4 bg-gradient-to-br from-slate-50 to-green-50 dark:from-slate-800/60 dark:to-green-900/30 rounded-xl border border-slate-200/50 dark:border-slate-600/50">
                        <div class="flex justify-between items-center">
                          <div class="text-sm text-gray-700 dark:text-gray-300">
                            <p><strong>Cardholder:</strong> Sarah Johnson</p>
                            <p><strong>Billing Address:</strong> 123 Main St, San Francisco, CA</p>
                          </div>
                          <div class="space-x-2">
                            <button class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">Edit</button>
                            <button class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm">Remove</button>
                          </div>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>

                  <!-- PayPal -->
                  <Collapsible>
                    <CollapsibleTrigger>
                      <div class="flex items-center justify-between w-full p-4 text-left bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-900/40 dark:hover:to-indigo-900/40 transition-all duration-300 border border-blue-200/50 dark:border-blue-600/50 group">
                        <div class="flex items-center space-x-3">
                          <div class="w-10 h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-md flex items-center justify-center">
                            <span class="text-white text-xs font-bold">PP</span>
                          </div>
                          <div>
                            <p class="font-medium text-gray-900 dark:text-white">PayPal Account</p>
                            <p class="text-sm text-gray-600 dark:text-gray-400">sarah.johnson&#64;example.com</p>
                          </div>
                        </div>
                        <div class="flex items-center space-x-3">
                          <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 rounded-full text-xs font-medium">Verified</span>
                          <lucide-angular [img]="ChevronDownIcon" class="w-4 h-4 text-blue-600 dark:text-blue-400 transform transition-transform duration-300 group-hover:scale-110"></lucide-angular>
                        </div>
                      </div>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <div class="mt-2 p-4 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800/60 dark:to-blue-900/30 rounded-xl border border-slate-200/50 dark:border-slate-600/50">
                        <div class="flex justify-between items-center">
                          <div class="text-sm text-gray-700 dark:text-gray-300">
                            <p><strong>Account Status:</strong> Verified ✅</p>
                            <p><strong>Added:</strong> March 15, 2024</p>
                          </div>
                          <div class="space-x-2">
                            <button class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">Set Primary</button>
                            <button class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm">Remove</button>
                          </div>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              </div>
            </div>
          </section>

          <!-- Implementation Showcase -->
          <section class="mb-20">
            <div class="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-8 lg:p-12 border border-slate-700/50 shadow-2xl max-w-6xl mx-auto">
              <div class="text-center mb-12">
                <h2 class="text-4xl font-bold text-white mb-6 flex items-center justify-center">
                  <lucide-angular [img]="CodeIcon" class="w-10 h-10 mr-4"></lucide-angular>
                  Clean Implementation
                </h2>
                <p class="text-xl text-slate-300 max-w-3xl mx-auto">
                  Simple, elegant code that creates beautiful collapsible content
                </p>
              </div>

              <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- Basic Usage -->
                <div class="bg-slate-800/50 rounded-2xl p-6 border border-slate-600/50">
                  <h3 class="text-xl font-bold text-white mb-4 flex items-center">
                    <span class="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                    Basic Usage
                  </h3>
                  <div class="bg-slate-900/80 rounded-xl p-4 font-mono text-sm overflow-x-auto">
                    <div class="text-slate-400 mb-2">// Simple collapsible content</div>
                    <div class="text-blue-300">&lt;Collapsible&gt;</div>
                    <div class="text-green-300 ml-4">&lt;CollapsibleTrigger&gt;</div>
                    <div class="text-slate-300 ml-8">Click to expand</div>
                    <div class="text-green-300 ml-4">&lt;/CollapsibleTrigger&gt;</div>
                    <div class="text-purple-300 ml-4">&lt;CollapsibleContent&gt;</div>
                    <div class="text-slate-300 ml-8">Hidden content here...</div>
                    <div class="text-purple-300 ml-4">&lt;/CollapsibleContent&gt;</div>
                    <div class="text-blue-300">&lt;/Collapsible&gt;</div>
                  </div>
                </div>
              </div>

              <!-- Features Grid -->
              <div class="mt-8 bg-slate-800/50 rounded-2xl p-6 border border-slate-600/50">
                <h3 class="text-xl font-bold text-white mb-4 flex items-center">
                  <span class="w-3 h-3 bg-purple-500 rounded-full mr-3"></span>
                  Key Features
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div class="bg-slate-900/80 rounded-xl p-4">
                    <div class="text-green-300 mb-2">✅ Signal-based</div>
                    <div class="text-slate-300">Reactive state management</div>
                    <div class="text-slate-300">Angular signals</div>
                  </div>
                  <div class="bg-slate-900/80 rounded-xl p-4">
                    <div class="text-blue-300 mb-2">🎨 Styled</div>
                    <div class="text-slate-300">Tailwind CSS classes</div>
                    <div class="text-slate-300">Smooth animations</div>
                  </div>
                  <div class="bg-slate-900/80 rounded-xl p-4">
                    <div class="text-purple-300 mb-2">♿ Accessible</div>
                    <div class="text-slate-300">ARIA attributes</div>
                    <div class="text-slate-300">Keyboard support</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Documentation Link -->
          <section class="mb-20">
            <div class="max-w-4xl mx-auto px-4">
              <div class="bg-gradient-to-r from-slate-800/90 via-slate-700/90 to-slate-800/90 dark:from-slate-800/50 dark:via-slate-700/50 dark:to-slate-800/50 relative overflow-hidden py-12 rounded-2xl border border-slate-600/30 dark:border-slate-600/20">
                <!-- Subtle Background Pattern -->
                <div class="absolute inset-0 opacity-5">
                  <div class="absolute top-4 left-10 w-16 h-16 border border-white/20 rounded-full"></div>
                  <div class="absolute bottom-4 right-10 w-12 h-12 bg-white/10 rounded-lg transform rotate-45"></div>
                  <div class="absolute top-1/2 left-1/4 w-8 h-8 border border-white/15 rounded-full"></div>
                </div>

                <div class="relative z-10 text-center px-6">
                  <h2 class="text-3xl sm:text-4xl font-bold text-white/95 dark:text-white/90 mb-4 leading-tight">
                    Ready to Integrate Collapsible?
                  </h2>

                  <p class="text-lg text-white/80 dark:text-white/70 max-w-2xl mx-auto mb-8 leading-relaxed font-light">
                    Experience the most comprehensive collapsible component for Angular with
                    all these features and more.
                  </p>

                  <!-- Documentation Link Button -->
                  <a
                    href="https://github.com/bhaimicrosoft/angular-superui/tree/main/docs/components/collapsible.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="group inline-flex items-center px-6 py-3 bg-white/95 dark:bg-white/90 text-slate-700 dark:text-slate-800 hover:text-slate-800 dark:hover:text-slate-900 font-semibold text-base rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:bg-white dark:hover:bg-white"
                  >
                    <lucide-angular [img]="CodeIcon" class="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300"></lucide-angular>
                    View Documentation
                    <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>

    <!-- Custom Animations -->
    <style>
      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }
      .animate-float {
        animation: float 3s ease-in-out infinite;
      }
      .animation-delay-1000 {
        animation-delay: 1s;
      }
      .animation-delay-2000 {
        animation-delay: 2s;
      }
    </style>
  `,
})
export class CollapsibleDemo {
  private seoService = inject(SEOService);

  // State tracking for chevron rotations
  collapsibleStates = {
    basicExample: signal(false),
    interactiveForm: signal(false),
    faq1: signal(false),
    faq2: signal(false),
    faq3: signal(false),
    userProfile: signal(false),
    creditCard: signal(false),
    paypal: signal(false)
  };

  // Lucide icons
  readonly ChevronDownIcon = ChevronDownIcon;
  readonly SettingsIcon = SettingsIcon;
  readonly HelpCircleIcon = HelpCircleIcon;
  readonly UserIcon = UserIcon;
  readonly BellIcon = BellIcon;
  readonly ShieldIcon = ShieldIcon;
  readonly CreditCardIcon = CreditCardIcon;
  readonly FileTextIcon = FileTextIcon;
  readonly CodeIcon = CodeIcon;
  readonly SparklesIcon = SparklesIcon;
  readonly HeartIcon = HeartIcon;

  constructor() {
    this.seoService.updateSEO({
      title: 'Collapsible Component - Interactive Showcase | Angular SuperUI',
      description: 'Discover elegant expandable content with the Collapsible component. Features smooth animations, accessibility support, and signal-based state management for Angular applications.',
      keywords: 'angular, collapsible, expandable, accordion, toggle, animation, component library, ui components, interactive content'
    });
  }
}
