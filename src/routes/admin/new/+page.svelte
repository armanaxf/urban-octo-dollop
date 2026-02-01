<script lang="ts">
    import MarkdownEditor from '$lib/components/MarkdownEditor.svelte';
    import { goto } from '$app/navigation';

    let title = $state('');
    let slug = $state('');
    let description = $state('');
    let content = $state('');
    let tags = $state('');
    let imageUrl = $state('');
    let published = $state(false);

    let isSubmitting = $state(false);
    let error = $state('');

    // Auto-generate slug from title
    function generateSlug(text: string): string {
        return text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');
    }

    function handleTitleChange(e: Event) {
        const target = e.target as HTMLInputElement;
        title = target.value;
        // Only auto-generate slug if it hasn't been manually edited
        if (!slug || slug === generateSlug(title.slice(0, -1))) {
            slug = generateSlug(title);
        }
    }

    async function handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        if (isSubmitting) return;

        isSubmitting = true;
        error = '';

        try {
            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    slug,
                    description,
                    content,
                    tags: tags.split(',').map(t => t.trim()).filter(Boolean),
                    image_url: imageUrl || null,
                    published
                })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to create post');
            }

            goto('/admin');
        } catch (err) {
            error = err instanceof Error ? err.message : 'An error occurred';
        } finally {
            isSubmitting = false;
        }
    }
</script>

<svelte:head>
    <title>New Post | Admin</title>
</svelte:head>

<div class="min-h-screen bg-warm-50">
    <!-- Header -->
    <header class="bg-white border-b border-warm-200">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="flex items-center gap-4">
                    <a href="/admin" class="text-warm-500 hover:text-coral-500 transition-colors">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </a>
                    <h1 class="text-lg font-semibold text-warm-900">New Post</h1>
                </div>
                <div class="flex items-center gap-3">
                    <button
                        type="button"
                        onclick={() => { published = false; document.getElementById('post-form')?.requestSubmit(); }}
                        disabled={isSubmitting}
                        class="px-4 py-2 text-sm font-medium text-warm-600 bg-warm-100 rounded-lg hover:bg-warm-200 transition-colors disabled:opacity-50"
                    >
                        Save Draft
                    </button>
                    <button
                        type="button"
                        onclick={() => { published = true; document.getElementById('post-form')?.requestSubmit(); }}
                        disabled={isSubmitting}
                        class="px-4 py-2 text-sm font-medium text-white bg-coral-500 rounded-lg hover:bg-coral-600 transition-colors disabled:opacity-50"
                    >
                        {isSubmitting ? 'Publishing...' : 'Publish'}
                    </button>
                </div>
            </div>
        </div>
    </header>

    <main class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {#if error}
            <div class="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700">
                {error}
            </div>
        {/if}

        <form id="post-form" onsubmit={handleSubmit} class="space-y-6">
            <!-- Title -->
            <div>
                <label for="title" class="block text-sm font-medium text-warm-700 mb-2">Title</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    oninput={handleTitleChange}
                    required
                    placeholder="Enter post title..."
                    class="w-full px-4 py-3 rounded-xl border border-warm-200 focus:border-coral-300 focus:ring-2 focus:ring-coral-500/20 focus:outline-none transition-colors text-lg"
                />
            </div>

            <!-- Slug -->
            <div>
                <label for="slug" class="block text-sm font-medium text-warm-700 mb-2">Slug</label>
                <div class="flex items-center gap-2">
                    <span class="text-warm-400">/posts/</span>
                    <input
                        type="text"
                        id="slug"
                        bind:value={slug}
                        required
                        placeholder="post-slug"
                        class="flex-1 px-4 py-2 rounded-lg border border-warm-200 focus:border-coral-300 focus:ring-2 focus:ring-coral-500/20 focus:outline-none transition-colors"
                    />
                </div>
            </div>

            <!-- Description -->
            <div>
                <label for="description" class="block text-sm font-medium text-warm-700 mb-2">Description</label>
                <textarea
                    id="description"
                    bind:value={description}
                    required
                    rows="2"
                    placeholder="Brief description for SEO and previews..."
                    class="w-full px-4 py-3 rounded-xl border border-warm-200 focus:border-coral-300 focus:ring-2 focus:ring-coral-500/20 focus:outline-none transition-colors resize-none"
                ></textarea>
            </div>

            <!-- Content -->
            <div>
                <label class="block text-sm font-medium text-warm-700 mb-2">Content</label>
                <MarkdownEditor bind:value={content} />
            </div>

            <!-- Tags -->
            <div>
                <label for="tags" class="block text-sm font-medium text-warm-700 mb-2">Tags</label>
                <input
                    type="text"
                    id="tags"
                    bind:value={tags}
                    placeholder="power-platform, azure, tutorial (comma separated)"
                    class="w-full px-4 py-2 rounded-lg border border-warm-200 focus:border-coral-300 focus:ring-2 focus:ring-coral-500/20 focus:outline-none transition-colors"
                />
                <p class="mt-1 text-xs text-warm-500">Separate tags with commas</p>
            </div>

            <!-- Featured Image -->
            <div>
                <label for="image" class="block text-sm font-medium text-warm-700 mb-2">Featured Image URL</label>
                <input
                    type="url"
                    id="image"
                    bind:value={imageUrl}
                    placeholder="https://..."
                    class="w-full px-4 py-2 rounded-lg border border-warm-200 focus:border-coral-300 focus:ring-2 focus:ring-coral-500/20 focus:outline-none transition-colors"
                />
                <p class="mt-1 text-xs text-warm-500">Optional hero image for the post</p>
            </div>
        </form>
    </main>
</div>
