import {
  Component,
  input,
  output,
  signal,
  computed,
  effect,
  ViewChild,
  ElementRef,
  OnDestroy,
  OnInit,
  ChangeDetectionStrategy,
  inject,
  PLATFORM_ID
} from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

/**
 * File upload component variants using Class Variance Authority (CVA)
 * Provides consistent styling patterns with Tailwind CSS
 *
 * Variants:
 * - default: Standard file upload with drag-and-drop
 * - compact: Smaller version for tight spaces
 * - inline: Inline file picker without drop zone
 * - minimal: Clean minimal design
 */
const fileUploadVariants = cva(
  [
    'relative overflow-hidden rounded-lg transition-all duration-200',
    'focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
    'border-2 border-dashed transition-colors duration-200',
  ],
  {
    variants: {
      variant: {
        default: [
          'border-border bg-background hover:border-primary/50',
          'p-6 text-center cursor-pointer',
          'hover:bg-muted/50 transition-all duration-200',
        ],
        compact: [
          'border-border bg-background hover:border-primary/50',
          'p-4 text-center cursor-pointer',
          'hover:bg-muted/50 transition-all duration-200',
        ],
        inline: [
          'border-transparent bg-transparent p-0',
          'hover:bg-transparent cursor-pointer',
        ],
        minimal: [
          'border-border bg-transparent hover:border-primary/30',
          'p-3 cursor-pointer',
          'hover:bg-muted/30 transition-all duration-200',
        ],
      },
      state: {
        default: '',
        dragOver: [
          'border-primary bg-primary/5',
          'scale-[1.02] shadow-lg shadow-primary/20',
        ],
        error: [
          'border-destructive bg-destructive/5',
          'shadow-sm shadow-destructive/20',
        ],
        success: [
          'border-success bg-success/5',
          'shadow-sm shadow-success/20',
        ],
        disabled: [
          'opacity-50 cursor-not-allowed',
          'pointer-events-none',
        ],
      },
      size: {
        sm: 'min-h-24',
        md: 'min-h-32',
        lg: 'min-h-40',
        xl: 'min-h-48',
      },
    },
    defaultVariants: {
      variant: 'default',
      state: 'default',
      size: 'md',
    },
  }
);

export interface FileUploadFile {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  status: 'pending' | 'uploading' | 'success' | 'error';
  progress?: number;
  error?: string;
  preview?: string;
  url?: string;
}

export interface FileUploadConfig {
  maxFiles?: number;
  maxFileSize?: number; // in bytes
  acceptedFileTypes?: string[];
  allowPreview?: boolean;
  multiple?: boolean;
  autoUpload?: boolean;
  uploadUrl?: string;
  uploadHeaders?: Record<string, string>;
}

export interface FileUploadError {
  type: 'file-too-large' | 'invalid-file-type' | 'too-many-files' | 'upload-failed' | 'network-error';
  message: string;
  file?: File;
}

export type FileUploadVariantProps = VariantProps<typeof fileUploadVariants>;

