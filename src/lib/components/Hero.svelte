<script lang="ts">
	import { t } from '$lib/i18n';
	import Button from '$lib/components/Button.svelte';
</script>

<section class="bg-black pt-12 text-white sm:pt-16 lg:pt-20" data-testid="hero-section">
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<div class="text-center">
			<!-- Main Heading -->
			<h1
				class="mb-8 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
				data-testid="hero-heading"
			>
				{$t('hero.title')}
				<span class="mt-4 block text-xl font-light sm:text-2xl md:text-3xl lg:text-4xl">
					{$t('hero.subtitle')}
				</span>
			</h1>

			<!-- Subheading -->
			<p
				class="mx-auto mb-8 max-w-3xl text-base leading-relaxed text-gray-300 sm:text-lg"
				data-testid="hero-description"
			>
				{$t('hero.description')}
			</p>

			<!-- Key Benefits -->
			<div
				class="mx-auto mb-12 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3"
				data-testid="hero-benefits"
			>
				<div class="rounded-2xl border border-gray-800 bg-gray-900 p-6" data-testid="benefit-card">
					<div class="mb-4 text-3xl">💪</div>
					<h3 class="mb-4 text-lg font-semibold">{$t('hero.benefits.strength.title')}</h3>
					<p class="text-sm text-gray-400">{$t('hero.benefits.strength.description')}</p>
				</div>
				<div class="rounded-2xl border border-gray-800 bg-gray-900 p-6" data-testid="benefit-card">
					<div class="mb-4 text-3xl">🚴‍♂️</div>
					<h3 class="mb-4 text-lg font-semibold">{$t('hero.benefits.custom.title')}</h3>
					<p class="text-sm text-gray-400">{$t('hero.benefits.custom.description')}</p>
				</div>
				<div class="rounded-2xl border border-gray-800 bg-gray-900 p-6" data-testid="benefit-card">
					<div class="mb-4 text-3xl">🏆</div>
					<h3 class="mb-4 text-lg font-semibold">{$t('hero.benefits.expert.title')}</h3>
					<p class="text-sm text-gray-400">{$t('hero.benefits.expert.description')}</p>
				</div>
			</div>

			<!-- Call to Action Buttons -->
			<div
				class="flex flex-col items-center justify-center gap-4 sm:flex-row"
				data-testid="hero-cta-buttons"
			>
				<Button href="/register" variant="primary" size="lg" data-testid="cta-start-training">
					{$t('hero.cta.start')}
				</Button>
				<Button
					variant="secondary"
					size="lg"
					data-testid="cta-learn-more"
					onclick={() => {
						const servicesSection = document.getElementById('services');
						servicesSection?.scrollIntoView({ behavior: 'smooth' });
					}}
				>
					{$t('hero.cta.learn')}
				</Button>
			</div>

			<!-- Additional Info -->
			<p class="mt-8 text-sm text-gray-400" data-testid="hero-footer">
				{$t('hero.footer')}
			</p>
		</div>
	</div>
</section>
