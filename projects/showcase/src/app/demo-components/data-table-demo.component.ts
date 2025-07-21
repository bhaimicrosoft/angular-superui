import { Component, computed, signal, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTable, DataTableColumn } from '@lib/data-table';
import { Button } from '@lib/button';
import { SEOService } from '../services/seo.service';

// Data interfaces for different demo scenarios
interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  department: string;
  salary: number;
  status: 'active' | 'inactive' | 'pending';
  startDate: Date;
  manager: string;
  location: string;
  phone: string;
  skills: string[];
  performance: number;
  avatar: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'available' | 'out-of-stock' | 'discontinued';
  brand: string;
  rating: number;
  description: string;
  lastUpdated: Date;
  supplier: string;
  sku: string;
  weight: number;
  dimensions: string;
  image: string;
}

interface Transaction {
  id: string;
  date: Date;
  amount: number;
  type: 'credit' | 'debit';
  status: 'completed' | 'pending' | 'failed';
  description: string;
  account: string;
  reference: string;
  category: string;
  merchant: string;
  location: string;
  currency: string;
  fee: number;
  balance: number;
}

@Component({
  selector: 'app-data-table-demo',
  standalone: true,
  imports: [CommonModule, DataTable, Button],
  templateUrl: './data-table-demo.component.html'
})
export class DataTableDemoComponent implements OnInit {
  private seoService = inject(SEOService);

  ngOnInit() {
    this.seoService.updateSEO(this.seoService.getComponentSEO('data-table'));
    this.seoService.addComponentStructuredData('data-table');
  }

  // Demo mode selection
  currentDemo = signal<'employees' | 'products' | 'transactions'>('employees');

  // Loading and interaction states
  loading = signal(false);
  selectedRows = signal<any[]>([]);

  // Component configuration signals
  tableVariant = signal<'default' | 'bordered' | 'minimal' | 'elevated'>('default');
  tableSize = signal<'sm' | 'default' | 'lg'>('default');
  tableDensity = signal<'compact' | 'default' | 'comfortable'>('default');
  tableMaxHeight = signal<string>('600px');

  // Small table configuration signals for feature demos
  smallTableVariant = signal<'default' | 'bordered' | 'minimal' | 'elevated'>('default');
  smallTableSize = signal<'sm' | 'default' | 'lg'>('sm');
  smallTableDensityCompact = signal<'compact' | 'default' | 'comfortable'>('compact');
  smallTableDensityDefault = signal<'compact' | 'default' | 'comfortable'>('default');
  smallTableMaxHeight = signal<string>('300px');

  // Demo data
  employees = signal<Employee[]>([
    {
      id: 1,
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@company.com',
      role: 'Senior Software Engineer',
      department: 'Engineering',
      salary: 125000,
      status: 'active',
      startDate: new Date('2022-03-15'),
      manager: 'David Chen',
      location: 'San Francisco, CA',
      phone: '+1 (555) 123-4567',
      skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
      performance: 4.8,
      avatar: '🧑‍💻'
    },
    {
      id: 2,
      firstName: 'Michael',
      lastName: 'Chen',
      email: 'michael.chen@company.com',
      role: 'Product Manager',
      department: 'Product',
      salary: 135000,
      status: 'active',
      startDate: new Date('2021-08-22'),
      manager: 'Lisa Zhang',
      location: 'New York, NY',
      phone: '+1 (555) 234-5678',
      skills: ['Strategy', 'Analytics', 'Roadmapping', 'Leadership'],
      performance: 4.9,
      avatar: '👨‍💼'
    },
    {
      id: 3,
      firstName: 'Emily',
      lastName: 'Rodriguez',
      email: 'emily.rodriguez@company.com',
      role: 'UX Designer',
      department: 'Design',
      salary: 95000,
      status: 'active',
      startDate: new Date('2023-01-10'),
      manager: 'Sarah Johnson',
      location: 'Austin, TX',
      phone: '+1 (555) 345-6789',
      skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
      performance: 4.7,
      avatar: '🎨'
    },
    {
      id: 4,
      firstName: 'James',
      lastName: 'Wilson',
      email: 'james.wilson@company.com',
      role: 'Data Scientist',
      department: 'Analytics',
      salary: 140000,
      status: 'pending',
      startDate: new Date('2024-02-01'),
      manager: 'Michael Chen',
      location: 'Seattle, WA',
      phone: '+1 (555) 456-7890',
      skills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow'],
      performance: 4.6,
      avatar: '📊'
    },
    {
      id: 5,
      firstName: 'Anna',
      lastName: 'Thompson',
      email: 'anna.thompson@company.com',
      role: 'Marketing Manager',
      department: 'Marketing',
      salary: 110000,
      status: 'active',
      startDate: new Date('2020-11-30'),
      manager: 'David Chen',
      location: 'Los Angeles, CA',
      phone: '+1 (555) 567-8901',
      skills: ['Digital Marketing', 'SEO', 'Content Strategy', 'Analytics'],
      performance: 4.5,
      avatar: '📢'
    }
  ]);

