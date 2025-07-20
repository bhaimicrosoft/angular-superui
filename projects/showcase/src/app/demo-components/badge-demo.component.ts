import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Badge } from '../../../../lib/src/lib/badge';

@Component({
  selector: 'app-badge-demo',
  standalone: true,
  imports: [CommonModule, Badge],
  templateUrl: './badge-demo.component.html',
  styles: []
})
export class BadgeDemoComponent {

}
