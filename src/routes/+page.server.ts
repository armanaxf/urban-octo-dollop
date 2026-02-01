import type { PageServerLoad } from './$types';
import { getPublishedPosts } from '$lib/server/db';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ platform }) => {
    if (!platform?.env?.DB) {
        throw error(500, 'Database not configured');
    }

    const allPosts = await getPublishedPosts(platform.env.DB);
    const posts = allPosts.slice(0, 3);

    return {
        posts
    };
};
