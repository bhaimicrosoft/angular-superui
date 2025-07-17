import { Component } from '@angular/core';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@lib/accordion';

@Component({
  selector: 'app-root',
  imports: [
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

}
