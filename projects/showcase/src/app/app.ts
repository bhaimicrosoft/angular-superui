import { Component } from '@angular/core';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@lib/accordion';
import { Alert, AlertTitle, AlertDescription, AlertIcon } from '@lib/alert';

@Component({
  selector: 'app-root',
  imports: [
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
    Alert,
    AlertTitle,
    AlertDescription,
    AlertIcon
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}
