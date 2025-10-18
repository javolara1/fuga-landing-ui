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

<header class="sticky top-0 z-50 border-b border-gray-800 bg-black" data-testid="header">
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between py-4">
			<!-- Logo -->
			<div class="flex-shrink-0">
				<Button href="/" variant="text" size="xl" data-testid="logo">
					<h1>FUGA</h1>
				</Button>
			</div>

			<!-- Navigation Links - Desktop -->
			<nav class="hidden space-x-4 md:flex" data-testid="desktop-navigation">
				<Button href="#services" variant="text" size="md" data-testid="nav-services">
					{$t('header.services')}
				</Button>
				<Button href="#pricing" variant="text" size="md" data-testid="nav-pricing">
					{$t('header.pricing')}
				</Button>
				<Button href="#about" variant="text" size="md" data-testid="nav-about">
					{$t('header.about')}
				</Button>
				<Button href="/blog" variant="text" size="md" data-testid="nav-blog">
					{$t('header.blog')}
				</Button>
				<Button href="#contact" variant="text" size="md" data-testid="nav-contact">
					{$t('header.contact')}
				</Button>
			</nav>

			<div class="flex items-center gap-3">
				<!-- Auth Buttons - Desktop Only -->
				<div class="hidden md:block" data-testid="desktop-auth">
					{#if user}
						<Button
							href={profile?.role === 'admin' ? '/admin' : '/user'}
							variant="secondary"
							size="md"
							data-testid="nav-profile"
						>
							{$t('header.profile')}
						</Button>
					{:else}
						<Button href="/login" variant="secondary" size="md" data-testid="nav-login">
							{$t('header.login')}
						</Button>
					{/if}
				</div>

				<!-- Mobile menu button -->
				<Button
					variant="ghost"
					size="md"
					onclick={toggleMobileNav}
					aria-controls="mobile-navigation"
					aria-expanded={isMobileNavOpen}
					aria-label={isMobileNavOpen ? $t('header.closeMenu') : $t('header.openMenu')}
					class="md:hidden"
					data-testid="mobile-menu-button"
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
				</Button>
			</div>
		</div>

		{#if isMobileNavOpen}
			<div
				id="mobile-navigation"
				class="border-t border-gray-800 pb-4 md:hidden"
				transition:slide={{ duration: 200 }}
				data-testid="mobile-navigation"
			>
				<nav class="flex flex-col space-y-4 pt-4" data-testid="mobile-nav-links">
					<Button
						href="#services"
						variant="text"
						size="md"
						fullWidth
						onclick={closeMobileNav}
						data-testid="mobile-nav-services"
					>
						{$t('header.services')}
					</Button>
					<Button
						href="#pricing"
						variant="text"
						size="md"
						fullWidth
						onclick={closeMobileNav}
						data-testid="mobile-nav-pricing"
					>
						{$t('header.pricing')}
					</Button>
					<Button
						href="#about"
						variant="text"
						size="md"
						fullWidth
						onclick={closeMobileNav}
						data-testid="mobile-nav-about"
					>
						{$t('header.about')}
					</Button>
					<Button
						href="/blog"
						variant="text"
						size="md"
						fullWidth
						onclick={closeMobileNav}
						data-testid="mobile-nav-blog"
					>
						{$t('header.blog')}
					</Button>
					<Button
						href="#contact"
						variant="text"
						size="md"
						fullWidth
						onclick={closeMobileNav}
						data-testid="mobile-nav-contact"
					>
						{$t('header.contact')}
					</Button>
					{#if user}
						<Button
							href={profile?.role === 'admin' ? '/admin' : '/user'}
							variant="secondary"
							size="md"
							fullWidth
							onclick={closeMobileNav}
							data-testid="mobile-nav-profile"
						>
							{$t('header.profile')}
						</Button>
					{:else}
						<Button
							href="/login"
							variant="secondary"
							size="md"
							fullWidth
							onclick={closeMobileNav}
							data-testid="mobile-nav-login"
						>
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
