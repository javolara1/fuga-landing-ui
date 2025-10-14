<script lang="ts">
	import { t } from '$lib/i18n';
	import Button from '$lib/components/Button.svelte';
</script>

<section class="bg-black py-20 text-white lg:py-32">
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<div class="text-center">
			<!-- Main Heading -->
			<h1 class="mb-6 text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
				{$t('hero.title')}
				<span class="mt-2 block text-2xl font-light md:text-4xl lg:text-5xl">
					{$t('hero.subtitle')}
				</span>
			</h1>

			<!-- Subheading -->
			<p class="mx-auto mb-8 max-w-3xl text-xl leading-relaxed text-gray-300 md:text-2xl">
				{$t('hero.description')}
			</p>

			<!-- Key Benefits -->
			<div class="mx-auto mb-12 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
				<div class="rounded-lg border border-gray-800 bg-gray-900 p-6">
					<div class="mb-2 text-2xl">💪</div>
					<h3 class="mb-2 text-lg font-semibold">{$t('hero.benefits.strength.title')}</h3>
					<p class="text-sm text-gray-400">{$t('hero.benefits.strength.description')}</p>
				</div>
				<div class="rounded-lg border border-gray-800 bg-gray-900 p-6">
					<div class="mb-2 text-2xl">🚴‍♂️</div>
					<h3 class="mb-2 text-lg font-semibold">{$t('hero.benefits.custom.title')}</h3>
					<p class="text-sm text-gray-400">{$t('hero.benefits.custom.description')}</p>
				</div>
				<div class="rounded-lg border border-gray-800 bg-gray-900 p-6">
					<div class="mb-2 text-2xl">🏆</div>
					<h3 class="mb-2 text-lg font-semibold">{$t('hero.benefits.expert.title')}</h3>
					<p class="text-sm text-gray-400">{$t('hero.benefits.expert.description')}</p>
				</div>
			</div>

			<!-- Call to Action Buttons -->
			<div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
				<Button href="/register" variant="primary" size="lg">
					{$t('hero.cta.start')}
				</Button>
				<Button
					variant="secondary"
					size="lg"
					onclick={() => {
						const servicesSection = document.getElementById('services');
						servicesSection?.scrollIntoView({ behavior: 'smooth' });
					}}
				>
					{$t('hero.cta.learn')}
				</Button>
			</div>

			<!-- Additional Info -->
			<p class="mt-8 text-sm text-gray-400">
				{$t('hero.footer')}
			</p>
		</div>
	</div>
</section>
