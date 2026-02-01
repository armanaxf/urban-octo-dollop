<script lang="ts">
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();

    function formatDate(dateString: string): string {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }
</script>

<svelte:head>
    <title>Admin Dashboard | Josh Giles</title>
</svelte:head>

<div class="min-h-screen bg-warm-50">
    <!-- Admin Header -->
    <header class="bg-white border-b border-warm-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="flex items-center gap-4">
                    <a href="/" class="font-script text-2xl text-warm-900">Josh Giles</a>
                    <span class="text-warm-300">|</span>
                    <span class="text-warm-600 font-medium">Admin</span>
                </div>
                <div class="flex items-center gap-4">
                    <a href="/" class="text-sm text-warm-500 hover:text-coral-500 transition-colors">
                        View Site
                    </a>
                    <a href="/logout" class="text-sm text-warm-500 hover:text-red-500 transition-colors">
                        Sign Out
                    </a>
                </div>
            </div>
        </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Stats -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="bg-white rounded-xl border border-warm-200 p-6">
                <div class="text-3xl font-bold text-coral-500">{data.posts.length}</div>
                <div class="text-warm-500 text-sm">Total Posts</div>
            </div>
            <div class="bg-white rounded-xl border border-warm-200 p-6">
                <div class="text-3xl font-bold text-green-500">{data.posts.filter(p => p.published).length}</div>
                <div class="text-warm-500 text-sm">Published</div>
            </div>
            <div class="bg-white rounded-xl border border-warm-200 p-6">
                <div class="text-3xl font-bold text-amber-500">{data.posts.filter(p => !p.published).length}</div>
                <div class="text-warm-500 text-sm">Drafts</div>
            </div>
        </div>

        <!-- Posts List Header -->
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold text-warm-900">Posts</h1>
            <a
                href="/admin/new"
                class="inline-flex items-center gap-2 px-4 py-2 bg-coral-500 text-white font-semibold rounded-lg hover:bg-coral-600 transition-colors"
            >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                New Post
            </a>
        </div>

        <!-- Posts Table -->
        <div class="bg-white rounded-xl border border-warm-200 overflow-hidden">
            {#if data.posts.length === 0}
                <div class="p-12 text-center">
                    <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-warm-100 flex items-center justify-center">
                        <svg class="w-8 h-8 text-warm-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                    </div>
                    <h3 class="text-lg font-semibold text-warm-900 mb-2">No posts yet</h3>
                    <p class="text-warm-500 mb-4">Get started by creating your first post.</p>
                    <a
                        href="/admin/new"
                        class="inline-flex items-center gap-2 px-4 py-2 bg-coral-500 text-white font-semibold rounded-lg hover:bg-coral-600 transition-colors"
                    >
                        Create Post
                    </a>
                </div>
            {:else}
                <table class="w-full">
                    <thead class="bg-warm-50 border-b border-warm-200">
                        <tr>
                            <th class="text-left px-6 py-3 text-xs font-semibold text-warm-500 uppercase tracking-wide">Title</th>
                            <th class="text-left px-6 py-3 text-xs font-semibold text-warm-500 uppercase tracking-wide">Status</th>
                            <th class="text-left px-6 py-3 text-xs font-semibold text-warm-500 uppercase tracking-wide">Date</th>
                            <th class="text-left px-6 py-3 text-xs font-semibold text-warm-500 uppercase tracking-wide">Tags</th>
                            <th class="text-right px-6 py-3 text-xs font-semibold text-warm-500 uppercase tracking-wide">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-warm-100">
                        {#each data.posts as post}
                            <tr class="hover:bg-warm-50 transition-colors">
                                <td class="px-6 py-4">
                                    <div class="font-medium text-warm-900">{post.title}</div>
                                    <div class="text-sm text-warm-500 truncate max-w-md">{post.description}</div>
                                </td>
                                <td class="px-6 py-4">
                                    {#if post.published}
                                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            Published
                                        </span>
                                    {:else}
                                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                            Draft
                                        </span>
                                    {/if}
                                </td>
                                <td class="px-6 py-4 text-sm text-warm-500">
                                    {formatDate(post.published_at ?? post.created_at)}
                                </td>
                                <td class="px-6 py-4">
                                    <div class="flex flex-wrap gap-1">
                                        {#each post.tags.slice(0, 3) as tag}
                                            <span class="inline-flex items-center px-2 py-0.5 rounded text-xs bg-coral-50 text-coral-600">
                                                {tag.name}
                                            </span>
                                        {/each}
                                        {#if post.tags.length > 3}
                                            <span class="text-xs text-warm-400">+{post.tags.length - 3}</span>
                                        {/if}
                                    </div>
                                </td>
                                <td class="px-6 py-4 text-right">
                                    <div class="flex justify-end gap-2">
                                        <a
                                            href="/posts/{post.slug}"
                                            target="_blank"
                                            class="p-2 text-warm-400 hover:text-coral-500 transition-colors"
                                            title="View"
                                        >
                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </a>
                                        <a
                                            href="/admin/edit/{post.slug}"
                                            class="p-2 text-warm-400 hover:text-coral-500 transition-colors"
                                            title="Edit"
                                        >
                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            {/if}
        </div>
    </main>
</div>