  products = signal<Product[]>([
    {
      id: 'PRD-001',
      name: 'Wireless Bluetooth Headphones',
      category: 'Electronics',
      price: 199.99,
      stock: 125,
      status: 'available',
      brand: 'AudioTech',
      rating: 4.5,
      description: 'Premium noise-cancelling wireless headphones with 30-hour battery life',
      lastUpdated: new Date('2024-01-15'),
      supplier: 'Global Electronics Co.',
      sku: 'AT-WBH-001',
      weight: 0.25,
      dimensions: '7.1" x 6.2" x 2.8"',
      image: '🎧'
    },
    {
      id: 'PRD-002',
      name: 'Smart Fitness Watch',
      category: 'Wearables',
      price: 299.99,
      stock: 78,
      status: 'available',
      brand: 'FitTech',
      rating: 4.3,
      description: 'Advanced fitness tracking with heart rate monitoring and GPS',
      lastUpdated: new Date('2024-01-20'),
      supplier: 'Wearable Innovations Ltd.',
      sku: 'FT-SFW-002',
      weight: 0.045,
      dimensions: '1.8" x 1.5" x 0.4"',
      image: '⌚'
    },
    {
      id: 'PRD-003',
      name: 'USB-C Hub Adapter',
      category: 'Accessories',
      price: 79.99,
      stock: 0,
      status: 'out-of-stock',
      brand: 'ConnectPro',
      rating: 4.7,
      description: '7-in-1 USB-C hub with HDMI, USB ports, and power delivery',
      lastUpdated: new Date('2024-01-18'),
      supplier: 'Connector Solutions Inc.',
      sku: 'CP-UCH-003',
      weight: 0.12,
      dimensions: '4.3" x 1.2" x 0.6"',
      image: '🔌'
    },
    {
      id: 'PRD-004',
      name: 'Mechanical Gaming Keyboard',
      category: 'Gaming',
      price: 159.99,
      stock: 45,
      status: 'available',
      brand: 'GameForce',
      rating: 4.8,
      description: 'RGB backlit mechanical keyboard with customizable switches',
      lastUpdated: new Date('2024-01-22'),
      supplier: 'Gaming Gear Pro',
      sku: 'GF-MGK-004',
      weight: 1.1,
      dimensions: '17.3" x 5.1" x 1.4"',
      image: '⌨️'
    },
    {
      id: 'PRD-005',
      name: '4K Webcam',
      category: 'Electronics',
      price: 149.99,
      stock: 33,
      status: 'available',
      brand: 'VisionPro',
      rating: 4.4,
      description: 'Ultra HD webcam with auto-focus and built-in microphone',
      lastUpdated: new Date('2024-01-25'),
      supplier: 'Vision Technology Corp.',
      sku: 'VP-4KW-005',
      weight: 0.18,
      dimensions: '3.9" x 1.1" x 1.1"',
      image: '📹'
    }
  ]);

