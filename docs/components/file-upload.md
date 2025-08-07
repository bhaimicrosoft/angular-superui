# FileUpload Component

A comprehensive, feature-rich file upload component with drag-and-drop support, progress tracking, file validation, and beautiful animations. Built with Angular signals and modern web standards.

## Overview

The FileUpload component provides an intuitive and powerful way to handle file uploads in your Angular applications. It features:

- 🎯 **Drag & Drop Support** - Intuitive drag-and-drop interface
- 📊 **Progress Tracking** - Real-time upload progress with beautiful animations
- ✅ **File Validation** - Comprehensive file type and size validation
- 🖼️ **Image Previews** - Automatic image thumbnail generation
- 🎨 **Multiple Variants** - Default, compact, inline, and minimal styles
- 🔄 **Auto Upload** - Optional automatic upload on file selection
- 🌐 **HttpClient Integration** - Uses Angular's HttpClient for modern, interceptor-compatible uploads
- ♿ **Accessibility** - Full keyboard navigation and screen reader support
- 🎭 **Theming** - Fully customizable with Tailwind CSS and dark mode support

## Installation

### Using NGSUI CLI (Recommended)

```bash
npx ngsui add file-upload
```

The CLI will automatically:

- Install the FileUpload component
- Install the Progress component (dependency)
- Configure `provideHttpClient()` in your `app.config.ts`
- Import required modules
- Set up styling

### Manual Installation

```bash
npm install angular-superui
```

## Dependencies

The FileUpload component requires the following dependencies:

| Dependency | Purpose | Auto-installed |
|------------|---------|----------------|
| `@angular/common/http` | HTTP requests for file uploads | ✅ |
| `@angular/animations` | Smooth animations and transitions | ✅ |
| `rxjs` | Reactive programming for upload handling | ✅ |
| `class-variance-authority` | Type-safe variant styling | ✅ |
| `ProgressComponent` | Enhanced progress bars (from this library) | ✅ |

**Note:** When using the NGSUI CLI, the Progress component will be automatically installed as a dependency, and `provideHttpClient()` will be configured in your `app.config.ts` file.

## Basic Usage

### Import the Component

```typescript
import { FileUpload } from 'angular-superui';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [FileUpload],
  template: `
    <FileUpload
      [config]="uploadConfig"
      (filesChanged)="onFilesChanged($event)"
      (uploadComplete)="onUploadComplete($event)"
    />
  `
})
export class ExampleComponent {
  uploadConfig = {
    multiple: true,
    maxFileSize: 5 * 1024 * 1024, // 5MB
    maxFiles: 3
  };

  onFilesChanged(files: FileUploadFile[]) {
    console.log('Files selected:', files);
  }

  onUploadComplete(file: FileUploadFile) {
    console.log('Upload completed:', file);
  }
}
```

## Configuration Options

### FileUploadConfig

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `multiple` | `boolean` | `false` | Allow multiple file selection |
| `maxFiles` | `number` | `undefined` | Maximum number of files allowed |
| `maxFileSize` | `number` | `undefined` | Maximum file size in bytes |
| `acceptedFileTypes` | `string[]` | `undefined` | Allowed file types (extensions or MIME types) |
| `allowPreview` | `boolean` | `true` | Show image previews |
| `autoUpload` | `boolean` | `false` | Automatically upload files when selected |
| `uploadUrl` | `string` | `undefined` | Server endpoint for file uploads |
| `uploadHeaders` | `Record<string, string>` | `undefined` | HTTP headers for upload requests |

### Component Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'default' \| 'compact' \| 'inline' \| 'minimal'` | `'default'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Component size |
| `config` | `FileUploadConfig` | `{}` | Configuration options |
| `disabled` | `boolean` | `false` | Disable the component |
| `placeholder` | `string` | `''` | Custom placeholder text |
| `showPreview` | `boolean` | `true` | Show file previews |
| `id` | `string` | auto-generated | Component ID for accessibility |

