import { createHmac, timingSafeEqual } from 'crypto';

export interface Session {
    username: string;
    createdAt: number;
}

/**
 * Create a signed session token
 */
export function createSessionToken(session: Session, secret: string): string {
    const payload = JSON.stringify(session);
    const signature = createHmac('sha256', secret).update(payload).digest('hex');
    const token = Buffer.from(payload).toString('base64') + '.' + signature;
    return token;
}

/**
 * Verify and decode a session token
 */
export function verifySessionToken(token: string, secret: string): Session | null {
    try {
        const [payloadBase64, signature] = token.split('.');
        if (!payloadBase64 || !signature) return null;

        const payload = Buffer.from(payloadBase64, 'base64').toString('utf-8');
        const expectedSignature = createHmac('sha256', secret).update(payload).digest('hex');

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
export function verifyPassword(password: string, adminPassword: string): boolean {
    return password === adminPassword;
}

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; lastAttempt: number }>();

export function checkRateLimit(ip: string): { allowed: boolean; waitTime?: number } {
    const now = Date.now();
    const windowMs = 15 * 60 * 1000; // 15 minutes
    const maxAttempts = 5;

    const record = rateLimitMap.get(ip);

    if (!record) {
        rateLimitMap.set(ip, { count: 1, lastAttempt: now });
        return { allowed: true };
    }

    // Clean up old record if window passed
    if (now - record.lastAttempt > windowMs) {
        rateLimitMap.set(ip, { count: 1, lastAttempt: now });
        return { allowed: true };
    }

    // Check attempts
    if (record.count >= maxAttempts) {
        const remainingTime = Math.ceil((windowMs - (now - record.lastAttempt)) / 1000 / 60);
        return { allowed: false, waitTime: remainingTime };
    }

    // Increment count
    record.count++;
    record.lastAttempt = now;
    return { allowed: true };
}
