<script lang="ts">
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();
</script>

<svelte:head>
    <title>Blog | Josh Giles</title>
    <meta name="description" content="Read articles on AI, development, and technology by Josh Giles." />
</svelte:head>

<main class="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-8">
    <div class="animate-fade-in">
        <!-- Header -->
        <div class="mb-12">
            <h1 class="text-4xl md:text-5xl font-bold text-warm-900 mb-4">
                All Posts
            </h1>
            <p class="text-warm-500">
                {data.posts.length} {data.posts.length === 1 ? 'article' : 'articles'} on AI, development, and technology.
            </p>
        </div>

        <!-- Posts List -->
        <div class="space-y-6">
            {#each data.posts as post, index}
                <article
                    class="group bg-warm-50 rounded-2xl border border-warm-200 overflow-hidden hover:border-coral-300 transition-all duration-300 hover:shadow-lg hover:shadow-coral-500/10"
                    style="animation: slideUp 0.6s ease-out {index * 50}ms backwards"
                >
                    <a href="/posts/{post.slug}" class="flex flex-col md:flex-row">
                        <!-- Image -->
                        {#if post.data.image}
                            <div class="md:w-64 lg:w-80 h-48 md:h-auto shrink-0 overflow-hidden">
                                <img
                                    src={post.data.image}
                                    alt={post.data.title}
                                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        {:else}
                            <div class="md:w-64 lg:w-80 h-48 md:h-auto shrink-0 bg-gradient-to-br from-coral-50 to-coral-100 flex items-center justify-center">
                                <svg class="w-12 h-12 text-coral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                </svg>
                            </div>
                        {/if}

                        <!-- Content -->
                        <div class="flex-1 p-6">
                            <div class="flex items-center gap-3 mb-3">
                                <time
                                    datetime={post.data.date.toISOString()}
                                    class="text-sm text-warm-500"
                                >
                                    {post.data.date.toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                    })}
                                </time>
                            </div>

                            <h2 class="text-xl md:text-2xl font-semibold text-warm-900 group-hover:text-coral-500 transition-colors mb-3">
                                {post.data.title}
                            </h2>

                            <p class="text-warm-500 mb-4 line-clamp-2">
                                {post.data.description}
                            </p>

                            <!-- Tags -->
                            <div class="flex flex-wrap gap-2">
                                {#each post.data.tags as tag}
                                    <span class="text-xs px-3 py-1 rounded-full bg-coral-50 text-coral-500 border border-coral-200">
                                        #{tag}
                                    </span>
                                {/each}
                            </div>
                        </div>

                        <!-- Arrow -->
                        <div class="hidden md:flex items-center px-6 text-coral-500 opacity-0 group-hover:opacity-100 transition-opacity">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </a>
                </article>
            {/each}
        </div>

        {#if data.posts.length === 0}
            <div class="text-center py-20">
                <p class="text-warm-500">No posts yet. Check back soon!</p>
            </div>
        {/if}
    </div>
</main>

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
