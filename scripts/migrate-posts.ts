/**
 * Migration script to move existing Markdown posts to D1 database
 *
 * Usage:
 * 1. Set up your D1 database: wrangler d1 create blog-posts
 * 2. Run migrations: wrangler d1 execute blog-posts --file=./migrations/0001_initial_schema.sql
 * 3. Run this script: npx tsx scripts/migrate-posts.ts
 *
 * This script reads all Markdown files from src/content/posts/ and inserts them into D1.
 * Run it locally with wrangler d1 execute or deploy and run via an API endpoint.
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface PostFrontmatter {
    title: string;
    description: string;
    date: string | Date;
    tags: string[];
    image?: string;
    draft?: boolean;
}

interface MigrationPost {
    slug: string;
    title: string;
    description: string;
    content: string;
    image_url: string | null;
    published: boolean;
    created_at: string;
    updated_at: string;
    published_at: string | null;
    tags: string[];
}

const postsDir = path.join(process.cwd(), 'src/content/posts');

function parseDate(date: string | Date): string {
    if (date instanceof Date) {
        return date.toISOString();
    }
    return new Date(date).toISOString();
}

function generateSlug(filename: string): string {
    return filename.replace(/\.md$/, '');
}

async function readPosts(): Promise<MigrationPost[]> {
    const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));
    const posts: MigrationPost[] = [];

    for (const file of files) {
        const filePath = path.join(postsDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data, content } = matter(fileContent);

        const frontmatter = data as PostFrontmatter;
        const slug = generateSlug(file);
        const createdAt = parseDate(frontmatter.date);
        const published = !frontmatter.draft;

        posts.push({
            slug,
            title: frontmatter.title,
            description: frontmatter.description,
            content: content.trim(),
            image_url: frontmatter.image || null,
            published,
            created_at: createdAt,
            updated_at: createdAt,
            published_at: published ? createdAt : null,
            tags: frontmatter.tags || []
        });
    }

    return posts;
}

function generateSQL(posts: MigrationPost[]): string {
    const statements: string[] = [];

    for (const post of posts) {
        // Escape single quotes in strings
        const escape = (str: string) => str.replace(/'/g, "''");

        statements.push(`
-- Insert post: ${post.title}
INSERT INTO posts (slug, title, description, content, image_url, published, created_at, updated_at, published_at)
VALUES (
    '${escape(post.slug)}',
    '${escape(post.title)}',
    '${escape(post.description)}',
    '${escape(post.content)}',
    ${post.image_url ? `'${escape(post.image_url)}'` : 'NULL'},
    ${post.published ? 'TRUE' : 'FALSE'},
    '${post.created_at}',
    '${post.updated_at}',
    ${post.published_at ? `'${post.published_at}'` : 'NULL'}
);
`);

        // Add tags
        for (const tag of post.tags) {
            const tagSlug = tag.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
            statements.push(`
-- Tag: ${tag}
INSERT OR IGNORE INTO tags (name, slug) VALUES ('${escape(tag)}', '${escape(tagSlug)}');
INSERT INTO post_tags (post_id, tag_id)
SELECT p.id, t.id FROM posts p, tags t
WHERE p.slug = '${escape(post.slug)}' AND t.slug = '${escape(tagSlug)}';
`);
        }
    }

    return statements.join('\n');
}

async function main() {
    console.log('Reading posts from:', postsDir);

    const posts = await readPosts();
    console.log(`Found ${posts.length} posts`);

    const sql = generateSQL(posts);

    // Write migration SQL to file
    const outputPath = path.join(process.cwd(), 'migrations/0002_seed_posts.sql');
    fs.writeFileSync(outputPath, sql);

    console.log(`Migration SQL written to: ${outputPath}`);
    console.log('\nTo apply the migration, run:');
    console.log('  wrangler d1 execute blog-posts --file=./migrations/0002_seed_posts.sql');

    // Also output a summary
    console.log('\nPosts to migrate:');
    for (const post of posts) {
        console.log(`  - ${post.title} (${post.slug}) [${post.published ? 'published' : 'draft'}]`);
    }
}

main().catch(console.error);
