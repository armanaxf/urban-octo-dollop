import { getCollection } from 'astro:content';

export async function getPosts() {
    return await getCollection('posts');
}

export async function getPostBySlug(slug: string) {
    const posts = await getCollection('posts');
    return posts.find(p => p.slug === slug);
}
