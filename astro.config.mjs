// @ts-check
import { existsSync } from 'node:fs';
import { cp, readdir, readFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-iconset';
import tailwindcss from '@tailwindcss/vite';

/** @param {string} directory */
async function getHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nestedFiles = await Promise.all(entries.map(async (entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return getHtmlFiles(entryPath);
    return entry.name.endsWith('.html') ? [entryPath] : [];
  }));
  return nestedFiles.flat();
}

// https://astro.build/config
export default defineConfig({
  site: 'https://www.decosupplier.com',
  output: 'static',
  trailingSlash: 'never',
  hooks: {
    'astro:build:start': async () => {
      await rm(path.join(process.cwd(), 'public', 'generated'), { recursive: true, force: true });
    },
    'astro:build:done': async ({ dir }) => {
      const sourceDirectory = path.join(process.cwd(), 'public', 'generated');
      const targetDirectory = path.join(dir.pathname, 'generated');
      if (existsSync(sourceDirectory)) {
        await cp(sourceDirectory, targetDirectory, { recursive: true, force: true });
      }

      const nocobaseBaseUrl = process.env.NOCObase_API_BASE_URL?.trim().replace(/\/$/, '');
      if (!nocobaseBaseUrl) return;

      const htmlFiles = await getHtmlFiles(dir.pathname);
      const htmlContents = await Promise.all(htmlFiles.map((file) => readFile(file, 'utf8')));
      if (htmlContents.some((html) => html.includes(nocobaseBaseUrl))) {
        throw new Error(`Static build contains a remote NocoBase URL: ${nocobaseBaseUrl}`);
      }
    },
  },
  integrations: [
    react(),
    sitemap({
      filter: (page) => !/\/products\/[^/]+\/Product_detail\/?$/.test(new URL(page).pathname),
    }),
    icon(),
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});
