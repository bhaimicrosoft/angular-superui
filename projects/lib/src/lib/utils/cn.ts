import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {LucideIconData} from 'lucide-angular';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export function lucideToSvg(lucideData: LucideIconData): string {
  if (!Array.isArray(lucideData) || lucideData.length === 0) {
    return '';
  }

  const paths = lucideData.map(node => {
    if (typeof node === 'string') {
      return node;
    }

    if (Array.isArray(node) && node.length >= 2) {
      const tagName = node[0];
      const attributes = node[1] || {};

      // Build attribute string
      const attrString = Object.entries(attributes)
        .map(([key, value]) => {
          // Handle different types of attribute values
          if (typeof value === 'string' || typeof value === 'number') {
            return `${key}="${value}"`;
          } else if (Array.isArray(value)) {
            return `${key}="${value.join(' ')}"`;
          } else if (typeof value === 'object' && value !== null) {
            // Skip complex objects that can't be serialized as attributes
            return '';
          }
          return `${key}="${String(value)}"`;
        })
        .filter(Boolean)
        .join(' ');

      return `<${tagName} ${attrString}/>`;
    }

    return '';
  }).filter(Boolean).join('');

  return `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        ${paths}
      </svg>
    `;
}



/**
 * Enhanced function to convert Lucide Angular components to SVG strings
 * This extracts the icon data from Lucide components and converts to SVG
 */
export function lucideComponentToSvg(lucideComponent: any): string {
  try {
    // Try to access the icon data from the component
    if (lucideComponent && lucideComponent.iconData) {
      return lucideToSvg(lucideComponent.iconData);
    }

    // If it's already a LucideIconData array, convert it directly
    if (Array.isArray(lucideComponent)) {
      return lucideToSvg(lucideComponent);
    }

    return '';
  } catch (error) {
    console.warn('Failed to convert Lucide component to SVG:', error);
    return '';
  }
}

