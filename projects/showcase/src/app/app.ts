import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  Button,
  InputComponent,
  Alert,
  Skeleton,
  Label,
  Progress,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
  Switch,
  Checkbox,
  Textarea,
  Badge,
  Separator,
} from '../../../../dist/lib';

@Component({
  selector: 'app-root',
  imports: [
    Button,
    InputComponent,
    Badge,
    Alert,
    Skeleton,
    Label,
    Progress,
    Avatar,
    AvatarFallback,
    AvatarImage,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
    Switch,
    Checkbox,
    Textarea,
    InputComponent,
    Separator,
    FormsModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  email = '';
  password = '';
  message = '';
  acceptTerms = false;
  notifications = true;
  progressValue = 67;
}
