import { Component } from '@angular/core';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@lib/accordion';
import { Alert, AlertTitle, AlertDescription, AlertIcon } from '@lib/alert';
import { Avatar, AvatarImage, AvatarFallback } from '@lib/avatar';
import { Badge } from '@lib/badge';

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
    AlertIcon,
    Avatar,
    AvatarImage,
    AvatarFallback,
    Badge
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}
