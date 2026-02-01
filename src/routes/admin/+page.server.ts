import type { PageServerLoad } from './$types';
import { getAllPosts } from '$lib/server/db';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ platform }) => {
    if (!platform?.env?.DB) {
        throw error(500, 'Database not configured');
    }

    const posts = await getAllPosts(platform.env.DB);

    return {
        posts
    };
};