  transactions = signal<Transaction[]>([
    {
      id: 'TXN-20240125-001',
      date: new Date('2024-01-25T14:32:00'),
      amount: 1250.00,
      type: 'credit',
      status: 'completed',
      description: 'Salary Deposit - January 2024',
      account: 'Checking Account ****1234',
      reference: 'SAL-JAN-2024-001',
      category: 'Income',
      merchant: 'ACME Corporation',
      location: 'Direct Deposit',
      currency: 'USD',
      fee: 0.00,
      balance: 5432.10
    },
    {
      id: 'TXN-20240124-002',
      date: new Date('2024-01-24T09:15:00'),
      amount: -89.99,
      type: 'debit',
      status: 'completed',
      description: 'Amazon Prime Subscription',
      account: 'Credit Card ****5678',
      reference: 'AMZ-SUB-2024-001',
      category: 'Subscription',
      merchant: 'Amazon.com',
      location: 'Online',
      currency: 'USD',
      fee: 0.00,
      balance: 4182.10
    },
    {
      id: 'TXN-20240123-003',
      date: new Date('2024-01-23T16:45:00'),
      amount: -145.67,
      type: 'debit',
      status: 'completed',
      description: 'Grocery Shopping',
      account: 'Debit Card ****9012',
      reference: 'WHF-POS-2024-001',
      category: 'Groceries',
      merchant: 'Whole Foods Market',
      location: 'San Francisco, CA',
      currency: 'USD',
      fee: 0.00,
      balance: 4272.09
    },
    {
      id: 'TXN-20240122-004',
      date: new Date('2024-01-22T11:20:00'),
      amount: -2500.00,
      type: 'debit',
      status: 'pending',
      description: 'Rent Payment - February 2024',
      account: 'Checking Account ****1234',
      reference: 'RENT-FEB-2024-001',
      category: 'Housing',
      merchant: 'Property Management Co.',
      location: 'ACH Transfer',
      currency: 'USD',
      fee: 5.00,
      balance: 4417.76
    },
    {
      id: 'TXN-20240121-005',
      date: new Date('2024-01-21T13:08:00'),
      amount: -75.50,
      type: 'debit',
      status: 'failed',
      description: 'Gas Station',
      account: 'Credit Card ****5678',
      reference: 'SHL-POS-2024-001',
      category: 'Transportation',
      merchant: 'Shell Gas Station',
      location: 'Palo Alto, CA',
      currency: 'USD',
      fee: 0.00,
      balance: 6922.76
    }
  ]);

  // Column definitions
  employeeColumns: DataTableColumn<Employee>[] = [
    {
      key: 'id',
      label: 'ID',
      type: 'number',
      sortable: true,
      width: '70px',
      pinned: 'left'
    },
    {
      key: 'avatar',
      label: '👤',
      width: '60px',
      formatter: (value) => value
    },
    {
      key: 'firstName',
      label: 'First Name',
      type: 'string',
      sortable: true,
      filterable: true,
      editable: true,
      resizable: false,
      groupable: true
    },
    {
      key: 'lastName',
      label: 'Last Name',
      type: 'string',
      sortable: true,
      filterable: true,
      editable: true,
      resizable: false
    },
    {
      key: 'email',
      label: 'Email',
      type: 'email',
      sortable: true,
      filterable: true,
      width: '250px'
    },
    {
      key: 'role',
      label: 'Role',
      type: 'string',
      sortable: true,
      filterable: true,
      groupable: true
    },
    {
      key: 'department',
      label: 'Department',
      type: 'string',
      sortable: true,
      filterable: true,
      groupable: true,
      multiSelectFilter: true,
      filterOptions: ['Engineering', 'Product', 'Design', 'Analytics', 'Marketing']
    },
    {
      key: 'salary',
      label: 'Salary',
      type: 'number',
      sortable: true,
      filterable: true,
      formatter: (value) => `$${value.toLocaleString()}`,
      pinned: 'right'
    },
    {
      key: 'status',
      label: 'Status',
      type: 'string',
      sortable: true,
      filterable: true,
      formatter: (value) => value.toUpperCase()
    },
    {
      key: 'startDate',
      label: 'Start Date',
      type: 'date',
      sortable: true,
      filterable: true,
      formatter: (value) => new Date(value).toLocaleDateString()
    },
    {
      key: 'performance',
      label: 'Performance',
      type: 'number',
      sortable: true,
      filterable: true,
      formatter: (value) => `${value}/5 ⭐`
    }
  ];

