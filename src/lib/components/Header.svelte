<script lang="ts">
    import { page } from '$app/stores';

    const navItems = [
        { href: '/', label: 'Services', dot: true },
        { href: '/posts', label: 'Works' },
        { href: '/posts', label: 'Notes' },
        { href: '/about', label: 'Experience' },
    ];

    let mobileMenuOpen = $state(false);

    function toggleMobileMenu() {
        mobileMenuOpen = !mobileMenuOpen;
    }
</script>

<header class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-warm-200/50">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between max-w-6xl">
        <!-- Logo - Script font style -->
        <a href="/" class="flex items-center gap-2 group min-h-[44px]" aria-label="Josh Giles - Home">
            <span class="font-script text-3xl text-warm-900 group-hover:text-coral-500 transition-colors duration-300">
                Josh Giles
            </span>
        </a>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-8">
            {#each navItems as item}
                <a
                    href={item.href}
                    class="text-sm font-medium transition-colors duration-200 relative flex items-center gap-1 {item.dot ? 'text-coral-500' : 'text-warm-600 hover:text-coral-500'}"
                >
                    {item.label}
                    {#if item.dot}
                        <span class="w-1.5 h-1.5 rounded-full bg-coral-500"></span>
                    {/if}
                </a>
            {/each}
        </nav>

        <!-- Contact Info (Desktop) -->
        <div class="hidden md:flex items-center gap-4">
            <a
                href="tel:+441234567890"
                class="text-sm text-warm-600 hover:text-coral-500 transition-colors flex items-center gap-2 min-h-[44px] py-2"
                aria-label="Call us"
            >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span class="hidden lg:inline">Get in touch</span>
            </a>
        </div>

        <!-- Mobile Menu Button -->
        <button
            onclick={toggleMobileMenu}
            class="md:hidden p-3 rounded-lg text-warm-600 hover:text-coral-500 hover:bg-coral-50 transition-colors focus:outline-none focus:ring-2 focus:ring-coral-500 min-w-[44px] min-h-[44px]"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
        >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        </button>
    </div>

    <!-- Mobile Menu -->
    {#if mobileMenuOpen}
        <div class="md:hidden bg-white border-t border-warm-200">
            <div class="container mx-auto px-4 py-4 space-y-1">
                {#each navItems as item}
                    <a
                        href={item.href}
                        class="block px-4 py-3 text-base font-medium text-warm-700 rounded-lg hover:bg-coral-50 hover:text-coral-500 transition-colors"
                        onclick={() => mobileMenuOpen = false}
                    >
                        {item.label}
                    </a>
                {/each}
                <div class="pt-4 mt-4 border-t border-warm-200">
                    <a
                        href="mailto:hello@joshgiles.dev"
                        class="block w-full px-4 py-3 text-center text-sm font-medium text-white bg-coral-500 rounded-full hover:bg-coral-600 transition-colors"
                    >
                        Get in touch
                    </a>
                </div>
            </div>
        </div>
    {/if}
</header>

<!-- Spacer for fixed header -->
<div class="h-16"></div>
