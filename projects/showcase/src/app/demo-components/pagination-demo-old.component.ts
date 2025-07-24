import {Component, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import { Pagination } from '@lib/pagination';
import {Badge} from '@lib/badge';

interface DataItem {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
}

@Component({
  selector: 'app-pagination-demo',
  standalone: true,
  imports: [
    CommonModule,
    Pagination,
    Badge
  ],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-8">
      <div class="max-w-6xl mx-auto space-y-12">
        <!-- Header -->
        <div class="text-center space-y-4">
          <h1 class="text-4xl font-bold text-slate-900 dark:text-slate-100">
            Pagination Component
          </h1>
          <p class="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            A flexible and accessible pagination component for navigating through large datasets.
            Perfect for tables, lists, and any paginated content.
          </p>
        </div>

        <!-- Basic Examples -->
        <section class="space-y-6">
          <h2 class="text-2xl font-semibold text-slate-800 dark:text-slate-200">
            Basic Usage
          </h2>
          <div
            class="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
            <div class="space-y-8">
              <!-- Default Size -->
              <div class="space-y-4">
                <h3 class="text-lg font-medium text-slate-700 dark:text-slate-300">Default Size</h3>
                <div class="flex justify-center">
                  <Pagination
                    [totalItems]="1000"
                    [itemsPerPage]="10"
                    [currentPage]="basicCurrentPage()"
                    (pageChange)="basicCurrentPage.set($event)"
                  />
                </div>
                <p class="text-sm text-center text-muted-foreground">
                  Page {{ basicCurrentPage() }} of {{ Math.ceil(1000 / 10) }} • 1000 total items
                </p>
              </div>

              <!-- Small Size -->
              <div class="space-y-4">
                <h3 class="text-lg font-medium text-slate-700 dark:text-slate-300">Small Size</h3>
                <div class="flex justify-center">
                  <Pagination
                    [totalItems]="500"
                    [itemsPerPage]="20"
                    [currentPage]="smallCurrentPage()"
                    [size]="'sm'"
                    (pageChange)="smallCurrentPage.set($event)"
                  />
                </div>
                <p class="text-sm text-center text-muted-foreground">
                  Page {{ smallCurrentPage() }} of {{ Math.ceil(500 / 20) }} • 500 total items
                </p>
              </div>

              <!-- Large Size -->
              <div class="space-y-4">
                <h3 class="text-lg font-medium text-slate-700 dark:text-slate-300">Large Size</h3>
                <div class="flex justify-center">
                  <Pagination
                    [totalItems]="2000"
                    [itemsPerPage]="25"
                    [currentPage]="largeCurrentPage()"
                    [size]="'lg'"
                    (pageChange)="largeCurrentPage.set($event)"
                  />
                </div>
                <p class="text-sm text-center text-muted-foreground">
                  Page {{ largeCurrentPage() }} of {{ Math.ceil(2000 / 25) }} • 2000 total items
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- Data Table Example -->
        <section class="space-y-6">
          <h2 class="text-2xl font-semibold text-slate-800 dark:text-slate-200">
            Data Table with Pagination
          </h2>
          <div
            class="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
            <div class="space-y-6">
              <!-- Controls -->
              <div class="flex flex-wrap gap-4 items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="text-sm font-medium text-slate-700 dark:text-slate-300">Items per page:</span>
                  <select
                    [value]="tableItemsPerPage()"
                    (change)="onItemsPerPageChange($event)"
                    class="px-3 py-1 text-sm border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                  </select>
                </div>
                <div class="text-sm text-muted-foreground">
                  Showing {{ getStartItem() }}-{{ getEndItem() }} of {{ mockData.length }} results
                </div>
              </div>

              <!-- Table -->
              <div class="overflow-x-auto">
                <table class="w-full border-collapse border border-slate-200 dark:border-slate-700 rounded-lg">
                  <thead class="bg-slate-50 dark:bg-slate-700">
                  <tr>
                    <th
                      class="text-left p-4 font-medium text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-600">
                      ID
                    </th>
                    <th
                      class="text-left p-4 font-medium text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-600">
                      Name
                    </th>
                    <th
                      class="text-left p-4 font-medium text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-600">
                      Email
                    </th>
                    <th
                      class="text-left p-4 font-medium text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-600">
                      Role
                    </th>
                    <th
                      class="text-left p-4 font-medium text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-600">
                      Status
                    </th>
                    <th
                      class="text-left p-4 font-medium text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-600">
                      Join Date
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                    @for (item of getCurrentPageData(); track item.id) {
                      <tr class="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                        <td
                          class="p-4 text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-600">
                          #{{ item.id }}
                        </td>
                        <td
                          class="p-4 text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-600 font-medium">{{ item.name }}
                        </td>
                        <td
                          class="p-4 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-600">{{ item.email }}
                        </td>
                        <td
                          class="p-4 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-600">{{ item.role }}
                        </td>
                        <td class="p-4 border-b border-slate-200 dark:border-slate-600">
                          <Badge
                            [variant]="item.status === 'active' ? 'default' : item.status === 'pending' ? 'secondary' : 'destructive'"
                          >
                            {{ item.status }}
                          </Badge>
                        </td>
                        <td
                          class="p-4 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-600">{{ item.joinDate }}
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>

              <!-- Pagination -->
              <div class="flex justify-center">
                <Pagination
                  [totalItems]="mockData.length"
                  [itemsPerPage]="tableItemsPerPage()"
                  [currentPage]="tableCurrentPage()"
                  [maxVisiblePages]="7"
                  (pageChange)="tableCurrentPage.set($event)"
                />
              </div>
            </div>
          </div>
        </section>

        <!-- Configuration Examples -->
        <section class="space-y-6">
          <h2 class="text-2xl font-semibold text-slate-800 dark:text-slate-200">
            Configuration Options
          </h2>
          <div class="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
            <div class="grid md:grid-cols-2 gap-8">
              <!-- Few Pages -->
              <div class="space-y-4">
                <h3 class="text-lg font-medium text-slate-700 dark:text-slate-300">Few Pages (No Ellipsis)</h3>
                <div class="flex justify-center">
                  <Pagination
                    [totalItems]="50"
                    [itemsPerPage]="10"
                    [currentPage]="fewPagesCurrentPage()"
                    (pageChange)="fewPagesCurrentPage.set($event)"
                  />
                </div>
                <p class="text-sm text-center text-muted-foreground">
                  5 pages total - shows all pages
                </p>
              </div>

              <!-- Many Pages -->
              <div class="space-y-4">
                <h3 class="text-lg font-medium text-slate-700 dark:text-slate-300">Many Pages (With Ellipsis)</h3>
                <div class="flex justify-center">
                  <Pagination
                    [totalItems]="10000"
                    [itemsPerPage]="10"
                    [currentPage]="manyPagesCurrentPage()"
                    [maxVisiblePages]="5"
                    (pageChange)="manyPagesCurrentPage.set($event)"
                  />
                </div>
                <p class="text-sm text-center text-muted-foreground">
                  1000 pages total - smart ellipsis handling
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- Feature Examples -->
        <section class="space-y-6">
          <h2 class="text-2xl font-semibold text-slate-800 dark:text-slate-200">
            Feature Examples
          </h2>
          <div class="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
            <div class="space-y-8">
              <!-- With Info -->
              <div class="space-y-4">
                <h3 class="text-lg font-medium text-slate-700 dark:text-slate-300">With Info Display</h3>
                <div class="flex justify-center">
                  <Pagination
                    [totalItems]="1234"
                    [itemsPerPage]="10"
                    [currentPage]="infoCurrentPage()"
                    [showInfo]="true"
                    (pageChange)="infoCurrentPage.set($event)"
                  />
                </div>
              </div>

              <!-- Without Labels -->
              <div class="space-y-4">
                <h3 class="text-lg font-medium text-slate-700 dark:text-slate-300">Icon Only (No Labels)</h3>
                <div class="flex justify-center">
                  <Pagination
                    [totalItems]="500"
                    [itemsPerPage]="25"
                    [currentPage]="iconCurrentPage()"
                    [showLabels]="false"
                    [size]="'sm'"
                    (pageChange)="iconCurrentPage.set($event)"
                  />
                </div>
                <p class="text-sm text-center text-muted-foreground">
                  Compact pagination with icons only
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  `
})
export class PaginationDemoComponent {
  // Basic pagination states
  basicCurrentPage = signal(5);
  smallCurrentPage = signal(3);
  largeCurrentPage = signal(12);

  // Table pagination states
  tableCurrentPage = signal(1);
  tableItemsPerPage = signal(10);

  // Configuration examples
  fewPagesCurrentPage = signal(3);
  manyPagesCurrentPage = signal(42);

  // Feature examples
  infoCurrentPage = signal(8);
  iconCurrentPage = signal(4);

  // Mock data for table
  mockData: DataItem[] = Array.from({length: 156}, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: ['Admin', 'Editor', 'Viewer', 'Manager'][i % 4],
    status: (['active', 'inactive', 'pending'] as const)[i % 3],
    joinDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toLocaleDateString()
  }));

  // Math utility for template
  Math = Math;

  // Table data methods
  getCurrentPageData(): DataItem[] {
    const start = (this.tableCurrentPage() - 1) * this.tableItemsPerPage();
    const end = start + this.tableItemsPerPage();
    return this.mockData.slice(start, end);
  }

  getStartItem(): number {
    return (this.tableCurrentPage() - 1) * this.tableItemsPerPage() + 1;
  }

  getEndItem(): number {
    const end = this.tableCurrentPage() * this.tableItemsPerPage();
    return Math.min(end, this.mockData.length);
  }

  onItemsPerPageChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.tableItemsPerPage.set(Number(target.value));
    this.tableCurrentPage.set(1); // Reset to first page
  }
}