@Component({
  selector: 'FileUpload',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fileItem', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px) scale(0.95)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0) scale(1)' })),
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0, transform: 'translateX(20px) scale(0.95)' })),
      ]),
    ]),
    trigger('dragState', [
      state('default', style({ transform: 'scale(1)' })),
      state('dragOver', style({ transform: 'scale(1.02)' })),
      transition('default <=> dragOver', animate('200ms ease-out')),
    ]),
    trigger('upload', [
      transition('* => uploading', [
        animate('300ms ease-out', keyframes([
          style({ transform: 'scale(1)', opacity: 1, offset: 0 }),
          style({ transform: 'scale(1.05)', opacity: 0.8, offset: 0.5 }),
          style({ transform: 'scale(1)', opacity: 1, offset: 1 }),
        ])),
      ]),
    ]),
    trigger('progressBar', [
      state('hidden', style({
        opacity: 0,
        transform: 'scaleX(0)',
        transformOrigin: 'left'
      })),
      state('visible', style({
        opacity: 1,
        transform: 'scaleX(1)',
        transformOrigin: 'left'
      })),
      transition('hidden => visible', [
        animate('200ms ease-out')
      ]),
      transition('visible => hidden', [
        animate('150ms ease-in')
      ]),
    ]),
    trigger('progressGlow', [
      state('inactive', style({
        boxShadow: '0 0 0px rgba(59, 130, 246, 0)'
      })),
      state('active', style({
        boxShadow: '0 0 20px rgba(59, 130, 246, 0.6)'
      })),
      transition('inactive <=> active', [
        animate('300ms ease-in-out')
      ]),
    ]),
  ],
  template: `
    <div
      #dropZone
      [class]="containerClasses()"
      [@dragState]="dragState()"
      (click)="onZoneClick($event)"
      (dragover)="onDragOver($event)"
      (dragleave)="onDragLeave($event)"
      (drop)="onDrop($event)"
      [attr.aria-label]="ariaLabel()"
      [attr.aria-describedby]="id() + '-description'"
      role="button"
      tabindex="0"
      (keydown.enter)="onZoneClick($event)"
      (keydown.space)="onZoneClick($event)"
    >
      <!-- Hidden file input -->
      <input
        #fileInput
        type="file"
        class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        [accept]="acceptString()"
        [multiple]="config().multiple"
        [disabled]="disabled()"
        (change)="onFileSelect($event)"
        (click)="onInputClick($event)"
        [attr.aria-describedby]="id() + '-description'"
      />

      <!-- Upload Zone Content -->
      <div class="flex flex-col items-center justify-center space-y-3">
        @if (variant() !== 'inline') {
          <!-- Upload Icon -->
          <div class="flex items-center justify-center w-12 h-12 rounded-full bg-muted">
            @if (isDragOver()) {
              <svg class="w-6 h-6 text-primary animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
              </svg>
            } @else if (hasError()) {
              <svg class="w-6 h-6 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.732 15.5c-.77.833.192 2.5 1.732 2.5z"/>
              </svg>
            } @else {
              <svg class="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
              </svg>
            }
          </div>

          <!-- Upload Text -->
          <div class="text-center">
            @if (isDragOver()) {
              <p class="text-sm font-medium text-primary">Drop files here</p>
            } @else if (hasError()) {
              <p class="text-sm font-medium text-destructive">{{ lastError()?.message }}</p>
            } @else {
              <p class="text-sm font-medium text-foreground">
                {{ uploadText() }}
              </p>
              <p class="text-xs text-muted-foreground mt-1">
                {{ supportText() }}
              </p>
            }
          </div>
        } @else {
          <!-- Inline variant -->
          <div class="flex items-center space-x-2">
            <svg class="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"/>
            </svg>
            <span class="text-sm text-primary font-medium">Choose files</span>
          </div>
        }
      </div>
    </div>

    <!-- Global Upload Progress Bar -->
    @if (isUploading() || uploadStatusText()) {
      <div class="mt-4 space-y-3">
        <!-- Progress Bar Container -->
        <div class="relative">
          <div class="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div
              [@progressBar]="progressBarState()"
              [@progressGlow]="progressGlowState()"
              class="h-full bg-gradient-to-r from-primary via-blue-500 to-primary rounded-full transition-all duration-300 ease-out relative overflow-hidden"
              [style.width.%]="totalProgress()"
            >
              <!-- Animated shine effect -->
              <div class="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-pulse"></div>
              <!-- Animated progress shimmer -->
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
            </div>
          </div>

          <!-- Progress percentage badge -->
          @if (totalProgress() > 0) {
            <div class="absolute -top-8 right-0 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full shadow-lg">
              {{ totalProgress() }}%
            </div>
          }
        </div>

        <!-- Upload Status Text -->
        @if (uploadStatusText()) {
          <div class="flex items-center justify-between text-sm">
            <span class="text-muted-foreground">{{ uploadStatusText() }}</span>
            @if (isUploading()) {
              <div class="flex items-center space-x-2 text-primary">
                <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span class="font-medium">Uploading...</span>
              </div>
            }
          </div>
        }
      </div>
    }

    <!-- File List -->
    @if (files().length > 0) {
      <div class="mt-4 space-y-2">
        @for (file of files(); track file.id) {
          <div
            [@fileItem]
            class="flex items-center justify-between p-3 rounded-md border bg-card"
            [class.border-destructive]="file.status === 'error'"
            [class.border-success]="file.status === 'success'"
          >
            <div class="flex items-center space-x-3 flex-1 min-w-0">
              <!-- File Preview/Icon -->
              <div class="flex-shrink-0">
                @if (file.preview && showPreview()) {
                  <img
                    [src]="file.preview"
                    [alt]="file.name"
                    class="w-10 h-10 rounded object-cover border"
                  />
                } @else {
                  <div class="w-10 h-10 rounded bg-muted flex items-center justify-center">
                    <svg class="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                  </div>
                }
              </div>

              <!-- File Info -->
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-foreground truncate">{{ file.name }}</p>
                <div class="flex items-center space-x-2 text-xs text-muted-foreground">
                  <span>{{ formatFileSize(file.size) }}</span>
                  @if (file.status === 'error' && file.error) {
                    <span class="text-destructive">• {{ file.error }}</span>
                  }
                </div>

                <!-- Progress Bar -->
                @if (file.status === 'uploading' && file.progress !== undefined) {
                  <div class="mt-2 w-full bg-muted rounded-full h-1">
                    <div
                      class="bg-primary h-1 rounded-full transition-all duration-300"
                      [style.width.%]="file.progress"
                    ></div>
                  </div>
                }
              </div>

              <!-- Status Icon -->
              <div class="flex-shrink-0">
                @switch (file.status) {
                  @case ('uploading') {
                    <svg class="w-4 h-4 text-primary animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  }
                  @case ('success') {
                    <svg class="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                  }
                  @case ('error') {
                    <svg class="w-4 h-4 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  }
                }
              </div>
            </div>

            <!-- Remove Button -->
            <button
              type="button"
              class="ml-3 flex-shrink-0 p-1 rounded hover:bg-muted transition-colors duration-200"
              [disabled]="file.status === 'uploading'"
              (click)="removeFile(file.id)"
              [attr.aria-label]="'Remove ' + file.name"
            >
              <svg class="w-4 h-4 text-muted-foreground hover:text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        }
      </div>
    }

    <!-- Error Messages -->
    @if (errors().length > 0) {
      <div class="mt-3 space-y-1">
        @for (error of errors(); track error) {
          <p class="text-xs text-destructive">{{ error.message }}</p>
        }
      </div>
    }

    <!-- Description -->
    <div [id]="id() + '-description'" class="sr-only">
      {{ ariaDescription() }}
    </div>
  `,
})
export class FileUpload implements OnInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly http = inject(HttpClient);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly uploadSubscriptions = new Map<string, Subscription>();

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('dropZone') dropZone!: ElementRef<HTMLDivElement>;

  // Input signals
  readonly variant = input<FileUploadVariantProps['variant']>('default');
  readonly size = input<FileUploadVariantProps['size']>('md');
  readonly config = input<FileUploadConfig>({});
  readonly disabled = input<boolean>(false);
  readonly placeholder = input<string>('');
  readonly showPreview = input<boolean>(true);
  readonly id = input<string>(`file-upload-${Math.random().toString(36).substr(2, 9)}`);

  // Output signals
  readonly filesChanged = output<FileUploadFile[]>();
  readonly fileAdded = output<FileUploadFile>();
  readonly fileRemoved = output<FileUploadFile>();
  readonly uploadProgress = output<{ file: FileUploadFile; progress: number }>();
  readonly uploadComplete = output<FileUploadFile>();
  readonly uploadError = output<{ file: FileUploadFile; error: string }>();
  readonly errorOccurred = output<FileUploadError>();

  // State signals
  readonly files = signal<FileUploadFile[]>([]);
  readonly errors = signal<FileUploadError[]>([]);
  readonly isDragOver = signal<boolean>(false);
  readonly isUploading = signal<boolean>(false);

  // Computed signals
  readonly lastError = computed(() => {
    const errs = this.errors();
    return errs.length > 0 ? errs[errs.length - 1] : null;
  });

  readonly hasError = computed(() => this.errors().length > 0);

  readonly dragState = computed(() => this.isDragOver() ? 'dragOver' : 'default');

  readonly acceptString = computed(() => {
    const acceptedTypes = this.config().acceptedFileTypes;
    return acceptedTypes?.join(',') || '';
  });

  readonly uploadText = computed(() => {
    if (this.placeholder()) return this.placeholder();
    const config = this.config();
    if (config.multiple) {
      return 'Click to upload files or drag and drop';
    }
    return 'Click to upload a file or drag and drop';
  });

  readonly supportText = computed(() => {
    const config = this.config();
    const parts: string[] = [];

    if (config.acceptedFileTypes?.length) {
      const types = config.acceptedFileTypes.map(type => type.replace(/\./g, '').toUpperCase());
      parts.push(types.join(', '));
    }

    if (config.maxFileSize) {
      parts.push(`up to ${this.formatFileSize(config.maxFileSize)}`);
    }

    if (config.maxFiles && config.maxFiles > 1) {
      parts.push(`max ${config.maxFiles} files`);
    }

    return parts.length > 0 ? parts.join(' • ') : '';
  });

  readonly ariaLabel = computed(() => {
    const config = this.config();
    if (config.multiple) {
      return 'Upload multiple files';
    }
    return 'Upload file';
  });

  readonly ariaDescription = computed(() => {
    const config = this.config();
    const parts: string[] = [];

    parts.push('Click or drag and drop to upload');

    if (config.acceptedFileTypes?.length) {
      parts.push(`Accepted formats: ${config.acceptedFileTypes.join(', ')}`);
    }

    if (config.maxFileSize) {
      parts.push(`Maximum file size: ${this.formatFileSize(config.maxFileSize)}`);
    }

    if (config.maxFiles) {
      parts.push(`Maximum files: ${config.maxFiles}`);
    }

    return parts.join('. ');
  });

  readonly containerClasses = computed(() => {
    let state: FileUploadVariantProps['state'] = 'default';

    if (this.disabled()) {
      state = 'disabled';
    } else if (this.isDragOver()) {
      state = 'dragOver';
    } else if (this.hasError()) {
      state = 'error';
    } else if (this.files().some(f => f.status === 'success')) {
      state = 'success';
    }

    return cn(
      fileUploadVariants({
        variant: this.variant(),
        state,
        size: this.size(),
      })
    );
  });

  // Progress calculations
  readonly uploadingFiles = computed(() => this.files().filter(f => f.status === 'uploading'));

  readonly completedFiles = computed(() => this.files().filter(f => f.status === 'success'));

  readonly totalProgress = computed(() => {
    const allFiles = this.files();
    if (allFiles.length === 0) return 0;

    const totalProgress = allFiles.reduce((sum, file) => {
      if (file.status === 'success') return sum + 100;
      if (file.status === 'uploading' && file.progress !== undefined) return sum + file.progress;
      return sum;
    }, 0);

    return Math.round(totalProgress / allFiles.length);
  });

  readonly progressBarState = computed(() => this.isUploading() ? 'visible' : 'hidden');

  readonly progressGlowState = computed(() => this.isUploading() ? 'active' : 'inactive');

  readonly uploadStatusText = computed(() => {
    const uploading = this.uploadingFiles().length;
    const completed = this.completedFiles().length;
    const total = this.files().length;

    if (uploading > 0) {
      return `Uploading ${uploading} of ${total} files... ${this.totalProgress()}%`;
    } else if (completed > 0 && completed === total) {
      return `Successfully uploaded ${completed} files`;
    }

    return '';
  });

  private dragCounter = 0;

  constructor() {
    // Effect to emit files changed
    effect(() => {
      this.filesChanged.emit(this.files());
    });

    // Effect to auto-upload files if configured
    effect(() => {
      if (this.config().autoUpload) {
        const pendingFiles = this.files().filter(f => f.status === 'pending');
        pendingFiles.forEach(file => this.uploadFile(file));
      }
    });
  }

  ngOnInit(): void {
    this.setupDragAndDrop();
  }

  ngOnDestroy(): void {
    this.cleanup();
  }

  private setupDragAndDrop(): void {
    if (!this.isBrowser) return;

    // Prevent default drag behaviors on document
    document.addEventListener('dragenter', this.preventDefaults, false);
    document.addEventListener('dragover', this.preventDefaults, false);
    document.addEventListener('dragleave', this.preventDefaults, false);
    document.addEventListener('drop', this.preventDefaults, false);
  }

  private cleanup(): void {
    if (!this.isBrowser) return;

    // Clean up upload subscriptions
    this.uploadSubscriptions.forEach(subscription => subscription.unsubscribe());
    this.uploadSubscriptions.clear();

    document.removeEventListener('dragenter', this.preventDefaults, false);
    document.removeEventListener('dragover', this.preventDefaults, false);
    document.removeEventListener('dragleave', this.preventDefaults, false);
    document.removeEventListener('drop', this.preventDefaults, false);

    // Revoke object URLs to prevent memory leaks
    this.files().forEach(file => {
      if (file.preview) {
        URL.revokeObjectURL(file.preview);
      }
    });
  }

  private preventDefaults = (e: Event): void => {
    e.preventDefault();
    e.stopPropagation();
  };

  onZoneClick(event?: Event): void {
    if (this.disabled()) return;

    // Prevent the event from bubbling to the hidden input
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.fileInput.nativeElement.click();
  }

  onInputClick(event: Event): void {
    // Allow the input to handle its own clicks, but prevent bubbling
    event.stopPropagation();
  }

  onDragOver(event: DragEvent): void {
    this.preventDefaults(event);
    if (this.disabled()) return;

    this.dragCounter++;
    this.isDragOver.set(true);
    this.clearErrors();
  }

  onDragLeave(event: DragEvent): void {
    this.preventDefaults(event);
    if (this.disabled()) return;

    this.dragCounter--;
    if (this.dragCounter === 0) {
      this.isDragOver.set(false);
    }
  }

  onDrop(event: DragEvent): void {
    this.preventDefaults(event);
    if (this.disabled()) return;

    this.dragCounter = 0;
    this.isDragOver.set(false);

    const files = Array.from(event.dataTransfer?.files || []);
    this.handleFiles(files);
  }

  onFileSelect(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = Array.from(target.files || []);
    this.handleFiles(files);

    // Reset input to allow selecting the same file again
    target.value = '';
  }

  private handleFiles(fileList: File[]): void {
    this.clearErrors();

    const config = this.config();
    let validFiles: File[] = [];

    // Validate file count
    if (config.maxFiles) {
      const currentFileCount = this.files().length;
      const totalFiles = currentFileCount + fileList.length;

      if (totalFiles > config.maxFiles) {
        this.addError({
          type: 'too-many-files',
          message: `Cannot upload more than ${config.maxFiles} files. Please remove some files first.`,
        });
        return;
      }
    }

    // Validate each file
    for (const file of fileList) {
      const validation = this.validateFile(file);
      if (validation.valid) {
        validFiles.push(file);
      } else {
        this.addError({
          type: validation.errorType!,
          message: validation.errorMessage!,
          file,
        });
      }
    }

    // Add valid files
    if (validFiles.length > 0) {
      const uploadFiles = validFiles.map(file => this.createFileUploadFile(file));

      if (!config.multiple) {
        // Replace existing files for single file mode
        this.files.set(uploadFiles.slice(0, 1));
      } else {
        // Add to existing files for multiple mode
        this.files.update(current => [...current, ...uploadFiles]);
      }

      uploadFiles.forEach(file => this.fileAdded.emit(file));
    }
  }

  private validateFile(file: File): { valid: boolean; errorType?: FileUploadError['type']; errorMessage?: string } {
    const config = this.config();

    // Check file size
    if (config.maxFileSize && file.size > config.maxFileSize) {
      return {
        valid: false,
        errorType: 'file-too-large',
        errorMessage: `File "${file.name}" is too large. Maximum size is ${this.formatFileSize(config.maxFileSize)}.`,
      };
    }

    // Check file type
    if (config.acceptedFileTypes?.length) {
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      const mimeType = file.type.toLowerCase();

      const isValidType = config.acceptedFileTypes.some(acceptedType => {
        const accepted = acceptedType.toLowerCase();
        return accepted === fileExtension || accepted === mimeType || (accepted.endsWith('/*') && mimeType.startsWith(accepted.slice(0, -1)));
      });

      if (!isValidType) {
        return {
          valid: false,
          errorType: 'invalid-file-type',
          errorMessage: `File "${file.name}" has an invalid format. Accepted formats: ${config.acceptedFileTypes.join(', ')}.`,
        };
      }
    }

    return { valid: true };
  }

  private createFileUploadFile(file: File): FileUploadFile {
    const fileUpload: FileUploadFile = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'pending',
    };

    // Create preview for images
    if (this.showPreview() && file.type.startsWith('image/')) {
      fileUpload.preview = URL.createObjectURL(file);
    }

    return fileUpload;
  }

  removeFile(fileId: string): void {
    const fileToRemove = this.files().find(f => f.id === fileId);
    if (fileToRemove) {
      // Cancel ongoing upload if it exists
      const subscription = this.uploadSubscriptions.get(fileId);
      if (subscription) {
        subscription.unsubscribe();
        this.uploadSubscriptions.delete(fileId);
      }

      // Revoke object URL if it exists
      if (fileToRemove.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }

      this.files.update(current => current.filter(f => f.id !== fileId));
      this.fileRemoved.emit(fileToRemove);

      // Check if all uploads are complete after removing this file
      this.checkUploadingComplete();
    }
  }

  private async uploadFile(file: FileUploadFile): Promise<void> {
    const config = this.config();
    if (!config.uploadUrl) return;

    this.updateFileStatus(file.id, 'uploading', 0);
    this.isUploading.set(true);

    try {
      const formData = new FormData();
      formData.append('file', file.file);

      // Create HTTP request with progress reporting
      const headers = config.uploadHeaders ? new HttpHeaders(config.uploadHeaders) : undefined;
      const request = new HttpRequest('POST', config.uploadUrl, formData, {
        reportProgress: true,
        headers: headers
      });

      // Subscribe to the HTTP request and store subscription for cleanup
      const subscription = this.http.request(request).subscribe({
        next: (event) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              if (event.total) {
                const progress = Math.round((event.loaded / event.total) * 100);
                this.updateFileProgress(file.id, progress);
                this.uploadProgress.emit({ file, progress });
              }
              break;

            case HttpEventType.Response:
              // Upload completed successfully
              let response: any = {};
              try {
                response = event.body || {};
              } catch {
                // Response handling error
              }

              this.updateFileStatus(file.id, 'success');
              this.updateFileUrl(file.id, response.url || response.data?.url);
              this.uploadComplete.emit(file);
              this.checkUploadingComplete();

              // Clean up subscription
              this.uploadSubscriptions.delete(file.id);
              break;
          }
        },
        error: (error) => {
          let errorMessage = 'Upload failed';

          if (error.status) {
            errorMessage = `Upload failed: ${error.statusText || error.message}`;
          } else if (error.message) {
            errorMessage = `Upload failed: ${error.message}`;
          } else {
            errorMessage = 'Network error occurred during upload';
          }

          this.updateFileStatus(file.id, 'error', undefined, errorMessage);
          this.uploadError.emit({ file, error: errorMessage });
          this.checkUploadingComplete();

          // Clean up subscription
          this.uploadSubscriptions.delete(file.id);
        }
      });

      // Store subscription for potential cleanup
      this.uploadSubscriptions.set(file.id, subscription);

    } catch (error) {
      const errorMessage = `Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`;
      this.updateFileStatus(file.id, 'error', undefined, errorMessage);
      this.uploadError.emit({ file, error: errorMessage });
      this.checkUploadingComplete();
    }
  }

  private updateFileStatus(fileId: string, status: FileUploadFile['status'], progress?: number, error?: string): void {
    this.files.update(current =>
      current.map(f =>
        f.id === fileId
          ? { ...f, status, progress, error }
          : f
      )
    );
  }

  private updateFileProgress(fileId: string, progress: number): void {
    this.files.update(current =>
      current.map(f =>
        f.id === fileId
          ? { ...f, progress }
          : f
      )
    );
  }

  private updateFileUrl(fileId: string, url?: string): void {
    this.files.update(current =>
      current.map(f =>
        f.id === fileId
          ? { ...f, url }
          : f
      )
    );
  }

  private checkUploadingComplete(): void {
    const hasUploadingFiles = this.files().some(f => f.status === 'uploading');
    if (!hasUploadingFiles) {
      this.isUploading.set(false);
    }
  }

  private addError(error: FileUploadError): void {
    this.errors.update(current => [...current, error]);
    this.errorOccurred.emit(error);
  }

  private clearErrors(): void {
    this.errors.set([]);
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Public methods for programmatic control
  uploadAllFiles(): void {
    const pendingFiles = this.files().filter(f => f.status === 'pending');
    pendingFiles.forEach(file => this.uploadFile(file));
  }

  clearAllFiles(): void {
    // Revoke object URLs
    this.files().forEach(file => {
      if (file.preview) {
        URL.revokeObjectURL(file.preview);
      }
    });

    this.files.set([]);
    this.clearErrors();
  }

  retryFailedUploads(): void {
    const failedFiles = this.files().filter(f => f.status === 'error');
    failedFiles.forEach(file => {
      this.updateFileStatus(file.id, 'pending');
      this.uploadFile(file);
    });
  }
}
