import type { PageServerLoad } from './$types';
import { getPublishedPosts } from '$lib/server/posts';

export const load: PageServerLoad = async () => {
    const allPosts = await getPublishedPosts();
    const posts = allPosts.slice(0, 3);

    return {
        posts
    };
};
