import { Component, signal } from '@angular/core';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@lib/accordion';
import { Alert, AlertTitle, AlertDescription, AlertIcon } from '@lib/alert';
import { 
  AlertDialogComponent, 
  AlertDialogHeaderComponent, 
  AlertDialogFooterComponent, 
  AlertDialogTitleComponent, 
  AlertDialogDescriptionComponent,
  AlertDialogActionComponent,
  AlertDialogCancelComponent 
} from '@lib/alert-dialog';
import { Avatar, AvatarImage, AvatarFallback } from '@lib/avatar';
import { Badge } from '@lib/badge';
import { 
  BreadcrumbComponent,
  BreadcrumbListComponent,
  BreadcrumbItemComponent,
  BreadcrumbLinkComponent,
  BreadcrumbPageComponent,
  BreadcrumbSeparatorComponent,
  BreadcrumbEllipsisComponent
} from '@lib/breadcrumb';
import { ButtonComponent } from '@lib/button';

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
    AlertDialogComponent,
    AlertDialogHeaderComponent,
    AlertDialogFooterComponent,
    AlertDialogTitleComponent,
    AlertDialogDescriptionComponent,
    AlertDialogActionComponent,
    AlertDialogCancelComponent,
    Avatar,
    AvatarImage,
    AvatarFallback,
    Badge,
    BreadcrumbComponent,
    BreadcrumbListComponent,
    BreadcrumbItemComponent,
    BreadcrumbLinkComponent,
    BreadcrumbPageComponent,
    BreadcrumbSeparatorComponent,
    BreadcrumbEllipsisComponent,
    ButtonComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // AlertDialog state
  isDeleteDialogOpen = signal(false);
  isLogoutDialogOpen = signal(false);
  isConfirmDialogOpen = signal(false);

  // Demo methods
  openDeleteDialog() {
    this.isDeleteDialogOpen.set(true);
  }

  openLogoutDialog() {
    this.isLogoutDialogOpen.set(true);
  }

  openConfirmDialog() {
    this.isConfirmDialogOpen.set(true);
  }

  handleDelete() {
    console.log('Item deleted!');
    this.isDeleteDialogOpen.set(false);
  }

  handleLogout() {
    console.log('User logged out!');
    this.isLogoutDialogOpen.set(false);
  }

  handleConfirm() {
    console.log('Action confirmed!');
    this.isConfirmDialogOpen.set(false);
  }

  cancelDialog(type: string) {
    console.log(`${type} dialog cancelled`);
    this.isDeleteDialogOpen.set(false);
    this.isLogoutDialogOpen.set(false);
    this.isConfirmDialogOpen.set(false);
  }

  // Breadcrumb demo methods
  onBreadcrumbClick(section: string) {
    console.log(`Navigating to: ${section}`);
  }
}
