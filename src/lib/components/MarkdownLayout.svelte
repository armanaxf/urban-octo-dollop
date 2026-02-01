<script lang="ts">
    import type { Snippet } from 'svelte';

    interface Props {
        children: Snippet;
    }

    let { children }: Props = $props();
</script>

<div class="prose prose-lg max-w-none prose-headings:text-warm-900 prose-p:text-warm-700 prose-a:text-coral-500 hover:prose-a:text-coral-600 prose-code:text-coral-600 prose-pre:bg-warm-900 prose-pre:border prose-pre:border-warm-200 prose-strong:text-warm-900 prose-blockquote:border-coral-300 prose-blockquote:text-warm-600">
    {@render children()}
</div>
