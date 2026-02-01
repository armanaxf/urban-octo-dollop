import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { createPost, getAllPosts } from '$lib/server/db';

export const GET: RequestHandler = async ({ platform, locals }) => {
    if (!platform?.env?.DB) {
        throw error(500, 'Database not configured');
    }

    // Only allow authenticated admins
    if (!locals.user?.isAdmin) {
        throw error(401, 'Unauthorized');
    }

    const posts = await getAllPosts(platform.env.DB);
    return json(posts);
};

export const POST: RequestHandler = async ({ request, platform, locals }) => {
    if (!platform?.env?.DB) {
        throw error(500, 'Database not configured');
    }

    // Only allow authenticated admins
    if (!locals.user?.isAdmin) {
        throw error(401, 'Unauthorized');
    }

    try {
        const data = await request.json();

        // Validate required fields
        if (!data.title || !data.slug || !data.description || !data.content) {
            throw error(400, 'Missing required fields');
        }

        const post = await createPost(platform.env.DB, {
            title: data.title,
            slug: data.slug,
            description: data.description,
            content: data.content,
            image_url: data.image_url,
            published: data.published ?? false,
            tags: data.tags ?? []
        });

        return json(post, { status: 201 });
    } catch (err) {
        console.error('Create post error:', err);
        if (err instanceof Error && err.message.includes('UNIQUE constraint failed')) {
            throw error(400, 'A post with this slug already exists');
        }
        throw error(500, 'Failed to create post');
    }
};
