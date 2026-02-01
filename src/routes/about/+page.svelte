<script lang="ts">
</script>

<svelte:head>
    <title>About | Josh Giles</title>
    <meta name="description" content="Learn more about Josh Giles - AI Developer & Consultant based in Scotland." />
</svelte:head>

<main class="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-8">
    <article class="animate-fade-in">
        <!-- Header -->
        <div class="mb-12">
            <h1 class="text-4xl md:text-5xl font-bold text-warm-900 mb-4">
                My Story<span class="text-coral-500">.</span>
            </h1>
        </div>

        <!-- Content Card -->
        <div class="bg-warm-50 rounded-2xl border border-warm-200 p-8 md:p-12">
            <div class="prose prose-lg max-w-none">
                <p class="text-xl text-warm-900 font-medium mb-6">
                    Hello!
                </p>

                <p class="text-warm-700 leading-relaxed mb-6">
                    I'm <span class="text-coral-500 font-semibold">Josh</span>, an AI Developer and Consultant based in Scotland.
                </p>

                <p class="text-warm-600 leading-relaxed mb-6">
                    I specialize in building intelligent solutions that help businesses automate workflows,
                    leverage artificial intelligence, and solve complex technical challenges. With a background
                    in full-stack development and a passion for emerging technologies, I bridge the gap between
                    cutting-edge AI capabilities and practical business applications.
                </p>

                <p class="text-warm-600 leading-relaxed mb-6">
                    My work spans across custom AI development, machine learning implementations, and strategic
                    technology consulting. I believe in creating solutions that are not just technically impressive,
                    but genuinely useful and impactful.
                </p>

                <p class="text-warm-600 leading-relaxed mb-6">
                    I created this blog as a place to share insights, discoveries, and ideas from my projects.
                    Whether you're looking for technical deep-dives or strategic perspectives on AI adoption,
                    I hope you find something valuable here.
                </p>

                <!-- Services Summary -->
                <div class="mt-12 grid sm:grid-cols-2 gap-6 not-prose">
                    <div class="bg-white rounded-xl p-6 border border-warm-200 hover:border-coral-300 transition-colors">
                        <div class="w-10 h-10 rounded-lg bg-coral-100 flex items-center justify-center mb-4">
                            <svg class="w-5 h-5 text-coral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        </div>
                        <h3 class="text-warm-900 font-semibold mb-2">AI Development</h3>
                        <p class="text-warm-500 text-sm">Custom AI solutions, machine learning models, and intelligent automation systems.</p>
                    </div>

                    <div class="bg-white rounded-xl p-6 border border-warm-200 hover:border-coral-300 transition-colors">
                        <div class="w-10 h-10 rounded-lg bg-coral-100 flex items-center justify-center mb-4">
                            <svg class="w-5 h-5 text-coral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <h3 class="text-warm-900 font-semibold mb-2">Consultancy</h3>
                        <p class="text-warm-500 text-sm">Strategic guidance on technology adoption, digital transformation, and AI integration.</p>
                    </div>
                </div>

                <!-- Contact CTA -->
                <div class="mt-12 pt-8 border-t border-warm-200 not-prose">
                    <p class="text-warm-500 text-sm mb-4">
                        Based in Scotland · AI Developer · Consultant
                    </p>
                    <a href="mailto:hello@joshgiles.dev" class="text-coral-link font-medium">
                        Get in touch
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    </article>
</main>
