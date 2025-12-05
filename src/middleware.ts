import { defineMiddleware } from 'astro:middleware';
import { verifySessionToken, type Session } from './lib/auth';

declare global {
    namespace App {
        interface Locals {
            session: Session | null;
        }
    }
}

export const onRequest = defineMiddleware(async (context, next) => {
    // Get session from cookie
    const sessionCookie = context.cookies.get('session');
    let session: Session | null = null;

    if (sessionCookie) {
        session = verifySessionToken(sessionCookie.value);
    }

    // Attach session to locals
    context.locals.session = session;

    // Protect admin routes
    if (context.url.pathname.startsWith('/admin')) {
        if (!session) {
            return context.redirect('/login');
        }
    }

    return next();
});
