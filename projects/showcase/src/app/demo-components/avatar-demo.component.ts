import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Avatar, AvatarFallback, AvatarImage} from '@lib/avatar';
import { SEOService } from '../services/seo.service';

@Component({
  selector: 'app-avatar-demo',
  standalone: true,
  imports: [CommonModule, Avatar, AvatarImage, AvatarFallback],
  templateUrl: './avatar-demo.component.html'
})
export class AvatarDemoComponent implements OnInit {
  private seoService = inject(SEOService);

  ngOnInit() {
    // Update SEO for avatar component page
    this.seoService.updateSEO(this.seoService.getComponentSEO('avatar'));
    this.seoService.addComponentStructuredData('avatar');
  }
  users = [
    {
      name: 'John Doe',
      initials: 'JD',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
      status: 'online'
    },
    {
      name: 'Jane Smith',
      initials: 'JS',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=32&h=32&fit=crop&crop=face',
      status: 'offline'
    },
    {
      name: 'Alex Johnson',
      initials: 'AJ',
      avatar: null,
      status: 'away'
    },
    {
      name: 'Sarah Wilson',
      initials: 'SW',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
      status: 'busy'
    }
  ];

  teamMembers = [
    { name: 'Emily Davis', initials: 'ED', color: 'bg-blue-500' },
    { name: 'Michael Brown', initials: 'MB', color: 'bg-green-500' },
    { name: 'Lisa Garcia', initials: 'LG', color: 'bg-purple-500' },
    { name: 'David Miller', initials: 'DM', color: 'bg-orange-500' },
    { name: 'Maria Rodriguez', initials: 'MR', color: 'bg-pink-500' }
  ];

  notifications = [
    {
      user: 'John Doe',
      initials: 'JD',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
      action: 'commented on your post',
      time: '2 minutes ago'
    },
    {
      user: 'Jane Smith',
      initials: 'JS',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=32&h=32&fit=crop&crop=face',
      action: 'liked your photo',
      time: '5 minutes ago'
    },
    {
      user: 'Alex Johnson',
      initials: 'AJ',
      avatar: null,
      action: 'started following you',
      time: '10 minutes ago'
    }
  ];
}
