import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getUserByProvider, createUser, createSession } from '$lib/server/db';

interface GitHubUser {
    id: number;
    login: string;
    name: string | null;
    email: string | null;
    avatar_url: string;
}

interface GitHubEmail {
    email: string;
    primary: boolean;
    verified: boolean;
}

export const GET: RequestHandler = async ({ url, platform, cookies }) => {
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    const storedState = cookies.get('oauth_state');

    // Clear the state cookie
    cookies.delete('oauth_state', { path: '/' });

    // Verify state
    if (!code || !state || state !== storedState) {
        throw redirect(302, '/login?error=invalid_state');
    }

    if (!platform?.env?.GITHUB_CLIENT_ID || !platform?.env?.GITHUB_CLIENT_SECRET || !platform?.env?.DB) {
        throw redirect(302, '/login?error=config');
    }

    try {
        // Exchange code for access token
        const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                client_id: platform.env.GITHUB_CLIENT_ID,
                client_secret: platform.env.GITHUB_CLIENT_SECRET,
                code,
                redirect_uri: `${platform.env.SITE_URL}/auth/github/callback`
            })
        });

        const tokenData = await tokenResponse.json() as { access_token?: string; error?: string };

        if (!tokenData.access_token) {
            console.error('Token error:', tokenData);
            throw redirect(302, '/login?error=token');
        }

        // Get user info from GitHub
        const userResponse = await fetch('https://api.github.com/user', {
            headers: {
                'Authorization': `Bearer ${tokenData.access_token}`,
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'JoshGiles-Blog'
            }
        });

        const githubUser = await userResponse.json() as GitHubUser;

        // Get user email if not public
        let email = githubUser.email;
        if (!email) {
            const emailResponse = await fetch('https://api.github.com/user/emails', {
                headers: {
                    'Authorization': `Bearer ${tokenData.access_token}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'User-Agent': 'JoshGiles-Blog'
                }
            });
            const emails = await emailResponse.json() as GitHubEmail[];
            const primaryEmail = emails.find(e => e.primary && e.verified);
            email = primaryEmail?.email ?? emails[0]?.email ?? null;
        }

        // Check if user exists
        let user = await getUserByProvider(platform.env.DB, 'github', String(githubUser.id));

        if (!user) {
            // Create new user (not admin by default)
            user = await createUser(platform.env.DB, {
                provider: 'github',
                provider_id: String(githubUser.id),
                email,
                name: githubUser.name ?? githubUser.login,
                avatar_url: githubUser.avatar_url,
                is_admin: false // Set to true manually in DB for first admin
            });
        }

        // Check if user is admin
        if (!user.is_admin) {
            throw redirect(302, '/login?error=unauthorized');
        }

        // Create session
        const session = await createSession(platform.env.DB, user.id);

        // Set session cookie
        cookies.set('session', session.id, {
            path: '/',
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            maxAge: 30 * 24 * 60 * 60 // 30 days
        });

        throw redirect(302, '/admin');
    } catch (error) {
        if (error instanceof Response) throw error; // Re-throw redirects
        console.error('OAuth error:', error);
        throw redirect(302, '/login?error=oauth');
    }
};
