import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, platform, locals }) => {
    if (!platform?.env?.IMAGES) {
        throw error(500, 'Image storage not configured');
    }

    if (!locals.user?.isAdmin) {
        throw error(401, 'Unauthorized');
    }

    try {
        const formData = await request.formData();
        const file = formData.get('file') as File | null;

        if (!file) {
            throw error(400, 'No file provided');
        }

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            throw error(400, 'Invalid file type. Allowed: JPEG, PNG, GIF, WebP');
        }

        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            throw error(400, 'File too large. Maximum size is 10MB');
        }

        // Generate unique filename
        const ext = file.name.split('.').pop() || 'jpg';
        const filename = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${ext}`;
        const key = `uploads/${filename}`;

        // Upload to R2
        const arrayBuffer = await file.arrayBuffer();
        await platform.env.IMAGES.put(key, arrayBuffer, {
            httpMetadata: {
                contentType: file.type
            }
        });

        // Return the URL (you'll need to configure a custom domain or use R2 public access)
        const url = `/api/images/${key}`;

        return json({ url, key });
    } catch (err) {
        console.error('Upload error:', err);
        if (err instanceof Response) throw err;
        throw error(500, 'Failed to upload file');
    }
};
