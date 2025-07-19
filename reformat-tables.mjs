import fs from 'fs';
import path from 'path';

const BASE_PATH = 'src/content/compendiums/csrd/en';

console.log('🔧 Reformatting markdown tables in CSRD files...\n');

function reformatMarkdownTable(content) {
  // Split content into lines
  const lines = content.split('\n');
  const reformattedLines = [];
  let inTable = false;
  let tableLines = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Check if this line looks like a table row
    const isTableRow = line.includes('|') && line.split('|').length >= 3;
    
    if (isTableRow && !inTable) {
      // Starting a new table
      inTable = true;
      tableLines = [line];
    } else if (isTableRow && inTable) {
      // Continue collecting table lines
      tableLines.push(line);
    } else if (inTable && !isTableRow) {
      // End of table - process and add it
      const formattedTable = formatTable(tableLines);
      reformattedLines.push(...formattedTable);
      reformattedLines.push(line); // Add the non-table line
      inTable = false;
      tableLines = [];
    } else {
      // Regular line
      reformattedLines.push(lines[i]); // Keep original spacing
    }
  }
  
  // Handle case where file ends with a table
  if (inTable && tableLines.length > 0) {
    const formattedTable = formatTable(tableLines);
    reformattedLines.push(...formattedTable);
  }
  
  return reformattedLines.join('\n');
}

function formatTable(tableLines) {
  if (tableLines.length === 0) return [];
  
  // Parse table data
  const rows = tableLines.map(line => {
    // Split by | and clean up
    const cells = line.split('|').map(cell => cell.trim());
    // Remove empty cells at start/end (from leading/trailing |)
    if (cells[0] === '') cells.shift();
    if (cells[cells.length - 1] === '') cells.pop();
    return cells;
  });
  
  if (rows.length === 0) return tableLines;
  
  // Determine if second row is a separator row
  let headerRowIndex = -1;
  let separatorRowIndex = -1;
  
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const isSeparator = row.every(cell => 
      /^[-:\s]*$/.test(cell) && cell.includes('-')
    );
    
    if (isSeparator) {
      separatorRowIndex = i;
      headerRowIndex = i - 1;
      break;
    }
  }
  
  // Calculate column widths
  const maxCols = Math.max(...rows.map(row => row.length));
  const columnWidths = new Array(maxCols).fill(0);
  
  rows.forEach(row => {
    row.forEach((cell, colIndex) => {
      if (colIndex < columnWidths.length) {
        columnWidths[colIndex] = Math.max(
          columnWidths[colIndex], 
          cell.length,
          3 // Minimum width
        );
      }
    });
  });
  
  // Format rows
  const formattedRows = [];
  
  rows.forEach((row, rowIndex) => {
    // Pad row to match max columns
    while (row.length < maxCols) {
      row.push('');
    }
    
    // Format each cell with proper padding
    const formattedCells = row.map((cell, colIndex) => {
      return cell.padEnd(columnWidths[colIndex]);
    });
    
    const formattedRow = `| ${formattedCells.join(' | ')} |`;
    formattedRows.push(formattedRow);
    
    // Add separator after header if this is a header row
    if (rowIndex === headerRowIndex) {
      const separatorCells = columnWidths.map(width => '-'.repeat(width));
      const separatorRow = `| ${separatorCells.join(' | ')} |`;
      formattedRows.push(separatorRow);
      // Skip the original separator row
      if (separatorRowIndex === rowIndex + 1) {
        rows.splice(separatorRowIndex, 1);
      }
    }
  });
  
  return formattedRows;
}

function processFile(filePath) {
  try {
    console.log(`📄 Processing: ${path.relative(process.cwd(), filePath)}`);
    
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Only process if file contains tables
    if (!content.includes('|')) {
      console.log(`   ✓ No tables found`);
      return false;
    }
    
    const reformattedContent = reformatMarkdownTable(content);
    
    // Only write if content changed
    if (reformattedContent !== content) {
      fs.writeFileSync(filePath, reformattedContent, 'utf-8');
      console.log(`   ✅ Reformatted tables`);
      return true;
    } else {
      console.log(`   ✓ Tables already properly formatted`);
      return false;
    }
  } catch (error) {
    console.error(`   ❌ Error processing file: ${error.message}`);
    return false;
  }
}

function processDirectory(dirPath) {
  let totalProcessed = 0;
  let totalModified = 0;
  
  function processRecursively(currentPath) {
    try {
      const items = fs.readdirSync(currentPath, { withFileTypes: true });
      
      for (const item of items) {
        const fullPath = path.join(currentPath, item.name);
        
        if (item.isDirectory()) {
          processRecursively(fullPath);
        } else if (item.isFile() && (item.name.endsWith('.md') || item.name.endsWith('.mdx'))) {
          totalProcessed++;
          if (processFile(fullPath)) {
            totalModified++;
          }
        }
      }
    } catch (error) {
      console.error(`❌ Error reading directory ${currentPath}: ${error.message}`);
    }
  }
  
  processRecursively(dirPath);
  
  return { totalProcessed, totalModified };
}

// Main execution
if (!fs.existsSync(BASE_PATH)) {
  console.error(`❌ Base path does not exist: ${BASE_PATH}`);
  process.exit(1);
}

console.log(`📁 Processing all markdown files in: ${BASE_PATH}\n`);

const { totalProcessed, totalModified } = processDirectory(BASE_PATH);

console.log(`\n✨ Table reformatting complete!`);
console.log(`📊 Statistics:`);
console.log(`   • Files processed: ${totalProcessed}`);
console.log(`   • Files modified: ${totalModified}`);
console.log(`   • Files unchanged: ${totalProcessed - totalModified}`);

if (totalModified > 0) {
  console.log('\n🎯 Next steps:');
  console.log('  git add .');
  console.log('  git commit -m "reformat: standardize markdown table formatting"');
  console.log('  git push');
}