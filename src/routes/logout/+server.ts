import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { deleteSession } from '$lib/server/db';

export const GET: RequestHandler = async ({ locals, platform, cookies }) => {
    if (locals.session && platform?.env?.DB) {
        await deleteSession(platform.env.DB, locals.session.id);
    }

    cookies.delete('session', { path: '/' });

    throw redirect(302, '/');
};
