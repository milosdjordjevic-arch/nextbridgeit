import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://nextbridgeit.net',
  compressHTML: true,
  integrations: [sitemap()],
});
