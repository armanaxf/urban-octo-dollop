import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getPostById, updatePost, deletePost } from '$lib/server/db';

export const GET: RequestHandler = async ({ params, platform, locals }) => {
    if (!platform?.env?.DB) {
        throw error(500, 'Database not configured');
    }

    if (!locals.user?.isAdmin) {
        throw error(401, 'Unauthorized');
    }

    const id = parseInt(params.id);
    if (isNaN(id)) {
        throw error(400, 'Invalid post ID');
    }

    const post = await getPostById(platform.env.DB, id);
    if (!post) {
        throw error(404, 'Post not found');
    }

    return json(post);
};

export const PUT: RequestHandler = async ({ params, request, platform, locals }) => {
    if (!platform?.env?.DB) {
        throw error(500, 'Database not configured');
    }

    if (!locals.user?.isAdmin) {
        throw error(401, 'Unauthorized');
    }

    const id = parseInt(params.id);
    if (isNaN(id)) {
        throw error(400, 'Invalid post ID');
    }

    try {
        const data = await request.json();

        const post = await updatePost(platform.env.DB, id, {
            title: data.title,
            slug: data.slug,
            description: data.description,
            content: data.content,
            image_url: data.image_url,
            published: data.published,
            tags: data.tags
        });

        return json(post);
    } catch (err) {
        console.error('Update post error:', err);
        if (err instanceof Error && err.message.includes('UNIQUE constraint failed')) {
            throw error(400, 'A post with this slug already exists');
        }
        if (err instanceof Error && err.message === 'Post not found') {
            throw error(404, 'Post not found');
        }
        throw error(500, 'Failed to update post');
    }
};

export const DELETE: RequestHandler = async ({ params, platform, locals }) => {
    if (!platform?.env?.DB) {
        throw error(500, 'Database not configured');
    }

    if (!locals.user?.isAdmin) {
        throw error(401, 'Unauthorized');
    }

    const id = parseInt(params.id);
    if (isNaN(id)) {
        throw error(400, 'Invalid post ID');
    }

    await deletePost(platform.env.DB, id);

    return new Response(null, { status: 204 });
};
