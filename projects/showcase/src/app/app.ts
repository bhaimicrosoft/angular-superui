import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  Alert,
  Separator,
  Button,
  InputComponent,
  Textarea,
  Badge,
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
  Skeleton,
  // New components
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Select,
  RadioGroup,
  RadioGroupItem,
  Toggle,
  Slider,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Tooltip,
  Toast,
  ToastContainer,
  ToastService,
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "../../../lib/src/public-api";

@Component({
  selector: 'app-root',
  imports: [
    FormsModule,
    Alert,
    Separator,
    Button,
    InputComponent,
    Textarea,
    Badge,
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
    Skeleton,
    // New components
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
    Select,
    RadioGroup,
    RadioGroupItem,
    Toggle,
    Slider,
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
    Tooltip,
    Toast,
    ToastContainer,
    Table,
    TableHeader,
    TableBody,
    TableFooter,
    TableRow,
    TableHead,
    TableCell,
    TableCaption,
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
  openDialog = false;

  // Select options
  selectOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  // Radio options
  radioOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  constructor(private toastService: ToastService) {}

  showToast(type: 'success' | 'error' | 'warning') {
    switch (type) {
      case 'success':
        this.toastService.success('Success!', 'Operation completed successfully.');
        break;
      case 'error':
        this.toastService.error('Error!', 'Something went wrong.');
        break;
      case 'warning':
        this.toastService.warning('Warning!', 'Please be careful.');
        break;
    }
  }
}
