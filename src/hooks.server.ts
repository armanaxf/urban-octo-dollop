import type { Handle } from '@sveltejs/kit';
import { getSession, getUserById } from '$lib/server/db';

export const handle: Handle = async ({ event, resolve }) => {
    // Initialize user and session as null
    event.locals.user = null;
    event.locals.session = null;

    // Get session cookie
    const sessionId = event.cookies.get('session');

    if (sessionId && event.platform?.env?.DB) {
        try {
            const session = await getSession(event.platform.env.DB, sessionId);

            if (session) {
                const user = await getUserById(event.platform.env.DB, session.user_id);

                if (user) {
                    event.locals.user = {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        avatarUrl: user.avatar_url,
                        isAdmin: user.is_admin
                    };
                    event.locals.session = {
                        id: session.id,
                        userId: session.user_id,
                        expiresAt: new Date(session.expires_at)
                    };
                }
            }
        } catch (error) {
            console.error('Session validation error:', error);
        }
    }

    // Protect admin routes
    if (event.url.pathname.startsWith('/admin')) {
        if (!event.locals.user?.isAdmin) {
            return new Response(null, {
                status: 302,
                headers: {
                    location: '/login'
                }
            });
        }
    }

    return resolve(event);
};
