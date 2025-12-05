import { createHmac, timingSafeEqual } from 'crypto';

const SECRET = import.meta.env.SESSION_SECRET || 'default-secret-change-me';

export interface Session {
    username: string;
    createdAt: number;
}

/**
 * Create a signed session token
 */
export function createSessionToken(session: Session): string {
    const payload = JSON.stringify(session);
    const signature = createHmac('sha256', SECRET).update(payload).digest('hex');
    const token = Buffer.from(payload).toString('base64') + '.' + signature;
    return token;
}

/**
 * Verify and decode a session token
 */
export function verifySessionToken(token: string): Session | null {
    try {
        const [payloadBase64, signature] = token.split('.');
        if (!payloadBase64 || !signature) return null;

        const payload = Buffer.from(payloadBase64, 'base64').toString('utf-8');
        const expectedSignature = createHmac('sha256', SECRET).update(payload).digest('hex');

        // Use timing-safe comparison to prevent timing attacks
        const signatureBuffer = Buffer.from(signature, 'hex');
        const expectedBuffer = Buffer.from(expectedSignature, 'hex');

        if (signatureBuffer.length !== expectedBuffer.length) return null;
        if (!timingSafeEqual(signatureBuffer, expectedBuffer)) return null;

        const session = JSON.parse(payload) as Session;

        // Check if session is expired (24 hours)
        const maxAge = 24 * 60 * 60 * 1000; // 24 hours in ms
        if (Date.now() - session.createdAt > maxAge) return null;

        return session;
    } catch {
        return null;
    }
}

/**
 * Verify admin password
 */
export function verifyPassword(password: string): boolean {
    const adminPassword = import.meta.env.ADMIN_PASSWORD || 'admin';
    return password === adminPassword;
}
