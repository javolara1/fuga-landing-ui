<script lang="ts">
	import { t } from '$lib/i18n';
	import Button from '$lib/components/common/Button.svelte';

	let { ctaVisible = $bindable(true), onCtaClick = () => {} } = $props<{
		ctaVisible?: boolean;
		onCtaClick?: () => void;
	}>();

	let ctaElement: HTMLDivElement;
	let ctaSize: 'md' | 'lg' = $state('md');

	$effect(() => {
		if (!ctaElement) return;

		const observer = new IntersectionObserver(
			(entries) => {
				ctaVisible = entries[0].isIntersecting;
			},
			{ threshold: 0 }
		);

		observer.observe(ctaElement);

		return () => observer.disconnect();
	});

	$effect(() => {
		const mediaQuery = window.matchMedia('(min-width: 900px)');
		ctaSize = mediaQuery.matches ? 'lg' : 'md';

		const handler = (e: MediaQueryListEvent) => {
			ctaSize = e.matches ? 'lg' : 'md';
			console.log(ctaSize);
		};

		mediaQuery.addEventListener('change', handler);
		return () => mediaQuery.removeEventListener('change', handler);
	});
</script>

<section class="bg-black text-white" data-testid="hero-section">
	<div class="relative min-h-[calc(100vh-5rem)]" data-testid="hero-background">
		<!-- Background Image - Full width on mobile/tablet -->
		<div class="absolute inset-0 lg:hidden">
			<div
				class="absolute inset-0 mask-b-from-0% bg-cover bg-center mask-cover blur-xs brightness-70"
				style="background-image: url('/hero1.png');"
			></div>
		</div>

		<!-- Background Image - Right 50% with overlap on desktop -->
		<div class="absolute inset-y-0 right-0 hidden w-1/2 overflow-hidden lg:block">
			<div
				class="absolute inset-0 mask-l-from-0% bg-cover bg-center mask-cover brightness-80"
				style="background-image: url('/hero1.png');"
			></div>
		</div>

		<!-- Content - Left 60% -->
		<div
			class="relative z-10 flex min-h-[calc(100vh-5rem)] w-full flex-col items-center justify-center text-center lg:w-3/5"
		>
			<div class="flex flex-col items-center p-4">
				<h1
					class="mb-4 max-w-md text-4xl font-bold tracking-tight sm:mb-6 sm:max-w-lg sm:text-5xl md:mb-8 md:max-w-xl md:text-6xl lg:mb-10 lg:max-w-2xl lg:text-6xl"
					data-testid="hero-heading"
				>
					{$t('hero.subtitle')}
				</h1>

				<p
					class="mb-6 max-w-sm text-base leading-relaxed text-gray-300 sm:max-w-md sm:text-lg md:max-w-lg md:text-lg lg:mb-8 lg:max-w-xl lg:text-xl"
					data-testid="hero-description"
				>
					{$t('hero.description')}
				</p>

				<div bind:this={ctaElement} class="flex justify-center">
					<Button
						variant="primary"
						size={ctaSize}
						onclick={onCtaClick}
						data-testid="cta-start-training"
					>
						{$t('hero.cta.start')}
					</Button>
				</div>
			</div>
		</div>
	</div>
</section>
