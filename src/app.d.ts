// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
    namespace App {
        // interface Error {}
        interface Locals {
            user: {
                id: number;
                email: string | null;
                name: string | null;
                avatarUrl: string | null;
                isAdmin: boolean;
            } | null;
            session: {
                id: string;
                userId: number;
                expiresAt: Date;
            } | null;
        }
        // interface PageData {}
        // interface PageState {}
        interface Platform {
            env: {
                // D1 Database
                DB: D1Database;
                // R2 Bucket for images
                IMAGES: R2Bucket;
                // KV for sessions (optional, can use D1)
                SESSIONS: KVNamespace;
                // OAuth credentials
                GITHUB_CLIENT_ID: string;
                GITHUB_CLIENT_SECRET: string;
                GOOGLE_CLIENT_ID?: string;
                GOOGLE_CLIENT_SECRET?: string;
                // Site config
                SITE_URL: string;
            };
            context: {
                waitUntil(promise: Promise<unknown>): void;
            };
            caches: CacheStorage & { default: Cache };
        }
    }
}

// Cloudflare Workers types
interface D1Database {
    prepare(query: string): D1PreparedStatement;
    dump(): Promise<ArrayBuffer>;
    batch<T = unknown>(statements: D1PreparedStatement[]): Promise<D1Result<T>[]>;
    exec(query: string): Promise<D1ExecResult>;
}

interface D1PreparedStatement {
    bind(...values: unknown[]): D1PreparedStatement;
    first<T = unknown>(colName?: string): Promise<T | null>;
    run(): Promise<D1Result>;
    all<T = unknown>(): Promise<D1Result<T>>;
    raw<T = unknown>(): Promise<T[]>;
}

interface D1Result<T = unknown> {
    results: T[];
    success: boolean;
    error?: string;
    meta: {
        duration: number;
        changes: number;
        last_row_id: number;
        served_by: string;
    };
}

interface D1ExecResult {
    count: number;
    duration: number;
}

interface R2Bucket {
    put(key: string, value: ReadableStream | ArrayBuffer | ArrayBufferView | string | Blob, options?: R2PutOptions): Promise<R2Object>;
    get(key: string, options?: R2GetOptions): Promise<R2ObjectBody | null>;
    delete(keys: string | string[]): Promise<void>;
    list(options?: R2ListOptions): Promise<R2Objects>;
    head(key: string): Promise<R2Object | null>;
}

interface R2PutOptions {
    httpMetadata?: R2HTTPMetadata;
    customMetadata?: Record<string, string>;
}

interface R2GetOptions {
    range?: { offset?: number; length?: number; suffix?: number };
}

interface R2ListOptions {
    prefix?: string;
    cursor?: string;
    delimiter?: string;
    limit?: number;
    include?: ('httpMetadata' | 'customMetadata')[];
}

interface R2Object {
    key: string;
    version: string;
    size: number;
    etag: string;
    httpEtag: string;
    httpMetadata?: R2HTTPMetadata;
    customMetadata?: Record<string, string>;
    uploaded: Date;
}

interface R2ObjectBody extends R2Object {
    body: ReadableStream;
    bodyUsed: boolean;
    arrayBuffer(): Promise<ArrayBuffer>;
    text(): Promise<string>;
    json<T>(): Promise<T>;
    blob(): Promise<Blob>;
}

interface R2Objects {
    objects: R2Object[];
    truncated: boolean;
    cursor?: string;
    delimitedPrefixes: string[];
}

interface R2HTTPMetadata {
    contentType?: string;
    contentLanguage?: string;
    contentDisposition?: string;
    contentEncoding?: string;
    cacheControl?: string;
    cacheExpiry?: Date;
}

interface KVNamespace {
    get(key: string, options?: { type?: 'text' | 'json' | 'arrayBuffer' | 'stream'; cacheTtl?: number }): Promise<string | object | ArrayBuffer | ReadableStream | null>;
    put(key: string, value: string | ArrayBuffer | ReadableStream, options?: { expiration?: number; expirationTtl?: number; metadata?: object }): Promise<void>;
    delete(key: string): Promise<void>;
    list(options?: { prefix?: string; limit?: number; cursor?: string }): Promise<{ keys: { name: string; expiration?: number; metadata?: object }[]; list_complete: boolean; cursor?: string }>;
}

export {};
