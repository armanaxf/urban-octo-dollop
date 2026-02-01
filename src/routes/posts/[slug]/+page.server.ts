import type { PageServerLoad } from './$types';
import { getPostBySlug } from '$lib/server/posts';
import { error } from '@sveltejs/kit';
import { marked } from 'marked';

export const load: PageServerLoad = async ({ params }) => {
    const post = await getPostBySlug(params.slug);

    if (!post) {
        throw error(404, 'Post not found');
    }

    // Render markdown to HTML
    const renderedContent = await marked(post.content);

    return {
        post,
        renderedContent
    };
};
