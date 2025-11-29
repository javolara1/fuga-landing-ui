<script lang="ts">
	import { fade } from 'svelte/transition';
	import Button from '$lib/components/common/Button.svelte';
	import { t } from '$lib/i18n';

	let { showCta = false, onCtaClick = () => {} } = $props<{
		showCta?: boolean;
		onCtaClick?: () => void;
	}>();
</script>

<header class="sticky top-0 z-50 bg-black shadow-lg shadow-black/50" data-testid="header">
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between py-4">
			<!-- Logo -->

			<h1 class="my-2 text-3xl font-bold">FUGA</h1>

			<!-- CTA Button - visible on all breakpoints when Hero CTA is hidden -->
			{#if showCta}
				<div transition:fade>
					<Button variant="primary" size="md" onclick={onCtaClick} data-testid="header-cta">
						{$t('hero.cta.start')}
					</Button>
				</div>
			{/if}
		</div>
	</div>
</header>
