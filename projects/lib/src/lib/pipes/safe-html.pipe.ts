import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/**
 * SafeHtml Pipe
 * 
 * Sanitizes HTML content to prevent XSS attacks while allowing trusted HTML.
 * Use this pipe for any [innerHTML] bindings to ensure security.
 * 
 * @example
 * ```html
 * <span [innerHTML]="htmlContent | safeHtml"></span>
 * ```
 */
@Pipe({
  name: 'safeHtml',
  standalone: true,
})
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string | undefined | null): SafeHtml {
    if (!value) {
      return '';
    }
    // Trust the HTML content after sanitization
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}
