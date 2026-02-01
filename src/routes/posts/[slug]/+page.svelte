<script lang="ts">
    import { page } from '$app/stores';
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();

    function formatDate(dateString: string): string {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }
</script>

<svelte:head>
    <title>{data.post.title} | Josh Giles</title>
    <meta name="description" content={data.post.description} />
    <meta property="og:title" content={data.post.title} />
    <meta property="og:description" content={data.post.description} />
    <meta property="og:type" content="article" />
    {#if data.post.image_url}
        <meta property="og:image" content={data.post.image_url} />
    {/if}
</svelte:head>

<main class="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-8">
    <article class="animate-fade-in">
        <!-- Back link -->
        <a
            href="/posts"
            class="inline-flex items-center gap-2 text-warm-500 hover:text-coral-500 transition-colors mb-8 group"
        >
            <svg class="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to posts
        </a>

        <!-- Hero Image -->
        {#if data.post.image_url}
            <div class="mb-8 rounded-2xl overflow-hidden">
                <img
                    src={data.post.image_url}
                    alt={data.post.title}
                    class="w-full h-64 md:h-96 object-cover"
                />
            </div>
        {/if}

        <!-- Header -->
        <header class="mb-10">
            <div class="flex items-center gap-3 text-sm text-warm-500 mb-4">
                <time datetime={data.post.published_at ?? data.post.created_at}>
                    {formatDate(data.post.published_at ?? data.post.created_at)}
                </time>
                {#if !data.post.published}
                    <span class="px-2 py-0.5 text-xs font-medium rounded-full bg-amber-100 text-amber-700">Draft</span>
                {/if}
            </div>

            <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-warm-900 mb-6 leading-tight">
                {data.post.title}
            </h1>

            <!-- Tags -->
            <div class="flex flex-wrap gap-2">
                {#each data.post.tags as tag}
                    <span class="text-xs px-3 py-1 rounded-full bg-coral-50 text-coral-500 border border-coral-200">
                        #{tag.name}
                    </span>
                {/each}
            </div>
        </header>

        <!-- Content -->
        <div class="bg-warm-50 rounded-2xl border border-warm-200 p-6 md:p-10">
            <div class="prose prose-lg max-w-none prose-headings:text-warm-900 prose-p:text-warm-700 prose-a:text-coral-500 hover:prose-a:text-coral-600 prose-code:text-coral-600 prose-pre:bg-warm-900 prose-pre:border prose-pre:border-warm-200 prose-strong:text-warm-900 prose-blockquote:border-coral-300 prose-blockquote:text-warm-600">
                {@html data.renderedContent}
            </div>
        </div>

        <!-- Share / Navigation -->
        <div class="mt-12 pt-8 border-t border-warm-200 flex flex-col sm:flex-row justify-between items-center gap-4">
            <a
                href="/posts"
                class="text-warm-500 hover:text-coral-500 transition-colors flex items-center gap-2 group"
            >
                <svg class="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                More posts
            </a>

            <div class="flex items-center gap-4">
                <span class="text-warm-500 text-sm">Share:</span>
                <a
                    href="https://twitter.com/intent/tweet?text={encodeURIComponent(data.post.title)}&url={encodeURIComponent($page.url.href)}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="w-9 h-9 rounded-full bg-warm-100 flex items-center justify-center text-warm-500 hover:text-white hover:bg-coral-500 transition-all"
                    aria-label="Share on Twitter"
                >
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                </a>
                <a
                    href="https://www.linkedin.com/shareArticle?mini=true&url={encodeURIComponent($page.url.href)}&title={encodeURIComponent(data.post.title)}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="w-9 h-9 rounded-full bg-warm-100 flex items-center justify-center text-warm-500 hover:text-white hover:bg-coral-500 transition-all"
                    aria-label="Share on LinkedIn"
                >
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                </a>
            </div>
        </div>
    </article>
</main>
