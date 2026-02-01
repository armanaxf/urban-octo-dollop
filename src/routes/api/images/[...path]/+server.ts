import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, platform }) => {
    if (!platform?.env?.IMAGES) {
        throw error(500, 'Image storage not configured');
    }

    const key = params.path;
    if (!key) {
        throw error(400, 'Invalid image path');
    }

    const object = await platform.env.IMAGES.get(key);

    if (!object) {
        throw error(404, 'Image not found');
    }

    const headers = new Headers();
    headers.set('Content-Type', object.httpMetadata?.contentType || 'application/octet-stream');
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    headers.set('ETag', object.etag);

    return new Response(object.body, { headers });
};
