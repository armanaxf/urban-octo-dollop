<script lang="ts">
    import Hero from '$lib/components/Hero.svelte';
    import Portfolio from '$lib/components/Portfolio.svelte';
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();
</script>

<svelte:head>
    <title>Josh Giles | AI Developer & Consultant</title>
    <meta name="description" content="Josh Giles - AI Development & Consultancy. Building intelligent solutions for modern businesses." />
    <meta property="og:title" content="Josh Giles | AI Developer & Consultant" />
    <meta property="og:description" content="Josh Giles - AI Development & Consultancy. Building intelligent solutions for modern businesses." />
    <meta property="og:type" content="website" />
</svelte:head>

<Hero />
<Portfolio />

<!-- Blog Section -->
<section id="blog" class="py-20 bg-white">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <!-- Section Header -->
        <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
                <h2 class="text-3xl sm:text-4xl font-bold text-warm-900 mb-2">
                    Latest Notes
                </h2>
                <p class="text-warm-500">
                    Thoughts on AI, development, and technology
                </p>
            </div>
            <a href="/posts" class="text-coral-link">
                View all posts
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </a>
        </div>

        <!-- Blog Posts Grid -->
        <div class="grid md:grid-cols-3 gap-6">
            {#each data.posts as post, index}
                <article
                    class="group bg-warm-50 rounded-2xl overflow-hidden border border-warm-200 hover:border-coral-300 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-coral-500/10"
                    style="animation: slideUp 0.6s ease-out {index * 100}ms backwards"
                >
                    <!-- Image or placeholder -->
                    {#if post.data.image}
                        <div class="aspect-video overflow-hidden">
                            <img
                                src={post.data.image}
                                alt={post.data.title}
                                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    {:else}
                        <div class="aspect-video bg-gradient-to-br from-coral-50 to-coral-100 flex items-center justify-center">
                            <svg class="w-12 h-12 text-coral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                        </div>
                    {/if}

                    <!-- Content -->
                    <div class="p-5">
                        <div class="flex items-center gap-3 mb-3">
                            <time
                                datetime={post.data.date.toISOString()}
                                class="text-xs text-warm-500"
                            >
                                {post.data.date.toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                })}
                            </time>
                            <span class="text-warm-300">·</span>
                            <span class="text-xs text-warm-500">Blog</span>
                        </div>

                        <h3 class="text-lg font-semibold text-warm-900 group-hover:text-coral-500 transition-colors mb-2 line-clamp-2">
                            <a href="/posts/{post.slug}">
                                {post.data.title}
                            </a>
                        </h3>

                        <p class="text-sm text-warm-500 line-clamp-2">
                            {post.data.description}
                        </p>

                        <!-- Tags -->
                        {#if post.data.tags && post.data.tags.length > 0}
                            <div class="flex flex-wrap gap-2 mt-4">
                                {#each post.data.tags.slice(0, 2) as tag}
                                    <span class="text-xs px-2 py-1 rounded-full bg-coral-50 text-coral-500 border border-coral-200">
                                        {tag}
                                    </span>
                                {/each}
                            </div>
                        {/if}
                    </div>
                </article>
            {/each}
        </div>
    </div>
</section>

<style>
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>
