import { Component, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUpload, FileUploadFile, FileUploadConfig, FileUploadError } from '@lib/file-upload';
import { ProgressComponent } from '@lib/progress';

@Component({
  selector: 'app-file-upload-demo',
  standalone: true,
  imports: [FileUpload, ProgressComponent, CommonModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50 dark:from-slate-950 dark:via-blue-950/50 dark:to-indigo-950">
      <!-- Hero Section -->
      <section class="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
        <!-- Background Animation -->
        <div class="absolute inset-0"></div>

        <!-- Floating Elements -->
        <div class="absolute inset-0 overflow-hidden">
          <div class="absolute -top-4 -left-4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div class="absolute top-1/2 -right-4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div class="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div class="relative container mx-auto px-6 py-24 lg:py-32">
          <div class="max-w-4xl mx-auto text-center">
            <!-- Badge -->
            <div class="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium mb-8">
              <svg class="w-4 h-4 mr-2 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              Premium File Upload Component
            </div>

            <!-- Main Heading -->
            <h1 class="text-5xl lg:text-7xl font-bold leading-tight mb-6">
              <span class="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                File Upload
              </span>
              <br>
              <span class="text-white/90">Reimagined</span>
            </h1>

            <!-- Subtitle -->
            <p class="text-xl lg:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              Experience the most advanced file upload component with stunning animations,
              drag-and-drop excellence, and beautiful progress tracking that your users will love.
            </p>

            <!-- Features Grid -->
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
              <div class="text-center">
                <div class="w-12 h-12 mx-auto mb-3 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <svg class="w-6 h-6 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                  </svg>
                </div>
                <h3 class="font-semibold text-white mb-1">Drag & Drop</h3>
                <p class="text-sm text-white/70">Intuitive interface</p>
              </div>
              <div class="text-center">
                <div class="w-12 h-12 mx-auto mb-3 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <svg class="w-6 h-6 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <h3 class="font-semibold text-white mb-1">Animated Progress</h3>
                <p class="text-sm text-white/70">Beautiful tracking</p>
              </div>
              <div class="text-center">
                <div class="w-12 h-12 mx-auto mb-3 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <svg class="w-6 h-6 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 class="font-semibold text-white mb-1">Validation</h3>
                <p class="text-sm text-white/70">Smart file checking</p>
              </div>
              <div class="text-center">
                <div class="w-12 h-12 mx-auto mb-3 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <svg class="w-6 h-6 text-pink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                </div>
                <h3 class="font-semibold text-white mb-1">Preview</h3>
                <p class="text-sm text-white/70">Instant previews</p>
              </div>
            </div>

            <!-- CTA -->
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <button class="px-8 py-4 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-white/90 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                Try Interactive Demo
              </button>
              <a href="https://github.com/bhaimicrosoft/angular-superui/blob/main/docs/components/file-upload.md"
                 target="_blank"
                 class="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-200">
                View Documentation
              </a>
            </div>
          </div>
        </div>

        <!-- Wave Separator -->
        <div class="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-12 lg:h-20">
            <path d="M0 100C240 50 480 0 720 50C960 100 1200 50 1440 100V0H0V100Z" fill="currentColor" class="text-slate-50 dark:text-slate-950"/>
          </svg>
        </div>
      </section>

      <!-- Main Content -->
      <div class="container mx-auto px-6 py-16 space-y-20">

        <!-- Interactive Progress Demo Section -->
        <section class="max-w-4xl mx-auto">
          <div class="text-center space-y-4 mb-12">
            <h2 class="text-4xl font-bold text-foreground">Interactive Progress Demo</h2>
            <p class="text-xl text-muted-foreground">Experience our beautiful animated progress bars in action</p>
          </div>

          <div class="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 border border-gray-200 dark:border-slate-700">
            <!-- File Upload Component -->
            <FileUpload
              #progressDemoUpload
              variant="default"
              size="lg"
              [config]="progressDemoConfig()"
              [disabled]="isDemoRunning()"
              (filesChanged)="onProgressDemoFilesChange($event)"
              (uploadProgress)="onProgressDemoUploadProgress($event)"
              (uploadComplete)="onProgressDemoUploadComplete($event)"
              (uploadError)="onProgressDemoUploadError($event)"
              (errorOccurred)="onError($event)"
            />

            <!-- Progress Visualization -->
            @if (progressDemoFiles().length > 0 && isDemoRunning()) {
              <div class="mt-8 space-y-4">
                <h4 class="font-semibold text-lg text-foreground mb-4">Upload Progress</h4>
                @for (file of progressDemoFiles(); track file.id) {
                  <div class="space-y-2">
                    <div class="flex justify-between items-center">
                      <span class="text-sm font-medium text-foreground">{{ file.name }}</span>
                      <span class="text-sm text-muted-foreground">{{ file.progress || 0 }}%</span>
                    </div>
                    <ProgressComponent
                      [value]="file.progress || 0"
                      [max]="100"
                      size="default"
                      variant="primary"
                      [animated]="'shimmer'"
                      [showText]="false"
                      className="transition-all duration-300"
                    />
                  </div>
                }
              </div>
            }

            <!-- Demo Controls -->
            <div class="mt-8 p-6 bg-gray-50 dark:bg-slate-800 rounded-2xl">
              <div class="flex flex-wrap gap-4 justify-center">
                <button
                  type="button"
                  class="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                  (click)="simulateProgressDemo()"
                  [disabled]="isDemoRunning() || progressDemoFiles().length === 0"
                >
                  {{ isDemoRunning() ? 'Demo Running...' : 'Start Progress Demo' }}
                </button>

                <button
                  type="button"
                  class="px-6 py-3 bg-gray-600 text-white font-semibold rounded-xl hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  (click)="resetProgressDemo()"
                  [disabled]="isDemoRunning()"
                >
                  Reset Demo
                </button>
              </div>

              <div class="mt-4 text-center">
                <p class="text-sm text-muted-foreground">
                  {{ progressDemoFiles().length === 0
                     ? 'Select files above to see the animated progress bars'
                     : progressDemoStatus() || 'Files ready for demo simulation' }}
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- Component Variants -->
        <section class="max-w-6xl mx-auto">
          <div class="text-center space-y-4 mb-12">
            <h2 class="text-3xl font-bold text-foreground">Component Variants</h2>
            <p class="text-lg text-muted-foreground">Multiple styles to fit your design perfectly</p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Default Variant -->
            <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-slate-700">
              <h3 class="text-lg font-semibold text-foreground mb-4">Default</h3>
              <FileUpload
                variant="default"
                [config]="basicConfig()"
                (filesChanged)="onBasicFilesChange($event)"
                (errorOccurred)="onError($event)"
              />
            </div>

            <!-- Compact Variant -->
            <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-slate-700">
              <h3 class="text-lg font-semibold text-foreground mb-4">Compact</h3>
              <FileUpload
                variant="compact"
                size="sm"
                [config]="basicConfig()"
                (filesChanged)="onCompactFilesChange($event)"
              />
            </div>

            <!-- Image Upload -->
            <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-slate-700">
              <h3 class="text-lg font-semibold text-foreground mb-4">Image Upload with Preview</h3>
              <FileUpload
                variant="default"
                [config]="imageConfig()"
                [showPreview]="true"
                (filesChanged)="onImageFilesChange($event)"
                (errorOccurred)="onError($event)"
              />
            </div>

            <!-- Document Upload -->
            <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-slate-700">
              <h3 class="text-lg font-semibold text-foreground mb-4">Document Upload</h3>
              <p class="text-sm text-muted-foreground mb-3">PDF, DOC, DOCX files only, max 5MB</p>
              <FileUpload
                variant="default"
                [config]="documentConfig()"
                [showPreview]="false"
                (filesChanged)="onDocumentFilesChange($event)"
                (errorOccurred)="onError($event)"
              />
            </div>
          </div>
        </section>

        <!-- Auto Upload Example -->
        <section class="max-w-4xl mx-auto">
          <div class="text-center space-y-4 mb-12">
            <h2 class="text-3xl font-bold text-foreground">Auto Upload</h2>
            <p class="text-lg text-muted-foreground">Files upload automatically when selected</p>
          </div>

          <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-slate-700">
            <FileUpload
              variant="default"
              [config]="autoUploadConfig()"
              (uploadProgress)="onUploadProgress($event)"
              (uploadComplete)="onUploadComplete($event)"
              (uploadError)="onUploadError($event)"
              (errorOccurred)="onError($event)"
            />

            @if (uploadStatus()) {
              <div class="mt-6 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <h4 class="font-medium text-blue-900 dark:text-blue-100 mb-2">Upload Status</h4>
                <p class="text-sm text-blue-800 dark:text-blue-200">{{ uploadStatus() }}</p>
              </div>
            }
          </div>
        </section>

        <!-- File Lists -->
        @if (selectedFiles().length > 0) {
          <section class="max-w-4xl mx-auto">
            <div class="text-center space-y-4 mb-12">
              <h2 class="text-3xl font-bold text-foreground">Selected Files</h2>
              <p class="text-lg text-muted-foreground">Current file selection</p>
            </div>

            <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-slate-700">
              <div class="space-y-4">
                @for (file of selectedFiles(); track file.id) {
                  <div class="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
                    <div class="flex items-center space-x-4">
                      <div class="w-3 h-3 rounded-full"
                           [class.bg-green-500]="file.status === 'success'"
                           [class.bg-yellow-500]="file.status === 'pending'"
                           [class.bg-blue-500]="file.status === 'uploading'"
                           [class.bg-red-500]="file.status === 'error'">
                      </div>
                      <div>
                        <span class="font-medium text-foreground">{{ file.name }}</span>
                        <span class="text-sm text-muted-foreground ml-2">({{ formatFileSize(file.size) }})</span>
                      </div>
                      <span class="text-xs px-3 py-1 rounded-full font-medium"
                            [ngClass]="{
                              'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300': file.status === 'success',
                              'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300': file.status === 'pending',
                              'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300': file.status === 'uploading',
                              'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300': file.status === 'error'
                            }">
                        {{ file.status }}
                      </span>
                    </div>
                    @if (file.progress !== undefined && file.status === 'uploading') {
                      <span class="text-sm font-medium text-muted-foreground">{{ file.progress }}%</span>
                    }
                  </div>
                }
              </div>
            </div>
          </section>
        }

        <!-- Error Display -->
        @if (lastError()) {
          <section class="max-w-4xl mx-auto">
            <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6">
              <div class="flex items-start space-x-3">
                <svg class="w-5 h-5 text-red-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                </svg>
                <div>
                  <h3 class="font-medium text-red-900 dark:text-red-100">Upload Error</h3>
                  <p class="text-sm text-red-800 dark:text-red-200 mt-1">{{ lastError()?.message }}</p>
                  @if (lastError()?.file) {
                    <p class="text-xs text-red-700 dark:text-red-300 mt-1">File: {{ lastError()?.file?.name }}</p>
                  }
                </div>
              </div>
            </div>
          </section>
        }

        <!-- Documentation Link -->
        <section class="max-w-4xl mx-auto text-center">
          <div class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl p-8 text-white">
            <h2 class="text-3xl font-bold mb-4">Ready to get started?</h2>
            <p class="text-lg mb-6 opacity-90">Check out our comprehensive documentation for implementation details, API reference, and advanced usage examples.</p>
            <a href="https://github.com/bhaimicrosoft/angular-superui/blob/main/docs/components/file-upload.md"
               target="_blank"
               class="inline-flex items-center px-8 py-4 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
              </svg>
              View Documentation
            </a>
          </div>
        </section>
      </div>
    </div>
  `,
})
export class FileUploadDemoComponent {
  @ViewChild('progressDemoUpload') progressDemoUpload!: FileUpload;

  readonly selectedFiles = signal<FileUploadFile[]>([]);
  readonly lastError = signal<FileUploadError | null>(null);
  readonly uploadStatus = signal<string>('');
  readonly progressDemoStatus = signal<string>('');
  readonly isDemoRunning = signal<boolean>(false);

  // Store reference to progress demo FileUpload component files for simulation
  protected progressDemoFiles = signal<FileUploadFile[]>([]);

  // Configuration signals
  readonly basicConfig = signal<FileUploadConfig>({
    multiple: true,
    maxFileSize: 5 * 1024 * 1024, // 5MB
    maxFiles: 3,
  });

  readonly imageConfig = signal<FileUploadConfig>({
    multiple: true,
    maxFileSize: 2 * 1024 * 1024, // 2MB
    maxFiles: 5,
    acceptedFileTypes: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
    allowPreview: true,
  });

  readonly documentConfig = signal<FileUploadConfig>({
    multiple: true,
    maxFileSize: 5 * 1024 * 1024, // 5MB
    maxFiles: 3,
    acceptedFileTypes: ['.pdf', '.doc', '.docx', '.txt'],
    allowPreview: false,
  });

  readonly multipleConfig = signal<FileUploadConfig>({
    multiple: true,
    maxFileSize: 10 * 1024 * 1024, // 10MB
    maxFiles: 3,
    acceptedFileTypes: ['.jpg', '.jpeg', '.png', '.pdf', '.doc', '.docx'],
    allowPreview: true,
  });

  readonly autoUploadConfig = signal<FileUploadConfig>({
    multiple: true,
    maxFileSize: 5 * 1024 * 1024, // 5MB
    maxFiles: 5,
    autoUpload: true,
    uploadUrl: '/api/mock-upload', // Mock URL for demo
    uploadHeaders: {
      'Authorization': 'Bearer demo-token',
    },
  });

  readonly progressDemoConfig = signal<FileUploadConfig>({
    multiple: true,
    maxFileSize: 10 * 1024 * 1024, // 10MB
    maxFiles: 5,
    autoUpload: false, // Manual upload for demo control
    allowPreview: true,
    uploadUrl: '/api/mock-upload', // Mock URL that will trigger our mock upload logic
  });

  onBasicFilesChange(files: FileUploadFile[]): void {
    console.log('Basic files changed:', files);
    this.updateSelectedFiles(files);
  }

  onCompactFilesChange(files: FileUploadFile[]): void {
    console.log('Compact files changed:', files);
  }

  onImageFilesChange(files: FileUploadFile[]): void {
    console.log('Image files changed:', files);
    this.updateSelectedFiles(files);
  }

  onDocumentFilesChange(files: FileUploadFile[]): void {
    console.log('Document files changed:', files);
    this.updateSelectedFiles(files);
  }

  onUploadProgress(event: { file: FileUploadFile; progress: number }): void {
    console.log('Upload progress:', event);
    this.uploadStatus.set(`Uploading ${event.file.name}: ${event.progress}%`);
  }

  onUploadComplete(file: FileUploadFile): void {
    console.log('Upload complete:', file);
    this.uploadStatus.set(`Successfully uploaded ${file.name}`);

    // Clear status after 3 seconds
    setTimeout(() => {
      this.uploadStatus.set('');
    }, 3000);
  }

  onUploadError(event: { file: FileUploadFile; error: string }): void {
    console.log('Upload error:', event);
    this.uploadStatus.set(`Failed to upload ${event.file.name}: ${event.error}`);
  }

  onError(error: FileUploadError): void {
    console.log('File upload error:', error);
    this.lastError.set(error);

    // Clear error after 5 seconds
    setTimeout(() => {
      this.lastError.set(null);
    }, 5000);
  }

  // Progress Demo Methods
  onProgressDemoFilesChange(files: FileUploadFile[]): void {
    console.log('Progress demo files changed:', files);
    // Keep a reference for tracking, but the real state is in the component
    this.progressDemoFiles.set(files);
    this.updateSelectedFiles(files);

    if (files.length > 0) {
      this.progressDemoStatus.set(`${files.length} files selected. Click "Start Progress Demo" to see the animated progress bar in action.`);
    } else {
      this.progressDemoStatus.set('');
    }
  }

  simulateProgressDemo(): void {
    if (!this.progressDemoUpload) {
      this.progressDemoStatus.set('Progress demo component not ready.');
      return;
    }

    const componentFiles = this.progressDemoUpload.files();
    if (componentFiles.length === 0) {
      this.progressDemoStatus.set('Please select files first to see the progress demo.');
      return;
    }

    this.isDemoRunning.set(true);
    this.progressDemoStatus.set('Starting upload demo...');

    // Update the progress demo files reference with the actual component files
    this.progressDemoFiles.set(componentFiles);

    // Simulate uploads for each file in the component
    componentFiles.forEach((file, index) => {
      setTimeout(() => {
        this.simulateFileProgress(file);
      }, index * 200); // Stagger start times
    });
  }

  private simulateFileProgress(file: FileUploadFile): void {
    if (!this.progressDemoUpload) return;

    // Start upload simulation by directly updating the component's file
    const componentFiles = this.progressDemoUpload.files();
    const fileIndex = componentFiles.findIndex(f => f.id === file.id);

    if (fileIndex === -1) return;

    // Update file status to uploading
    componentFiles[fileIndex].status = 'uploading';
    componentFiles[fileIndex].progress = 0;

    // Update the component's files signal
    this.progressDemoUpload.files.set([...componentFiles]);

    // Also update our local reference
    this.progressDemoFiles.set([...componentFiles]);

    // Simulate realistic upload progress
    const progressInterval = setInterval(() => {
      const currentFiles = this.progressDemoUpload.files();
      const currentFileIndex = currentFiles.findIndex(f => f.id === file.id);

      if (currentFileIndex === -1) {
        clearInterval(progressInterval);
        return;
      }

      const currentFile = currentFiles[currentFileIndex];
      if (currentFile.progress === undefined) currentFile.progress = 0;

      // Increment progress
      currentFile.progress += Math.random() * 12 + 3; // Random progress between 3-15%

      if (currentFile.progress >= 100) {
        currentFile.progress = 100;
        currentFile.status = 'success';
        clearInterval(progressInterval);

        // Update the component's files signal
        this.progressDemoUpload.files.set([...currentFiles]);

        // Update our local reference
        this.progressDemoFiles.set([...currentFiles]);

        // Trigger upload complete event
        this.onProgressDemoUploadComplete(currentFile);
      } else {
        // Update the component's files signal to trigger UI updates
        this.progressDemoUpload.files.set([...currentFiles]);

        // Update our local reference
        this.progressDemoFiles.set([...currentFiles]);

        // Trigger progress event
        this.onProgressDemoUploadProgress({ file: currentFile, progress: currentFile.progress });
      }
    }, 150 + Math.random() * 100); // Random interval between 150-250ms
  }

  onProgressDemoUploadProgress(event: { file: FileUploadFile; progress: number }): void {
    console.log('Progress demo upload progress:', event);
    this.progressDemoStatus.set(`Uploading ${event.file.name}: ${event.progress}%`);
  }

  onProgressDemoUploadComplete(file: FileUploadFile): void {
    console.log('Progress demo upload complete:', file);
    this.progressDemoStatus.set(`Successfully uploaded ${file.name}`);

    // Check if all files are complete
    const allFiles = this.progressDemoFiles();
    const allComplete = allFiles.every(f => f.status === 'success');
    if (allComplete) {
      setTimeout(() => {
        this.isDemoRunning.set(false);
        this.progressDemoStatus.set(`All ${allFiles.length} files uploaded successfully! 🎉`);
      }, 500);
    }
  }

  onProgressDemoUploadError(event: { file: FileUploadFile; error: string }): void {
    console.log('Progress demo upload error:', event);
    this.progressDemoStatus.set(`Failed to upload ${event.file.name}: ${event.error}`);
    this.isDemoRunning.set(false);
  }  resetProgressDemo(): void {
    this.isDemoRunning.set(false);
    this.progressDemoStatus.set('');

    if (!this.progressDemoUpload) return;

    // Reset all files in the component to pending status
    const componentFiles = this.progressDemoUpload.files();
    componentFiles.forEach(file => {
      file.status = 'pending';
      file.progress = undefined;
      file.error = undefined;
    });

    // Update the component's files signal to trigger UI changes
    this.progressDemoUpload.files.set([...componentFiles]);

    if (componentFiles.length > 0) {
      this.progressDemoStatus.set(`Demo reset. ${componentFiles.length} files ready for simulation.`);
    }
  }

  private updateSelectedFiles(files: FileUploadFile[]): void {
    this.selectedFiles.set(files);
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}
