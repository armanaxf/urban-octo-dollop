import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface PostData {
    title: string;
    description: string;
    date: Date;
    tags: string[];
    image?: string;
    draft: boolean;
}

export interface Post {
    slug: string;
    data: PostData;
    content: string;
}

const postsDirectory = path.join(process.cwd(), 'src/content/posts');

export async function getPosts(): Promise<Post[]> {
    const fileNames = fs.readdirSync(postsDirectory);
    const posts: Post[] = [];

    for (const fileName of fileNames) {
        if (!fileName.endsWith('.md')) continue;

        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        posts.push({
            slug,
            data: {
                title: data.title || 'Untitled',
                description: data.description || '',
                date: new Date(data.date),
                tags: data.tags || [],
                image: data.image,
                draft: data.draft || false,
            },
            content,
        });
    }

    return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    const fullPath = path.join(postsDirectory, `${slug}.md`);

    try {
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
            slug,
            data: {
                title: data.title || 'Untitled',
                description: data.description || '',
                date: new Date(data.date),
                tags: data.tags || [],
                image: data.image,
                draft: data.draft || false,
            },
            content,
        };
    } catch {
        return null;
    }
}

export async function getPublishedPosts(): Promise<Post[]> {
    const posts = await getPosts();
    return posts.filter(post => !post.data.draft);
}