## API Reference

### Inputs

| Input | Type | Description |
|-------|------|-------------|
| `variant` | `FileUploadVariant` | Component visual style |
| `size` | `FileUploadSize` | Component size |
| `config` | `FileUploadConfig` | Upload configuration |
| `disabled` | `boolean` | Disabled state |
| `placeholder` | `string` | Custom placeholder text |
| `showPreview` | `boolean` | Show image previews |
| `id` | `string` | Component identifier |

### Outputs

| Output | Type | Description |
|--------|------|-------------|
| `filesChanged` | `FileUploadFile[]` | Emitted when file selection changes |
| `fileAdded` | `FileUploadFile` | Emitted when a file is added |
| `fileRemoved` | `FileUploadFile` | Emitted when a file is removed |
| `uploadProgress` | `{file: FileUploadFile, progress: number}` | Upload progress updates |
| `uploadComplete` | `FileUploadFile` | Upload completion |
| `uploadError` | `{file: FileUploadFile, error: string}` | Upload errors |
| `errorOccurred` | `FileUploadError` | Validation or system errors |

### Public Methods

| Method | Parameters | Description |
|--------|------------|-------------|
| `uploadAllFiles()` | none | Manually trigger upload for all pending files |
| `clearAllFiles()` | none | Remove all files and clear the component |
| `retryFailedUploads()` | none | Retry uploading failed files |
| `removeFile(fileId: string)` | `fileId: string` | Remove a specific file |

### Interfaces

#### FileUploadFile

```typescript
interface FileUploadFile {
  id: string;                    // Unique identifier
  file: File;                    // Native File object
  name: string;                  // File name
  size: number;                  // File size in bytes
  type: string;                  // MIME type
  status: 'pending' | 'uploading' | 'success' | 'error';
  progress?: number;             // Upload progress (0-100)
  error?: string;                // Error message if upload fails
  preview?: string;              // Preview URL for images
  url?: string;                  // Final URL after upload
}
```

#### FileUploadError

```typescript
interface FileUploadError {
  type: 'file-too-large' | 'invalid-file-type' | 'too-many-files' | 'upload-failed' | 'network-error';
  message: string;               // Human-readable error message
  file?: File;                   // Associated file (if applicable)
}
```

## Examples

### Basic File Upload

```typescript
import { Component, signal } from '@angular/core';
import { FileUpload, FileUploadFile } from 'angular-superui';

@Component({
  selector: 'app-basic-upload',
  standalone: true,
  imports: [FileUpload],
  template: `
    <FileUpload
      variant="default"
      [config]="basicConfig()"
      (filesChanged)="onFilesChanged($event)"
      (errorOccurred)="onError($event)"
    />
  `
})
export class BasicUploadComponent {
  readonly basicConfig = signal({
    multiple: true,
    maxFileSize: 5 * 1024 * 1024, // 5MB
    maxFiles: 3,
  });

  onFilesChanged(files: FileUploadFile[]) {
    console.log('Selected files:', files);
  }

  onError(error: FileUploadError) {
    console.error('Upload error:', error);
  }
}
```

### Image Upload with Previews

```typescript
import { Component, signal } from '@angular/core';
import { FileUpload, FileUploadFile } from 'angular-superui';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [FileUpload],
  template: `
    <FileUpload
      variant="default"
      [config]="imageConfig()"
      [showPreview]="true"
      (filesChanged)="onImageFilesChanged($event)"
      (errorOccurred)="onError($event)"
    />
  `
})
export class ImageUploadComponent {
  readonly imageConfig = signal({
    multiple: true,
    maxFileSize: 2 * 1024 * 1024, // 2MB
    maxFiles: 5,
    acceptedFileTypes: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
    allowPreview: true,
  });

  onImageFilesChanged(files: FileUploadFile[]) {
    console.log('Image files selected:', files);
  }

  onError(error: FileUploadError) {
    console.error('Image upload error:', error);
  }
}
```

