import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ platform, cookies }) => {
    if (!platform?.env?.GITHUB_CLIENT_ID) {
        throw redirect(302, '/login?error=config');
    }

    // Generate state for CSRF protection
    const state = crypto.randomUUID();

    // Store state in cookie for verification
    cookies.set('oauth_state', state, {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 60 * 10 // 10 minutes
    });

    const params = new URLSearchParams({
        client_id: platform.env.GITHUB_CLIENT_ID,
        redirect_uri: `${platform.env.SITE_URL}/auth/github/callback`,
        scope: 'read:user user:email',
        state
    });

    throw redirect(302, `https://github.com/login/oauth/authorize?${params}`);
};
