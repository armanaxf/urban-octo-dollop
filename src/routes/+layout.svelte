<script lang="ts">
    import '../app.css';
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import type { Snippet } from 'svelte';
    import type { LayoutData } from './$types';

    interface Props {
        data: LayoutData;
        children: Snippet;
    }

    let { data, children }: Props = $props();

    // Umami analytics
    const umamiWebsiteId = data.umamiWebsiteId;
    const umamiScriptUrl = data.umamiScriptUrl || 'https://analytics.umami.is/script.js';
</script>

<svelte:head>
    {#if umamiWebsiteId}
        <script defer src={umamiScriptUrl} data-website-id={umamiWebsiteId}></script>
    {/if}
</svelte:head>

<Header />

{@render children()}

<Footer />

<!-- Buy Me a Coffee Widget -->
<script data-name="BMC-Widget" data-cfasync="false" src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-id="joshlgiles" data-description="Support me on Buy me a coffee!" data-message="Thanks for visiting! If you found my content helpful, consider buying me a coffee" data-color="#FF914D" data-position="Right" data-x_margin="18" data-y_margin="48"></script>