### Auto Upload with Progress Tracking

```typescript
import { Component, signal } from '@angular/core';
import { FileUpload, FileUploadFile } from 'angular-superui';

@Component({
  selector: 'app-auto-upload',
  standalone: true,
  imports: [FileUpload],
  template: `
    <FileUpload
      variant="default"
      [config]="autoUploadConfig()"
      (uploadProgress)="onUploadProgress($event)"
      (uploadComplete)="onUploadComplete($event)"
      (uploadError)="onUploadError($event)"
    />
    
    @if (uploadStatus()) {
      <div class="mt-4 p-4 bg-blue-50 rounded-lg">
        <p class="text-sm text-blue-800">{{ uploadStatus() }}</p>
      </div>
    }
  `
})
export class AutoUploadComponent {
  readonly uploadStatus = signal<string>('');

  readonly autoUploadConfig = signal({
    multiple: true,
    maxFileSize: 5 * 1024 * 1024, // 5MB
    maxFiles: 5,
    autoUpload: true,
    uploadUrl: '/api/upload',
    uploadHeaders: {
      'Authorization': 'Bearer your-token',
    },
  });

  onUploadProgress(event: { file: FileUploadFile; progress: number }) {
    this.uploadStatus.set(`Uploading ${event.file.name}: ${event.progress}%`);
  }

  onUploadComplete(file: FileUploadFile) {
    this.uploadStatus.set(`Successfully uploaded ${file.name}`);
    setTimeout(() => this.uploadStatus.set(''), 3000);
  }

  onUploadError(event: { file: FileUploadFile; error: string }) {
    this.uploadStatus.set(`Failed to upload ${event.file.name}: ${event.error}`);
  }
}
```

### Custom Progress Visualization with ProgressComponent

The ProgressComponent is automatically installed with the FileUpload component and provides enhanced progress visualization.

