# PowerShell script to fix CSS classes in dialog demo component
$filePath = "projects\showcase\src\app\demo-components\dialog-demo.component.html"

# Read the file content
$content = Get-Content $filePath -Raw

# Replace non-standard classes with proper Tailwind classes
$content = $content -replace 'text-muted-foreground', 'text-gray-600 dark:text-gray-400'
$content = $content -replace 'border-input', 'border-gray-300 dark:border-gray-600'
$content = $content -replace 'bg-background', 'bg-white dark:bg-gray-800'
$content = $content -replace 'text-foreground', 'text-gray-900 dark:text-white'
$content = $content -replace 'hover:bg-muted', 'hover:bg-gray-100 dark:hover:bg-gray-700'
$content = $content -replace 'placeholder:text-muted-foreground', 'placeholder:text-gray-500 dark:placeholder:text-gray-400'

# Write the updated content back to the file
Set-Content $filePath $content

Write-Host "Fixed CSS classes in dialog demo component"
