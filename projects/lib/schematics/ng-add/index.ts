import {
  Rule,
  SchematicContext,
  Tree,
  chain,
} from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import {
  addPackageJsonDependency,
  NodeDependency,
  NodeDependencyType,
} from '@schematics/angular/utility/dependencies';
import { Schema } from './schema';

// You can create files from a URL or simple strings.
export default function (options: Schema): Rule {
  return chain([
    addPackageJsonDependencies(options),
    installPackageJsonDependencies(),
    setupTailwindCSS(options),
    addGlobalStyles(options),
    addModuleImports(options),
  ]);
}

function addPackageJsonDependencies(options: Schema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    if (options.skipPackageJson) {
      return tree;
    }

    const dependencies: NodeDependency[] = [
      {
        type: NodeDependencyType.Default,
        version: '^0.7.1',
        name: 'class-variance-authority',
      },
      {
        type: NodeDependencyType.Default,
        version: '^2.1.1',
        name: 'clsx',
      },
      {
        type: NodeDependencyType.Default,
        version: '^3.3.1',
        name: 'tailwind-merge',
      },
    ];

    if (options.includeTailwind) {
      dependencies.push(
        {
          type: NodeDependencyType.Dev,
          version: '^3.4.0',
          name: 'tailwindcss',
        },
        {
          type: NodeDependencyType.Dev,
          version: '^10.4.0',
          name: 'autoprefixer',
        },
        {
          type: NodeDependencyType.Dev,
          version: '^8.4.0',
          name: 'postcss',
        }
      );
    }

    dependencies.forEach((dependency) => {
      addPackageJsonDependency(tree, dependency);
    });

    context.logger.info('✅ Added Angular SuperUI dependencies to package.json');
    return tree;
  };
}

function installPackageJsonDependencies(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.addTask(new NodePackageInstallTask());
    context.logger.info('📦 Installing dependencies...');
    return tree;
  };
}

function setupTailwindCSS(options: Schema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    if (!options.includeTailwind) {
      return tree;
    }

    // Create tailwind.config.js
    const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/@your-org/angular-superui/**/*.{html,js}"
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
}`;

    tree.create('tailwind.config.js', tailwindConfig);

    // Create postcss.config.js if it doesn't exist
    if (!tree.exists('postcss.config.js')) {
      const postcssConfig = `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`;
      tree.create('postcss.config.js', postcssConfig);
    }

    context.logger.info('⚙️ Created Tailwind CSS configuration');
    return tree;
  };
}

function addGlobalStyles(options: Schema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const stylesPath = 'src/styles.css';
    
    const themeVariables = options.theme === 'dark' ? `
:root {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --card: 222.2 84% 4.9%;
  --card-foreground: 210 40% 98%;
  --popover: 222.2 84% 4.9%;
  --popover-foreground: 210 40% 98%;
  --primary: 210 40% 98%;
  --primary-foreground: 222.2 84% 4.9%;
  --secondary: 217.2 32.6% 17.5%;
  --secondary-foreground: 210 40% 98%;
  --muted: 217.2 32.6% 17.5%;
  --muted-foreground: 215 20.2% 65.1%;
  --accent: 217.2 32.6% 17.5%;
  --accent-foreground: 210 40% 98%;
  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 210 40% 98%;
  --border: 217.2 32.6% 17.5%;
  --input: 217.2 32.6% 17.5%;
  --ring: 212.7 26.8% 83.9%;
  --radius: 0.5rem;
}` : `
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96%;
  --secondary-foreground: 222.2 84% 4.9%;
  --muted: 210 40% 96%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96%;
  --accent-foreground: 222.2 84% 4.9%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 222.2 84% 4.9%;
  --radius: 0.5rem;
}`;

    const newStyles = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
${themeVariables}
`;

    if (tree.exists(stylesPath)) {
      const currentStyles = tree.read(stylesPath)?.toString() || '';
      const updatedStyles = newStyles + '\n' + currentStyles;
      tree.overwrite(stylesPath, updatedStyles);
    } else {
      tree.create(stylesPath, newStyles);
    }

    context.logger.info('🎨 Added Angular SuperUI styles');
    return tree;
  };
}

function addModuleImports(options: Schema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info('✨ Angular SuperUI has been successfully added to your project!');
    context.logger.info('');
    context.logger.info('Next steps:');
    context.logger.info('1. Import components in your modules or standalone components:');
    context.logger.info('   import { Alert, Button, Input } from "@your-org/angular-superui";');
    context.logger.info('');
    context.logger.info('2. Use the components in your templates:');
    context.logger.info('   <lib-button variant="primary">Click me</lib-button>');
    context.logger.info('   <lib-alert variant="success">Success message</lib-alert>');
    
    return tree;
  };
}
