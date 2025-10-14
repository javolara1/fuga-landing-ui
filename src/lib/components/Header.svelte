<script lang="ts">
	import { t } from '$lib/i18n';
	import Button from '$lib/components/Button.svelte';

	let { user, profile } = $props();
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
			<nav class="hidden space-x-8 md:flex">
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

			<!-- Auth Buttons -->
			<div class="flex items-center space-x-4">
				{#if user}
					<!-- User is logged in - show profile button based on role -->
					<Button
						href={profile?.role === 'admin' ? '/admin' : '/user'}
						variant="secondary"
						size="md"
					>
						{$t('header.profile')}
					</Button>
				{:else}
					<!-- User is not logged in - show login button -->
					<Button href="/login" variant="secondary" size="md">
						{$t('header.login')}
					</Button>
				{/if}

				<!-- Mobile menu button -->
				<Button variant="text" size="md" class="md:hidden" aria-label="Toggle mobile menu">
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						></path>
					</svg>
				</Button>
			</div>
		</div>

		<!-- Mobile Navigation -->
		<div class="border-t border-gray-800 pt-4 pb-4 md:hidden">
			<nav class="flex flex-col space-y-4">
				<Button href="#services" variant="text" size="md" fullWidth>
					{$t('header.services')}
				</Button>
				<Button href="#pricing" variant="text" size="md" fullWidth>
					{$t('header.pricing')}
				</Button>
				<Button href="#about" variant="text" size="md" fullWidth>
					{$t('header.about')}
				</Button>
				<Button href="/blog" variant="text" size="md" fullWidth>
					{$t('header.blog')}
				</Button>
				<Button href="#contact" variant="text" size="md" fullWidth>
					{$t('header.contact')}
				</Button>
			</nav>
		</div>
	</div>
</header>

<style>
	/* Smooth scrolling for anchor links */
	:global(a) {
		scroll-behavior: smooth;
	}
</style>
