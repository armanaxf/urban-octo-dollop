<script lang="ts">
    import MarkdownEditor from '$lib/components/MarkdownEditor.svelte';
    import { goto } from '$app/navigation';
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();

    let title = $state(data.post.title);
    let slug = $state(data.post.slug);
    let description = $state(data.post.description);
    let content = $state(data.post.content);
    let tags = $state(data.post.tags.map(t => t.name).join(', '));
    let imageUrl = $state(data.post.image_url ?? '');
    let published = $state(data.post.published);

    let isSubmitting = $state(false);
    let isDeleting = $state(false);
    let error = $state('');
    let showDeleteConfirm = $state(false);

    async function handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        if (isSubmitting) return;

        isSubmitting = true;
        error = '';

        try {
            const response = await fetch(`/api/posts/${data.post.id}`, {
                method: 'PUT',
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
                const responseData = await response.json();
                throw new Error(responseData.error || 'Failed to update post');
            }

            goto('/admin');
        } catch (err) {
            error = err instanceof Error ? err.message : 'An error occurred';
        } finally {
            isSubmitting = false;
        }
    }

    async function handleDelete() {
        if (isDeleting) return;

        isDeleting = true;

        try {
            const response = await fetch(`/api/posts/${data.post.id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Failed to delete post');
            }

            goto('/admin');
        } catch (err) {
            error = err instanceof Error ? err.message : 'An error occurred';
            isDeleting = false;
            showDeleteConfirm = false;
        }
    }
</script>

<svelte:head>
    <title>Edit: {data.post.title} | Admin</title>
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
                    <h1 class="text-lg font-semibold text-warm-900">Edit Post</h1>
                    {#if data.post.published}
                        <span class="px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-700">Published</span>
                    {:else}
                        <span class="px-2 py-0.5 text-xs font-medium rounded-full bg-amber-100 text-amber-700">Draft</span>
                    {/if}
                </div>
                <div class="flex items-center gap-3">
                    <button
                        type="button"
                        onclick={() => showDeleteConfirm = true}
                        class="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        Delete
                    </button>
                    <button
                        type="button"
                        onclick={() => { published = false; document.getElementById('post-form')?.requestSubmit(); }}
                        disabled={isSubmitting}
                        class="px-4 py-2 text-sm font-medium text-warm-600 bg-warm-100 rounded-lg hover:bg-warm-200 transition-colors disabled:opacity-50"
                    >
                        Save as Draft
                    </button>
                    <button
                        type="button"
                        onclick={() => { published = true; document.getElementById('post-form')?.requestSubmit(); }}
                        disabled={isSubmitting}
                        class="px-4 py-2 text-sm font-medium text-white bg-coral-500 rounded-lg hover:bg-coral-600 transition-colors disabled:opacity-50"
                    >
                        {isSubmitting ? 'Saving...' : (data.post.published ? 'Update' : 'Publish')}
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
                    bind:value={title}
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
                {#if imageUrl}
                    <div class="mt-3">
                        <img src={imageUrl} alt="Preview" class="max-h-48 rounded-lg border border-warm-200" />
                    </div>
                {/if}
            </div>
        </form>
    </main>
</div>

<!-- Delete Confirmation Modal -->
{#if showDeleteConfirm}
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
        <div class="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <h3 class="text-lg font-semibold text-warm-900 mb-2">Delete Post?</h3>
            <p class="text-warm-600 mb-6">
                Are you sure you want to delete "{data.post.title}"? This action cannot be undone.
            </p>
            <div class="flex justify-end gap-3">
                <button
                    type="button"
                    onclick={() => showDeleteConfirm = false}
                    class="px-4 py-2 text-sm font-medium text-warm-600 bg-warm-100 rounded-lg hover:bg-warm-200 transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    onclick={handleDelete}
                    disabled={isDeleting}
                    class="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
                >
                    {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
            </div>
        </div>
    </div>
{/if}
