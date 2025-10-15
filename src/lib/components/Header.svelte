<script lang="ts">
	import { slide } from 'svelte/transition';
	import Button from '$lib/components/Button.svelte';
	import { t } from '$lib/i18n';

	let { user, profile } = $props();

	let isMobileNavOpen = $state(false);

	function toggleMobileNav() {
		isMobileNavOpen = !isMobileNavOpen;
	}

	function closeMobileNav() {
		isMobileNavOpen = false;
	}
</script>

<header class="sticky top-0 z-50 border-b border-gray-800 bg-black">
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between py-4">
			<!-- Logo -->
			<div class="flex-shrink-0">
				<Button href="/" variant="text" size="xl">
					<h1>FUGA</h1>
				</Button>
			</div>

			<!-- Navigation Links - Desktop -->
			<nav class="hidden space-x-4 md:flex">
				<Button href="#services" variant="text" size="md">
					{$t('header.services')}
				</Button>
				<Button href="#pricing" variant="text" size="md">
					{$t('header.pricing')}
				</Button>
				<Button href="#about" variant="text" size="md">
					{$t('header.about')}
				</Button>
				<Button href="/blog" variant="text" size="md">
					{$t('header.blog')}
				</Button>
				<Button href="#contact" variant="text" size="md">
					{$t('header.contact')}
				</Button>
			</nav>

			<div class="flex items-center gap-3">
				<!-- Auth Buttons - Desktop Only -->
				<div class="hidden md:block">
					{#if user}
						<Button
							href={profile?.role === 'admin' ? '/admin' : '/user'}
							variant="secondary"
							size="md"
						>
							{$t('header.profile')}
						</Button>
					{:else}
						<Button href="/login" variant="secondary" size="md">
							{$t('header.login')}
						</Button>
					{/if}
				</div>

				<!-- Mobile menu button -->
				<button
					type="button"
					class="inline-flex items-center justify-center rounded-lg p-2 text-white transition-colors duration-200 hover:bg-white/10 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black focus:outline-none md:hidden"
					onclick={toggleMobileNav}
					aria-controls="mobile-navigation"
					aria-expanded={isMobileNavOpen}
					aria-label={isMobileNavOpen ? $t('header.closeMenu') : $t('header.openMenu')}
				>
					{#if isMobileNavOpen}
						<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							></path>
						</svg>
					{:else}
						<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 6h16M4 12h16M4 18h16"
							></path>
						</svg>
					{/if}
				</button>
			</div>
		</div>

		{#if isMobileNavOpen}
			<div
				id="mobile-navigation"
				class="border-t border-gray-800 pb-4 md:hidden"
				transition:slide={{ duration: 200 }}
			>
				<nav class="flex flex-col space-y-4 pt-4">
					<Button href="#services" variant="text" size="md" fullWidth onclick={closeMobileNav}>
						{$t('header.services')}
					</Button>
					<Button href="#pricing" variant="text" size="md" fullWidth onclick={closeMobileNav}>
						{$t('header.pricing')}
					</Button>
					<Button href="#about" variant="text" size="md" fullWidth onclick={closeMobileNav}>
						{$t('header.about')}
					</Button>
					<Button href="/blog" variant="text" size="md" fullWidth onclick={closeMobileNav}>
						{$t('header.blog')}
					</Button>
					<Button href="#contact" variant="text" size="md" fullWidth onclick={closeMobileNav}>
						{$t('header.contact')}
					</Button>
					{#if user}
						<Button
							href={profile?.role === 'admin' ? '/admin' : '/user'}
							variant="secondary"
							size="md"
							fullWidth
							onclick={closeMobileNav}
						>
							{$t('header.profile')}
						</Button>
					{:else}
						<Button href="/login" variant="secondary" size="md" fullWidth onclick={closeMobileNav}>
							{$t('header.login')}
						</Button>
					{/if}
				</nav>
			</div>
		{/if}
	</div>
</header>

<style>
	/* Smooth scrolling for anchor links */
	:global(a) {
		scroll-behavior: smooth;
	}
</style>
