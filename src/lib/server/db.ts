// Database types
export interface Post {
    id: number;
    slug: string;
    title: string;
    description: string;
    content: string;
    image_url: string | null;
    published: boolean;
    created_at: string;
    updated_at: string;
    published_at: string | null;
}

export interface Tag {
    id: number;
    name: string;
    slug: string;
}

export interface PostWithTags extends Post {
    tags: Tag[];
}

export interface User {
    id: number;
    provider: string;
    provider_id: string;
    email: string | null;
    name: string | null;
    avatar_url: string | null;
    is_admin: boolean;
    created_at: string;
}

export interface Session {
    id: string;
    user_id: number;
    expires_at: string;
}

// Posts functions
export async function getAllPosts(db: D1Database): Promise<PostWithTags[]> {
    const result = await db.prepare(`
        SELECT * FROM posts ORDER BY created_at DESC
    `).all<Post>();

    const posts = result.results;
    return Promise.all(posts.map(post => attachTags(db, post)));
}

export async function getPublishedPosts(db: D1Database): Promise<PostWithTags[]> {
    const result = await db.prepare(`
        SELECT * FROM posts
        WHERE published = TRUE
        ORDER BY published_at DESC
    `).all<Post>();

    const posts = result.results;
    return Promise.all(posts.map(post => attachTags(db, post)));
}

export async function getPostBySlug(db: D1Database, slug: string): Promise<PostWithTags | null> {
    const post = await db.prepare(`
        SELECT * FROM posts WHERE slug = ?
    `).bind(slug).first<Post>();

    if (!post) return null;
    return attachTags(db, post);
}

export async function getPostById(db: D1Database, id: number): Promise<PostWithTags | null> {
    const post = await db.prepare(`
        SELECT * FROM posts WHERE id = ?
    `).bind(id).first<Post>();

    if (!post) return null;
    return attachTags(db, post);
}

