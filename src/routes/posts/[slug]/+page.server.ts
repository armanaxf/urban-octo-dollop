import type { PageServerLoad } from './$types';
import { getPostBySlug } from '$lib/server/db';
import { error } from '@sveltejs/kit';
import { marked } from 'marked';

export const load: PageServerLoad = async ({ params, platform, locals }) => {
    if (!platform?.env?.DB) {
        throw error(500, 'Database not configured');
    }

    const post = await getPostBySlug(platform.env.DB, params.slug);

    if (!post) {
        throw error(404, 'Post not found');
    }

    // If post is not published, only allow admin users to view
    if (!post.published && !locals.user?.isAdmin) {
        throw error(404, 'Post not found');
    }

    // Render markdown to HTML
    const renderedContent = await marked(post.content);

    return {
        post,
        renderedContent
    };
};
