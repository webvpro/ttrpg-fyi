// src: cs-directories-loader.ts
// This file is used to load directories in the project root for a specific use case.

import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';

export async function csRootDirectoryLoader() {
  const rootPath = fileURLToPath(new URL('./src/content/compendiums/csrd/en', import.meta.url)); // Get project root
  const entries: { id: string; }[] = [];

  const files = await fs.promises.readdir(rootPath); // Read files in root directory

  for (const file of files) {
    const filePath = path.join(rootPath, file);
    const stat = await fs.promises.stat(filePath);

    if (stat.isDirectory()) { // Check if it's a directory
      entries.push({ id: file }); // Add to entries if it's a directory
    }
  }

  return entries;
}
