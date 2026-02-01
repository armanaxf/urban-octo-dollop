import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import rehypeSlug from 'rehype-slug';

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
    extensions: ['.md', '.svx'],
    rehypePlugins: [rehypeSlug],
    layout: {
        _: './src/lib/components/MarkdownLayout.svelte'
    }
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
    extensions: ['.svelte', '.md', '.svx'],
    preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
    kit: {
        adapter: adapter({
            routes: {
                include: ['/*'],
                exclude: ['<all>']
            }
        }),
        alias: {
            $lib: './src/lib',
            $components: './src/lib/components'
        }
    }
};

export default config;
