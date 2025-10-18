<script lang="ts">
	import { slide } from 'svelte/transition';
	import { enhance } from '$app/forms';
	import { t } from '$lib/i18n';
	import Button from '$lib/components/Button.svelte';

	let { currentPage = 'profile' } = $props();

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
				<Button href="/admin" variant="text" size="md" isSelected={currentPage === 'profile'}>
					{$t('admin.navigation.profile')}
				</Button>
				<Button href="/admin/blog" variant="text" size="md" isSelected={currentPage === 'blog'}>
					{$t('admin.navigation.blog')}
				</Button>
			</nav>

			<div class="flex items-center gap-3">
				<!-- User Info and Logout - Desktop Only -->
				<div class="hidden md:block">
					<form method="POST" action="?/logout" use:enhance>
						<Button type="submit" variant="secondary" size="md">
							{$t('user.logout')}
						</Button>
					</form>
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
			>
				<nav class="flex flex-col space-y-4 pt-4">
					<Button
						href="/admin"
						variant="text"
						size="md"
						fullWidth
						onclick={closeMobileNav}
						isSelected={currentPage === 'profile'}
					>
						{$t('admin.navigation.profile')}
					</Button>
					<Button
						href="/admin/blog"
						variant="text"
						size="md"
						fullWidth
						onclick={closeMobileNav}
						isSelected={currentPage === 'blog'}
					>
						{$t('admin.navigation.blog')}
					</Button>
					<form method="POST" action="?/logout" use:enhance>
						<Button type="submit" variant="secondary" size="md" fullWidth onclick={closeMobileNav}>
							{$t('user.logout')}
						</Button>
					</form>
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
