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

<section id="services" class="bg-black py-8 text-white sm:py-16">
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<div class="mb-12 text-center sm:mb-16">
			<h2 class="mb-4 text-2xl font-bold sm:text-3xl md:text-4xl">{$t('services.title')}</h2>
			<p class="mx-auto max-w-2xl text-lg text-gray-300 sm:text-xl">
				{$t('services.description')}
			</p>
		</div>

		<!-- Primary Service - Strength Training -->
		<div class="mb-12 sm:mb-20">
			<div class="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
				<div>
					<div
						class="mb-4 inline-flex items-center rounded-full bg-gray-800 px-3 py-1.5 text-xs font-medium text-white sm:px-4 sm:py-2 sm:text-sm"
					>
						<span class="mr-2 h-2 w-2 rounded-full bg-white"></span>
						{$t('services.primary.badge')}
					</div>
					<h3 class="mb-4 text-xl font-bold sm:text-2xl md:text-3xl">
						{$t('services.primary.title')}
					</h3>
					<p class="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
						{$t('services.primary.description')}
					</p>
					<ul class="mb-8 space-y-3">
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
				<div class="rounded-2xl border border-gray-800 bg-gray-900 p-4 sm:p-8">
					<div class="mb-4 text-center text-5xl sm:text-6xl">💪</div>
					<h4 class="mb-4 text-center text-lg font-bold sm:text-xl">
						{$t('services.primary.focus.title')}
					</h4>
					<p class="text-center text-gray-300">
						{$t('services.primary.focus.description')}
					</p>
				</div>
			</div>
		</div>

		<!-- Secondary Services - Sport Specific Training -->
		<div>
			<div class="mb-8 text-center sm:mb-12">
				<div
					class="mb-4 inline-flex items-center rounded-full bg-gray-800 px-3 py-1.5 text-xs font-medium text-white sm:px-4 sm:py-2 sm:text-sm"
				>
					<span class="mr-2 h-2 w-2 rounded-full bg-white"></span>
					{$t('services.secondary.badge')}
				</div>
				<h3 class="mb-4 text-xl font-bold sm:text-2xl md:text-3xl">
					{$t('services.secondary.title')}
				</h3>
				<p class="mx-auto max-w-2xl text-base text-gray-300 sm:text-lg">
					{$t('services.secondary.description')}
				</p>
			</div>

			<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
				<!-- Cycling -->
				<div
					class="rounded-2xl border border-gray-800 bg-gray-900 p-4 transition-all duration-300 hover:border-gray-600 sm:p-7 lg:p-8"
				>
					<div class="mb-4 text-center text-3xl sm:text-4xl">🚴‍♂️</div>
					<h4 class="mb-4 text-center text-lg font-bold sm:text-xl">
						{$t('services.secondary.cycling.title')}
					</h4>
					<p class="mb-6 text-center text-sm text-gray-300 sm:text-base">
						{$t('services.secondary.cycling.description')}
					</p>
					<ul class="space-y-2 text-sm text-gray-400">
						{#each cyclingFeatures as feature}
							<li>• {feature}</li>
						{/each}
					</ul>
				</div>

				<!-- Running -->
				<div
					class="rounded-2xl border border-gray-800 bg-gray-900 p-4 transition-all duration-300 hover:border-gray-600 sm:p-7 lg:p-8"
				>
					<div class="mb-4 text-center text-3xl sm:text-4xl">🏃‍♂️</div>
					<h4 class="mb-4 text-center text-lg font-bold sm:text-xl">
						{$t('services.secondary.running.title')}
					</h4>
					<p class="mb-6 text-center text-sm text-gray-300 sm:text-base">
						{$t('services.secondary.running.description')}
					</p>
					<ul class="space-y-2 text-sm text-gray-400">
						{#each runningFeatures as feature}
							<li>• {feature}</li>
						{/each}
					</ul>
				</div>

				<!-- Swimming -->
				<div
					class="rounded-2xl border border-gray-800 bg-gray-900 p-4 transition-all duration-300 hover:border-gray-600 sm:p-7 lg:p-8"
				>
					<div class="mb-4 text-center text-3xl sm:text-4xl">🏊‍♂️</div>
					<h4 class="mb-4 text-center text-lg font-bold sm:text-xl">
						{$t('services.secondary.swimming.title')}
					</h4>
					<p class="mb-6 text-center text-sm text-gray-300 sm:text-base">
						{$t('services.secondary.swimming.description')}
					</p>
					<ul class="space-y-2 text-sm text-gray-400">
						{#each swimmingFeatures as feature}
							<li>• {feature}</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
	</div>
</section>
