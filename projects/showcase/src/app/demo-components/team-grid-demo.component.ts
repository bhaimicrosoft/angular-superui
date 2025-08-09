import { Component, signal, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SEOService } from '../services/seo.service';
import { TeamGrid } from '@lib/blocks/team-grid';

@Component({
  selector: 'app-team-grid-demo',
  standalone: true,
  imports: [CommonModule, RouterModule, TeamGrid],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen bg-background">
      <!-- Page Header -->
      <div class="max-w-7xl mx-auto px-4 py-12">
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold text-foreground mb-4">Team Grid Block</h1>
          <p class="text-xl text-muted-foreground max-w-3xl mx-auto">
            Showcase your team members with beautiful, responsive grid layouts. Perfect for about pages, company profiles, and team introductions.
          </p>
        </div>

        <!-- Executive Team -->
        <div class="mb-16">
          <TeamGrid
            title="Executive Team"
            description="Meet the leaders driving our vision forward"
            badge="Leadership"
            [members]="executiveTeam()"
            [columns]="2"
            variant="card"
            memberVariant="gradient"
            memberSize="lg"
            [showBio]="true"
            [showContact]="true"
            [showSocialLinks]="true"
            [showDepartment]="true"
            [hoverEffect]="true"
            class="mb-16"
          />
        </div>

        <!-- Engineering Team -->
        <div class="mb-16">
          <TeamGrid
            title="Engineering Team"
            description="The brilliant minds building our products"
            badge="Engineering"
            [members]="engineeringTeam()"
            [columns]="3"
            variant="default"
            memberVariant="card"
            [showBio]="true"
            [showSkills]="true"
            [showSocialLinks]="true"
            [showStatus]="true"
            [showCustomFields]="true"
            [maxSkills]="4"
            [hoverEffect]="true"
            class="mb-16"
          />
        </div>

        <!-- Design Team -->
        <div class="mb-16">
          <TeamGrid
            title="Design Team"
            description="Creative professionals crafting exceptional user experiences"
            badge="Design"
            [members]="designTeam()"
            [columns]="3"
            variant="minimal"
            memberVariant="outlined"
            [showBio]="true"
            [showSkills]="true"
            [showSocialLinks]="true"
            [showJoinDate]="true"
            [showCustomFields]="true"
            [maxSkills]="3"
            [hoverEffect]="true"
            [showJoinCTA]="true"
            joinCTATitle="Join Our Design Team"
            joinCTADescription="We're looking for talented designers to help us create amazing user experiences."
            joinCTAButtonText="View Design Jobs"
            class="mb-16"
          />
        </div>

        <!-- Compact Layout Example -->
        <div class="mb-16">
          <TeamGrid
            title="Customer Success"
            description="Dedicated to your success and satisfaction"
            badge="Support"
            [members]="supportTeam()"
            [columns]="4"
            variant="filled"
            memberVariant="minimal"
            memberSize="sm"
            memberLayout="horizontal"
            [showBio]="false"
            [showContact]="true"
            [showSocialLinks]="false"
            [showStatus]="true"
            gap="sm"
            [hoverEffect]="false"
            class="mb-16"
          />
        </div>

        <!-- Usage Examples -->
        <div class="mt-20 p-8 rounded-xl bg-muted/50">
          <h3 class="text-2xl font-bold mb-4">Usage Examples</h3>
          <div class="space-y-4 text-sm">
            <div class="p-4 bg-card rounded-lg border">
              <h4 class="font-semibold mb-2">Basic Team Grid</h4>
              <pre class="text-xs overflow-x-auto"><code>&lt;TeamGrid
  title="Our Team"
  description="Meet the people behind our success"
  [members]="teamMembers"
  [columns]="3"
  variant="default"
/&gt;</code></pre>
            </div>
            
            <div class="p-4 bg-card rounded-lg border">
              <h4 class="font-semibold mb-2">Executive Layout</h4>
              <pre class="text-xs overflow-x-auto"><code>&lt;TeamGrid
  [members]="executives"
  [columns]="2"
  memberSize="lg"
  [showBio]="true"
  [showContact]="true"
/&gt;</code></pre>
            </div>
            
            <div class="p-4 bg-card rounded-lg border">
              <h4 class="font-semibold mb-2">Compact Support Team</h4>
              <pre class="text-xs overflow-x-auto"><code>&lt;TeamGrid
  [members]="supportTeam"
  [columns]="4"
  memberLayout="horizontal"
  memberSize="sm"
  [showBio]="false"
/&gt;</code></pre>
            </div>
          </div>
        </div>

        <!-- Documentation Link -->
        <div class="mt-16 text-center p-8 rounded-xl bg-gradient-to-r from-violet-50 to-blue-50 dark:from-violet-900/20 dark:to-blue-900/20 border border-violet-200 dark:border-violet-800">
          <h3 class="text-2xl font-bold mb-4 text-violet-900 dark:text-violet-100">Complete Documentation</h3>
          <p class="text-lg text-violet-700 dark:text-violet-300 mb-6 max-w-2xl mx-auto">
            Explore the full API reference, advanced examples, and implementation details in our comprehensive documentation.
          </p>
          <a
            href="https://github.com/bhaimicrosoft/angular-superui/blob/main/docs/blocks/team-grid.md"
            target="_blank"
            class="inline-flex items-center gap-2 px-8 py-4 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clip-rule="evenodd" />
              <path fill-rule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clip-rule="evenodd" />
            </svg>
            View Team Grid Documentation
          </a>
        </div>
      </div>
    </div>
  `
})
export class TeamGridDemoComponent implements OnInit {
  private readonly seoService = inject(SEOService);

  // Executive Team Data
  executiveTeam = signal([
    {
      id: 1,
      name: "Sarah Chen",
      role: "Chief Executive Officer",
      department: "Executive",
      bio: "Visionary leader with 15+ years experience scaling technology companies. Previously led product at three successful startups, with expertise in strategic planning and team building.",
      avatar: "https://picsum.photos/seed/sarah-ceo/300/300",
      email: "sarah.chen@company.com",
      location: "San Francisco, CA",
      socialLinks: {
        linkedin: "https://linkedin.com/in/sarahchen",
        twitter: "https://twitter.com/sarahchen",
        website: "https://sarahchen.com"
      },
      joinDate: "January 2019",
      isActive: true
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "Chief Technology Officer",
      department: "Engineering",
      bio: "Full-stack architect passionate about building scalable systems. Expert in cloud infrastructure, microservices, and team leadership with a track record of shipping high-quality products.",
      avatar: "https://picsum.photos/seed/marcus-cto/300/300",
      email: "marcus.rodriguez@company.com",
      location: "Austin, TX",
      socialLinks: {
        linkedin: "https://linkedin.com/in/marcusrodriguez",
        github: "https://github.com/marcusrodriguez",
        website: "https://marcustech.dev"
      },
      joinDate: "March 2019",
      isActive: true
    }
  ]);

  // Engineering Team Data
  engineeringTeam = signal([
    {
      id: 3,
      name: "Alex Kim",
      role: "Senior Frontend Engineer",
      department: "Engineering",
      bio: "Angular expert specializing in component libraries and design systems. Passionate about creating delightful user experiences with clean, maintainable code.",
      avatar: "https://picsum.photos/seed/alex-frontend/300/300",
      email: "alex.kim@company.com",
      location: "Seattle, WA",
      socialLinks: {
        linkedin: "https://linkedin.com/in/alexkim",
        github: "https://github.com/alexkim",
        twitter: "https://twitter.com/alexkimdev",
        dribbble: "https://dribbble.com/alexkim",
        medium: "https://medium.com/@alexkim",
        figma: "https://figma.com/@alexkim"
      },
      skills: ["Angular", "TypeScript", "RxJS", "Tailwind CSS", "Jest"],
      joinDate: "June 2020",
      isActive: true,
      customFields: {
        yearsExperience: "8 years",
        specialization: "Component Architecture",
        certifications: "Google Cloud Professional",
        timezone: "PST (UTC-8)",
        languages: "English, Korean"
      }
    },
    {
      id: 4,
      name: "Jamie Foster",
      role: "Backend Engineer",
      department: "Engineering",
      bio: "Node.js and cloud infrastructure specialist. Enjoys solving complex distributed systems challenges and optimizing performance at scale.",
      avatar: "https://picsum.photos/seed/jamie-backend/300/300",
      email: "jamie.foster@company.com",
      location: "Denver, CO",
      socialLinks: {
        linkedin: "https://linkedin.com/in/jamiefoster",
        github: "https://github.com/jamiefoster"
      },
      skills: ["Node.js", "PostgreSQL", "AWS", "Docker", "GraphQL"],
      joinDate: "September 2020",
      isActive: true
    },
    {
      id: 5,
      name: "Priya Patel",
      role: "DevOps Engineer",
      department: "Engineering",
      bio: "Infrastructure automation enthusiast with expertise in CI/CD, monitoring, and security. Committed to building reliable, scalable deployment pipelines.",
      avatar: "https://picsum.photos/seed/priya-devops/300/300",
      email: "priya.patel@company.com",
      location: "New York, NY",
      socialLinks: {
        linkedin: "https://linkedin.com/in/priyapatel",
        github: "https://github.com/priyapatel",
        website: "https://priyainfra.dev"
      },
      skills: ["Kubernetes", "Terraform", "AWS", "Monitoring", "Security"],
      joinDate: "February 2021",
      isActive: true
    }
  ]);

  // Design Team Data
  designTeam = signal([
    {
      id: 6,
      name: "Taylor Brooks",
      role: "Head of Design",
      department: "Design",
      bio: "Design systems advocate with a passion for creating cohesive, accessible user experiences. Leads cross-functional teams to deliver pixel-perfect interfaces.",
      avatar: "https://picsum.photos/seed/taylor-design/300/300",
      email: "taylor.brooks@company.com",
      location: "Los Angeles, CA",
      socialLinks: {
        linkedin: "https://linkedin.com/in/taylorbrooks",
        website: "https://taylordesigns.co",
        dribbble: "https://dribbble.com/taylorbrooks",
        behance: "https://behance.net/taylorbrooks",
        figma: "https://figma.com/@taylorbrooks",
        instagram: "https://instagram.com/taylordesigns"
      },
      skills: ["Design Systems", "Figma", "Prototyping", "User Research"],
      joinDate: "May 2020",
      isActive: true,
      customFields: {
        designPhilosophy: "User-first, accessibility-driven",
        favoriteDesignTool: "Figma + FigJam",
        projectsLed: "50+ design systems"
      }
    },
    {
      id: 7,
      name: "Casey Morgan",
      role: "UX Designer",
      department: "Design",
      bio: "User-centered design professional focused on research-driven solutions. Specializes in information architecture and interaction design for complex applications.",
      avatar: "https://picsum.photos/seed/casey-ux/300/300",
      email: "casey.morgan@company.com",
      location: "Portland, OR",
      socialLinks: {
        linkedin: "https://linkedin.com/in/caseymorgan"
      },
      skills: ["User Research", "Wireframing", "Prototyping", "Usability Testing"],
      joinDate: "August 2021",
      isActive: true
    },
    {
      id: 8,
      name: "Jordan Lee",
      role: "UI Designer",
      department: "Design",
      bio: "Visual design specialist with an eye for detail and brand consistency. Creates stunning interfaces that balance aesthetics with usability.",
      avatar: "https://picsum.photos/seed/jordan-ui/300/300",
      email: "jordan.lee@company.com",
      location: "Chicago, IL",
      socialLinks: {
        linkedin: "https://linkedin.com/in/jordanlee",
        website: "https://jordanvisual.design"
      },
      skills: ["Visual Design", "Branding", "Illustration", "Motion Design"],
      joinDate: "November 2021",
      isActive: false
    }
  ]);

  // Support Team Data
  supportTeam = signal([
    {
      id: 9,
      name: "Sam Wilson",
      role: "Customer Success Manager",
      department: "Support",
      avatar: "https://picsum.photos/seed/sam-support/300/300",
      email: "sam.wilson@company.com",
      location: "Remote",
      isActive: true
    },
    {
      id: 10,
      name: "Riley Chen",
      role: "Technical Support Specialist",
      department: "Support",
      avatar: "https://picsum.photos/seed/riley-tech/300/300",
      email: "riley.chen@company.com",
      location: "Remote",
      isActive: true
    },
    {
      id: 11,
      name: "Avery Johnson",
      role: "Community Manager",
      department: "Support",
      avatar: "https://picsum.photos/seed/avery-community/300/300",
      email: "avery.johnson@company.com",
      location: "Remote",
      isActive: true
    },
    {
      id: 12,
      name: "Blake Taylor",
      role: "Documentation Specialist",
      department: "Support",
      avatar: "https://picsum.photos/seed/blake-docs/300/300",
      email: "blake.taylor@company.com",
      location: "Remote",
      isActive: false
    }
  ]);

  ngOnInit() {
    this.seoService.updateSEO({
      title: 'Team Grid Block - Angular SuperUI',
      description: 'Showcase team members with beautiful, responsive grid layouts. Perfect for about pages, company profiles, and team introductions with customizable variants.',
      keywords: 'team grid, team members, about page, company team, employee showcase, angular components, ui blocks'
    });
  }
}
