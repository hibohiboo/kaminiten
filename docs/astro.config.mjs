import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://d2k9ctsweqhomg.cloudfront.net/',
	integrations: [mdx(), sitemap()],
  base:  '/docs' // import.meta.env.DEV ? "" : "/docs",
});
