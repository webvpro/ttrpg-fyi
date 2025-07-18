import fs from 'fs';
import path from 'path';

const PAGES_DIR = path.join(process.cwd(), 'src', 'pages');

/**
 * Recursively finds and fixes [...page].astro files that use Astro.request
 * @param {string} directory The directory to scan
 */
function processDirectory(directory) {
  const items = fs.readdirSync(directory, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(directory, item.name);

    if (item.isDirectory()) {
      // It's a folder, go deeper
      processDirectory(fullPath);
    } else if (item.isFile() && item.name.includes('[...page]') && item.name.endsWith('.astro')) {
      // It's a [...page].astro file, let's process it
      try {
        let content = fs.readFileSync(fullPath, 'utf-8');
        let modified = false;

        // Check if file contains Astro.request usage
        if (content.includes('Astro.request')) {
          console.log(`🔍 Found Astro.request usage in: ${path.relative(process.cwd(), fullPath)}`);

          // Replace common Astro.request patterns with safe alternatives
          const replacements = [
            // Replace direct header access
            {
              pattern: /Astro\.request\.headers/g,
              replacement: '(Astro.request?.headers || new Headers())'
            },
            // Replace URL access
            {
              pattern: /Astro\.request\.url/g,
              replacement: '(Astro.request?.url || "")'
            },
            // Replace method access
            {
              pattern: /Astro\.request\.method/g,
              replacement: '(Astro.request?.method || "GET")'
            },
            // Replace general request access with conditional
            {
              pattern: /(?<!Astro\.request\?)Astro\.request(?!\?)/g,
              replacement: 'Astro.request'
            }
          ];

          for (const { pattern, replacement } of replacements) {
            if (pattern.test(content)) {
              content = content.replace(pattern, replacement);
              modified = true;
            }
          }

          // If we found direct Astro.request usage, wrap it safely
          if (content.includes('Astro.request') && !content.includes('Astro.request?')) {
            // Add a comment explaining the fix
            const commentToAdd = `
// Note: Astro.request is not available during prerendering (prerender = true)
// This page is statically generated, so request data is not needed`;

            // Find the frontmatter section and add the comment
            const frontmatterStart = content.indexOf('---');
            const frontmatterEnd = content.indexOf('---', frontmatterStart + 3);
            
            if (frontmatterStart !== -1 && frontmatterEnd !== -1) {
              content = content.slice(0, frontmatterEnd) + commentToAdd + '\n' + content.slice(frontmatterEnd);
              modified = true;
            }
          }

          if (modified) {
            fs.writeFileSync(fullPath, content, 'utf-8');
            console.log(`✅ Fixed: ${path.relative(process.cwd(), fullPath)}`);
          } else {
            console.log(`ℹ️  No changes needed: ${path.relative(process.cwd(), fullPath)}`);
          }
        } else {
          console.log(`✅ Clean: ${path.relative(process.cwd(), fullPath)}`);
        }
      } catch (error) {
        console.error(`❌ Error processing ${fullPath}:`, error.message);
      }
    }
  }
}

console.log('🚀 Starting script to fix Astro.request usage in [...page].astro files...');
console.log('---');

if (fs.existsSync(PAGES_DIR)) {
  processDirectory(PAGES_DIR);
} else {
  console.error(`Error: Directory not found at ${PAGES_DIR}`);
}

console.log('---');
console.log('✨ Script finished. Check the output above for any files that were modified.');
console.log('💡 Tip: If no Astro.request usage was found, the warning might be coming from a layout or component.');