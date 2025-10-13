<script lang="ts">
	import { goto } from '$app/navigation';
	import { t } from '$lib/i18n';

	let { user, profile } = $props();
</script>

<header class="sticky top-0 z-50 border-b border-gray-800 bg-black">
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between py-4">
			<!-- Logo -->
			<div class="flex-shrink-0">
				<button
					type="button"
					class="text-2xl font-bold text-white transition-colors duration-200 hover:text-gray-300 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
					onclick={() => goto('/')}
				>
					<h1>FUGA</h1>
				</button>
			</div>

			<!-- Navigation Links - Desktop -->
			<nav class="hidden space-x-8 md:flex">
				<a
					href="#services"
					class="font-medium text-white transition-colors duration-200 hover:text-gray-300"
				>
					{$t('header.services')}
				</a>
				<a
					href="#pricing"
					class="font-medium text-white transition-colors duration-200 hover:text-gray-300"
				>
					{$t('header.pricing')}
				</a>
				<a
					href="#about"
					class="font-medium text-white transition-colors duration-200 hover:text-gray-300"
				>
					{$t('header.about')}
				</a>
				<a
					href="/blog"
					class="font-medium text-white transition-colors duration-200 hover:text-gray-300"
				>
					{$t('header.blog')}
				</a>
				<a
					href="#contact"
					class="font-medium text-white transition-colors duration-200 hover:text-gray-300"
				>
					{$t('header.contact')}
				</a>
			</nav>

			<!-- Auth Buttons -->
			<div class="flex items-center space-x-4">
				{#if user}
					<!-- User is logged in - show profile button based on role -->
					<button
						onclick={() => goto(profile?.role === 'admin' ? '/admin' : '/user')}
						class="rounded-lg bg-white px-4 py-2 font-medium text-black transition-colors duration-200 hover:bg-gray-100"
					>
						{$t('header.profile')}
					</button>
				{:else}
					<!-- User is not logged in - show login button -->
					<button
						onclick={() => goto('/login')}
						class="rounded-lg bg-white px-4 py-2 font-medium text-black transition-colors duration-200 hover:bg-gray-100"
					>
						{$t('header.login')}
					</button>
				{/if}

				<!-- Mobile menu button -->
				<button class="text-white md:hidden" aria-label="Toggle mobile menu">
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						></path>
					</svg>
				</button>
			</div>
		</div>

		<!-- Mobile Navigation -->
		<div class="border-t border-gray-800 pt-4 pb-4 md:hidden">
			<nav class="flex flex-col space-y-4">
				<a
					href="#services"
					class="font-medium text-white transition-colors duration-200 hover:text-gray-300"
				>
					{$t('header.services')}
				</a>
				<a
					href="#pricing"
					class="font-medium text-white transition-colors duration-200 hover:text-gray-300"
				>
					{$t('header.pricing')}
				</a>
				<a
					href="#about"
					class="font-medium text-white transition-colors duration-200 hover:text-gray-300"
				>
					{$t('header.about')}
				</a>
				<a
					href="/blog"
					class="font-medium text-white transition-colors duration-200 hover:text-gray-300"
				>
					{$t('header.blog')}
				</a>
				<a
					href="#contact"
					class="font-medium text-white transition-colors duration-200 hover:text-gray-300"
				>
					{$t('header.contact')}
				</a>
			</nav>
		</div>
	</div>
</header>

<style>
	a {
		scroll-behavior: smooth;
	}
</style>
