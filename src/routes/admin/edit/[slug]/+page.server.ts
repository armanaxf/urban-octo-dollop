import type { PageServerLoad } from './$types';
import { getPostBySlug } from '$lib/server/db';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, platform }) => {
    if (!platform?.env?.DB) {
        throw error(500, 'Database not configured');
    }

    const post = await getPostBySlug(platform.env.DB, params.slug);

    if (!post) {
        throw error(404, 'Post not found');
    }

    return {
        post
    };
};