```typescript
import { Component, signal, ViewChild } from '@angular/core';
import { FileUpload, FileUploadFile, ProgressComponent } from 'angular-superui';

@Component({
  selector: 'app-progress-upload',
  standalone: true,
  imports: [FileUpload, ProgressComponent],
  template: `
    <FileUpload
      #fileUpload
      variant="default"
      size="lg"
      [config]="progressConfig()"
      [disabled]="isUploading()"
      (filesChanged)="onFilesChanged($event)"
      (uploadProgress)="onUploadProgress($event)"
      (uploadComplete)="onUploadComplete($event)"
    />

    @if (files().length > 0 && isUploading()) {
      <div class="mt-6 space-y-4">
        <h4 class="font-semibold">Upload Progress</h4>
        @for (file of files(); track file.id) {
          <div class="space-y-2">
            <div class="flex justify-between items-center">
              <span class="text-sm font-medium">{{ file.name }}</span>
              <span class="text-sm text-gray-500">{{ file.progress || 0 }}%</span>
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
  `
})
export class ProgressUploadComponent {
  @ViewChild('fileUpload') fileUpload!: FileUpload;
  
  readonly files = signal<FileUploadFile[]>([]);
  readonly isUploading = signal<boolean>(false);

  readonly progressConfig = signal({
    multiple: true,
    maxFileSize: 10 * 1024 * 1024, // 10MB
    maxFiles: 5,
    autoUpload: false,
    uploadUrl: '/api/upload',
  });

  onFilesChanged(files: FileUploadFile[]) {
    this.files.set(files);
  }

  onUploadProgress(event: { file: FileUploadFile; progress: number }) {
    // Progress is automatically handled by the component
    // This is just for additional custom logic if needed
  }

  onUploadComplete(file: FileUploadFile) {
    console.log('Upload completed:', file);
  }

  startUpload() {
    this.isUploading.set(true);
    this.fileUpload.uploadAllFiles();
  }
}
```

### Document Upload with File Type Restrictions

```typescript
import { Component, signal } from '@angular/core';
import { FileUpload, FileUploadFile } from 'angular-superui';

@Component({
  selector: 'app-document-upload',
  standalone: true,
  imports: [FileUpload],
  template: `
    <div class="space-y-4">
      <div>
        <h3 class="font-semibold mb-2">Document Upload</h3>
        <p class="text-sm text-gray-600 mb-4">
          PDF, DOC, DOCX files only, max 5MB each
        </p>
      </div>
      
      <FileUpload
        variant="default"
        [config]="documentConfig()"
        [showPreview]="false"
        (filesChanged)="onDocumentFilesChanged($event)"
        (errorOccurred)="onError($event)"
      />
    </div>
  `
})
export class DocumentUploadComponent {
  readonly documentConfig = signal({
    multiple: true,
    maxFileSize: 5 * 1024 * 1024, // 5MB
    maxFiles: 3,
    acceptedFileTypes: ['.pdf', '.doc', '.docx', '.txt'],
    allowPreview: false,
  });

  onDocumentFilesChanged(files: FileUploadFile[]) {
    console.log('Document files selected:', files);
  }

  onError(error: FileUploadError) {
    console.error('Document upload error:', error);
  }
}
```

### Compact Variant for Tight Spaces

```typescript
import { Component, signal } from '@angular/core';
import { FileUpload } from 'angular-superui';

@Component({
  selector: 'app-compact-upload',
  standalone: true,
  imports: [FileUpload],
  template: `
    <FileUpload
      variant="compact"
      size="sm"
      [config]="compactConfig()"
      (filesChanged)="onFilesChanged($event)"
    />
  `
})
export class CompactUploadComponent {
  readonly compactConfig = signal({
    multiple: false,
    maxFileSize: 1 * 1024 * 1024, // 1MB
    acceptedFileTypes: ['.jpg', '.png'],
  });

  onFilesChanged(files: FileUploadFile[]) {
    console.log('Compact upload files:', files);
  }
}
```

## Styling and Theming

### CSS Custom Properties

The component uses CSS custom properties for theming:

```css
:root {
  /* Border and backgrounds */
  --border: hsl(214.3 31.8% 91.4%);
  --background: hsl(0 0% 100%);
  --muted: hsl(210 40% 96%);
  
  /* Text colors */
  --foreground: hsl(222.2 84% 4.9%);
  --muted-foreground: hsl(215.4 16.3% 46.9%);
  
  /* Brand colors */
  --primary: hsl(222.2 47.4% 11.2%);
  --primary-foreground: hsl(210 40% 98%);
  
  /* Status colors */
  --destructive: hsl(0 84.2% 60.2%);
  --success: hsl(142.1 76.2% 36.3%);
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --border: hsl(217.2 32.6% 17.5%);
    --background: hsl(222.2 84% 4.9%);
    --muted: hsl(217.2 32.6% 17.5%);
    
    --foreground: hsl(210 40% 98%);
    --muted-foreground: hsl(215 20.2% 65.1%);
    
    --primary: hsl(210 40% 98%);
    --primary-foreground: hsl(222.2 47.4% 11.2%);
  }
}
```

### Customizing Variants

```typescript
// You can create custom styles by extending the component
@Component({
  selector: 'app-custom-upload',
  template: `
    <FileUpload
      variant="default"
      class="custom-upload-style"
      [config]="config"
    />
  `,
  styles: [`
    .custom-upload-style {
      --primary: hsl(142.1 76.2% 36.3%);
      border-radius: 1rem;
      border-width: 3px;
    }
    
    .custom-upload-style:hover {
      transform: scale(1.02);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }
  `]
})
export class CustomUploadComponent {
  config = { multiple: true };
}
```

## Server Integration

### Backend Endpoint Requirements

Your upload endpoint should accept `multipart/form-data` and return JSON:

```javascript
// Express.js example
app.post('/api/upload', upload.single('file'), (req, res) => {
  try {
    const file = req.file;
    // Process the file...
    
    res.json({
      success: true,
      url: `/uploads/${file.filename}`,
      data: {
        filename: file.filename,
        originalName: file.originalname,
        size: file.size,
        mimetype: file.mimetype
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});
```

### Progress Tracking

The component automatically tracks upload progress using Angular's HttpClient with `reportProgress: true`. No additional configuration is needed.

### Authentication

Add authentication headers through the config:

```typescript
const uploadConfig = {
  uploadUrl: '/api/upload',
  uploadHeaders: {
    'Authorization': 'Bearer ' + this.authService.getToken(),
    'X-Custom-Header': 'value'
  }
};
```

## Accessibility

The FileUpload component is fully accessible:

- ✅ **Keyboard Navigation** - Full keyboard support with Tab, Enter, and Space
- ✅ **Screen Readers** - Proper ARIA labels and descriptions
- ✅ **Focus Management** - Clear focus indicators
- ✅ **Error Announcements** - Errors are announced to screen readers
- ✅ **Progress Updates** - Upload progress is accessible

### ARIA Attributes

The component automatically sets:
- `role="button"` on the upload zone
- `aria-label` with descriptive text
- `aria-describedby` linking to configuration details
- `tabindex="0"` for keyboard navigation

## Best Practices

### Performance

1. **Limit File Sizes**: Always set `maxFileSize` to prevent memory issues
2. **Restrict File Types**: Use `acceptedFileTypes` to prevent invalid uploads
3. **Batch Processing**: Consider `maxFiles` limits for better UX
4. **Clean Up**: The component automatically cleans up object URLs

### User Experience

1. **Clear Feedback**: Always handle `errorOccurred` events
2. **Progress Indication**: Use progress events for long uploads
3. **Validation Messages**: Provide clear error messages
4. **Loading States**: Disable the component during uploads

### Security

1. **Server Validation**: Always validate files on the server
2. **File Type Checking**: Use both client and server-side validation
3. **Size Limits**: Enforce size limits on both client and server
4. **Sanitization**: Sanitize file names and content on the server

## Migration from XMLHttpRequest

If you're upgrading from a version that used XMLHttpRequest, the component now uses Angular's HttpClient for better integration:

### Benefits of HttpClient Integration

- **Interceptors**: Automatic integration with HTTP interceptors
- **Testing**: Better support for testing with HttpTestingController
- **Type Safety**: Improved type safety for requests and responses
- **Observables**: Native RxJS integration
- **Error Handling**: Better error handling and recovery

### Breaking Changes

None! The public API remains the same. The upgrade is transparent to users.

## Troubleshooting

### Common Issues

1. **Files not uploading**
   - Check that `uploadUrl` is set in config
   - Verify server endpoint is accessible
   - Check authentication headers

2. **Progress not showing**
   - Ensure your server supports progress tracking
   - Check that the upload actually takes time (large files)

3. **File validation failing**
   - Check `acceptedFileTypes` format (use dots: `.jpg` not `jpg`)
   - Verify `maxFileSize` is in bytes
   - Check browser file type detection

4. **Styling issues**
   - Ensure Tailwind CSS is properly configured
   - Check that CSS custom properties are defined
   - Verify component imports

### Debug Mode

Enable debug logging:

```typescript
// Add this to see detailed upload information
(uploadProgress)="console.log('Progress:', $event)"
(uploadComplete)="console.log('Complete:', $event)"
(uploadError)="console.log('Error:', $event)"
```

## Contributing

Found a bug or want to contribute? Please check our [Contributing Guide](../../CONTRIBUTING.md) for details on submitting issues and pull requests.

## License

This component is part of Angular SuperUI and is licensed under the MIT License. See [LICENSE](../../LICENSE) for details.