  productColumns: DataTableColumn<Product>[] = [
    {
      key: 'image',
      label: '📦',
      width: '60px',
      formatter: (value) => value
    },
    {
      key: 'id',
      label: 'Product ID',
      type: 'string',
      sortable: true,
      filterable: true,
      width: '120px',
      pinned: 'left'
    },
    {
      key: 'name',
      label: 'Product Name',
      type: 'string',
      sortable: true,
      filterable: true,
      editable: true,
      resizable: false,
      groupable: true
    },
    {
      key: 'category',
      label: 'Category',
      type: 'string',
      sortable: true,
      filterable: true,
      groupable: true,
      multiSelectFilter: true,
      filterOptions: ['Electronics', 'Wearables', 'Accessories', 'Gaming']
    },
    {
      key: 'brand',
      label: 'Brand',
      type: 'string',
      sortable: true,
      filterable: true,
      groupable: true
    },
    {
      key: 'price',
      label: 'Price',
      type: 'number',
      sortable: true,
      filterable: true,
      formatter: (value) => `$${value.toFixed(2)}`
    },
    {
      key: 'stock',
      label: 'Stock',
      type: 'number',
      sortable: true,
      filterable: true,
      formatter: (value) => `${value} units`
    },
    {
      key: 'status',
      label: 'Status',
      type: 'string',
      sortable: true,
      filterable: true,
      formatter: (value) => value.toUpperCase()
    },
    {
      key: 'rating',
      label: 'Rating',
      type: 'number',
      sortable: true,
      filterable: true,
      formatter: (value) => `${value}/5 ⭐`
    },
    {
      key: 'lastUpdated',
      label: 'Last Updated',
      type: 'date',
      sortable: true,
      filterable: true,
      formatter: (value) => new Date(value).toLocaleDateString()
    }
  ];

  transactionColumns: DataTableColumn<Transaction>[] = [
    {
      key: 'id',
      label: 'Transaction ID',
      type: 'string',
      sortable: true,
      filterable: true,
      width: '180px',
      pinned: 'left'
    },
    {
      key: 'date',
      label: 'Date & Time',
      type: 'date',
      sortable: true,
      filterable: true,
      formatter: (value) => new Date(value).toLocaleString()
    },
    {
      key: 'type',
      label: 'Type',
      type: 'string',
      sortable: true,
      filterable: true,
      formatter: (value) => value === 'credit' ? '↗️ Credit' : '↙️ Debit'
    },
    {
      key: 'amount',
      label: 'Amount',
      type: 'number',
      sortable: true,
      filterable: true,
      formatter: (value) => {
        const sign = value > 0 ? '+' : '';
        return `${sign}$${Math.abs(value).toFixed(2)}`;
      }
    },
    {
      key: 'status',
      label: 'Status',
      type: 'string',
      sortable: true,
      filterable: true,
      formatter: (value) => value.toUpperCase()
    },
    {
      key: 'description',
      label: 'Description',
      type: 'string',
      sortable: true,
      filterable: true,
      resizable: false
    },
    {
      key: 'category',
      label: 'Category',
      type: 'string',
      sortable: true,
      filterable: true,
      groupable: true,
      multiSelectFilter: true,
      filterOptions: ['Income', 'Subscription', 'Groceries', 'Housing', 'Transportation']
    },
    {
      key: 'merchant',
      label: 'Merchant',
      type: 'string',
      sortable: true,
      filterable: true,
      groupable: true
    },
    {
      key: 'balance',
      label: 'Balance',
      type: 'number',
      sortable: true,
      formatter: (value) => `$${value.toFixed(2)}`,
      pinned: 'right'
    }
  ];

  // Current data and columns computed signals - using any type for flexibility
  currentData = computed((): any[] => {
    switch (this.currentDemo()) {
      case 'employees': return this.employees();
      case 'products': return this.products();
      case 'transactions': return this.transactions();
      default: return this.employees();
    }
  });

  currentColumns = computed((): DataTableColumn<any>[] => {
    switch (this.currentDemo()) {
      case 'employees': return this.employeeColumns;
      case 'products': return this.productColumns;
      case 'transactions': return this.transactionColumns;
      default: return this.employeeColumns;
    }
  });