export async function createPost(
    db: D1Database,
    data: {
        slug: string;
        title: string;
        description: string;
        content: string;
        image_url?: string;
        published?: boolean;
        tags?: string[];
    }
): Promise<Post> {
    const now = new Date().toISOString();
    const published = data.published ?? false;
    const publishedAt = published ? now : null;

    const result = await db.prepare(`
        INSERT INTO posts (slug, title, description, content, image_url, published, created_at, updated_at, published_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
        data.slug,
        data.title,
        data.description,
        data.content,
        data.image_url ?? null,
        published,
        now,
        now,
        publishedAt
    ).run();

    const postId = result.meta.last_row_id;

    // Add tags if provided
    if (data.tags && data.tags.length > 0) {
        await syncPostTags(db, postId, data.tags);
    }

    const post = await getPostById(db, postId);
    if (!post) throw new Error('Failed to create post');
    return post;
}

export async function updatePost(
    db: D1Database,
    id: number,
    data: {
        slug?: string;
        title?: string;
        description?: string;
        content?: string;
        image_url?: string | null;
        published?: boolean;
        tags?: string[];
    }
): Promise<Post> {
    const existing = await getPostById(db, id);
    if (!existing) throw new Error('Post not found');

    const now = new Date().toISOString();

    // Determine published_at
    let publishedAt = existing.published_at;
    if (data.published === true && !existing.published) {
        // Publishing for the first time
        publishedAt = now;
    } else if (data.published === false) {
        // Unpublishing
        publishedAt = null;
    }

    await db.prepare(`
        UPDATE posts SET
            slug = ?,
            title = ?,
            description = ?,
            content = ?,
            image_url = ?,
            published = ?,
            updated_at = ?,
            published_at = ?
        WHERE id = ?
    `).bind(
        data.slug ?? existing.slug,
        data.title ?? existing.title,
        data.description ?? existing.description,
        data.content ?? existing.content,
        data.image_url !== undefined ? data.image_url : existing.image_url,
        data.published ?? existing.published,
        now,
        publishedAt,
        id
    ).run();

    // Sync tags if provided
    if (data.tags !== undefined) {
        await syncPostTags(db, id, data.tags);
    }

    const post = await getPostById(db, id);
    if (!post) throw new Error('Failed to update post');
    return post;
}

export async function deletePost(db: D1Database, id: number): Promise<void> {
    await db.prepare('DELETE FROM posts WHERE id = ?').bind(id).run();
}

// Tags functions
async function attachTags(db: D1Database, post: Post): Promise<PostWithTags> {
    const result = await db.prepare(`
        SELECT t.* FROM tags t
        JOIN post_tags pt ON t.id = pt.tag_id
        WHERE pt.post_id = ?
    `).bind(post.id).all<Tag>();

    return { ...post, tags: result.results };
}

export async function getAllTags(db: D1Database): Promise<Tag[]> {
    const result = await db.prepare('SELECT * FROM tags ORDER BY name').all<Tag>();
    return result.results;
}

export async function getOrCreateTag(db: D1Database, name: string): Promise<Tag> {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    let tag = await db.prepare('SELECT * FROM tags WHERE slug = ?').bind(slug).first<Tag>();

    if (!tag) {
        await db.prepare('INSERT INTO tags (name, slug) VALUES (?, ?)').bind(name, slug).run();
        tag = await db.prepare('SELECT * FROM tags WHERE slug = ?').bind(slug).first<Tag>();
    }

    return tag!;
}

async function syncPostTags(db: D1Database, postId: number, tagNames: string[]): Promise<void> {
    // Remove existing tags
    await db.prepare('DELETE FROM post_tags WHERE post_id = ?').bind(postId).run();

    // Add new tags
    for (const name of tagNames) {
        if (!name.trim()) continue;
        const tag = await getOrCreateTag(db, name.trim());
        await db.prepare('INSERT INTO post_tags (post_id, tag_id) VALUES (?, ?)').bind(postId, tag.id).run();
    }
}

// User functions
export async function getUserById(db: D1Database, id: number): Promise<User | null> {
    return db.prepare('SELECT * FROM users WHERE id = ?').bind(id).first<User>();
}

export async function getUserByProvider(db: D1Database, provider: string, providerId: string): Promise<User | null> {
    return db.prepare('SELECT * FROM users WHERE provider = ? AND provider_id = ?').bind(provider, providerId).first<User>();
}

export async function createUser(
    db: D1Database,
    data: {
        provider: string;
        provider_id: string;
        email?: string;
        name?: string;
        avatar_url?: string;
        is_admin?: boolean;
    }
): Promise<User> {
    await db.prepare(`
        INSERT INTO users (provider, provider_id, email, name, avatar_url, is_admin)
        VALUES (?, ?, ?, ?, ?, ?)
    `).bind(
        data.provider,
        data.provider_id,
        data.email ?? null,
        data.name ?? null,
        data.avatar_url ?? null,
        data.is_admin ?? false
    ).run();

    const user = await getUserByProvider(db, data.provider, data.provider_id);
    if (!user) throw new Error('Failed to create user');
    return user;
}

// Session functions
export async function createSession(db: D1Database, userId: number): Promise<Session> {
    const id = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(); // 30 days

    await db.prepare(`
        INSERT INTO sessions (id, user_id, expires_at)
        VALUES (?, ?, ?)
    `).bind(id, userId, expiresAt).run();

    return { id, user_id: userId, expires_at: expiresAt };
}

export async function getSession(db: D1Database, sessionId: string): Promise<Session | null> {
    const session = await db.prepare(`
        SELECT * FROM sessions WHERE id = ? AND expires_at > datetime('now')
    `).bind(sessionId).first<Session>();

    return session;
}

export async function deleteSession(db: D1Database, sessionId: string): Promise<void> {
    await db.prepare('DELETE FROM sessions WHERE id = ?').bind(sessionId).run();
}

export async function cleanExpiredSessions(db: D1Database): Promise<void> {
    await db.prepare("DELETE FROM sessions WHERE expires_at <= datetime('now')").run();
}
