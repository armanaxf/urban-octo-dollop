<script lang="ts">
    import { marked } from 'marked';

    interface Props {
        value?: string;
        onchange?: (value: string) => void;
    }

    let { value = $bindable(''), onchange }: Props = $props();

    let showPreview = $state(false);
    let renderedContent = $derived.by(() => {
        try {
            return marked(value || '');
        } catch {
            return '<p class="text-red-500">Error rendering markdown</p>';
        }
    });

    function handleInput(e: Event) {
        const target = e.target as HTMLTextAreaElement;
        value = target.value;
        onchange?.(value);
    }

    function insertMarkdown(before: string, after: string = '') {
        const textarea = document.querySelector('textarea[name="content"]') as HTMLTextAreaElement;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = value.substring(start, end);

        const newValue = value.substring(0, start) + before + selectedText + after + value.substring(end);
        value = newValue;
        onchange?.(value);

        // Set cursor position after insertion
        setTimeout(() => {
            textarea.focus();
            const newCursorPos = start + before.length + selectedText.length;
            textarea.setSelectionRange(newCursorPos, newCursorPos);
        }, 0);
    }
</script>

<div class="border border-warm-200 rounded-xl overflow-hidden bg-white">
    <!-- Toolbar -->
    <div class="flex items-center justify-between px-4 py-2 bg-warm-50 border-b border-warm-200">
        <div class="flex items-center gap-1">
            <button
                type="button"
                onclick={() => insertMarkdown('**', '**')}
                class="p-2 text-warm-600 hover:text-coral-500 hover:bg-warm-100 rounded transition-colors"
                title="Bold"
            >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 12h8a4 4 0 100-8H6v8zm0 0h10a4 4 0 110 8H6v-8z" />
                </svg>
            </button>
            <button
                type="button"
                onclick={() => insertMarkdown('*', '*')}
                class="p-2 text-warm-600 hover:text-coral-500 hover:bg-warm-100 rounded transition-colors"
                title="Italic"
            >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l-4 4 4 4M6 16l-4-4 4-4" />
                </svg>
            </button>
            <div class="w-px h-6 bg-warm-200 mx-1"></div>
            <button
                type="button"
                onclick={() => insertMarkdown('## ')}
                class="p-2 text-warm-600 hover:text-coral-500 hover:bg-warm-100 rounded transition-colors"
                title="Heading"
            >
                <span class="text-sm font-bold">H</span>
            </button>
            <button
                type="button"
                onclick={() => insertMarkdown('[', '](url)')}
                class="p-2 text-warm-600 hover:text-coral-500 hover:bg-warm-100 rounded transition-colors"
                title="Link"
            >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
            </button>
            <button
                type="button"
                onclick={() => insertMarkdown('![alt](', ')')}
                class="p-2 text-warm-600 hover:text-coral-500 hover:bg-warm-100 rounded transition-colors"
                title="Image"
            >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            </button>
            <div class="w-px h-6 bg-warm-200 mx-1"></div>
            <button
                type="button"
                onclick={() => insertMarkdown('`', '`')}
                class="p-2 text-warm-600 hover:text-coral-500 hover:bg-warm-100 rounded transition-colors"
                title="Inline Code"
            >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
            </button>
            <button
                type="button"
                onclick={() => insertMarkdown('\n```\n', '\n```\n')}
                class="p-2 text-warm-600 hover:text-coral-500 hover:bg-warm-100 rounded transition-colors"
                title="Code Block"
            >
                <span class="text-xs font-mono">{'{}'}</span>
            </button>
            <div class="w-px h-6 bg-warm-200 mx-1"></div>
            <button
                type="button"
                onclick={() => insertMarkdown('- ')}
                class="p-2 text-warm-600 hover:text-coral-500 hover:bg-warm-100 rounded transition-colors"
                title="Bullet List"
            >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
            </button>
            <button
                type="button"
                onclick={() => insertMarkdown('> ')}
                class="p-2 text-warm-600 hover:text-coral-500 hover:bg-warm-100 rounded transition-colors"
                title="Quote"
            >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
            </button>
        </div>

        <button
            type="button"
            onclick={() => showPreview = !showPreview}
            class="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors {showPreview ? 'bg-coral-500 text-white' : 'bg-warm-100 text-warm-600 hover:bg-warm-200'}"
        >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {showPreview ? 'Edit' : 'Preview'}
        </button>
    </div>

    <!-- Editor / Preview -->
    <div class="min-h-[400px]">
        {#if showPreview}
            <div class="p-6 prose prose-warm max-w-none min-h-[400px]">
                {#if value.trim()}
                    {@html renderedContent}
                {:else}
                    <p class="text-warm-400 italic">Nothing to preview yet...</p>
                {/if}
            </div>
        {:else}
            <textarea
                name="content"
                {value}
                oninput={handleInput}
                placeholder="Write your content in Markdown..."
                class="w-full min-h-[400px] p-6 font-mono text-sm text-warm-800 placeholder-warm-400 focus:outline-none resize-y"
            ></textarea>
        {/if}
    </div>
</div>
