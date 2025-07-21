# PowerShell script to add SEO to all component demo files
$componentsPath = "projects\showcase\src\app\demo-components"

# List of components that need SEO (excluding dialog which already has it)
$components = @("accordion", "alert", "avatar", "badge", "breadcrumb", "calendar", "carousel", "checkbox")

foreach ($component in $components) {
    $filePath = "$componentsPath\$component-demo.component.ts"
    
    if (Test-Path $filePath) {
        Write-Host "Adding SEO to $component component..."
        
        # Read the file content
        $content = Get-Content $filePath -Raw
        
        # Check if SEO is already implemented
        if ($content -notmatch "SEOService") {
            # Add SEO import
            $content = $content -replace 
                "import \{ Component(.*?) \} from '@angular/core';",
                "import { Component, OnInit, inject$1 } from '@angular/core';"
            
            # Add SEO service import (add after the last import)
            $lastImportIndex = $content.LastIndexOf("import")
            $endOfLastImport = $content.IndexOf(";", $lastImportIndex) + 1
            $beforeImports = $content.Substring(0, $endOfLastImport)
            $afterImports = $content.Substring($endOfLastImport)
            
            $seoImport = "`nimport { SEOService } from '../services/seo.service';"
            $content = $beforeImports + $seoImport + $afterImports
            
            # Add OnInit implementation to class
            $content = $content -replace 
                "export class (\w+)Component \{",
                "export class `$1Component implements OnInit {"
            
            # Add SEO service injection after the class opening
            $classOpeningRegex = "(export class \w+Component implements OnInit \{\s*)"
            $seoServiceInjection = "`$1private seoService = inject(SEOService);`n`n  ngOnInit() {`n    // Update SEO for $component component page`n    this.seoService.updateSEO(this.seoService.getComponentSEO('$component'));`n    this.seoService.addComponentStructuredData('$component');`n  }`n`n  "
            
            $content = $content -replace $classOpeningRegex, $seoServiceInjection
            
            # Write the updated content back
            Set-Content $filePath $content -Encoding UTF8
            
            Write-Host "✅ Added SEO to $component component"
        } else {
            Write-Host "⏭️  SEO already exists in $component component"
        }
    } else {
        Write-Host "❌ File not found: $filePath"
    }
}

Write-Host "`n🎉 SEO optimization complete for all components!"
