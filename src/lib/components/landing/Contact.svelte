<script lang="ts">
	import { t } from '$lib/i18n';
	import Button from '$lib/components/common/Button.svelte';

	let { onCtaClick = () => {} } = $props<{
		onCtaClick?: () => void;
	}>();
</script>

<section
	id="contact"
	class="bg-black py-12 text-white sm:py-16 lg:py-20"
	data-testid="contact-section"
>
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<div class="mb-12 text-center">
			<h2 class="mt-8 mb-8 text-3xl font-bold sm:text-3xl md:text-4xl">{$t('contact.title')}</h2>
			<p class="mx-auto text-base text-gray-300 sm:text-lg">
				{$t('contact.description')}
			</p>
		</div>

		<!-- Contact Information - Three Column Layout -->
		<div class="grid grid-cols-1 gap-8 sm:grid-cols-3">
			<!-- Location -->
			<div class="flex flex-col items-center text-center">
				<div class="mb-4 rounded-lg bg-gray-800 p-3">
					<svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
						></path>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
						></path>
					</svg>
				</div>
				<h4 class="mb-1 text-lg font-bold">{$t('contact.location')}</h4>
				<p class="text-gray-300">{$t('contact.sportsTrainingCenter')}</p>
				<p class="text-gray-400">{$t('contact.athleticAvenue')}</p>
				<p class="text-gray-400">{$t('contact.sportsCity')}</p>
			</div>

			<!-- Phone -->
			<div class="flex flex-col items-center text-center">
				<div class="mb-4 rounded-lg bg-gray-800 p-3">
					<svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
						></path>
					</svg>
				</div>
				<h4 class="mb-1 text-lg font-bold">{$t('contact.phone')}</h4>
				<p class="text-gray-300">{$t('contact.phoneNumber')}</p>
			</div>

			<!-- Email -->
			<div class="flex flex-col items-center text-center">
				<div class="mb-4 rounded-lg bg-gray-800 p-3">
					<svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
						></path>
					</svg>
				</div>
				<h4 class="mb-1 text-lg font-bold">{$t('contact.email')}</h4>
				<p class="text-gray-300">{$t('contact.infoEmail')}</p>
			</div>
		</div>

		<p class="mt-12 text-center text-lg text-gray-300 italic">
			{$t('contact.tagline')}
		</p>

		<!-- CTA Button -->
		<div class="mt-10 flex justify-center">
			<Button variant="primary" size="lg" onclick={onCtaClick}>
				{$t('contact.ctaButton')}
			</Button>
		</div>
	</div>
</section>
