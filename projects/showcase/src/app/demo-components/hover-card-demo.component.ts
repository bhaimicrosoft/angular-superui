
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HoverCard, HoverCardContent } from '@lib/hover-card';

@Component({
  selector: 'hover-card-demo',
  standalone: true,
  imports: [HoverCard, HoverCardContent],
  template: `
    <div class="flex justify-center items-center h-64">
      <HoverCard>
        <button trigger class="px-4 py-2 rounded-md bg-gray-200 text-gray-800">
          Hover over me
        </button>
        <HoverCardContent>
          <div class="text-center">
            <h3 class="text-lg font-semibold">Hover Card Content</h3>
            <p class="text-sm text-gray-600">This is the content of the hover card.</p>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HoverCardDemoComponent {}
