import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
    site: 'https://example.com', // Replace with your actual site URL
    output: 'server',
    adapter: netlify(),
    integrations: [tailwind()],
});
