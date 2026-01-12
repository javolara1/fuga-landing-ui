<script lang="ts">
	import { fade } from 'svelte/transition';
	import Button from '$lib/components/common/Button.svelte';

	let {
		showCta = false,
		onCtaClick = () => {},
		blogUrl = undefined
	} = $props<{
		showCta?: boolean;
		onCtaClick?: () => void;
		blogUrl?: string;
	}>();
</script>

<header class="sticky top-0 z-50 bg-black shadow-lg shadow-black/50" data-testid="header">
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between py-4">
			<!-- Logo -->

			<Button variant="text" href="/">
				<h1 class="my-0 text-3xl font-bold">FUGA</h1>
			</Button>

			<div class="flex items-center gap-4">
				{#if blogUrl}
					<Button
						variant="text"
						href={blogUrl}
						target="_blank"
						rel="noopener noreferrer"
						data-testid="header-blog">Blog</Button
					>
				{/if}
				<!-- CTA Button - visible on all breakpoints when Hero CTA is hidden -->
				{#if showCta}
					<div transition:fade>
						<Button variant="primary" size="md" onclick={onCtaClick} data-testid="header-cta">
							Comienza a Entrenar Hoy
						</Button>
					</div>
				{/if}
			</div>
		</div>
	</div>
</header>
