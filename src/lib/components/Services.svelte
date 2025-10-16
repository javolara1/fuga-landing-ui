<script lang="ts">
	import { t } from '$lib/i18n';

	// Create arrays from individual feature translations
	const primaryFeatures = $derived([
		$t('services.primary.features.feat1'),
		$t('services.primary.features.feat2'),
		$t('services.primary.features.feat3'),
		$t('services.primary.features.feat4')
	]);

	const cyclingFeatures = $derived([
		$t('services.secondary.cycling.features.feat1'),
		$t('services.secondary.cycling.features.feat2'),
		$t('services.secondary.cycling.features.feat3'),
		$t('services.secondary.cycling.features.feat4')
	]);

	const runningFeatures = $derived([
		$t('services.secondary.running.features.feat1'),
		$t('services.secondary.running.features.feat2'),
		$t('services.secondary.running.features.feat3'),
		$t('services.secondary.running.features.feat4')
	]);

	const swimmingFeatures = $derived([
		$t('services.secondary.swimming.features.feat1'),
		$t('services.secondary.swimming.features.feat2'),
		$t('services.secondary.swimming.features.feat3'),
		$t('services.secondary.swimming.features.feat4')
	]);
</script>

<section id="services" class="bg-black pt-12 text-white sm:pt-16 lg:pt-20">
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<div class="mb-12 text-center">
			<h2 class="mt-8 mb-8 text-3xl font-bold sm:text-4xl md:text-5xl">{$t('services.title')}</h2>
			<p class="mx-auto max-w-2xl text-base text-gray-300 sm:text-lg">
				{$t('services.description')}
			</p>
		</div>

		<!-- Primary Service - Strength Training -->
		<div class="mb-12">
			<div class="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
				<div>
					<div
						class="mb-6 inline-flex items-center rounded-full bg-gray-800 px-4 py-2 text-sm font-medium text-white"
					>
						<span class="mr-2 h-2 w-2 rounded-full bg-white"></span>
						{$t('services.primary.badge')}
					</div>
					<h3 class="mb-6 text-xl font-bold sm:text-2xl md:text-3xl">
						{$t('services.primary.title')}
					</h3>
					<p class="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
						{$t('services.primary.description')}
					</p>
					<ul class="mb-8 space-y-4">
						{#each primaryFeatures as feature}
							<li class="flex items-center text-gray-300">
								<svg
									class="mr-3 h-5 w-5 text-white"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M5 13l4 4L19 7"
									></path>
								</svg>
								{feature}
							</li>
						{/each}
					</ul>
				</div>
				<div class="rounded-2xl border border-gray-800 bg-gray-900 p-6">
					<div class="mb-6 text-center text-5xl">💪</div>
					<h4 class="mb-4 text-center text-lg font-bold">{$t('services.primary.focus.title')}</h4>
					<p class="text-center text-gray-300">
						{$t('services.primary.focus.description')}
					</p>
				</div>
			</div>
		</div>

		<!-- Secondary Services - Sport Specific Training -->
		<div>
			<div class="mb-12 text-center">
				<div
					class="mb-6 inline-flex items-center rounded-full bg-gray-800 px-4 py-2 text-sm font-medium text-white"
				>
					<span class="mr-2 h-2 w-2 rounded-full bg-white"></span>
					{$t('services.secondary.badge')}
				</div>
				<h3 class="mb-6 text-xl font-bold sm:text-2xl md:text-3xl">
					{$t('services.secondary.title')}
				</h3>
				<p class="mx-auto max-w-2xl text-base text-gray-300 sm:text-lg">
					{$t('services.secondary.description')}
				</p>
			</div>

			<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				<!-- Cycling -->
				<div
					class="rounded-2xl border border-gray-800 bg-gray-900 p-6 transition-all duration-300 hover:border-gray-600"
				>
					<div class="mb-4 text-center text-4xl">🚴‍♂️</div>
					<h4 class="mb-4 text-center text-lg font-bold">
						{$t('services.secondary.cycling.title')}
					</h4>
					<p class="mb-6 text-center text-sm text-gray-300">
						{$t('services.secondary.cycling.description')}
					</p>
					<ul class="space-y-3 text-sm text-gray-400">
						{#each cyclingFeatures as feature}
							<li>• {feature}</li>
						{/each}
					</ul>
				</div>

				<!-- Running -->
				<div
					class="rounded-2xl border border-gray-800 bg-gray-900 p-6 transition-all duration-300 hover:border-gray-600"
				>
					<div class="mb-4 text-center text-4xl">🏃‍♂️</div>
					<h4 class="mb-4 text-center text-lg font-bold">
						{$t('services.secondary.running.title')}
					</h4>
					<p class="mb-6 text-center text-sm text-gray-300">
						{$t('services.secondary.running.description')}
					</p>
					<ul class="space-y-3 text-sm text-gray-400">
						{#each runningFeatures as feature}
							<li>• {feature}</li>
						{/each}
					</ul>
				</div>

				<!-- Swimming -->
				<div
					class="rounded-2xl border border-gray-800 bg-gray-900 p-6 transition-all duration-300 hover:border-gray-600"
				>
					<div class="mb-4 text-center text-4xl">🏊‍♂️</div>
					<h4 class="mb-4 text-center text-lg font-bold">
						{$t('services.secondary.swimming.title')}
					</h4>
					<p class="mb-6 text-center text-sm text-gray-300">
						{$t('services.secondary.swimming.description')}
					</p>
					<ul class="space-y-3 text-sm text-gray-400">
						{#each swimmingFeatures as feature}
							<li>• {feature}</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
	</div>
</section>