  // Statistics computed properties
  employeeActiveCount = computed(() => this.employees().filter(e => e.status === 'active').length);
  productAvailableCount = computed(() => this.products().filter(p => p.status === 'available').length);
  transactionCompletedCount = computed(() => this.transactions().filter(t => t.status === 'completed').length);

  // Demo methods
  switchDemo(demo: 'employees' | 'products' | 'transactions') {
    this.currentDemo.set(demo);
    this.selectedRows.set([]);
  }

  onSelectionChange(selectedRows: any[]) {
    this.selectedRows.set(selectedRows);
  }

  onCellEdit(event: any) {
    console.log('Cell edited:', event);
  }

  onSort(event: any) {
    console.log('Sort changed:', event);
  }

  onFilter(event: any) {
    console.log('Filter changed:', event);
  }

  onExport(format: string) {
    console.log('Exporting data as:', format);
    // Implementation for exporting data
  }

  refresh() {
    this.loading.set(true);
    setTimeout(() => {
      this.loading.set(false);
      // Simulate data refresh
      console.log('Data refreshed');
    }, 1000);
  }

  deleteSelected() {
    if (this.selectedRows().length > 0) {
      const selectedIds = this.selectedRows().map(row => row.id);
      const currentDemoType = this.currentDemo();

      if (currentDemoType === 'employees') {
        this.employees.update(employees =>
          employees.filter(employee => !selectedIds.includes(employee.id))
        );
      } else if (currentDemoType === 'products') {
        this.products.update(products =>
          products.filter(product => !selectedIds.includes(product.id))
        );
      } else if (currentDemoType === 'transactions') {
        this.transactions.update(transactions =>
          transactions.filter(transaction => !selectedIds.includes(transaction.id))
        );
      }

      console.log(`Deleted ${this.selectedRows().length} ${currentDemoType} records`);
      this.selectedRows.set([]);
    }
  }

  addNew() {
    const currentDemoType = this.currentDemo();

    if (currentDemoType === 'employees') {
      const newEmployee: Employee = {
        id: this.employees().length + 1,
        firstName: 'New',
        lastName: 'Employee',
        email: `newemployee${this.employees().length + 1}@company.com`,
        role: 'Developer',
        department: 'Engineering',
        salary: 75000,
        status: 'active',
        startDate: new Date(),
        manager: 'John Smith',
        location: 'San Francisco, CA',
        phone: '+1 (555) 123-4567',
        skills: ['JavaScript', 'TypeScript'],
        performance: 4,
        avatar: '👤'
      };
      this.employees.update(employees => [...employees, newEmployee]);
    } else if (currentDemoType === 'products') {
      const newProduct: Product = {
        id: `PRD-${String(this.products().length + 1).padStart(3, '0')}`,
        name: 'New Product',
        category: 'Electronics',
        price: 99.99,
        stock: 100,
        status: 'available',
        brand: 'Generic',
        rating: 4.0,
        description: 'A new product description',
        lastUpdated: new Date(),
        supplier: 'Generic Supplier',
        sku: `SKU-${this.products().length + 1}`,
        weight: 1.0,
        dimensions: '10x10x10cm',
        image: '📦'
      };
      this.products.update(products => [...products, newProduct]);
    } else if (currentDemoType === 'transactions') {
      const newTransaction: Transaction = {
        id: `TXN-${new Date().toISOString().split('T')[0].replace(/-/g, '')}-${String(this.transactions().length + 1).padStart(3, '0')}`,
        date: new Date(),
        amount: 100.00,
        type: 'credit',
        status: 'completed',
        description: 'New Transaction',
        account: 'Checking Account ****1234',
        reference: `REF-${this.transactions().length + 1}`,
        category: 'Income',
        merchant: 'New Merchant',
        location: 'Online',
        currency: 'USD',
        fee: 0.00,
        balance: 5000.00
      };
      this.transactions.update(transactions => [...transactions, newTransaction]);
    }

    console.log(`New ${currentDemoType.slice(0, -1)} added successfully`);
  }

  // Pagination event handlers
  onPageChange(page: number) {
    console.log('Page changed to:', page + 1); // Convert back to 1-indexed for display
    console.log('Current data length:', this.currentData().length);
  }
}
