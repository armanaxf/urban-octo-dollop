// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
    namespace App {
        // interface Error {}
        interface Locals {
            session: {
                username: string;
                createdAt: number;
            } | null;
        }
        // interface PageData {}
        // interface PageState {}
        interface Platform {
            env: {
                ADMIN_PASSWORD?: string;
                SESSION_SECRET?: string;
                PUBLIC_UMAMI_WEBSITE_ID?: string;
                PUBLIC_UMAMI_SCRIPT_URL?: string;
                PUBLIC_CLOUDINARY_CLOUD_NAME?: string;
                PUBLIC_CLOUDINARY_UPLOAD_PRESET?: string;
            };
            context: {
                waitUntil(promise: Promise<unknown>): void;
            };
            caches: CacheStorage & { default: Cache };
        }
    }
}

export {};
